



"use client"

import { useState, useEffect } from "react"
import { Share2 } from "lucide-react"
import Image from "next/image"
import { formatQuantity } from "@/lib/utils"

interface ProductCardProps {
  product: any
  onSwipeUp: () => void
}

export function ProductCard({ product, onSwipeUp }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-carousel effect for multiple images
  useEffect(() => {
    // Only set up the carousel if there are multiple images
    if (!product?.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [product?.images]);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.id]);

  const handleImageClick = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Pluggn!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    }
  }

  // Ensure we have a valid image source
  const currentImageSrc = product?.images?.[currentImageIndex] || product?.images?.[0] || "/placeholder.svg"

  return (
    <div className="w-[90vw] max-w-md aspect-[4/5] bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wide">
          {product.category}
        </span>
        <button
          onClick={handleShare}
          className="p-2 hover:bg-orange-100 rounded-full transition-colors"
          aria-label="Share product"
        >
          <Share2 className="md:w-5 md:h-5 h-4 w-4 text-orange-600" />
        </button>
      </div>

      {/* Product Image */}
      <div
        className="flex-1 relative cursor-pointer group"
        onClick={handleImageClick}
        onDoubleClick={onSwipeUp}
      >
        <Image
          key={currentImageIndex} // Force re-render on image change
          src={currentImageSrc}
          alt={product.name}
          fill
          className="object-cover"
          priority
          unoptimized={currentImageSrc === "/placeholder.svg"}
        />

        {/* Image indicators */}
        {product?.images && product.images.length > 1 && (
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {product.images.map((_: any, index: number) => (
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

        {/* Tap hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-full">
            Tap to see more
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-6 py-5 space-y-3">
        <div>
          <h2 className="md:text-base text-xs font-bold text-gray-900 leading-tight text-balance truncate capitalize">
            {product.name}
          </h2>
          <p className="text-sm text-orange-600 font-medium uppercase tracking-wide mt-1">
            Beauty
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[12px] font-semibold md:text-base">
            ₦{product?.price?.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-sm md:text-base">{formatQuantity(product?.plugsCount)} {product?.plugsCount === 1 ? "plug" : "plugs"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}