"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// Sample cart items data
const initialCartItems = [
  {
    id: 1,
    name: "Traditional Ankara Fabric Blouse",
    price: 12500,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    size: "M",
    color: "Multicolor",
    seller: "Adire Textiles",
  },
  {
    id: 2,
    name: "Handcrafted Leather Sandals",
    price: 8700,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    size: "42",
    color: "Brown",
    seller: "Lagos Leatherworks",
  },
  {
    id: 3,
    name: "Shea Butter Hair Cream - Natural",
    price: 3500,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    size: "200g",
    color: "N/A",
    seller: "Natural Beauty Co.",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Sample delivery fee
  const deliveryFee = 1500

  // Total cost
  const total = subtotal + deliveryFee

  // Format price in Naira
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Your Shopping Cart ({cartItems.length})</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumbs - Desktop Only */}
        <div className="hidden md:flex items-center text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span>Shopping Cart</span>
        </div>

        {/* Cart Title - Desktop Only */}
        <h1 className="text-2xl font-bold mb-6 hidden md:block">Your Shopping Cart ({cartItems.length})</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild size="lg">
              <Link href="/marketplace">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 relative w-full sm:w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 sm:ml-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium line-clamp-2 mb-1">{item.name}</h3>
                              <div className="flex flex-wrap text-xs text-muted-foreground mb-2">
                                <span className="mr-4">Size: {item.size}</span>
                                <span className="mr-4">Color: {item.color}</span>
                                <span>Seller: {item.seller}</span>
                              </div>
                              <p className="font-semibold mb-2 sm:mb-0">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <div className="flex items-center space-x-2 mr-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-md"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-md"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground h-8 w-8 rounded-md hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator className="my-6" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <Button variant="outline">
                  <Link href="/marketplace" className="flex w-full">
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline">Save for Later</Button>
              </div>

              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">You Might Also Like</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Link key={i} href={`/product-detail`} className="block group">
                        <div className="aspect-square relative rounded-md overflow-hidden mb-2">
                          <Image
                            src={`/placeholder.svg?height=120&width=120&text=Product+${i}`}
                            alt={`Recommended Product ${i}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {i === 1
                            ? "Beaded Necklace Set"
                            : i === 2
                              ? "Kente Fabric Scarf"
                              : i === 3
                                ? "Handmade Earrings"
                                : "Leather Belt"}
                        </h4>
                        <p className="text-sm font-semibold mt-1">{formatPrice(i * 2500)}</p>
                      </Link>
                    ))}
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
                        <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
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

                    <div className="flex items-center space-x-2 mb-6">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" className="shrink-0">
                        Apply
                      </Button>
                    </div>

                    <Button size="lg" className="w-full">
                      <Link href="/checkout" className="w-full">
                        Proceed to Checkout
                      </Link>
                    </Button>

                    <div className="mt-6 flex items-center justify-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        <Image src="/placeholder.svg?height=32&width=32&text=P" alt="Paystack" width={32} height={32} />
                      </div>
                      <div className="flex items-center justify-center w-8 h-8">
                        <Image
                          src="/placeholder.svg?height=32&width=32&text=F"
                          alt="Flutterwave"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex items-center justify-center w-8 h-8">
                        <Image
                          src="/placeholder.svg?height=32&width=32&text=M"
                          alt="MTN Mobile Money"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex items-center justify-center w-8 h-8">
                        <Image
                          src="/placeholder.svg?height=32&width=32&text=C"
                          alt="Cash on Delivery"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
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
                        <p>Items in your cart are not reserved until checkout is complete</p>
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
        )}
      </div>
    </div>
  )
}

