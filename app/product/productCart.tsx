// "use client";

// import { useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import { Minus, Plus, RefreshCw, ArrowLeft, Phone } from "lucide-react";
// import { useRouter } from "next/navigation";
// import useSWR from "swr";
// import { ChevronDown, ChevronUp } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// interface ProductVariation {
//   id: string;
//   size: string;
//   color: string;
//   stock: number;
//   productId: string;
// }

// interface ProductData {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   images: string[];
//   size: string;
//   color: string;
//   stocks: number;
//   variations: ProductVariation[];
//   features?: string[];
//   seller?: string;
//   inStock?: boolean;
// }

// interface SingleProductCartProps {
//   productId?: string;
//   referralId?: string;
//   platform?: string;
// }

// export const SingleProduct = ({
//   productId,
//   referralId,
//   platform,
// }: SingleProductCartProps) => {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [selectedVariation, setSelectedVariation] =
//     useState<ProductVariation | null>(null);
//   const [whatsappNumber, setWhatsappNumber] = useState("");
//   const [notificationSignedUp, setNotificationSignedUp] = useState(false);
//   // Add this state variable with your other useState declarations
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

//   const router = useRouter();

//   // Replace your existing SWR configuration with this:
//   const { data, error, isLoading, mutate } = useSWR(
//     productId
//       ? `/public/products/${productId}${referralId ? `/${referralId}` : ""}`
//       : null,
//     async (url) => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       // Handle 404 specifically - don't throw error, return null
//       if (response.status === 404) {
//         return { data: null }; // This will make productData null
//       }

//       // For other HTTP errors, throw to trigger error state
//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       return response.json();
//     },
//     {
//       revalidateOnFocus: false,
//       revalidateIfStale: false,
//       dedupingInterval: 60000,
//     }
//   );

//   // The rest of your component logic remains the same
//   const productData: ProductData = data?.data || null;

//   // Handle variations logic
//   const hasVariations =
//     productData?.variations && productData.variations.length > 0;

//   // Get unique sizes and colors from variations
//   const availableSizes = useMemo(() => {
//     if (!hasVariations) return [];
//     const sizes = [
//       ...new Set(productData.variations.map((v) => v.size).filter(Boolean)),
//     ];
//     return sizes;
//   }, [hasVariations, productData?.variations]);

//   const availableColors = useMemo(() => {
//     if (!hasVariations) return [];
//     const colors = [
//       ...new Set(productData.variations.map((v) => v.color).filter(Boolean)),
//     ];
//     return colors;
//   }, [hasVariations, productData?.variations]);

//   // Get current stock based on selected variation or base stock
//   const currentStock = useMemo(() => {
//     if (hasVariations && selectedVariation) {
//       return selectedVariation.stock;
//     }
//     return productData?.stocks || 0;
//   }, [hasVariations, selectedVariation, productData?.stocks]);

//   const formatDescription = (text: string) => {
//     if (!text) return "";
//     // Capitalize first letter and ensure proper spacing
//     return text.charAt(0).toUpperCase() + text.slice(1);
//   };

//   // Update selected variation when size/color changes
//   const updateVariationSelection = (size?: string, color?: string) => {
//     if (!hasVariations) return;

//     const variation = productData.variations.find(
//       (v) => (!size || v.size === size) && (!color || v.color === color)
//     );

//     setSelectedVariation(variation || null);
//     setQuantity(1); // Reset quantity when variation changes
//   };

//   // Auto-select first variation if available
//   useEffect(() => {
//     if (
//       hasVariations &&
//       productData.variations.length > 0 &&
//       !selectedVariation
//     ) {
//       setSelectedVariation(productData.variations[0]);
//     }
//   }, [hasVariations, productData?.variations, selectedVariation]);

//   const updateQuantity = (change: number) => {
//     const newQuantity = Math.max(1, quantity + change);
//     const maxQuantity = currentStock;
//     setQuantity(Math.min(newQuantity, maxQuantity));
//   };

//   // Calculate pricing information
//   const pricing = useMemo(() => {
//     if (!productData) {
//       return { subtotal: 0, deliveryFee: 1500, total: 1500 };
//     }

//     const subtotal = productData.price * quantity;
//     const deliveryFee = 1500;
//     const total = subtotal + deliveryFee;

//     return { subtotal, deliveryFee, total };
//   }, [productData, quantity]);

//   const handleCheckout = () => {
//     let checkoutUrl = `/checkout?pid=${productId}&qty=${quantity}`;

//     if (selectedVariation) {
//       checkoutUrl += `&variation=${selectedVariation.id}`;
//     }

//     if (referralId) {
//       checkoutUrl += `&ref=${referralId}`;
//     }

//     if (platform) {
//       checkoutUrl += `&platform=${platform}`;
//     }

//     router.push(checkoutUrl);
//   };

//   const handleWhatsAppSignup = () => {
//     // Here you would typically call an API to save the WhatsApp number
//     console.log("WhatsApp signup:", whatsappNumber);
//     setNotificationSignedUp(true);
//     setWhatsappNumber("");
//   };

//   const formatPrice = (price: number) => {
//     return `₦${price?.toLocaleString()}`;
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Image Gallery Skeleton */}
//                   <div className="flex-shrink-0 w-full md:w-1/2">
//                     <div className="aspect-square rounded-lg bg-muted animate-pulse mb-4"></div>
//                     <div className="flex gap-2">
//                       {[1, 2, 3].map((i) => (
//                         <div
//                           key={i}
//                           className="w-16 h-16 rounded-md bg-muted animate-pulse"
//                         ></div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Product Details Skeleton */}
//                   <div className="flex-1 space-y-4">
//                     <div className="h-8 bg-muted rounded-md w-3/4 animate-pulse"></div>
//                     <div className="h-6 bg-muted rounded-md w-24 animate-pulse"></div>
//                     <div className="space-y-2">
//                       <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
//                       <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
//                       <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse"></div>
//                     </div>
//                     <div className="h-10 bg-muted rounded-md w-40 animate-pulse"></div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-1">
//             <Card>
//               <CardContent className="p-6 space-y-6">
//                 <div className="h-6 bg-muted rounded-md w-1/2 animate-pulse"></div>
//                 <div className="space-y-4">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className="flex justify-between">
//                       <div className="h-4 bg-muted rounded-md w-24 animate-pulse"></div>
//                       <div className="h-4 bg-muted rounded-md w-16 animate-pulse"></div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Technical Error state
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
//         <div className="text-center max-w-md">
//           <div className="mb-6 text-muted-foreground">
//             <RefreshCw className="w-16 h-16 mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold mb-3">
//             Something went wrong on our end
//           </h2>
//           <p className="text-muted-foreground mb-6">
//             We're having trouble loading this product. Please refresh the page
//             or try again in a moment.
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Button
//               onClick={() => mutate()}
//               className="flex items-center gap-2"
//             >
//               <RefreshCw className="w-4 h-4" />
//               Try Again
//             </Button>
//             <Button variant="outline" onClick={() => router.push("/")}>
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Go Back
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Product not found state
//   if (!productData) {
//     return (
//       <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
//         <div className="text-center max-w-md">
//           <div className="mb-6 text-muted-foreground">
//             <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
//               <span className="text-2xl">🌟</span>
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold mb-3">
//             This amazing product has been retired
//           </h2>
//           <p className="text-muted-foreground mb-6">
//             We've moved on to even better versions of this product. Check out
//             our latest collection!
//           </p>
//           <div className="flex flex-col gap-4">
//             <Button onClick={() => router.push("/")} className="mx-auto">
//               Explore New Arrivals
//             </Button>
//             <div className="text-sm text-muted-foreground">
//               Want to be the first to know about new products?{" "}
//               <Button variant="link" className="p-0 h-auto text-sm">
//                 Join our newsletter
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Check if product is out of stock
//   const isOutOfStock = currentStock === 0;

//   return (
//     <div className="flex flex-col min-h-screen pb-16 md:pb-0">
//       <div className="container mx-auto px-4 py-4 md:py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Enhanced Image Gallery */}
//                   <div className="flex-shrink-0 w-full md:w-[45%]">
//                     {/* Main Image */}
//                     <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
//                       <Image
//                         src={
//                           productData.images?.[selectedImageIndex] ||
//                           "/placeholder.svg"
//                         }
//                         alt={`${productData.name} - Image ${
//                           selectedImageIndex + 1
//                         }`}
//                         fill
//                         className="object-cover transition-opacity duration-300"
//                         priority
//                       />
//                     </div>

//                     {/* Thumbnail Gallery */}
//                     {productData.images && productData.images.length > 1 && (
//                       <div className="flex gap-2 overflow-x-auto pb-2">
//                         {productData.images.slice(0, 3).map((image, index) => (
//                           <button
//                             key={index}
//                             onClick={() => setSelectedImageIndex(index)}
//                             className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
//                               selectedImageIndex === index
//                                 ? "border-primary ring-2 ring-primary/20"
//                                 : "border-muted hover:border-muted-foreground"
//                             }`}
//                           >
//                             <Image
//                               src={image || "/placeholder.svg"}
//                               alt={`${productData.name} thumbnail ${index + 1}`}
//                               fill
//                               className="object-cover"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-2">
//                       <h1 className="text-xl md:text-2xl font-bold">
//                         {productData.name}
//                       </h1>
//                       {currentStock > 0 && currentStock <= 5 && (
//                         <Badge variant="destructive" className="ml-2">
//                           Only {currentStock} left!
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-2xl font-bold text-primary mb-4">
//                       {formatPrice(productData.price)}
//                     </p>
//                     {/* Variations Selection */}
//                     {hasVariations && (
//                       <div className="space-y-4 mb-6">
//                         {/* Size Selection */}
//                         {availableSizes.length > 0 && (
//                           <div>
//                             <Label className="text-sm font-medium mb-2 block">
//                               Size
//                             </Label>
//                             <RadioGroup
//                               value={selectedVariation?.size || ""}
//                               onValueChange={(size) =>
//                                 updateVariationSelection(
//                                   size,
//                                   selectedVariation?.color
//                                 )
//                               }
//                               className="flex flex-wrap gap-2"
//                             >
//                               {availableSizes.map((size) => (
//                                 <div key={size} className="flex items-center">
//                                   <RadioGroupItem
//                                     value={size}
//                                     id={`size-${size}`}
//                                     className="sr-only"
//                                   />
//                                   <Label
//                                     htmlFor={`size-${size}`}
//                                     className={`px-3 py-2 border rounded-md cursor-pointer transition-all ${
//                                       selectedVariation?.size === size
//                                         ? "border-primary bg-primary text-primary-foreground"
//                                         : "border-muted hover:border-muted-foreground"
//                                     }`}
//                                   >
//                                     {size}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </RadioGroup>
//                           </div>
//                         )}

//                         {/* Color Selection */}
//                         {availableColors.length > 0 && (
//                           <div>
//                             <Label className="text-sm font-medium mb-2 block">
//                               Color
//                             </Label>
//                             <RadioGroup
//                               value={selectedVariation?.color || ""}
//                               onValueChange={(color) =>
//                                 updateVariationSelection(
//                                   selectedVariation?.size,
//                                   color
//                                 )
//                               }
//                               className="flex flex-wrap gap-2"
//                             >
//                               {availableColors.map((color) => (
//                                 <div key={color} className="flex items-center">
//                                   <RadioGroupItem
//                                     value={color}
//                                     id={`color-${color}`}
//                                     className="sr-only"
//                                   />
//                                   <Label
//                                     htmlFor={`color-${color}`}
//                                     className={`px-3 py-2 border rounded-md cursor-pointer transition-all ${
//                                       selectedVariation?.color === color
//                                         ? "border-primary bg-primary text-primary-foreground"
//                                         : "border-muted hover:border-muted-foreground"
//                                     }`}
//                                   >
//                                     {color}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </RadioGroup>
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* Description Dropdown */}
//                     {productData.description && (
//                       <div className="mb-6">
//                         <button
//                           onClick={() =>
//                             setIsDescriptionExpanded(!isDescriptionExpanded)
//                           }
//                           className="flex items-center justify-between w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
//                         >
//                           <span className="font-medium text-left">
//                             Description
//                           </span>
//                           {isDescriptionExpanded ? (
//                             <ChevronUp className="h-4 w-4 text-muted-foreground" />
//                           ) : (
//                             <ChevronDown className="h-4 w-4 text-muted-foreground" />
//                           )}
//                         </button>

//                         {isDescriptionExpanded && (
//                           <div className="mt-2 border border-muted rounded-lg bg-background">
//                             <div className="max-h-[200px] overflow-y-auto overflow-x-hidden p-4">
//                               <p className="text-muted-foreground leading-relaxed break-all word-wrap overflow-wrap-anywhere hyphens-auto text-sm">
//                                 {formatDescription(productData.description)}
//                               </p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     {/* Quantity and Stock */}
//                     {!isOutOfStock && (
//                       <div className="flex items-center space-x-4 mb-6">
//                         <span className="text-sm font-medium">Quantity:</span>
//                         <div className="flex items-center space-x-2">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8 rounded-md"
//                             onClick={() => updateQuantity(-1)}
//                             disabled={quantity <= 1}
//                           >
//                             <Minus className="h-3 w-3" />
//                           </Button>
//                           <span className="w-8 text-center font-medium">
//                             {quantity}
//                           </span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8 rounded-md"
//                             onClick={() => updateQuantity(1)}
//                             disabled={quantity >= currentStock}
//                           >
//                             <Plus className="h-3 w-3" />
//                           </Button>
//                         </div>
//                         <span className="text-sm text-muted-foreground">
//                           {currentStock} available
//                         </span>
//                       </div>
//                     )}
//                     {/* Stock Status */}
//                     <div className="flex items-center text-sm mb-4">
//                       <span
//                         className={
//                           isOutOfStock
//                             ? "text-red-600 font-medium"
//                             : currentStock <= 5
//                             ? "text-orange-600 font-medium"
//                             : "text-green-600"
//                         }
//                       >
//                         {isOutOfStock
//                           ? "Currently Out of Stock"
//                           : currentStock <= 5
//                           ? `Only ${currentStock} left in stock`
//                           : "In Stock"}
//                       </span>
//                     </div>
//                     {/* Out of Stock WhatsApp Signup */}
//                     {isOutOfStock && (
//                       <div className="bg-muted/50 rounded-lg p-4 mb-4">
//                         <h3 className="font-medium mb-2">
//                           Good news travels fast!
//                         </h3>
//                         <p className="text-sm text-muted-foreground mb-4">
//                           This popular item is temporarily sold out. Drop your
//                           WhatsApp number and we'll ping you the moment it's
//                           back!
//                         </p>

//                         {!notificationSignedUp ? (
//                           <div className="flex gap-2">
//                             <div className="flex-1">
//                               <Input
//                                 type="tel"
//                                 placeholder="Your WhatsApp number"
//                                 value={whatsappNumber}
//                                 onChange={(e) =>
//                                   setWhatsappNumber(e.target.value)
//                                 }
//                                 className="text-sm"
//                               />
//                             </div>
//                             <Button
//                               size="sm"
//                               onClick={handleWhatsAppSignup}
//                               disabled={!whatsappNumber.trim()}
//                               className="flex items-center gap-1"
//                             >
//                               <Phone className="w-3 h-3" />
//                               Notify Me
//                             </Button>
//                           </div>
//                         ) : (
//                           <div className="text-sm text-green-600 font-medium">
//                             ✓ You'll be notified when this item is back in
//                             stock!
//                           </div>
//                         )}

//                         <p className="text-xs text-muted-foreground mt-2">
//                           We'll only use your number for restock notifications.
//                           No spam, promise!
//                         </p>
//                       </div>
//                     )}
//                     {/* Seller Info */}
//                     {productData.seller && (
//                       <div className="text-sm text-muted-foreground">
//                         Sold by:{" "}
//                         <span className="font-medium">
//                           {productData.seller}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-20">
//               <Card>
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

//                   <div className="space-y-3 mb-6">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Product Price
//                       </span>
//                       <span>{formatPrice(productData.price)}</span>
//                     </div>
//                     {!isOutOfStock && (
//                       <>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">
//                             Quantity
//                           </span>
//                           <span>x {quantity}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">
//                             Subtotal
//                           </span>
//                           <span>{formatPrice(pricing.subtotal)}</span>
//                         </div>
//                       </>
//                     )}
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Delivery Fee
//                       </span>
//                       <span>{formatPrice(pricing.deliveryFee)}</span>
//                     </div>
//                     <Separator className="my-4" />
//                     <div className="flex justify-between font-bold">
//                       <span>Total</span>
//                       <span>
//                         {formatPrice(
//                           isOutOfStock ? pricing.deliveryFee : pricing.total
//                         )}
//                       </span>
//                     </div>
//                   </div>

//                   <Button
//                     size="lg"
//                     className="w-full"
//                     onClick={handleCheckout}
//                     disabled={
//                       isOutOfStock || (hasVariations && !selectedVariation)
//                     }
//                   >
//                     {isOutOfStock
//                       ? "Out of Stock"
//                       : hasVariations && !selectedVariation
//                       ? "Select Options"
//                       : "Proceed to Checkout"}
//                   </Button>

//                   {hasVariations && !selectedVariation && !isOutOfStock && (
//                     <p className="text-sm text-muted-foreground text-center mt-2">
//                       Please select your preferred options above
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* Help Section */}
//               <Card className="mt-6">
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold mb-4">Need Help?</h3>
//                   <div className="space-y-4 text-sm">
//                     <div className="flex items-start">
//                       <span className="mr-2 text-primary">•</span>
//                       <p>
//                         Orders are typically delivered within 2-4 business days
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="mr-2 text-primary">•</span>
//                       <p>We accept returns within 7 days of delivery</p>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="mr-2 text-primary">•</span>
//                       <p>Free delivery on orders above ₦10,000</p>
//                     </div>
//                     <div className="text-center mt-4">
//                       <Button variant="link" className="text-primary">
//                         Contact Support
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, RefreshCw, ArrowLeft, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProductVariation {
  id: string;
  size: string;
  color: string;
  stock: number;
  productId: string;
  name?: string; // Display name for the variation like "Large Red" or "Medium Blue"
  price?: number; // Override price for this variation
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  size: string;
  color: string;
  stocks: number;
  variations: ProductVariation[];
  features?: string[];
  seller?: string;
  inStock?: boolean;
}

interface SingleProductCartProps {
  productId?: string;
  referralId?: string;
  platform?: string;
}

export const SingleProduct = ({
  productId,
  referralId,
  platform,
}: SingleProductCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [notificationSignedUp, setNotificationSignedUp] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR(
    productId
      ? `/public/products/${productId}${referralId ? `/${referralId}` : ""}`
      : null,
    async (url) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 404) {
        return { data: null };
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000,
    }
  );

  const productData: ProductData = data?.data || null;

  // Handle variations logic
  const hasVariations =
    productData?.variations && productData.variations.length > 0;

  // Format variation display name
  const getVariationDisplayName = (variation: ProductVariation) => {
    if (variation.name) return variation.name;

    const parts = [];
    if (variation.size) parts.push(variation.size);
    if (variation.color) parts.push(variation.color);

    return parts.join(" - ") || `Variation ${variation.id}`;
  };

  // Get current stock and price
  const currentStock = useMemo(() => {
    if (hasVariations && selectedVariation) {
      return selectedVariation.stock;
    }
    return productData?.stocks || 0;
  }, [hasVariations, selectedVariation, productData?.stocks]);

  const currentPrice = useMemo(() => {
    if (hasVariations && selectedVariation?.price) {
      return selectedVariation.price;
    }
    return productData?.price || 0;
  }, [hasVariations, selectedVariation, productData?.price]);

  // Handle quantity input changes
  const handleQuantityInputChange = (value: string) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    setQuantityInput(value);

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      const validQuantity = Math.min(numValue, currentStock);
      setQuantity(validQuantity);
    } else if (value === "") {
      // Allow empty input but don't update quantity yet
      return;
    }
  };

  // Handle quantity input blur (when user finishes typing)
  const handleQuantityInputBlur = () => {
    const numValue = parseInt(quantityInput);
    if (isNaN(numValue) || numValue < 1) {
      setQuantity(1);
      setQuantityInput("1");
    } else {
      const validQuantity = Math.min(numValue, currentStock);
      setQuantity(validQuantity);
      setQuantityInput(validQuantity.toString());
    }
  };

  // Handle Enter key in quantity input
  const handleQuantityInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQuantityInputBlur();
    }
  };

  // Sync quantity input with quantity state
  useEffect(() => {
    setQuantityInput(quantity.toString());
  }, [quantity]);

  const formatDescription = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Handle variation selection
  const handleVariationSelect = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    setQuantity(1);
    setQuantityInput("1");
  };

  // Auto-select first variation if available
  useEffect(() => {
    if (
      hasVariations &&
      productData.variations.length > 0 &&
      !selectedVariation
    ) {
      setSelectedVariation(productData.variations[0]);
    }
  }, [hasVariations, productData?.variations, selectedVariation]);

  const updateQuantity = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    const maxQuantity = currentStock;
    const validQuantity = Math.min(newQuantity, maxQuantity);
    setQuantity(validQuantity);
    setQuantityInput(validQuantity.toString());
  };

  // Calculate pricing information
  const pricing = useMemo(() => {
    if (!productData) {
      return { subtotal: 0, deliveryFee: 1500, total: 1500 };
    }

    const subtotal = currentPrice * quantity;
    const deliveryFee = 1500;
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
  }, [currentPrice, quantity]);

  const handleCheckout = () => {
    let checkoutUrl = `/checkout?pid=${productId}&qty=${quantity}`;

    if (selectedVariation) {
      checkoutUrl += `&variation=${selectedVariation.id}`;
    }

    if (referralId) {
      checkoutUrl += `&ref=${referralId}`;
    }

    if (platform) {
      checkoutUrl += `&platform=${platform}`;
    }

    router.push(checkoutUrl);
  };

  const handleWhatsAppSignup = () => {
    console.log("WhatsApp signup:", whatsappNumber);
    setNotificationSignedUp(true);
    setWhatsappNumber("");
  };

  const formatPrice = (price: number) => {
    return `₦${price?.toLocaleString()}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 w-full md:w-1/2">
                    <div className="aspect-square rounded-lg bg-muted animate-pulse mb-4"></div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-16 h-16 rounded-md bg-muted animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-muted rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-muted rounded-md w-24 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-muted rounded-md w-40 animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="h-6 bg-muted rounded-md w-1/2 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-muted rounded-md w-24 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-16 animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Technical Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md">
          <div className="mb-6 text-muted-foreground">
            <RefreshCw className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Something went wrong on our end
          </h2>
          <p className="text-muted-foreground mb-6">
            We're having trouble loading this product. Please refresh the page
            or try again in a moment.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => mutate()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md">
          <div className="mb-6 text-muted-foreground">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">
            This amazing product has been retired
          </h2>
          <p className="text-muted-foreground mb-6">
            We've moved on to even better versions of this product. Check out
            our latest collection!
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => router.push("/")} className="mx-auto">
              Explore New Arrivals
            </Button>
            <div className="text-sm text-muted-foreground">
              Want to be the first to know about new products?{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Join our newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if product is out of stock
  const isOutOfStock = currentStock === 0;

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Enhanced Image Gallery */}
                  <div className="flex-shrink-0 w-full md:w-[45%]">
                    {/* Main Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
                      <Image
                        src={
                          productData.images?.[selectedImageIndex] ||
                          "/placeholder.svg"
                        }
                        alt={`${productData.name} - Image ${
                          selectedImageIndex + 1
                        }`}
                        fill
                        className="object-cover transition-opacity duration-300"
                        priority
                      />
                    </div>

                    {/* Thumbnail Gallery */}
                    {productData.images && productData.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {productData.images.slice(0, 3).map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-muted hover:border-muted-foreground"
                            }`}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${productData.name} thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-xl md:text-2xl font-bold">
                        {productData.name}
                      </h1>
                      {currentStock > 0 && currentStock <= 5 && (
                        <Badge variant="destructive" className="ml-2">
                          Only {currentStock} left!
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {formatPrice(currentPrice)}
                    </p>

                    {/* Variations Selection - Display as complete options */}
                    {hasVariations && (
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Available Options
                          </Label>
                          <RadioGroup
                            value={selectedVariation?.id || ""}
                            onValueChange={(variationId) => {
                              const variation = productData.variations.find(
                                (v) => v.id === variationId
                              );
                              if (variation) {
                                handleVariationSelect(variation);
                              }
                            }}
                            className="grid gap-3"
                          >
                            {productData.variations.map((variation) => (
                              <div
                                key={variation.id}
                                className="flex items-center"
                              >
                                <RadioGroupItem
                                  value={variation.id}
                                  id={`variation-${variation.id}`}
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor={`variation-${variation.id}`}
                                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all hover:border-muted-foreground ${
                                    selectedVariation?.id === variation.id
                                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                      : "border-muted"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="font-medium">
                                        {getVariationDisplayName(variation)}
                                      </div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Stock: {variation.stock} available
                                        {variation.price &&
                                          variation.price !==
                                            productData.price && (
                                            <span className="ml-2 font-medium text-primary">
                                              {formatPrice(variation.price)}
                                            </span>
                                          )}
                                      </div>
                                    </div>
                                    {variation.stock === 0 && (
                                      <Badge
                                        variant="destructive"
                                        className="ml-2"
                                      >
                                        Out of Stock
                                      </Badge>
                                    )}
                                    {variation.stock > 0 &&
                                      variation.stock <= 5 && (
                                        <Badge
                                          variant="secondary"
                                          className="ml-2"
                                        >
                                          Low Stock
                                        </Badge>
                                      )}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    )}

                    {/* Description Dropdown */}
                    {productData.description && (
                      <div className="mb-6">
                        <button
                          onClick={() =>
                            setIsDescriptionExpanded(!isDescriptionExpanded)
                          }
                          className="flex items-center justify-between w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <span className="font-medium text-left">
                            Description
                          </span>
                          {isDescriptionExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>

                        {isDescriptionExpanded && (
                          <div className="mt-2 border border-muted rounded-lg bg-background">
                            <div className="max-h-[200px] overflow-y-auto overflow-x-hidden p-4">
                              <p className="text-muted-foreground leading-relaxed break-all word-wrap overflow-wrap-anywhere hyphens-auto text-sm">
                                {formatDescription(productData.description)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quantity and Stock */}
                    {!isOutOfStock && (
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(-1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="text"
                            value={quantityInput}
                            onChange={(e) =>
                              handleQuantityInputChange(e.target.value)
                            }
                            onBlur={handleQuantityInputBlur}
                            onKeyDown={handleQuantityInputKeyDown}
                            className="w-16 h-8 text-center text-sm"
                            min="1"
                            max={currentStock}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(1)}
                            disabled={quantity >= currentStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {currentStock} available
                        </span>
                      </div>
                    )}

                    {/* Stock Status */}
                    <div className="flex items-center text-sm mb-4">
                      <span
                        className={
                          isOutOfStock
                            ? "text-red-600 font-medium"
                            : currentStock <= 5
                            ? "text-orange-600 font-medium"
                            : "text-green-600"
                        }
                      >
                        {isOutOfStock
                          ? "Currently Out of Stock"
                          : currentStock <= 5
                          ? `Only ${currentStock} left in stock`
                          : "In Stock"}
                      </span>
                    </div>

                    {/* Out of Stock WhatsApp Signup */}
                    {isOutOfStock && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <h3 className="font-medium mb-2">
                          Good news travels fast!
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          This popular item is temporarily sold out. Drop your
                          WhatsApp number and we'll ping you the moment it's
                          back!
                        </p>

                        {!notificationSignedUp ? (
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Input
                                type="tel"
                                placeholder="Your WhatsApp number"
                                value={whatsappNumber}
                                onChange={(e) =>
                                  setWhatsappNumber(e.target.value)
                                }
                                className="text-sm"
                              />
                            </div>
                            <Button
                              size="sm"
                              onClick={handleWhatsAppSignup}
                              disabled={!whatsappNumber.trim()}
                              className="flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              Notify Me
                            </Button>
                          </div>
                        ) : (
                          <div className="text-sm text-green-600 font-medium">
                            ✓ You'll be notified when this item is back in
                            stock!
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">
                          We'll only use your number for restock notifications.
                          No spam, promise!
                        </p>
                      </div>
                    )}

                    {/* Seller Info */}
                    {productData.seller && (
                      <div className="text-sm text-muted-foreground">
                        Sold by:{" "}
                        <span className="font-medium">
                          {productData.seller}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Product Price
                      </span>
                      <span>{formatPrice(currentPrice)}</span>
                    </div>
                    {!isOutOfStock && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Quantity
                          </span>
                          <span>x {quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>{formatPrice(pricing.subtotal)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span>{formatPrice(pricing.deliveryFee)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        {formatPrice(
                          isOutOfStock ? pricing.deliveryFee : pricing.total
                        )}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={
                      isOutOfStock || (hasVariations && !selectedVariation)
                    }
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : hasVariations && !selectedVariation
                      ? "Select an Option"
                      : "Proceed to Checkout"}
                  </Button>

                  {hasVariations && !selectedVariation && !isOutOfStock && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Please select your preferred option above
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <p>
                        Orders are typically delivered within 2-4 business days
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <p>We accept returns within 7 days of delivery</p>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <p>Free delivery on orders above ₦10,000</p>
                    </div>
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-primary">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};