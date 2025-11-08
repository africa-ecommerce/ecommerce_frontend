import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { useState } from "react";
import { mutate } from "swr";

// Add this component before the main Inventory component or in a separate file
export const SyncStoreModal = ({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) => {
  const [storeUrl, setStoreUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    if (!storeUrl.trim()) {
      errorToast("Please enter a store URL");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/products/sync-store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ storeUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        errorToast(result.error || "Failed to sync store");
        return;
      }

      successToast(result.message || "Store synced successfully!");
      onOpenChange(false);
      setStoreUrl("");
      // Refresh products list
    } catch (error) {
      errorToast("An error occurred while syncing your store");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sync Your Existing Store</DialogTitle>
          <DialogDescription>
            Import products from your existing online store. Enter your store URL below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="storeUrl" className="text-sm font-medium">
              Store URL
            </label>
            <Input
              id="storeUrl"
              placeholder="https://yourstore.com"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Supported platforms: Shopify, WooCommerce, and more
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSync} disabled={isLoading}>
            {isLoading ? "Syncing..." : "Sync Store"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
