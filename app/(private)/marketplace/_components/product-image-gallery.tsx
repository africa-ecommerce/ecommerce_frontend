"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductImageGalleryProps {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const expandedViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    checkMobile();
    updateViewportDimensions();

    window.addEventListener("resize", () => {
      checkMobile();
      updateViewportDimensions();
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", updateViewportDimensions);
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
    setIsExpanded(true);
    if (onExpandClick) {
      onExpandClick();
    }
  };

  const handleCloseExpand = () => {
    setIsExpanded(false);
    setIsZoomed(false);
  };

  const handleVideoPlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allMedia[currentIndex]?.type === "video") {
      onVideoPlayClick?.(allMedia[currentIndex].url);
    }
  };

  // Calculate dimensions for main gallery
  const mainImageHeight = isMobile 
    ? Math.floor(viewportHeight * (2/4)) 
    : 500; // Fixed height on desktop

  const mainImageWidth = isMobile
    ? "100%" 
    : 1000; // Fixed width on desktop

  return (
    <div className={cn("relative", className)}>
      {/* Main media display */}
      <div
        ref={imageContainerRef}
        style={{
          height: isMobile ? `${mainImageHeight}px` : `${mainImageHeight}px`,
          width: isMobile ? "100%" : `${mainImageWidth}px`,
          maxHeight: isMobile ? `${mainImageHeight}px` : `${mainImageHeight}px`,
        }}
        className={cn(
          "relative overflow-hidden bg-muted rounded-lg touch-pan-y mx-auto"
        )}
        // onClick={toggleZoom}
        onMouseMove={handleMouseMove}
        // onMouseLeave={() => setIsZoomed(false)}
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
                  sizes="(max-width: 768px) 100vw, 600px"
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
                  sizes="(max-width: 768px) 100vw, 600px"
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

      
       

        
      </div>

      {/* Gallery view under main image */}
      {allMedia.length > 1 && (
        <div className="mt-4" style={{ 
          width: isMobile ? "100%" : `${mainImageWidth}px`,
          margin: "1rem auto 0" 
        }}>
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