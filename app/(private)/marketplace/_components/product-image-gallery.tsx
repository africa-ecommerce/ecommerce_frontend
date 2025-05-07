// "use client";

// import { useState, useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Image from "next/image";

// interface ProductImageGalleryProps {
//   images: string[];
//   className?: string;
// }

// export function ProductImageGallery({
//   images,
//   className,
// }: ProductImageGalleryProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const imageContainerRef = useRef<HTMLDivElement>(null);

//   // Handle device type detection
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//     };

//     checkMobile();

//     // Throttled resize handler to improve performance
//     let resizeTimer: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(() => {
//         checkMobile();
//       }, 100);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(resizeTimer);
//     };
//   }, []);

//   const allMedia = [
//     ...(images || []).map((img) => ({ type: "image" as const, url: img })),
//   ];

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
//   };

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       handleNext(); // Swipe left
//     }

//     if (touchStart - touchEnd < -50) {
//       handlePrevious(); // Swipe right
//     }
//   };

//   return (
//     <div className={cn("relative w-full", className)}>
//       {/* Main media display with consistent dimensions */}
//       <div
//         ref={imageContainerRef}
//         className={cn(
//           "relative overflow-hidden bg-muted rounded-lg touch-pan-y mx-auto",
//           isMobile
//             ? "h-64 w-full" // Fixed height for mobile (16rem)
//             : "h-96 w-full max-w-4xl" // Fixed height for desktop (24rem)
//         )}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="h-full w-full"
//           >
//             {allMedia[currentIndex]?.type === "image" && (
//               <div className="relative h-full w-full">
//                 <Image
//                   src={allMedia[currentIndex].url || "/placeholder.svg"}
//                   alt={`Product image ${currentIndex + 1}`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 800px"
//                   priority={currentIndex === 0}
//                   className="object-contain w-full h-full"
//                   draggable="false"
//                 />
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation arrows */}
//         {allMedia.length > 1 && (
//           <>
//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 text-black",
//                 isMobile ? "h-7 w-7" : "h-8 w-8"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handlePrevious();
//               }}
//             >
//               <ChevronLeft className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
//               <span className="sr-only">Previous</span>
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 text-black",
//                 isMobile ? "h-7 w-7" : "h-8 w-8"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleNext();
//               }}
//             >
//               <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
//               <span className="sr-only">Next</span>
//             </Button>
//           </>
//         )}
//       </div>

//       {/* Gallery view under main image */}
//       {allMedia.length > 1 && (
//         <div className={cn("mt-4 w-full", isMobile ? "" : "max-w-4xl mx-auto")}>
//           <h3 className="text-sm font-medium mb-2">Gallery</h3>
//           <div className="grid grid-cols-4 gap-2">
//             {allMedia.map((media, index) => (
//               <button
//                 key={index}
//                 className={cn(
//                   "relative overflow-hidden rounded-md border-2 transition-all aspect-square",
//                   currentIndex === index
//                     ? "border-primary ring-2 ring-primary ring-opacity-50"
//                     : "border-transparent hover:border-gray-300"
//                 )}
//                 onClick={() => handleThumbnailClick(index)}
//               >
//                 {media.type === "image" && (
//                   <div className="relative h-full w-full">
//                     <Image
//                       src={media.url || "/placeholder.svg"}
//                       alt={`Gallery image ${index + 1}`}
//                       fill
//                       sizes="(max-width: 768px) 25vw, 120px"
//                       className="object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                 )}

//                 {currentIndex === index && (
//                   <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-primary" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  className?: string;
}

export function ProductImageGallery({
  images,
  className,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Handle device type detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const allMedia = images?.map((img) => ({ type: "image" as const, url: img }));

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Simplified touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      diff > 0 ? handleNext() : handlePrevious();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main media display */}
      <div
        ref={imageContainerRef}
        className={cn(
          "relative overflow-hidden bg-muted rounded-lg mx-auto",
          isMobile ? "h-64 w-full" : "h-96 w-full max-w-4xl"
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {allMedia[currentIndex]?.type === "image" && (
              <div className="relative h-full w-full">
                <Image
                  src={allMedia[currentIndex].url || "/placeholder.svg"}
                  alt={`Product image ${currentIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={currentIndex === 0}
                  className="object-contain w-full h-full"
                  draggable="false"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {allMedia.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 text-black",
                isMobile ? "h-7 w-7" : "h-8 w-8"
              )}
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 text-black",
                isMobile ? "h-7 w-7" : "h-8 w-8"
              )}
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail gallery */}
      {allMedia.length > 1 && (
        <div className={cn("mt-4 w-full", isMobile ? "" : "max-w-4xl mx-auto")}>
          <h3 className="text-sm font-medium mb-2">Gallery</h3>
          <div className="grid grid-cols-4 gap-2">
            {allMedia?.map((media, index) => (
              <button
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-md border-2 transition-all aspect-square",
                  currentIndex === index
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : "border-transparent hover:border-gray-300"
                )}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View image ${index + 1}`}
              >
                {media.type === "image" && (
                  <div className="relative h-full w-full">
                    <Image
                      src={media.url || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 120px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                {currentIndex === index && (
                  <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}