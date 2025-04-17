// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import {
//   ArrowRight,
//   BadgePercent,
//   Bookmark,
//   ChevronRight,
//   Filter,
//   FlameIcon,
//   Heart,
//   Info,
//   Layers,
//   Lightbulb,
//   Mic,
//   Plus,
//   Search,
//   Sparkles,
//   Star,
//   TrendingUp,
//   Zap,
//   X,
// } from "lucide-react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Slider } from "@/components/ui/slider";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

// import { ProductCard } from "./_components/product-card";
// import { MarketInsightsCard } from "./_components/market-insights-card";
// import { DiscoveryModeDialog } from "./_components/discovery-mode-dialog";
// import { QuickCollectionsDrawer } from "./_components/quick-collections-drawer";
// import { PRODUCT_CATEGORIES } from "@/app/constant";

// export default function MarketplacePage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [showDiscoveryMode, setShowDiscoveryMode] = useState(false);
//   const [showCollections, setShowCollections] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const { ref: loadingRef, inView } = useInView();

//   // Simulate loading state
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Sample products array remains the same...

//   // Filter functions
//   const toggleCategory = (category: string) => {
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const toggleRating = (rating: number) => {
//     setSelectedRatings(prev =>
//       prev.includes(rating)
//         ? prev.filter(r => r !== rating)
//         : [...prev, rating]
//     );
//   };

//   const resetFilters = () => {
//     setPriceRange([0, 10000]);
//     setSelectedCategories([]);
//     setSelectedRatings([]);
//   };

//   const products = [
//     {
//       id: "prod-001",
//       name: "Shea Butter Moisturizer",
//       category: "Skincare",
//       supplierPrice: 1200,
//       recommendedPrice: 2500,
//       profit: 1300,
//       profitMargin: 52,
//       rating: 4.8,
//       reviews: 124,
//       sales: 1240,
//       marketFitScore: 92,
//       trending: true,
//       stock: 85,
//       image: "/placeholder.svg?height=300&width=300",
//       supplier: {
//         id: "sup-001",
//         name: "NaturalGlow",
//         rating: 4.9,
//         fulfillmentRate: 98,
//         responseTime: "2h",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       plugsCount: 24,
//     },
//     {
//       id: "prod-002",
//       name: "African Black Soap",
//       category: "Skincare",
//       supplierPrice: 800,
//       recommendedPrice: 1500,
//       profit: 700,
//       profitMargin: 47,
//       rating: 4.7,
//       reviews: 98,
//       sales: 980,
//       marketFitScore: 88,
//       trending: true,
//       stock: 120,
//       image: "/placeholder.svg?height=300&width=300",
//       supplier: {
//         id: "sup-001",
//         name: "NaturalGlow",
//         rating: 4.9,
//         fulfillmentRate: 98,
//         responseTime: "2h",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       plugsCount: 18,
//     },
//     {
//       id: "prod-003",
//       name: "Hair Growth Oil",
//       category: "Hair Care",
//       supplierPrice: 1500,
//       recommendedPrice: 3000,
//       profit: 1500,
//       profitMargin: 50,
//       rating: 4.6,
//       reviews: 76,
//       sales: 650,
//       marketFitScore: 85,
//       trending: false,
//       stock: 45,
//       image: "/placeholder.svg?height=300&width=300",
//       supplier: {
//         id: "sup-002",
//         name: "HerbalEssence",
//         rating: 4.7,
//         fulfillmentRate: 95,
//         responseTime: "4h",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       plugsCount: 15,
//     },
//     {
//       id: "prod-004",
//       name: "Ankara Print Headwrap",
//       category: "Accessories",
//       supplierPrice: 1000,
//       recommendedPrice: 2200,
//       profit: 1200,
//       profitMargin: 55,
//       rating: 4.9,
//       reviews: 112,
//       sales: 890,
//       marketFitScore: 94,
//       trending: true,
//       stock: 60,
//       image: "/placeholder.svg?height=300&width=300",
//       supplier: {
//         id: "sup-003",
//         name: "AfriThreads",
//         rating: 4.8,
//         fulfillmentRate: 97,
//         responseTime: "3h",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       plugsCount: 22,
//     },
//     {
//       id: "prod-005",
//       name: "Handcrafted Beaded Necklace",
//       category: "Accessories",
//       supplierPrice: 1800,
//       recommendedPrice: 4000,
//       profit: 2200,
//       profitMargin: 55,
//       rating: 4.7,
//       reviews: 64,
//       sales: 320,
//       marketFitScore: 82,
//       trending: false,
//       stock: 25,
//       image: "/placeholder.svg?height=300&width=300",
//       supplier: {
//         id: "sup-003",
//         name: "AfriThreads",
//         rating: 4.8,
//         fulfillmentRate: 97,
//         responseTime: "3h",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       plugsCount: 12,
//     },
//     {
//       id: "prod-006",
//       name: "Natural Deodorant",
//       category: "Personal Care",
//       supplierPrice: 900,
//       recommendedPrice: 1800,
//       profit: 900,
//       profitMargin: 50,
//       rating: 4.5,
//       reviews: 48,
//       sales: 240,
//       marketFitScore: 78,
//       trending: false,
//       stock: 40,
//       image: "/placeholder.svg?height=300&width=300",
//       supplier: {
//         id: "sup-001",
//         name: "NaturalGlow",
//         rating: 4.9,
//         fulfillmentRate: 98,
//         responseTime: "2h",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       plugsCount: 8,
//     },
//   ];

//   return (
//     <TooltipProvider>
//       <div className="flex flex-col min-h-screen bg-background animate-fade-in">
//         {/* Header - optimized for mobile */}
//         <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3 sm:px-6">
//           <div className="flex-1">
//             <h1 className="text-xl font-bold sm:text-2xl">Marketplace</h1>
//           </div>
//         </header>

//         {/* Search Bar - optimized for mobile */}
//         <div
//           className={cn(
//             "sticky top-[57px] flex z-20 bg-background/95 backdrop-blur-sm px-4 py-3 transition-all duration-200 sm:top-[65px] sm:px-6",
//             isSearchFocused ? "shadow-md" : ""
//           )}
//         >
//           <div className="relative max-w-2xl flex-1 mx-auto">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               ref={searchInputRef}
//               placeholder="Search products, suppliers, categories..."
//               className="pl-9 pr-12 text-sm sm:text-base sm:pl-10 sm:pr-14"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
//               onClick={() => {}}
//             >
//               <ArrowRight className="h-4 w-4 text-muted-foreground" />
//             </Button>
//           </div>

//           <div className="ml-2">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Filter className="h-[1.2rem] w-[1.2rem]" />
//                   <span className="sr-only">Filter</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-full sm:w-[400px] z-[200]">
//                 <SheetHeader className="mb-6">
//                   <SheetTitle className="flex items-center justify-between">
//                     <span>Filters</span>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={resetFilters}
//                       className="text-sm"
//                     >
//                       Reset
//                     </Button>
//                   </SheetTitle>
//                 </SheetHeader>

//                 <div className="space-y-6">
//                   {/* Price Range Filter */}
//                   <div>
//                     <h3 className="text-sm font-medium mb-4">Price Range</h3>
//                     <div className="px-2">
//                       <Slider
//                         value={priceRange}
//                         onValueChange={setPriceRange}
//                         max={10000}
//                         step={100}
//                         minStepsBetweenThumbs={1}
//                         className="mb-4"
//                       />
//                       <div className="flex justify-between text-sm text-muted-foreground">
//                         <span>₦{priceRange[0].toLocaleString()}</span>
//                         <span>₦{priceRange[1].toLocaleString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <Separator />

//                   {/* Categories Filter */}
//                   <div>
//                     <h3 className="text-sm font-medium mb-3">Categories</h3>
//                     <div className="space-y-2">
//                       {PRODUCT_CATEGORIES.map((category) => (
//                         <div key={category.value} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={`cat-${category.value}`}
//                             checked={selectedCategories.includes(category.value)}
//                             onCheckedChange={() => toggleCategory(category.value)}
//                           />
//                           <Label htmlFor={`cat-${category.value}`} className="text-sm">
//                             {category.label}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <Separator />

//                   {/* Ratings Filter */}
//                   <div>
//                     <h3 className="text-sm font-medium mb-3">Minimum Rating</h3>
//                     <div className="space-y-2">
//                       {[5, 4, 3].map((rating) => (
//                         <div key={rating} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={`rating-${rating}`}
//                             checked={selectedRatings.includes(rating)}
//                             onCheckedChange={() => toggleRating(rating)}
//                           />
//                           <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`h-4 w-4 ${
//                                   i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
//                                 }`}
//                               />
//                             ))}
//                             {rating === 5 ? "" : " & up"}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <Separator />

//                   {/* Apply Button */}
//                   <Button className="w-full">
//                     Apply Filters
//                   </Button>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>

//         {/* Rest of your component remains the same... */}
//         <main className="flex-1 pb-16 sm:pb-4">
//           {/* Discovery Mode Button */}
//           <div className="px-4 py-3 sm:px-6">
//             <Button
//               variant="default"
//               className="w-full bg-gradient-to-r from-primary to-primary/80 text-sm sm:text-base"
//               onClick={() => setShowDiscoveryMode(true)}
//             >
//               <Zap className="mr-2 h-4 w-4" />
//               Discovery Mode
//               <span className="ml-1 text-xs opacity-80 hidden sm:inline">
//                 (TikTok-style browsing)
//               </span>
//             </Button>
//           </div>

//           {/* Categories - horizontal scroll optimized for mobile */}
//           <section className="px-4 py-2 sm:px-6">
//             <ScrollArea className="w-full whitespace-nowrap pb-2">
//               <div className="flex gap-2">
//                 {PRODUCT_CATEGORIES.map((category) => (
//                   <Button
//                     key={category.value}
//                     variant="outline"
//                     className={cn(
//                       "flex items-center gap-1.5 rounded-full border px-3 py-1.5 h-auto text-xs sm:text-sm"
//                     )}
//                   >
//                     <span>{category.label}</span>
//                   </Button>
//                 ))}
//               </div>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </section>

//           {/* Product Tabs - responsive grid */}
//           <section className="px-4 py-2 sm:px-6">
//             <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>

//           {/* Infinite scroll trigger */}
//           <div ref={loadingRef} className="h-4" />
//         </main>

//         {/* Discovery Mode Dialog */}
//         <DiscoveryModeDialog
//           open={showDiscoveryMode}
//           onOpenChange={setShowDiscoveryMode}
//           products={products}
//         />
//       </div>
//     </TooltipProvider>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Search,
  X,
  Zap,
  AlertCircle
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

import { ProductCard } from "./_components/product-card";
import { DiscoveryModeDialog } from "./_components/discovery-mode-dialog";
import { PRODUCT_CATEGORIES } from "@/app/constant";
import { useProducts, ProductsFilter } from "@/hooks/use-products";
import { ProductCardSkeleton } from "./_components/product-card-skeleton";
import { NoResults } from "./_components/no-results";
import { ActiveFilters } from "./_components/active-filters";
import { FilterSheet } from "./_components/filter-sheet";

export default function MarketplacePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDiscoveryMode, setShowDiscoveryMode] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // IntersectionObserver for infinite scroll
  const { ref: loadingRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Combine filters for products hook
  const filters: ProductsFilter = {
    search: searchQuery,
    priceRange,
    selectedCategories,
    selectedRatings,
    sortBy: "createdAt",
    order: "desc",
  };

  // Use the products hook for data fetching
  const {
    products,
    error,
    isLoading,
    isLoadingMore,
    hasNextPage,
    size,
    setSize,
  } = useProducts(filters);

  // Load more products when scrolling to the bottom
  useEffect(() => {
    if (inView && hasNextPage && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [inView, hasNextPage, isLoadingMore, setSize, size]);

  // Sync URL query params with filter state (for bookmarking/sharing)
  useEffect(() => {
    const isFiltered = 
      searchQuery || 
      priceRange[0] > 0 || 
      priceRange[1] < 10000 || 
      selectedCategories.length > 0 || 
      selectedRatings.length > 0;

    // Only update URL if we have active filters
    if (isFiltered) {
      const params = new URLSearchParams(searchParams);
      
      if (searchQuery) params.set("search", searchQuery);
      else params.delete("search");
      
      if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
      else params.delete("minPrice");
      
      if (priceRange[1] < 10000) params.set("maxPrice", priceRange[1].toString());
      else params.delete("maxPrice");
      
      if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
      else params.delete("categories");
      
      if (selectedRatings.length > 0) params.set("ratings", selectedRatings.join(","));
      else params.delete("ratings");
      
      // Update URL without triggering navigation
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      // If no filters are active, clean up the URL
      if (searchParams.toString()) {
        router.replace(pathname, { scroll: false });
      }
    }
  }, [searchQuery, priceRange, selectedCategories, selectedRatings, router, pathname, searchParams]);
  
  // Initialize filters from URL on first load
  useEffect(() => {
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const categories = searchParams.get("categories");
    const ratings = searchParams.get("ratings");
    
    if (search) setSearchQuery(search);
    if (minPrice || maxPrice) {
      setPriceRange([
        minPrice ? parseInt(minPrice) : 0,
        maxPrice ? parseInt(maxPrice) : 10000
      ]);
    }
    if (categories) setSelectedCategories(categories.split(","));
    if (ratings) setSelectedRatings(ratings.split(",").map(Number));
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const removeRating = (rating: number) => {
    setSelectedRatings(prev => prev.filter(r => r !== rating));
  };

  const clearPriceRange = () => {
    setPriceRange([0, 10000]);
  };

  const applyFilters = () => {
    setIsFilterSheetOpen(false);
    // Reset pagination to load first page with new filters
    setSize(1);
  };

  // Determine if we're showing initial products or if they've been filtered
  const isFiltered = 
    searchQuery !== "" || 
    priceRange[0] > 0 || 
    priceRange[1] < 10000 || 
    selectedCategories.length > 0 || 
    selectedRatings.length > 0;

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
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-9 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => setSize(1)} // Refresh search results
              aria-label="Search"
            >
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="ml-2">
            <FilterSheet
              isOpen={isFilterSheetOpen}
              onOpenChange={setIsFilterSheetOpen}
              filters={filters}
              onPriceChange={setPriceRange}
              onToggleCategory={toggleCategory}
              onToggleRating={toggleRating}
              onResetFilters={resetFilters}
              onApplyFilters={applyFilters}
            />
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
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex gap-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategories.includes(category.value) ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1.5 h-auto text-xs sm:text-sm"
                    )}
                    onClick={() => toggleCategory(category.value)}
                  >
                    <span>{category.label}</span>
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Active filters display */}
          <ActiveFilters 
            filters={filters}
            onClearSearch={clearSearch}
            onClearPriceRange={clearPriceRange}
            onRemoveCategory={removeCategory}
            onRemoveRating={removeRating}
            onResetAll={resetFilters}
          />

          {/* Error state */}
          {error && (
            <div className="px-4 py-6 sm:px-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load products. Please try again.
                </AlertDescription>
              </Alert>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && products.length === 0 && !error && (
            <NoResults onReset={resetFilters} />
          )}

          {/* Product Grid */}
          <section className="px-4 py-2 sm:px-6">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
              {/* Render products */}
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

              {/* Loading skeletons for initial load */}
              {isLoading && Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={`initial-skeleton-${i}`} />
              ))}
              
              {/* Loading skeletons when loading more */}
              {isLoadingMore && Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={`more-skeleton-${i}`} />
              ))}
            </div>
          </section>

          {/* Infinite scroll trigger */}
          {hasNextPage && !isLoading && (
            <div ref={loadingRef} className="h-24 flex items-center justify-center">
              {isLoadingMore ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-sm text-muted-foreground">Loading more...</span>
                </div>
              ) : (
                <div className="h-4" />
              )}
            </div>
          )}
        </main>

        {/* Discovery Mode Dialog */}
        <DiscoveryModeDialog
          open={showDiscoveryMode}
          onOpenChange={setShowDiscoveryMode}
          products={products}
        />
      </div>
    </TooltipProvider>
  );
}