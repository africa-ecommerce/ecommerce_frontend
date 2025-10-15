"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function DiscoveryEndOfStack() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-6">
      {/* Floating sparkles */}
      <FloatingSparkle delay={0} x={-80} y={-120} />
      <FloatingSparkle delay={0.5} x={100} y={-80} />
      <FloatingSparkle delay={1} x={-60} y={80} />
      <FloatingSparkle delay={1.5} x={90} y={120} />
      <FloatingSparkle delay={0.8} x={-120} y={20} />
      <FloatingSparkle delay={1.2} x={110} y={-40} />

      {/* Background stacked cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.85, y: 20, rotate: -8, opacity: 0 }}
          animate={{ scale: 0.95, y: 15, rotate: -7, opacity: 0.4 }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
          className="absolute w-[85vw] max-w-md aspect-[4/5] bg-white/40 rounded-3xl shadow-xl backdrop-blur-sm"
          style={{ zIndex: 1 }}
        />
        <motion.div
          initial={{ scale: 0.9, y: 10, rotate: 6, opacity: 0 }}
          animate={{ scale: 0.97, y: 8, rotate: 7, opacity: 0.6 }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
          className="absolute w-[88vw] max-w-md aspect-[4/5] bg-white/50 rounded-3xl shadow-xl backdrop-blur-sm"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Main content card */}
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.3 }}
        className="relative w-[90vw] max-w-md aspect-[4/5] bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Gradient overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-50/80 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-8 py-12 text-center">
          {/* Animated star icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
              </motion.div>
              {/* Pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-orange-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance"
          >
            Your stack is finished{" "}
            <span className="inline-block" role="img" aria-label="star">
              🌟
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 text-pretty max-w-sm"
          >
            Come back after 12 hours to receive your new stack. In the meantime, visit your product dashboard and share
            a stunning image of your product, you'll love it.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          >
            <Link
              href="/dashboard/product"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
              <span className="relative">Go to Product Page</span>
            </Link>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
                className="w-2 h-2 bg-orange-400 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function FloatingSparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [y, y - 30, y],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
      className="absolute"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    >
      <Sparkles className="w-5 h-5 text-orange-400/60" fill="currentColor" />
    </motion.div>
  )
}
