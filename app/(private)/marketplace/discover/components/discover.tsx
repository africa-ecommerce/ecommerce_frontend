"use client";

import { useState, useEffect, useRef } from "react";
import { DiscoveryStack } from "./discovery-stack";

import { SharePrompt } from "./share-prompt";
import { useProducts, type ProductsFilter } from "@/hooks/use-products";
import { useUser } from "@/app/_components/provider/UserContext";
import { useSearchParams } from "next/navigation";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { DailyShareModal } from "./daily-share-modal";
import {
  shouldShowTour,
  markTourSeen,
  shouldShowSharePrompt,
  markSharePromptShown,
  shouldShowDailyShare,
  markDailyShareShown,
} from "@/lib/tour-storage";
import { DiscoveryTourOverlay } from "./discovery-tour-overlay";
import { SubscribersPopover } from "../../_components/subscribers-popover";

export default function Discover() {
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [showDailyShare, setShowDailyShare] = useState(false);
  const [hasShownDailyShare, setHasShownDailyShare] = useState(false);
  const [firstSwipeOfDay, setFirstSwipeOfDay] = useState(true);

  const searchParams = useSearchParams();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const {
    userData: { user },
  } = useUser();




  // Combine filters for products hook
  const filters: ProductsFilter = {
    search: searchQuery,
    priceRange,
    selectedCategories,
    selectedRatings,
    sortBy: "createdAt",
    order: "desc",
  };

  useEffect(() => {
    const checkTour = async () => {
      const shouldShow = await shouldShowTour();
      if (shouldShow) {
        setShowTour(true);
      }
    };
    checkTour();
  }, []);

  const handleTourComplete = async () => {
    setShowTour(false);
    await markTourSeen();
  };

  // Use the products hook for data fetching
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

  const { addItem, items } = useShoppingCart();

  const handleSwipeRight = async (product: any) => {
    setCurrentIndex((prev) => prev + 1);

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      minPrice: product.minPrice,
      maxPrice: product.maxPrice,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "/placeholder.svg",
    };

    addItem(cartItem, false);

    // Check if we should show daily share modal
    if (firstSwipeOfDay && !hasShownDailyShare) {
      setFirstSwipeOfDay(false);
      const shouldShow = await shouldShowDailyShare(); // Use the new function
      if (shouldShow) {
        setTimeout(() => {
          setShowDailyShare(true);
          setHasShownDailyShare(true);
        }, 500);
      }
    }

    // Show share prompt logic
    if (items.length + 1 === 10 && !hasSeenSharePrompt) {
      setTimeout(() => {
        setShowSharePrompt(true);
        setHasSeenSharePrompt(true);
      }, 500);
    }
  };


  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleShare = async () => {
    await markSharePromptShown();
    await markDailyShareShown(); // Add this line
    console.log("Share functionality triggered");
  };

  const handleSwipeUp = (product: any) => {
    setSelectedProduct(product);
  };

  // const handleDeckEnd = () => {
  //   // Shuffle and restart
  //   const shuffled = [...products].sort(() => Math.random() - 0.5)
  //   setProduct(shuffled)
  //   setCurrentIndex(0)
  // }

  return (
    <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl"></h1>
          </div>

          {/* Subscribers Icon - positioned on the right */}
          <div className="flex items-center">
            <SubscribersPopover
              userType={user?.userType || "PLUG"}
             
            />
          </div>
      </header>

      {/* Discovery Stack */}
      <div className="h-screen flex items-start md:items-center justify-center">
        <DiscoveryStack
          products={products}
          currentIndex={currentIndex}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onSwipeUp={handleSwipeUp}
          // onDeckEnd={handleDeckEnd}
        />
      </div>

      {/* Modals */}

      <DiscoveryTourOverlay isOpen={showTour} onComplete={handleTourComplete} />

      {/* Daily Share Modal */}
      <DailyShareModal
        isOpen={showDailyShare}
        onClose={async () => {
          setShowDailyShare(false);
          await markDailyShareShown(); // Mark as shown even if dismissed
        }}
        onShare={handleShare}
      />
      <SharePrompt
        isOpen={showSharePrompt}
        onClose={() => setShowSharePrompt(false)}
        cartCount={items.length}
      />
    </main>
  );
}
