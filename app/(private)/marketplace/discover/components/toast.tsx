"use client"

import { motion } from "framer-motion"
import { CheckCircle, Info } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "info"
}

export function Toast({ message, type }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 left-0 right-0 z-40 flex justify-center px-6"
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm max-w-md ${
          type === "success" ? "bg-green-500/95 text-white" : "bg-white/95 text-gray-900"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Info className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </motion.div>
  )
}
