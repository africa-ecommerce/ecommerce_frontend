



// "use client"

// import type React from "react"

// import { useState, useEffect, useRef, useCallback } from "react"
// import { useInView } from "react-intersection-observer"
// import { Search, X, Zap, AlertCircle, MessageCircle, Plus } from "lucide-react"
// import { useSearchParams, useRouter, usePathname } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import { TooltipProvider } from "@/components/ui/tooltip"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { cn } from "@/lib/utils"

// import { ProductCard } from "./_components/product-card"
// import { DiscoveryModeDialog } from "./_components/discovery-mode-dialog"
// import { PRODUCT_CATEGORIES } from "@/app/constant"
// import { useProducts, type ProductsFilter } from "@/hooks/use-products"
// import { ProductCardSkeleton } from "./_components/product-card-skeleton"
// import { NoResults } from "./_components/no-results"
// import { ActiveFilters } from "./_components/active-filters"
// import { FilterSheet } from "./_components/filter-sheet"
// import { useUser } from "@/app/_components/provider/UserContext"
// import { SubscribersPopover } from "./_components/subscribers-popover"

// // Seller CTA Component
// const SellerCTA = () => {
//   const handleWhatsAppClick = () => {
//     const phoneNumber = "2349151425001" // Nigeria country code + number
//     const message =
//       "Hello! I would love to sell this kind of products, or can I get this product in the marketplace? My audience needs it."
//     const encodedMessage = encodeURIComponent(message)
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

//     // Open WhatsApp in a new tab
//     window.open(whatsappUrl, "_blank")
//   }

//   return (
//     <div className="mx-3 my-3 sm:mx-4 sm:my-4 md:mx-6 md:my-6">
//       <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
//         <div className="space-y-3">
//           {/* Icon and Content Row */}
//           <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                 <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 min-w-0">
//               <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
//                 Want to sell or promote a product?
//               </h3>
//               <p className="text-xs sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                 Can't find the product you wish to sell or promote? Message us and let's see what we can do.
//               </p>
//             </div>

//             {/* Button on larger screens */}
//             <div className="hidden md:block flex-shrink-0">
//               <Button
//                 variant="default"
//                 size="sm"
//                 className="bg-green-600 hover:bg-green-700 text-white transition-colors text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-9"
//                 onClick={handleWhatsAppClick}
//               >
//                 <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 mr-1 sm:mr-2" />
//                 <span>WhatsApp Us</span>
//               </Button>
//             </div>
//           </div>

//           {/* Button on mobile - below text */}
//           <div className="md:hidden">
//             <Button
//               variant="default"
//               size="sm"
//               className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors text-xs px-3 py-2 h-8"
//               onClick={handleWhatsAppClick}
//             >
//               <MessageCircle className="w-3 h-3 mr-1" />
//               <span>WhatsApp Us</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function MarketplacePage() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   // Search and filter states
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isSearchFocused, setIsSearchFocused] = useState(false)
//   const [showDiscoveryMode, setShowDiscoveryMode] = useState(false)
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999])
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([])
//   const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
//   const searchInputRef = useRef<HTMLInputElement>(null)
//   const {
//     userData: { user },
//   } = useUser()

//   // Mock subscriber data - replace with real data from your API
//   const getSubscriberCount = () => {
//     if (user?.userType === "SUPPLIER") {
//       return 1247 // Number of people subscribed to this supplier
//     } else if (user?.userType === "PLUG") {
//       return 23 // Number of suppliers this plug is subscribed to
//     }
//     return 0
//   }

//   // Flag to prevent URL sync on initial load
//   const [isInitialized, setIsInitialized] = useState(false)

//   // IntersectionObserver for infinite scroll
//   const { ref: loadingRef, inView } = useInView({
//     threshold: 0.5,
//     triggerOnce: false,
//   })

//   // Combine filters for products hook
//   const filters: ProductsFilter = {
//     search: searchQuery,
//     priceRange,
//     selectedCategories,
//     selectedRatings,
//     sortBy: "createdAt",
//     order: "desc",
//   }

//   // Use the products hook for data fetching
//   const { products, error, isLoading, isLoadingMore, hasNextPage, isEmpty, size, setSize, clearCache, refreshData } =
//     useProducts(filters, 20)

//   // Define explicit loading states for better control
//   const isInitialLoading = isLoading && products.length === 0
//   const hasProducts = products.length > 0

//   // Initialize filters from URL on first load ONLY
//   useEffect(() => {
//     if (!isInitialized) {
//       const search = searchParams.get("search")
//       const minPrice = searchParams.get("minPrice")
//       const maxPrice = searchParams.get("maxPrice")
//       const categories = searchParams.get("categories")
//       const ratings = searchParams.get("ratings")

//       if (search) setSearchQuery(search)
//       if (minPrice || maxPrice) {
//         setPriceRange([minPrice ? Number.parseInt(minPrice) : 0, maxPrice ? Number.parseInt(maxPrice) : 9999999])
//       }
//       if (categories) setSelectedCategories(categories.split(","))
//       if (ratings) setSelectedRatings(ratings.split(",").map(Number))

//       setIsInitialized(true)
//     }
//   }, [searchParams, isInitialized])

//   // Debounced URL sync - only after initialization
//   useEffect(() => {
//     if (!isInitialized) return

//     const timeoutId = setTimeout(() => {
//       const isFiltered =
//         searchQuery ||
//         priceRange[0] > 0 ||
//         priceRange[1] < 9999999 ||
//         selectedCategories.length > 0 ||
//         selectedRatings.length > 0

//       if (isFiltered) {
//         const params = new URLSearchParams()

//         if (searchQuery) params.set("search", searchQuery)
//         if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
//         if (priceRange[1] < 9999999) params.set("maxPrice", priceRange[1].toString())
//         if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","))
//         if (selectedRatings.length > 0) params.set("ratings", selectedRatings.join(","))

//         router.replace(`${pathname}?${params.toString()}`, { scroll: false })
//       } else {
//         if (searchParams.toString()) {
//           router.replace(pathname, { scroll: false })
//         }
//       }
//     }, 300) // Debounce URL updates

//     return () => clearTimeout(timeoutId)
//   }, [searchQuery, priceRange, selectedCategories, selectedRatings, router, pathname, searchParams, isInitialized])

//   // Load more products when scrolling to the bottom
//   const handleInfiniteScroll = useCallback(() => {
//     if (inView && hasNextPage && !isLoadingMore && !isInitialLoading) {
//       setSize(size + 1)
//     }
//   }, [inView, hasNextPage, isLoadingMore, isInitialLoading, setSize, size])

//   useEffect(() => {
//     handleInfiniteScroll()
//   }, [handleInfiniteScroll])

//   const toggleCategory = useCallback((category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
//     )
//   }, [])

//   const toggleRating = useCallback((rating: number) => {
//     setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
//   }, [])

//   const resetFilters = useCallback(() => {
//     setPriceRange([0, 9999999])
//     setSelectedCategories([])
//     setSelectedRatings([])
//     setSearchQuery("")
//     if (searchInputRef.current) {
//       searchInputRef.current.value = ""
//     }
//     // Clear cache when resetting filters to ensure fresh data
//     clearCache()
//   }, [clearCache])

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value)
//   }, [])

//   const clearSearch = useCallback(() => {
//     setSearchQuery("")
//     if (searchInputRef.current) {
//       searchInputRef.current.value = ""
//       searchInputRef.current.focus()
//     }
//   }, [])

//   const removeCategory = useCallback((category: string) => {
//     setSelectedCategories((prev) => prev.filter((c) => c !== category))
//   }, [])

//   const removeRating = useCallback((rating: number) => {
//     setSelectedRatings((prev) => prev.filter((r) => r !== rating))
//   }, [])

//   const clearPriceRange = useCallback(() => {
//     setPriceRange([0, 9999999])
//   }, [])

//   const applyFilters = useCallback(() => {
//     setIsFilterSheetOpen(false)
//     // No need to manually reset size here - the hook handles it
//   }, [])

//   return (
//     <TooltipProvider>
//       <div className="flex flex-col min-h-screen bg-background animate-fade-in">
//         {/* Header - optimized for mobile with subscribers feature */}
//         <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3 sm:px-6">
//           <div className="flex-1">
//             <h1 className="text-lg font-bold sm:text-xl md:text-2xl">Marketplace</h1>
//           </div>

//           {/* Subscribers Icon - positioned on the right */}
//           <div className="flex items-center">
//             <SubscribersPopover
//               userType={user?.userType || "PLUG"}
             
//             />
//           </div>
//         </header>

//         {/* Search Bar - optimized for mobile */}
//         <div
//           className={cn(
//             "sticky top-[57px] flex z-20 bg-background/95 backdrop-blur-sm px-4 py-3 transition-all duration-200 sm:top-[65px] sm:px-6",
//             isSearchFocused ? "shadow-md" : "",
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
//           <div className="px-4 sm:px-6 mt-2">
//             <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 rounded-lg">
//               <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//               <AlertDescription className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
//                 What you see here is a <strong>personalized view</strong> based on your preferences, activity and
//                 others.
//               </AlertDescription>
//             </Alert>
//           </div>
//           {/* Discovery Mode Button */}
//           <div className="px-4 py-3 sm:px-6">
//             <Button
//               variant="default"
//               className="w-full bg-gradient-to-r from-primary to-primary/80 text-sm sm:text-base"
//               onClick={() => setShowDiscoveryMode(true)}
//             >
//               <Zap className="mr-2 h-4 w-4" />
//               Discovery Mode
//               <span className="ml-1 text-xs opacity-80 hidden sm:inline">(TikTok-style browsing)</span>
//             </Button>
//           </div>

//           {user?.userType === "PLUG" && <SellerCTA />}

//           {/* Categories - horizontal scroll optimized for mobile */}
//           <section className="px-4 py-2 sm:px-6">
//             <ScrollArea className="w-full whitespace-nowrap pb-2">
//               <div className="flex gap-2">
//                 {PRODUCT_CATEGORIES.map((category) => (
//                   <Button
//                     key={category.value}
//                     variant={selectedCategories.includes(category.value) ? "default" : "outline"}
//                     className={cn(
//                       "flex items-center gap-1.5 rounded-full border px-3 py-1.5 h-auto text-xs sm:text-sm",
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
//                 <AlertDescription>Failed to load products: {error.message}</AlertDescription>
//               </Alert>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="mt-4 bg-transparent"
//                 onClick={() => window.location.reload()}
//               >
//                 Retry
//               </Button>
//             </div>
//           )}

//           {/* Empty state - only show when explicitly empty and not loading */}
//           {isEmpty && !error && <NoResults onReset={resetFilters} />}

//           {/* Product Grid */}
//           <section className="px-4 py-2 sm:px-6">
//             <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
//               {/* Render products */}
//               {products.map((product, index) => (
//                 <ProductCard key={product.id || `product-${index}`} product={product} />
//               ))}

//               {/* Loading skeletons for initial load */}
//               {isInitialLoading &&
//                 Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={`initial-skeleton-${i}`} />)}

//               {/* Loading skeletons when loading more */}
//               {isLoadingMore &&
//                 hasProducts &&
//                 Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={`more-skeleton-${i}`} />)}
//             </div>
//           </section>

//           {/* Infinite scroll trigger */}
//           {hasNextPage && !isInitialLoading && (
//             <div ref={loadingRef} className="h-24 flex items-center justify-center">
//               {isLoadingMore ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
//                   <span className="text-sm text-muted-foreground">Loading more...</span>
//                 </div>
//               ) : (
//                 <div className="h-4" />
//               )}
//             </div>
//           )}

//           {/* End of results indicator */}
//           {!hasNextPage && hasProducts && !isLoadingMore && (
//             <div className="py-8 text-center">
//               <p className="text-sm text-muted-foreground">You've reached the end of the results</p>
//             </div>
//           )}
//         </main>

//         {/* Discovery Mode Dialog */}
//         <DiscoveryModeDialog
//           open={showDiscoveryMode}
//           onOpenChange={setShowDiscoveryMode}
//           products={products}
//           isLoading={isInitialLoading}
//           isLoadingMore={isLoadingMore}
//           hasNextPage={hasNextPage}
//           loadMore={() => setSize(size + 1)}
//         />
//       </div>
//     </TooltipProvider>
//   )
// }




"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Search, X, Zap, AlertCircle, MessageCircle, Plus } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

import { ProductCard } from "./product-card";
import { DiscoveryModeDialog } from "./discovery-mode-dialog";
import { PRODUCT_CATEGORIES } from "@/app/constant";
import { useProducts, type ProductsFilter } from "@/hooks/use-products";
import { ProductCardSkeleton } from "./product-card-skeleton";
import { NoResults } from "./no-results";
import { ActiveFilters } from "./active-filters";
import { FilterSheet } from "./filter-sheet";
import { useUser } from "@/app/_components/provider/UserContext";
import { SubscribersPopover } from "./subscribers-popover";
import Discover from "../discover/components/discover";
import { getUserFromHeaders } from "@/lib/auth-utils";

// Seller CTA Component
const SellerCTA = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "2349151425001";
    const message =
      "Hello! I would love to sell this kind of products, or can I get this product in the marketplace? My audience needs it.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="mx-3 my-3 sm:mx-4 sm:my-4 md:mx-6 md:my-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Want to sell or promote a product?
              </h3>
              <p className="text-xs sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Can't find the product you wish to sell or promote? Message us
                and let's see what we can do.
              </p>
            </div>

            <div className="hidden md:block flex-shrink-0">
              <Button
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white transition-colors text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-9"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 mr-1 sm:mr-2" />
                <span>WhatsApp Us</span>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="default"
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors text-xs px-3 py-2 h-8"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              <span>WhatsApp Us</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};



// Separate component for supplier marketplace
export default function SupplierMarketplace({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDiscoveryMode, setShowDiscoveryMode] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isInitialized, setIsInitialized] = useState(false);

  const { ref: loadingRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const filters: ProductsFilter = {
    search: searchQuery,
    priceRange,
    selectedCategories,
    selectedRatings,
    sortBy: "createdAt",
    order: "desc",
  };

  const {
    products,
    error,
    isLoading,
    isLoadingMore,
    hasNextPage,
    isEmpty,
    size,
    setSize,
    clearCache,
    refreshData,
  } = useProducts(filters, 20);

  const isInitialLoading = isLoading && products.length === 0;
  const hasProducts = products.length > 0;

  useEffect(() => {
    if (!isInitialized) {
      const search = searchParams.get("search");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const categories = searchParams.get("categories");
      const ratings = searchParams.get("ratings");

      if (search) setSearchQuery(search);
      if (minPrice || maxPrice) {
        setPriceRange([
          minPrice ? Number.parseInt(minPrice) : 0,
          maxPrice ? Number.parseInt(maxPrice) : 9999999,
        ]);
      }
      if (categories) setSelectedCategories(categories.split(","));
      if (ratings) setSelectedRatings(ratings.split(",").map(Number));

      setIsInitialized(true);
    }
  }, [searchParams, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = setTimeout(() => {
      const isFiltered =
        searchQuery ||
        priceRange[0] > 0 ||
        priceRange[1] < 9999999 ||
        selectedCategories.length > 0 ||
        selectedRatings.length > 0;

      if (isFiltered) {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
        if (priceRange[1] < 9999999)
          params.set("maxPrice", priceRange[1].toString());
        if (selectedCategories.length > 0)
          params.set("categories", selectedCategories.join(","));
        if (selectedRatings.length > 0)
          params.set("ratings", selectedRatings.join(","));

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        if (searchParams.toString()) {
          router.replace(pathname, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    searchQuery,
    priceRange,
    selectedCategories,
    selectedRatings,
    router,
    pathname,
    searchParams,
    isInitialized,
  ]);

  const handleInfiniteScroll = useCallback(() => {
    if (inView && hasNextPage && !isLoadingMore && !isInitialLoading) {
      setSize(size + 1);
    }
  }, [inView, hasNextPage, isLoadingMore, isInitialLoading, setSize, size]);

  useEffect(() => {
    handleInfiniteScroll();
  }, [handleInfiniteScroll]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const toggleRating = useCallback((rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setPriceRange([0, 9999999]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    clearCache();
  }, [clearCache]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  }, []);

  const removeCategory = useCallback((category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  }, []);

  const removeRating = useCallback((rating: number) => {
    setSelectedRatings((prev) => prev.filter((r) => r !== rating));
  }, []);

  const clearPriceRange = useCallback(() => {
    setPriceRange([0, 9999999]);
  }, []);

  const applyFilters = useCallback(() => {
    setIsFilterSheetOpen(false);
  }, []);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background animate-fade-in">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4 py-3 sm:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
              Marketplace
            </h1>
          </div>

          <div className="flex items-center">
            <SubscribersPopover userType={user?.userType || "SUPPLIER"} />
          </div>
        </header>

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
          <div className="px-4 sm:px-6 mt-2">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                What you see here is a <strong>personalized view</strong> based
                on your preferences, activity and others.
              </AlertDescription>
            </Alert>
          </div>

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

          <ActiveFilters
            filters={filters}
            onClearSearch={clearSearch}
            onClearPriceRange={clearPriceRange}
            onRemoveCategory={removeCategory}
            onRemoveRating={removeRating}
            onResetAll={resetFilters}
          />

          {error && (
            <div className="px-4 py-6 sm:px-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load products: {error.message}
                </AlertDescription>
              </Alert>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 bg-transparent"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          )}

          {isEmpty && !error && <NoResults onReset={resetFilters} />}

          <section className="px-4 py-2 sm:px-6">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id || `product-${index}`}
                  product={product}
                />
              ))}

              {isInitialLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={`initial-skeleton-${i}`} />
                ))}

              {isLoadingMore &&
                hasProducts &&
                Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={`more-skeleton-${i}`} />
                ))}
            </div>
          </section>

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

          {!hasNextPage && hasProducts && !isLoadingMore && (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                You've reached the end of the results
              </p>
            </div>
          )}
        </main>

        <DiscoveryModeDialog
          open={showDiscoveryMode}
          onOpenChange={setShowDiscoveryMode}
          products={products}
          isLoading={isInitialLoading}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          loadMore={() => setSize(size + 1)}
        />
      </div>
    </TooltipProvider>
  );
}
