
import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate, getCompanyNameById } from "@/utils/mockData";
import { InvoiceFilterOptions, Invoice } from "@/types";
import { Search, FileDown, Plus, Edit, Trash, FilePdf, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import InvoiceForm from "./InvoiceForm";
import InvoiceView from "./InvoiceView";

const InvoiceList: React.FC = () => {
  const { invoices, companies, deleteInvoice } = useData();
  const [filters, setFilters] = useState<InvoiceFilterOptions>({
    status: "all",
    company: undefined,
    searchQuery: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    // Filter by company
    if (filters.company && invoice.companyId !== filters.company) {
      return false;
    }
    
    // Filter by status
    if (filters.status && filters.status !== "all" && invoice.status !== filters.status) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateFrom && new Date(invoice.date) < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && new Date(invoice.date) > filters.dateTo) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const companyName = getCompanyNameById(invoice.companyId).toLowerCase();
      
      return (
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        companyName.includes(query)
      );
    }
    
    return true;
  });
  
  const totalInvoiced = filteredInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const totalPaid = filteredInvoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setDialogOpen(true);
  };

  const handleView = (invoice: Invoice) => {
    setViewingInvoice(invoice);
    setViewDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(id);
      toast({
        title: "Invoice deleted",
        description: "The invoice has been successfully deleted.",
      });
    }
  };

  const handleAddNew = () => {
    setEditingInvoice(null);
    setDialogOpen(true);
  };

  const exportToCSV = () => {
    // Creating CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Invoice Number,Date,Due Date,Company,Total Amount,Paid Amount,Status\n";
    
    filteredInvoices.forEach(invoice => {
      const companyName = getCompanyNameById(invoice.companyId);
      const row = [
        invoice.invoiceNumber,
        invoice.date,
        invoice.dueDate,
        `"${companyName}"`,
        invoice.totalAmount,
        invoice.paidAmount,
        invoice.status
      ];
      csvContent += row.join(",") + "\n";
    });
    
    // Creating a hidden link to download the CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Invoices exported to CSV successfully.",
    });
  };

  const handleSendEmail = (invoice: Invoice) => {
    // Simulate sending email
    toast({
      title: "Email sent",
      description: `Invoice ${invoice.invoiceNumber} has been emailed to the client.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <div className="flex gap-2">
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md">
            <p className="text-sm font-medium">Total Invoiced</p>
            <h3 className="text-xl font-bold">{formatCurrency(totalInvoiced)}</h3>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md">
            <p className="text-sm font-medium">Received</p>
            <h3 className="text-xl font-bold">{formatCurrency(totalPaid)}</h3>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-md">
            <p className="text-sm font-medium">Outstanding</p>
            <h3 className="text-xl font-bold">{formatCurrency(totalOutstanding)}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center relative">
              <Search className="h-4 w-4 absolute left-3 text-gray-400" />
              <Input
                placeholder="Search invoices..."
                className="pl-9"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              />
            </div>
            
            <select
              className="border rounded-md px-3 py-2 w-full"
              value={filters.company || ""}
              onChange={(e) => setFilters({ ...filters, company: e.target.value || undefined })}
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            
            <select
              className="border rounded-md px-3 py-2 w-full"
              value={filters.status || "all"}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partially_paid">Partially Paid</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No invoices found. Create some invoices to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto" 
                          onClick={() => handleView(invoice)}
                        >
                          {invoice.invoiceNumber}
                        </Button>
                      </TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>{getCompanyNameById(invoice.companyId)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(invoice.totalAmount)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(invoice.paidAmount)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "partially_paid"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {invoice.status === "paid" ? "Paid" : invoice.status === "partially_paid" ? "Partial" : "Unpaid"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(invoice)}
                            title="View"
                          >
                            <FilePdf className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSendEmail(invoice)}
                            title="Email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(invoice)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(invoice.id)}
                            title="Delete"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
            </DialogTitle>
          </DialogHeader>
          <InvoiceForm
            invoice={editingInvoice}
            onClose={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Invoice {viewingInvoice?.invoiceNumber}
            </DialogTitle>
          </DialogHeader>
          {viewingInvoice && <InvoiceView invoice={viewingInvoice} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceList;
