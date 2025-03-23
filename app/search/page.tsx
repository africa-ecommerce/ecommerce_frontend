"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, X, Mic, Camera, LayoutGrid, List, Filter, ChevronDown } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample search results data
const productResults = [
  {
    id: 1,
    name: "Traditional Ankara Fabric Blouse",
    price: 12500,
    image: "/placeholder.svg?height=150&width=150",
    store: "Adire Textiles",
    rating: 4.5,
    discount: "17%",
    freeShipping: true,
  },
  {
    id: 2,
    name: "Handcrafted Leather Sandals",
    price: 8700,
    image: "/placeholder.svg?height=150&width=150",
    store: "Lagos Leatherworks",
    rating: 4.2,
    discount: null,
    freeShipping: false,
  },
  {
    id: 3,
    name: "Shea Butter Hair Cream - Natural",
    price: 3500,
    image: "/placeholder.svg?height=150&width=150",
    store: "Natural Beauty Co.",
    rating: 4.8,
    discount: "10%",
    freeShipping: true,
  },
  {
    id: 4,
    name: "African Print Headwrap",
    price: 2500,
    image: "/placeholder.svg?height=150&width=150",
    store: "Adire Textiles",
    rating: 4.3,
    discount: null,
    freeShipping: true,
  },
  {
    id: 5,
    name: "Handwoven Straw Bag",
    price: 5200,
    image: "/placeholder.svg?height=150&width=150",
    store: "Artisan Crafts",
    rating: 4.0,
    discount: "5%",
    freeShipping: false,
  },
  {
    id: 6,
    name: "Traditional Beaded Necklace",
    price: 8700,
    image: "/placeholder.svg?height=150&width=150",
    store: "African Treasures",
    rating: 4.7,
    discount: null,
    freeShipping: true,
  },
]

const storeResults = [
  {
    id: 1,
    name: "Adire Textiles",
    category: "Fashion",
    rating: 4.5,
    location: "Lagos, Nigeria",
    image: "/placeholder.svg?height=100&width=100",
    products: 45,
  },
  {
    id: 2,
    name: "Lagos Leatherworks",
    category: "Accessories",
    rating: 4.2,
    location: "Lagos, Nigeria",
    image: "/placeholder.svg?height=100&width=100",
    products: 32,
  },
  {
    id: 3,
    name: "Natural Beauty Co.",
    category: "Beauty & Personal Care",
    rating: 4.8,
    location: "Accra, Ghana",
    image: "/placeholder.svg?height=100&width=100",
    products: 28,
  },
]

// Sample recent searches
const recentSearches = ["ankara fabric", "shea butter", "leather sandals", "african print"]

// Sample popular searches
const popularSearches = [
  "traditional clothing",
  "handmade jewelry",
  "organic skincare",
  "home decor",
  "spices",
  "african art",
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showClearButton, setShowClearButton] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid")
  const isMobile = useIsMobile()

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowClearButton(value.length > 0)

    // If user is typing, show searching state
    if (value.length > 0 && !isSearching) {
      setIsSearching(true)
    } else if (value.length === 0 && isSearching) {
      setIsSearching(false)
    }
  }

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("")
    setShowClearButton(false)
    setIsSearching(false)
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      // In a real app, you would fetch search results here
    }
  }

  // Add recent search when user submits
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement?.id === "search-input") {
        setIsSearching(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input"
              placeholder="Search products, stores, categories..."
              className="pl-9 pr-16"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {showClearButton && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-[70px] top-1/2 transform -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-muted text-muted-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button type="button" className="h-8 w-8 flex items-center justify-center text-muted-foreground">
                <Mic className="h-4 w-4" />
              </button>
              <button type="button" className="h-8 w-8 flex items-center justify-center text-muted-foreground">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {!isSearching ? (
          // Show search suggestions when not actively searching
          <div className="space-y-6">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium">Recent Searches</h2>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-primary text-xs">
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full p-2 hover:bg-muted rounded-md text-sm"
                      onClick={() => {
                        setSearchQuery(search)
                        setShowClearButton(true)
                        setIsSearching(true)
                      }}
                    >
                      <SearchIcon className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm font-medium mb-3">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setSearchQuery(search)
                      setShowClearButton(true)
                      setIsSearching(true)
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium mb-3">Browse Categories</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {["Fashion", "Food", "Beauty", "Home", "Art", "Electronics"].map((category, index) => (
                  <Link key={index} href={`/marketplace?category=${category}`}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                      <CardContent className="p-3 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                          {category.charAt(0)}
                        </div>
                        <span className="text-xs">{category}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Show search results when actively searching
          <div>
            {/* Search Results Tabs */}
            <Tabs defaultValue="products" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid grid-cols-2 w-[200px]">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="stores">Stores</TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${layoutType === "grid" ? "bg-muted" : ""}`}
                      onClick={() => setLayoutType("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${layoutType === "list" ? "bg-muted" : ""}`}
                      onClick={() => setLayoutType("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-2" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[80vh]" : ""}>
                      <div className="py-4">
                        <h3 className="font-medium mb-4">Filter Results</h3>
                        {/* Filter content would go here */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Price Range</h4>
                            {/* Price range slider would go here */}
                            <div className="h-8 bg-muted rounded-md"></div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Rating</h4>
                            {/* Rating filter would go here */}
                            <div className="space-y-2">
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center">
                                  <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                                  <label htmlFor={`rating-${rating}`} className="text-sm">
                                    {rating} Stars & Above
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Shipping</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input type="checkbox" id="free-shipping" className="mr-2" />
                                <label htmlFor="free-shipping" className="text-sm">
                                  Free Shipping
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-6">
                          <Button variant="outline" className="flex-1">
                            Reset
                          </Button>
                          <Button className="flex-1">Apply Filters</Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Button variant="outline" size="sm" className="h-8 flex items-center">
                    <span>Sort</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              <TabsContent value="products">
                {layoutType === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productResults.map((product) => (
                      <Link key={product.id} href={`/product-detail`} className="group">
                        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full">
                          <div className="aspect-square relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.discount && (
                              <Badge className="absolute top-2 left-2 bg-primary">-{product.discount}</Badge>
                            )}
                            {product.freeShipping && (
                              <Badge
                                variant="outline"
                                className="absolute bottom-2 left-2 bg-background/80 text-xs border-none"
                              >
                                Free Shipping
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-3">
                            <p className="text-xs text-muted-foreground">{product.store}</p>
                            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={star <= Math.floor(product.rating) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    className={`h-3 w-3 ${
                                      star <= Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-muted-foreground stroke-muted-foreground"
                                    }`}
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                            </div>
                            <p className="text-sm font-bold mt-1">₦{product.price.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {productResults.map((product) => (
                      <Link key={product.id} href={`/product-detail`} className="block group">
                        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                              {product.discount && (
                                <Badge className="absolute top-1 left-1 bg-primary text-xs">-{product.discount}</Badge>
                              )}
                            </div>
                            <CardContent className="p-3 flex-1">
                              <p className="text-xs text-muted-foreground">{product.store}</p>
                              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                      key={star}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill={star <= Math.floor(product.rating) ? "currentColor" : "none"}
                                      stroke="currentColor"
                                      className={`h-3 w-3 ${
                                        star <= Math.floor(product.rating)
                                          ? "text-yellow-400"
                                          : "text-muted-foreground stroke-muted-foreground"
                                      }`}
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-sm font-bold">₦{product.price.toLocaleString()}</p>
                                {product.freeShipping && (
                                  <Badge variant="outline" className="text-xs border-none bg-muted">
                                    Free Shipping
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="stores">
                <div className="space-y-4">
                  {storeResults.map((store) => (
                    <Link key={store.id} href={`/business/${store.id}`}>
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className="w-24 h-24 relative">
                            <Image
                              src={store.image || "/placeholder.svg"}
                              alt={store.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-3 flex-1">
                            <h3 className="font-medium">{store.name}</h3>
                            <p className="text-xs text-muted-foreground">{store.category}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={star <= Math.floor(store.rating) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    className={`h-3 w-3 ${
                                      star <= Math.floor(store.rating)
                                        ? "text-yellow-400"
                                        : "text-muted-foreground stroke-muted-foreground"
                                    }`}
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-1">({store.rating})</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{store.location}</p>
                              <Badge variant="outline" className="text-xs">
                                {store.products} Products
                              </Badge>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

