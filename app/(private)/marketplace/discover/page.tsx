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
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [showSharePrompt, setShowSharePrompt] = useState(false)
  const [hasSeenSharePrompt, setHasSeenSharePrompt] = useState(false)
  const [product, setProduct] = useState<any[]>([])


  const searchParams = useSearchParams()
  
    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("")
   
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
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

      
    const { addItem, items } = useShoppingCart()
  




  const handleSwipeRight = (product: any) => {
    setCurrentIndex((prev) => prev + 1)

    const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    minPrice: product.minPrice,
    maxPrice: product.maxPrice,
    image:
      product.images && product.images.length > 0
        ? product.images[0]
        : "/placeholder.svg",
  }

  // 2️⃣ Add to store
  addItem(cartItem, false)

  // 3️⃣ Optionally: show share prompt logic
  if (items.length + 1 === 10 && !hasSeenSharePrompt) {
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

  // const handleDeckEnd = () => {
  //   // Shuffle and restart
  //   const shuffled = [...products].sort(() => Math.random() - 0.5)
  //   setProduct(shuffled)
  //   setCurrentIndex(0)
  // }

  return (
    <main className="max-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 relative overflow-hidden font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        
       
      </header>

      {/* Discovery Stack */}
      <div className="h-screen flex items-start md:items-center justify-center">
        <DiscoveryStack
          products={products}
          currentIndex={currentIndex}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onSwipeUp={handleSwipeUp}
          // onDeckEnd={handleDeckEnd}
        />
      </div>

      {/* Modals */}
     

    

      <SharePrompt isOpen={showSharePrompt} onClose={() => setShowSharePrompt(false)} cartCount={items.length} />
    </main>
  )
}
