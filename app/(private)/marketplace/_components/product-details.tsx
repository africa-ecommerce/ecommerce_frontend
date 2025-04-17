


"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr"; // Import useSWR
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
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductImageGallery } from "./product-image-gallery";

import { ProductSpecifications } from "./product-specifications";

import { VideoPlayer } from "./video-player";
import { CustomerReviews } from "./customer-reviews";
import { FullscreenGallery } from "./fullscreen-gallery";

// Define fetcher function for useSWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  const { data } = await res.json();
  return data;
};

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  // Use SWR for data fetching with caching
  const { data: product, error, isLoading } = useSWR(
    `/api/products/${productId}`,
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch when window gets focus
      revalidateIfStale: false, // Don't revalidate if data is stale
      dedupingInterval: 600000, // Dedupe requests within 10 minutes
    }
  );

  console.log(product)

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);
  const [fullscreenGalleryIndex, setFullscreenGalleryIndex] = useState(0);
  const [showModelViewer, setShowModelViewer] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");


  const handleAddToStore = () => {
    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      // Reset after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  

  const handleExpandImage = (index?: number) => {
    if (index !== undefined) {
      setFullscreenGalleryIndex(index);
    }
    setShowFullscreenGallery(true);
  };

 

  const handleVideoPlayClick = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoPlayer(true);
  };

 

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error loading product</h2>
        <p className="text-muted-foreground mb-4">Unable to load product details. Please try again.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  // Handle case when product is not available yet
  if (!product) {
    return null;
  }

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
            <h1 className="text-lg font-semibold line-clamp-1">
              {product?.name}
            </h1>
          </div>
          <div className="">
            <Button
              className=""
              onClick={handleAddToStore}
              disabled={isAdding || isAdded}
            >
              {isAdding ? (
                <>
                  <span className="animate-pulse">Adding...</span>
                </>
              ) : isAdded ? (
                <>
                  <PackageCheck className="mr-2 h-4 w-4" /> Added to Store
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add to Store
                </>
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1">
          {/* Product Images */}
          <section className="p-4">
            <ProductImageGallery
              images={product?.images}
              videos={product?.videos}
              
              onExpandClick={() => handleExpandImage()}
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

          {/* Rest of your component remains the same */}
          {/* Product Info */}
          <section className="px-4 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{product?.name}</h2>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product?.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product?.totalReviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                
                <div className="flex items-center">
                  <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                  {product?.sales} sold
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  {product?.plugsCount} plugs
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
                        {product?.supplier?.name?.charAt(0)}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs md:text-md font-medium">Delivery Time</div>
                    
                  </div>
                </div>
                <div className="font-semibold text-sm">2 - 3 days</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs md:text-md font-medium">Stock</div>
                    <div className="text-xs text-muted-foreground">
                      Available
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-sm">{product?.stock} units</div>
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
                  <p className="text-sm">{product?.description}</p>

                  
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

        {/* Modal components remain the same */}
        <FullscreenGallery
          images={product?.images}
          initialIndex={fullscreenGalleryIndex}
          open={showFullscreenGallery}
          onClose={() => setShowFullscreenGallery(false)}
        />

        {showModelViewer && (
          <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
            <div className="flex items-center justify-between p-4 text-white">
              <h3 className="font-medium">3D Model View</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setShowModelViewer(false)}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
           
          </div>
        )}

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