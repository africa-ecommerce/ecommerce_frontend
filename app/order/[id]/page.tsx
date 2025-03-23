"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, Truck, Phone, Mail, Clock, CreditCard, FileText, Printer, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample order data
const orderData = {
  id: "3210",
  date: "February 20, 2023",
  status: "delivered",
  customer: {
    name: "Amina Mohammed",
    email: "amina@example.com",
    phone: "+234 812 345 6789",
    address: {
      street: "123 Broad Street, Yaba",
      city: "Lagos",
      state: "Lagos State",
      country: "Nigeria",
      postalCode: "101233",
    },
  },
  items: [
    {
      id: 1,
      name: "Traditional Ankara Fabric Blouse",
      price: 12500,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      variant: "Size: M, Color: Blue",
    },
    {
      id: 2,
      name: "African Print Headwrap",
      price: 2500,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      variant: "Color: Multicolor",
    },
  ],
  shipping: {
    method: "Standard Delivery",
    cost: 1500,
    trackingNumber: "NGP123456789",
    carrier: "DHL Express",
    estimatedDelivery: "February 24, 2023",
  },
  payment: {
    method: "Credit Card",
    cardLast4: "3456",
    transactionId: "TXN123456789",
    status: "paid",
  },
  timeline: [
    { date: "February 20, 2023", time: "10:30 AM", status: "Order Placed", description: "Order #3210 was placed" },
    {
      date: "February 20, 2023",
      time: "11:45 AM",
      status: "Payment Confirmed",
      description: "Payment was successfully processed",
    },
    {
      date: "February 21, 2023",
      time: "09:15 AM",
      status: "Processing",
      description: "Order is being prepared for shipping",
    },
    {
      date: "February 22, 2023",
      time: "02:30 PM",
      status: "Shipped",
      description: "Order has been shipped via DHL Express",
    },
    {
      date: "February 24, 2023",
      time: "11:20 AM",
      status: "Delivered",
      description: "Package was delivered successfully",
    },
  ],
  subtotal: 15000,
  tax: 0,
  total: 16500,
}

export default function OrderDetailPage() {
  // Format price in Naira
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  // Get status badge for order
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20 border-none">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/20 border-none">Processing</Badge>
      case "shipped":
        return <Badge className="bg-purple-500/20 text-purple-600 hover:bg-purple-500/20 border-none">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/20 border-none">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-600 hover:bg-gray-500/20 border-none">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/profile/orders" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Order #{orderData.id}</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumbs - Desktop Only */}
        <div className="hidden md:flex items-center text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link href="/profile" className="text-muted-foreground hover:text-foreground">
            Profile
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link href="/profile/orders" className="text-muted-foreground hover:text-foreground">
            Orders
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span>Order #{orderData.id}</span>
        </div>

        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold hidden md:block">Order #{orderData.id}</h1>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground">Placed on {orderData.date}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              {getStatusBadge(orderData.status)}
            </div>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Order Items</h2>

                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex">
                      <div className="w-16 h-16 relative rounded-md overflow-hidden mr-4">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.variant}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="text-sm text-muted-foreground">{formatPrice(item.price)} each</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(orderData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(orderData.shipping.cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(orderData.tax)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(orderData.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Order Timeline</h2>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-3 top-1 bottom-0 w-0.5 bg-muted"></div>

                  {/* Timeline events */}
                  <div className="space-y-6">
                    {orderData.timeline.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary mr-4">
                          <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{event.status}</h3>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {event.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Customer Information</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                    <p className="font-medium">{orderData.customer.name}</p>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{orderData.customer.email}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{orderData.customer.phone}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Shipping Address</h3>
                    <p className="font-medium">{orderData.customer.name}</p>
                    <p className="text-sm">
                      {orderData.customer.address.street}
                      <br />
                      {orderData.customer.address.city}, {orderData.customer.address.state}
                      <br />
                      {orderData.customer.address.country}, {orderData.customer.address.postalCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Shipping Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{orderData.shipping.method}</p>
                      <p className="text-sm text-muted-foreground">{orderData.shipping.carrier}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Package className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Tracking Number</p>
                      <p className="text-sm">{orderData.shipping.trackingNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm">{orderData.shipping.estimatedDelivery}</p>
                    </div>
                  </div>

                  <Button className="w-full">Track Package</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Payment Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{orderData.payment.method}</p>
                      <p className="text-sm text-muted-foreground">**** **** **** {orderData.payment.cardLast4}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Transaction ID</p>
                      <p className="text-sm">{orderData.payment.transactionId}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none">
                      {orderData.payment.status === "paid" ? "Paid" : orderData.payment.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Need Help?</h2>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Return or Exchange Items
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Report a Problem
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

