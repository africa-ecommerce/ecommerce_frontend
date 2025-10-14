"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
  onRemoveItem: (id: string) => void
}

export function CartModal({ isOpen, onClose, items, onRemoveItem }: CartModalProps) {
  const [resalePrices, setResalePrices] = useState<Record<string, string>>({})

  const handlePriceChange = (id: string, value: string) => {
    setResalePrices((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
              <div>
                <h3 className="text-lg font-bold text-gray-900">My Picks</h3>
                <p className="text-sm text-gray-500">{items.length} items</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h4>
                  <p className="text-gray-500">Start swiping to add products!</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-orange-50 rounded-2xl p-4 flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-500 mb-3">Original: {item.price}</p>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Set resale price"
                            value={resalePrices[item.id] || ""}
                            onChange={(e) => handlePriceChange(item.id, e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Add to My Store
                </button>
                <p className="text-xs text-center text-gray-500">
                  Set your resale prices and publish to your storefront
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
