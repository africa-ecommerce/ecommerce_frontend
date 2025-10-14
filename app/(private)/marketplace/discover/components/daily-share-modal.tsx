"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Share2, X } from "lucide-react";

interface DailyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

export function DailyShareModal({
  isOpen,
  onClose,
  onShare,
}: DailyShareModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90vw] max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Share2 className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Share a product today ✨
                </h2>
                <p className="text-gray-600 mb-6">
                  Help others discover amazing products by sharing your
                  favorites!
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      onShare();
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition-all hover:scale-105"
                  >
                    Share Now
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-full hover:bg-gray-200 transition"
                  >
                    Keep Discovering
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
