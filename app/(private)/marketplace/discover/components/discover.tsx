// "use client";

// import { useState, useEffect, useRef } from "react";
// import { DiscoveryStack } from "./discovery-stack";

// import { SharePrompt } from "./share-prompt";
// import { useProducts, type ProductsFilter } from "@/hooks/use-products";
// import { useUser } from "@/app/_components/provider/UserContext";
// import { useSearchParams } from "next/navigation";
// import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
// import { DailyShareModal } from "./daily-share-modal";
// import { ProductDetailsModal } from "./product-details-modal";

// import {
//   shouldShowTour,
//   markTourSeen,
//   markSharePromptShown,
//   shouldShowDailyShare,
//   markDailyShareShown,
// } from "@/lib/tour-storage";
// import { DiscoveryTourOverlay } from "./discovery-tour-overlay";
// import { SubscribersPopover } from "../../_components/subscribers-popover";
// import { DiscoveryLoading } from "./discovery-loading";
// import { DiscoveryError } from "./discovery-error";

// export default function Discover() {
//   const [showSharePrompt, setShowSharePrompt] = useState(false);
//   const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
//   const [showTour, setShowTour] = useState(false);
//   const [showDailyShare, setShowDailyShare] = useState(false);
//   const [hasShownDailyShare, setHasShownDailyShare] = useState(false);
//   const [firstSwipeOfDay, setFirstSwipeOfDay] = useState(true);

//   // Search and filter states
//   const [searchQuery, setSearchQuery] = useState("");

//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
//   const {
//     userData: { user },
//   } = useUser();

//   // Combine filters for products hook
//   const filters: ProductsFilter = {
//     search: searchQuery,
//     priceRange,
//     selectedCategories,
//     selectedRatings,
//     sortBy: "createdAt",
//     order: "desc",
//   };

//   useEffect(() => {
//     const checkTour = async () => {
//       const shouldShow = await shouldShowTour();
//       if (shouldShow) {
//         setShowTour(true);
//       }
//     };
//     checkTour();
//   }, []);

//   const handleTourComplete = async () => {
//     setShowTour(false);
//     await markTourSeen();
//   };

//   // Use the products hook for data fetching
//   const {
//     products,
//     error,
//     isLoading,

//   } = useProducts(filters, 70);

//   const { addItem, items } = useShoppingCart();

//     if (isLoading) {
//     return <DiscoveryLoading />
//   }

//   if (error) {
//     return <DiscoveryError error={error} onRetry={() => window.location.reload()} />
//   }

//   const handleSwipeRight = async (product: any) => {
//     setCurrentIndex((prev) => prev + 1);

//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       minPrice: product.minPrice,
//       maxPrice: product.maxPrice,
//       image:
//         product.images && product.images.length > 0
//           ? product.images[0]
//           : "/placeholder.svg",
//     };

//     addItem(cartItem, false);

//     // Check if we should show daily share modal
//     if (firstSwipeOfDay && !hasShownDailyShare) {
//       setFirstSwipeOfDay(false);
//       const shouldShow = await shouldShowDailyShare(); // Use the new function
//       if (shouldShow) {
//         setTimeout(() => {
//           setShowDailyShare(true);
//           setHasShownDailyShare(true);
//         }, 500);
//       }
//     }

//     // Show share prompt logic
//     if (items.length + 1 === 10 && !hasSeenSharePrompt) {
//       setTimeout(() => {
//         setShowSharePrompt(true);
//         setHasSeenSharePrompt(true);
//       }, 500);
//     }
//   };

//   const handleSwipeLeft = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const handleShare = async () => {
//     await markSharePromptShown();
//     await markDailyShareShown(); // Add this line
//     console.log("Share functionality triggered");
//   };

//   const handleSwipeUp = (product: any) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   // const handleDeckEnd = () => {
//   //   // Shuffle and restart
//   //   const shuffled = [...products].sort(() => Math.random() - 0.5)
//   //   setProduct(shuffled)
//   //   setCurrentIndex(0)
//   // }

//   return (
//     <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
//         <div className="flex-1" /> {/* Spacer to push content right */}
//         {/* Subscribers Icon - positioned on the right */}
//         <SubscribersPopover userType={user?.userType || "PLUG"} />
//       </header>

//       {/* Discovery Stack */}
//       <div className="h-screen flex items-start md:items-center justify-center">
//         <DiscoveryStack
//           products={products}
//           currentIndex={currentIndex}
//           onSwipeRight={handleSwipeRight}
//           onSwipeLeft={handleSwipeLeft}
//           onSwipeUp={handleSwipeUp}
//           // onDeckEnd={handleDeckEnd}
//         />
//       </div>

//       {/* Modals */}

//       <DiscoveryTourOverlay isOpen={showTour} onComplete={handleTourComplete} />

//       {/* Daily Share Modal */}
//       <DailyShareModal
//         isOpen={showDailyShare}
//         onClose={async () => {
//           setShowDailyShare(false);
//           await markDailyShareShown(); // Mark as shown even if dismissed
//         }}
//         onShare={handleShare}
//       />
//       <SharePrompt
//         isOpen={showSharePrompt}
//         onClose={() => setShowSharePrompt(false)}
//         cartCount={items.length}
//       />
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { DiscoveryStack } from "./discovery-stack";

// import { SharePrompt } from "./share-prompt";
// import { useProducts, type ProductsFilter } from "@/hooks/use-products";
// import { useUser } from "@/app/_components/provider/UserContext";
// import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
// import { DailyShareModal } from "./daily-share-modal";
// import {
//   shouldShowTour,
//   markTourSeen,
//   markSharePromptShown,
//   shouldShowDailyShare,
//   markDailyShareShown,
// } from "@/lib/tour-storage";
// import { DiscoveryTourOverlay } from "./discovery-tour-overlay";
// import { SubscribersPopover } from "../../_components/subscribers-popover";
// import { DiscoveryLoading } from "./discovery-loading";
// import { DiscoveryError } from "./discovery-error";
// import { ProductDetailsModal } from "./product-details-modal";

// export default function Discover() {
//   const [showSharePrompt, setShowSharePrompt] = useState(false);
//   const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showTour, setShowTour] = useState(false);
//   const [showDailyShare, setShowDailyShare] = useState(false);
//   const [hasShownDailyShare, setHasShownDailyShare] = useState(false);
//   const [firstSwipeOfDay, setFirstSwipeOfDay] = useState(true);

//   // Search and filter states
//   const [searchQuery, setSearchQuery] = useState("");

//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
//   const {
//     userData: { user },
//   } = useUser();

//   // Combine filters for products hook
//   const filters: ProductsFilter = {
//     search: searchQuery,
//     priceRange,
//     selectedCategories,
//     selectedRatings,
//     sortBy: "createdAt",
//     order: "desc",
//   };

//   useEffect(() => {
//     const checkTour = async () => {
//       const shouldShow = await shouldShowTour();
//       if (shouldShow) {
//         setShowTour(true);
//       }
//     };
//     checkTour();
//   }, []);

//   const handleTourComplete = async () => {
//     setShowTour(false);
//     await markTourSeen();
//   };

//   // Use the products hook for data fetching
//   const { products, error, isLoading } = useProducts(filters, 50);

//   const { addItem, items } = useShoppingCart();

//   if (isLoading) {
//     return <DiscoveryLoading />;
//   }

//   if (error) {
//     return (
//       <DiscoveryError error={error} onRetry={() => window.location.reload()} />
//     );
//   }

//   const handleSwipeRight = async (product: any) => {
//     setCurrentIndex((prev) => prev + 1);

//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       minPrice: product.minPrice,
//       maxPrice: product.maxPrice,
//       image:
//         product.images && product.images.length > 0
//           ? product.images[0]
//           : "/placeholder.svg",
//     };

//     addItem(cartItem, false);

//     // Check if we should show daily share modal
//     if (firstSwipeOfDay && !hasShownDailyShare) {
//       setFirstSwipeOfDay(false);
//       const shouldShow = await shouldShowDailyShare(); // Use the new function
//       if (shouldShow) {
//         setTimeout(() => {
//           setShowDailyShare(true);
//           setHasShownDailyShare(true);
//         }, 500);
//       }
//     }

//     // Show share prompt logic
//     if (items.length + 1 === 10 && !hasSeenSharePrompt) {
//       setTimeout(() => {
//         setShowSharePrompt(true);
//         setHasSeenSharePrompt(true);
//       }, 500);
//     }
//   };

//   const handleSwipeLeft = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const handleSwipeUp = (product: any) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleShare = async () => {
//     await markSharePromptShown();
//     await markDailyShareShown(); // Add this line
//     console.log("Share functionality triggered");
//   };

//   // const handleDeckEnd = () => {
//   //   // Shuffle and restart
//   //   const shuffled = [...products].sort(() => Math.random() - 0.5)
//   //   setProduct(shuffled)
//   //   setCurrentIndex(0)
//   // }

//   return (
//     <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
//         <div className="flex-1" /> {/* Spacer to push content right */}
//         {/* Subscribers Icon - positioned on the right */}
//         <SubscribersPopover userType={user?.userType || "PLUG"} />
//       </header>

//       {/* Discovery Stack */}
//       <div className="h-screen flex items-start md:items-center justify-center">
//         <DiscoveryStack
//           products={products}
//           currentIndex={currentIndex}
//           onSwipeRight={handleSwipeRight}
//           onSwipeLeft={handleSwipeLeft}
//           onSwipeUp={handleSwipeUp}
//           // onDeckEnd={handleDeckEnd}
//         />
//       </div>

//       {/* Modals */}

//       <DiscoveryTourOverlay isOpen={showTour} onComplete={handleTourComplete} />

//       {/* Daily Share Modal */}
//       <DailyShareModal
//         isOpen={showDailyShare}
//         onClose={async () => {
//           setShowDailyShare(false);
//           await markDailyShareShown(); // Mark as shown even if dismissed
//         }}
//         onShare={handleShare}
//       />
//       <SharePrompt
//         isOpen={showSharePrompt}
//         onClose={() => setShowSharePrompt(false)}
//         cartCount={items.length}
//       />

//       <ProductDetailsModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedProduct(null);
//         }}
//         productId={selectedProduct?.id || null}
//       />
//     </main>
//   );
// }



"use client";

import { useState, useEffect } from "react";

import { DiscoveryStack } from "./discovery-stack";
import { Layers, ChevronRight } from "lucide-react";
import { SharePrompt } from "./share-prompt";
import { useProducts, type ProductsFilter } from "@/hooks/use-products";
import { useUser } from "@/app/_components/provider/UserContext";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { DailyShareModal } from "./daily-share-modal";
import {
  shouldShowTour,
  markTourSeen,
  markSharePromptShown,
  shouldShowDailyShare,
  markDailyShareShown,
} from "@/lib/tour-storage";
import { DiscoveryTourOverlay } from "./discovery-tour-overlay";
import { SubscribersPopover } from "../../_components/subscribers-popover";
import { DiscoveryLoading } from "./discovery-loading";
import { DiscoveryError } from "./discovery-error";
import { ProductDetailsModal } from "./product-details-modal";
import SupplierMarketplace from "../../_components/supplier-marketplace";

export default function Discover() {
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showDailyShare, setShowDailyShare] = useState(false);
  const [hasShownDailyShare, setHasShownDailyShare] = useState(false);
  const [firstSwipeOfDay, setFirstSwipeOfDay] = useState(true);
  const [isViewMore, setIsViewMore] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const {
    userData: { user },
  } = useUser();

    
  

  useEffect(() => {
    console.log("Current index:", currentIndex, "of", products.length);
    console.log("Current product:", products[currentIndex]);
  }, [currentIndex]);

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
  const { products, error, isLoading } = useProducts(filters, 50);

  const { addItem, items } = useShoppingCart();

  if (isLoading) {
    return <DiscoveryLoading />;
  }

  if (error) {
    return (
      <DiscoveryError error={error} onRetry={() => window.location.reload()} />
    );
  }

  const productsRemaining = Math.max(0, products.length - currentIndex);

 

const handleSwipeRight = async (product: any) => {
  // ✅ Guard against undefined product
  if (!product || !product.id) return;



  // ✅ Prevent index overflow
  setCurrentIndex((prev) => {
    const next = prev + 1;
    return next >= products.length ? products.length : next;
  });

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    minPrice: product.minPrice,
    maxPrice: product.maxPrice,
    image: product.images?.[0] ?? "/placeholder.svg",
  };

  addItem(cartItem, false);

  // ✅ Optional: prevent showing modals if deck is over
  if (currentIndex + 1 >= products.length) return;

  if (firstSwipeOfDay && !hasShownDailyShare) {
    setFirstSwipeOfDay(false);
    const shouldShow = await shouldShowDailyShare();
    if (shouldShow) {
      setTimeout(() => {
        setShowDailyShare(true);
        setHasShownDailyShare(true);
      }, 500);
    }
  }

  if (!hasSeenSharePrompt) {
    setTimeout(() => {
      if (items.length >= 10) {
        setShowSharePrompt(true);
        setHasSeenSharePrompt(true);
      }
    }, 100);
  }
};

const handleSwipeLeft = (product: any) => {
  // ✅ Guard against undefined product
  if (!product || !product.id) return;

   

  setCurrentIndex((prev) => {
    const next = prev + 1;
    return next >= products.length ? products.length : next;
  });
};

const handleSwipeUp = (product: any) => {
  // ✅ Guard before opening modal
  if (!product || !product.id) return;
  setSelectedProduct(product);
  setIsModalOpen(true);
};



  const handleShare = async () => {
    await markSharePromptShown();
    await markDailyShareShown(); // Add this line
    console.log("Share functionality triggered");
  };

  // const handleDeckEnd = () => {
  //   // Shuffle and restart
  //   const shuffled = [...products].sort(() => Math.random() - 0.5)
  //   setProduct(shuffled)
  //   setCurrentIndex(0)
  // }

  const viewMore = () => {
    setIsViewMore(true);
  };

  if (isViewMore) {
    return <SupplierMarketplace user={user} onBack={() => setIsViewMore(false)} />;
  }

  return (
    <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
      {/* Header */}

      <header className="fixed top-0 left-0 md:left-[180px] right-0 z-50 px-6 md:py-4 py-3 flex items-center justify-between">
        {/* View More Button */}
        <button
          onClick={viewMore}
          className="group flex items-center gap-2 px-4 md:px-5 md:py-2.5 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="text-sm font-semibold text-orange-600">
            View More
          </span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-orange-600 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Right side container for popover and counter */}
        <div className="flex flex-col items-end gap-1 md:gap-3">
          {/* Subscribers Popover */}
          <SubscribersPopover userType={user?.userType || "PLUG"} />

          {/* Products Counter */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
            <div className="relative">
              <Layers
                className="md:w-5 md:h-5 w-4 h-4 text-orange-600"
                strokeWidth={2.5}
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="md:text-2xl text-base font-bold text-orange-600 tabular-nums">
                {productsRemaining}
              </span>
              <span className="text-xs font-medium text-orange-500/80">
                left
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Discovery Stack */}
      <div className="h-screen flex items-start md:items-center justify-center">
        {/* <DiscoveryStack
          products={products}
          currentIndex={currentIndex}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onSwipeUp={handleSwipeUp}
          // onDeckEnd={handleDeckEnd}
        /> */}

        <DiscoveryStack
          products={products}
          currentIndex={currentIndex}
          onSwipeRight={(p) => {
            if (p && p.id) handleSwipeRight(p);
          }}
          onSwipeLeft={(p) => {
            if (p && p.id) handleSwipeLeft(p);
          }}
          onSwipeUp={(p) => {
            if (p && p.id) handleSwipeUp(p);
          }}
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

      <ProductDetailsModal
        isOpen={!!isModalOpen && !!selectedProduct?.id}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        productId={selectedProduct?.id ?? null}
      />

     
    </main>
  );
}
