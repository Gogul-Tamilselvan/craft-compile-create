
import React, { useState } from "react";
import Layout from "@/components/Layout";
import TableEditor from "@/components/TableEditor";
import ResumeMaker from "@/components/ResumeMaker";
import DocumentMerger from "@/components/DocumentMerger";
import CoverLetterMaker from "@/components/CoverLetterMaker";
import Dashboard from "@/components/Dashboard";
import ExpenseList from "@/components/ExpenseList";
import InvoiceList from "@/components/InvoiceList";
import CompanyList from "@/components/CompanyList";
import { DataProvider } from "@/context/DataContext";
import { ModuleType } from "@/types";

const Index: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>("dashboard");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "expenses":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <CompanyList />
            </div>
            <ExpenseList />
          </div>
        );
      case "invoices":
        return <InvoiceList />;
      case "table":
        return <TableEditor />;
      case "resume":
        return <ResumeMaker />;
      case "merger":
        return <DocumentMerger />;
      case "cover-letter":
        return <CoverLetterMaker />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
        {renderActiveModule()}
      </Layout>
    </DataProvider>
  );
};

export default Index;
