
export interface Company {
  id: string;
  name: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export interface Expense {
  id: string;
  companyId: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  project?: string;
  status: 'paid' | 'pending';
  paymentDate?: string;
  paymentMethod?: string;
  receiptUrl?: string;
}

export interface Invoice {
  id: string;
  companyId: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'partially_paid';
  items: InvoiceItem[];
  tax: number;
  discount: number;
  notes?: string;
  totalAmount: number;
  paidAmount: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export type ModuleType = "table" | "resume" | "merger" | "cover-letter" | "expenses" | "invoices" | "dashboard";

export type ExpenseFilterOptions = {
  company?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: 'paid' | 'pending' | 'all';
  category?: string;
  project?: string;
  searchQuery?: string;
};

export type InvoiceFilterOptions = {
  company?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: 'paid' | 'unpaid' | 'partially_paid' | 'all';
  searchQuery?: string;
};
