

// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import useSWR from "swr";
// import {
//   ArrowLeft,
//   Package,
//   Plus,
//   ShoppingBag,
//   Truck,
//   Users,
//   CheckCircle,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ProductImageGallery } from "./product-image-gallery";
// import { ProductSpecifications } from "./product-specifications";
// import { PlugReviews } from "./plug-reviews"
// import { Skeleton } from "@/components/ui/skeleton";
// import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
// import { useUser } from "@/app/_components/provider/UserContext";
// import { formatPrice, getTotalStock, truncateText } from "@/lib/utils";

// // Define fetcher function for useSWR
// const fetcher = async (url: string) => {
//   const res = await fetch(url, { credentials: "include" });
//   if (!res.ok) {
//     throw new Error("Failed to fetch product data");
//   }
//   const { data } = await res.json();
//   return data;
// };



// // Product Skeleton Loading Component
// const ProductSkeleton = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-background animate-fade-in pb-20">
//       {/* Header Skeleton */}
//       <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3">
//         <div className="flex items-center gap-2">
//           <Skeleton className="h-10 w-10 rounded-md" />
//           <Skeleton className="h-6 w-40" />
//         </div>
//         <Skeleton className="h-10 w-32" />
//       </header>

//       <main className="flex-1">
//         {/* Gallery Skeleton - Modified for better responsiveness */}
//         <div className="container mx-auto px-4">
//           <div className="">
//             {/* Gallery section */}
//             <section className="p-4">
//               {/* Main image with controlled height on larger screens */}
//               <div className="relative overflow-hidden rounded-lg mb-4 md:max-h-96 lg:max-h-[28rem]">
//                 <div className="aspect-square md:aspect-auto md:h-96 lg:h-[28rem] w-full">
//                   <Skeleton className="h-full w-full" />
//                 </div>
//               </div>
//               {/* Thumbnail grid */}
//               <div className="grid grid-cols-4 gap-2">
//                 {[...Array(4)].map((_, i) => (
//                   <Skeleton key={i} className="aspect-square rounded-md" />
//                 ))}
//               </div>
//             </section>

//             {/* Product Info Skeletons */}
//             <section className="px-4 space-y-6 md:pt-4">
//               <div>
//                 <Skeleton className="h-7 w-3/4 mb-2" />
//                 <div className="flex items-center gap-2 mt-1">
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-4 w-4 rounded-full" />
//                   <Skeleton className="h-4 w-24" />
//                 </div>
//               </div>

//               {/* Supplier Skeleton */}
//               <Card>
//                 <CardContent className="p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Skeleton className="h-10 w-10 rounded-full" />
//                       <div>
//                         <Skeleton className="h-5 w-32 mb-1" />
//                         <Skeleton className="h-4 w-20" />
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Delivery & Stock Skeleton */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Skeleton className="h-20 rounded-lg" />
//                 <Skeleton className="h-20 rounded-lg" />
//                 <Skeleton className="h-20 rounded-lg" />
//               </div>

//               {/* Tabs Skeleton */}
//               <div className="mt-6">
//                 <Skeleton className="h-10 w-full mb-4" />
//                 <Skeleton className="h-32 w-full" />
//               </div>
//             </section>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default function ProductDetail() {
//   const router = useRouter();
//   const params = useParams();
//   const productId = params.id;

//   // Use SWR for data fetching with caching
//   const {
//     data: product,
//     error,
//     isLoading,
//   } = useSWR(`/api/products/${productId}`, fetcher, {
//     revalidateOnFocus: true,
//     revalidateIfStale: false,
//     dedupingInterval: 600000,
//     shouldRetryOnError: false,
//   });

//   const [isAdding, setIsAdding] = useState(false);
//   const { items, addItem } = useShoppingCart();
//   const {
//     userData: { user },
//   } = useUser();


//   console.log("product", product)


//   const getInitials = (name: string) =>
//     name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2)


//   const isInCart = items.some((item) => item.id === product?.id);

//   const handleAddToStore = (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent card click when clicking the button
//     e.stopPropagation(); // Stop event propagation

//     if (isInCart) return; // Don't add if already in cart

//     setIsAdding(true);

//     // Create cart item from product
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image:
//         product.images && product.images.length > 0
//           ? product.images[0]
//           : "/placeholder.svg",
//            minPrice: product.minPrice, // Use product.minPrice
//       maxPrice: product.maxPrice, // Use product.maxPrice (0 means no limit)
//     };

//     // Add item to cart after a short delay to show loading state
//     setTimeout(() => {
//       addItem(cartItem, false); // Pass false to prevent opening the cart
//       setIsAdding(false);
//     }, 800);
//   };

//   // Handle loading state with skeleton
//   if (isLoading) {
//     return <ProductSkeleton />;
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen p-4">
//         <h2 className="text-xl font-bold text-red-500 mb-2">
//           Error loading product
//         </h2>
//         <p className="text-muted-foreground mb-4">
//           Unable to load product details. Please try again.
//         </p>
//         <Button onClick={() => router.back()}>
//           <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
//         </Button>
//       </div>
//     );
//   }

//   // Handle case when product is not available yet
//   if (!product) {
//     return <ProductSkeleton />;
//   }

//   // Format description for better display
//   const formattedDescription = product?.description
//     ? product.description.charAt(0).toUpperCase() + product.description.slice(1)
//     : "";

//   // Utility function to format plural text
//   const formatPlural = (count: number, singular: any, plural: any) => {
//     return count === 1 ? `1 ${singular}` : `${count} ${plural}`;
//   };

//   // Hardcoded fulfillment rate for now
//   const fulfillmentRate = 100;
//   const getFulfillmentRateDescription = (rate: number) => {
//     if (rate >= 85) return "Excellent";
//     if (rate >= 70) return "Very Good";
//     if (rate >= 60) return "Good";
//     if (rate >= 45) return "Fair";
//     return "Poor";
//   };

//   const getFulfillmentRateColor = (rate: number) => {
//     if (rate >= 60) return "text-green-600"; // Good and above - green
//     if (rate >= 45) return "text-yellow-600"; // Fair - yellow
//     return "text-red-600"; // Poor - red
//   };

//   return (
//     <TooltipProvider>
//       <div className="flex flex-col min-h-screen bg-background animate-fade-in pb-20">
//         {/* Header */}
//         <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon" onClick={() => router.back()}>
//               <ArrowLeft className="h-5 w-5" />
//               <span className="sr-only">Back</span>
//             </Button>
//             <h1 className="text-lg font-semibold truncate capitalize max-w-[200px] md:max-w-md">
//               {product?.name}
//             </h1>
//           </div>
//           <div>
//             {user?.userType === "PLUG" && (
//               <Button
//                 className={`${
//                   isInCart
//                     ? "bg-green-100 text-green-800 hover:bg-green-100"
//                     : product?.isPlugged
//                     ? "bg-red-100 text-red-800 hover:bg-red-100"
//                     : ""
//                 }`}
//                 onClick={handleAddToStore}
//                 disabled={isAdding || isInCart || product?.isPlugged}
//                 aria-live="polite"
//               >
//                 {isAdding ? (
//                   <span className="animate-pulse">Adding...</span>
//                 ) : isInCart ? (
//                   <>
//                     <Package className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
//                     <span className="text-xs sm:text-sm">In Cart</span>
//                   </>
//                 ) : product?.isPlugged ? (
//                   <>
//                     <Package className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
//                     <span className="text-xs sm:text-sm">Added</span>
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
//                     <span className="text-xs sm:text-sm">Add to Store</span>
//                   </>
//                 )}
//               </Button>
//             )}
//           </div>
//         </header>

//         <main className="flex-1">
//           {/* Product Images */}
//           <section className="p-4">
//             <ProductImageGallery images={product?.images} />

//             {product?.trending && (
//               <Badge
//                 className="mt-2 bg-primary text-primary-foreground"
//                 variant="secondary"
//               >
//                 Trending
//               </Badge>
//             )}
//           </section>

//           {/* Product Info */}
//           <section className="px-4 space-y-6">
//             <div>
//               <div className="flex items-start justify-between">
//                 <h2 className="text-base md:text-lg font-bold capitalize">
//                   {truncateText(product?.name)}
//                 </h2>
//                 <div className="font-semibold">
//                   {formatPrice(product?.price)}
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
//                 <div className="flex items-center">
//                   <ShoppingBag className="mr-1 h-3.5 w-3.5" />
//                   {/* Fixed: Show "0 sold" when sales is 0 */}
//                   {product?.sold >= 100
//                     ? "99+"
//                     : `${product?.sold || 0}`}{" "}
//                   sold
//                 </div>
//                 <span>•</span>
//                 <div className="flex items-center">
//                   <Users className="mr-1 h-3.5 w-3.5" />
//                   <span className="text-muted-foreground">
//                     {/* Fixed: Handle proper pluralization for plugs */}
//                     {formatPlural(product?.plugsCount || 0, "plug", "plugs")}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Supplier Info */}
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Avatar>
//                       <AvatarImage
//                         src={product?.supplier?.image}
//                         alt={product?.supplier?.businessName}
//                       />
//                       <AvatarFallback className="capitalize">
//                         {getInitials(product?.supplier?.businessName)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-semibold capitalize">
//                         {truncateText(product?.supplier?.businessName)}
//                       </div>
//                       <div className="flex items-center text-sm text-muted-foreground capitalize">
//                         {product?.supplier?.pickupLocation.lga}, {product?.supplier?.pickupLocation.state}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Delivery & Stock Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
//                 <div className="flex items-center gap-2">
//                   <Truck className="h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <div className="text-xs md:text-sm font-medium">
//                       Delivery Time
//                     </div>
//                   </div>
//                 </div>
//                 <div className="font-semibold text-sm">2 - 3 days</div>
//               </div> */}

//               <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
//                 <div className="flex items-center gap-2">
//                   <Package className="h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <div className="text-xs md:text-sm font-medium">Stock</div>
//                     <div className="text-xs text-muted-foreground">
//                       Available
//                     </div>
//                   </div>
//                 </div>
//                 <div className="font-semibold text-sm">
//                   {/* Fixed: Handle proper pluralization for stock units */}
//                   {formatPlural(getTotalStock(product) || 0, "unit", "units")}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <div className="text-xs md:text-sm font-medium">
//                       Fulfillment Rate
//                     </div>
//                     <div
//                       className={`text-xs font-medium ${getFulfillmentRateColor(
//                         fulfillmentRate
//                       )}`}
//                     >
//                       {getFulfillmentRateDescription(fulfillmentRate)}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="font-semibold text-sm">{fulfillmentRate}%</div>
//               </div>
//             </div>

//             {/* Fulfillment Rate Description */}
//             <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
//               <p>
//                 <span className="font-medium">Fulfillment Rate:</span> The
//                 percentage of orders successfully delivered without returns or
//                 issues.
//               </p>
//             </div>

//             {/* Product Details Tabs */}
//             <Tabs defaultValue="description" className="mt-6">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="specifications">Details</TabsTrigger>
//                 <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               </TabsList>

//               <TabsContent value="description" className="mt-4 space-y-4">
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold">About this product</h3>
//                   <div className="text-sm prose prose-sm max-w-full">
//                     <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere capitalize">
//                       {formattedDescription || "No description available."}
//                     </p>
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="specifications" className="mt-4">
//                 <ProductSpecifications product={product} />
//               </TabsContent>

//               <TabsContent value="reviews" className="mt-4">
//               <PlugReviews
//     reviews={product?.reviews || []}
//   />
//               </TabsContent>
//             </Tabs>
//           </section>
//         </main>
//       </div>
//     </TooltipProvider>
//   );
// }









"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate as globalMutate } from "swr";
import {
  ArrowLeft,
  Package,
  Plus,
  ShoppingBag,
  Truck,
  Users,
  CheckCircle,
  UserPlus,
  UserMinus,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductImageGallery } from "./product-image-gallery";
import { ProductSpecifications } from "./product-specifications";
import { PlugReviews } from "./plug-reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { useUser } from "@/app/_components/provider/UserContext";
import { formatPrice, getTotalStock, truncateText } from "@/lib/utils";

// Define fetcher function for useSWR
const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  const { data } = await res.json();
  return data;
};

// Product Skeleton Loading Component
const ProductSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background animate-fade-in pb-20">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-10 w-32" />
      </header>

      <main className="flex-1">
        {/* Gallery Skeleton - Modified for better responsiveness */}
        <div className="container mx-auto px-4">
          <div className="">
            {/* Gallery section */}
            <section className="p-4">
              {/* Main image with controlled height on larger screens */}
              <div className="relative overflow-hidden rounded-lg mb-4 md:max-h-96 lg:max-h-[28rem]">
                <div className="aspect-square md:aspect-auto md:h-96 lg:h-[28rem] w-full">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
              {/* Thumbnail grid */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-md" />
                ))}
              </div>
            </section>

            {/* Product Info Skeletons */}
            <section className="px-4 space-y-6 md:pt-4">
              <div>
                <Skeleton className="h-7 w-3/4 mb-2" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Supplier Skeleton */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery & Stock Skeleton */}
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
              </div>

              {/* Tabs Skeleton */}
              <div className="mt-6">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-32 w-full" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  // Use SWR for data fetching with caching
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`/api/products/${productId}`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
    dedupingInterval: 600000,
    shouldRetryOnError: false,
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { items, addItem } = useShoppingCart();
  const {
    userData: { user },
  } = useUser();

  console.log("product", product);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const isInCart = items.some((item) => item.id === product?.id);

  const handleAddToStore = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click when clicking the button
    e.stopPropagation(); // Stop event propagation

    if (isInCart) return; // Don't add if already in cart

    setIsAdding(true);

    // Create cart item from product
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "/placeholder.svg",
      minPrice: product.minPrice, // Use product.minPrice
      maxPrice: product.maxPrice, // Use product.maxPrice (0 means no limit)
    };

    // Add item to cart after a short delay to show loading state
    setTimeout(() => {
      addItem(cartItem, false); // Pass false to prevent opening the cart
      setIsAdding(false);
    }, 800);
  };

  const handleSubscriptionToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.supplierId) return;

    setIsSubscribing(true);

    const isCurrentlySubscribed = product.isSubscribedToSupplier;
    const url = `/api/subscribe/${encodeURIComponent(product.supplierId)}`;
    const method = isCurrentlySubscribed ? "DELETE" : "POST";

    // Optimistic update
    globalMutate(
      `/api/products/${productId}`,
      (current: any) => {
        if (!current) return current;
        return {
          ...current,
          data: {
            ...current.data,
            isSubscribedToSupplier: !isCurrentlySubscribed,
          },
        };
      },
      false
    );

    try {
      const response = await fetch(url, { method });
      if (!response.ok) {
        throw new Error("Subscription request failed");
      }

      // Revalidate the product data
      globalMutate(`/api/products/${productId}`);

      // Also revalidate subscription lists if they exist
      globalMutate("/api/subscribe/plug");
      globalMutate("/api/subscribe/supplier");
    } catch (error) {
      console.error("Subscription error:", error);
      // Revert optimistic update on error
      globalMutate(`/api/products/${productId}`);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Handle loading state with skeleton
  if (isLoading) {
    return <ProductSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Error loading product
        </h2>
        <p className="text-muted-foreground mb-4">
          Unable to load product details. Please try again.
        </p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  // Handle case when product is not available yet
  if (!product) {
    return <ProductSkeleton />;
  }

  // Format description for better display
  const formattedDescription = product?.description
    ? product.description.charAt(0).toUpperCase() + product.description.slice(1)
    : "";

  // Utility function to format plural text
  const formatPlural = (count: number, singular: any, plural: any) => {
    return count === 1 ? `1 ${singular}` : `${count} ${plural}`;
  };

  // Hardcoded fulfillment rate for now
  const fulfillmentRate = 100;
  const getFulfillmentRateDescription = (rate: number) => {
    if (rate >= 85) return "Excellent";
    if (rate >= 70) return "Very Good";
    if (rate >= 60) return "Good";
    if (rate >= 45) return "Fair";
    return "Poor";
  };

  const getFulfillmentRateColor = (rate: number) => {
    if (rate >= 60) return "text-green-600"; // Good and above - green
    if (rate >= 45) return "text-yellow-600"; // Fair - yellow
    return "text-red-600"; // Poor - red
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background animate-fade-in pb-20">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold truncate capitalize max-w-[200px] md:max-w-md">
              {product?.name}
            </h1>
          </div>
          <div>
            {user?.userType === "PLUG" && (
              <Button
                className={`${
                  isInCart
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : product?.isPlugged
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : ""
                }`}
                onClick={handleAddToStore}
                disabled={isAdding || isInCart || product?.isPlugged}
                aria-live="polite"
              >
                {isAdding ? (
                  <span className="animate-pulse">Adding...</span>
                ) : isInCart ? (
                  <>
                    <Package className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">In Cart</span>
                  </>
                ) : product?.isPlugged ? (
                  <>
                    <Package className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Add to Store</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1">
          {/* Product Images */}
          <section className="p-4">
            <ProductImageGallery images={product?.images} />

            {product?.trending && (
              <Badge
                className="mt-2 bg-primary text-primary-foreground"
                variant="secondary"
              >
                Trending
              </Badge>
            )}
          </section>

          {/* Product Info */}
          <section className="px-4 space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-base md:text-lg font-bold capitalize">
                  {truncateText(product?.name)}
                </h2>
                <div className="font-semibold">
                  {formatPrice(product?.price)}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                  {/* Fixed: Show "0 sold" when sales is 0 */}
                  {product?.sold >= 100 ? "99+" : `${product?.sold || 0}`} sold
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  <span className="text-muted-foreground">
                    {/* Fixed: Handle proper pluralization for plugs */}
                    {formatPlural(product?.plugsCount || 0, "plug", "plugs")}
                  </span>
                </div>
              </div>
            </div>

            {/* Supplier Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={product?.supplier?.image}
                        alt={product?.supplier?.businessName}
                      />
                      <AvatarFallback className="capitalize">
                        {getInitials(product?.supplier?.businessName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold capitalize">
                        {truncateText(product?.supplier?.businessName)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground capitalize">
                        {product?.supplier?.pickupLocation.lga},{" "}
                        {product?.supplier?.pickupLocation.state}
                      </div>

                      {/* Subscribe/Unsubscribe Button - Only for PLUG users */}
                      {user?.userType === "PLUG" && product?.supplierId && (
                        <div className="mt-2">
                          <Button
                            variant={
                              product?.isSubscribedToSupplier
                                ? "outline"
                                : "default"
                            }
                            size="sm"
                            className="h-8 px-3 text-xs"
                            onClick={handleSubscriptionToggle}
                            disabled={isSubscribing}
                          >
                            {isSubscribing ? (
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            ) : product?.isSubscribedToSupplier ? (
                              <>
                                <UserMinus className="h-3 w-3 mr-1" />
                                Unsubscribe
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-3 w-3 mr-1" />
                                Subscribe
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery & Stock Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs md:text-sm font-medium">
                      Delivery Time
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-sm">2 - 3 days</div>
              </div> */}

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs md:text-sm font-medium">Stock</div>
                    <div className="text-xs text-muted-foreground">
                      Available
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-sm">
                  {/* Fixed: Handle proper pluralization for stock units */}
                  {formatPlural(getTotalStock(product) || 0, "unit", "units")}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs md:text-sm font-medium">
                      Fulfillment Rate
                    </div>
                    <div
                      className={`text-xs font-medium ${getFulfillmentRateColor(
                        fulfillmentRate
                      )}`}
                    >
                      {getFulfillmentRateDescription(fulfillmentRate)}
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-sm">{fulfillmentRate}%</div>
              </div>
            </div>

            {/* Fulfillment Rate Description */}
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p>
                <span className="font-medium">Fulfillment Rate:</span> The
                percentage of orders successfully delivered without returns or
                issues.
              </p>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">About this product</h3>
                  <div className="text-sm prose prose-sm max-w-full">
                    <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere capitalize">
                      {formattedDescription || "No description available."}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-4">
                <ProductSpecifications product={product} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <PlugReviews reviews={product?.reviews || []} />
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}