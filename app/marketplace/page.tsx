"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, MapPin, Star, X, Grid, List, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample categories
const categories = [
  "Fashion",
  "Home & Kitchen",
  "Electronics",
  "Food",
  "Beauty & Personal Care",
  "Art & Crafts",
  "Books",
  "Health",
  "Jewelry",
  "Garden",
]

// Sample businesses data
const businesses = Array(16)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Business ${i + 1}`,
    category: categories[i % categories.length],
    rating: Math.floor(Math.random() * 5) + 1,
    location: i % 3 === 0 ? "Lagos" : i % 3 === 1 ? "Accra" : "Nairobi",
    image: `/placeholder.svg?height=200&width=300&text=Business+${i + 1}`,
    featured: i < 4,
    products: Math.floor(Math.random() * 50) + 5,
  }))

export default function MarketplacePage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState("featured")
  const isMobile = useIsMobile()

  // Filter businesses based on selected categories
  const filteredBusinesses =
    selectedCategories.length > 0
      ? businesses.filter((business) => selectedCategories.includes(business.category))
      : businesses

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search businesses or products" className="w-full pl-9 pr-4" />
            </div>

            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[80vh]" : ""}>
                <SheetHeader>
                  <SheetTitle>Filter Businesses</SheetTitle>
                </SheetHeader>
                <div className="py-4 overflow-auto">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Location</h3>
                      <div className="space-y-2">
                        {["Lagos", "Accra", "Nairobi", "Johannesburg", "Dakar"].map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox id={`location-${location}`} />
                            <label
                              htmlFor={`location-${location}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Rating</h3>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <Checkbox id={`rating-${rating}`} />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                            >
                              {Array(rating)
                                .fill(null)
                                .map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              {Array(5 - rating)
                                .fill(null)
                                .map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-muted-foreground" />
                                ))}
                              <span className="ml-1">& Up</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Features</h3>
                      <div className="space-y-2">
                        {["Free Delivery", "Pickup Available", "WhatsApp Orders", "Same Day Delivery"].map(
                          (feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox id={`feature-${feature}`} />
                              <label
                                htmlFor={`feature-${feature}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {feature}
                              </label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <div className="flex w-full space-x-2">
                    <Button variant="outline" className="flex-1" onClick={clearFilters}>
                      Reset
                    </Button>
                    <SheetClose asChild>
                      <Button className="flex-1">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={layoutType === "grid" ? "bg-muted" : ""}
                onClick={() => setLayoutType("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={layoutType === "list" ? "bg-muted" : ""}
                onClick={() => setLayoutType("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="hidden md:flex w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="rating-high">Highest Rated</SelectItem>
                <SelectItem value="rating-low">Lowest Rated</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Active Filters Section */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Active Filters:</span>
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <button onClick={() => toggleCategory(category)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button variant="link" size="sm" className="text-primary h-auto p-0" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Featured Businesses */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Businesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredBusinesses
              .filter((b) => b.featured)
              .map((business) => (
                <BusinessCard key={business.id} business={business} layoutType="grid" />
              ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Category Quick Links */}
        <div className="flex overflow-x-auto py-2 mb-6 gap-2 no-scrollbar">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Mobile Sort Section */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <div className="text-sm font-medium">{filteredBusinesses.length} businesses</div>
          <Button variant="ghost" size="sm" className="flex items-center">
            Sort by <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* All Businesses */}
        <section>
          <h2 className="text-xl font-semibold mb-4 hidden md:block">All Businesses</h2>
          {layoutType === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} layoutType="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} layoutType="list" />
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button key={page} variant={page === 1 ? "default" : "outline"} size="icon" className="w-8 h-8">
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BusinessCardProps {
  business: {
    id: number
    name: string
    category: string
    rating: number
    location: string
    image: string
    featured: boolean
    products: number
  }
  layoutType: "grid" | "list"
}

function BusinessCard({ business, layoutType }: BusinessCardProps) {
  if (layoutType === "grid") {
    return (
      <Link href={`/business/${business.id}`}>
        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
          <div className="aspect-[4/3] relative">
            <Image src={business.image || "/placeholder.svg"} alt={business.name} fill className="object-cover" />
            {business.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium truncate">{business.name}</h3>
            <div className="flex items-center mt-1">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < business.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              <span className="ml-1 text-xs text-muted-foreground">({business.rating}.0)</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="text-xs font-normal">
                {business.category}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {business.location}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">{business.products} products</div>
          </CardContent>
        </Card>
      </Link>
    )
  } else {
    return (
      <Link href={`/business/${business.id}`}>
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex">
            <div className="w-32 sm:w-48 relative">
              <Image src={business.image || "/placeholder.svg"} alt={business.name} fill className="object-cover" />
              {business.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
            </div>
            <CardContent className="p-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="font-medium">{business.name}</h3>
                <div className="flex items-center mt-1 md:mt-0">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < business.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  <span className="ml-1 text-xs text-muted-foreground">({business.rating}.0)</span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="text-xs font-normal mr-2">
                  {business.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {business.location}
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p className="text-muted-foreground line-clamp-2">
                  {business.products} products available. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  varius volutpat mauris sit amet efficitur.
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }
}

