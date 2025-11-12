

// "use client";

// import type React from "react";

// import { useState, useEffect, useRef, useCallback } from "react";
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
//   const [dragDelta, setDragDelta] = useState(0);
//   const [swipeStartX, setSwipeStartX] = useState(0);
//   const { items, addItem } = useShoppingCart();
//   const [isAdding, setIsAdding] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showSwipeHint, setShowSwipeHint] = useState(true);
//   const cardRef = useRef<HTMLDivElement>(null);
//   // const swipeThreshold = 40; // Lower threshold for more sensitive swiping
//   const swipeThreshold = 50; // Optimized threshold for better UX
//   const SWIPE_VELOCITY = 1000; // Increased velocity threshold for quick swipes
//   const CARD_EXIT_OFFSET = 500; // Increased exit offset for smoother exit

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

//   // Hide swipe hint after a few seconds
//   useEffect(() => {
//     if (open && showSwipeHint) {
//       const timer = setTimeout(() => {
//         setShowSwipeHint(false);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [open, showSwipeHint]);

//   // Check if product is already in cart

//   const isMobile = useIsMobile();


//   // Reset index when dialog opens
//   useEffect(() => {
//     if (open) {
//       setCurrentIndex(0);
//       setShowSwipeHint(true);
//     }
//   }, [open]);

//   // Enhanced keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!open) return;

//       if (e.key === "ArrowLeft") {
//         handlePrev();
//       } else if (e.key === "ArrowRight") {
//         handleNext();
//       } else if (e.key === "Escape") {
//         onOpenChange(false);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [open, currentIndex]);

//   // Improved touch handlers for smoother mobile experience
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setSwipeStartX(e.touches[0].clientX);
//     setIsDragging(true);
//     setDragDelta(0);

//     // Clear any existing transforms for a fresh start
//     if (cardRef.current) {
//       cardRef.current.style.transition = "none";
//       cardRef.current.style.transform = "translateX(0px)";
//     }
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isDragging) return;

//     const currentX = e.touches[0].clientX;
//     const diff = currentX - swipeStartX;
//     setDragDelta(diff);

//     // Apply transform to the card with resistance for smoother feel
//     if (cardRef.current) {
//       // Add resistance effect - movement slows down as you drag further
//       const resistance = 0.6;
//       const moveX = diff * resistance;

//       // Apply the transform with a subtle rotation for a more natural feel
//       const rotate = moveX * 0.02; // Subtle rotation based on drag distance
//       cardRef.current.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
//     }
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (!isDragging) return;

//     const endX = e.changedTouches[0].clientX;
//     const diff = endX - swipeStartX;

//     // Reset the card with a smooth transition
//     if (cardRef.current) {
//       cardRef.current.style.transition = "transform 0.3s ease-out";
//       cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
//     }

//     // Process the swipe based on direction and distance
//     if (diff > swipeThreshold) {
//       // Delay the prev action slightly to allow the animation to complete
//       setTimeout(() => handlePrev(), 50);
//     } else if (diff < -swipeThreshold) {
//       // Delay the next action slightly to allow the animation to complete
//       setTimeout(() => handleNext(), 50);
//     }

//     setIsDragging(false);
//     setDragDelta(0);
//   };

  

//    const handleDragEnd = useCallback(
//      (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
//        const { offset, velocity } = info;
//        if (
//          Math.abs(velocity.x) > SWIPE_VELOCITY ||
//          Math.abs(offset.x) > swipeThreshold
//        ) {
//          const direction = velocity.x < 0 || offset.x < 0 ? "left" : "right";
//          direction === "left" ? handleNext() : handlePrev();
//        }
//      },
//      [currentIndex, products, hasNextPage]
//    );

//   const handleDragStart = () => {
//     setIsDragging(true);
//   };

//   const handleNext = useCallback(() => {
//     const newIndex = currentIndex + 1;
//     if (newIndex >= products.length && !hasNextPage) {
//       onOpenChange(false);
//       return;
//     }

//     setDirection("left");
//     setExitX(-CARD_EXIT_OFFSET);

//     setTimeout(() => {
//       if (newIndex < products.length) {
//         setCurrentIndex(newIndex);
//         if (newIndex >= products.length - 3 && hasNextPage && !isLoadingMore) {
//           loadMore();
//         }
//       } else if (hasNextPage) {
//         loadMore();
//       }
//     }, 0);
//   }, [currentIndex, products, hasNextPage, isLoadingMore]);

 
//        const handlePrev = useCallback(() => {
//          const newIndex = currentIndex - 1;
//          if (newIndex < 0) {
//            onOpenChange(false);
//            return;
//          }

//          setDirection("right");
//          setExitX(CARD_EXIT_OFFSET);

//          setTimeout(() => {
//            setCurrentIndex(newIndex);
//          }, 0);
//        }, [currentIndex]);
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
//             <div
//               className="flex-1 flex items-center justify-center overflow-hidden"
//               onTouchStart={handleTouchStart}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={handleTouchEnd}
//             >
//               <AnimatePresence initial={false} custom={direction} mode="wait">
//                 {products.length === 0 && !isLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center text-white">
//                     <div className="text-center p-6 bg-black/70 rounded-lg backdrop-blur-sm">
//                       <h3 className="text-xl font-bold mb-2">
//                         you have no products yet
//                       </h3>
                     
//                     </div>
//                   </div>
//                 )}
               

//                 <motion.div
//                   key={currentProduct?.id || `empty-product-${currentIndex}`}
//                   className="absolute w-full h-full"
//                   custom={direction}
//                   initial={{
//                     x:
//                       direction === "left"
//                         ? CARD_EXIT_OFFSET
//                         : direction === "right"
//                         ? -CARD_EXIT_OFFSET
//                         : 0,
//                     opacity: 0,
//                     scale: 0.95,
//                   }}
//                   animate={{
//                     x: 0,
//                     opacity: 1,
//                     scale: 1,
//                   }}
//                   exit={{
//                     x: exitX,
//                     opacity: 0,
//                     scale: 0.95,
//                   }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 20,
//                     mass: 0.5,
//                   }}
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }} // Disable elastic drag
//                   dragElastic={0.1}
//                   onDragStart={handleDragStart}
//                   onDragEnd={handleDragEnd}
//                   style={{ touchAction: "pan-y" }}
//                 >
//                   <div className="relative h-full flex flex-col">
//                     {/* Product Image */}
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
//                   disabled={currentIndex <= 0}
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
//                   disabled={currentIndex >= products.length - 1 && !hasNextPage}
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

//             {/* Swipe Hint with improved animation - only shown at first */}
//             {currentIndex === 0 && isMobile && showSwipeHint && (
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//               >
//                 <motion.div
//                   className="bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-md flex items-center gap-2 z-50"
//                   animate={{
//                     x: [0, -10, 10, 0],
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
//                       repeat: 3,
//                     }}
//                   >
//                     👆
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             )}

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

import { useState, useEffect, useRef, useCallback } from "react";
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
  const swipeThreshold = 50;
  const SWIPE_VELOCITY = 1000;
  const CARD_EXIT_OFFSET = 500;

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
    if (!currentProduct?.images || currentProduct.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentProduct?.images]);

  useEffect(() => {
    if (open && showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, showSwipeHint]);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setShowSwipeHint(true);
    }
  }, [open]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartX(e.touches[0].clientX);
    setIsDragging(true);
    setDragDelta(0);

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

    if (cardRef.current) {
      const resistance = 0.6;
      const moveX = diff * resistance;
      const rotate = moveX * 0.02;
      cardRef.current.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - swipeStartX;

    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.3s ease-out";
      cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
    }

    if (diff > swipeThreshold) {
      setTimeout(() => handlePrev(), 50);
    } else if (diff < -swipeThreshold) {
      setTimeout(() => handleNext(), 50);
    }

    setIsDragging(false);
    setDragDelta(0);
  };

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      if (
        Math.abs(velocity.x) > SWIPE_VELOCITY ||
        Math.abs(offset.x) > swipeThreshold
      ) {
        const direction = velocity.x < 0 || offset.x < 0 ? "left" : "right";
        direction === "left" ? handleNext() : handlePrev();
      }
    },
    [currentIndex, products, hasNextPage]
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleNext = useCallback(() => {
    const newIndex = currentIndex + 1;
    if (newIndex >= products.length && !hasNextPage) {
      onOpenChange(false);
      return;
    }

    setDirection("left");
    setExitX(-CARD_EXIT_OFFSET);

    setTimeout(() => {
      if (newIndex < products.length) {
        setCurrentIndex(newIndex);
        if (newIndex >= products.length - 3 && hasNextPage && !isLoadingMore) {
          loadMore();
        }
      } else if (hasNextPage) {
        loadMore();
      }
    }, 0);
  }, [currentIndex, products, hasNextPage, isLoadingMore]);

  const handlePrev = useCallback(() => {
    const newIndex = currentIndex - 1;
    if (newIndex < 0) {
      onOpenChange(false);
      return;
    }

    setDirection("right");
    setExitX(CARD_EXIT_OFFSET);

    setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 0);
  }, [currentIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 h-[90vh] sm:h-[80vh] max-h-[800px] sm:max-h-[600px] overflow-hidden">
        <DialogTitle className="sr-only">Product Discovery</DialogTitle>

        <TooltipProvider>
          <div className="relative h-full flex flex-col bg-black">
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
                        You have no products yet
                      </h3>
                    </div>
                  </div>
                )}

                <motion.div
                  key={currentProduct?.id || `empty-product-${currentIndex}`}
                  className="absolute w-full h-full"
                  custom={direction}
                  initial={{
                    x:
                      direction === "left"
                        ? CARD_EXIT_OFFSET
                        : direction === "right"
                        ? -CARD_EXIT_OFFSET
                        : 0,
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    x: exitX,
                    opacity: 0,
                    scale: 0.95,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  style={{ touchAction: "pan-y" }}
                >
                  <div className="relative h-full flex flex-col">
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
                          
                          {/* Image indicators */}
                          {currentProduct.images.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                              {currentProduct.images.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-1.5 rounded-full transition-all ${
                                    index === currentImageIndex
                                      ? "w-6 bg-white"
                                      : "w-1.5 bg-white/50"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold line-clamp-1 capitalize">
                          {truncateText(currentProduct?.name)}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
                        <span className="capitalize text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          {currentProduct?.category?.replace(/_/g, " ")}
                        </span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3.5 w-3.5" />
                          <span className="font-medium">
                            {formatQuantity(currentProduct?.plugsCount || 0)}{" "}
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
                          {currentProduct?.moq && currentProduct.moq > 1 && (
                            <div className="text-xs text-white/60">
                              MOQ: {currentProduct.moq} units
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm capitalize">
                            {formatQuantity(currentProduct?.sold || 0)} sold
                          </span>
                          {currentProduct?.stock !== undefined && (
                            <span className="text-xs text-white/60">
                              {currentProduct.stock} in stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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
                <TooltipContent side="top">View Details</TooltipContent>
              </Tooltip>
            </div>

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

            {currentIndex === 0 && !isMobile && (
              <div className="absolute bottom-24 left-0 right-0 flex justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                  Use ← → arrow keys to navigate
                </div>
              </div>
            )}

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