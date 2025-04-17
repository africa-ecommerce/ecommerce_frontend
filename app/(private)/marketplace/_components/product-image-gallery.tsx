// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ChevronLeft, ChevronRight, Expand, Play, Box } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import Image from "next/image"

// interface ProductImageGalleryProps {
//   images: string[]
//   videos?: string[]
//   onExpandClick?: () => void
//   onVideoPlayClick?: (videoUrl: string) => void
//   className?: string
// }

// export function ProductImageGallery({
//   images,
//   videos = [],
//   onExpandClick,
//   onVideoPlayClick,
//   className,
// }: ProductImageGalleryProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isZoomed, setIsZoomed] = useState(false)
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
//   const [touchStart, setTouchStart] = useState(0)
//   const [touchEnd, setTouchEnd] = useState(0)
//   const [isMobile, setIsMobile] = useState(false)
//   const imageContainerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768)
//     checkMobile()
//     window.addEventListener('resize', checkMobile)
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   const allMedia = [
//   ...(images || []).map((img) => ({ type: "image" as const, url: img })),
//   ...(videos || []).map((video) => ({ type: "video" as const, url: video })),
// ];

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
//     setIsZoomed(false)
//   }

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
//     setIsZoomed(false)
//   }

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(index)
//     setIsZoomed(false)
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isZoomed || !imageContainerRef.current) return

//     const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
//     const x = ((e.clientX - left) / width) * 100
//     const y = ((e.clientY - top) / height) * 100

//     setZoomPosition({ x, y })
//   }

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX)
//   }

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX)
//   }

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       handleNext() // Swipe left
//     }

//     if (touchStart - touchEnd < -50) {
//       handlePrevious() // Swipe right
//     }
//   }

//   const toggleZoom = () => {
//     if (allMedia[currentIndex].type !== "image") return
//     setIsZoomed(!isZoomed)
//   }

//   const handleExpandClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     onExpandClick?.()
//   }

  

//   const handleVideoPlayClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (allMedia[currentIndex].type === "video") {
//       onVideoPlayClick?.(allMedia[currentIndex].url)
//     }
//   }

//   return (
//     <div className={cn("relative", className)}>
//       {/* Main media display */}
//       <div
//         ref={imageContainerRef}
//         className={cn(
//           "relative aspect-square overflow-hidden bg-muted rounded-lg touch-pan-y",
//           isZoomed && "cursor-zoom-out",
//           !isZoomed && allMedia[currentIndex]?.type === "image" && "cursor-zoom-in",
//         )}
//         onClick={toggleZoom}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={() => setIsZoomed(false)}
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
//                   className={cn(
//                     "h-full w-full object-contain transition-transform duration-300",
//                     isZoomed ? "scale-150" : "scale-100",
//                   )}
//                   style={
//                     isZoomed
//                       ? {
//                           transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                         }
//                       : undefined
//                   }
//                   draggable="false"
//                 />
//               </div>
//             )}

//             {allMedia[currentIndex]?.type === "video" && (
//               <div className="relative h-full w-full flex items-center justify-center bg-black">
//                 <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black" />
//                 <Image
//                   src={`/placeholder.svg?height=500&width=500&text=Video+Thumbnail`}
//                   alt={`Video thumbnail ${currentIndex + 1}`}
//                   className="h-full w-full object-cover opacity-70"
//                   draggable="false"
//                 />
//                 <Button
//                   variant="secondary"
//                   size={isMobile ? "sm" : "default"}
//                   className={cn(
//                     "absolute rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50",
//                     isMobile ? "h-12 w-12" : "h-16 w-16"
//                   )}
//                   onClick={handleVideoPlayClick}
//                 >
//                   <Play className={cn("text-white fill-white", isMobile ? "h-6 w-6" : "h-8 w-8")} />
//                 </Button>
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
//                 e.stopPropagation()
//                 handlePrevious()
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
//                 e.stopPropagation()
//                 handleNext()
//               }}
//             >
//               <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
//               <span className="sr-only">Next</span>
//             </Button>
//           </>
//         )}

//         {/* Expand button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className={cn(
//             "absolute right-2 top-2 rounded-full bg-white/70 hover:bg-white/90 text-black",
//             isMobile ? "h-7 w-7" : "h-8 w-8"
//           )}
//           onClick={handleExpandClick}
//         >
//           <Expand className={isMobile ? "h-3 w-3" : "h-4 w-4"} />
//           <span className="sr-only">Expand</span>
//         </Button>

//         {/* Mobile zoom indicator */}
//         {isMobile && allMedia[currentIndex].type === "image" && (
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center">
//             <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full">
//               {isZoomed ? "Pinch to zoom out" : "Double tap or pinch to zoom"}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Thumbnails */}
//       {allMedia.length > 1 && (
//         <div className="mt-3 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
//           {allMedia.map((media, index) => (
//             <button
//               key={index}
//               className={cn(
//                 "relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
//                 currentIndex === index 
//                   ? "border-primary scale-105" 
//                   : "border-transparent hover:border-gray-300",
//                 isMobile ? "h-14 w-14" : "h-16 w-16"
//               )}
//               onClick={() => handleThumbnailClick(index)}
//             >
//               {media.type === "image" && (
//                 <Image
//                  height={64}
//                   width={64}
//                   src={media.url || "/placeholder.svg"}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="h-full w-full object-cover"
//                   loading="lazy"
//                 />
//               )}
//               {media.type === "video" && (
//                 <div className="relative h-full w-full">
//                   <Image
//                   height={64}
//                   width={64}
//                     src={`/placeholder.svg?height=64&width=64&text=Video`}
//                     alt={`Video thumbnail ${index + 1}`}
//                     className="h-full w-full object-cover"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <Play className="h-3 w-3 text-white" />
//                   </div>
//                 </div>
//               )}
             
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Expand, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interfacef ProductImageGalleryProps {
  images: string[];
  videos?: string[];
  onExpandClick?: () => void;
  onVideoPlayClick?: (videoUrl: string) => void;
  className?: string;
}

export function ProductImageGallery({
  images,
  videos = [],
  onExpandClick,
  onVideoPlayClick,
  className,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);

    checkMobile();
    updateViewportHeight();

    window.addEventListener("resize", () => {
      checkMobile();
      updateViewportHeight();
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  const allMedia = [
    ...(images || []).map((img) => ({ type: "image" as const, url: img })),
    ...(videos || []).map((video) => ({ type: "video" as const, url: video })),
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext(); // Swipe left
    }

    if (touchStart - touchEnd < -50) {
      handlePrevious(); // Swipe right
    }
  };

  const toggleZoom = () => {
    if (allMedia[currentIndex]?.type !== "image") return;
    setIsZoomed(!isZoomed);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpandClick?.();
  };

  const handleVideoPlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allMedia[currentIndex]?.type === "video") {
      onVideoPlayClick?.(allMedia[currentIndex].url);
    }
  };

  // Calculate main image height (3/4 of viewport height on desktop)
  const mainImageHeight = !isMobile
    ? Math.floor(viewportHeight * 0.75)
    : "auto";

  return (
    <div className={cn("relative", className)}>
      {/* Main media display */}
      <div
        ref={imageContainerRef}
        style={{
          height: isMobile ? "auto" : `${mainImageHeight}px`,
          maxHeight: isMobile ? "auto" : `${mainImageHeight}px`,
        }}
        className={cn(
          "relative overflow-hidden bg-muted rounded-lg touch-pan-y",
          isMobile ? "aspect-square" : "",
          isZoomed && "cursor-zoom-out",
          !isZoomed &&
            allMedia[currentIndex]?.type === "image" &&
            "cursor-zoom-in"
        )}
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
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
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority={currentIndex === 0}
                  className={cn(
                    "object-contain transition-transform duration-300",
                    isZoomed ? "scale-150" : "scale-100"
                  )}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : undefined
                  }
                  draggable="false"
                />
              </div>
            )}

            {allMedia[currentIndex]?.type === "video" && (
              <div className="relative h-full w-full flex items-center justify-center bg-black">
                <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black" />
                <Image
                  src="/placeholder.svg"
                  alt={`Video thumbnail ${currentIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover opacity-70"
                  draggable="false"
                />
                <Button
                  variant="secondary"
                  size={isMobile ? "sm" : "default"}
                  className={cn(
                    "absolute rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50",
                    isMobile ? "h-12 w-12" : "h-16 w-16"
                  )}
                  onClick={handleVideoPlayClick}
                >
                  <Play
                    className={cn(
                      "text-white fill-white",
                      isMobile ? "h-6 w-6" : "h-8 w-8"
                    )}
                  />
                </Button>
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
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 text-black",
                isMobile ? "h-7 w-7" : "h-8 w-8"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
              <span className="sr-only">Next</span>
            </Button>
          </>
        )}

        {/* Expand button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-2 rounded-full bg-white/70 hover:bg-white/90 text-black",
            isMobile ? "h-7 w-7" : "h-8 w-8"
          )}
          onClick={handleExpandClick}
        >
          <Expand className={isMobile ? "h-3 w-3" : "h-4 w-4"} />
          <span className="sr-only">Expand</span>
        </Button>

        {/* Mobile zoom indicator */}
        {isMobile && allMedia[currentIndex]?.type === "image" && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full">
              {isZoomed ? "Pinch to zoom out" : "Double tap or pinch to zoom"}
            </span>
          </div>
        )}
      </div>

      {/* Gallery view under main image */}
      {allMedia.length > 1 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Gallery</h3>
          <div
            className={cn(
              "grid gap-2",
              isMobile ? "grid-cols-3" : "grid-cols-5"
            )}
          >
            {allMedia.map((media, index) => (
              <button
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-md border-2 transition-all aspect-square",
                  currentIndex === index
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : "border-transparent hover:border-gray-300"
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                {media.type === "image" && (
                  <div className="relative h-full w-full">
                    <Image
                      src={media.url || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                {media.type === "video" && (
                  <div className="relative h-full w-full">
                    <Image
                      src="/placeholder.svg"
                      alt={`Video thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-5 w-5 text-white" />
                    </div>
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