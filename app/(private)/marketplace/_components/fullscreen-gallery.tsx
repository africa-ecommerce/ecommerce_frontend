"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FullscreenGalleryProps {
  images: string[]
  initialIndex?: number
  open: boolean
  onClose: () => void
}

export function FullscreenGallery({ images, initialIndex = 0, open, onClose }: FullscreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1))
    setScale(1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1))
    setScale(1)
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1))
  }

  const handleSwipe = (swipeDistance: number) => {
    if (swipeDistance > 50) handlePrevious()
    if (swipeDistance < -50) handleNext()
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col touch-none"
    >
      {/* Header - optimized for mobile */}
      <div className="flex items-center justify-between p-3 sm:p-4 text-white">
        <div className="text-sm">
          {currentIndex + 1} / {images?.length}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {!isMobile && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
                onClick={zoomOut}
                disabled={scale <= 1}
              >
                <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
                onClick={zoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
            onClick={onClose}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Main content with swipe support */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="overflow-auto h-full w-full flex items-center justify-center touch-pan-y">
              <motion.img
                src={images?.[currentIndex]}
                alt={`Product image ${currentIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain select-none"
                style={{ scale }}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag={scale > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => handleSwipe(info.offset.x)}
                onClick={() => isMobile && setScale(prev => prev === 1 ? 2 : 1)}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons - hidden when zoomed on mobile */}
        {scale === 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails - optimized for mobile */}
      <div className="bg-black/80 p-2 sm:p-4">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              className={cn(
                "h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                currentIndex === index 
                  ? "border-primary scale-105" 
                  : "border-transparent hover:border-white/30"
              )}
              onClick={() => {
                setCurrentIndex(index)
                setScale(1)
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile zoom controls - only shown when zoomed */}
      {isMobile && scale > 1 && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4">
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-black/70 text-white backdrop-blur-sm"
            onClick={zoomOut}
          >
            <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
          </Button>
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-black/70 text-white backdrop-blur-sm"
            onClick={() => setScale(1)}
          >
            Reset
          </Button>
        </div>
      )}
    </motion.div>
  )
}