
import React, { useState } from "react";
import Layout from "@/components/Layout";
import TableEditor from "@/components/TableEditor";
import CoverLetterMaker from "@/components/CoverLetterMaker";
import Dashboard from "@/components/Dashboard";
import { ModuleType } from "@/types";

const Index: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>("dashboard");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "table":
        return <TableEditor />;
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
