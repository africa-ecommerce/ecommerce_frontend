"use client"

import { useState, useEffect, useRef } from "react"
import { DiscoveryStack } from "./components/discovery-stack"
import { CartModal } from "./components/cart-modal"
import { ProductDetailModal } from "./components/product-detail-modal"
import { SharePrompt } from "./components/share-prompt"
import { ShoppingCart } from "lucide-react"
import { useProducts, type ProductsFilter } from "@/hooks/use-products"
import { useUser } from "@/app/_components/provider/UserContext"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [showSharePrompt, setShowSharePrompt] = useState(false)
  const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false)
  const [product, setProduct] = useState<any[]>([])


  const searchParams = useSearchParams()
  
    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [showDiscoveryMode, setShowDiscoveryMode] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const {
      userData: { user },
    } = useUser()
  
    // Mock subscriber data - replace with real data from your API
    const getSubscriberCount = () => {
      if (user?.userType === "SUPPLIER") {
        return 1247 // Number of people subscribed to this supplier
      } else if (user?.userType === "PLUG") {
        return 23 // Number of suppliers this plug is subscribed to
      }
      return 0
    }
  
    // Flag to prevent URL sync on initial load
    const [isInitialized, setIsInitialized] = useState(false)
  
    // IntersectionObserver for infinite scroll
    // const { ref: loadingRef, inView } = useInView({
    //   threshold: 0.5,
    //   triggerOnce: false,
    // })
  
    // Combine filters for products hook
    const filters: ProductsFilter = {
      search: searchQuery,
      priceRange,
      selectedCategories,
      selectedRatings,
      sortBy: "createdAt",
      order: "desc",
    }
  
    // Use the products hook for data fetching
    const { products, error, isLoading, isLoadingMore, hasNextPage, isEmpty, size, setSize, clearCache, refreshData } =
      useProducts(filters, 20)
  




  const handleSwipeRight = (product: any) => {
    setCartItems((prev) => [...prev, product])
    setCurrentIndex((prev) => prev + 1)

    // Show share prompt after 10 items
    if (cartItems.length + 1 === 10 && !hasSeenSharePrompt) {
      setTimeout(() => {
        setShowSharePrompt(true)
        setHasSeenSharePrompt(true)
      }, 500)
    }
  }

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  const handleSwipeUp = (product: any) => {
    setSelectedProduct(product)
  }

  const handleDeckEnd = () => {
    // Shuffle and restart
    const shuffled = [...products].sort(() => Math.random() - 0.5)
    setProduct(shuffled)
    setCurrentIndex(0)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-orange-600">pluggn</div>
        <button
          onClick={() => setShowCart(true)}
          className="relative p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label="View cart"
        >
          <ShoppingCart className="w-6 h-6 text-orange-600" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </header>

      {/* Discovery Stack */}
      <div className="pt-20 pb-8 px-4 h-screen flex items-center justify-center">
        <DiscoveryStack
          products={products}
          currentIndex={currentIndex}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onSwipeUp={handleSwipeUp}
          onDeckEnd={handleDeckEnd}
        />
      </div>

      {/* Modals */}
      <CartModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => {
          setCartItems((prev) => [...prev, product])
          setSelectedProduct(null)
        }}
      />

      <SharePrompt isOpen={showSharePrompt} onClose={() => setShowSharePrompt(false)} cartCount={cartItems.length} />
    </main>
  )
}
