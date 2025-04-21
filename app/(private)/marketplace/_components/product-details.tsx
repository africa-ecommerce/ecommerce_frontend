"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  ArrowLeft,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Heart,
  Info,
  Package,
  PackageCheck,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductImageGallery } from "./product-image-gallery";
import { ProductSpecifications } from "./product-specifications";
import { VideoPlayer } from "./video-player";
import { CustomerReviews } from "./customer-reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { useUser } from "@/app/_components/provider/UserContext";


// Define fetcher function for useSWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
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
        {/* Gallery Skeleton */}
        <section className="p-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </section>

        {/* Product Info Skeletons */}
        <section className="px-4 space-y-6">
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
          </div>

          {/* Tabs Skeleton */}
          <div className="mt-6">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </section>
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
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 600000, // 10 minutes
  });

  const [isAdding, setIsAdding] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const { items, addItem } = useShoppingCart()
     const { userData } = useUser();

      const isInCart = items.some(item => item.id === product?.id)


  const handleAddToStore = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent card click when clicking the button
    e.stopPropagation() // Stop event propagation
    
    if (isInCart) return // Don't add if already in cart
    
    setIsAdding(true)
    
    // Create cart item from product
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg",
     
    }
    
    // Add item to cart after a short delay to show loading state
     setTimeout(() => {
      addItem(cartItem, false) // Pass false to prevent opening the cart
      setIsAdding(false)
    }, 800)
  }

  const handleVideoPlayClick = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoPlayer(true);
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

            {userData.userType === "PLUG" && (
               <Button
              className={`${
                isInCart ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
              }`}
              onClick={handleAddToStore}
              disabled={isAdding || isInCart}
              aria-live="polite"
            >
              {isAdding ? (
                <span className="animate-pulse">Adding...</span>
              ) : isInCart ? (
                <>
                  <Package className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs sm:text-sm">Added</span>
                </>
              ) : (
                <>
                  <Plus className="mr-1 h-3 w-3 md:h-4 md:w-4" />
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
            <ProductImageGallery
              images={product?.images}
              videos={product?.videos}
              onVideoPlayClick={handleVideoPlayClick}
            />

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
              <div className="flex items-start">
                <h2 className="text-lg md:text-xl font-bold capitalize">
                  {product?.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                  {/* Fixed: Show "0 sold" when sales is 0 */}
                  {product?.sales >= 100
                    ? "99+"
                    : `${product?.sales || 0}`}{" "}
                  sold
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
                        src={product?.supplier?.image || "/placeholder.svg"}
                        alt={product?.supplier?.name}
                      />
                      <AvatarFallback>
                        {product?.supplier?.name?.charAt(0) || "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">
                        {product?.supplier?.name}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {product?.supplier?.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery & Stock Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs md:text-sm font-medium">
                      Delivery Time
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-sm">2 - 3 days</div>
              </div>

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
                  {formatPlural(product?.stock || 0, "unit", "units")}
                </div>
              </div>
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
                    <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere">
                      {formattedDescription || "No description available."}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-4">
                <ProductSpecifications
                  specifications={product?.specifications}
                />
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <CustomerReviews
                  overallRating={product?.rating}
                  totalReviews={product?.totalReviews}
                  ratingDistribution={product?.ratingDistribution}
                  reviews={product?.reviews}
                />
              </TabsContent>
            </Tabs>
          </section>
        </main>

        {/* Modal components */}
        {showVideoPlayer && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <VideoPlayer
              videoUrl={currentVideoUrl}
              onClose={() => setShowVideoPlayer(false)}
              className="max-w-3xl w-full"
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}