
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon, UploadIcon, PrinterIcon, DownloadIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import InfoTooltip from "./InfoTooltip";

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
  const [columnWidth, setColumnWidth] = useState<number>(40); // Default column width in mm

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
      // Use the user-adjustable columnWidth
      const availableWidth = pageWidth - 2 * margin;
      const maxColumns = Math.floor(availableWidth / columnWidth);
      let currentPage = 1;
      
      // Add title
      doc.setFontSize(16);
      doc.text("Table Export", margin, y);
      y += 10;
      
      // Helper function to add a page
      const addPage = () => {
        doc.addPage();
        currentPage++;
        y = 20;
        // Add page number
        doc.setFontSize(10);
        doc.text(`Page ${currentPage}`, pageWidth - 20, 10);
        // Reset to default font size
        doc.setFontSize(12);
      };
      
      // Process headers and rows in chunks based on column width
      const processTable = () => {
        for (let startCol = 0; startCol < tableData.headers.length; startCol += maxColumns) {
          const endCol = Math.min(startCol + maxColumns, tableData.headers.length);
          const currentHeaders = tableData.headers.slice(startCol, endCol);
          
          // Add headers
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100);
          currentHeaders.forEach((header, i) => {
            doc.text(header, margin + i * columnWidth, y);
          });
          
          y += 10;
          
          // Add rows
          doc.setTextColor(0, 0, 0);
          tableData.rows.forEach((row, rowIndex) => {
            // Check if we need a new page
            if (y > doc.internal.pageSize.getHeight() - 20) {
              addPage();
              
              // Re-add headers on the new page
              doc.setTextColor(100, 100, 100);
              currentHeaders.forEach((header, i) => {
                doc.text(header, margin + i * columnWidth, y);
              });
              
              y += 10;
              doc.setTextColor(0, 0, 0);
            }
            
            const currentCells = row.slice(startCol, endCol);
            currentCells.forEach((cell, i) => {
              // Ensure text doesn't overflow the cell width
              const cellText = cell.length > 20 ? cell.substring(0, 17) + "..." : cell;
              doc.text(cellText, margin + i * columnWidth, y);
            });
            
            y += 8; // Space between rows
          });
          
          // If we have more columns to process, add a new page
          if (endCol < tableData.headers.length) {
            addPage();
          }
        }
      };
      
      processTable();
      
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

  const tableJsonFormat = (
    <div>
      <p className="font-medium mb-1">Expected JSON Format:</p>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
{`{
  "headers": ["Column 1", "Column 2", "Column 3"],
  "rows": [
    ["Data 1", "Data 2", "Data 3"],
    ["Data 4", "Data 5", "Data 6"]
  ]
}`}
      </pre>
    </div>
  );

  return (
    <div className="space-y-6" ref={tableRef}>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">Custom Table Editor</h2>
          <InfoTooltip content={tableJsonFormat} />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 mr-2">
            <label htmlFor="columnWidth" className="text-sm whitespace-nowrap">Column Width:</label>
            <Input
              id="columnWidth"
              type="number"
              min={20}
              max={100}
              value={columnWidth}
              onChange={(e) => setColumnWidth(Number(e.target.value))}
              className="w-20 h-8"
            />
            <span className="text-sm">mm</span>
          </div>
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
