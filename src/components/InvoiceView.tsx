
import React from "react";
import { useData } from "@/context/DataContext";
import { Invoice } from "@/types";
import { formatCurrency, formatDate, getCompanyById } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { FilePdf, Mail, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface InvoiceViewProps {
  invoice: Invoice;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice }) => {
  const { companies } = useData();
  const company = getCompanyById(invoice.companyId);

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    toast({
      title: "Email sent",
      description: `Invoice ${invoice.invoiceNumber} has been emailed to the client.`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Invoice ${invoice.invoiceNumber} is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6 px-4 py-2">
      <div className="flex justify-end gap-2 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <FilePdf className="h-4 w-4 mr-2" />
          Print PDF
        </Button>
        <Button variant="outline" onClick={handleEmail}>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      <div className="bg-white p-6 border rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
            <p className="text-lg font-medium text-gray-700 mt-1">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900">Your Company Name</h2>
            <p className="text-sm text-gray-600">123 Business Street</p>
            <p className="text-sm text-gray-600">City, State ZIP</p>
            <p className="text-sm text-gray-600">your@email.com</p>
            <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-10">
          <div>
            <h3 className="text-gray-600 font-medium mb-2">Bill To:</h3>
            <p className="font-bold">{company?.name}</p>
            <p>{company?.contactName}</p>
            <p>{company?.address}</p>
            <p>{company?.contactEmail}</p>
            <p>{company?.contactPhone}</p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600 font-medium">Invoice Date:</div>
              <div>{formatDate(invoice.date)}</div>
              
              <div className="text-gray-600 font-medium">Due Date:</div>
              <div>{formatDate(invoice.dueDate)}</div>
              
              <div className="text-gray-600 font-medium">Status:</div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : invoice.status === "partially_paid"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {invoice.status === "paid" ? "Paid" : invoice.status === "partially_paid" ? "Partially Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border-b">Description</th>
                <th className="text-right py-2 px-4 border-b">Quantity</th>
                <th className="text-right py-2 px-4 border-b">Unit Price</th>
                <th className="text-right py-2 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4 px-4">{item.description}</td>
                  <td className="py-4 px-4 text-right">{item.quantity}</td>
                  <td className="py-4 px-4 text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-4 px-4 text-right">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-80">
            <div className="flex justify-between py-2">
              <span className="font-medium">Subtotal:</span>
              <span>{formatCurrency(invoice.items.reduce((sum, item) => sum + item.amount, 0))}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex justify-between py-2">
                <span className="font-medium">Tax:</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
            )}
            {invoice.discount > 0 && (
              <div className="flex justify-between py-2">
                <span className="font-medium">Discount:</span>
                <span>-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-t border-b font-bold">
              <span>Total:</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-600">
              <span>Paid:</span>
              <span>{formatCurrency(invoice.paidAmount)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Balance Due:</span>
              <span>{formatCurrency(invoice.totalAmount - invoice.paidAmount)}</span>
            </div>
          </div>
        </div>
        
        {invoice.notes && (
          <div className="mt-8">
            <h4 className="font-medium mb-2">Notes:</h4>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
        )}

        <div className="mt-10 text-center text-gray-500 border-t pt-6">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
