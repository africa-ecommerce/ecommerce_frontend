"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { BookmarkPlus, Info, Plus, Star, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, truncateText } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types/product";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { useUser } from "@/app/_components/provider/UserContext";
import Link from "next/link";

interface DiscoveryModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

export function DiscoveryModeDialog({
  open,
  onOpenChange,
  products,
}: DiscoveryModeDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [exitX, setExitX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { items, addItem } = useShoppingCart();
  const [isAdding, setIsAdding] = useState(false);

  const { userData } = useUser();

  console.log("d", userData);

  const currentProduct = products[currentIndex];

  // Check if product is already in cart
  const isInCart = items.some((item) => item.id === currentProduct?.id);

  const isMobile = useIsMobile();

  const handleAddToStore = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click when clicking the button
    e.stopPropagation(); // Stop event propagation

    if (isInCart) return; // Don't add if already in cart

    setIsAdding(true);

    // Create cart item from product
    const cartItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image:
        currentProduct.images && currentProduct.images.length > 0
          ? currentProduct.images[0]
          : "/placeholder.svg",
    };

    // Add item to cart after a short delay to show loading state
    setTimeout(() => {
      addItem(cartItem, false); // Pass false to prevent opening the cart
      setIsAdding(false);
    }, 800);
  };

  // Reset index when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setLikedProducts([]);
      setSavedProducts([]);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 100;
    const velocityThreshold = 500;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped right (like)
      handleNext();
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      // Swiped left (skip)
      handlePrev();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleNext = () => {
    if (isDragging) return;

    setDirection("left");
    setExitX(-500);
    const currentProductId = products[currentIndex].id;
    setLikedProducts((prev) => [...prev, currentProductId]);

    // Move to next product after animation
    setTimeout(() => {
      if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onOpenChange(false);
      }
      setDirection(null);
    }, 300);
  };

  const handlePrev = () => {
    if (isDragging) return;

    setDirection("right");
    setExitX(500);

    // Move to next product after animation
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        onOpenChange(false);
      }
      setDirection(null);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 h-[90vh] sm:h-[80vh] max-h-[800px] sm:max-h-[600px] overflow-hidden">
        {/* Adding DialogTitle for accessibility - visually hidden but available to screen readers */}
        <DialogTitle className="sr-only">Product Discovery</DialogTitle>

        <TooltipProvider>
          <div className="relative h-full flex flex-col bg-black">
            {/* Header with Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex flex-col">
              <div className="flex items-center justify-end p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close discovery mode"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center overflow-hidden touch-none">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProduct?.id}
                  className="absolute w-full h-full"
                  custom={direction}
                  initial={{
                    x:
                      direction === "right"
                        ? 300
                        : direction === "left"
                        ? -300
                        : 0,
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    x: exitX,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  whileTap={{ scale: 0.98 }}
                  style={{ touchAction: "none" }}
                >
                  <div className="relative h-full flex flex-col">
                    {/* Product Image */}
                    <div className="relative flex-1 bg-muted overflow-hidden">
                      <Image
                        src={currentProduct?.images?.[0] || "/placeholder.svg"}
                        alt={currentProduct?.name || "Product image"}
                        className="h-full w-full object-cover"
                        loading="eager"
                        width={600}
                        height={600}
                      />
                    </div>

                    {/* Product Info with improved styling */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold line-clamp-1 capitalize">
                          {truncateText(currentProduct?.name)}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
                        <span>•</span>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3.5 w-3.5" />
                          <span className="font-medium">
                            {currentProduct?.plugsCount} plugs
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-lg font-bold sm:text-xl">
                            ₦{currentProduct?.price?.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-sm capitalize">
                            {currentProduct?.sales || 0} sold
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons with improved styling */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 px-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/marketplace/product/${currentProduct?.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/95 text-blue-500 shadow-lg",
                        "hover:bg-white/95 hover:text-blue-500 hover:scale-105 transition-transform"
                      )}
                      aria-label="Product info"
                    >
                      <Info className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">Info</TooltipContent>
              </Tooltip>

              {userData.user?.userType === "PLUG" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/95 text-green-500 border-green-200 shadow-lg",
                        " hover:bg-white/95 hover:text-green-500 hover:scale-105 transition-transform"
                      )}
                      onClick={handleAddToStore}
                      disabled={isAdding || isInCart}
                      aria-label="Add product to store"
                    >
                      <Plus className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Add to store</TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Desktop Navigation Arrows */}
            {!isMobile && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  aria-label="Previous product"
                  onClick={handlePrev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={handleNext}
                  aria-label="Next product"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </>
            )}

            {/* Swipe Hint with improved animation */}
            {currentIndex === 0 && isMobile && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="bg-black/50 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm flex items-center gap-2"
                  animate={{
                    x: [0, -20, 20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: 2,
                    ease: "easeInOut",
                  }}
                >
                  <span>Swipe left or right to browse</span>
                  <motion.div
                    animate={{ x: [-5, 5, -5] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    👆
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Like/Skip indicators that appear during swipe */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-8">
              <motion.div
                className="bg-red-500/80 text-white font-bold text-xl p-3 rounded-lg rotate-[-20deg]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDragging && direction === "left" ? 0.9 : 0,
                }}
              >
                SKIP
              </motion.div>
              <motion.div
                className="bg-green-500/80 text-white font-bold text-xl p-3 rounded-lg rotate-[20deg]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDragging && direction === "right" ? 0.9 : 0,
                }}
              >
                ADD
              </motion.div>
            </div>

            {/* Desktop Keyboard Instructions */}
            {currentIndex === 0 && !isMobile && (
              <div className="absolute bottom-24 left-0 right-0 flex justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                  Use ← → arrow keys to navigate
                </div>
              </div>
            )}
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
