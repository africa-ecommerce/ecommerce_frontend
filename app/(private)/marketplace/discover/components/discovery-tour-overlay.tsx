"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface DiscoveryTourOverlayProps {
  isOpen: boolean
  onComplete: () => void
}

export function DiscoveryTourOverlay({ isOpen, onComplete }: DiscoveryTourOverlayProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    const timers: NodeJS.Timeout[] = []

    // Step 0: Swipe right (0-3s)
    timers.push(setTimeout(() => setStep(1), 3000))
    // Step 1: Swipe left (3-6s)
    timers.push(setTimeout(() => setStep(2), 6000))
    // Step 2: Swipe up (6-9s)
    timers.push(
      setTimeout(() => {
        setStep(3)
        // Complete after fade out
        setTimeout(onComplete, 800)
      }, 9000),
    )

    return () => timers.forEach(clearTimeout)
  }, [isOpen, onComplete])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center"
      >
        {/* Skip button */}
        <button
          onClick={onComplete}
          className="absolute top-6 right-6 text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          Skip Tutorial
        </button>

        {/* Card placeholder */}
        <div className="relative w-[90vw] max-w-md aspect-[4/5] bg-white/10 rounded-3xl border-2 border-white/30 shadow-2xl">
          {/* Swipe Right */}
          <AnimatePresence>
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Hand animation */}
                  <motion.div
                    animate={{
                      x: [0, 120, 120, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -left-20 top-0"
                  >
                    <div className="text-6xl drop-shadow-lg">👉</div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-gray-900 px-6 py-4 rounded-2xl shadow-xl max-w-xs text-center"
                  >
                    <div className="text-2xl mb-2">🛒</div>
                    <p className="font-semibold text-lg">Swipe Right</p>
                    <p className="text-sm text-gray-600 mt-1">Add to your cart</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swipe Left */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Hand animation */}
                  <motion.div
                    animate={{
                      x: [0, -120, -120, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-20 top-0"
                  >
                    <div className="text-6xl drop-shadow-lg">👈</div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-gray-900 px-6 py-4 rounded-2xl shadow-xl max-w-xs text-center"
                  >
                    <div className="text-2xl mb-2">❌</div>
                    <p className="font-semibold text-lg">Swipe Left</p>
                    <p className="text-sm text-gray-600 mt-1">Skip this product</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swipe Up */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Hand animation */}
                  <motion.div
                    animate={{
                      y: [0, -120, -120, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-20 left-1/2 -translate-x-1/2"
                  >
                    <div className="text-6xl drop-shadow-lg">👆</div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-gray-900 px-6 py-4 rounded-2xl shadow-xl max-w-xs text-center"
                  >
                    <div className="text-2xl mb-2">🔍</div>
                    <p className="font-semibold text-lg">Swipe Up</p>
                    <p className="text-sm text-gray-600 mt-1">View product details</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-white w-6" : "bg-white/40"}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
