
import { Company, Expense, Invoice } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const mockCompanies: Company[] = [
  {
    id: "comp-1",
    name: "Tech Solutions Inc.",
    contactName: "John Smith",
    contactEmail: "john@techsolutions.com",
    contactPhone: "123-456-7890",
    address: "123 Tech Avenue, San Francisco, CA 94105",
  },
  {
    id: "comp-2",
    name: "Global Logistics Ltd.",
    contactName: "Emily Johnson",
    contactEmail: "emily@globallogistics.com",
    contactPhone: "987-654-3210",
    address: "456 Supply Chain Road, Chicago, IL 60601",
  },
  {
    id: "comp-3",
    name: "Creative Designs Co.",
    contactName: "Michael Chen",
    contactEmail: "michael@creativedesigns.com",
    contactPhone: "555-123-4567",
    address: "789 Artist Lane, New York, NY 10001",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "exp-1",
    companyId: "comp-1",
    amount: 1500,
    date: "2024-05-10",
    description: "Software licenses",
    category: "Technology",
    project: "Website Redesign",
    status: "paid",
    paymentDate: "2024-05-15",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "exp-2",
    companyId: "comp-1",
    amount: 3000,
    date: "2024-05-12",
    description: "Consulting services",
    category: "Professional Services",
    project: "Data Migration",
    status: "pending",
  },
  {
    id: "exp-3",
    companyId: "comp-2",
    amount: 750,
    date: "2024-05-05",
    description: "Shipping costs",
    category: "Logistics",
    project: "Product Launch",
    status: "paid",
    paymentDate: "2024-05-07",
    paymentMethod: "Credit Card",
  },
  {
    id: "exp-4",
    companyId: "comp-3",
    amount: 2500,
    date: "2024-05-15",
    description: "Branding materials",
    category: "Marketing",
    project: "Rebranding Campaign",
    status: "pending",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    companyId: "comp-1",
    invoiceNumber: "INV-2024-001",
    date: "2024-05-01",
    dueDate: "2024-05-31",
    status: "unpaid",
    items: [
      {
        id: "item-1-1",
        description: "Web Development Services",
        quantity: 40,
        unitPrice: 100,
        amount: 4000,
      },
      {
        id: "item-1-2",
        description: "Server Maintenance",
        quantity: 1,
        unitPrice: 500,
        amount: 500,
      },
    ],
    tax: 450,
    discount: 200,
    totalAmount: 4750,
    paidAmount: 0,
  },
  {
    id: "inv-2",
    companyId: "comp-2",
    invoiceNumber: "INV-2024-002",
    date: "2024-05-05",
    dueDate: "2024-06-04",
    status: "partially_paid",
    items: [
      {
        id: "item-2-1",
        description: "Logistics Consulting",
        quantity: 20,
        unitPrice: 150,
        amount: 3000,
      },
    ],
    tax: 300,
    discount: 0,
    totalAmount: 3300,
    paidAmount: 1500,
  },
  {
    id: "inv-3",
    companyId: "comp-3",
    invoiceNumber: "INV-2024-003",
    date: "2024-04-15",
    dueDate: "2024-05-15",
    status: "paid",
    items: [
      {
        id: "item-3-1",
        description: "Logo Design",
        quantity: 1,
        unitPrice: 800,
        amount: 800,
      },
      {
        id: "item-3-2",
        description: "Marketing Materials",
        quantity: 1,
        unitPrice: 1200,
        amount: 1200,
      },
    ],
    tax: 200,
    discount: 100,
    totalAmount: 2100,
    paidAmount: 2100,
  },
];

export function generateUniqueId(): string {
  return uuidv4();
}

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find(company => company.id === id);
}

export function getCompanyNameById(id: string): string {
  const company = getCompanyById(id);
  return company ? company.name : "Unknown Company";
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
