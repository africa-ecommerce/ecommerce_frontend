"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { preload } from "swr";
import { ProductCard } from "./product-card";
import { Toast } from "./toast";
import { X, Heart, Share2 } from "lucide-react";
import { DiscoveryEndOfStack } from "./discovery-end-of-stack";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { DirectShareModal } from "./direct-share-modal";
import { DiscoveryLoading } from "./discovery-loading";



interface DiscoveryStackProps {
  products: any[];
  currentIndex: number;
  onSwipeRight: (product: any, skipCart?: boolean) => void;
  onSwipeLeft: (product: any) => void;
  onSwipeUp: (product: any) => void;
}

export function DiscoveryStack({
  products,
  currentIndex,
  onSwipeRight,
  onSwipeLeft,
 
  onSwipeUp,
}: DiscoveryStackProps) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);
  const [leaving, setLeaving] = useState(false);

   const [showDirectShareModal, setShowDirectShareModal] = useState(false);
   const [shareProduct, setShareProduct] = useState<any | null>(null);

  const currentProduct = products?.[currentIndex];
  const nextProducts =
    products?.slice(currentIndex + 1, currentIndex + 3) || [];


  


  // ✅ Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentProduct) return;
      const product = currentProduct;

      if (e.key === "ArrowRight") {
        

        setToast({
          message: "Added to your cart — add to store or share what you found",
          type: "success",
        });
        const swipe = setTimeout(() => onSwipeRight(product), 250);
        const toast = setTimeout(() => setToast(null), 1500);
        return () => {
          clearTimeout(swipe);
          clearTimeout(toast);
        };
      }

      if (e.key === "ArrowLeft") {
        const swipe = setTimeout(() => onSwipeLeft(product), 250);
        return () => clearTimeout(swipe);
      }

      if (e.key === "ArrowUp") {
        const swipe = setTimeout(() => onSwipeUp(product), 250);
        return () => clearTimeout(swipe);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProduct, onSwipeRight, onSwipeLeft, onSwipeUp]);

  // ✅ Handle swipe drag end
  const handleDragEnd = (
    _: any,
    info: PanInfo,
    product: any,
    x: any,
    y: any
  ) => {
    if (!product || leaving) return;
    const threshold = 120;

    const resetLeaving = setTimeout(() => setLeaving(false), 250);

    if (info.offset.x > threshold || info.velocity.x > 800) {
      setLeaving(true);
      

      setToast({
        message: "Added to your cart — add to store or share what you found",
        type: "success",
      });
      const swipe = setTimeout(() => onSwipeRight(product), 250);
      const toast = setTimeout(() => setToast(null), 1500);

      return () => {
        clearTimeout(swipe);
        clearTimeout(toast);
        clearTimeout(resetLeaving);
      };
    }

    if (info.offset.x < -threshold || info.velocity.x < -800) {
      setLeaving(true);
      setTimeout(() => {
        onSwipeLeft(product);
        setLeaving(false);
      }, 250);
      return;
    }

    if (info.offset.y < -threshold) {
      onSwipeUp(product);
      return;
    }

    // bounce back to center
    x.set(0);
    y.set(0);
  };

  

  return (
    <div className="relative w-full max-w-md mx-auto h-[calc(90vh-4rem)] md:h-[calc(100vh-4rem)]">
      {/* Background stacked cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        {nextProducts
          .filter((p) => p && p.id)
          .map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                scale: 0.9 - index * 0.05,
                y: index * 15,
                rotate: index === 0 ? -7 : 7,
                opacity: 0,
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                rotate: index === 0 ? -7 : 7,
                opacity: 1 - index * 0.2,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute"
              style={{ zIndex: 5 - index }}
            >
              <div className="w-[90vw] max-w-md aspect-[4/5] bg-white rounded-3xl shadow-xl" />
            </motion.div>
          ))}
      </div>

      {/* Foreground swipeable card */}
     <AnimatePresence mode="popLayout">
  {currentProduct ? (
    <SwipeCard
      key={currentProduct.id}
      product={currentProduct}
      handleDragEnd={handleDragEnd}
      onSwipeUp={onSwipeUp}
    />
  ) :  !currentProduct || products.length === 0 ? (
    <DiscoveryEndOfStack />
  )  : (
    <DiscoveryLoading />
  )}
</AnimatePresence>


      {/* Action buttons */}
      {currentProduct && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 md:gap-6 z-30">
          <button
            onClick={() => onSwipeLeft(currentProduct)}
            className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
          >
            <X className="md:w-6 md:h-6 w-5 h-5 text-red-500" />
          </button>

          <button
            onClick={() => onSwipeUp(currentProduct)}
            className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
          >
            <svg
              className="md:w-6 md:h-6 w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              if (!currentProduct) return;


              setToast({
                message: "Added to your cart — add to store or share what you found",
                type: "success",
              });
              const swipe = setTimeout(() => onSwipeRight(currentProduct), 250);
              const toast = setTimeout(() => setToast(null), 1500);
              return () => {
                clearTimeout(swipe);
                clearTimeout(toast);
              };
            }}
            className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
          >
            <Heart className="md:w-6 md:h-6 w-5 h-5 text-green-500" />
          </button>

          <button
            onClick={() => {
              if (!currentProduct) return;
              setShareProduct(currentProduct);
              setShowDirectShareModal(true);
            }}
            className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
          >
            <Share2 className="md:w-6 md:h-6 w-5 h-5 text-orange-600" />
          </button>
        </div>
      )}

      {/* Toast message */}
      {toast && <Toast message={toast.message} type={toast.type} />}

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
            onSwipeRight(shareProduct, true); // Pass true to skip cart
            setToast(null);
          }, 1000);
        }}
      />
    </div>
  );
}

function SwipeCard({ product, handleDragEnd, onSwipeUp }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  if (!product) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
      drag
      dragElastic={0.8}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, info) => handleDragEnd(e, info, product, x, y)}
      style={{ x, y, rotate, zIndex: 20 }}
      initial={{ scale: 0.9, y: 40, opacity: 0 }}
      animate={{
        scale: 1,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 250, damping: 20 },
      }}
      exit={{
        x: x.get() > 0 ? 800 : x.get() < 0 ? -800 : 0,
        y: 100,
        rotate: x.get() > 0 ? 25 : x.get() < 0 ? -25 : 0,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      whileTap={{ scale: 1.05 }}
    >
      <ProductCard product={product} onSwipeUp={() => onSwipeUp(product)} />
    </motion.div>
  );
}
