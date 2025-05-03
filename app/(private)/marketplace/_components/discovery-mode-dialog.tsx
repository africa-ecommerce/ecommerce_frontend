// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence, type PanInfo } from "framer-motion";
// import { BookmarkPlus, Plus, Star, Users, X } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Progress } from "@/components/ui/progress";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { cn } from "@/lib/utils";
// import Image from "next/image";



// interface DiscoveryModeDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   products: any[];
// }

// export function DiscoveryModeDialog({
//   open,
//   onOpenChange,
//   products,
// }: DiscoveryModeDialogProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState<"left" | "right" | null>(null);
//   const [likedProducts, setLikedProducts] = useState<string[]>([]);
//   const [savedProducts, setSavedProducts] = useState<string[]>([]);
//   const [exitX, setExitX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);

//   // Reset index when dialog opens
//   useEffect(() => {
//     if (open) {
//       setCurrentIndex(0);
//       setLikedProducts([]);
//       setSavedProducts([]);
//     }
//   }, [open]);

//   const handleDragEnd = (
//     event: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo
//   ) => {
//     setIsDragging(false);
//     const threshold = 100;
//     const velocityThreshold = 500;

//     if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
//       // Swiped right (like)
//       handleLike();
//     } else if (
//       info.offset.x < -threshold ||
//       info.velocity.x < -velocityThreshold
//     ) {
//       // Swiped left (skip)
//       handleSkip();
//     }
//   };

//   const handleDragStart = () => {
//     setIsDragging(true);
//   };

//   const handleLike = () => {
//     if (isDragging) return;

//     setDirection("right");
//     setExitX(500);
//     const currentProductId = products[currentIndex].id;
//     setLikedProducts((prev) => [...prev, currentProductId]);

//     // Move to next product after animation
//     setTimeout(() => {
//       if (currentIndex < products.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         onOpenChange(false);
//       }
//       setDirection(null);
//     }, 300);
//   };

//   const handleSkip = () => {
//     if (isDragging) return;

//     setDirection("left");
//     setExitX(-500);

//     // Move to next product after animation
//     setTimeout(() => {
//       if (currentIndex < products.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         onOpenChange(false);
//       }
//       setDirection(null);
//     }, 300);
//   };

//   const handleSave = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     const productId = products[currentIndex].id;
//     setSavedProducts((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const currentProduct = products[currentIndex];

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md p-0 gap-0 h-[90vh] sm:h-[80vh] max-h-[800px] sm:max-h-[600px] overflow-hidden">
//         <TooltipProvider>
//           <div className="relative h-full flex flex-col bg-black">
//             {/* Header */}
//             <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
             
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-full bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm"
//                 onClick={() => onOpenChange(false)}
//                 aria-label="Close discovery mode"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             {/* Card Stack */}
//             <div className="flex-1 flex items-center justify-center overflow-hidden touch-none">
//               <AnimatePresence initial={false} custom={direction} mode="wait">
//                 <motion.div
//                   key={currentProduct?.id}
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
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }}
//                   onDragStart={handleDragStart}
//                   onDragEnd={handleDragEnd}
//                   whileTap={{ scale: 0.98 }}
//                   style={{ touchAction: "none" }}
//                 >
//                   <div className="relative h-full flex flex-col">
//                     {/* Product Image */}
//                     <div className="relative flex-1 bg-muted overflow-hidden">
//                       <Image
//                         src={currentProduct?.images?.[0] || "/placeholder.svg"}
//                         alt={currentProduct?.name}
//                         className="h-full w-full object-cover"
//                         loading="eager"
//                         width={600}
//                         height={600}
//                       />
//                       {/* {currentProduct.trending && (
//                         <Badge
//                           className="absolute top-4 sm:top-16 left-4 bg-primary text-primary-foreground"
//                           variant="secondary"
//                         >
//                           Trending
//                         </Badge>
//                       )} */}
//                     </div>

//                     {/* Product Info */}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-xl font-bold line-clamp-1">
//                           {currentProduct?.name}
//                         </h3>
//                         <div className="flex items-center gap-1 shrink-0 ml-2">
//                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                           <span className="text-sm sm:text-base">
//                             {currentProduct?.rating}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
//                         <span>{currentProduct?.category}</span>
//                         <span>•</span>
//                         <div className="flex items-center">
//                           <Users className="mr-1 h-3.5 w-3.5" />
//                           {currentProduct?.plugsCount} plugs
//                         </div>
//                       </div>

//                       <div className="mt-2 flex items-center justify-between gap-2">
//                         <div>
//                           <div className="text-lg font-bold sm:text-xl">
//                             ₦{currentProduct?.price?.toLocaleString()}
//                           </div>
                          
//                         </div>

//                         <div className="flex items-center gap-1 min-w-0">
//                           <Avatar className="h-6 w-6 border border-white/20 shrink-0">
//                             <AvatarImage
//                               src={
//                                 currentProduct?.supplier?.image ||
//                                 "/placeholder.svg"
//                               }
//                               alt={currentProduct?.supplier?.name}
//                             />
//                             <AvatarFallback>
//                               {currentProduct?.supplier?.name?.charAt(0)
//                                 .toUpperCase()}
//                             </AvatarFallback>
//                           </Avatar>
//                           <span className="text-sm truncate">
//                             {currentProduct?.supplier?.name}
//                           </span>
//                         </div>
//                       </div>

                     
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Action Buttons */}
//             <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 px-4">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 text-red-500 border-red-200 shadow-lg",
//                   "hover:bg-white hover:scale-105 transition-transform"
//                 )}
//                 onClick={handleSkip}
//                 aria-label="Skip product"
//               >
//                 <X className="h-6 w-6 sm:h-7 sm:w-7" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 border-amber-200 shadow-lg",
//                   "hover:bg-white hover:scale-105 transition-transform",
//                   savedProducts.includes(currentProduct?.id)
//                     ? "text-amber-500"
//                     : "text-muted-foreground"
//                 )}
//                 onClick={handleSave}
//                 aria-label={
//                   savedProducts.includes(currentProduct?.id)
//                     ? "Remove from saved"
//                     : "Save product"
//                 }
//               >
//                 <BookmarkPlus
//                   className={cn(
//                     "h-6 w-6 sm:h-7 sm:w-7",
//                     savedProducts.includes(currentProduct?.id) && "fill-current"
//                   )}
//                 />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 text-green-500 border-green-200 shadow-lg",
//                   "hover:bg-white hover:scale-105 transition-transform"
//                 )}
//                 onClick={handleLike}
//                 aria-label="Add product to store"
//               >
//                 <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
//               </Button>
//             </div>

//             {/* Swipe Hint */}
//             {currentIndex === 0 && (
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.7 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
//                   Swipe left or right to browse
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </TooltipProvider>
//       </DialogContent>
//     </Dialog>
//   );
// }

//  export function DiscoveryModeDialog({ open, onOpenChange, products }: DiscoveryModeDialogProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [direction, setDirection] = useState<"left" | "right" | null>(null)
//   const [likedProducts, setLikedProducts] = useState<string[]>([])
//   const [savedProducts, setSavedProducts] = useState<string[]>([])
//   const [exitX, setExitX] = useState(0)
//   const [isDragging, setIsDragging] = useState(false)
//   const [progress, setProgress] = useState(0)

//   // Reset index when dialog opens
//   useEffect(() => {
//     if (open) {
//       setCurrentIndex(0)
//       setLikedProducts([])
//       setSavedProducts([])
//     }
//   }, [open])

//   // Update progress when current index changes
//   useEffect(() => {
//     if (products.length > 0) {
//       setProgress((currentIndex / (products.length - 1)) * 100)
//     }
//   }, [currentIndex, products.length])

//   const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
//     setIsDragging(false)
//     const threshold = 100
//     const velocityThreshold = 500

//     if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
//       // Swiped right (like)
//       handleLike()
//     } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
//       // Swiped left (skip)
//       handleSkip()
//     }
//   }

//   const handleDragStart = () => {
//     setIsDragging(true)
//   }

//   const handleLike = () => {
//     if (isDragging) return

//     setDirection("right")
//     setExitX(500)
//     const currentProductId = products[currentIndex].id
//     setLikedProducts((prev) => [...prev, currentProductId])

//     // Move to next product after animation
//     setTimeout(() => {
//       if (currentIndex < products.length - 1) {
//         setCurrentIndex(currentIndex + 1)
//       } else {
//         onOpenChange(false)
//       }
//       setDirection(null)
//     }, 300)
//   }

//   const handleSkip = () => {
//     if (isDragging) return

//     setDirection("left")
//     setExitX(-500)

//     // Move to next product after animation
//     setTimeout(() => {
//       if (currentIndex < products.length - 1) {
//         setCurrentIndex(currentIndex + 1)
//       } else {
//         onOpenChange(false)
//       }
//       setDirection(null)
//     }, 300)
//   }

//   const handleSave = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     const productId = products[currentIndex].id
//     setSavedProducts((prev) =>
//       prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
//     )
//   }

//   const currentProduct = products[currentIndex]

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md p-0 gap-0 h-[90vh] sm:h-[80vh] max-h-[800px] sm:max-h-[600px] overflow-hidden">
//         {/* Adding DialogTitle for accessibility - visually hidden but available to screen readers */}
//         <DialogTitle className="sr-only">Product Discovery</DialogTitle>

//         <TooltipProvider>
//           <div className="relative h-full flex flex-col bg-black">
//             {/* Header with Progress Bar */}
//             <div className="absolute top-0 left-0 right-0 z-10 flex flex-col">
//               <div className="w-full px-1 pt-1">
//                 <Progress value={progress} className="h-1 bg-white/20" />
//               </div>
//               <div className="flex items-center justify-between p-4">
//                 <Badge variant="outline" className="bg-black/70 text-white border-white/20 backdrop-blur-sm">
//                   {currentIndex + 1}/{products.length}
//                 </Badge>
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
//                 <motion.div
//                   key={currentProduct?.id}
//                   className="absolute w-full h-full"
//                   custom={direction}
//                   initial={{
//                     x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
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
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }}
//                   onDragStart={handleDragStart}
//                   onDragEnd={handleDragEnd}
//                   whileTap={{ scale: 0.98 }}
//                   style={{ touchAction: "none" }}
//                 >
//                   <div className="relative h-full flex flex-col">
//                     {/* Product Image */}
//                     <div className="relative flex-1 bg-muted overflow-hidden">
//                       <Image
//                         src={currentProduct?.images?.[0] || "/placeholder.svg"}
//                         alt={currentProduct?.name || "Product image"}
//                         className="h-full w-full object-cover"
//                         loading="eager"
//                         width={600}
//                         height={600}
//                       />
//                       {/* {currentProduct?.trending && (
//                         <Badge
//                           className="absolute top-4 sm:top-16 left-4 bg-primary text-primary-foreground"
//                           variant="secondary"
//                         >
//                           Trending
//                         </Badge>
//                       )} */}
//                     </div>

//                     {/* Product Info with improved styling */}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-xl font-bold line-clamp-1">{currentProduct?.name}</h3>
                        
//                       </div>

//                       <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
//                         <span>•</span>
//                         <div className="flex items-center">
//                           <Users className="mr-1 h-3.5 w-3.5" />
//                           <span className="font-medium">{currentProduct?.plugsCount}</span>{" "} plugs
//                         </div>
//                       </div>

//                       <div className="mt-3 flex items-center justify-between gap-2">
//                         <div>
//                           <div className="text-lg font-bold sm:text-xl">₦{currentProduct?.price?.toLocaleString()}</div>
//                           {/* {currentProduct?.originalPrice && (
//                             <div className="text-sm text-white/70 line-through">
//                               ₦{currentProduct?.originalPrice?.toLocaleString()}
//                             </div>
//                           )} */}
//                         </div>

//                         <div className="flex items-center gap-1 min-w-0 bg-white/10 px-2 py-1 rounded-full">
//                           <Avatar className="h-6 w-6 border border-white/20 shrink-0">
//                             <AvatarImage
//                               src={currentProduct?.supplier?.image || "/placeholder.svg" || "/placeholder.svg"}
//                               alt={currentProduct?.supplier?.name || "Supplier"}
//                             />
//                             <AvatarFallback>
//                               {currentProduct?.supplier?.name?.charAt(0).toUpperCase() || "S"}
//                             </AvatarFallback>
//                           </Avatar>
//                           <span className="text-sm truncate">{currentProduct?.supplier?.name}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Action Buttons with improved styling */}
//             <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 px-4">
             

//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className={cn(
//                       "h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 text-green-500 border-green-200 shadow-lg",
//                       "hover:bg-white hover:scale-105 transition-transform",
//                     )}
//                     onClick={handleLike}
//                     aria-label="Add product to store"
//                   >
//                     <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent side="top">Add to store</TooltipContent>
//               </Tooltip>
//             </div>

//             {/* Swipe Hint with improved animation */}
//             {currentIndex === 0 && (
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
//                     transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
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
//           </div>
//         </TooltipProvider>
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { BookmarkPlus, Info, Plus, Star, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn, truncateText } from "@/lib/utils"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { Product } from "@/types/product";


interface DiscoveryModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

export function DiscoveryModeDialog({ open, onOpenChange, products }: DiscoveryModeDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [savedProducts, setSavedProducts] = useState<string[]>([])
  const [exitX, setExitX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const isMobile = useIsMobile()

  // Reset index when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(0)
      setLikedProducts([])
      setSavedProducts([])
    }
  }, [open])

 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowLeft") {
        handleSkip()
      } else if (e.key === "ArrowRight") {
        handleLike()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentIndex])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 100
    const velocityThreshold = 500

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped right (like)
      handleLike()
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swiped left (skip)
      handleSkip()
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleLike = () => {
    if (isDragging) return

    setDirection("left")
    setExitX(-500)
    const currentProductId = products[currentIndex].id
    setLikedProducts((prev) => [...prev, currentProductId])

    // Move to next product after animation
    setTimeout(() => {
       if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        onOpenChange(false)
      }
      setDirection(null)
    }, 300)
  }

  const handleSkip = () => {
    if (isDragging) return

    setDirection("right")
    setExitX(500)

    // Move to next product after animation
    setTimeout(() => {
     if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else {
        onOpenChange(false)
      }
      setDirection(null)
    }, 300)
  }

 

  const currentProduct = products[currentIndex]

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
                    x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
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
                        <h3 className="text-base font-bold line-clamp-1 capitalize">{truncateText(currentProduct?.name)}</h3>
                       
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-sm text-white/80 flex-wrap">
                        
                        <span>•</span>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3.5 w-3.5" />
                          <span className="font-medium">{currentProduct?.plugsCount} {" "}</span>plugs
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-lg font-bold sm:text-xl">₦{currentProduct?.price?.toLocaleString()}</div>
                         
                        </div>

                        <div className="flex items-center gap-1 min-w-0 bg-white/10 px-2 py-1 rounded-full">
                          <Avatar className="h-6 w-6 border border-white/20 shrink-0">
                            <AvatarImage
                              src={currentProduct?.supplier?.image || "/placeholder.svg" || "/placeholder.svg"}
                              alt={currentProduct?.supplier?.name || "Supplier"}
                            />
                            <AvatarFallback>
                              {currentProduct?.supplier?.name?.charAt(0).toUpperCase() || "S"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm capitalize">{truncateText(currentProduct?.supplier?.name, 10)}</span>
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
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/95 text-blue-500 shadow-lg",
                      "hover:bg-white/95 hover:text-blue-500  hover:scale-105 transition-transform",
                    )}
                    onClick={handleSkip}
                    aria-label="Product info"
                  >
                    <Info className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Info</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/95 text-green-500 border-green-200 shadow-lg",
                      " hover:bg-white/95 hover:text-green-500 hover:scale-105 transition-transform",
                    )}
                    onClick={handleLike}
                    aria-label="Add product to store"
                  >
                    <Plus className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Add to store</TooltipContent>
              </Tooltip>
            </div>

            {/* Desktop Navigation Arrows */}
            {!isMobile && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={handleSkip}
                  aria-label="Previous product"
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
                  onClick={handleLike}
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
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
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
  )
}
