import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, UploadIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { PDFDocument } from "pdf-lib";
import InfoTooltip from "./InfoTooltip";

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: File;
  preview?: string;
}

const DocumentMerger: React.FC = () => {
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [merging, setMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFilesArray = Array.from(e.target.files);
    
    // Validate file types
    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    const invalidFiles = newFilesArray.filter((file) => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        description: `Invalid file type(s): ${invalidFiles.map((f) => f.name).join(", ")}`,
        variant: "destructive"
      });
      
      // Filter out invalid files
      const validFiles = newFilesArray.filter((file) => validTypes.includes(file.type));
      if (validFiles.length === 0) {
        e.target.value = "";
        return;
      }
    }

    // Process valid files
    const newFiles: DocumentFile[] = [];
    
    for (const file of newFilesArray) {
      if (!validTypes.includes(file.type)) continue;
      
      const preview = file.type.startsWith("image/") 
        ? URL.createObjectURL(file) 
        : file.type === "application/pdf"
        ? await generatePdfThumbnail(file)
        : undefined;
      
      newFiles.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        preview,
      });
    }
    
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    e.target.value = "";
    
    toast({
      description: `${newFiles.length} file(s) added`,
    });
  };

  const generatePdfThumbnail = async (file: File): Promise<string | undefined> => {
    try {
      // This is just a placeholder since we can't actually render PDF thumbnails in this environment
      // In a real app, we would use a library like pdf.js to render the first page
      return "/placeholder.svg";
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
      return undefined;
    }
  };

  const removeFile = (id: string) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file.id !== id);
      return newFiles;
    });
  };

  const moveFileUp = (index: number) => {
    if (index <= 0) return;
    
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index - 1];
      newFiles[index - 1] = temp;
      return newFiles;
    });
  };

  const moveFileDown = (index: number) => {
    if (index >= files.length - 1) return;
    
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index + 1];
      newFiles[index + 1] = temp;
      return newFiles;
    });
  };

  const mergeDocuments = async () => {
    if (files.length === 0) {
      toast({
        description: "Please add files to merge",
        variant: "destructive"
      });
      return;
    }
    
    if (files.length === 1) {
      toast({
        description: "Please add at least two files to merge",
        variant: "destructive"
      });
      return;
    }
    
    setMerging(true);
    
    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      
      // For PDF files only
      const pdfFiles = files.filter(file => file.type === "application/pdf");
      
      if (pdfFiles.length === 0) {
        toast({
          title: "Error",
          description: "No PDF files to merge. Currently only PDF merging is supported.",
          variant: "destructive"
        });
        setMerging(false);
        return;
      }
      
      // Process each PDF file
      for (const file of pdfFiles) {
        try {
          // Read file as ArrayBuffer
          const fileBytes = await file.data.arrayBuffer();
          
          // Load PDF document
          const pdfDoc = await PDFDocument.load(fileBytes);
          
          // Copy pages from source document
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          
          // Add copied pages to merged document
          copiedPages.forEach(page => mergedPdf.addPage(page));
          
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
        }
      }
      
      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();
      
      // Convert to Blob and create download link
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        description: "Documents merged successfully"
      });
    } catch (error) {
      console.error("Error merging documents:", error);
      toast({
        title: "Error",
        description: "Failed to merge documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setMerging(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const documentMergerInfo = (
    <div>
      <p className="font-medium mb-1">Supported File Formats:</p>
      <ul className="list-disc pl-4 text-xs mb-2">
        <li>PDF (.pdf) - For merging</li>
        <li>Images (.png, .jpg, .jpeg)</li>
        <li>Documents (.doc, .docx)</li>
      </ul>
      <p className="text-xs">Note: Currently only PDF files can be merged together.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">Document Merger</h2>
          <InfoTooltip content={documentMergerInfo} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleFileUpload} disabled={merging}>
            <UploadIcon className="w-4 h-4 mr-2" />
            Add Files
          </Button>
          <Button variant="default" size="sm" onClick={mergeDocuments} disabled={files.length < 2 || merging}>
            <DownloadIcon className="w-4 h-4 mr-2" />
            Merge & Download
          </Button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {files.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No files added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Click "Add Files" to upload documents for merging
            </p>
            <div className="mt-6">
              <Button variant="outline" onClick={handleFileUpload}>
                <UploadIcon className="w-4 h-4 mr-2" />
                Add Files
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="font-medium text-sm text-gray-500">
              Drag and rearrange files to set the order for the merged document
            </div>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div 
                  key={file.id} 
                  className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex-shrink-0 h-12 w-12 mr-4 bg-gray-200 rounded overflow-hidden">
                    {file.preview ? (
                      <img 
                        src={file.preview} 
                        alt={file.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        {file.type.includes("pdf") ? "PDF" : 
                          file.type.includes("word") ? "DOC" : "FILE"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.type.split("/")[1].toUpperCase()}
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center ml-2 space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveFileUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveFileDown(index)}
                      disabled={index === files.length - 1}
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-600"
                      onClick={() => removeFile(file.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentMerger;
