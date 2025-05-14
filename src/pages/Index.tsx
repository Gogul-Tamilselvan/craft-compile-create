
import React, { useState } from "react";
import Layout from "@/components/Layout";
import TableEditor from "@/components/TableEditor";
import ResumeMaker from "@/components/ResumeMaker";
import DocumentMerger from "@/components/DocumentMerger";
import CoverLetterMaker from "@/components/CoverLetterMaker";

type ModuleType = "table" | "resume" | "merger" | "cover-letter";

const Index: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>("table");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "table":
        return <TableEditor />;
      case "resume":
        return <ResumeMaker />;
      case "merger":
        return <DocumentMerger />;
      case "cover-letter":
        return <CoverLetterMaker />;
      default:
        return <TableEditor />;
    }
  };

  return (
    <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
      {renderActiveModule()}
    </Layout>
  );
};

export default Index;
