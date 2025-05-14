
import React from "react";
import { TableIcon, FileTextIcon, FilesIcon, FileEditIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleType = "table" | "resume" | "merger" | "cover-letter";

interface LayoutProps {
  children: React.ReactNode;
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeModule, 
  setActiveModule 
}) => {
  const modules = [
    { id: "table", name: "Table Editor", icon: <TableIcon className="w-5 h-5" /> },
    { id: "resume", name: "Resume Maker", icon: <FileTextIcon className="w-5 h-5" /> },
    { id: "merger", name: "Document Merger", icon: <FilesIcon className="w-5 h-5" /> },
    { id: "cover-letter", name: "Cover Letter", icon: <FileEditIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Document Management Suite</h1>
          </div>
        </div>
      </header>
      
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id as ModuleType)}
                className={cn(
                  "flex items-center py-4 px-4 text-sm font-medium border-b-2 min-w-max",
                  activeModule === module.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <span className="mr-2">{module.icon}</span>
                {module.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Document Management Suite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
