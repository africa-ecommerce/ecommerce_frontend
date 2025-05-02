import React, { useState } from 'react'
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription 
} from "@/components/ui/alert-dialog";
import { RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  productToDelete: string;
  setProductToDelete: (productToDelete: string) => void;
  deleteResource: (productToDelete: string) => Promise<
    | {
        success: boolean;
        error: null;
      }
    | {
        success: boolean;
        error: string;
      }
  >;
    }
  

const DeleteDialog = ({
  productToDelete,
  setProductToDelete,
  deleteResource
  
}: DeleteDialogProps) => {

  const [isDeleting, setIsDeleting] = useState(false)
  return (
    <div>
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete("")}
      >
        <AlertDialogContent className="max-w-[350px] sm:max-w-[425px]">
          <AlertDialogTitle className="text-base sm:text-lg">
            Delete Product
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setProductToDelete("")}
              className="text-xs h-8"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs h-8"
              onClick={async () => {
                try {
                  setIsDeleting(true);
                  const result = await deleteResource(productToDelete);
                  if (result.success) {
                    setProductToDelete(""); // Clear delete state
                    
                  }
                } catch (error) {
                  console.error("Delete failed:", error);
                } finally{
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />{" "}
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </>
              )}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDialog;
