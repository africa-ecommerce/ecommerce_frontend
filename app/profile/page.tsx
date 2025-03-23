"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Settings, Heart, LogOut, ChevronRight, Bell, HelpCircle, CreditCard, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Profile Header */}
      <div className="relative bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 pt-6 pb-16">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-3">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Profile"
                fill
                className="rounded-full object-cover border-2 border-primary-foreground"
              />
              <button className="absolute bottom-0 right-0 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center">
                <Settings className="w-3 h-3" />
              </button>
            </div>
            <h1 className="text-xl font-bold">Amina Mohammed</h1>
            <p className="text-sm text-primary-foreground/80">amina@example.com</p>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                Premium Member
              </Badge>
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute -bottom-5 left-0 right-0 h-6 bg-background rounded-t-3xl"></div>
      </div>

      <div className="container mx-auto px-4 -mt-2 z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Orders</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-xs text-muted-foreground">Wishlist</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6 space-y-4">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y">
                  <Link
                    href="/profile/personal-info"
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-primary mr-3" />
                      <span>Personal Information</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>

                  <Link
                    href="/profile/addresses"
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-3" />
                      <span>My Addresses</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>

                  <Link
                    href="/profile/payment-methods"
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-primary mr-3" />
                      <span>Payment Methods</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>

                  <Link
                    href="/profile/notifications"
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-primary mr-3" />
                      <span>Notifications</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 text-primary border-none">4 New</Badge>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>

                  <Link
                    href="/help"
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <HelpCircle className="w-5 h-5 text-primary mr-3" />
                      <span>Help & Support</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>

            <div className="text-center text-xs text-muted-foreground mt-6">
              <p>App Version 1.0.3</p>
              <p className="mt-1">© 2023 AfriConnect. All rights reserved.</p>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Recent Orders</h2>
              <Button variant="link" className="text-primary p-0 h-auto">
                View All
              </Button>
            </div>

            {[1, 2, 3].map((order) => (
              <Card key={order} className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">Order #{order === 1 ? "3210" : order === 2 ? "3209" : "3204"}</p>
                      <p className="text-xs text-muted-foreground">
                        {order === 1 ? "Feb 20, 2023" : order === 2 ? "Jan 5, 2023" : "Dec 12, 2022"}
                      </p>
                    </div>
                    <Badge
                      className={
                        order === 1
                          ? "bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none"
                          : order === 2
                            ? "bg-blue-500/20 text-blue-600 hover:bg-blue-500/20 border-none"
                            : "bg-orange-500/20 text-orange-600 hover:bg-orange-500/20 border-none"
                      }
                    >
                      {order === 1 ? "Delivered" : order === 2 ? "Shipped" : "Processing"}
                    </Badge>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex -space-x-2 mr-3">
                      {[1, 2, order === 3 ? 3 : null].filter(Boolean).map((item) => (
                        <div
                          key={item}
                          className="w-10 h-10 rounded-md border border-background overflow-hidden relative"
                        >
                          <Image
                            src={`/placeholder.svg?height=40&width=40&text=Item+${item}`}
                            alt={`Item ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{order === 1 ? "3" : order === 2 ? "2" : "4"} items</span>
                      <span className="mx-2">•</span>
                      <span>{order === 1 ? "₦12,500" : order === 2 ? "₦8,700" : "₦24,350"}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Track Order
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center py-4">
              <Button variant="outline">View Order History</Button>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <Tabs defaultValue="wishlist" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="stores">Saved Stores</TabsTrigger>
              </TabsList>

              <TabsContent value="wishlist" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Link key={item} href="/product-detail" className="group">
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-square relative">
                          <Image
                            src={`/placeholder.svg?height=150&width=150&text=Item+${item}`}
                            alt={`Wishlist Item ${item}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 text-destructive hover:text-destructive hover:bg-white"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {item === 1
                              ? "Ankara Print Headwrap"
                              : item === 2
                                ? "Traditional Beaded Necklace"
                                : item === 3
                                  ? "Handwoven Straw Bag"
                                  : "Embroidered Dashiki Shirt"}
                          </h3>
                          <p className="text-sm font-bold mt-1">
                            ₦{item === 1 ? "2,500" : item === 2 ? "8,700" : item === 3 ? "5,200" : "9,800"}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stores" className="mt-4">
                <div className="space-y-3">
                  {[1, 2, 3].map((store) => (
                    <Link key={store} href={`/business/${store}`}>
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className="w-20 h-20 relative">
                            <Image
                              src={`/placeholder.svg?height=80&width=80&text=Store+${store}`}
                              alt={`Store ${store}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-3 flex-1">
                            <h3 className="font-medium">
                              {store === 1
                                ? "Adire Textiles"
                                : store === 2
                                  ? "Lagos Leatherworks"
                                  : "Natural Beauty Co."}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {store === 1 ? "Fashion & Clothing" : store === 2 ? "Accessories" : "Beauty Products"}
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={star <= (store === 3 ? 3 : 4) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    className={`h-3 w-3 ${
                                      star <= (store === 3 ? 3 : 4)
                                        ? "text-yellow-400"
                                        : "text-muted-foreground stroke-muted-foreground"
                                    }`}
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-1">
                                ({store === 1 ? "124" : store === 2 ? "89" : "37"})
                              </span>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

