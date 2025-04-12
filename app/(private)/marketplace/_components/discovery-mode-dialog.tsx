"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { BookmarkPlus, Info, Plus, Star, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  supplierPrice: number;
  recommendedPrice: number;
  profit: number;
  profitMargin: number;
  rating: number;
  reviews: number;
  sales: number;
  marketFitScore: number;
  trending: boolean;
  stock: number;
  image: string;
  supplier: {
    id: string;
    name: string;
    rating: number;
    fulfillmentRate: number;
    responseTime: string;
    image: string;
  };
  plugsCount: number;
}

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

  // Reset index when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setLikedProducts([]);
      setSavedProducts([]);
    }
  }, [open]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 100;
    const velocityThreshold = 500;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped right (like)
      handleLike();
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      // Swiped left (skip)
      handleSkip();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleLike = () => {
    if (isDragging) return;

    setDirection("right");
    setExitX(500);
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

  const handleSkip = () => {
    if (isDragging) return;

    setDirection("left");
    setExitX(-500);

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

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productId = products[currentIndex].id;
    setSavedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const currentProduct = products[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 h-[90vh] sm:h-[80vh] max-h-[800px] sm:max-h-[600px] overflow-hidden">
        <TooltipProvider>
          <div className="relative h-full flex flex-col bg-black">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
              <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {currentIndex + 1} / {products.length}
              </div>
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

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center overflow-hidden touch-none">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProduct.id}
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
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  whileTap={{ scale: 0.98 }}
                  style={{ touchAction: "none" }}
                >
                  <div className="relative h-full flex flex-col">
                    {/* Product Image */}
                    <div className="relative flex-1 bg-muted overflow-hidden">
                      <img
                        src={currentProduct.image || "/placeholder.svg"}
                        alt={currentProduct.name}
                        className="h-full w-full object-cover"
                        loading="eager"
                        width={600}
                        height={600}
                      />
                      {currentProduct.trending && (
                        <Badge
                          className="absolute top-4 sm:top-16 left-4 bg-primary text-primary-foreground"
                          variant="secondary"
                        >
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold line-clamp-1">
                          {currentProduct.name}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm sm:text-base">
                            {currentProduct.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
                        <span>{currentProduct.category}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3.5 w-3.5" />
                          {currentProduct.plugsCount} plugs
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-lg font-bold sm:text-xl">
                            ₦{currentProduct.recommendedPrice.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <span>
                              ₦{currentProduct.profit.toLocaleString()} profit
                            </span>
                            <span className="rounded-full bg-green-900/50 px-1">
                              {currentProduct.profitMargin}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 min-w-0">
                          <Avatar className="h-6 w-6 border border-white/20 shrink-0">
                            <AvatarImage
                              src={
                                currentProduct.supplier.image ||
                                "/placeholder.svg"
                              }
                              alt={currentProduct.supplier.name}
                            />
                            <AvatarFallback>
                              {currentProduct.supplier.name
                                .charAt(0)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm truncate">
                            {currentProduct.supplier.name}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span>Market Fit</span>
                            <span className="font-medium">
                              {currentProduct.marketFitScore}%
                            </span>
                          </div>
                          <Progress
                            value={currentProduct.marketFitScore}
                            className="h-1 bg-white/20"
                           
                          />
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/80 hover:text-white"
                              aria-label="Market fit information"
                            >
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[250px]">
                            <p className="text-xs sm:text-sm">
                              Market Fit Score ({currentProduct.marketFitScore}
                              %) indicates how well this product matches your
                              audience based on your sales history and customer
                              demographics
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 px-4">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 text-red-500 border-red-200 shadow-lg",
                  "hover:bg-white hover:scale-105 transition-transform"
                )}
                onClick={handleSkip}
                aria-label="Skip product"
              >
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 border-amber-200 shadow-lg",
                  "hover:bg-white hover:scale-105 transition-transform",
                  savedProducts.includes(currentProduct.id)
                    ? "text-amber-500"
                    : "text-muted-foreground"
                )}
                onClick={handleSave}
                aria-label={
                  savedProducts.includes(currentProduct.id)
                    ? "Remove from saved"
                    : "Save product"
                }
              >
                <BookmarkPlus
                  className={cn(
                    "h-6 w-6 sm:h-7 sm:w-7",
                    savedProducts.includes(currentProduct.id) && "fill-current"
                  )}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 text-green-500 border-green-200 shadow-lg",
                  "hover:bg-white hover:scale-105 transition-transform"
                )}
                onClick={handleLike}
                aria-label="Add product to store"
              >
                <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
              </Button>
            </div>

            {/* Swipe Hint */}
            {currentIndex === 0 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                  Swipe left or right to browse
                </div>
              </motion.div>
            )}
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
