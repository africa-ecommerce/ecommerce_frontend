"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ProductImageGallery } from "./product-image-gallery";

// import { ProductImageGallery } from "@/components/marketplace/product-image-gallery";
import { ProductSpecifications } from "./product-specifications";
import { SizeSelector } from "./size-selector";
// import { ModelViewer } from "../model-viewer";
import { VideoPlayer } from "./video-player";
import { CustomerReviews } from "./customer-reviews";
import { FullscreenGallery } from "./fullscreen-gallery";
import { RelatedProducts } from "./related-products";


export default function ProductDetailPageRedesigned() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);
  const [fullscreenGalleryIndex, setFullscreenGalleryIndex] = useState(0);
  const [showModelViewer, setShowModelViewer] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Sample product data
  const product = {
    id: productId,
    name: "Shea Butter Moisturizer",
    description:
      "A rich, nourishing moisturizer made with 100% pure shea butter. Perfect for dry skin, this product absorbs quickly and provides long-lasting hydration. Ethically sourced from women's cooperatives in Ghana.",
    category: "Skincare",
    supplierPrice: 1200,
    recommendedPrice: 2500,
    profit: 1300,
    profitMargin: 52,
    rating: 4.8,
    totalReviews: 124,
    sales: 1240,
    marketFitScore: 92,
    trending: true,
    stock: 85,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500&text=Image+2",
      "/placeholder.svg?height=500&width=500&text=Image+3",
      "/placeholder.svg?height=500&width=500&text=Image+4",
    ],
    videos: ["/placeholder.mp4"],
    modelUrl: "/assets/3d/product.glb",
    supplier: {
      id: "sup-001",
      name: "NaturalGlow",
      rating: 4.9,
      fulfillmentRate: 98,
      responseTime: "2h",
      image: "/placeholder.svg?height=40&width=40",
      location: "Lagos, Nigeria",
      joinedDate: "2021",
      productsCount: 48,
    },
    plugsCount: 24,
    deliveryTime: "2-3 days",
    features: [
      "100% pure unrefined shea butter",
      "No additives or preservatives",
      "Ethically sourced",
      "Suitable for all skin types",
      "Helps with eczema and psoriasis",
    ],
    ingredients: [
      "Butyrospermum Parkii (Shea Butter)",
      "Vitamin E (Tocopherol)",
      "Essential Oils (for fragrance)",
    ],
    specifications: [
      { name: "Weight", value: "250g", tooltip: "Net weight of product" },
      { name: "Dimensions", value: "8 x 8 x 5 cm" },
      {
        name: "Shelf Life",
        value: "24 months",
        tooltip: "When stored properly",
      },
      { name: "Origin", value: "Ghana" },
      { name: "Packaging", value: "Recyclable jar" },
      { name: "Certification", value: "Organic certified" },
      { name: "Usage", value: "Face and body" },
    ],
    sizes: [
      { value: "50g", label: "50g", available: true, tooltip: "Travel size" },
      { value: "100g", label: "100g", available: true },
      { value: "250g", label: "250g", available: true },
      {
        value: "500g",
        label: "500g",
        available: false,
        tooltip: "Out of stock",
      },
    ],
    similarProducts: [
      {
        id: "prod-002",
        name: "African Black Soap",
        category: "Skincare",
        price: 1500,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 98,
      },
      {
        id: "prod-003",
        name: "Hair Growth Oil",
        category: "Hair Care",
        price: 2000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 76,
      },
      {
        id: "prod-004",
        name: "Ankara Print Headwrap",
        category: "Accessories",
        price: 2200,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 112,
      },
      {
        id: "prod-005",
        name: "Handcrafted Beaded Necklace",
        category: "Accessories",
        price: 4000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 64,
      },
      {
        id: "prod-006",
        name: "Natural Deodorant",
        category: "Personal Care",
        price: 1800,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 48,
      },
    ],
    frequentlyBoughtTogether: [
      {
        id: "prod-007",
        name: "African Black Soap Face Wash",
        category: "Skincare",
        price: 1800,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 87,
      },
      {
        id: "prod-008",
        name: "Shea Butter Lip Balm",
        category: "Skincare",
        price: 800,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 56,
      },
      {
        id: "prod-009",
        name: "Cocoa Butter Body Lotion",
        category: "Skincare",
        price: 2200,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 92,
      },
    ],
    reviews: [
      {
        id: "rev-001",
        author: {
          name: "Jane Doe",
          avatar: "/placeholder.svg?height=40&width=40",
          location: "Lagos, Nigeria",
        },
        rating: 5,
        date: "2 weeks ago",
        content:
          "This product is amazing! My customers love it and keep coming back for more. Fast shipping from the supplier too. The quality is consistent and packaging is beautiful. Will definitely order again.",
        helpful: 12,
        images: [
          "/placeholder.svg?height=100&width=100",
          "/placeholder.svg?height=100&width=100",
        ],
        verified: true,
      },
      {
        id: "rev-002",
        author: {
          name: "Michael Johnson",
          location: "Accra, Ghana",
        },
        rating: 4,
        date: "1 month ago",
        content:
          "Good quality product with consistent supply. My customers have given positive feedback. The only issue is sometimes the packaging varies slightly between orders.",
        helpful: 8,
        verified: true,
      },
      {
        id: "rev-003",
        author: {
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        rating: 5,
        date: "2 months ago",
        content:
          "Excellent product! My customers can't get enough of it. The supplier is also very responsive and helpful with any questions.",
        helpful: 15,
        verified: true,
      },
      {
        id: "rev-004",
        author: {
          name: "David Chen",
        },
        rating: 3,
        date: "3 months ago",
        content:
          "Product is good but shipping took longer than expected. Quality is consistent though.",
        helpful: 5,
        verified: false,
      },
    ],
    ratingDistribution: {
      5: 89,
      4: 24,
      3: 8,
      2: 2,
      1: 1,
    },
  };

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

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleExpandImage = (index?: number) => {
    if (index !== undefined) {
      setFullscreenGalleryIndex(index);
    }
    setShowFullscreenGallery(true);
  };

  const handleModelViewClick = () => {
    setShowModelViewer(true);
  };

  const handleVideoPlayClick = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoPlayer(true);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
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
            <h1 className="text-lg font-semibold line-clamp-1">
              {product.name}
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
              images={product.images}
              videos={product.videos}
              modelUrl={product.modelUrl}
              onExpandClick={() => handleExpandImage()}
              onModelViewClick={handleModelViewClick}
              onVideoPlayClick={handleVideoPlayClick}
            />

            {product.trending && (
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
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.totalReviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                
                <div className="flex items-center">
                  <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                  {product.sales} sold
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  {product.plugsCount} plugs
                </div>
              </div>
            </div>

            {/* Size Selector */}
            {/* <SizeSelector sizes={product.sizes} onChange={handleSizeChange} /> */}

            {/* Supplier Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={product.supplier.image || "/placeholder.svg"}
                        alt={product.supplier.name}
                      />
                      <AvatarFallback>
                        {product.supplier.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">
                        {product.supplier.name}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {product.supplier.rating} • {product.supplier.location}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/marketplace/supplier/${product.supplier.id}`}>
                      View <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">
                      Fulfillment
                    </div>
                    <div className="font-semibold">
                      {product.supplier.fulfillmentRate}%
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">
                      Response
                    </div>
                    <div className="font-semibold">
                      {product.supplier.responseTime}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">
                      Products
                    </div>
                    <div className="font-semibold">
                      {product.supplier.productsCount}
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
                <div className="font-semibold text-sm">{product.deliveryTime}</div>
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
                <div className="font-semibold text-sm">{product.stock} units</div>
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
                  <p className="text-sm">{product.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-medium">Key Features</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Ingredients</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-4">
                <ProductSpecifications
                  specifications={product.specifications}
                />
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <CustomerReviews
                  overallRating={product.rating}
                  totalReviews={product.totalReviews}
                  ratingDistribution={product.ratingDistribution}
                  reviews={product.reviews}
                />
              </TabsContent>
            </Tabs>

            {/* Frequently Bought Together */}
            <RelatedProducts
              title="Frequently Bought Together"
              products={product.frequentlyBoughtTogether}
              className="mt-8"
            />

            {/* Similar Products */}
            <RelatedProducts
              title="Similar Products"
              products={product.similarProducts}
              className="mt-8"
            />
          </section>
        </main>

        <FullscreenGallery
          images={product.images}
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
            {/* <div className="flex-1">
              <ModelViewer modelUrl={product.modelUrl} className="h-full" />
            </div> */}
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
