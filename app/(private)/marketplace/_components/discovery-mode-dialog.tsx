// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence, type PanInfo } from "framer-motion";
// import { Info, Plus, Users, X } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { cn, formatQuantity, truncateText } from "@/lib/utils";
// import Image from "next/image";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
// import { useUser } from "@/app/_components/provider/UserContext";
// import Link from "next/link";
// import { useInView } from "react-intersection-observer";

// interface DiscoveryModeDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   products: any[];
//   isLoading?: boolean;
//   isLoadingMore?: boolean;
//   hasNextPage?: boolean;
//   loadMore: () => void;
// }

// export function DiscoveryModeDialog({
//   open,
//   onOpenChange,
//   products,
//   isLoading = false,
//   isLoadingMore = false,
//   hasNextPage = false,
//   loadMore,
// }: DiscoveryModeDialogProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState<"left" | "right" | null>(null);
//   const [exitX, setExitX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const { items, addItem } = useShoppingCart();
//   const [isAdding, setIsAdding] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const { userData } = useUser();

//   const currentProduct = products[currentIndex];

//   const { ref: loadingRef, inView } = useInView({
//     threshold: 0.5,
//     triggerOnce: false,
//   });

//   useEffect(() => {
//     if (
//       inView &&
//       hasNextPage &&
//       !isLoadingMore &&
//       currentIndex >= products.length - 3
//     ) {
//       loadMore();
//     }
//   }, [
//     inView,
//     hasNextPage,
//     isLoadingMore,
//     loadMore,
//     currentIndex,
//     products.length,
//   ]);

//   useEffect(() => {
//     // Only set up the carousel if there are multiple images
//     if (!currentProduct?.images || currentProduct.images.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === currentProduct.images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, [currentProduct?.images]);

//   // Check if product is already in cart
//   const isInCart = items.some((item) => item.id === currentProduct?.id);

//   const isMobile = useIsMobile();

//   const handleAddToStore = (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent card click when clicking the button
//     e.stopPropagation(); // Stop event propagation

//     if (isInCart) return; // Don't add if already in cart

//     setIsAdding(true);

//     // Create cart item from product
//     const cartItem = {
//       id: currentProduct.id,
//       name: currentProduct.name,
//       price: currentProduct.price,
//       image:
//         currentProduct.images && currentProduct.images.length > 0
//           ? currentProduct.images[0]
//           : "/placeholder.svg",
//     };

//     // Add item to cart after a short delay to show loading state
//     setTimeout(() => {
//       addItem(cartItem, false); // Pass false to prevent opening the cart
//       setIsAdding(false);
//     }, 800);
//   };

//   // Reset index when dialog opens
//   useEffect(() => {
//     if (open) {
//       setCurrentIndex(0);
     
//     }
//   }, [open]);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!open) return;

//       if (e.key === "ArrowLeft") {
//         handlePrev();
//       } else if (e.key === "ArrowRight") {
//         handleNext();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [open, currentIndex]);

//   const handleDragEnd = (
//     event: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo
//   ) => {
//     setIsDragging(false);
//     const threshold = 100;
//     const velocityThreshold = 500;

//     if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
//       // Swiped right (like)
//       handleNext();
//     } else if (
//       info.offset.x < -threshold ||
//       info.velocity.x < -velocityThreshold
//     ) {
//       // Swiped left (skip)
//       handlePrev();
//     }
//   };

//   const handleDragStart = () => {
//     setIsDragging(true);
//   };

//   const handleNext = () => {
//     if (isDragging) return;

//     setDirection("left");
//     setExitX(-500);
//     const currentProductId = products[currentIndex]?.id;
    

//     // Move to next product after animation
//     setTimeout(() => {
//       if (currentIndex < products.length - 1) {
//         setCurrentIndex(currentIndex + 1);

//         // If we're approaching the end of loaded products, trigger loading more
//         if (
//           currentIndex >= products.length - 3 &&
//           hasNextPage &&
//           !isLoadingMore
//         ) {
//           loadMore();
//         }
//       } else if (hasNextPage) {
//         // If we're at the end but more products can be loaded, show loading state
//         loadMore();
//       } else {
//         onOpenChange(false);
//       }
//       setDirection(null);
//     }, 300);
//   };

//   const handlePrev = () => {
//     if (isDragging) return;

//     setDirection("right");
//     setExitX(500);

//     // Move to next product after animation
//     setTimeout(() => {
//       if (currentIndex > 0) {
//         setCurrentIndex(currentIndex - 1);
//       } else {
//         onOpenChange(false);
//       }
//       setDirection(null);
//     }, 300);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md p-0 gap-0 h-[90vh] sm:h-[80vh] max-h-[800px] sm:max-h-[600px] overflow-hidden">
//         {/* Adding DialogTitle for accessibility - visually hidden but available to screen readers */}
//         <DialogTitle className="sr-only">Product Discovery</DialogTitle>

//         <TooltipProvider>
//           <div className="relative h-full flex flex-col bg-black">
//             {/* Header with Progress Bar */}
//             <div className="absolute top-0 left-0 right-0 z-10 flex flex-col">
//               <div className="flex items-center justify-end p-4">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="rounded-full bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm"
//                   onClick={() => onOpenChange(false)}
//                   aria-label="Close discovery mode"
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* Card Stack */}
//             <div className="flex-1 flex items-center justify-center overflow-hidden touch-none">
//               <AnimatePresence initial={false} custom={direction} mode="wait">
//                 {products.length === 0 && !isLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center text-white">
//                     <div className="text-center p-6 bg-black/70 rounded-lg backdrop-blur-sm">
//                       <h3 className="text-xl font-bold mb-2">
//                         No products found
//                       </h3>
//                       <p className="text-white/70">
//                         Try adjusting your filters or check back later.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 <motion.div
//                   key={currentProduct?.id || `empty-product-${currentIndex}`}
//                   className="absolute w-full h-full"
//                   custom={direction}
//                   initial={{
//                     x:
//                       direction === "right"
//                         ? 300
//                         : direction === "left"
//                         ? -300
//                         : 0,
//                     opacity: 0,
//                     scale: 0.9,
//                   }}
//                   animate={{
//                     x: 0,
//                     opacity: 1,
//                     scale: 1,
//                   }}
//                   exit={{
//                     x: exitX,
//                     opacity: 0,
//                     scale: 0.8,
//                   }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 30,
//                   }}
//                   drag={isMobile ? "x" : false}
//                   dragConstraints={{ left: 0, right: 0 }}
//                   onDragStart={handleDragStart}
//                   onDragEnd={handleDragEnd}
//                   whileTap={{ scale: 0.98 }}
//                   style={{ touchAction: "none" }}
//                 >
//                   <div className="relative h-full flex flex-col">
//                     {/* Product Image */}
//                     {/* Product Image - FIXED */}
//                     {currentProduct?.images &&
//                       currentProduct.images.length > 0 && (
//                         <div className="relative flex-1 bg-muted overflow-hidden">
//                           {currentProduct.images.map((image, index) => (
//                             <div
//                               key={index}
//                               className={`absolute inset-0 transition-opacity duration-1000 ${
//                                 index === currentImageIndex
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               }`}
//                             >
//                               <Image
//                                 src={image || "/placeholder.svg"}
//                                 alt={currentProduct?.name || "Product image"}
//                                 className="h-full w-full object-cover"
//                                 loading="lazy"
//                                 width={600}
//                                 height={600}
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       )}

//                     {/* Product Info with improved styling */}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-base font-bold line-clamp-1 capitalize">
//                           {truncateText(currentProduct?.name)}
//                         </h3>
//                       </div>

//                       <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
//                         <span>•</span>
//                         <div className="flex items-center">
//                           <Users className="mr-1 h-3.5 w-3.5" />
//                           <span className="font-medium">
//                             {formatQuantity(currentProduct?.plugsCount)}{" "}
//                             {currentProduct?.plugsCount === 1
//                               ? "plug"
//                               : "plugs"}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="mt-3 flex items-center justify-between gap-2">
//                         <div>
//                           <div className="text-lg font-bold sm:text-xl">
//                             ₦{currentProduct?.price?.toLocaleString()}
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1">
//                           <span className="text-sm capitalize">
//                             {formatQuantity(currentProduct?.sales) || 0} sold
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Skeleton loading state */}
//             {(!currentProduct || isLoading) && (
//               <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
//                 <div className="w-full h-full flex flex-col">
//                   <div className="flex-1 bg-gray-800 animate-pulse"></div>
//                   <div className="h-32 p-4 bg-gray-900">
//                     <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse mb-2"></div>
//                     <div className="h-4 w-1/2 bg-gray-800 rounded animate-pulse mb-4"></div>
//                     <div className="h-6 w-1/3 bg-gray-800 rounded animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons with improved styling */}
//             <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 px-4">
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link href={`/marketplace/product/${currentProduct?.id}`}>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className={cn(
//                         "h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/95 text-blue-500 shadow-lg",
//                         "hover:bg-white/95 hover:text-blue-500 hover:scale-105 transition-transform"
//                       )}
//                       aria-label="Product info"
//                     >
//                       <Info className="h-5 w-5 md:h-6 md:w-6" />
//                     </Button>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="top">Info</TooltipContent>
//               </Tooltip>

//               {userData.user?.userType === "PLUG" && (
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className={cn(
//                         "h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/95 text-green-500 border-green-200 shadow-lg",
//                         " hover:bg-white/95 hover:text-green-500 hover:scale-105 transition-transform"
//                       )}
//                       onClick={handleAddToStore}
//                       disabled={
//                         isAdding || isInCart || currentProduct?.isPlugged
//                       }
//                       aria-label="Add product to store"
//                     >
//                       <Plus className="h-5 w-5 md:h-6 md:w-6" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent side="top">Add to store</TooltipContent>
//                 </Tooltip>
//               )}
//             </div>

//             {/* Desktop Navigation Arrows */}
//             {!isMobile && (
//               <>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
//                   aria-label="Previous product"
//                   onClick={handlePrev}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-chevron-left"
//                   >
//                     <path d="m15 18-6-6 6-6" />
//                   </svg>
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
//                   onClick={handleNext}
//                   aria-label="Next product"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-chevron-right"
//                   >
//                     <path d="m9 18 6-6-6-6" />
//                   </svg>
//                 </Button>
//               </>
//             )}

//             {/* Swipe Hint with improved animation */}
//             {currentIndex === 0 && isMobile && (
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//               >
//                 <motion.div
//                   className="bg-black/50 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm flex items-center gap-2"
//                   animate={{
//                     x: [0, -20, 20, 0],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <span>Swipe left or right to browse</span>
//                   <motion.div
//                     animate={{ x: [-5, 5, -5] }}
//                     transition={{
//                       duration: 1,
//                       repeat: Number.POSITIVE_INFINITY,
//                     }}
//                   >
//                     👆
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             )}

//             {/* Like/Skip indicators that appear during swipe */}
//             <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-8">
//               <motion.div
//                 className="bg-red-500/80 text-white font-bold text-xl p-3 rounded-lg rotate-[-20deg]"
//                 initial={{ opacity: 0 }}
//                 animate={{
//                   opacity: isDragging && direction === "left" ? 0.9 : 0,
//                 }}
//               >
//                 SKIP
//               </motion.div>
//               <motion.div
//                 className="bg-green-500/80 text-white font-bold text-xl p-3 rounded-lg rotate-[20deg]"
//                 initial={{ opacity: 0 }}
//                 animate={{
//                   opacity: isDragging && direction === "right" ? 0.9 : 0,
//                 }}
//               >
//                 ADD
//               </motion.div>
//             </div>

//             {/* Desktop Keyboard Instructions */}
//             {currentIndex === 0 && !isMobile && (
//               <div className="absolute bottom-24 left-0 right-0 flex justify-center">
//                 <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
//                   Use ← → arrow keys to navigate
//                 </div>
//               </div>
//             )}

//             {/* Infinite scroll loading indicator */}
//             {hasNextPage && (
//               <div
//                 ref={loadingRef}
//                 className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none"
//               >
//                 {isLoadingMore && (
//                   <div className="bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     <span className="text-sm">Loading more...</span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </TooltipProvider>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Info, Plus, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatQuantity, truncateText } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { useUser } from "@/app/_components/provider/UserContext";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface DiscoveryModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: any[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNextPage?: boolean;
  loadMore: () => void;
}

export function DiscoveryModeDialog({
  open,
  onOpenChange,
  products,
  isLoading = false,
  isLoadingMore = false,
  hasNextPage = false,
  loadMore,
}: DiscoveryModeDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [exitX, setExitX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const { items, addItem } = useShoppingCart();
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 40; // Lower threshold for more sensitive swiping

  const { userData } = useUser();

  const currentProduct = products[currentIndex];

  const { ref: loadingRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isLoadingMore &&
      currentIndex >= products.length - 3
    ) {
      loadMore();
    }
  }, [
    inView,
    hasNextPage,
    isLoadingMore,
    loadMore,
    currentIndex,
    products.length,
  ]);

  useEffect(() => {
    // Only set up the carousel if there are multiple images
    if (!currentProduct?.images || currentProduct.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentProduct?.images]);

  // Hide swipe hint after a few seconds
  useEffect(() => {
    if (open && showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, showSwipeHint]);

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
      setShowSwipeHint(true);
    }
  }, [open]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex]);

  // Improved touch handlers for smoother mobile experience
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartX(e.touches[0].clientX);
    setIsDragging(true);
    setDragDelta(0);

    // Clear any existing transforms for a fresh start
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
      cardRef.current.style.transform = "translateX(0px)";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - swipeStartX;
    setDragDelta(diff);

    // Apply transform to the card with resistance for smoother feel
    if (cardRef.current) {
      // Add resistance effect - movement slows down as you drag further
      const resistance = 0.6;
      const moveX = diff * resistance;

      // Apply the transform with a subtle rotation for a more natural feel
      const rotate = moveX * 0.02; // Subtle rotation based on drag distance
      cardRef.current.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - swipeStartX;

    // Reset the card with a smooth transition
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.3s ease-out";
      cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
    }

    // Process the swipe based on direction and distance
    if (diff > swipeThreshold) {
      // Delay the prev action slightly to allow the animation to complete
      setTimeout(() => handlePrev(), 50);
    } else if (diff < -swipeThreshold) {
      // Delay the next actio  n slightly to allow the animation to complete
      setTimeout(() => handleNext(), 50);
    }

    setIsDragging(false);
    setDragDelta(0);
  };

  // Framer Motion drag handlers (fallback)
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 40; // Reduced threshold for more sensitive response
    const velocityThreshold = 200; // Reduced velocity threshold for more responsive feel

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped right
      handlePrev();
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      // Swiped left
      handleNext();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleNext = () => {
    if (currentIndex >= products.length - 1 && !hasNextPage) {
      onOpenChange(false);
      return;
    }

    setDirection("left");
    setExitX(-300);

    // Move to next product after animation
    setTimeout(() => {
      if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);

        // If we're approaching the end of loaded products, trigger loading more
        if (
          currentIndex >= products.length - 3 &&
          hasNextPage &&
          !isLoadingMore
        ) {
          loadMore();
        }
      } else if (hasNextPage) {
        // If we're at the end but more products can be loaded, show loading state
        loadMore();
      } else {
        onOpenChange(false);
      }
      setDirection(null);
    }, 200);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) {
      onOpenChange(false);
      return;
    }

    setDirection("right");
    setExitX(300);

    // Move to previous product after animation
    // setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        onOpenChange(false);
      }
      setDirection(null);
    // }, 200);
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
            <div
              className="flex-1 flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {products.length === 0 && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center p-6 bg-black/70 rounded-lg backdrop-blur-sm">
                      <h3 className="text-xl font-bold mb-2">
                        No products found
                      </h3>
                      <p className="text-white/70">
                        Try adjusting your filters or check back later.
                      </p>
                    </div>
                  </div>
                )}
                <motion.div
                  ref={cardRef}
                  key={currentProduct?.id || `empty-product-${currentIndex}`}
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
                    scale: 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    mass: 0.8,
                  }}
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: -120, right: 120 }}
                  dragElastic={0.9}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  whileTap={{ scale: 0.98 }}
                  style={{ touchAction: "pan-y" }}
                >
                  <div className="relative h-full flex flex-col">
                    {/* Product Image */}
                    {currentProduct?.images &&
                      currentProduct.images.length > 0 && (
                        <div className="relative flex-1 bg-muted overflow-hidden">
                          {currentProduct.images.map((image, index) => (
                            <div
                              key={index}
                              className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentImageIndex
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={currentProduct?.name || "Product image"}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                width={600}
                                height={600}
                              />
                            </div>
                          ))}
                        </div>
                      )}

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
                            {formatQuantity(currentProduct?.plugsCount)}{" "}
                            {currentProduct?.plugsCount === 1
                              ? "plug"
                              : "plugs"}
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
                            {formatQuantity(currentProduct?.sales) || 0} sold
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Skeleton loading state */}
            {(!currentProduct || isLoading) && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 bg-gray-800 animate-pulse"></div>
                  <div className="h-32 p-4 bg-gray-900">
                    <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-800 rounded animate-pulse mb-4"></div>
                    <div className="h-6 w-1/3 bg-gray-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

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
                      disabled={
                        isAdding || isInCart || currentProduct?.isPlugged
                      }
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
                  disabled={currentIndex <= 0}
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
                  disabled={currentIndex >= products.length - 1 && !hasNextPage}
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

            {/* Swipe Hint with improved animation - only shown at first */}
            {currentIndex === 0 && isMobile && showSwipeHint && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-md flex items-center gap-2 z-50"
                  animate={{
                    x: [0, -10, 10, 0],
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
                      repeat: 3,
                    }}
                  >
                    👆
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Desktop Keyboard Instructions */}
            {currentIndex === 0 && !isMobile && (
              <div className="absolute bottom-24 left-0 right-0 flex justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                  Use ← → arrow keys to navigate
                </div>
              </div>
            )}

            {/* Infinite scroll loading indicator */}
            {hasNextPage && (
              <div
                ref={loadingRef}
                className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none"
              >
                {isLoadingMore && (
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="text-sm">Loading more...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}