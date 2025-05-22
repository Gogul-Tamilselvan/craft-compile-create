
import React, { useMemo } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/mockData";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard: React.FC = () => {
  const { expenses, invoices, companies } = useData();

  const totalPaidExpenses = useMemo(() => {
    return expenses.filter(expense => expense.status === "paid").reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const totalPendingExpenses = useMemo(() => {
    return expenses.filter(expense => expense.status === "pending").reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const totalInvoiceAmount = useMemo(() => {
    return invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  }, [invoices]);

  const totalPaidInvoices = useMemo(() => {
    return invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
  }, [invoices]);

  const companyExpenses = useMemo(() => {
    const expensesByCompany = companies.map(company => {
      const companyExpenses = expenses.filter(expense => expense.companyId === company.id);
      const totalPaid = companyExpenses
        .filter(expense => expense.status === "paid")
        .reduce((sum, expense) => sum + expense.amount, 0);
      const totalPending = companyExpenses
        .filter(expense => expense.status === "pending")
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        name: company.name,
        paid: totalPaid,
        pending: totalPending,
        total: totalPaid + totalPending
      };
    }).filter(item => item.total > 0).sort((a, b) => b.total - a.total);
    
    return companyExpenses;
  }, [companies, expenses]);

  const paymentStatusData = [
    { name: "Paid", value: totalPaidExpenses },
    { name: "Pending", value: totalPendingExpenses }
  ];

  const COLORS = ["#4caf50", "#ff9800"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPaidExpenses + totalPendingExpenses)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Paid: {formatCurrency(totalPaidExpenses)} | Pending: {formatCurrency(totalPendingExpenses)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvoiceAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Received: {formatCurrency(totalPaidInvoices)} | Outstanding: {formatCurrency(totalInvoiceAmount - totalPaidInvoices)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              With expenses: {companyExpenses.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Expenses</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ChartContainer
                config={{
                  paid: { theme: { light: "#4caf50", dark: "#388e3c" } },
                  pending: { theme: { light: "#ff9800", dark: "#f57c00" } }
                }}
              >
                <BarChart
                  data={companyExpenses.slice(0, 5)}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="paid" name="Paid" fill="var(--color-paid)" />
                  <Bar dataKey="pending" name="Pending" fill="var(--color-pending)" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ChartContainer
                config={{
                  paid: { theme: { light: "#4caf50", dark: "#388e3c" } },
                  pending: { theme: { light: "#ff9800", dark: "#f57c00" } }
                }}
              >
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
