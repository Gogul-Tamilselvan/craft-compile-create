
import React, { createContext, useState, useContext } from "react";
import { Company, Expense, Invoice } from "@/types";
import { mockCompanies, mockExpenses, mockInvoices, generateUniqueId } from "@/utils/mockData";

interface DataContextType {
  companies: Company[];
  expenses: Expense[];
  invoices: Invoice[];
  addCompany: (company: Omit<Company, "id">) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  updateInvoiceStatus: (id: string, status: Invoice["status"], paidAmount: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

  const addCompany = (company: Omit<Company, "id">) => {
    const newCompany = {
      ...company,
      id: `comp-${generateUniqueId()}`,
    };
    setCompanies([...companies, newCompany]);
  };

  const updateCompany = (updatedCompany: Company) => {
    setCompanies(
      companies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  };

  const deleteCompany = (id: string) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: `exp-${generateUniqueId()}`,
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const addInvoice = (invoice: Omit<Invoice, "id">) => {
    const newInvoice = {
      ...invoice,
      id: `inv-${generateUniqueId()}`,
    };
    setInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  const updateInvoiceStatus = (id: string, status: Invoice["status"], paidAmount: number) => {
    setInvoices(
      invoices.map((invoice) => {
        if (invoice.id === id) {
          return {
            ...invoice,
            status,
            paidAmount,
          };
        }
        return invoice;
      })
    );
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        expenses,
        invoices,
        addCompany,
        updateCompany,
        deleteCompany,
        addExpense,
        updateExpense,
        deleteExpense,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        updateInvoiceStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
