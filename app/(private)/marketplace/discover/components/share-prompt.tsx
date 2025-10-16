"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Share2, X } from "lucide-react"

interface SharePromptProps {
  isOpen: boolean
  onClose: () => void
  cartCount: number
  onConfirm: () => void
}

export function SharePrompt({ isOpen, onClose, cartCount, onConfirm }: SharePromptProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Share2 className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on fire! 🔥</h3>
                <p className="text-gray-600 leading-relaxed">
                  You've added {cartCount} amazing products to your picks. Ready to set your prices and share your
                  store?
                </p>
              </div>

              <div className="space-y-3">
                <button 
                onClick={onConfirm}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Set Prices & Go Live
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-100 text-gray-700 font-semibold py-4 rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  Keep Discovering
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
