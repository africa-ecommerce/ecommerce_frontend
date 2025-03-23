"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  CreditCard,
  Settings,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Bell,
  MessageCircle,
  HelpCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const [period, setPeriod] = useState("week")

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Dashboard Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Seller Dashboard</h1>
              <p className="text-sm text-primary-foreground/80">Welcome back, Adire Textiles</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-sm font-medium">AT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Sales</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">₦45,250</span>
                <Badge className="ml-2 bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs previous {period}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Orders</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">24</span>
                <Badge className="ml-2 bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  8%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs previous {period}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Visitors</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">156</span>
                <Badge className="ml-2 bg-red-500/20 text-red-600 hover:bg-red-500/20 border-none">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  3%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs previous {period}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Conversion</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">15.4%</span>
                <Badge className="ml-2 bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  2%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs previous {period}</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Period Selector */}
        <div className="flex justify-end mb-6">
          <Tabs defaultValue="week" value={period} onValueChange={setPeriod} className="w-[300px]">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Sales Chart */}
        <Card className="border-none shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Sales Overview</h2>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>

            {/* Placeholder for chart */}
            <div className="aspect-[3/1] bg-muted/30 rounded-md flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Sales chart visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Recent Orders */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Recent Orders</h2>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-muted relative overflow-hidden mr-3">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&text=Order`}
                            alt="Order"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            Order #{order === 1 ? "3210" : order === 2 ? "3209" : "3204"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order === 1 ? "2 hours ago" : order === 2 ? "5 hours ago" : "Yesterday"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {order === 1 ? "₦12,500" : order === 2 ? "₦8,700" : "₦24,350"}
                        </p>
                        <Badge
                          className={
                            order === 1
                              ? "bg-blue-500/20 text-blue-600 hover:bg-blue-500/20 border-none"
                              : order === 2
                                ? "bg-green-500/20 text-green-600 hover:bg-green-500/20 border-none"
                                : "bg-orange-500/20 text-orange-600 hover:bg-orange-500/20 border-none"
                          }
                        >
                          {order === 1 ? "New" : order === 2 ? "Shipped" : "Processing"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Top Products</h2>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Traditional Ankara Fabric Blouse", sales: 24, revenue: "₦300,000" },
                    { name: "African Print Headwrap", sales: 18, revenue: "₦45,000" },
                    { name: "Embroidered Dashiki Shirt", sales: 15, revenue: "₦147,000" },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-muted relative overflow-hidden mr-3">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&text=P${index + 1}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{product.revenue}</p>
                        <div className="flex items-center text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>{index === 0 ? "12%" : index === 1 ? "8%" : "5%"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <h2 className="font-medium mb-4">Quick Actions</h2>

                <div className="space-y-2">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/dashboard/products/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Product
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/orders">
                      <Package className="h-4 w-4 mr-2" />
                      Manage Orders
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Store Settings
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/payments">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Settings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Customers */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Recent Customers</h2>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Jane Okafor", location: "Lagos", amount: "₦12,500", time: "2 hours ago" },
                    { name: "Amina Mohammed", location: "Abuja", amount: "₦8,700", time: "Yesterday" },
                    { name: "Tunde Dare", location: "Ibadan", amount: "₦24,350", time: "2 days ago" },
                  ].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium mr-3">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{customer.amount}</p>
                        <p className="text-xs text-muted-foreground">{customer.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Need Help?</h3>
                    <p className="text-xs text-muted-foreground">Our support team is here for you</p>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link href="/help">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

