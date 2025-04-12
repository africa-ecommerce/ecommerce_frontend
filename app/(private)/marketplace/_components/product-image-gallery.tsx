"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Expand, Play, Box } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
  videos?: string[]
  modelUrl?: string
  onExpandClick?: () => void
  onModelViewClick?: () => void
  onVideoPlayClick?: (videoUrl: string) => void
  className?: string
}

export function ProductImageGallery({
  images,
  videos = [],
  modelUrl,
  onExpandClick,
  onModelViewClick,
  onVideoPlayClick,
  className,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const allMedia = [
    ...images.map((img) => ({ type: "image" as const, url: img })),
    ...videos.map((video) => ({ type: "video" as const, url: video })),
    ...(modelUrl ? [{ type: "model" as const, url: modelUrl }] : []),
  ]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
    setIsZoomed(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext() // Swipe left
    }

    if (touchStart - touchEnd < -50) {
      handlePrevious() // Swipe right
    }
  }

  const toggleZoom = () => {
    if (allMedia[currentIndex].type !== "image") return
    setIsZoomed(!isZoomed)
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onExpandClick?.()
  }

  const handleModelViewClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onModelViewClick?.()
  }

  const handleVideoPlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (allMedia[currentIndex].type === "video") {
      onVideoPlayClick?.(allMedia[currentIndex].url)
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Main media display */}
      <div
        ref={imageContainerRef}
        className={cn(
          "relative aspect-square overflow-hidden bg-muted rounded-lg touch-pan-y",
          isZoomed && "cursor-zoom-out",
          !isZoomed && allMedia[currentIndex].type === "image" && "cursor-zoom-in",
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
            {allMedia[currentIndex].type === "image" && (
              <div className="relative h-full w-full">
                <img
                  src={allMedia[currentIndex].url || "/placeholder.svg"}
                  alt={`Product image ${currentIndex + 1}`}
                  className={cn(
                    "h-full w-full object-contain transition-transform duration-300",
                    isZoomed ? "scale-150" : "scale-100",
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

            {allMedia[currentIndex].type === "video" && (
              <div className="relative h-full w-full flex items-center justify-center bg-black">
                <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black" />
                <img
                  src={`/placeholder.svg?height=500&width=500&text=Video+Thumbnail`}
                  alt={`Video thumbnail ${currentIndex + 1}`}
                  className="h-full w-full object-cover opacity-70"
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
                  <Play className={cn("text-white fill-white", isMobile ? "h-6 w-6" : "h-8 w-8")} />
                </Button>
              </div>
            )}

            {allMedia[currentIndex].type === "model" && (
              <div className="relative h-full w-full flex items-center justify-center bg-black/5">
                <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black" />
                <img
                  src={`/placeholder.svg?height=500&width=500&text=3D+Model`}
                  alt="3D model preview"
                  className="h-full w-full object-cover opacity-70"
                  draggable="false"
                />
                <Button
                  variant="secondary"
                  size={isMobile ? "sm" : "default"}
                  className={cn(
                    "absolute bg-white/30 backdrop-blur-md hover:bg-white/50",
                    isMobile ? "px-3 py-1 text-xs" : "px-4 py-2"
                  )}
                  onClick={handleModelViewClick}
                >
                  <Box className={cn("mr-2", isMobile ? "h-3 w-3" : "h-4 w-4")} />
                  {isMobile ? "3D View" : "View 3D Model"}
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
                e.stopPropagation()
                handlePrevious()
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
                e.stopPropagation()
                handleNext()
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
        {isMobile && allMedia[currentIndex].type === "image" && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full">
              {isZoomed ? "Pinch to zoom out" : "Double tap or pinch to zoom"}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {allMedia.map((media, index) => (
            <button
              key={index}
              className={cn(
                "relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                currentIndex === index 
                  ? "border-primary scale-105" 
                  : "border-transparent hover:border-gray-300",
                isMobile ? "h-14 w-14" : "h-16 w-16"
              )}
              onClick={() => handleThumbnailClick(index)}
            >
              {media.type === "image" && (
                <img
                  src={media.url || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
              {media.type === "video" && (
                <div className="relative h-full w-full">
                  <img
                    src={`/placeholder.svg?height=64&width=64&text=Video`}
                    alt={`Video thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
              {media.type === "model" && (
                <div className="relative h-full w-full">
                  <img
                    src={`/placeholder.svg?height=64&width=64&text=3D`}
                    alt="3D model thumbnail"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Box className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}