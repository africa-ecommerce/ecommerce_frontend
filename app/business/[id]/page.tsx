"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Share,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample business data
const businessData = {
  id: 1,
  name: "Adire Textiles",
  category: "Fashion & Clothing",
  rating: 4.5,
  reviews: 124,
  location: "Lagos, Nigeria",
  image: "/placeholder.svg?height=200&width=200",
  banner: "/placeholder.svg?height=300&width=800",
  description:
    "Adire Textiles specializes in traditional African fabrics and modern clothing designs. Our products are handcrafted by skilled artisans using traditional techniques passed down through generations.",
  established: "2015",
  contactPhone: "+234 812 345 6789",
  contactEmail: "info@adiretextiles.com",
  openingHours: "Mon-Sat: 9am-6pm, Sun: Closed",
  socialMedia: {
    instagram: "@adiretextiles",
    facebook: "AdiretextilesNG",
    twitter: "@adiretextiles",
  },
  products: [
    {
      id: 101,
      name: "Traditional Ankara Fabric Blouse",
      price: 12500,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      discount: "17%",
      freeShipping: true,
    },
    {
      id: 102,
      name: "African Print Headwrap",
      price: 2500,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      discount: null,
      freeShipping: true,
    },
    {
      id: 103,
      name: "Embroidered Dashiki Shirt",
      price: 9800,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      discount: "10%",
      freeShipping: false,
    },
    {
      id: 104,
      name: "Handwoven Kente Scarf",
      price: 7500,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.2,
      discount: null,
      freeShipping: true,
    },
    {
      id: 105,
      name: "Adire Fabric - 6 Yards",
      price: 15000,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      discount: "5%",
      freeShipping: false,
    },
    {
      id: 106,
      name: "Beaded Ankara Clutch Purse",
      price: 6500,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.4,
      discount: null,
      freeShipping: true,
    },
  ],
}

export default function BusinessPage() {
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid")
  const [isFollowing, setIsFollowing] = useState(false)
  const isMobile = useIsMobile()

  // Format price in Naira
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/marketplace" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium truncate">{businessData.name}</h1>
      </div>

      <div>
        {/* Business Banner */}
        <div className="relative w-full h-[200px] md:h-[300px]">
          <Image
            src={businessData.banner || "/placeholder.svg"}
            alt={businessData.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <div className="container mx-auto flex items-end">
              <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-lg overflow-hidden border-2 border-white">
                <Image
                  src={businessData.image || "/placeholder.svg"}
                  alt={businessData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-3 md:ml-4 flex-1">
                <h1 className="text-xl md:text-2xl font-bold">{businessData.name}</h1>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(businessData.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm">
                    {businessData.rating} ({businessData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{businessData.location}</span>
                </div>
              </div>

              <div className="hidden md:flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white text-white hover:bg-white/30 hover:text-white"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant={isFollowing ? "default" : "outline"}
                  size="sm"
                  className={
                    isFollowing
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white/20 border-white text-white hover:bg-white/30 hover:text-white"
                  }
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden container mx-auto px-4 py-3 flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant={isFollowing ? "default" : "outline"}
            size="sm"
            className="flex-1"
            onClick={() => setIsFollowing(!isFollowing)}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-6">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {/* Search and Filter Bar */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search in this store..." className="pl-9 pr-4" />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${layoutType === "grid" ? "bg-muted" : ""}`}
                      onClick={() => setLayoutType("grid")}
                    >
                      <Grid className="h-4 w-4" />
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

                  <Button variant="outline" size="sm" className="h-8 flex items-center">
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Filter
                  </Button>

                  <Button variant="outline" size="sm" className="h-8 flex items-center">
                    <span>Sort</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {layoutType === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {businessData.products.map((product) => (
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
                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                        </div>
                        <p className="text-sm font-bold mt-1">{formatPrice(product.price)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {businessData.products.map((product) => (
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
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= Math.floor(product.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm font-bold">{formatPrice(product.price)}</p>
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

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline">Load More Products</Button>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {businessData.name}</h2>

                <p className="text-muted-foreground mb-6">{businessData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Business Information</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-muted-foreground w-32">Established:</span>
                        <span>{businessData.established}</span>
                      </div>
                      <div className="flex">
                        <span className="text-muted-foreground w-32">Category:</span>
                        <span>{businessData.category}</span>
                      </div>
                      <div className="flex">
                        <span className="text-muted-foreground w-32">Location:</span>
                        <span>{businessData.location}</span>
                      </div>
                      <div className="flex">
                        <span className="text-muted-foreground w-32">Opening Hours:</span>
                        <span>{businessData.openingHours}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-3" />
                        <span>{businessData.contactPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-3" />
                        <span>{businessData.contactEmail}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-3" />
                        <span>{businessData.location}</span>
                      </div>
                    </div>

                    <h3 className="font-medium mt-6 mb-3">Social Media</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#E1306C] flex items-center justify-center text-white mr-3">
                          <span className="text-xs">IG</span>
                        </div>
                        <span>{businessData.socialMedia.instagram}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white mr-3">
                          <span className="text-xs">FB</span>
                        </div>
                        <span>{businessData.socialMedia.facebook}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white mr-3">
                          <span className="text-xs">TW</span>
                        </div>
                        <span>{businessData.socialMedia.twitter}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-3">Store Location</h3>
                  <div className="aspect-[16/9] bg-muted rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                      <span className="sr-only">Map location</span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Button size="sm">Get Directions</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Customer Reviews</h2>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(businessData.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-lg font-medium">{businessData.rating} out of 5</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Based on {businessData.reviews} reviews</p>
                  </div>

                  <Button>Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      name: "Jane Okafor",
                      rating: 5,
                      date: "2 weeks ago",
                      comment:
                        "Beautiful products with vibrant colors. The fabric is high quality and the fit is perfect. Highly recommend this seller!",
                      avatar: "JO",
                    },
                    {
                      id: 2,
                      name: "Amina Mohammed",
                      rating: 4,
                      date: "1 month ago",
                      comment:
                        "Nice products but the size runs small. I should have ordered one size up. The colors are beautiful though and delivery was prompt.",
                      avatar: "AM",
                    },
                    {
                      id: 3,
                      name: "Tunde Dare",
                      rating: 5,
                      date: "2 months ago",
                      comment:
                        "Great quality and fast shipping. The design is exactly as pictured. Will definitely order from this store again.",
                      avatar: "TD",
                    },
                  ].map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                              {review.avatar}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

