
import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { Company } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import CompanyForm from "./CompanyForm";

const CompanyList: React.FC = () => {
  const { companies, deleteCompany } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id);
      toast({
        title: "Company deleted",
        description: "The company has been successfully deleted.",
      });
    }
  };

  const handleAddNew = () => {
    setEditingCompany(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No companies found. Add your first company to get started.</p>
          </div>
        ) : (
          companies.map((company) => (
            <Card key={company.id}>
              <CardHeader className="pb-2">
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {company.contactName && (
                    <p className="text-sm">
                      <span className="font-medium">Contact:</span> {company.contactName}
                    </p>
                  )}
                  {company.contactEmail && (
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {company.contactEmail}
                    </p>
                  )}
                  {company.contactPhone && (
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {company.contactPhone}
                    </p>
                  )}
                  {company.address && (
                    <p className="text-sm">
                      <span className="font-medium">Address:</span> {company.address}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(company)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(company.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCompany ? "Edit Company" : "Add New Company"}
            </DialogTitle>
          </DialogHeader>
          <CompanyForm
            company={editingCompany}
            onClose={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyList;
