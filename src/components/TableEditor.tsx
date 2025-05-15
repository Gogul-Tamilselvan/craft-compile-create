
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon, UploadIcon, DownloadIcon, Table, Info, Maximize, Minimize } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import InfoTooltip from "./InfoTooltip";
import {
  Table as UITable,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface TableData {
  headers: string[];
  rows: string[][];
}

interface ColumnSettings {
  width: number;  // Width in mm for PDF export
  visible: boolean;
}

interface PrintSettings {
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  orientation: 'portrait' | 'landscape';
  paperSize: 'a4' | 'letter' | 'legal';
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
  const [columnSettings, setColumnSettings] = useState<ColumnSettings[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [tableBorderWidth, setTableBorderWidth] = useState<number>(0.5); // Border width in points
  const [printSettings, setPrintSettings] = useState<PrintSettings>({
    margins: {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
    },
    orientation: 'landscape',
    paperSize: 'a4'
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Initialize column settings when tableData changes
  useEffect(() => {
    // Only initialize if columnSettings is empty or the number of headers has changed
    if (columnSettings.length !== tableData.headers.length) {
      const initialSettings = tableData.headers.map(() => ({
        width: columnWidth,
        visible: true
      }));
      setColumnSettings(initialSettings);
    }
  }, [tableData.headers, columnWidth]);

  const addColumn = () => {
    const newHeader = `Column ${tableData.headers.length + 1}`;
    const newHeaders = [...tableData.headers, newHeader];
    const newRows = tableData.rows.map((row) => [...row, ""]);
    setTableData({ headers: newHeaders, rows: newRows });
    
    // Add default settings for the new column
    setColumnSettings([...columnSettings, { width: columnWidth, visible: true }]);
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
    
    // Remove settings for the deleted column
    setColumnSettings(columnSettings.filter((_, i) => i !== index));
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

  const updateColumnWidth = (index: number, newWidth: number) => {
    const newSettings = [...columnSettings];
    newSettings[index] = { ...newSettings[index], width: newWidth };
    setColumnSettings(newSettings);
  };

  const toggleColumnVisibility = (index: number) => {
    const newSettings = [...columnSettings];
    newSettings[index] = { ...newSettings[index], visible: !newSettings[index].visible };
    setColumnSettings(newSettings);
  };

  // Update margin settings
  const updateMargin = (side: keyof PrintSettings['margins'], value: number) => {
    setPrintSettings(prev => ({
      ...prev,
      margins: {
        ...prev.margins,
        [side]: value
      }
    }));
  };
  
  // Update orientation
  const setOrientation = (orientation: 'portrait' | 'landscape') => {
    setPrintSettings(prev => ({
      ...prev,
      orientation
    }));
  };
  
  // Update paper size
  const setPaperSize = (paperSize: 'a4' | 'letter' | 'legal') => {
    setPrintSettings(prev => ({
      ...prev,
      paperSize
    }));
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    
    try {
      // Generate PDF using jsPDF
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: printSettings.orientation,
        unit: 'mm',
        format: printSettings.paperSize
      });
      
      // Get visible columns
      const visibleColumns = tableData.headers.map((header, index) => ({
        header,
        index,
        width: columnSettings[index]?.width || columnWidth,
        visible: columnSettings[index]?.visible !== false
      })).filter(col => col.visible);
      
      // Add table headers
      const { top, right, bottom, left } = printSettings.margins;
      let y = top;
      const margin = left;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - left - right;
      let currentPage = 1;
      
      // Add title
      doc.setFontSize(16);
      doc.text("Table Export", margin, y);
      y += 10;
      
      // Set border width
      doc.setLineWidth(tableBorderWidth);
      
      // Helper function to add a page
      const addPage = () => {
        doc.addPage();
        currentPage++;
        y = top;
        // Add page number
        doc.setFontSize(10);
        doc.text(`Page ${currentPage}`, pageWidth - right - 20, 10);
        // Reset to default font size
        doc.setFontSize(12);
      };
      
      // Calculate total width of all visible columns
      const totalColWidth = visibleColumns.reduce((sum, col) => sum + col.width, 0);
      
      // Adjust column widths if total exceeds content width
      const scaleFactor = totalColWidth > contentWidth ? contentWidth / totalColWidth : 1;
      
      // Process the table with visible columns and adjusted widths
      const processTable = () => {
        let xPos = margin;
        
        // Draw header cells with borders
        doc.setFillColor(240, 240, 240);
        visibleColumns.forEach((col) => {
          const adjustedWidth = col.width * scaleFactor;
          
          // Draw header cell background
          doc.rect(xPos, y - 5, adjustedWidth, 8, 'FD');
          
          // Draw header text
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100);
          doc.text(col.header, xPos + 2, y);
          
          xPos += adjustedWidth;
        });
        
        y += 8; // Space after headers
        
        // Draw rows
        doc.setTextColor(0, 0, 0);
        tableData.rows.forEach((row) => {
          // Check if we need a new page
          if (y > pageHeight - bottom) {
            addPage();
            
            // Re-draw headers on the new page
            xPos = margin;
            doc.setFillColor(240, 240, 240);
            visibleColumns.forEach((col) => {
              const adjustedWidth = col.width * scaleFactor;
              doc.rect(xPos, y - 5, adjustedWidth, 8, 'FD');
              doc.setFontSize(12);
              doc.setTextColor(100, 100, 100);
              doc.text(col.header, xPos + 2, y);
              xPos += adjustedWidth;
            });
            
            doc.setTextColor(0, 0, 0);
            y += 8;
          }
          
          // Draw row cells with borders
          xPos = margin;
          let maxHeight = 8; // Default row height
          
          // First pass: calculate max height needed for this row
          visibleColumns.forEach((col) => {
            const cellText = row[col.index] || '';
            const adjustedWidth = col.width * scaleFactor;
            
            // Estimate lines needed based on text length and cell width
            const fontSize = 12; // This matches the fontSize we set with doc.setFontSize(12)
            const textWidth = doc.getStringUnitWidth(cellText) * fontSize / doc.internal.scaleFactor;
            const linesNeeded = Math.max(1, Math.ceil(textWidth / (adjustedWidth - 4)));
            const cellHeight = linesNeeded * 5 + 3; // 5mm per line + padding
            
            if (cellHeight > maxHeight) {
              maxHeight = cellHeight;
            }
          });
          
          // Second pass: draw cells with uniform height
          visibleColumns.forEach((col) => {
            const cellText = row[col.index] || '';
            const adjustedWidth = col.width * scaleFactor;
            
            // Draw cell border
            doc.rect(xPos, y - 5, adjustedWidth, maxHeight);
            
            // Draw cell content with word wrapping
            const textOptions = {
              maxWidth: adjustedWidth - 4,
              lineHeightFactor: 1.2
            };
            
            doc.text(cellText, xPos + 2, y, textOptions);
            xPos += adjustedWidth;
          });
          
          y += maxHeight; // Use calculated height for the row
        });
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1"
          >
            <Table className="w-4 h-4 mr-1" />
            {showSettings ? "Hide Settings" : "Table Settings"}
          </Button>
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

      {showSettings && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Table Export Settings</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-md font-medium mb-2">Page Setup</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Orientation</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={printSettings.orientation === 'portrait' ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setOrientation('portrait')}
                    >
                      Portrait
                    </Button>
                    <Button 
                      variant={printSettings.orientation === 'landscape' ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setOrientation('landscape')}
                    >
                      Landscape
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Paper Size</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={printSettings.paperSize === 'a4' ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setPaperSize('a4')}
                    >
                      A4
                    </Button>
                    <Button 
                      variant={printSettings.paperSize === 'letter' ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setPaperSize('letter')}
                    >
                      Letter
                    </Button>
                    <Button 
                      variant={printSettings.paperSize === 'legal' ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setPaperSize('legal')}
                    >
                      Legal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-2">Margins (mm)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Top Margin: {printSettings.margins.top}mm</label>
                  <Slider 
                    value={[printSettings.margins.top]} 
                    min={5} 
                    max={50} 
                    step={1} 
                    onValueChange={(values) => updateMargin('top', values[0])} 
                    className="w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bottom Margin: {printSettings.margins.bottom}mm</label>
                  <Slider 
                    value={[printSettings.margins.bottom]} 
                    min={5} 
                    max={50} 
                    step={1} 
                    onValueChange={(values) => updateMargin('bottom', values[0])} 
                    className="w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Left Margin: {printSettings.margins.left}mm</label>
                  <Slider 
                    value={[printSettings.margins.left]} 
                    min={5} 
                    max={50} 
                    step={1} 
                    onValueChange={(values) => updateMargin('left', values[0])} 
                    className="w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Right Margin: {printSettings.margins.right}mm</label>
                  <Slider 
                    value={[printSettings.margins.right]} 
                    min={5} 
                    max={50} 
                    step={1} 
                    onValueChange={(values) => updateMargin('right', values[0])} 
                    className="w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
          
            <div>
              <label className="block text-sm font-medium mb-1">Table Border Width: {tableBorderWidth.toFixed(1)}pt</label>
              <Slider 
                value={[tableBorderWidth]} 
                min={0.1} 
                max={2.0} 
                step={0.1} 
                onValueChange={(values) => setTableBorderWidth(values[0])} 
                className="w-full max-w-xs"
              />
            </div>
            
            <div>
              <h4 className="text-md font-medium">Column Settings</h4>
              <p className="text-sm text-gray-600">Adjust width for individual columns to avoid text overlapping.</p>
              
              <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3">Column</th>
                      <th className="text-left py-2 px-3">Width (mm)</th>
                      <th className="text-left py-2 px-3">Visible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.headers.map((header, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-3">{header}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => updateColumnWidth(index, Math.max(20, (columnSettings[index]?.width || columnWidth) - 5))}
                              className="h-7 w-7 p-0"
                            >
                              <Minimize className="h-3 w-3" />
                            </Button>
                            <Input 
                              type="number" 
                              min={20} 
                              max={100} 
                              value={columnSettings[index]?.width || columnWidth} 
                              onChange={(e) => updateColumnWidth(index, Number(e.target.value))}
                              className="w-16 h-8 text-sm"
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => updateColumnWidth(index, Math.min(100, (columnSettings[index]?.width || columnWidth) + 5))}
                              className="h-7 w-7 p-0"
                            >
                              <Maximize className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <input 
                            type="checkbox" 
                            checked={columnSettings[index]?.visible !== false} 
                            onChange={() => toggleColumnVisibility(index)} 
                            className="h-4 w-4"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <UITable className="border-collapse">
          <TableHeader>
            <TableRow>
              {tableData.headers.map((header, index) => (
                <TableHead 
                  key={index} 
                  className="px-3 py-2 text-left bg-gray-50 border border-gray-200"
                  style={columnSettings[index]?.visible === false ? { display: 'none' } : {}}
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
                </TableHead>
              ))}
              <TableHead className="px-3 py-2 text-left bg-gray-50 border border-gray-200">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-blue-600 hover:text-blue-800"
                  onClick={addColumn}
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Column
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell 
                    key={colIndex} 
                    className="px-3 py-2 border border-gray-200"
                    style={columnSettings[colIndex]?.visible === false ? { display: 'none' } : {}}
                  >
                    <Input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="min-w-[100px] h-8 text-sm"
                      placeholder="Enter data"
                    />
                  </TableCell>
                ))}
                <TableCell className="px-3 py-2 border border-gray-200">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                    onClick={() => removeRow(rowIndex)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell 
                colSpan={tableData.headers.length + 1} 
                className="px-3 py-2 border border-gray-200"
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
              </TableCell>
            </TableRow>
          </TableBody>
        </UITable>
      </div>
    </div>
  );
};

export default TableEditor;
