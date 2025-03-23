"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share, Star, Truck, Clock, CreditCard, Plus, Minus, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProductPage() {
  const [mainImage, setMainImage] = useState("/placeholder.svg?height=500&width=500")
  const [quantity, setQuantity] = useState(1)

  const images = [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ]

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col w-full pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/marketplace" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium flex-1 truncate">Traditional Ankara Fabric Blouse</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumbs - Desktop Only */}
        <div className="hidden md:flex items-center text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link href="/marketplace" className="text-muted-foreground hover:text-foreground">
            Fashion
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span>Traditional Ankara Fabric Blouse</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image src={mainImage || "/placeholder.svg"} alt="Product Image" fill className="object-cover" />
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex space-x-2 pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className="min-w-[80px] h-20 border rounded-md overflow-hidden hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setMainImage(img)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Product Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Traditional Ankara Fabric Blouse</h1>

              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(24 reviews)</span>
                </div>

                <Badge variant="outline" className="text-sm font-normal">
                  In Stock
                </Badge>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="text-3xl font-bold">₦12,500</span>
              <span className="ml-3 text-lg text-muted-foreground line-through">₦15,000</span>
              <Badge className="ml-2 bg-green-600">Save 17%</Badge>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <Button key={size} variant={size === "M" ? "default" : "outline"} className="min-w-[48px] h-10">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-md"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center h-10 w-14 border rounded-md">{quantity}</div>
                <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-md">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-12 h-12 rounded-full p-0 sm:w-auto sm:h-auto sm:rounded-md sm:p-3"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Wishlist</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-12 h-12 rounded-full p-0 sm:w-auto sm:h-auto sm:rounded-md sm:p-3"
              >
                <Share className="h-5 w-5" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Share</span>
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Delivery</h4>
                  <p className="text-sm text-muted-foreground">Free shipping to Lagos. ₦1,500 to other states.</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Estimated Delivery</h4>
                  <p className="text-sm text-muted-foreground">2-4 business days</p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Payment Options</h4>
                  <p className="text-sm text-muted-foreground">Card, Bank Transfer, USSD, Mobile Money</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6 space-y-4">
              <p>
                This beautiful Traditional Ankara Fabric Blouse combines modern style with African heritage. Crafted
                from high-quality 100% cotton Ankara fabric, this blouse features vibrant patterns that showcase the
                rich cultural heritage of West Africa.
              </p>
              <p>
                The blouse has a comfortable semi-fitted design with a round neckline and short sleeves, making it
                perfect for both casual and semi-formal occasions. Each piece is carefully handcrafted by skilled
                artisans, ensuring attention to detail and quality.
              </p>
              <p>
                The versatile design allows it to be paired easily with jeans, skirts, or traditional wrapper fabrics.
                The breathable cotton material makes it comfortable for everyday wear in warm African climates.
              </p>
              <p>
                This blouse not only adds a vibrant touch to your wardrobe but also supports local African craftsmanship
                and textile traditions.
              </p>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Material</td>
                    <td className="py-2">100% Cotton Ankara Fabric</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Style</td>
                    <td className="py-2">Semi-Fitted Blouse</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Neckline</td>
                    <td className="py-2">Round Neck</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Sleeve Length</td>
                    <td className="py-2">Short Sleeve</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Care Instructions</td>
                    <td className="py-2">Hand wash cold, Line dry</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Origin</td>
                    <td className="py-2">Made in Nigeria</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-lg font-medium">4.0 out of 5</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Based on 24 reviews</p>
                </div>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <Card key={review}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                            {review === 1 ? "JO" : review === 2 ? "AM" : "TD"}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">
                              {review === 1 ? "Jane Okafor" : review === 2 ? "Amina Mohammed" : "Tunde Dare"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review === 1 ? "2 weeks ago" : review === 2 ? "1 month ago" : "2 months ago"}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= (review === 2 ? 3 : 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3">
                        {review === 1
                          ? "Beautiful blouse with vibrant colors. The fabric is high quality and the fit is perfect. Highly recommend this seller!"
                          : review === 2
                            ? "Nice blouse but the size runs small. I should have ordered one size up. The colors are beautiful though."
                            : "Great quality and fast shipping. The design is exactly as pictured. Will definitely order from this store again."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Seller Information */}
        <div className="mt-12 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Sold By</h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden mr-4">
                <Image src="/placeholder.svg?height=64&width=64" alt="Adire Textiles" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Adire Textiles</h3>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-1 text-xs">(124 reviews)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Lagos, Nigeria</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Visit Store</Button>
              <Button>Contact Seller</Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href="/product-detail" className="group">
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=Product+${i}`}
                      alt={`Related Product ${i}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-muted-foreground hover:text-primary hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {i === 1
                        ? "Ankara Print Headwrap"
                        : i === 2
                          ? "Traditional Beaded Necklace"
                          : i === 3
                            ? "Handwoven Straw Bag"
                            : "Embroidered Dashiki Shirt"}
                    </h3>
                    <p className="text-sm font-bold mt-1">
                      ₦{i === 1 ? "2,500" : i === 2 ? "8,700" : i === 3 ? "5,200" : "9,800"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

