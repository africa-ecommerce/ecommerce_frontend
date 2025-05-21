// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import { ArrowRight, Search, X, Zap, AlertCircle } from "lucide-react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { cn } from "@/lib/utils";

// import { ProductCard } from "./_components/product-card";
// import { DiscoveryModeDialog } from "./_components/discovery-mode-dialog";
// import { PRODUCT_CATEGORIES } from "@/app/constant";
// import { useProducts, ProductsFilter } from "@/hooks/use-products";
// import { ProductCardSkeleton } from "./_components/product-card-skeleton";
// import { NoResults } from "./_components/no-results";
// import { ActiveFilters } from "./_components/active-filters";
// import { FilterSheet } from "./_components/filter-sheet";

// export default function MarketplacePage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Search and filter states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [showDiscoveryMode, setShowDiscoveryMode] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
//   const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   // IntersectionObserver for infinite scroll
//   const { ref: loadingRef, inView } = useInView({
//     threshold: 0.5,
//     triggerOnce: false,
//   });

//   // Combine filters for products hook
//   const filters: ProductsFilter = {
//     search: searchQuery,
//     priceRange,
//     selectedCategories,
//     selectedRatings,
//     sortBy: "createdAt",
//     order: "desc",
//   };

//   // Use the products hook for data fetching
//   const {
//     products,
//     error,
//     isLoading,
//     isLoadingMore,
//     hasNextPage,
//     size,
//     setSize,
//   } = useProducts(filters);

//   // Define explicit loading states for better control
//   const isInitialLoading = isLoading && products.length === 0;
//   const hasProducts = products.length > 0;

//   // Load more products when scrolling to the bottom
//   useEffect(() => {
//     if (inView && hasNextPage && !isLoadingMore) {
//       setSize(size + 1);
//     }
//   }, [inView, hasNextPage, isLoadingMore, setSize, size]);

//   // Sync URL query params with filter state (for bookmarking/sharing)
//   useEffect(() => {
//     const isFiltered =
//       searchQuery ||
//       priceRange[0] > 0 ||
//       priceRange[1] < 10000000 ||
//       selectedCategories.length > 0 ||
//       selectedRatings.length > 0;

//     // Only update URL if we have active filters
//     if (isFiltered) {
//       const params = new URLSearchParams(searchParams);

//       if (searchQuery) params.set("search", searchQuery);
//       else params.delete("search");

//       if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
//       else params.delete("minPrice");

//       if (priceRange[1] < 9999999)
//         params.set("maxPrice", priceRange[1].toString());
//       else params.delete("maxPrice");

//       if (selectedCategories.length > 0)
//         params.set("categories", selectedCategories.join(","));
//       else params.delete("categories");

//       if (selectedRatings.length > 0)
//         params.set("ratings", selectedRatings.join(","));
//       else params.delete("ratings");

//       // Update URL without triggering navigation
//       router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//     } else {
//       // If no filters are active, clean up the URL
//       if (searchParams.toString()) {
//         router.replace(pathname, { scroll: false });
//       }
//     }
//   }, [
//     searchQuery,
//     priceRange,
//     selectedCategories,
//     selectedRatings,
//     router,
//     pathname,
//     searchParams,
//   ]);

//   // Initialize filters from URL on first load
//   useEffect(() => {
//     const search = searchParams.get("search");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const categories = searchParams.get("categories");
//     const ratings = searchParams.get("ratings");

//     if (search) setSearchQuery(search);
//     if (minPrice || maxPrice) {
//       setPriceRange([
//         minPrice ? parseInt(minPrice) : 0,
//         maxPrice ? parseInt(maxPrice) : 9999999,
//       ]);
//     }
//     if (categories) setSelectedCategories(categories.split(","));
//     if (ratings) setSelectedRatings(ratings.split(",").map(Number));
//   }, [searchParams]);

//   const toggleCategory = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   };

//   const toggleRating = (rating: number) => {
//     setSelectedRatings((prev) =>
//       prev.includes(rating)
//         ? prev.filter((r) => r !== rating)
//         : [...prev, rating]
//     );
//   };

//   const resetFilters = () => {
//     setPriceRange([0, 9999999]);
//     setSelectedCategories([]);
//     setSelectedRatings([]);
//     setSearchQuery("");
//     if (searchInputRef.current) {
//       searchInputRef.current.value = "";
//     }
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     if (searchInputRef.current) {
//       searchInputRef.current.value = "";
//       searchInputRef.current.focus();
//     }
//   };

//   const removeCategory = (category: string) => {
//     setSelectedCategories((prev) => prev.filter((c) => c !== category));
//   };

//   const removeRating = (rating: number) => {
//     setSelectedRatings((prev) => prev.filter((r) => r !== rating));
//   };

//   const clearPriceRange = () => {
//     setPriceRange([0, 9999999]);
//   };

//   const applyFilters = () => {
//     setIsFilterSheetOpen(false);
//     // Reset pagination to load first page with new filters
//     setSize(1);
//   };

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
//               placeholder="Search products..."
//               className="pl-9 pr-12 text-sm sm:text-base sm:pl-10 sm:pr-14"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//             />
//             {searchQuery && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-9 top-1/2 h-8 w-8 -translate-y-1/2"
//                 onClick={clearSearch}
//                 aria-label="Clear search"
//               >
//                 <X className="h-4 w-4 text-muted-foreground" />
//               </Button>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
//               onClick={() => setSize(1)} // Refresh search results
//               aria-label="Search"
//             >
//               <ArrowRight className="h-4 w-4 text-muted-foreground" />
//             </Button>
//           </div>

//           <div className="ml-2">
//             <FilterSheet
//               isOpen={isFilterSheetOpen}
//               onOpenChange={setIsFilterSheetOpen}
//               filters={filters}
//               onPriceChange={setPriceRange}
//               onToggleCategory={toggleCategory}
//               onToggleRating={toggleRating}
//               onResetFilters={resetFilters}
//               onApplyFilters={applyFilters}
//             />
//           </div>
//         </div>

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
//                     variant={
//                       selectedCategories.includes(category.value)
//                         ? "default"
//                         : "outline"
//                     }
//                     className={cn(
//                       "flex items-center gap-1.5 rounded-full border px-3 py-1.5 h-auto text-xs sm:text-sm"
//                     )}
//                     onClick={() => toggleCategory(category.value)}
//                   >
//                     <span>{category.label}</span>
//                   </Button>
//                 ))}
//               </div>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </section>

//           {/* Active filters display */}
//           <ActiveFilters
//             filters={filters}
//             onClearSearch={clearSearch}
//             onClearPriceRange={clearPriceRange}
//             onRemoveCategory={removeCategory}
//             onRemoveRating={removeRating}
//             onResetAll={resetFilters}
//           />

//           {/* Error state */}
//           {error && (
//             <div className="px-4 py-6 sm:px-6">
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>
//                   Failed to load products. Please try again.
//                 </AlertDescription>
//               </Alert>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="mt-4"
//                 onClick={() => window.location.reload()}
//               >
//                 Refresh Page
//               </Button>
//             </div>
//           )}

//           {/* Empty state - only show when explicitly not loading and no products */}
//           {!isInitialLoading &&
//             !isLoadingMore &&
//             products.length === 0 &&
//             !error && <NoResults onReset={resetFilters} />}

//           {/* Product Grid */}
//           <section className="px-4 py-2 sm:px-6">
//             <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
//               {/* Render products - Only if we have products */}
//               {hasProducts &&
//                 products.map((product, index) => (
//                   <ProductCard
//                     key={
//                       product.id
//                         ? `product-${product.id}`
//                         : `product-index-${index}`
//                     }
//                     product={product}
//                   />
//                 ))}

//               {/* Loading skeletons for initial load - Only show when in initial loading state */}
//               {isInitialLoading &&
//                 Array.from({ length: 8 }).map((_, i) => (
//                   <ProductCardSkeleton key={`initial-skeleton-${i}`} />
//                 ))}

//               {/* Loading skeletons when loading more - Only show at bottom when loading more */}
//               {isLoadingMore &&
//                 hasProducts &&
//                 Array.from({ length: 4 }).map((_, i) => (
//                   <ProductCardSkeleton key={`more-skeleton-${i}`} />
//                 ))}
//             </div>
//           </section>

//           {/* Infinite scroll trigger - Only show when we have more pages to load */}
//           {hasNextPage && !isInitialLoading && (
//             <div
//               ref={loadingRef}
//               className="h-24 flex items-center justify-center"
//             >
//               {isLoadingMore ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
//                   <span className="text-sm text-muted-foreground">
//                     Loading more...
//                   </span>
//                 </div>
//               ) : (
//                 <div className="h-4" />
//               )}
//             </div>
//           )}
//         </main>

//         {/* Discovery Mode Dialog */}
//         <DiscoveryModeDialog
//           open={showDiscoveryMode}
//           onOpenChange={setShowDiscoveryMode}
//           products={products}
//           isLoading={isInitialLoading} // Changed to use isInitialLoading
//           isLoadingMore={isLoadingMore}
//           hasNextPage={hasNextPage}
//           loadMore={() => setSize(size + 1)}
//         />
//       </div>
//     </TooltipProvider>
//   );
// }




"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Search, X, Zap, AlertCircle } from "lucide-react";
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

// Constants for price range
const MIN_PRICE = 0;
const MAX_PRICE = 9999999;
const DEFAULT_PRICE_RANGE: [number, number] = [MIN_PRICE, MAX_PRICE];

export default function MarketplacePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDiscoveryMode, setShowDiscoveryMode] = useState(false);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
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

  // Define explicit loading states for better control
  const isInitialLoading = isLoading && products.length === 0;
  const hasProducts = products.length > 0;

  // Load more products when scrolling to the bottom
  useEffect(() => {
    if (inView && hasNextPage && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [inView, hasNextPage, isLoadingMore, setSize, size]);

  // Initialize filters from URL on first load - This should run first
  useEffect(() => {
    if (!hasInitialized) {
      const search = searchParams.get("search");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const categories = searchParams.get("categories");
      const ratings = searchParams.get("ratings");

      if (search) setSearchQuery(search);

      // Only update price range if URL params exist, otherwise keep default
      if (minPrice || maxPrice) {
        setPriceRange([
          minPrice ? parseInt(minPrice) : MIN_PRICE,
          maxPrice ? parseInt(maxPrice) : MAX_PRICE,
        ]);
      }

      if (categories) setSelectedCategories(categories.split(","));
      if (ratings) setSelectedRatings(ratings.split(",").map(Number));

      setHasInitialized(true);
    }
  }, [searchParams, hasInitialized]);

  // Sync URL query params with filter state (for bookmarking/sharing)
  useEffect(() => {
    // Only sync to URL after initialization to avoid overwriting URL params
    if (!hasInitialized) return;

    const isFiltered =
      searchQuery ||
      priceRange[0] > MIN_PRICE ||
      priceRange[1] < MAX_PRICE ||
      selectedCategories.length > 0 ||
      selectedRatings.length > 0;

    // Only update URL if we have active filters
    if (isFiltered) {
      const params = new URLSearchParams(searchParams);

      if (searchQuery) params.set("search", searchQuery);
      else params.delete("search");

      if (priceRange[0] > MIN_PRICE)
        params.set("minPrice", priceRange[0].toString());
      else params.delete("minPrice");

      if (priceRange[1] < MAX_PRICE)
        params.set("maxPrice", priceRange[1].toString());
      else params.delete("maxPrice");

      if (selectedCategories.length > 0)
        params.set("categories", selectedCategories.join(","));
      else params.delete("categories");

      if (selectedRatings.length > 0)
        params.set("ratings", selectedRatings.join(","));
      else params.delete("ratings");

      // Update URL without triggering navigation
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      // If no filters are active, clean up the URL
      if (searchParams.toString()) {
        router.replace(pathname, { scroll: false });
      }
    }
  }, [
    searchQuery,
    priceRange,
    selectedCategories,
    selectedRatings,
    router,
    pathname,
    searchParams,
    hasInitialized,
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const resetFilters = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
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
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const removeRating = (rating: number) => {
    setSelectedRatings((prev) => prev.filter((r) => r !== rating));
  };

  const clearPriceRange = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
  };

  const applyFilters = () => {
    setIsFilterSheetOpen(false);
    // Reset pagination to load first page with new filters
    setSize(1);
  };

  // Handle price range changes
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
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
              placeholder="Search products..."
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
              onPriceChange={handlePriceChange}
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
                    variant={
                      selectedCategories.includes(category.value)
                        ? "default"
                        : "outline"
                    }
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

          {/* Empty state - only show when explicitly not loading and no products */}
          {!isInitialLoading &&
            !isLoadingMore &&
            products.length === 0 &&
            !error && <NoResults onReset={resetFilters} />}

          {/* Product Grid */}
          <section className="px-4 py-2 sm:px-6">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
              {/* Render products - Only if we have products */}
              {hasProducts &&
                products.map((product, index) => (
                  <ProductCard
                    key={
                      product.id
                        ? `product-${product.id}`
                        : `product-index-${index}`
                    }
                    product={product}
                  />
                ))}

              {/* Loading skeletons for initial load - Only show when in initial loading state */}
              {isInitialLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={`initial-skeleton-${i}`} />
                ))}

              {/* Loading skeletons when loading more - Only show at bottom when loading more */}
              {isLoadingMore &&
                hasProducts &&
                Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={`more-skeleton-${i}`} />
                ))}
            </div>
          </section>

          {/* Infinite scroll trigger - Only show when we have more pages to load */}
          {hasNextPage && !isInitialLoading && (
            <div
              ref={loadingRef}
              className="h-24 flex items-center justify-center"
            >
              {isLoadingMore ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-sm text-muted-foreground">
                    Loading more...
                  </span>
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
          isLoading={isInitialLoading} // Changed to use isInitialLoading
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          loadMore={() => setSize(size + 1)}
        />
      </div>
    </TooltipProvider>
  );

  
}