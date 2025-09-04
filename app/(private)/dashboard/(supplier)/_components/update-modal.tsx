



"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateText } from "@/lib/utils";
import { mutate } from "swr";

interface Variation {
  id: string;
  stock: number;
  size?: string;
  color?: string;
  [key: string]: any;
}

interface StockPriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  itemData?: any;
}

export function StockPriceModal({
  open,
  onOpenChange,
  productId,
  itemData,
}: StockPriceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [variations, setVariations] = useState<Variation[]>([]);

  const data = itemData;
  const isLoading = !itemData;

  // Reset all state when modal closes
  useEffect(() => {
    if (!open) {
      setPrice(0);
      setStock(0);
      setVariations([]);
      setIsSubmitting(false);
    }
  }, [open]);

  // Initialize form data when modal opens with new data
  useEffect(() => {
    if (data && open) {
      // Reset all state first
      setPrice(0);
      setStock(0);
      setVariations([]);

      // Then set new data
      setPrice(data.price || 0);

      if (data.variations && data.variations.length > 0) {
        setVariations(
          data.variations.map((v: any) => ({
            ...v,
            stock: v.stock || 0,
          }))
        );
        setStock(0); // Ensure stock is 0 for variation products
      } else {
        setStock(data.stock || 0);
        setVariations([]); // Ensure variations is empty for single products
      }
    }
  }, [data, open, productId]);

  const updateStock = async () => {
    setIsSubmitting(true);
    try {
      const updateData = {
        price,
        ...(variations.length > 0 ? { variations } : { stock }),
      };

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorResult = await response.json();
        errorToast(errorResult.error || "Failed to update");
        return;
      }

      const result = await response.json();
       mutate("/api/products/supplier/");
      successToast(result.message || "Updated successfully");

      // Reset state and close modal
      setPrice(0);
      setStock(0);
      setVariations([]);
      onOpenChange(false);
    } catch (error) {
      errorToast("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjustVariationStock = (index: number, change: number) => {
    setVariations((prev) =>
      prev.map((variation, i) =>
        i === index
          ? { ...variation, stock: Math.max(0, variation.stock + change) }
          : variation
      )
    );
  };

  const adjustSingleStock = (change: number) => {
    setStock((prev) => Math.max(0, prev + change));
  };

  const getVariationName = (variation: Variation) => {
    const parts = [];
    if (variation.size) parts.push(variation.size);
    if (variation.colors) parts.push(variation.colors);
    return parts.length > 0 ? parts.join(" / ") : `Variant`;
  };

  if (!open) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md h-[500px] rounded-lg bg-background p-6 shadow-xl"
        >
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md h-[600px] max-h-[90vh] rounded-lg bg-background shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between border-b p-6 pb-4 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold">Update Stock & Price</h2>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {truncateText(data?.name, 15)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // Reset state when closing via X button
              setPrice(0);
              setStock(0);
              setVariations([]);
              onOpenChange(false);
            }}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Price Section */}
              <div className="space-y-3">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="text-lg font-medium"
                />
              </div>

              {/* Stock Section */}
              <div className="space-y-4">
                <Label>Stock Management</Label>

                {variations.length > 0 ? (
                  // Variations
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Manage stock for each variation
                    </p>
                    {variations.map((variation, index) => (
                      <div
                        key={variation.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {getVariationName(variation)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Current: {variation.stock} units
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => adjustVariationStock(index, -1)}
                            disabled={variation.stock <= 0}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {variation.stock}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => adjustVariationStock(index, 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Single Product
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Adjust stock quantity
                    </p>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Product Stock</p>
                        <p className="text-sm text-muted-foreground">
                          Current: {stock} units
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => adjustSingleStock(-1)}
                          disabled={stock <= 0}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {stock}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => adjustSingleStock(1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Quick Stock Input */}
                    <div className="space-y-2">
                      <Label htmlFor="stock-input" className="text-sm">
                        Or set exact amount:
                      </Label>
                      <Input
                        id="stock-input"
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) =>
                          setStock(Math.max(0, Number(e.target.value)))
                        }
                        placeholder="Enter stock quantity"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer - Fixed */}
        <div className="flex gap-3 border-t p-6 pt-4 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => {
              // Reset state when canceling
              setPrice(0);
              setStock(0);
              setVariations([]);
              onOpenChange(false);
            }}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={updateStock}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}