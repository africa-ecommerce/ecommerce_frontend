// "use client";
// import {
//   createContext,
//   useContext,
//   useState,
//   type ReactNode,
//   useEffect,
//   useRef,
// } from "react";
// import type React from "react";

// import {
//   X,
//   Trash2,
//   Package,
//   Check,
//   Pencil,
//   AlertCircle,
//   TrendingUp,
//   DollarSign,
//   Percent,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
// import { mutate } from "swr";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { cn } from "@/lib/utils";
// import { truncateText } from "@/lib/utils";

// // Maximum allowed products in cart
// const MAX_CART_ITEMS = 20;

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   sellingPrice?: number;
//   profit?: number;
//   minPrice?: number;
//   maxPrice?: number;
//   commissionData?: CommissionData;
// }

// interface CommissionData {
//   sellingPrice: number;
//   supplierPrice: number;
//   plugMargin: number;
//   marginPercent: number;
//   commissionRate: number;
//   platformCommission: number;
//   plugTakeHome: number;
// }

// interface ShoppingCartContextType {
//   items: CartItem[];
//   itemCount: number;
//   totalProfit: number;
//   totalTakeHome: number;
//   isCartFull: boolean;
//   addItem: (item: CartItem, openCart?: boolean) => void;
//   removeItem: (itemId: string) => void;
//   updateItemPrice: (
//     itemId: string,
//     sellingPrice: number,
//     commissionData: CommissionData
//   ) => void;
//   setIsMutate: (mutate: boolean) => void;
//   clearCart: () => void;
//   openCart: () => void;
//   isMutate: boolean;
// }

// interface PriceModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit: (
//     price: number,
//     profit: number,
//     commissionData: CommissionData
//   ) => void;
//   minPrice: number;
//   maxPrice: number;
//   supplierPrice: number;
//   itemId: string;
//   itemName: string;
// }

// interface ShoppingCartProviderProps {
//   children: ReactNode;
//   excludePaths?: string[];
//   exclude?: boolean;
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

// const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
//   undefined
// );

// export function ShoppingCartProvider({
//   children,
//   excludePaths = [],
//   exclude,
// }: ShoppingCartProviderProps) {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLimitAlert, setShowLimitAlert] = useState(false);
//   const pathname = usePathname();
//   const [openAddPrice, setOpenAddPrice] = useState(false);
//   const [selectedItemId, setSelectedItemId] = useState<string>("");
//   const [isMutate, setIsMutate] = useState(false);

//   const queueRef = useRef<CartItem[]>([]);
//   const isUpdating = useRef(false);

//   useEffect(() => {
//     const handleResetMutate = () => {
//       setIsMutate(false);
//     };
//     window.addEventListener("reset-is-mutate", handleResetMutate);
//     return () => {
//       window.removeEventListener("reset-is-mutate", handleResetMutate);
//     };
//   }, []);

//   const shouldShowCart = !excludePaths.some((path) => {
//     if (path.endsWith("/*")) {
//       const basePath = path.slice(0, -2);
//       return pathname.startsWith(basePath);
//     }
//     return pathname === path;
//   });

//   const itemCount = items.length;
//   const isCartFull = itemCount >= MAX_CART_ITEMS;

//   // Calculate total profit and total take home across all items
//   const totalProfit = items.reduce((sum, item) => sum + (item.profit || 0), 0);
//   const totalTakeHome = items.reduce(
//     (sum, item) => sum + (item.commissionData?.plugTakeHome || 0),
//     0
//   );

//   // Check if all items have selling prices
//   const hasAllPrices =
//     items.length > 0 &&
//     items.every((item) => item.sellingPrice && item.sellingPrice > 0);

//   const openCart = () => {
//     setIsOpen(true);
//   };

//   const processQueue = () => {
//     if (isUpdating.current) return;
//     if (queueRef.current.length === 0) return;

//     isUpdating.current = true;
//     const nextItem = queueRef.current.shift()!;

//     setItems((prev) => {
//       if (prev.length >= MAX_CART_ITEMS) {
//         setShowLimitAlert(true);
//         setIsOpen(true);
//         setTimeout(() => setShowLimitAlert(false), 10000);
//         isUpdating.current = false;
//         processQueue(); // continue processing others
//         return prev;
//       }

//       // Prevent duplicates
//       if (prev.some((i) => i.id === nextItem.id)) {
//         isUpdating.current = false;
//         processQueue();
//         return prev;
//       }

//       const updated = [...prev, { ...nextItem, profit: 0 }];

//       // Simulate async update completion
//       setTimeout(() => {
//         isUpdating.current = false;
//         processQueue(); // process next in line
//       }, 0);

//       return updated;
//     });
//   };

// const addItem = (item: CartItem, openCart = false) => {
//   queueRef.current.push(item);
//   processQueue();
//   if (openCart) setIsOpen(true);
// };
//   const removeItem = (itemId: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//     if (showLimitAlert && itemCount <= MAX_CART_ITEMS) {
//       setShowLimitAlert(false);
//     }
//   };

//   const updateItemPrice = (
//     itemId: string,
//     sellingPrice: number,
//     commissionData: CommissionData
//   ) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === itemId) {
//           const profit = sellingPrice - item.price;
//           return { ...item, sellingPrice, profit, commissionData };
//         }
//         return item;
//       })
//     );
//   };

//   const handleSubmit = async () => {
//     // Check if all items have selling prices before submitting
//     if (!hasAllPrices) {
//       errorToast(
//         "Please set selling prices for all products before confirming"
//       );
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Transform items to include user's price, product ID, and commission data
//       const products = items.map((item) => ({
//         id: item.id,
//         price: item.sellingPrice,
//         commissionRate: item.commissionData?.commissionRate,
//       }));

//       const response = await fetch("/api/plug/products/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(products),
//         credentials: "include",
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         errorToast(result.error);
//         return null;
//       }

//       localStorage.removeItem("cartItems");
//       setItems([]);
//       setIsOpen(false);
//       mutate("/api/plug/products/");
//       setIsMutate(true);

//       successToast(result.message);
//       return result;
//     } catch (error) {
//       console.error(error);
//       errorToast("Something went wrong");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearCart = () => {
//     localStorage.removeItem("cartItems");
//     setItems([]);
//     setShowLimitAlert(false);
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const handlePriceModalOpen = (itemId: string) => {
//     setSelectedItemId(itemId);
//     setOpenAddPrice(true);
//   };

//   const handlePriceSubmit = (
//     price: number,
//     profit: number,
//     commissionData: CommissionData
//   ) => {
//     updateItemPrice(selectedItemId, price, commissionData);
//   };

//   useEffect(() => {
//     const storedItems = localStorage.getItem("cartItems");
//     if (storedItems) {
//       try {
//         setItems(JSON.parse(storedItems));
//       } catch (error) {
//         console.error("Failed to parse stored cart items:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(items));
//   }, [items]);

//   const selectedItem = items.find((item) => item.id === selectedItemId);

//   // Get items without selling prices for alert
//   const itemsWithoutPrices = items.filter(
//     (item) => !item.sellingPrice || item.sellingPrice <= 0
//   );

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         items,
//         itemCount,
//         totalProfit,
//         totalTakeHome,
//         isCartFull,
//         setIsMutate,
//         addItem,
//         removeItem,
//         updateItemPrice,
//         clearCart,
//         openCart,
//         isMutate,
//       }}
//     >
//       {children}
//       {shouldShowCart && !exclude && (
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button
//               variant="outline"
//               size="icon"
//               className="fixed bottom-24 md:bottom-12 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
//             >
//               <Package className="h-6 w-6" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
//                   {itemCount}
//                 </span>
//               )}
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="w-full sm:max-w-md flex flex-col duration-1000">
//             <SheetHeader>
//               <SheetTitle>
//                 Selected Products ({itemCount}/{MAX_CART_ITEMS})
//               </SheetTitle>
//             </SheetHeader>

//             {showLimitAlert && (
//               <Alert variant="destructive" className="my-2">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>Product Limit Reached</AlertTitle>
//                 <AlertDescription>
//                   You can only add up to {MAX_CART_ITEMS} products at a time.
//                   Please confirm or remove some products before adding more.
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* Alert for missing prices */}
//             {items.length > 0 && itemsWithoutPrices.length > 0 && (
//               <Alert variant="destructive" className="my-2">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>Missing Selling Prices</AlertTitle>
//                 <AlertDescription>
//                   {itemsWithoutPrices.length} product
//                   {itemsWithoutPrices.length !== 1 ? "s" : ""} still need
//                   {itemsWithoutPrices.length === 1 ? "s" : ""} selling prices
//                   before you can confirm your selection.
//                 </AlertDescription>
//               </Alert>
//             )}

//             {items.length === 0 ? (
//               <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
//                 <Package className="h-12 w-12 text-muted-foreground mb-4" />
//                 <h3 className="font-medium text-lg mb-1">
//                   No products selected
//                 </h3>
//                 <p className="text-muted-foreground mb-4">
//                   Browse the marketplace to add products to your store
//                 </p>
//                 <SheetClose asChild>
//                   <Button>Browse Products</Button>
//                 </SheetClose>
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 overflow-auto py-4">
//                   <div className="space-y-4">
//                     {items.map((item) => (
//                       <div
//                         key={`${item.id}`}
//                         className={cn(
//                           "flex gap-4 border-b pb-4",
//                           !item.sellingPrice &&
//                             "bg-red-50 border-red-200 p-3 rounded-md"
//                         )}
//                       >
//                         <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
//                           <Image
//                             src={item.image || "/placeholder.svg"}
//                             alt={item.name}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <h4 className="font-medium capitalize">
//                               {truncateText(item.name)}
//                             </h4>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-6 w-6"
//                               onClick={() => removeItem(item.id)}
//                             >
//                               <X className="h-4 w-4" />
//                               <span className="sr-only">Remove</span>
//                             </Button>
//                           </div>
//                           <div className="space-y-1">
//                             <p className="text-sm text-muted-foreground">
//                               Cost Price: {formatPrice(item.price)}
//                             </p>
//                             {item.sellingPrice ? (
//                               <div className="flex flex-col space-y-1">
//                                 <p className="text-sm font-medium">
//                                   Selling Price:{" "}
//                                   {formatPrice(item.sellingPrice)}
//                                 </p>
//                                 <p className="text-sm text-green-600">
//                                   Profit: {formatPrice(item.profit || 0)}
//                                 </p>
//                                 {item.commissionData && (
//                                   <p className="text-sm text-blue-600">
//                                     Take Home:{" "}
//                                     {formatPrice(
//                                       item.commissionData.plugTakeHome
//                                     )}
//                                   </p>
//                                 )}
//                               </div>
//                             ) : (
//                               <div className="flex flex-col space-y-1">
//                                 <p className="text-sm text-red-600 font-medium">
//                                   Selling price required
//                                 </p>
//                                 <p className="text-sm text-amber-600">
//                                   Profit: {formatPrice(0)}
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                           <div className="mt-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className={cn(
//                                 "h-8 px-2 bg-transparent",
//                                 !item.sellingPrice &&
//                                   "border-red-500 text-red-600 hover:bg-red-50"
//                               )}
//                               onClick={() => handlePriceModalOpen(item.id)}
//                             >
//                               {item.sellingPrice ? (
//                                 <Pencil className="h-3 w-3 mr-1" />
//                               ) : null}
//                               {item.sellingPrice ? "Edit Price" : "Add Price"}
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <SheetFooter className="border-t pt-4 sticky bottom-0 bg-background pb-4">
//                   <div className="space-y-4 w-full">
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">
//                           Total Items
//                         </span>
//                         <span className="font-medium">
//                           {itemCount} / {MAX_CART_ITEMS} item
//                           {itemCount !== 1 ? "s" : ""}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">
//                           Total Profit
//                         </span>
//                         <span className="font-medium text-green-600">
//                           {formatPrice(totalProfit)}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">
//                           Total Take Home
//                         </span>
//                         <span className="font-medium text-blue-600">
//                           {formatPrice(totalTakeHome)}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2">
//                       <Button
//                         variant="outline"
//                         className="w-full gap-1 bg-transparent"
//                         onClick={clearCart}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         Clear All
//                       </Button>
//                       <Button
//                         className="w-full gap-1"
//                         disabled={isLoading || !hasAllPrices}
//                         onClick={handleSubmit}
//                       >
//                         <Check className="h-4 w-4" />
//                         {isLoading ? "Submitting..." : "Confirm"}
//                       </Button>
//                     </div>
//                   </div>
//                 </SheetFooter>
//               </>
//             )}
//           </SheetContent>
//         </Sheet>
//       )}

//       <PriceModal
//         open={openAddPrice}
//         onOpenChange={setOpenAddPrice}
//         onSubmit={handlePriceSubmit}
//         minPrice={selectedItem?.minPrice || 0}
//         maxPrice={selectedItem?.maxPrice || 0}
//         supplierPrice={selectedItem?.price || 0}
//         itemId={selectedItemId}
//         itemName={selectedItem?.name || ""}
//       />
//     </ShoppingCartContext.Provider>
//   );
// }

// export function useShoppingCart() {
//   const context = useContext(ShoppingCartContext);
//   if (context === undefined) {
//     throw new Error(
//       "useShoppingCart must be used within a ShoppingCartProvider"
//     );
//   }
//   return context;
// }

// export function PriceModal({
//   open,
//   onOpenChange,
//   onSubmit,
//   minPrice,
//   maxPrice,
//   supplierPrice,
//   itemId,
//   itemName,
// }: PriceModalProps) {
//   const [price, setPrice] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [touched, setTouched] = useState<boolean>(false);
//   const [commissionData, setCommissionData] = useState<CommissionData | null>(
//     null
//   );

//   // Calculate commission data whenever price changes
//   useEffect(() => {
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
//   }, [price, touched, minPrice, maxPrice, supplierPrice]);

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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
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

//     onSubmit(numericPrice, commissionData.plugMargin, commissionData);

//     // Reset form
//     setPrice("");
//     setCommissionData(null);
//     setTouched(false);
//     onOpenChange(false);
//   };

//   useEffect(() => {
//     if (open) {
//       setPrice("");
//       setCommissionData(null);
//       setTouched(false);
//       setError(null);
//     }
//   }, [open, itemId]);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] flex flex-col p-0 gap-0">
//         <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b flex-shrink-0">
//           <DialogTitle className="text-base sm:text-lg leading-tight">
//             Set Price for {itemName}
//           </DialogTitle>
//           <DialogDescription className="text-xs sm:text-sm mt-1">
//             Set a selling price between ₦{minPrice.toLocaleString()} and{" "}
//             {maxPrice > 0 ? `₦${maxPrice.toLocaleString()}` : "no upper limit"}.
//             Higher margins result in lower commission rates.
//           </DialogDescription>
//         </DialogHeader>

//         {/* Scrollable content */}
//         <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
//           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="price" className="text-sm font-medium">
//                 Selling Price (NGN)
//               </Label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
//                   ₦
//                 </span>
//                 <Input
//                   id="price"
//                   value={price}
//                   onChange={handlePriceChange}
//                   className={cn(
//                     "pl-7 h-10 sm:h-11",
//                     error ? "border-red-500 focus-visible:ring-red-500" : ""
//                   )}
//                   placeholder="0.00"
//                   aria-invalid={!!error}
//                   aria-describedby={error ? "price-error" : undefined}
//                 />
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

//             {/* Price Range Info */}
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
//               </div>
//             </div>

//             {/* Commission Breakdown */}
//             {commissionData && (
//               <div className="rounded-lg bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 border">
//                 <div className="flex items-center gap-2 mb-3">
//                   <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
//                   <span className="text-sm font-medium text-blue-900">
//                     Commission Breakdown
//                   </span>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-1">
//                       <DollarSign className="h-3 w-3 text-green-600 flex-shrink-0" />
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

//                   <div className="border-t pt-2 mt-2">
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium">Your Take Home:</span>
//                       <span className="font-bold text-green-700 text-base">
//                         {formatCurrency(commissionData.plugTakeHome)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
//                   💡 Higher margins (30%+ = 17.5% fee, 60%+ = 15% fee) get
//                   better rates!
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Fixed footer */}
//         <DialogFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 border-t flex-shrink-0 bg-background">
//           <div className="flex gap-2 w-full sm:w-auto">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="flex-1 sm:flex-none"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               disabled={!!error || !commissionData}
//               className="flex-1 sm:flex-none"
//             >
//               Save Price
//             </Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }



"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  X,
  Trash2,
  Package,
  Pencil,
  TrendingUp,
  DollarSign,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import useSWR, { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { truncateText } from "@/lib/utils";
import { DirectShareModal } from "@/app/(private)/marketplace/discover/components/direct-share-modal";
import { useUser } from "./UserContext";

interface ClearCartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemCount: number;
}

function ClearCartModal({
  open,
  onOpenChange,
  onConfirm,
  itemCount,
}: ClearCartModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Products?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove all {itemCount} curated product
            {itemCount !== 1 ? "s" : ""} from your list? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// IndexedDB utilities
const DB_NAME = "CuratedProductsDB";
const STORE_NAME = "curatedProducts";
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

const saveToIndexedDB = async (items: CartItem[]): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  // Clear existing items then add all items (preserve order via addedAt)
  store.clear();
  items.forEach((item) => store.add(item));

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

const loadFromIndexedDB = async (): Promise<CartItem[]> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const clearIndexedDB = async (): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.clear();

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

const removeFromIndexedDBById = async (itemId: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.delete(itemId);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

/* ------------------------------
   Types
   ------------------------------*/
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  sellingPrice?: number;
  profit?: number;
  minPrice?: number;
  maxPrice?: number;
  commissionData?: CommissionData;
  addedAt?: number; // epoch ms for ordering (newest first)
}

interface CommissionData {
  sellingPrice: number;
  supplierPrice: number;
  plugMargin: number;
  marginPercent: number;
  commissionRate: number;
  platformCommission: number;
  plugTakeHome: number;
}

interface ShoppingCartContextType {
  items: CartItem[];
  itemCount: number;
  totalProfit: number;
  totalTakeHome: number;
  addItem: (item: CartItem, openCart?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateItemPrice: (
    itemId: string,
    sellingPrice: number,
    commissionData: CommissionData
  ) => void;
  setIsMutate: (mutate: boolean) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isMutate: boolean;
}

interface PriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (itemId: string) => Promise<void>;
  minPrice: number;
  maxPrice: number;
  supplierPrice: number;
  itemId: string;
  itemName: string;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
  excludePaths?: string[];
  exclude?: boolean;
}
// Commission calculation function
function calculateCommission(
  supplierPrice: number,
  sellingPrice: number
): CommissionData {
  const plugMargin = sellingPrice - supplierPrice;
  const marginPercent = (plugMargin / supplierPrice) * 100;
  let commissionRate = 0.1; // Default to 20%

 
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
const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, { ...init, credentials: "include" }).then(async (res) => {
    const json = await res.json().catch(() => null);
    if (!res.ok) throw json || new Error("Fetch error");
    return json;
  });


export function ShoppingCartProvider({
  children,
  excludePaths = [],
  exclude,
}: ShoppingCartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [openAddPrice, setOpenAddPrice] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [isMutate, setIsMutate] = useState(false);
  const [openDirectShare, setOpenDirectShare] = useState(false);
  const [selectedProductForShare, setSelectedProductForShare] = useState<
    any | null
  >(null);

  const [openClearConfirm, setOpenClearConfirm] = useState(false);

  // loading states
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const [isClearing, setIsClearing] = useState(false);

  const queueRef = useRef<CartItem[]>([]);
  const isUpdating = useRef(false);

    const {
      userData: { user },
    } = useUser();

  useEffect(() => {
    const handleResetMutate = () => {
      setIsMutate(false);
    };
    window.addEventListener("reset-is-mutate", handleResetMutate);
    return () => {
      window.removeEventListener("reset-is-mutate", handleResetMutate);
    };
  }, []);

  const shouldShowCart = !excludePaths.some((path) => {
    if (path.endsWith("/*")) {
      const basePath = path.slice(0, -2);
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });

  const itemCount = items.length;

  const totalProfit = items.reduce((sum, item) => sum + (item.profit || 0), 0);
  const totalTakeHome = items.reduce(
    (sum, item) => sum + (item.commissionData?.plugTakeHome || 0),
    0
  );

  /* ------------------------------
     SWR: fetch backend curated products
     ------------------------------*/
  const {
    data: backendData,
    error: backendError,
    isLoading: backendLoading,
  } = useSWR("/api/discover/products/accepted", fetcher, {
    revalidateOnFocus: true,
    // no automatic refreshInterval, backend data is likely updated by user actions
  });

  console.log("backendData", backendData)

  /* ------------------------------
     Utility: normalize backend product -> CartItem
     - uses images[0] if available
     - sets addedAt if provided by backend or fallback
     ------------------------------*/
  const normalizeBackendProduct = useCallback(
    (p: any, fallbackAddedAt: number) => {
      // expected backend shape: { id, name, price, images: string[], minPrice, maxPrice, ... }
      const image =
        (Array.isArray(p.images) && p.images.length > 0 && p.images[0]) ||
        p.image ||
        "/placeholder.svg";
      const id = String(p.id || p._id || p.productId || p.sku);
      return {
        id,
        name: p.name || p.title || "Product",
        price: Number(p.price || p.cost || 0),
        image,
       
        minPrice: p.minPrice,
        maxPrice: p.maxPrice,
        
        addedAt: p.lastAt ? Number(p.addedAt) : fallbackAddedAt,
      } as CartItem;
    },
    []
  );

  /* ------------------------------
     Merge local IndexedDB with backend items and setItems
     Logic:
       - Load local saved items (may have addedAt)
       - Map backend items -> CartItem, using fallback addedAt that preserves backend order
       - Combine sets with dedupe (id), prefer local item fields where appropriate (prices)
       - Sort by addedAt desc (newest first)
     ------------------------------*/
useEffect(() => {
  let mounted = true;
  (async () => {
    try {
      const local = (await loadFromIndexedDB()) || [];

      // ✅ Handle both shapes: array or { products: [] }
      const backendProducts = Array.isArray(backendData)
        ? backendData
        : Array.isArray(backendData?.products)
        ? backendData.products
        : [];

      const backendItems: CartItem[] = backendProducts.map(
        (p: any, idx: number) =>
          normalizeBackendProduct(p, Date.now() - idx * 1000)
      );

      // 🧩 Merge logic (unchanged)
      const mergedMap = new Map<string, CartItem>();
      for (const b of backendItems) mergedMap.set(b.id, b);
      for (const l of local) {
        if (l.id) {
          mergedMap.set(l.id, {
            ...(mergedMap.get(l.id) || {}),
            ...l,
          });
        }
      }

      const mergedArr = Array.from(mergedMap.values()).sort(
        (a, b) => (b.addedAt || 0) - (a.addedAt || 0)
      );

      if (mounted) {
        setItems(mergedArr);
        await saveToIndexedDB(mergedArr);
      }
    } catch (err) {
      console.error("Sync error:", err);
    }
  })();

  return () => {
    mounted = false;
  };
}, [backendData, normalizeBackendProduct]);


  /* ------------------------------
     Queue processing & addItem
     - addItem stamps addedAt, pushes to queue, then processQueue adds into items (dedupe) with newest-first
     - save to indexedDB on every items change (done in useEffect below)
     ------------------------------*/
  const processQueue = () => {
    if (isUpdating.current) return;
    if (queueRef.current.length === 0) return;

    isUpdating.current = true;
    const nextItem = queueRef.current.shift()!;

    setItems((prev) => {
      // Prevent duplicates
      if (prev.some((i) => i.id === nextItem.id)) {
        isUpdating.current = false;
        processQueue();
        return prev;
      }

      const updated = [nextItem, ...prev]; // newest first

      // Simulate async update completion
      setTimeout(() => {
        isUpdating.current = false;
        processQueue(); // process next in line
      }, 0);

      return updated;
    });
  };

  const addItem = (item: CartItem, openCart = false) => {
    const withTimestamp: CartItem = {
      ...item,
      addedAt: Date.now(),
      image:
        (item.image &&
          (Array.isArray((item as any).images)
            ? (item as any).images[0]
            : item.image)) ||
        "/placeholder.svg",
    };

    queueRef.current.push(withTimestamp);
    processQueue();

    // persist later when items state changes (handled in useEffect)
    if (openCart) setIsOpen(true);
  };

  /* ------------------------------
     removeItem
     - optimistic UI removal; call DELETE /api/discover/products/accepted with [id]
     - disable the remove button while request pending
     ------------------------------*/
  const removeItem = async (itemId: string) => {
    // Optimistic remove locally
    setLoadingIds((s) => ({ ...s, [itemId]: true }));
    const prev = items;

    setItems((p) => p.filter((it) => it.id !== itemId));

    try {
      const res = await fetch("/api/discover/products/accepted", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([itemId]),
        credentials: "include",
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw json || new Error("Failed to remove item");
      }

      // remove from indexedDB
      await removeFromIndexedDBById(itemId);
      // revalidate backend cache
      mutate("/api/discover/products/accepted");
    } catch (err) {
      console.error("Failed removing item:", err);
      errorToast("Failed to remove product");
      // rollback UI
      setItems(prev);
    } finally {
      setLoadingIds((s) => {
        const copy = { ...s };
        delete copy[itemId];
        return copy;
      });
    }
  };

  /* ------------------------------
     updateItemPrice (unchanged)
     ------------------------------*/
  const updateItemPrice = (
    itemId: string,
    sellingPrice: number,
    commissionData: CommissionData
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const profit = sellingPrice - item.price;
          return { ...item, sellingPrice, profit, commissionData };
        }
        return item;
      })
    );
  };

  /* ------------------------------
     clearCart
     - calls DELETE with [] body per your requirement
     ------------------------------*/
  const clearCart = async () => {
    setIsClearing(true);
    const prev = items;

    // optimistic UI
    setItems([]);

    try {
      const res = await fetch("/api/discover/products/accepted", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]), // empty array => clear all
        credentials: "include",
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw json || new Error("Failed to clear cart");
      }

      await clearIndexedDB();
      successToast("Products cleared successfully");
      mutate("/api/discover/products/accepted");
    } catch (err) {
      console.error("Clear error:", err);
      errorToast("Failed to clear curated products");
      // rollback
      setItems(prev);
    } finally {
      setIsClearing(false);
    }
  };

  /* ------------------------------
     openCart
     ------------------------------*/
  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false)
  }

  /* ------------------------------
     Save items to IndexedDB whenever they change
     ------------------------------*/
  useEffect(() => {
    // save items to IndexedDB (persist order and addedAt)
    saveToIndexedDB(items).catch((err) => {
      console.error("Failed to save items to IndexedDB:", err);
    });
  }, [items]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePriceModalOpen = (itemId: string) => {
    setSelectedItemId(itemId);
    setOpenAddPrice(true);
  };

  const handlePriceSubmit = (
    price: number,
    profit: number,
    commissionData: CommissionData
  ) => {
    updateItemPrice(selectedItemId, price, commissionData);
  };

  const handleShare = (item: CartItem) => {
    setSelectedProductForShare({
      id: item.id,
      name: item.name,
      price: item.price,
      minPrice: item.minPrice || 0,
      maxPrice: item.maxPrice || 0,
    });
    setOpenDirectShare(true);
  };

  const handleProductClick = (itemId: string) => {
     closeCart()
    router.push(`/marketplace/product/${itemId}`);
  };

  // selected item for price modal
  const selectedItem = items.find((item) => item.id === selectedItemId);

  /* ------------------------------
     Render (mostly preserved, with small changes to disable buttons)
     ------------------------------*/
  return (
    <ShoppingCartContext.Provider
      value={{
        items,
        itemCount,
        totalProfit,
        totalTakeHome,
        setIsMutate,
        addItem,
        removeItem,
        updateItemPrice,
        clearCart,
        openCart,
        closeCart,
        isMutate,
      }}
    >
      {children}
      {shouldShowCart && !exclude && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-24 md:bottom-12 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Package className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md flex flex-col duration-1000">
            <SheetHeader className="flex flex-row items-center justify-between">
              <SheetTitle>Curated Products ({itemCount})</SheetTitle>
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setOpenClearConfirm(true)}
                  disabled={isClearing}
                >
                  <Trash2 className="h-4 w-4" />
                  {isClearing ? "Clearing..." : "Clear All"}
                </Button>
              )}
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-1">
                  No products curated
                </h3>
                <p className="text-muted-foreground mb-4">
                  Swipe to discover products, add price and save to store or
                  share
                </p>
                <SheetClose asChild>
                  <Button>Curate Products</Button>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.id}`}
                        className="flex gap-4 border-b pb-4"
                      >
                        <div
                          className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer"
                          onClick={() => handleProductClick(item.id)}
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4
                              className="font-medium capitalize cursor-pointer hover:underline"
                              onClick={() => handleProductClick(item.id)}
                            >
                              {truncateText(item.name)}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeItem(item.id)}
                              disabled={!!loadingIds[item.id]}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">
                                {loadingIds[item.id] ? "Removing" : "Remove"}
                              </span>
                            </Button>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Cost Price: {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 bg-transparent"
                              onClick={() => handlePriceModalOpen(item.id)}
                            >
                              Add
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 bg-transparent"
                              onClick={() => handleShare(item)}
                            >
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      )}

      <ClearCartModal
        open={openClearConfirm}
        onOpenChange={setOpenClearConfirm}
        onConfirm={() => {
          setOpenClearConfirm(false);
          clearCart();
        }}
        itemCount={itemCount}
      />

      <DirectShareModal
        open={openDirectShare}
        onOpenChange={setOpenDirectShare}
        product={selectedProductForShare}
        onSuccess={async () => {
          if (selectedProductForShare?.id) {
            await removeItem(selectedProductForShare.id);
          }
        }}
      />

      <PriceModal
        open={openAddPrice}
        onOpenChange={setOpenAddPrice}
        onSubmit={removeItem}
        minPrice={selectedItem?.minPrice || 0}
        maxPrice={selectedItem?.maxPrice || 0}
        supplierPrice={selectedItem?.price || 0}
        itemId={selectedItemId}
        itemName={selectedItem?.name || ""}
      />
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}

export function PriceModal({
  open,
  onOpenChange,
  onSubmit,
  minPrice,
  maxPrice,
  supplierPrice,
  itemId,
  itemName,
}: PriceModalProps) {
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [commissionData, setCommissionData] = useState<CommissionData | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Calculate commission data whenever price changes
  useEffect(() => {
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
  }, [price, touched, minPrice, maxPrice, supplierPrice]);

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

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

  //   if (
  //     !price ||
  //     numericPrice < minPrice ||
  //     (maxPrice > 0 && numericPrice > maxPrice)
  //   ) {
  //     setTouched(true);
  //     return;
  //   }

  //   if (!commissionData) return;

  //   onSubmit(numericPrice, commissionData.plugMargin, commissionData);

  //   // Reset form
  //   setPrice("");
  //   setCommissionData(null);
  //   setTouched(false);
  //   onOpenChange(false);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    setIsLoading(true);
    try {
      const products = {
        id: itemId,
        price: numericPrice,
        commissionRate: commissionData.commissionRate,
      };

      console.log("products", products);

      const response = await fetch("/api/plug/products/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
        credentials: "include",
      });

      const result = await response.json();

      successToast("You have added this product");

      if (!response.ok) {
        errorToast(result.error);
        return;
      }

      // ✅ Mutate to refresh your store list
      mutate("/api/plug/products/");

   await onSubmit(products.id);


      // ✅ Save this product locally to use in ShareModal

      // Reset form
      setPrice("");
      setCommissionData(null);
      setTouched(false);
      onOpenChange(false);

      // ✅ Only open share modal after successful store add
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setPrice("");
      setCommissionData(null);
      setTouched(false);
      setError(null);
    }
  }, [open, itemId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg leading-tight">
            Set Price for {itemName}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm mt-1">
            Set a selling price between{" "}
            <span className="font-bold">₦{minPrice.toLocaleString()}</span> and{" "}
            {maxPrice > 0 ? (
              <span className="font-bold">₦{maxPrice.toLocaleString()}</span>
            ) : (
              <span className="font-bold">no upper limit</span>
            )}
            .
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
                    {formatCurrency(minPrice)}
                  </span>
                </div>
                {maxPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Maximum Price:</span>
                    <span className="font-medium">
                      {formatCurrency(maxPrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Supplier Cost:</span>
                  <span className="font-medium">
                    {formatCurrency(supplierPrice)}
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
              {isLoading ? "Saving" : "Save Price"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
