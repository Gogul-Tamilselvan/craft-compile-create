
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon, UploadIcon, PrinterIcon } from "lucide-react";
import { toast } from "sonner";

interface TableData {
  headers: string[];
  rows: string[][];
}

const TableEditor: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>({
    headers: ["Column 1", "Column 2", "Column 3"],
    rows: [
      ["Data 1", "Data 2", "Data 3"],
      ["Data 4", "Data 5", "Data 6"],
    ],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const addColumn = () => {
    const newHeader = `Column ${tableData.headers.length + 1}`;
    const newHeaders = [...tableData.headers, newHeader];
    const newRows = tableData.rows.map((row) => [...row, ""]);
    setTableData({ headers: newHeaders, rows: newRows });
  };

  const removeColumn = (index: number) => {
    if (tableData.headers.length <= 1) {
      toast.warning("Table must have at least one column");
      return;
    }
    
    const newHeaders = tableData.headers.filter((_, i) => i !== index);
    const newRows = tableData.rows.map((row) => row.filter((_, i) => i !== index));
    setTableData({ headers: newHeaders, rows: newRows });
  };

  const addRow = () => {
    const newRow = Array(tableData.headers.length).fill("");
    setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
  };

  const removeRow = (index: number) => {
    const newRows = tableData.rows.filter((_, i) => i !== index);
    setTableData({ ...tableData, rows: newRows });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...tableData.headers];
    newHeaders[index] = value;
    setTableData({ ...tableData, headers: newHeaders });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    setTableData({ ...tableData, rows: newRows });
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (jsonData && jsonData.headers && Array.isArray(jsonData.headers) && 
            jsonData.rows && Array.isArray(jsonData.rows)) {
          setTableData(jsonData);
          toast.success("Table data imported successfully");
        } else {
          toast.error("Invalid JSON format. Expected {headers: [], rows: [[]]}");
        }
      } catch (error) {
        toast.error("Error parsing JSON file");
        console.error(error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input value to allow importing the same file again
    event.target.value = "";
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups for printing.");
      return;
    }

    const tableStyles = `
      <style>
        @page {
          size: landscape;
          margin: 1cm;
        }
        body {
          font-family: Arial, sans-serif;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          position: sticky;
          top: 0;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
    `;

    const tableHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Table Print</title>
          ${tableStyles}
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${tableData.headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableData.rows.map(row => 
                `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
              ).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 500);
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(tableHTML);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6" ref={tableRef}>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Custom Table Editor</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <UploadIcon className="w-4 h-4 mr-2" />
            Import JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <PrinterIcon className="w-4 h-4 mr-2" />
            Print
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableData.headers.map((header, index) => (
                <th 
                  key={index} 
                  className="px-3 py-2 text-left bg-gray-50 border-b border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <Input
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="min-w-[100px] h-8 text-sm"
                      placeholder="Column Title"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-600"
                      onClick={() => removeColumn(index)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </th>
              ))}
              <th className="px-3 py-2 text-left bg-gray-50 border-b border-gray-200">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-blue-600 hover:text-blue-800"
                  onClick={addColumn}
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Column
                </Button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-3 py-2 border-b border-gray-200">
                    <Input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="min-w-[100px] h-8 text-sm"
                      placeholder="Enter data"
                    />
                  </td>
                ))}
                <td className="px-3 py-2 border-b border-gray-200">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                    onClick={() => removeRow(rowIndex)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td 
                colSpan={tableData.headers.length + 1} 
                className="px-3 py-2 border-b border-gray-200"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-blue-600 hover:text-blue-800"
                  onClick={addRow}
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Row
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEditor;
