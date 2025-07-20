



// "use client";
// import type React from "react";
// import { useState, useEffect } from "react";
// import { mutate } from "swr";
// import {
//   Loader2,
//   TrendingUp,
//   DollarSign,
//   Percent,
//   AlertCircle,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced";

// interface CommissionData {
//   sellingPrice: number;
//   supplierPrice: number;
//   plugMargin: number;
//   marginPercent: number;
//   commissionRate: number;
//   platformCommission: number;
//   plugTakeHome: number;
// }

// interface PriceModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   itemId: string;
//   itemData?: any;
// }

// // Commission calculation function
// function calculateCommission(
//   supplierPrice: number,
//   sellingPrice: number
// ): CommissionData {
//   const plugMargin = sellingPrice - supplierPrice;
//   const marginPercent = (plugMargin / supplierPrice) * 100;
//   let commissionRate = 0.2; // Default to 20%

//   // Scale commission based on margin
//   if (marginPercent >= 60) {
//     commissionRate = 0.15; // Reward high margin
//   } else if (marginPercent >= 30) {
//     commissionRate = 0.175;
//   }

//   const platformCommission = plugMargin * commissionRate;
//   const plugTakeHome = plugMargin - platformCommission;

//   return {
//     sellingPrice,
//     supplierPrice,
//     plugMargin,
//     marginPercent,
//     commissionRate: commissionRate * 100, // in %
//     platformCommission,
//     plugTakeHome,
//   };
// }

// export function EditPriceModal({
//   open,
//   onOpenChange,
//   itemId,
//   itemData,
// }: PriceModalProps) {
//   const [price, setPrice] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [touched, setTouched] = useState<boolean>(false);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [commissionData, setCommissionData] = useState<CommissionData | null>(
//     null
//   );

//   const productData = itemData;
//   const isLoading = !itemData;

//   // Get price constraints
//   const minPrice = productData?.minPrice || productData?.originalPrice || 0;
//   const maxPrice = productData?.maxPrice || 0;
//   const supplierPrice = productData?.originalPrice || 0;

//   console.log("productData", productData)

//   // Calculate commission data whenever price changes
//   useEffect(() => {
//     if (!productData) return;

//     const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

//     if (touched) {
//       if (!price) {
//         setError("Please enter a price");
//         setCommissionData(null);
//       } else if (numericPrice < minPrice) {
//         setError(`Price must be at least ₦${minPrice.toLocaleString()}`);
//         setCommissionData(null);
//       } else if (maxPrice > 0 && numericPrice > maxPrice) {
//         setError(`Price cannot exceed ₦${maxPrice.toLocaleString()}`);
//         setCommissionData(null);
//       } else {
//         setError(null);
//         const commission = calculateCommission(supplierPrice, numericPrice);
//         setCommissionData(commission);
//       }
//     }
//   }, [price, touched, productData, minPrice, maxPrice, supplierPrice]);

//   // Format price with commas as thousands separators
//   const formatPrice = (value: string) => {
//     const numericValue = value.replace(/[^0-9.]/g, "");
//     if (numericValue) {
//       const parts = numericValue.split(".");
//       parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//       return parts.join(".");
//     }
//     return numericValue;
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const rawValue = e.target.value;
//     setPrice(formatPrice(rawValue));
//     if (!touched) setTouched(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!productData) return;

//     const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

//     if (
//       !price ||
//       numericPrice < minPrice ||
//       (maxPrice > 0 && numericPrice > maxPrice)
//     ) {
//       setTouched(true);
//       return;
//     }

//     if (!commissionData) return;

//     setIsSubmitting(true);
//     try {
//       // Call the API to save the new price with commission data
//       const response = await fetch(`/api/plug/products/${itemId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           price: numericPrice,
//           commissionRate: commissionData.commissionRate,
//         }),
//       });

//       if (!response.ok) {
//         const errorResult = await response.json();
//         errorToast(errorResult.error || "Server error");
//         return;
//       }

//       const result = await response.json();
//       successToast(result.message);
//       mutate("/api/plug/products/");

//       // Reset form
//       setPrice("");
//       setCommissionData(null);
//       setTouched(false);
//       onOpenChange(false);
//     } catch (error) {
//       errorToast("Something went wrong");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form when modal opens with a different item
//   useEffect(() => {
//     if (open && productData?.pendingPrice) {
//       setPrice(productData.pendingPrice?.toLocaleString());
//       setTouched(false);
//       setError(null);
//       setCommissionData(null);
//     } else if (open && productData?.currentPrice) {
//       setPrice(productData.currentPrice?.toLocaleString());
//       setTouched(false);
//       setError(null);
//       setCommissionData(null);
//     }
//   }, [open, productData]);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Edit Product Price</DialogTitle>
//           {isLoading ? (
//             <div className="text-sm text-muted-foreground">
//               <Skeleton className="h-4 w-3/4" />
//             </div>
//           ) : (
//             <DialogDescription>
//               {productData && (
//                 <>
//                   Update the price for {productData.name}. Price must be between
//                   ₦{minPrice.toLocaleString()} and{" "}
//                   {maxPrice > 0
//                     ? `₦${maxPrice.toLocaleString()}`
//                     : "no upper limit"}
//                   .
//                 </>
//               )}
//             </DialogDescription>
//           )}
//         </DialogHeader>

//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-6 py-4">
//             {/* Price Change Notification */}
//             <Alert className="bg-amber-50 text-amber-800 border-amber-200">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Price Change Notice</AlertTitle>
//               <AlertDescription>
//                 Any price changes will take effect in 24 hours from submission.
//               </AlertDescription>
//             </Alert>

//             {/* Pending Price Change Display */}
//             {productData?.pendingPrice && (
//               <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
//                 <h4 className="mb-2 font-medium text-blue-800">
//                   Pending Price Change
//                 </h4>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-blue-700">Current Price:</span>
//                     <span className="font-medium text-blue-900">
//                       {formatCurrency(productData.currentPrice || 0)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-blue-700">Pending Price:</span>
//                     <span className="font-medium text-blue-900">
//                       {formatCurrency(productData.pendingPrice)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-blue-700">Effective:</span>
//                     <span className="font-medium text-blue-900">
//                       24 hours from submission
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Price Guidelines */}
//             <div className="rounded-lg bg-muted p-3">
//               <div className="text-sm font-medium text-muted-foreground mb-2">
//                 Price Guidelines
//               </div>
//               <div className="space-y-1 text-sm">
//                 <div className="flex justify-between">
//                   <span>Minimum Price:</span>
//                   <span className="font-medium">
//                     {formatCurrency(minPrice)}
//                   </span>
//                 </div>
//                 {maxPrice > 0 && (
//                   <div className="flex justify-between">
//                     <span>Maximum Price:</span>
//                     <span className="font-medium">
//                       {formatCurrency(maxPrice)}
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Supplier Cost:</span>
//                   <span className="font-medium">
//                     {formatCurrency(supplierPrice)}
//                   </span>
//                 </div>
//                 {productData?.currentPrice && (
//                   <div className="flex justify-between">
//                     <span>Current Price:</span>
//                     <span className="font-medium text-blue-600">
//                       {formatCurrency(productData.currentPrice)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="price">New Price (NGN)</Label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                   ₦
//                 </span>
//                 {isLoading ? (
//                   <Skeleton className="h-10 w-full" />
//                 ) : (
//                   <Input
//                     id="price"
//                     value={price}
//                     onChange={handlePriceChange}
//                     className={cn(
//                       "pl-7",
//                       error ? "border-red-500 focus-visible:ring-red-500" : ""
//                     )}
//                     placeholder="0.00"
//                     aria-invalid={!!error}
//                     aria-describedby={error ? "price-error" : undefined}
//                     disabled={isSubmitting}
//                   />
//                 )}
//               </div>
//               {error && (
//                 <p
//                   id="price-error"
//                   className="text-sm font-medium text-red-500"
//                 >
//                   {error}
//                 </p>
//               )}
//             </div>

//             {/* Commission Breakdown */}
//             {commissionData && (
//               <div className="rounded-lg bg-gradient-to-r from-blue-50 to-green-50 p-4 border">
//                 <div className="flex items-center gap-2 mb-3">
//                   <TrendingUp className="h-4 w-4 text-blue-600" />
//                   <span className="text-sm font-medium text-blue-900">
//                     Updated Commission Breakdown
//                   </span>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-1">
//                       <DollarSign className="h-3 w-3 text-green-600" />
//                       <span>Profit Margin:</span>
//                     </div>
//                     <span className="font-medium text-green-600">
//                       {formatCurrency(commissionData.plugMargin)}
//                     </span>
//                   </div>
                 
//                   <div className="flex justify-between items-center">
//                     <span>Commission Rate:</span>
//                     <span className="font-medium text-orange-600">
//                       {commissionData.commissionRate.toFixed(1)}%
//                     </span>
//                   </div>
                  
//                 </div>
//                 <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
//                   💡 Higher margins (30%+ = 17.5% fee, 60%+ = 15% fee) get
//                   better rates!
//                 </div>
//               </div>
//             )}

//             {/* Current vs New Comparison */}
//             {commissionData && productData?.currentPrice && (
//               <div className="rounded-lg bg-gray-50 p-4 border">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">
//                   Price Change Impact
//                 </h4>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Price Change:</span>
//                     <span
//                       className={`font-medium ${
//                         commissionData.sellingPrice > productData.currentPrice
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {commissionData.sellingPrice > productData.currentPrice
//                         ? "+"
//                         : ""}
//                       {formatCurrency(
//                         commissionData.sellingPrice - productData.currentPrice
//                       )}
//                     </span>
//                   </div>
//                   {productData.currentTakeHome && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Take Home Change:</span>
//                       <span
//                         className={`font-medium ${
//                           commissionData.plugTakeHome >
//                           productData.currentTakeHome
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {commissionData.plugTakeHome >
//                         productData.currentTakeHome
//                           ? "+"
//                           : ""}
//                         {formatCurrency(
//                           commissionData.plugTakeHome -
//                             productData.currentTakeHome
//                         )}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={isSubmitting || isLoading || !!error || !commissionData}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Update Price"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }








"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import {
  Loader2,
  TrendingUp,
  DollarSign,
  Percent,
  AlertCircle,
} from "lucide-react";
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

interface CommissionData {
  sellingPrice: number;
  supplierPrice: number;
  plugMargin: number;
  marginPercent: number;
  commissionRate: number;
  platformCommission: number;
  plugTakeHome: number;
}

interface PriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemData?: any;
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

export function EditPriceModal({
  open,
  onOpenChange,
  itemId,
  itemData,
}: PriceModalProps) {
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [commissionData, setCommissionData] = useState<CommissionData | null>(
    null
  );

  const productData = itemData;
  const isLoading = !itemData;

  // Get price constraints
  const minPrice = productData?.minPrice || productData?.originalPrice || 0;
  const maxPrice = productData?.maxPrice || 0;
  const supplierPrice = productData?.originalPrice || 0;

  console.log("productData", productData)

  // Calculate commission data whenever price changes
  useEffect(() => {
    if (!productData) return;

    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    if (touched) {
      if (!price) {
        setError("Please enter a price");
        setCommissionData(null);
      } else if (numericPrice < minPrice) {
        setError(`Price must be at least ₦${minPrice.toLocaleString()}`);
        setCommissionData(null);
      } else if (maxPrice > 0 && numericPrice > maxPrice) {
        setError(`Price cannot exceed ₦${maxPrice.toLocaleString()}`);
        setCommissionData(null);
      } else {
        setError(null);
        const commission = calculateCommission(supplierPrice, numericPrice);
        setCommissionData(commission);
      }
    }
  }, [price, touched, productData, minPrice, maxPrice, supplierPrice]);

  // Format price with commas as thousands separators
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
    if (!productData) return;

    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    if (
      !price ||
      numericPrice < minPrice ||
      (maxPrice > 0 && numericPrice > maxPrice)
    ) {
      setTouched(true);
      return;
    }

    if (!commissionData) return;

    setIsSubmitting(true);
    try {
      // Call the API to save the new price with commission data
      const response = await fetch(`/api/plug/products/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          price: numericPrice,
          commissionRate: commissionData.commissionRate,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        errorToast(errorResult.error || "Server error");
        return;
      }

      const result = await response.json();
      successToast(result.message);
      mutate("/api/plug/products/");

      // Reset form
      setPrice("");
      setCommissionData(null);
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
    if (open && productData?.pendingPrice) {
      setPrice(productData.pendingPrice?.toLocaleString());
      setTouched(false);
      setError(null);
      setCommissionData(null);
    } else if (open && productData?.currentPrice) {
      setPrice(productData.currentPrice?.toLocaleString());
      setTouched(false);
      setError(null);
      setCommissionData(null);
    }
  }, [open, productData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[480px] h-[90vh] max-h-[800px] flex flex-col p-0 gap-0">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 p-6 pb-0">
          <DialogTitle className="text-lg sm:text-xl">Edit Product Price</DialogTitle>
          {isLoading ? (
            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <DialogDescription className="text-sm">
              {productData && (
                <>
                  Update the price for {productData.name}. Price must be between
                  ₦{minPrice.toLocaleString()} and{" "}
                  {maxPrice > 0
                    ? `₦${maxPrice.toLocaleString()}`
                    : "no upper limit"}
                  .
                </>
              )}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Price Change Notification */}
            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-sm font-medium">Price Change Notice</AlertTitle>
              <AlertDescription className="text-sm">
                Any price changes will take effect in 24 hours from submission.
              </AlertDescription>
            </Alert>

            {/* Pending Price Change Display */}
            {productData?.pendingPrice && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-3 font-medium text-blue-800 text-sm">
                  Pending Price Change
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Current Price:</span>
                    <span className="font-medium text-blue-900">
                      {formatCurrency(productData.currentPrice || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Pending Price:</span>
                    <span className="font-medium text-blue-900">
                      {formatCurrency(productData.pendingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Effective:</span>
                    <span className="font-medium text-blue-900">
                      24 hours from submission
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Price Guidelines */}
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm font-medium text-muted-foreground mb-3">
                Price Guidelines
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Minimum Price:</span>
                  <span className="font-medium">
                    {formatCurrency(minPrice)}
                  </span>
                </div>
                {maxPrice > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Maximum Price:</span>
                    <span className="font-medium">
                      {formatCurrency(maxPrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Supplier Cost:</span>
                  <span className="font-medium">
                    {formatCurrency(supplierPrice)}
                  </span>
                </div>
                {productData?.currentPrice && (
                  <div className="flex justify-between items-center">
                    <span>Current Price:</span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(productData.currentPrice)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">New Price (NGN)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
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
                      "pl-7 h-10",
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

            {/* Commission Breakdown */}
            {commissionData && (
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-green-50 p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Updated Commission Breakdown
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
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
                  
                </div>
                <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                  💡 Higher margins (30%+ = 17.5% fee, 60%+ = 15% fee) get
                  better rates!
                </div>
              </div>
            )}

            {/* Current vs New Comparison */}
            {commissionData && productData?.currentPrice && (
              <div className="rounded-lg bg-gray-50 p-4 border">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Price Change Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price Change:</span>
                    <span
                      className={`font-medium ${
                        commissionData.sellingPrice > productData.currentPrice
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {commissionData.sellingPrice > productData.currentPrice
                        ? "+"
                        : ""}
                      {formatCurrency(
                        commissionData.sellingPrice - productData.currentPrice
                      )}
                    </span>
                  </div>
                  {productData.currentTakeHome && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Take Home Change:</span>
                      <span
                        className={`font-medium ${
                          commissionData.plugTakeHome >
                          productData.currentTakeHome
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {commissionData.plugTakeHome >
                        productData.currentTakeHome
                          ? "+"
                          : ""}
                        {formatCurrency(
                          commissionData.plugTakeHome -
                            productData.currentTakeHome
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Add some bottom padding for the last item */}
            <div className="h-4"></div>
          </form>
        </div>

        {/* Fixed Footer */}
        <DialogFooter className="flex-shrink-0 p-6 pt-0 border-t bg-background">
          <div className="flex flex-col-reverse sm:flex-row gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading || !!error || !commissionData}
              className="w-full sm:w-auto"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Price"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
