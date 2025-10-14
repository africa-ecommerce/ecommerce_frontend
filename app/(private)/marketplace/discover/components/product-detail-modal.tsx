"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Share2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductDetailModalProps {
  product: any | null
  onClose: () => void
  onAddToCart: (product: any) => void
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Image Gallery */}
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Image navigation */}
              {product.images.length > 1 && (
                <>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
                      }
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 text-balance">{product.name}</h2>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    aria-label="Share product"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-sm text-orange-600 font-medium uppercase tracking-wide">{product.tagline}</p>
              </div>

              <div className="flex items-center justify-between py-4 border-y border-gray-100">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{product.price}</div>
                  <div className="text-sm text-gray-500 mt-1">{product.plugCount} plugs</div>
                </div>
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Curator Info */}
              <div className="bg-orange-50 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Curated by</h4>
                <div className="flex items-center gap-3">
                  <Image
                    src={product.curator.avatar || "/placeholder.svg"}
                    alt={product.curator.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{product.curator.name}</p>
                    <p className="text-sm text-gray-600">{product.curator.handle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
            <button
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to My Picks
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
