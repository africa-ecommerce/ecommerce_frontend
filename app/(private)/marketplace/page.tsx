"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  BadgePercent,
  Bookmark,
  ChevronRight,
  Filter,
  FlameIcon,
  Heart,
  Info,
  Layers,
  Lightbulb,
  Mic,
  Plus,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { ProductCard } from "./_components/product-card";
import { MarketInsightsCard } from "./_components/market-insights-card";
import { DiscoveryModeDialog } from "./_components/discovery-mode-dialog";
import { QuickCollectionsDrawer } from "./_components/quick-collections-drawer";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDiscoveryMode, setShowDiscoveryMode] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { ref: loadingRef, inView } = useInView();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate infinite loading when scrolling to the bottom
  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [inView, isLoading]);

  // Sample categories
  const categories = [
    {
      id: "trending",
      name: "Trending",
      icon: <TrendingUp className="h-4 w-4" />,
      count: 120,
    },
    {
      id: "skincare",
      name: "Skincare",
      icon: <Sparkles className="h-4 w-4" />,
      count: 85,
    },
    {
      id: "haircare",
      name: "Hair Care",
      icon: <Sparkles className="h-4 w-4" />,
      count: 64,
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: <Layers className="h-4 w-4" />,
      count: 42,
    },
    {
      id: "clothing",
      name: "Clothing",
      icon: <Layers className="h-4 w-4" />,
      count: 38,
    },
    {
      id: "wellness",
      name: "Wellness",
      icon: <Sparkles className="h-4 w-4" />,
      count: 29,
    },
  ];

  // Sample collections
  const collections = [
    {
      id: "summer",
      name: "Summer Essentials",
      image: "/placeholder.svg?height=100&width=100",
      count: 18,
    },
    {
      id: "bestsellers",
      name: "Bestsellers",
      image: "/placeholder.svg?height=100&width=100",
      count: 24,
    },
    {
      id: "new",
      name: "New Arrivals",
      image: "/placeholder.svg?height=100&width=100",
      count: 12,
    },
    {
      id: "eco",
      name: "Eco-Friendly",
      image: "/placeholder.svg?height=100&width=100",
      count: 9,
    },
  ];

  // Sample products
  const products = [
    {
      id: "prod-001",
      name: "Shea Butter Moisturizer",
      category: "Skincare",
      supplierPrice: 1200,
      recommendedPrice: 2500,
      profit: 1300,
      profitMargin: 52,
      rating: 4.8,
      reviews: 124,
      sales: 1240,
      marketFitScore: 92,
      trending: true,
      stock: 85,
      image: "/placeholder.svg?height=300&width=300",
      supplier: {
        id: "sup-001",
        name: "NaturalGlow",
        rating: 4.9,
        fulfillmentRate: 98,
        responseTime: "2h",
        image: "/placeholder.svg?height=40&width=40",
      },
      plugsCount: 24,
    },
    {
      id: "prod-002",
      name: "African Black Soap",
      category: "Skincare",
      supplierPrice: 800,
      recommendedPrice: 1500,
      profit: 700,
      profitMargin: 47,
      rating: 4.7,
      reviews: 98,
      sales: 980,
      marketFitScore: 88,
      trending: true,
      stock: 120,
      image: "/placeholder.svg?height=300&width=300",
      supplier: {
        id: "sup-001",
        name: "NaturalGlow",
        rating: 4.9,
        fulfillmentRate: 98,
        responseTime: "2h",
        image: "/placeholder.svg?height=40&width=40",
      },
      plugsCount: 18,
    },
    {
      id: "prod-003",
      name: "Hair Growth Oil",
      category: "Hair Care",
      supplierPrice: 1500,
      recommendedPrice: 3000,
      profit: 1500,
      profitMargin: 50,
      rating: 4.6,
      reviews: 76,
      sales: 650,
      marketFitScore: 85,
      trending: false,
      stock: 45,
      image: "/placeholder.svg?height=300&width=300",
      supplier: {
        id: "sup-002",
        name: "HerbalEssence",
        rating: 4.7,
        fulfillmentRate: 95,
        responseTime: "4h",
        image: "/placeholder.svg?height=40&width=40",
      },
      plugsCount: 15,
    },
    {
      id: "prod-004",
      name: "Ankara Print Headwrap",
      category: "Accessories",
      supplierPrice: 1000,
      recommendedPrice: 2200,
      profit: 1200,
      profitMargin: 55,
      rating: 4.9,
      reviews: 112,
      sales: 890,
      marketFitScore: 94,
      trending: true,
      stock: 60,
      image: "/placeholder.svg?height=300&width=300",
      supplier: {
        id: "sup-003",
        name: "AfriThreads",
        rating: 4.8,
        fulfillmentRate: 97,
        responseTime: "3h",
        image: "/placeholder.svg?height=40&width=40",
      },
      plugsCount: 22,
    },
    {
      id: "prod-005",
      name: "Handcrafted Beaded Necklace",
      category: "Accessories",
      supplierPrice: 1800,
      recommendedPrice: 4000,
      profit: 2200,
      profitMargin: 55,
      rating: 4.7,
      reviews: 64,
      sales: 320,
      marketFitScore: 82,
      trending: false,
      stock: 25,
      image: "/placeholder.svg?height=300&width=300",
      supplier: {
        id: "sup-003",
        name: "AfriThreads",
        rating: 4.8,
        fulfillmentRate: 97,
        responseTime: "3h",
        image: "/placeholder.svg?height=40&width=40",
      },
      plugsCount: 12,
    },
    {
      id: "prod-006",
      name: "Natural Deodorant",
      category: "Personal Care",
      supplierPrice: 900,
      recommendedPrice: 1800,
      profit: 900,
      profitMargin: 50,
      rating: 4.5,
      reviews: 48,
      sales: 240,
      marketFitScore: 78,
      trending: false,
      stock: 40,
      image: "/placeholder.svg?height=300&width=300",
      supplier: {
        id: "sup-001",
        name: "NaturalGlow",
        rating: 4.9,
        fulfillmentRate: 98,
        responseTime: "2h",
        image: "/placeholder.svg?height=40&width=40",
      },
      plugsCount: 8,
    },
  ];

  // Handle voice search
  const handleVoiceSearch = () => {
    // In a real implementation, this would activate the device's speech recognition
    alert("Voice search activated");
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background animate-fade-in">
        {/* Header - optimized for mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3 sm:px-6">
          <div className="flex-1">
            <h1 className="text-xl font-bold sm:text-2xl">Marketplace</h1>
          </div>
        </header>

        {/* Search Bar - optimized for mobile */}
        <div
          className={cn(
            "sticky top-[57px] flex z-20 bg-background/95 backdrop-blur-sm px-4 py-3 transition-all duration-200 sm:top-[65px] sm:px-6",
            isSearchFocused ? "shadow-md" : ""
          )}
        >
          <div className="relative max-w-2xl flex-1 mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search products, suppliers, categories..."
              className="pl-9 pr-12 text-sm sm:text-base sm:pl-10 sm:pr-14"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={handleVoiceSearch}
            >
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              {/* <span className="sr-only">Voice search</span> */}
            </Button>
          </div>

          <div className="ml-2">
           
            <Button variant="outline" size="icon">
              <Filter className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <main className="flex-1 pb-16 sm:pb-4">
          {/* Discovery Mode Button */}
          <div className="px-4 py-3 sm:px-6">
            <Button
              variant="default"
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-sm sm:text-base"
              onClick={() => setShowDiscoveryMode(true)}
            >
              <Zap className="mr-2 h-4 w-4" />
              Discovery Mode
              <span className="ml-1 text-xs opacity-80 hidden sm:inline">
                (TikTok-style browsing)
              </span>
            </Button>
          </div>

          {/* Categories - horizontal scroll optimized for mobile */}
          <section className="px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold sm:text-xl">Categories</h2>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex"
              >
                <Link href="#" className="text-sm text-muted-foreground">
                  See All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1.5 h-auto text-xs sm:text-sm",
                      category.id === "trending" &&
                        "border-primary/50 bg-primary/5 text-primary"
                    )}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 rounded-full px-1.5 text-[10px]"
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Collections - horizontal scroll optimized for mobile */}
          {/* <section className="px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold sm:text-xl">Collections</h2>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex"
              >
                <Link href="#" className="text-sm text-muted-foreground">
                  See All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex gap-3">
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`#collection-${collection.id}`}
                    className="flex flex-col items-center w-24 sm:w-28 group"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden mb-1 group-hover:ring-2 ring-primary transition-all">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-center line-clamp-1 sm:text-sm">
                      {collection.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
                      {collection.count} products
                    </span>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section> */}

          {/* Market Insights - responsive layout */}
          <section className="px-4 py-2 sm:px-6">
            <MarketInsightsCard />
          </section>

          {/* Product Tabs - responsive grid */}
          <section className="px-4 py-2 sm:px-6">
            <Tabs defaultValue="recommended">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recommended" className="text-xs sm:text-sm">
                  For You
                </TabsTrigger>
                <TabsTrigger value="trending" className="text-xs sm:text-sm">
                  Trending
                </TabsTrigger>
                <TabsTrigger value="new" className="text-xs sm:text-sm">
                  New
                </TabsTrigger>
              </TabsList>
              <TabsContent value="recommended" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
                  {products
                    .filter((product) => product.trending)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="new" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
                  {products.slice(0, 2).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Opportunity Spotlight - responsive card */}
          <section className="px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-semibold sm:text-xl">
                  Opportunity Spotlight
                </h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs sm:max-w-sm">
                    <p>
                      Products with high demand but low competition among Plugs
                      in your area
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/20 p-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Underserved Categories</h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      These categories have high demand but few Plugs in your
                      area
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium sm:text-base">
                        Natural Hair Products
                      </span>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/30 bg-primary/5"
                      >
                        <FlameIcon className="mr-1 h-3 w-3" /> Hot
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="h-7">
                      <Plus className="mr-1 h-3 w-3" /> Explore
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium sm:text-base">
                        Eco-Friendly Packaging
                      </span>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/30 bg-primary/5"
                      >
                        <TrendingUp className="mr-1 h-3 w-3" /> Growing
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="h-7">
                      <Plus className="mr-1 h-3 w-3" /> Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recommended for Your Audience - responsive grid */}
          <section className="px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold sm:text-xl">
                Recommended for Your Audience
              </h2>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex"
              >
                <Link href="#" className="text-sm text-muted-foreground">
                  See All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((product) => product.marketFitScore > 85)
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </section>

          {/* Seasonal Opportunities - responsive banner */}
          <section className="px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold sm:text-xl">
                Seasonal Opportunities
              </h2>
            </div>
            <Card className="overflow-hidden">
              <div className="relative h-32 sm:h-40">
                <img
                  src="/placeholder.svg?height=128&width=400"
                  alt="Seasonal banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg sm:text-xl">
                      Eid Collection
                    </h3>
                    <p className="text-sm opacity-90 sm:text-base">
                      Starts in 2 weeks
                    </p>
                    <Button size="sm" className="mt-2" variant="secondary">
                      Prepare Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Loading indicator */}
          {isLoading && (
            <div className="px-4 py-6 space-y-4 sm:px-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-32 w-full rounded-lg sm:h-40" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loadingRef} className="h-4" />
        </main>

        

        {/* Discovery Mode Dialog */}
        <DiscoveryModeDialog
          open={showDiscoveryMode}
          onOpenChange={setShowDiscoveryMode}
          products={products}
        />

        {/* Quick Collections Drawer */}
        <QuickCollectionsDrawer
          open={showCollections}
          onOpenChange={setShowCollections}
        />
      </div>
    </TooltipProvider>
  );
}
