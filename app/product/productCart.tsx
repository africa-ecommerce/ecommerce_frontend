


"use client"

import { useState } from "react"
import Image from "next/image"
// import Link from "next/link"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { getProduct } from "@/lib/products"

// Single product data
// const productData = {
//   id: 1,
//   name: "Traditional Ankara Fabric Blouse",
//   price: 12500,
//   description:
//     "Beautiful handcrafted Ankara fabric blouse with modern design elements. Made from high-quality cotton with vibrant patterns that showcase African heritage and craftsmanship.",
//   features: [
//     "100% authentic Ankara fabric",
//     "Handmade by local artisans",
//     "Breathable cotton material",
//     "Vibrant colors that don't fade easily",
//   ],
//   image: "/placeholder.svg?height=400&width=400",
//   size: "M",
//   color: "Multicolor",
//   seller: "Adire Textiles",
//   inStock: true,
// }
interface SingleProductCartProps {
  productId?: string
  referralId?: string
  platform?: string
}

export const SingleProductCart = ({ productId, referralId, platform }: SingleProductCartProps) => {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const { product: productData, isLoading, isError } = getProduct(productId, referralId);


  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  // Calculate total
  const subtotal = productData.price * quantity
  const deliveryFee = 1500
  const total = subtotal + deliveryFee



  const handleCheckout = () => {
    // Build the checkout URL with tracking parameters
    let checkoutUrl = `/checkout?pid=${productId}`
    
    // Add referral info if available
    if (referralId) {
      checkoutUrl += `&ref=${referralId}`
    }
    
    // Add platform info if available
    if (platform) {
      checkoutUrl += `&platform=${platform}`
    }
    
    // Navigate to checkout page with tracking parameters
    router.push(checkoutUrl)
  }

  // Format price in Naira
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl font-bold mb-6">Product Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 relative w-full md:w-1/2 aspect-square rounded-md overflow-hidden">
                    <Image
                      src={productData?.images[0] || "/placeholder.svg"}
                      alt={productData?.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{productData?.name}</h2>
                    <div className="flex flex-wrap text-sm text-muted-foreground mb-4">
                      <span className="mr-4">Size: {productData?.size}</span>
                      <span className="mr-4">Color: {productData?.color}</span>
                      <span>Seller: {productData?.seller}</span>
                    </div>

                    <p className="text-xl font-semibold mb-4">{formatPrice(productData?.price)}</p>

                    <div className="mb-6">
                      <p className="mb-4">{productData.description}</p>
                      <ul className="space-y-2">
                        {productData.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateQuantity(-1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateQuantity(1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <span className={productData?.inStock ? "text-green-600" : "text-red-600"}>
                        {productData?.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product Price</span>
                      <span>{formatPrice(productData?.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity</span>
                      <span>x {quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <span className="mr-2">•</span>
                      <p>Orders are typically delivered within 2-4 business days</p>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">•</span>
                      <p>We accept returns within 7 days of delivery</p>
                    </div>
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-primary">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

