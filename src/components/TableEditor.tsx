import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon, UploadIcon, PrinterIcon, DownloadIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [isPrinting, setIsPrinting] = useState(false);

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
      toast({
        description: "Table must have at least one column",
        variant: "destructive"
      });
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
          toast({
            description: "Table data imported successfully",
          });
        } else {
          toast({
            description: "Invalid JSON format. Expected {headers: [], rows: [[]]}",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          description: "Error parsing JSON file",
          variant: "destructive"
        });
        console.error(error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input value to allow importing the same file again
    event.target.value = "";
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    
    try {
      // Generate PDF using jsPDF directly instead of popup window
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add table headers
      let y = 20;
      const margin = 10;
      const pageWidth = doc.internal.pageSize.getWidth();
      const columnWidth = (pageWidth - 2 * margin) / tableData.headers.length;
      
      // Add title
      doc.setFontSize(16);
      doc.text("Table Export", margin, y);
      y += 10;
      
      // Add headers
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      tableData.headers.forEach((header, i) => {
        doc.text(header, margin + i * columnWidth, y);
      });
      
      // Add rows
      doc.setTextColor(0, 0, 0);
      tableData.rows.forEach((row) => {
        y += 10;
        row.forEach((cell, i) => {
          doc.text(cell, margin + i * columnWidth, y);
        });
      });
      
      // Save PDF
      doc.save('table-export.pdf');
      
      toast({
        description: "Table exported successfully"
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Error",
        description: "Error exporting table",
        variant: "destructive"
      });
    } finally {
      setIsPrinting(false);
    }
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrint}
            disabled={isPrinting}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            {isPrinting ? "Exporting..." : "Export PDF"}
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
