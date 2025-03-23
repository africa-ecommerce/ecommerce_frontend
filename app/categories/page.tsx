"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample categories data
const mainCategories = [
  { id: 1, name: "Fashion", icon: "👗", color: "bg-pink-500", count: 1240 },
  { id: 2, name: "Home & Kitchen", icon: "🏠", color: "bg-blue-500", count: 856 },
  { id: 3, name: "Electronics", icon: "📱", color: "bg-purple-500", count: 723 },
  { id: 4, name: "Food", icon: "🍲", color: "bg-yellow-500", count: 689 },
  { id: 5, name: "Beauty", icon: "💄", color: "bg-red-500", count: 542 },
  { id: 6, name: "Art & Crafts", icon: "🎨", color: "bg-green-500", count: 421 },
  { id: 7, name: "Books", icon: "📚", color: "bg-indigo-500", count: 387 },
  { id: 8, name: "Health", icon: "💊", color: "bg-teal-500", count: 356 },
  { id: 9, name: "Jewelry", icon: "💍", color: "bg-amber-500", count: 298 },
  { id: 10, name: "Garden", icon: "🌱", color: "bg-lime-500", count: 245 },
  { id: 11, name: "Sports", icon: "⚽", color: "bg-cyan-500", count: 234 },
  { id: 12, name: "Toys", icon: "🧸", color: "bg-orange-500", count: 189 },
]

const fashionSubcategories = [
  { id: 101, name: "Women's Clothing", image: "/placeholder.svg?height=100&width=100", count: 450 },
  { id: 102, name: "Men's Clothing", image: "/placeholder.svg?height=100&width=100", count: 380 },
  { id: 103, name: "Traditional Wear", image: "/placeholder.svg?height=100&width=100", count: 210 },
  { id: 104, name: "Shoes", image: "/placeholder.svg?height=100&width=100", count: 175 },
  { id: 105, name: "Bags & Accessories", image: "/placeholder.svg?height=100&width=100", count: 145 },
  { id: 106, name: "Jewelry", image: "/placeholder.svg?height=100&width=100", count: 120 },
]

const foodSubcategories = [
  { id: 401, name: "Spices & Seasonings", image: "/placeholder.svg?height=100&width=100", count: 180 },
  { id: 402, name: "Grains & Rice", image: "/placeholder.svg?height=100&width=100", count: 165 },
  { id: 403, name: "Snacks", image: "/placeholder.svg?height=100&width=100", count: 140 },
  { id: 404, name: "Beverages", image: "/placeholder.svg?height=100&width=100", count: 120 },
  { id: 405, name: "Cooking Oils", image: "/placeholder.svg?height=100&width=100", count: 85 },
  { id: 406, name: "Fresh Produce", image: "/placeholder.svg?height=100&width=100", count: 75 },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter categories based on search query
  const filteredCategories = mainCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredCategories.map((category) => (
                <Link key={category.id} href={`/marketplace?category=${category.name}`}>
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center h-full">
                      <div
                        className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-white text-2xl mb-3`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.count} items</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Fashion</h3>
                  <Link href="/marketplace?category=Fashion" className="text-sm text-primary flex items-center">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {fashionSubcategories.map((subcategory) => (
                    <Link key={subcategory.id} href={`/marketplace?subcategory=${subcategory.name}`}>
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={subcategory.image || "/placeholder.svg"}
                            alt={subcategory.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium truncate">{subcategory.name}</h4>
                          <p className="text-xs text-muted-foreground">{subcategory.count} items</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Food</h3>
                  <Link href="/marketplace?category=Food" className="text-sm text-primary flex items-center">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {foodSubcategories.map((subcategory) => (
                    <Link key={subcategory.id} href={`/marketplace?subcategory=${subcategory.name}`}>
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={subcategory.image || "/placeholder.svg"}
                            alt={subcategory.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium truncate">{subcategory.name}</h4>
                          <p className="text-xs text-muted-foreground">{subcategory.count} items</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Recently Viewed Categories</h2>

            <div className="space-y-3">
              {[
                { id: 103, name: "Traditional Wear", count: 210, time: "2 hours ago" },
                { id: 402, name: "Grains & Rice", count: 165, time: "Yesterday" },
                { id: 105, name: "Bags & Accessories", count: 145, time: "2 days ago" },
              ].map((category) => (
                <Link key={category.id} href={`/marketplace?subcategory=${category.name}`}>
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-xs text-muted-foreground">{category.count} items</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">{category.time}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <h2 className="text-lg font-semibold mb-4">Recommended For You</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 106, name: "Jewelry", count: 120, image: "/placeholder.svg?height=100&width=100" },
                  { id: 403, name: "Snacks", count: 140, image: "/placeholder.svg?height=100&width=100" },
                  { id: 102, name: "Men's Clothing", count: 380, image: "/placeholder.svg?height=100&width=100" },
                ].map((category) => (
                  <Link key={category.id} href={`/marketplace?subcategory=${category.name}`}>
                    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h4 className="text-sm font-medium truncate">{category.name}</h4>
                        <p className="text-xs text-muted-foreground">{category.count} items</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

