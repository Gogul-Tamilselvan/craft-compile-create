
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Invoice, InvoiceItem } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash } from "lucide-react";

interface InvoiceFormProps {
  invoice: Invoice | null;
  onClose: () => void;
}

const invoiceItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0.01, "Unit price must be greater than 0"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
});

const formSchema = z.object({
  companyId: z.string().min(1, "Company is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  tax: z.coerce.number().min(0, "Tax cannot be negative"),
  discount: z.coerce.number().min(0, "Discount cannot be negative"),
  notes: z.string().optional(),
  status: z.enum(["paid", "unpaid", "partially_paid"]),
  paidAmount: z.coerce.number().min(0, "Paid amount cannot be negative"),
});

function generateNewInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `INV-${year}${month}-${random}`;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onClose }) => {
  const { companies, addInvoice, updateInvoice } = useData();

  const defaultItem: Omit<InvoiceItem, "id"> = {
    description: "",
    quantity: 1,
    unitPrice: 0,
    amount: 0,
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyId: invoice?.companyId || "",
      invoiceNumber: invoice?.invoiceNumber || generateNewInvoiceNumber(),
      date: invoice?.date || new Date().toISOString().split("T")[0],
      dueDate: invoice?.dueDate || (() => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString().split("T")[0];
      })(),
      items: invoice?.items || [{ ...defaultItem, id: "new-item-1" }],
      tax: invoice?.tax || 0,
      discount: invoice?.discount || 0,
      notes: invoice?.notes || "",
      status: invoice?.status || "unpaid",
      paidAmount: invoice?.paidAmount || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  const calculateTotals = () => {
    const items = form.getValues("items");
    const subtotal = items.reduce((sum, item) => sum + Number(item.amount), 0);
    const tax = Number(form.getValues("tax"));
    const discount = Number(form.getValues("discount"));
    const total = subtotal + tax - discount;
    
    return { subtotal, total };
  };

  const [totals, setTotals] = useState(() => calculateTotals());

  const updateItemAmount = (index: number) => {
    const items = form.getValues("items");
    const item = items[index];
    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);
    const amount = quantity * unitPrice;
    
    form.setValue(`items.${index}.amount`, amount);
    
    setTotals(calculateTotals());
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const totalAmount = totals.total;
    
    if (invoice) {
      updateInvoice({
        ...data,
        id: invoice.id,
        totalAmount,
      });
      toast({
        title: "Invoice updated",
        description: "The invoice has been successfully updated.",
      });
    } else {
      addInvoice({
        ...data,
        totalAmount,
      });
      toast({
        title: "Invoice created",
        description: "The invoice has been successfully created.",
      });
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">Select a client</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => {
                append({
                  id: `new-item-${fields.length + 1}`,
                  description: "",
                  quantity: 1,
                  unitPrice: 0,
                  amount: 0,
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        remove(index);
                        setTotals(calculateTotals());
                      }}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              step="1" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                updateItemAmount(index);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit Price</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                updateItemAmount(index);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      setTotals(calculateTotals());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      setTotals(calculateTotals());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <p className="text-sm font-medium mb-2">Total</p>
            <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
              <span>{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totals.total)}</span>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...field}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partially_paid">Partially Paid</option>
                    <option value="paid">Paid</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paidAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paid Amount</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {invoice ? "Update" : "Create"} Invoice
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
