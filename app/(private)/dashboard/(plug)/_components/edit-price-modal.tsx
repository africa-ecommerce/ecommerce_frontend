"use client";

import type React from "react";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";

interface PriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch pricing data");
    return res.json();
  });

export function EditPriceModal({
  open,
  onOpenChange,
  itemId,
}: PriceModalProps) {
  const [price, setPrice] = useState<string>("");
  const [profit, setProfit] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch pricing data with useSWR - only when modal is open and itemId exists
  const {
  data,
  error: swrError,
  isLoading,
  mutate,
} = useSWR(
  open && itemId ? [`/api/plug/products/${itemId}`, 'edit-price-modal'] : null, 
  ([url]) => fetcher(url),
  {
    // Using a dedicated cache namespace
    dedupingInterval: 0, // Disable deduping to ensure fresh data each time
    revalidateOnFocus: false // Prevent revalidation on focus which could affect other components
  }

);

console.log("editModal", data)

  // Calculate profit whenever price changes
  useEffect(() => {
    if (!data?.data) return;

    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    // Validate minimum price
    if (touched) {
      if (!price) {
        setError("Please enter a price");
      } else if (numericPrice < data.data.originalPrice) {
        setError(
          `Price must be at least ₦${data.data.originalPrice?.toLocaleString()}`
        );
      } else {
        setError(null);
        setProfit(numericPrice - data.data.originalPrice);
      }
    }
  }, [price, touched, data]);

  // Format price with commas as thousands separators
  const formatPrice = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Format with commas
    if (numericValue) {
      const parts = numericValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return numericValue;
  };

  // Helper function to format days remaining into a readable string
  const formatDaysRemaining = (daysRemaining: number) => {
    if (daysRemaining === 0) return "Today";
    if (daysRemaining === 1) return "Tomorrow";
    return `${daysRemaining} days from now`;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setPrice(formatPrice(rawValue));
    if (!touched) setTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.data) return;

    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    if (!price || numericPrice < data.data.originalPrice) {
      setTouched(true);
      return;
    }
    setIsSubmitting(true);

    try {
      // Call the API to save the new price
      const response = await fetch(`/api/plug/products/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: numericPrice,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        errorToast(errorResult.error || "Server error");
      }

      const result = await response.json();
      successToast(result.message);

      // Reset form
      setPrice("");
      setProfit(0);
      setTouched(false);
      onOpenChange(false);
    } catch (error) {
      errorToast("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal opens with a different item
  useEffect(() => {
    if (open && data?.data?.pendingPrice) {
      setPrice(data.data?.pendingPrice?.toLocaleString());
      setProfit(0);
      setTouched(false);
      setError(null);
    }
  }, [open, data]);

  // Handle SWR error
  if (swrError && open) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm md:max-w-md">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              Failed to load pricing data. Please try again later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Price</DialogTitle>
          {isLoading ? (
            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <DialogDescription>
              {data?.data && (
                <>
                  Set a price for your product. Minimum price is ₦
                  {data.data.originalPrice?.toLocaleString()}.
                </>
              )}
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Price Change Notification */}
            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertTitle>Price Change Notice</AlertTitle>
              <AlertDescription>
                Any price changes will take effect in 3 days from submission.
              </AlertDescription>
            </Alert>

            {/* Pending Price Change Display */}
            {data?.data?.pendingPrice && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-800">
                  Pending Price Change
                </h4>
                <div className="mb-2">
                  <span className="text-sm text-blue-700">Pending Price: </span>
                  <span className="font-medium text-blue-900">
                    ₦{data.data.pendingPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-blue-700">Effective: </span>
                  <span className="font-medium text-blue-900">
                    {formatDaysRemaining(data.data.priceEffectiveAt)}
                  </span>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="price">Price (NGN)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₦
                </span>
                {isLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    className={cn(
                      "pl-7",
                      error ? "border-red-500 focus-visible:ring-red-500" : ""
                    )}
                    placeholder="0.00"
                    aria-invalid={!!error}
                    aria-describedby={error ? "price-error" : undefined}
                    disabled={isSubmitting}
                  />
                )}
              </div>
              {error && (
                <p
                  id="price-error"
                  className="text-sm font-medium text-red-500"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                Profit Calculation
              </div>
              {isLoading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <div className="flex items-center">
                  <span className="font-medium">
                    ₦
                    {profit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Price"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}