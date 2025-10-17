"use client";

import { useState, useEffect } from "react";
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
import { TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { mutate } from "swr";
import { ShareModal } from "@/app/(private)/dashboard/(plug)/_components/share-modal";
import { useUser } from "@/app/_components/provider/UserContext";

interface CommissionData {
  sellingPrice: number;
  supplierPrice: number;
  plugMargin: number;
  marginPercent: number;
  commissionRate: number;
  platformCommission: number;
  plugTakeHome: number;
}

interface DirectShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    minPrice: number;
    maxPrice: number;
  } | null;
  onSuccess?: () => void;
}

// Commission calculation function
function calculateCommission(
  supplierPrice: number,
  sellingPrice: number
): CommissionData {
  const plugMargin = sellingPrice - supplierPrice;
  const marginPercent = (plugMargin / supplierPrice) * 100;
  let commissionRate = 0.2; // Default to 20%

  // Scale commission based on margin
  if (marginPercent >= 60) {
    commissionRate = 0.15; // Reward high margin
  } else if (marginPercent >= 30) {
    commissionRate = 0.175;
  }

  const platformCommission = plugMargin * commissionRate;
  const plugTakeHome = plugMargin - platformCommission;

  return {
    sellingPrice,
    supplierPrice,
    plugMargin,
    marginPercent,
    commissionRate: commissionRate * 100, // in %
    platformCommission,
    plugTakeHome,
  };
}

export function DirectShareModal({
  open,
  onOpenChange,
  product,
  onSuccess,
}: DirectShareModalProps) {
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [commissionData, setCommissionData] = useState<CommissionData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const [sharedProduct, setSharedProduct] = useState<any | null>(null);

  const [ sharedProductId, setSharedProductId] = useState("")


  const { userData } = useUser();
  const { user } = userData || { user: null };

  // Calculate commission data whenever price changes
  useEffect(() => {
    if (!product) return;

    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    if (touched) {
      if (!price) {
        setError("Please enter a price");
        setCommissionData(null);
      } else if (numericPrice < product.minPrice) {
        setError(
          `Price must be at least ₦${product.minPrice.toLocaleString()}`
        );
        setCommissionData(null);
      } else if (product.maxPrice > 0 && numericPrice > product.maxPrice) {
        setError(`Price cannot exceed ₦${product.maxPrice.toLocaleString()}`);
        setCommissionData(null);
      } else {
        setError(null);
        const commission = calculateCommission(product.price, numericPrice);
        setCommissionData(commission);
      }
    }
  }, [price, touched, product]);

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (numericValue) {
      const parts = numericValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return numericValue;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setPrice(formatPrice(rawValue));
    if (!touched) setTouched(true);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!product) return;

  const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

  if (
    !price ||
    numericPrice < product.minPrice ||
    (product.maxPrice > 0 && numericPrice > product.maxPrice)
  ) {
    setTouched(true);
    return;
  }

  if (!commissionData) return;

  setIsLoading(true);
  try {
    const products = {
        id: product.id,
        price: numericPrice,
        commissionRate: commissionData.commissionRate,
      };
    

    console.log("products", products)

    const response = await fetch("/api/plug/products/single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      errorToast(result.error);
      return;
    }

    console.log("result", result)

    // ✅ Mutate to refresh your store list
    mutate("/api/plug/products/");

    // ✅ Save this product locally to use in ShareModal
    const finalizedProduct = {
      ...product,
      price: numericPrice,
      commissionRate: commissionData.commissionRate,
    };

    console.log("finalizedProduct", finalizedProduct)
    setSharedProduct(finalizedProduct);

    setSharedProductId(result?.id)

    // Reset form
    setPrice("");
    setCommissionData(null);
    setTouched(false);
    onOpenChange(false);

    // ✅ Only open share modal after successful store add
    if (onSuccess) {
      onSuccess();
      // Wait a bit to ensure product is synced in the backend
      setTimeout(() => setShareModalOpen(true), 1000);
    }
  } catch (error) {
    console.error(error);
    errorToast("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (open && product) {
      setPrice("");
      setCommissionData(null);
      setTouched(false);
      setError(null);
    }
  }, [open, product?.id]);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg leading-tight">
            Set Price & Share: {product.name}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm mt-1">
            Set a selling price between{" "}
            <span className="font-bold">₦{product.minPrice.toLocaleString()}</span> and{" "}
            {product.maxPrice > 0 ? (
              <span className="font-bold">₦{product.maxPrice.toLocaleString()}</span>
            ) : (
              <span className="font-bold">no upper limit</span>
            )}
            . Higher margins result in lower commission rates.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Selling Price (NGN)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  ₦
                </span>
                <Input
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                  className={cn(
                    "pl-7 h-10 sm:h-11",
                    error ? "border-red-500 focus-visible:ring-red-500" : ""
                  )}
                  placeholder="0.00"
                  aria-invalid={!!error}
                  aria-describedby={error ? "price-error" : undefined}
                />
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

            {/* Price Range Info */}
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Price Guidelines
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Minimum Price:</span>
                  <span className="font-medium">
                    {formatCurrency(product.minPrice)}
                  </span>
                </div>
                {product.maxPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Maximum Price:</span>
                    <span className="font-medium">
                      {formatCurrency(product.maxPrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Supplier Cost:</span>
                  <span className="font-medium">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Commission Breakdown */}
            {commissionData && (
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-900">
                    Commission Breakdown
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span>Profit Margin:</span>
                    </div>
                    <span className="font-medium text-green-600">
                      {formatCurrency(commissionData.plugMargin)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Commission Rate:</span>
                    <span className="font-medium text-orange-600">
                      {commissionData.commissionRate.toFixed(1)}%
                    </span>
                  </div>

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Your Take Home:</span>
                      <span className="font-bold text-green-700 text-base">
                        {formatCurrency(commissionData.plugTakeHome)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                  💡 Higher margins (30%+ = 17.5% fee, 60%+ = 15% fee) get
                  better rates!
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Fixed footer */}
        <DialogFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 border-t flex-shrink-0 bg-background">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-none"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!!error || !commissionData || isLoading}
              className="flex-1 sm:flex-none"
            >
              {isLoading ? "Adding..." : "Add to Store"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>

      {sharedProductId && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          productName={sharedProduct.name}
          productId={sharedProductId}
          plugId={user?.plug.id}
        />
      )}
    </Dialog>
  );
}
