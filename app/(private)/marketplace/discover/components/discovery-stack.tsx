



// "use client"

// import { useState, useEffect } from "react"
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useTransform,
//   PanInfo,
// } from "framer-motion"
// import { ProductCard } from "./product-card"
// import { Toast } from "./toast"
// import { X, Heart, ArrowUp } from "lucide-react"

// interface DiscoveryStackProps {
//   products: any[]
//   currentIndex: number
//   onSwipeRight: (product: any) => void
//   onSwipeLeft: () => void
//   onSwipeUp: (product: any) => void
//   // onDeckEnd: () => void
// }

// export function DiscoveryStack({
//   products,
//   currentIndex,
//   onSwipeRight,
//   onSwipeLeft,
//   onSwipeUp,
//   // onDeckEnd,
// }: DiscoveryStackProps) {
//   const [showTip, setShowTip] = useState(true)
//   const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)
//   const [leaving, setLeaving] = useState(false)

//   const currentProduct = products[currentIndex]
//   const nextProducts = products.slice(currentIndex + 1, currentIndex + 3)

//   // Hide swipe tip after few seconds
//   useEffect(() => {
//     const timer = setTimeout(() => setShowTip(false), 4000)
//     return () => clearTimeout(timer)
//   }, [])

//   // Handle deck end
//   useEffect(() => {
//     if (currentIndex >= products.length && products.length > 0) {
//       setToast({ message: "You reached the end — refreshing new items", type: "info" })
//       setTimeout(() => {
//         // onDeckEnd()
//         setToast(null)
//       }, 1500)
//     }
//   }, [currentIndex, products.length])

//   // Keyboard controls
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!currentProduct) return
//       if (e.key === "ArrowRight") {
//         setToast({ message: "Added to My Picks — set your resale price in Cart", type: "success" })
//         setTimeout(() => {
//           onSwipeRight(currentProduct)
//           setToast(null)
//         }, 250)
//       } else if (e.key === "ArrowLeft") {
//         onSwipeLeft()
//       } else if (e.key === "ArrowUp") {
//         onSwipeUp(currentProduct)
//       }
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [currentProduct, onSwipeRight, onSwipeLeft, onSwipeUp])

//   const handleDragEnd = (_: any, info: PanInfo, product: any, x: any, y: any) => {
//     if (leaving) return
//     const threshold = 120

//     if (info.offset.x > threshold || info.velocity.x > 800) {
//       setLeaving(true)
//       setToast({
//         message: "Added to My Picks — set your resale price in Cart",
//         type: "success",
//       })
//       setTimeout(() => {
//         onSwipeRight(product)
//         setToast(null)
//         setLeaving(false)
//       }, 300)
//     } else if (info.offset.x < -threshold || info.velocity.x < -800) {
//       setLeaving(true)
//       setTimeout(() => {
//         onSwipeLeft()
//         setLeaving(false)
//       }, 300)
//     } else if (info.offset.y < -threshold) {
//       onSwipeUp(product)
//     } else {
//       // bounce back to center
//       x.set(0)
//       y.set(0)
//     }
//   }

//   if (!currentProduct) {
//     return (
//       <div className="text-center text-white text-xl font-medium">
//         Loading products...
//       </div>
//     )
//   }

//   return (
//     <div className="relative w-full max-w-md mx-auto h-[calc(90vh-4rem)] md:h-[calc(100vh-4rem)]">
//       {/* Background stacked cards with slant */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {nextProducts.map((product, index) => (
//           <motion.div
//             key={product.id}
//             initial={{
//               scale: 0.9 - index * 0.05,
//               y: index * 15,
//               rotate: index === 0 ? -7 : 7,
//               opacity: 0,
//             }}
//             animate={{
//               scale: 1 - index * 0.05,
//               y: index * 15,
//               rotate: index === 0 ? -7 : 7,
//               opacity: 1 - index * 0.2,
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 25 }}
//             className="absolute"
//             style={{ zIndex: 5 - index }}
//           >
//             <div className="w-[90vw] max-w-md aspect-[4/5] bg-white rounded-3xl shadow-xl" />
//           </motion.div>
//         ))}
//       </div>

//       {/* Top swipeable card */}
//       <AnimatePresence mode="popLayout">
//         <SwipeCard
//           key={currentProduct.id}
//           product={currentProduct}
//           handleDragEnd={handleDragEnd}
//           onSwipeUp={onSwipeUp}
//         />
//       </AnimatePresence>

//       {/* Action buttons */}
//       <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 md:gap-6 z-30">
//         <button
//           onClick={() => onSwipeLeft()}
//           className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
//         >
//           <X className="md:w-6 md:h-6 w-5 h-5 text-red-500" />
//         </button>
//         <button
//           onClick={() => onSwipeUp(currentProduct)}
//           className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
//         >
//           <svg
//             className="md:w-6 md:h-6 w-5 h-5 text-gray-700"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2.5}
//               d="M5 15l7-7 7 7"
//             />
//           </svg>
//         </button>
//         <button
//           onClick={() => {
//             setToast({
//               message: "Added to your picks",
//               type: "success",
//             });
//             setTimeout(() => {
//               onSwipeRight(currentProduct);
//               setToast(null);
//             }, 500);
//           }}
//           className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
//         >
//           <Heart className="md:w-6 md:h-6 w-5 h-5 text-green-500" />
//         </button>
//       </div>

//       {/* Tip */}
//       <AnimatePresence>
//         {showTip && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute bottom-28 left-0 right-0 px-6 z-30"
//           >
//             <div className="bg-black/80 text-white text-sm text-center py-3 px-4 rounded-full mx-auto max-w-sm">
//               Swipe → Add • Swipe ← Skip • Swipe ↑ for details
//               <br />
//               or use keyboard arrows ↑ ← →
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Toast */}
//       {toast && <Toast message={toast.message} type={toast.type} />}
//     </div>
//   );
// }

// function SwipeCard({ product, handleDragEnd, onSwipeUp }: any) {
//   const x = useMotionValue(0)
//   const y = useMotionValue(0)
//   const rotate = useTransform(x, [-200, 200], [-15, 15])

//   return (
//     <motion.div
//       className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
//       drag
//       dragElastic={0.8}
//       dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//       onDragEnd={(e, info) => handleDragEnd(e, info, product, x, y)}
//       style={{ x, y, rotate, zIndex: 20 }}
//       initial={{ scale: 0.9, y: 40, opacity: 0 }}
//       animate={{
//         scale: 1,
//         y: 0,
//         opacity: 1,
//         transition: { type: "spring", stiffness: 250, damping: 20 },
//       }}
//       exit={{
//         x: x.get() > 0 ? 800 : x.get() < 0 ? -800 : 0,
//         y: 100,
//         rotate: x.get() > 0 ? 25 : x.get() < 0 ? -25 : 0,
//         opacity: 0,
//         transition: { duration: 0.35, ease: "easeInOut" },
//       }}
//       whileTap={{ scale: 1.05 }}
//     >
//       <ProductCard product={product} onSwipeUp={() => onSwipeUp(product)} />
//     </motion.div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import { ProductCard } from "./product-card"
import { Toast } from "./toast"
import { X, Heart } from "lucide-react"

interface DiscoveryStackProps {
  products: any[]
  currentIndex: number
  onSwipeRight: (product: any) => void
  onSwipeLeft: () => void
  onSwipeUp: (product: any) => void
}

export function DiscoveryStack({ products, currentIndex, onSwipeRight, onSwipeLeft, onSwipeUp }: DiscoveryStackProps) {
  const [showTip, setShowTip] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)
  const [leaving, setLeaving] = useState(false)

  const currentProduct = products[currentIndex]
  const nextProducts = products.slice(currentIndex + 1, currentIndex + 3)

  // Hide swipe tip after few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTip(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Handle deck end
  useEffect(() => {
    if (currentIndex >= products.length && products.length > 0) {
      setToast({ message: "You reached the end — refreshing new items", type: "info" })
      setTimeout(() => {
        setToast(null)
      }, 1500)
    }
  }, [currentIndex, products.length])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentProduct) return
      if (e.key === "ArrowRight") {
        setToast({
          message: "Added to your Picks — set your resale price in Cart",
          type: "success",
        });
        setTimeout(() => {
          onSwipeRight(currentProduct)
          setToast(null)
        }, 1000)
      } else if (e.key === "ArrowLeft") {
        onSwipeLeft()
      } else if (e.key === "ArrowUp") {
        onSwipeUp(currentProduct)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentProduct, onSwipeRight, onSwipeLeft, onSwipeUp])

  const handleDragEnd = (_: any, info: PanInfo, product: any, x: any, y: any) => {
    if (leaving) return
    const threshold = 120

    if (info.offset.x > threshold || info.velocity.x > 800) {
      setLeaving(true)
      setToast({
        message: "Added to your Picks — set your resale price in Cart",
        type: "success",
      })
      setTimeout(() => {
        onSwipeRight(product)
        setToast(null)
        setLeaving(false)
      }, 1000)
    } else if (info.offset.x < -threshold || info.velocity.x < -800) {
      setLeaving(true)
      setTimeout(() => {
        onSwipeLeft()
        setLeaving(false)
      }, 300)
    } else if (info.offset.y < -threshold) {
      onSwipeUp(product)
    } else {
      // bounce back to center
      x.set(0)
      y.set(0)
    }
  }

  if (!currentProduct) {
    return <div className="text-center text-white text-xl font-medium">Loading products...</div>
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-[calc(90vh-4rem)] md:h-[calc(100vh-4rem)]">
      {/* Background stacked cards with slant */}
      <div className="absolute inset-0 flex items-center justify-center">
        {nextProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{
              scale: 0.9 - index * 0.05,
              y: index * 15,
              rotate: index === 0 ? -7 : 7,
              opacity: 0,
            }}
            animate={{
              scale: 1 - index * 0.05,
              y: index * 15,
              rotate: index === 0 ? -7 : 7,
              opacity: 1 - index * 0.2,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute"
            style={{ zIndex: 5 - index }}
          >
            <div className="w-[90vw] max-w-md aspect-[4/5] bg-white rounded-3xl shadow-xl" />
          </motion.div>
        ))}
      </div>

      {/* Top swipeable card */}
      <AnimatePresence mode="popLayout">
        <SwipeCard
          key={currentProduct.id}
          product={currentProduct}
          handleDragEnd={handleDragEnd}
          onSwipeUp={onSwipeUp}
        />
      </AnimatePresence>

      {/* Action buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 md:gap-6 z-30">
        <button
          onClick={() => onSwipeLeft()}
          className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
        >
          <X className="md:w-6 md:h-6 w-5 h-5 text-red-500" />
        </button>
        <button
          onClick={() => onSwipeUp(currentProduct)}
          className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
        >
          <svg className="md:w-6 md:h-6 w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={() => {
            setToast({
              message: "Added to your Picks — set your resale price in Cart",
              type: "success",
            })
            setTimeout(() => {
              onSwipeRight(currentProduct)
              setToast(null)
            }, 1000)
          }}
          className="md:p-4 p-3 bg-white/90 rounded-full shadow-md hover:scale-105 transition"
        >
          <Heart className="md:w-6 md:h-6 w-5 h-5 text-green-500" />
        </button>
      </div>

      

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

function SwipeCard({ product, handleDragEnd, onSwipeUp }: any) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
      drag
      dragElastic={0.8}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, info) => handleDragEnd(e, info, product, x, y)}
      style={{ x, y, rotate, zIndex: 20 }}
      initial={{ scale: 0.9, y: 40, opacity: 0 }}
      animate={{
        scale: 1,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 250, damping: 20 },
      }}
      exit={{
        x: x.get() > 0 ? 800 : x.get() < 0 ? -800 : 0,
        y: 100,
        rotate: x.get() > 0 ? 25 : x.get() < 0 ? -25 : 0,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      whileTap={{ scale: 1.05 }}
    >
      <ProductCard product={product} onSwipeUp={() => onSwipeUp(product)} />
    </motion.div>
  )
}
