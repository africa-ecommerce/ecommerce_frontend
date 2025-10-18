// "use client";

// import { useState, useEffect } from "react";

// import { DiscoveryStack } from "./discovery-stack";
// import { Layers, ChevronRight } from "lucide-react";
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
// import SupplierMarketplace from "../../_components/supplier-marketplace";
// import { DirectShareModal } from "./direct-share-modal";

// export default function Discover() {
//   const [showSharePrompt, setShowSharePrompt] = useState(false);
//   const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false);
//    const [toast, setToast] = useState<{
//       message: string;
//       type: "success" | "info";
//     } | null>(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showTour, setShowTour] = useState(false);
//   const [showDailyShare, setShowDailyShare] = useState(false);
//   const [hasShownDailyShare, setHasShownDailyShare] = useState(false);
//   const [firstSwipeOfDay, setFirstSwipeOfDay] = useState(true);
//   const [isViewMore, setIsViewMore] = useState(false);

//   // Search and filter states
//   const [searchQuery, setSearchQuery] = useState("");

//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
//   const {
//     userData: { user },
//   } = useUser();

//   useEffect(() => {
//     console.log("Current index:", currentIndex, "of", products.length);
//     console.log("Current product:", products[currentIndex]);
//   }, [currentIndex]);

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

//   const { addItem, items, openCart } = useShoppingCart();

//   const [showDirectShareModal, setShowDirectShareModal] = useState(false);
//   const [shareProduct, setShareProduct] = useState<any | null>(null);

//   const currentProduct = products?.[currentIndex];

//   if (isLoading) {
//     return <DiscoveryLoading />;
//   }

//   if (error) {
//     return (
//       <DiscoveryError error={error} onRetry={() => window.location.reload()} />
//     );
//   }

//   const productsRemaining = Math.max(0, products.length - currentIndex);

 
//   const handleSwipeRight = async (product: any, skipCart: boolean = false) => {
//     if (!product || !product.id) return;

//     // Move to next product
//     setCurrentIndex((prev) => {
//       const next = prev + 1;
//       return next >= products.length ? products.length : next;
//     });

//     // Only add to cart if skipCart is false
//     if (!skipCart) {
//       const cartItem = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         minPrice: product.minPrice,
//         maxPrice: product.maxPrice,
//         image: product.images?.[0] ?? "/placeholder.svg",
//       };

//       addItem(cartItem, false);
//     }

//     // Prevent showing modals if deck is over
//     if (currentIndex + 1 >= products.length) return;

//     // Daily share modal logic (only show if not skipping cart)
//     if (!skipCart && firstSwipeOfDay && !hasShownDailyShare) {
//       setFirstSwipeOfDay(false);
//       const shouldShow = await shouldShowDailyShare();
//       if (shouldShow) {
//         setTimeout(() => {
//           setShowDailyShare(true);
//           setHasShownDailyShare(true);
//         }, 500);
//       }
//     }

//     // Share prompt logic (only show if not skipping cart)
//     if (!skipCart && !hasSeenSharePrompt) {
//       setTimeout(() => {
//         if (items.length >= 10) {
//           setShowSharePrompt(true);
//           setHasSeenSharePrompt(true);
//         }
//       }, 100);
//     }
//   };

//   const handleSwipeLeft = (product: any) => {
//     // ✅ Guard against undefined product
//     if (!product || !product.id) return;

//     setCurrentIndex((prev) => {
//       const next = prev + 1;
//       return next >= products.length ? products.length : next;
//     });
//   };

//   const handleSwipeUp = (product: any) => {
//     // ✅ Guard before opening modal
//     if (!product || !product.id) return;
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleShare = async () => {
//     await markSharePromptShown();
//     await markDailyShareShown(); // Add this line
//     if (!currentProduct) return;
//     setShareProduct(currentProduct);
//     setShowDirectShareModal(true);
//   };

 

//   const viewMore = () => {
//     setIsViewMore(true);
//   };

//   if (isViewMore) {
//     return (
//       <SupplierMarketplace user={user} onBack={() => setIsViewMore(false)} />
//     );
//   }

//   return (
//     <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
//       {/* Header */}

//       <header className="fixed top-0 left-0 md:left-[180px] right-0 z-50 px-6 md:py-4 py-3 flex items-center justify-between">
//         {/* View More Button */}
//         {/* <button
//           onClick={viewMore}
//           className="group flex items-center gap-2 px-4 md:px-5 md:py-2.5 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
//         >
//           <span className="text-sm font-semibold text-orange-600">
//             View More
//           </span>
//           <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-orange-600 group-hover:translate-x-0.5 transition-transform" />
//         </button> */}

//         {/* Right side container for popover and counter */}
//         <div className="flex flex-col items-end gap-1 md:gap-3">
         
//           <SubscribersPopover userType={user?.userType || "PLUG"} />

          
//           {/* <div className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
//             <div className="relative">
//               <Layers
//                 className="md:w-5 md:h-5 w-4 h-4 text-orange-600"
//                 strokeWidth={2.5}
//               />
//               <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
//             </div>
//             <div className="flex items-baseline gap-1">
//               <span className="md:text-2xl text-base font-bold text-orange-600 tabular-nums">
//                 {productsRemaining}
//               </span>
//               <span className="text-xs font-medium text-orange-500/80">
//                 left
//               </span>
//             </div>
//           </div> */}
//         </div>
//       </header>

//       {/* Discovery Stack */}
//       <div className="h-screen flex items-start md:items-center justify-center">
        
//         <DiscoveryStack
//           products={products}
//           currentIndex={currentIndex}
//           onSwipeRight={(p, skipCart) => {
//             if (p && p.id) handleSwipeRight(p, skipCart);
//           }}
//           onSwipeLeft={(p) => {
//             if (p && p.id) handleSwipeLeft(p);
//           }}
//           onSwipeUp={(p) => {
//             if (p && p.id) handleSwipeUp(p);
//           }}
//         />
//       </div>

//       {/* Modals */}

//       <DiscoveryTourOverlay isOpen={showTour} onComplete={handleTourComplete} />

//       <DirectShareModal
//         open={showDirectShareModal}
//         onOpenChange={setShowDirectShareModal}
//         product={
//           shareProduct
//             ? {
//                 id: shareProduct.id,
//                 name: shareProduct.name,
//                 price: shareProduct.price,
//                 minPrice: shareProduct.minPrice,
//                 maxPrice: shareProduct.maxPrice,
//               }
//             : null
//         }
//         onSuccess={() => {
//           // Show success toast
//           setToast({
//             message: "Product added to your store successfully!",
//             type: "success",
//           });

//           // Trigger swipe animation after short delay
//           setTimeout(() => {
//             (p) => {
//               if (p && p.id) handleSwipeRight(p, true);
//             }; // Pass true to skip cart
//             setToast(null);
//           }, 1000);
//         }}
//       />

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
//         onConfirm={openCart}
//       />

//       <ProductDetailsModal
//         isOpen={!!isModalOpen && !!selectedProduct?.id}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedProduct(null);
//         }}
//         productId={selectedProduct?.id ?? null}
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
import { DirectShareModal } from "./direct-share-modal";

export default function Discover() {
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showDailyShare, setShowDailyShare] = useState(false);
  const [hasShownDailyShare, setHasShownDailyShare] = useState(false);
  const [firstSwipeOfDay, setFirstSwipeOfDay] = useState(true);
  const [isViewMore, setIsViewMore] = useState(false);
  const [hasPrefetched, setHasPrefetched] = useState(false);


  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {
    userData: { user },
  } = useUser();

 

  // Combine filters for products hook
  const filters = {
    search: searchQuery,
    selectedCategories,
   
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
const { products, error, isLoading, hasNextPage, setSize, size } = useProducts(
  filters,
  20,
  true
);

  console.log("products", products)


    useEffect(() => {
      if (!hasNextPage || hasPrefetched) return;

      const remaining = products.length - currentIndex;

      if (
        (currentIndex >= 15 && currentIndex <= 17) ||
        (remaining <= 5 && remaining >= 3)
      ) {
        console.log("Prefetching next page...");
        setHasPrefetched(true);
        setSize(size + 1);
      }
    }, [
      currentIndex,
      products.length,
      hasNextPage,
      hasPrefetched,
      setSize,
      size,
    ]);


    useEffect(() => {
      setHasPrefetched(false);
    }, [size]);

  const { addItem, items, openCart } = useShoppingCart();

  const [showDirectShareModal, setShowDirectShareModal] = useState(false);
  const [shareProduct, setShareProduct] = useState<any | null>(null);

  const currentProduct = products?.[currentIndex];

  if (isLoading) {
    return <DiscoveryLoading />;
  }

  if (error) {
    return (
      <DiscoveryError error={error} onRetry={() => window.location.reload()} />
    );
  }

  const productsRemaining = Math.max(0, products.length - currentIndex);

  const handleSwipeRight = async (product: any, skipCart: boolean = false) => {
    if (!product || !product.id) return;

    // Move to next product
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next >= products.length ? products.length : next;
    });

    // Only add to cart if skipCart is false
    if (!skipCart) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        minPrice: product.minPrice,
        maxPrice: product.maxPrice,
        image: product.images?.[0] ?? "/placeholder.svg",
      };

      addItem(cartItem, false);
    }

    // Prevent showing modals if deck is over
    if (currentIndex + 1 >= products.length) return;

    // Daily share modal logic (only show if not skipping cart)
    if (!skipCart && firstSwipeOfDay && !hasShownDailyShare) {
      setFirstSwipeOfDay(false);
      const shouldShow = await shouldShowDailyShare();
      if (shouldShow) {
        setTimeout(() => {
          setShowDailyShare(true);
          setHasShownDailyShare(true);
        }, 500);
      }
    }

    // Share prompt logic (only show if not skipping cart)
    if (!skipCart && !hasSeenSharePrompt) {
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
    if (!currentProduct) return;
    setShareProduct(currentProduct);
    setShowDirectShareModal(true);
  };

  const viewMore = () => {
    setIsViewMore(true);
  };

  if (isViewMore) {
    return (
      <SupplierMarketplace user={user} onBack={() => setIsViewMore(false)} />
    );
  }

  return (
    <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
      {/* Header */}

     

      {/* Discovery Stack */}
      <div className="h-screen flex items-start md:items-center justify-center">
        <DiscoveryStack
          products={products}
          currentIndex={currentIndex}
          onSwipeRight={(p, skipCart) => {
            if (p && p.id) handleSwipeRight(p, skipCart);
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

      <DirectShareModal
        open={showDirectShareModal}
        onOpenChange={setShowDirectShareModal}
        product={
          shareProduct
            ? {
                id: shareProduct.id,
                name: shareProduct.name,
                price: shareProduct.price,
                minPrice: shareProduct.minPrice,
                maxPrice: shareProduct.maxPrice,
              }
            : null
        }
        onSuccess={() => {
          // Show success toast
          setToast({
            message: "Product added to your store successfully!",
            type: "success",
          });

          // Trigger swipe animation after short delay
          setTimeout(() => {
            (p) => {
              if (p && p.id) handleSwipeRight(p, true);
            }; // Pass true to skip cart
            setToast(null);
          }, 1000);
        }}
      />

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
        onConfirm={openCart}
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
