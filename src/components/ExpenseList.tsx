
import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatCurrency, formatDate, getCompanyNameById } from "@/utils/mockData";
import { ExpenseFilterOptions, Expense } from "@/types";
import ExpenseForm from "./ExpenseForm";
import { Search, FileDown, Plus, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const ExpenseList: React.FC = () => {
  const { expenses, companies, deleteExpense } = useData();
  const [filters, setFilters] = useState<ExpenseFilterOptions>({
    status: "all",
    company: undefined,
    searchQuery: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filteredExpenses = expenses.filter((expense) => {
    // Filter by company
    if (filters.company && expense.companyId !== filters.company) {
      return false;
    }
    
    // Filter by status
    if (filters.status && filters.status !== "all" && expense.status !== filters.status) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateFrom && new Date(expense.date) < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && new Date(expense.date) > filters.dateTo) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const companyName = getCompanyNameById(expense.companyId).toLowerCase();
      
      return (
        expense.description.toLowerCase().includes(query) ||
        companyName.includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        (expense.project && expense.project.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const totalPaid = filteredExpenses
    .filter((expense) => expense.status === "paid")
    .reduce((sum, expense) => sum + expense.amount, 0);
    
  const totalPending = filteredExpenses
    .filter((expense) => expense.status === "pending")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
      toast({
        title: "Expense deleted",
        description: "The expense has been successfully deleted.",
      });
    }
  };

  const handleAddNew = () => {
    setEditingExpense(null);
    setDialogOpen(true);
  };

  const exportToCSV = () => {
    // Creating CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Company,Description,Category,Project,Amount,Status\n";
    
    filteredExpenses.forEach(expense => {
      const companyName = getCompanyNameById(expense.companyId);
      const row = [
        expense.date,
        companyName,
        `"${expense.description}"`,
        expense.category,
        expense.project || "",
        expense.amount,
        expense.status
      ];
      csvContent += row.join(",") + "\n";
    });
    
    // Creating a hidden link to download the CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Expenses exported to CSV successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <div className="flex gap-2">
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md">
            <p className="text-sm font-medium">Total</p>
            <h3 className="text-xl font-bold">{formatCurrency(totalPaid + totalPending)}</h3>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md">
            <p className="text-sm font-medium">Paid</p>
            <h3 className="text-xl font-bold">{formatCurrency(totalPaid)}</h3>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-md">
            <p className="text-sm font-medium">Pending</p>
            <h3 className="text-xl font-bold">{formatCurrency(totalPending)}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Expense Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center relative">
              <Search className="h-4 w-4 absolute left-3 text-gray-400" />
              <Input
                placeholder="Search expenses..."
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
              <option value="pending">Pending</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No expenses found. Add some expenses to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>{getCompanyNameById(expense.companyId)}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            expense.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(expense)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(expense.id)}
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
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingExpense ? "Edit Expense" : "Add New Expense"}
            </DialogTitle>
          </DialogHeader>
          <ExpenseForm
            expense={editingExpense}
            onClose={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseList;
