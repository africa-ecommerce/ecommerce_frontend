"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowUp,
  BarChart3,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  HelpCircle,
  LineChart,
  PackageCheck,
  Percent,
  PieChart,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function SupplierDashboard() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 animate-fade-in">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">Supplier Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base truncate">
              Welcome back, NaturalGlow! Here's your business at a glance.
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh dashboard</span>
          </Button>
        </div>

        {/* Inventory Intelligence */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Inventory Intelligence</h2>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href="#">Manage Inventory</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Total Products
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of products in your catalog</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">48</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>5 new this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Low Stock Items
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products that need restocking soon</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-amber-500">12</div>
                <div className="flex items-center text-[10px] xs:text-xs text-amber-600 mt-1">
                  <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>Restock needed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Out of Stock
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products currently unavailable</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-destructive">5</div>
                <div className="flex items-center text-[10px] xs:text-xs text-destructive mt-1">
                  <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>Urgent attention needed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Inventory Value
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total value of current inventory</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦1.2M</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>15% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {/* Alert 1 */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-1">
                      <p className="text-xs sm:text-sm font-medium truncate">Shea Butter (250g)</p>
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-xs">
                        Low Stock
                      </Badge>
                    </div>
                    <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                      <p>Only 8 units left</p>
                      <p>Selling ~15 units/week</p>
                    </div>
                    <Progress value={20} className="h-1 mt-1" />
                  </div>
                  <Button size="sm" className="text-xs h-7 sm:h-8">
                    Restock
                  </Button>
                </div>

                {/* Alert 2 */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-1">
                      <p className="text-xs sm:text-sm font-medium truncate">African Black Soap</p>
                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs">
                        Out of Stock
                      </Badge>
                    </div>
                    <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                      <p>0 units left</p>
                      <p>12 pending orders</p>
                    </div>
                    <Progress value={0} className="h-1 mt-1" />
                  </div>
                  <Button size="sm" className="text-xs h-7 sm:h-8">
                    Restock
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

       

        {/* Order Fulfillment Center */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Order Fulfillment</h2>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href="#">View All Orders</Link>
            </Button>
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-4 h-9 sm:h-10 overflow-x-auto">
              <TabsTrigger value="pending" className="text-xs sm:text-sm whitespace-nowrap">Pending (8)</TabsTrigger>
              <TabsTrigger value="processing" className="text-xs sm:text-sm whitespace-nowrap">Processing (5)</TabsTrigger>
              <TabsTrigger value="shipped" className="text-xs sm:text-sm whitespace-nowrap">Shipped (12)</TabsTrigger>
              <TabsTrigger value="delivered" className="text-xs sm:text-sm whitespace-nowrap">Delivered (24)</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
              {/* Order Card 1 */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-xs sm:text-sm font-medium truncate">Order #SUP-4582</CardTitle>
                      <CardDescription className="text-xs">Received 2 hours ago</CardDescription>
                    </div>
                    <Badge className="text-xs">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Plug" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Ade Johnson (Plug)</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground truncate">Lagos, Nigeria</p>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="truncate">Shea Butter (250g) x 10</span>
                      <span className="whitespace-nowrap">₦25K</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="truncate">African Black Soap x 5</span>
                      <span className="whitespace-nowrap">₦7.5K</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
                      <span>Total</span>
                      <span>₦32.5K</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-4 pt-1 sm:pt-2 flex gap-1 sm:gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-7 sm:h-8 text-xs">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Delay
                  </Button>
                  <Button size="sm" className="flex-1 h-7 sm:h-8 text-xs">
                    <PackageCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Confirm
                  </Button>
                </CardFooter>
              </Card>

              {/* Order Card 2 */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-xs sm:text-sm font-medium truncate">Order #SUP-4581</CardTitle>
                      <CardDescription className="text-xs">Received 3 hours ago</CardDescription>
                    </div>
                    <Badge className="text-xs">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Plug" />
                      <AvatarFallback>FO</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Fatima Osei (Plug)</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground truncate">Accra, Ghana</p>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="truncate">Hair Growth Oil x 8</span>
                      <span className="whitespace-nowrap">₦16K</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="truncate">Body Butter x 5</span>
                      <span className="whitespace-nowrap">₦12.5K</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
                      <span>Total</span>
                      <span>₦28.5K</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-4 pt-1 sm:pt-2 flex gap-1 sm:gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-7 sm:h-8 text-xs">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Delay
                  </Button>
                  <Button size="sm" className="flex-1 h-7 sm:h-8 text-xs">
                    <PackageCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Confirm
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Financial Overview */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Financial Overview</h2>
            <Tabs defaultValue="month" className="w-full sm:w-[180px]">
              <TabsList className="grid w-full grid-cols-3 h-8 sm:h-9">
                <TabsTrigger value="week" className="text-xs sm:text-sm">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">Month</TabsTrigger>
                <TabsTrigger value="year" className="text-xs sm:text-sm">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Total Revenue
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total sales before fees</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦1.2M</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>18% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Platform Fees
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pluggn service fees (10%)</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦120K</div>
                <div className="flex items-center text-[10px] xs:text-xs text-muted-foreground mt-1">
                  <Percent className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>10% of total revenue</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Net Profit
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Revenue after all fees and costs</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦480K</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>8% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Projected Growth
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estimated growth next month</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦1.4M</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>+15% projected</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="h-[150px] sm:h-[200px] flex items-center justify-center">
                <LineChart className="h-24 w-full sm:h-32 text-primary/20" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Market Insights */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Market Insights</h2>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href="#">View Full Report</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <CardTitle className="text-sm sm:text-base font-medium">Trending Products</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Products gaining popularity</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {/* Trending Product 1 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">Shea & Cocoa Butter Mix</p>
                        <p className="text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">+45%</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p className="truncate">Similar to your Shea Butter</p>
                        <p className="whitespace-nowrap">High in Nigeria</p>
                      </div>
                    </div>
                  </div>

                  {/* Trending Product 2 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">Moringa Hair Oil</p>
                        <p className="text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">+32%</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p className="truncate">New product category</p>
                        <p className="whitespace-nowrap">Growing in Ghana</p>
                      </div>
                    </div>
                  </div>

                  {/* Trending Product 3 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">Natural Deodorant</p>
                        <p className="text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">+28%</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p className="truncate">Emerging category</p>
                        <p className="whitespace-nowrap">Urban demand</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <CardTitle className="text-sm sm:text-base font-medium">Competitive Pricing</CardTitle>
                <CardDescription className="text-xs sm:text-sm">How your prices compare to market</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {/* Price Comparison 1 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">Shea Butter (250g)</p>
                        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">₦2.5K</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs">
                        <p className="text-muted-foreground">Your price</p>
                        <p className="text-amber-600 whitespace-nowrap">5% above avg.</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] xs:text-xs">₦2.1K</span>
                        <Progress value={80} className="h-1 flex-1" />
                        <span className="text-[10px] xs:text-xs">₦2.8K</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Comparison 2 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">African Black Soap</p>
                        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">₦1.5K</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs">
                        <p className="text-muted-foreground">Your price</p>
                        <p className="text-green-600 whitespace-nowrap">10% below avg.</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] xs:text-xs">₦1.2K</span>
                        <Progress value={60} className="h-1 flex-1" />
                        <span className="text-[10px] xs:text-xs">₦1.8K</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Comparison 3 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">Hair Growth Oil</p>
                        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">₦2K</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs">
                        <p className="text-muted-foreground">Your price</p>
                        <p className="text-muted-foreground whitespace-nowrap">At market avg.</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] xs:text-xs">₦1.8K</span>
                        <Progress value={50} className="h-1 flex-1" />
                        <span className="text-[10px] xs:text-xs">₦2.2K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Educational Tip */}
        <Card className="bg-primary/10 border-primary/20 mt-2">
          <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
            <div className="rounded-full bg-primary/20 p-1.5 sm:p-2 flex-shrink-0">
              <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-xs sm:text-sm">Recession-Era Tip</h3>
              <p className="text-[10px] xs:text-xs text-muted-foreground">
                Consider offering smaller package sizes at lower price points to maintain sales volume during economic
                downturns.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto text-xs sm:text-sm h-7 sm:h-8">
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Learn
            </Button>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}