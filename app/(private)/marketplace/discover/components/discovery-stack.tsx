// "use client"

// import { useState, useEffect } from "react"
// import { motion, useMotionValue, useTransform, type PanInfo, AnimatePresence } from "framer-motion"
// import { ProductCard } from "./product-card"
// import { Toast } from "./toast"

// interface DiscoveryStackProps {
//   products: any[]
//   currentIndex: number
//   onSwipeRight: (product: any) => void
//   onSwipeLeft: () => void
//   onSwipeUp: (product: any) => void
//   onDeckEnd: () => void
// }

// export function DiscoveryStack({
//   products,
//   currentIndex,
//   onSwipeRight,
//   onSwipeLeft,
//   onSwipeUp,
//   onDeckEnd,
// }: DiscoveryStackProps) {
//   const [showTip, setShowTip] = useState(true)
//   const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)
//   const [direction, setDirection] = useState<"left" | "right" | null>(null)

//   const x = useMotionValue(0)
//   const y = useMotionValue(0)
//   const rotate = useTransform(x, [-200, 200], [-10, 10])
//   const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

//   const currentProduct = products[currentIndex]
//   const nextProducts = products.slice(currentIndex + 1, currentIndex + 4)

//   useEffect(() => {
//     // Hide tip after 5 seconds
//     const timer = setTimeout(() => setShowTip(false), 5000)
//     return () => clearTimeout(timer)
//   }, [])

//   useEffect(() => {
//     // Check if deck ended
//     if (currentIndex >= products.length && products.length > 0) {
//       setToast({ message: "You reached the end — restarting with new & trending items", type: "info" })
//       setTimeout(() => {
//         onDeckEnd()
//         setToast(null)
//       }, 2000)
//     }
//   }, [currentIndex, products.length, onDeckEnd])

//   const handleDragEnd = (_: any, info: PanInfo) => {
//     const threshold = 120
//     const velocity = info.velocity.x
//     const dir = info.offset.x > 0 ? "right" : "left"

//     if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 600) {
//       setDirection(dir)
//       const isRight = dir === "right"
//       if (isRight) {
//         setToast({ message: "Added to My Picks — set your resale price in Cart", type: "success" })
//       }
//       setTimeout(() => {
//         isRight ? onSwipeRight(currentProduct) : onSwipeLeft()
//         setDirection(null)
//         setToast(null)
//       }, 450) // allow animation to finish
//     } else if (info.offset.y < -120) {
//       onSwipeUp(currentProduct)
//     } else {
//       x.set(0)
//       y.set(0)
//     }
//   }

//   const handleButtonSwipe = (dir: "left" | "right") => {
//     setDirection(dir)
//     if (dir === "right") {
//       setToast({ message: "Added to My Picks — set your resale price in Cart", type: "success" })
//       setTimeout(() => {
//         onSwipeRight(currentProduct)
//         setDirection(null)
//         setToast(null)
//       }, 300)
//     } else {
//       setTimeout(() => {
//         onSwipeLeft()
//         setDirection(null)
//       }, 300)
//     }
//   }

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") {
//         handleButtonSwipe("right")
//       } else if (e.key === "ArrowLeft") {
//         handleButtonSwipe("left")
//       } else if (e.key === "ArrowUp" && currentProduct) {
//         onSwipeUp(currentProduct)
//       }
//     }

//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [currentProduct])

//   if (!currentProduct) {
//     return <div className="text-center text-white text-xl font-medium">Loading amazing products...</div>
//   }

//   return (
//     <div className="relative w-full max-w-md mx-auto h-[600px]">
//       {/* Stack of cards behind */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {nextProducts.map((product, index) => {
//           const scale = 0.98 - index * 0.03
//           const translateY = -10 * (index + 1)
//           const rotation = index % 2 === 0 ? -2 : 2

//           return (
//             <motion.div
//               key={product.id}
//               className="absolute"
//               style={{
//                 scale,
//                 y: translateY,
//                 rotate: rotation,
//                 zIndex: 10 - index,
//                 opacity: 1 - index * 0.25,
//               }}
//             >
//               <div className="w-[90vw] max-w-md aspect-[4/5] bg-white rounded-3xl shadow-xl" />
//             </motion.div>
//           )
//         })}
//       </div>

//       {/* Active card */}
//       <AnimatePresence mode="wait">
//         {currentProduct && (
//           <motion.div
//             key={currentProduct.id}
//             className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
//             style={{ x, y, rotate }}
//             drag
//             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//             dragElastic={0.8}
//             onDragEnd={handleDragEnd}
//             // ✨ Smooth enter + leave
//             initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
//             animate={{ scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 180, damping: 20 } }}
//             exit={{
//               x: direction === "right" ? 800 : direction === "left" ? -800 : 0,
//               y: direction === "right" || direction === "left" ? 80 : 0,
//               rotate: direction === "right" ? 25 : direction === "left" ? -25 : 0,
//               opacity: 0,
//               transition: { type: "spring", stiffness: 120, damping: 16 },
//             }}
//             whileTap={{ scale: 1.04 }}
//           >
//             <ProductCard product={currentProduct} onSwipeUp={() => onSwipeUp(currentProduct)} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Tip overlay */}
//       <AnimatePresence>
//         {showTip && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute bottom-32 left-0 right-0 z-30 px-6"
//           >
//             <div className="bg-black/80 backdrop-blur-sm text-white text-sm text-center py-3 px-4 rounded-full mx-auto max-w-sm">
//               Swipe → Add • Swipe ← Skip • Swipe ↑ or hold for details
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Action buttons */}
//       <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-6 px-6">
//         <button
//           onClick={() => handleButtonSwipe("left")}
//           className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
//           aria-label="Skip product"
//         >
//           <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <button
//           onClick={() => handleButtonSwipe("right")}
//           className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
//           aria-label="Add to cart"
//         >
//           <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//           </svg>
//         </button>

//         <button
//           onClick={() => onSwipeUp(currentProduct)}
//           className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
//           aria-label="View details"
//         >
//           <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
//           </svg>
//         </button>
//       </div>

//       {/* Toast notifications */}
//       {toast && <Toast message={toast.message} type={toast.type} />}
//     </div>
//   )
// }






"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, type PanInfo, AnimatePresence } from "framer-motion"
import { ProductCard } from "./product-card"
import { Toast } from "./toast"

interface DiscoveryStackProps {
  products: any[]
  currentIndex: number
  onSwipeRight: (product: any) => void
  onSwipeLeft: () => void
  onSwipeUp: (product: any) => void
  onDeckEnd: () => void
}

export function DiscoveryStack({
  products,
  currentIndex,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onDeckEnd,
}: DiscoveryStackProps) {
  const [showTip, setShowTip] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [exitingProductId, setExitingProductId] = useState<string | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-10, 10])

  const currentProduct = products[currentIndex]
  const nextProducts = products.slice(currentIndex + 1, currentIndex + 4)

  useEffect(() => {
    // Hide tip after 5 seconds
    const timer = setTimeout(() => setShowTip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if deck ended
    if (currentIndex >= products.length && products.length > 0) {
      setToast({ message: "You reached the end — restarting with new & trending items", type: "info" })
      setTimeout(() => {
        onDeckEnd()
        setToast(null)
      }, 2000)
    }
  }, [currentIndex, products.length, onDeckEnd])

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 120
    const velocity = info.velocity.x
    const dir = info.offset.x > 0 ? "right" : "left"

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 600) {
      setDirection(dir)
      setExitingProductId(currentProduct?.id)
      const isRight = dir === "right"
      if (isRight) {
        setToast({ message: "Added to My Picks — set your resale price in Cart", type: "success" })
      }
      setTimeout(() => {
        isRight ? onSwipeRight(currentProduct) : onSwipeLeft()
        setDirection(null)
        setExitingProductId(null)
        setToast(null)
      }, 450)
    } else if (info.offset.y < -120) {
      onSwipeUp(currentProduct)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleButtonSwipe = (dir: "left" | "right") => {
    if (!currentProduct) return
    
    setDirection(dir)
    setExitingProductId(currentProduct.id)
    if (dir === "right") {
      setToast({ message: "Added to My Picks — set your resale price in Cart", type: "success" })
      setTimeout(() => {
        onSwipeRight(currentProduct)
        setDirection(null)
        setExitingProductId(null)
        setToast(null)
      }, 300)
    } else {
      setTimeout(() => {
        onSwipeLeft()
        setDirection(null)
        setExitingProductId(null)
      }, 300)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleButtonSwipe("right")
      } else if (e.key === "ArrowLeft") {
        handleButtonSwipe("left")
      } else if (e.key === "ArrowUp" && currentProduct) {
        onSwipeUp(currentProduct)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentProduct])

  if (!currentProduct) {
    return <div className="text-center text-white text-xl font-medium">Loading amazing products...</div>
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px]">
      {/* Stack of cards behind */}
      <div className="absolute inset-0 flex items-center justify-center">
        {nextProducts.map((product, index) => {
          const scale = 0.98 - index * 0.03
          const translateY = -10 * (index + 1)
          const rotation = index % 2 === 0 ? -2 : 2

          return (
            <motion.div
              key={`${product.id}-${index}`}
              className="absolute"
              style={{
                scale,
                y: translateY,
                rotate: rotation,
                zIndex: 10 - index,
                opacity: 1 - index * 0.25,
              }}
            >
              <div className="w-[90vw] max-w-md aspect-[4/5] bg-white rounded-3xl shadow-xl" />
            </motion.div>
          )
        })}
      </div>

      {/* Active card */}
      <AnimatePresence mode="wait" initial={false}>
        {currentProduct && (
          <motion.div
            key={currentProduct.id}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ x, y, rotate, zIndex: 20 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                opacity: { duration: 0.2 }
              } 
            }}
            exit={{
              x: direction === "right" ? 800 : direction === "left" ? -800 : 0,
              y: direction === "right" || direction === "left" ? 80 : 0,
              rotate: direction === "right" ? 25 : direction === "left" ? -25 : 0,
              opacity: 0,
              transition: { type: "spring", stiffness: 120, damping: 16 },
            }}
            whileTap={{ scale: 1.04 }}
          >
            <ProductCard product={currentProduct} onSwipeUp={() => onSwipeUp(currentProduct)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tip overlay */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-32 left-0 right-0 z-30 px-6"
          >
            <div className="bg-black/80 backdrop-blur-sm text-white text-sm text-center py-3 px-4 rounded-full mx-auto max-w-sm">
              Swipe → Add • Swipe ← Skip • Swipe ↑ or hold for details
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-6 px-6">
        <button
          onClick={() => handleButtonSwipe("left")}
          className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          aria-label="Skip product"
        >
          <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleButtonSwipe("right")}
          className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          aria-label="Add to cart"
        >
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <button
          onClick={() => onSwipeUp(currentProduct)}
          className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          aria-label="View details"
        >
          <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Toast notifications */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}