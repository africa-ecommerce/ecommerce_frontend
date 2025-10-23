"use client";

import { useState, useEffect, useRef } from "react";

import { DiscoveryStack } from "./discovery-stack";
import { SharePrompt } from "./share-prompt";
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
import { useDiscoverProducts } from "@/hooks/use-discoverProducts";
import { useDiscoverSync } from "@/hooks/use-discoverSync";

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

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {
    userData: { user },
  } = useUser();

  console.log("user", user)

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
  const { products, error, isLoading } = useDiscoverProducts(100);

  const { recordSwipeRight, recordSwipeLeft } = useDiscoverSync(user.plug.id);

  console.log("products", products);



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
    recordSwipeRight(product.id);

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
    recordSwipeLeft(product.id);

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

      {isModalOpen && selectedProduct?.id && (
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          productId={selectedProduct.id}
        />
      )}
    </main>
  );
}
