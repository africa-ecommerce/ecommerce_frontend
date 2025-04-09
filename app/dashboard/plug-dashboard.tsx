"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Clock,
  ExternalLink,
  HelpCircle,
  Instagram,
  MessageSquare,
  Package,
  PackageCheck,
  PackageOpen,
  Percent,
  PlusCircle,
  RefreshCw,
  Share2,
  ShoppingBag,
  TrendingUp,
  Truck,
  Twitter,
  Wallet,
  Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PlugDashboard() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 animate-fade-in">
        {/* Header - Improved for mobile */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
              Plug Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base truncate">
              Welcome back, Ade! Here's your business at a glance.
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            <span className="sr-only">Refresh dashboard</span>
          </Button>
        </div>

        {/* Revenue Snapshot - Better mobile layout */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Revenue Snapshot</h2>
            <Tabs defaultValue="day" className="w-full sm:w-[180px]">
              <TabsList className="grid w-full grid-cols-3 h-8 sm:h-9">
                <TabsTrigger value="day" className="text-xs sm:text-sm">Day</TabsTrigger>
                <TabsTrigger value="week" className="text-xs sm:text-sm">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Total Earnings
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total revenue from all sales</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦45,200</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>12% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Profit Margin
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your earnings after platform fees</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦18,080</div>
                <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                  <Percent className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>40% of total sales</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Pending Payments
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Money in escrow to be released</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦12,500</div>
                <div className="flex items-center text-[10px] xs:text-xs text-amber-600 mt-1">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  <span>Release in 2 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Available Balance
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Money ready for withdrawal</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                <div className="text-xl sm:text-2xl font-bold">₦5,580</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1 h-6 sm:h-7 text-[10px] xs:text-xs"
                >
                  <Wallet className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" /> Withdraw
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Order Management Hub - Better mobile tabs */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Order Management</h2>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href="#">View All Orders</Link>
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-4 h-9 sm:h-10 overflow-x-auto">
              <TabsTrigger value="active" className="text-xs sm:text-sm whitespace-nowrap">Active (5)</TabsTrigger>
              <TabsTrigger value="processing" className="text-xs sm:text-sm whitespace-nowrap">Processing (2)</TabsTrigger>
              <TabsTrigger value="delivered" className="text-xs sm:text-sm whitespace-nowrap">Delivered (8)</TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs sm:text-sm whitespace-nowrap">Cancelled (1)</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
              {/* Order Card 1 - More compact on mobile */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-xs sm:text-sm font-medium truncate">
                        Order #PLG-2305
                      </CardTitle>
                      <CardDescription className="text-xs">Placed 2 hours ago</CardDescription>
                    </div>
                    <Badge className="text-xs">In Transit</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Customer"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Chioma Nwosu</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground truncate">
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs">
                    <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span>2 items • ₦12,500</span>
                  </div>
                  <Progress value={60} className="h-1 mt-2 sm:mt-3" />
                  <div className="flex justify-between text-[10px] xs:text-xs mt-1">
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-4 pt-1 sm:pt-2 flex gap-1 sm:gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                    <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Message
                  </Button>
                  <Button size="sm" className="flex-1 h-8 text-xs">
                    <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Track
                  </Button>
                </CardFooter>
              </Card>

              {/* Order Card 2 */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-xs sm:text-sm font-medium truncate">
                        Order #PLG-2304
                      </CardTitle>
                      <CardDescription className="text-xs">Placed 5 hours ago</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">Processing</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Customer"
                      />
                      <AvatarFallback>KO</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Kwame Osei</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground truncate">
                        Accra, Ghana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs">
                    <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span>1 item • ₦8,200</span>
                  </div>
                  <Progress value={30} className="h-1 mt-2 sm:mt-3" />
                  <div className="flex justify-between text-[10px] xs:text-xs mt-1">
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-4 pt-1 sm:pt-2 flex gap-1 sm:gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                    <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Message
                  </Button>
                  <Button size="sm" className="flex-1 h-8 text-xs">
                    <PackageCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Confirm
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Product Performance - Better mobile layout */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Product Performance</h2>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href="#">View All Products</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <CardTitle className="text-sm sm:text-base font-medium">
                  Top Selling Products
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {/* Product 1 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          Ankara Print Dress
                        </p>
                        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">₦12,500</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p>24 units sold</p>
                        <p className="text-green-600 whitespace-nowrap">+15% this week</p>
                      </div>
                      <Progress value={80} className="h-1 mt-1" />
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          Handcrafted Sandals
                        </p>
                        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">₦8,200</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p>18 units sold</p>
                        <p className="text-green-600 whitespace-nowrap">+8% this week</p>
                      </div>
                      <Progress value={65} className="h-1 mt-1" />
                    </div>
                  </div>

                  {/* Product 3 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          Beaded Necklace
                        </p>
                        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">₦5,000</p>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p>15 units sold</p>
                        <p className="text-amber-600 whitespace-nowrap">-2% this week</p>
                      </div>
                      <Progress value={45} className="h-1 mt-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <CardTitle className="text-sm sm:text-base font-medium">
                  Recommended Products
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Trending among similar Plugs</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {/* Recommended Product 1 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <PackageOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          African Print Headwrap
                        </p>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <PlusCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p className="truncate">Supplier: AfriThreads</p>
                        <p className="text-green-600 whitespace-nowrap">High demand</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Product 2 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <PackageOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          Shea Butter Set
                        </p>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <PlusCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p className="truncate">Supplier: NaturalGlow</p>
                        <p className="text-green-600 whitespace-nowrap">Trending now</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Product 3 */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <PackageOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-1">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          Woven Basket Bag
                        </p>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <PlusCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                        <p className="truncate">Supplier: EcoAfrica</p>
                        <p className="text-green-600 whitespace-nowrap">Seasonal hit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Social Analytics - Better mobile layout */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">Social Analytics</h2>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href="#">Detailed Reports</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base font-medium">
                    Platform Traffic
                  </CardTitle>
                  <Instagram className="h-4 w-4 text-pink-600" />
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl font-bold">65%</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground">
                  Of your sales come from Instagram
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-[10px] xs:text-xs">
                    <span>Link clicks</span>
                    <span className="font-medium">245</span>
                  </div>
                  <Progress value={65} className="h-1" />
                  <div className="flex justify-between text-[10px] xs:text-xs">
                    <span>Conversions</span>
                    <span className="font-medium">32 (13%)</span>
                  </div>
                  <Progress value={13} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base font-medium">
                    Platform Traffic
                  </CardTitle>
                  <Twitter className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl font-bold">25%</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground">
                  Of your sales come from Twitter
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-[10px] xs:text-xs">
                    <span>Link clicks</span>
                    <span className="font-medium">120</span>
                  </div>
                  <Progress value={35} className="h-1" />
                  <div className="flex justify-between text-[10px] xs:text-xs">
                    <span>Conversions</span>
                    <span className="font-medium">18 (15%)</span>
                  </div>
                  <Progress value={15} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base font-medium">
                    Platform Traffic
                  </CardTitle>
                  <Youtube className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl font-bold">10%</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground">
                  Of your sales come from YouTube
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-[10px] xs:text-xs">
                    <span>Link clicks</span>
                    <span className="font-medium">85</span>
                  </div>
                  <Progress value={25} className="h-1" />
                  <div className="flex justify-between text-[10px] xs:text-xs">
                    <span>Conversions</span>
                    <span className="font-medium">8 (9%)</span>
                  </div>
                  <Progress value={9} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions - Better mobile buttons */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 sm:py-6 gap-1 sm:gap-2 text-xs sm:text-sm">
              <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 sm:py-6 gap-1 sm:gap-2 text-xs sm:text-sm">
              <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span>Share Products</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 sm:py-6 gap-1 sm:gap-2 text-xs sm:text-sm">
              <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span>Payment Status</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 sm:py-6 gap-1 sm:gap-2 text-xs sm:text-sm">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span>Contact Supplier</span>
            </Button>
          </div>
        </section>

        {/* Educational Tip - Better mobile layout */}
        <Card className="bg-primary/10 border-primary/20 mt-2">
          <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
            <div className="rounded-full bg-primary/20 p-1.5 sm:p-2 flex-shrink-0">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-xs sm:text-sm">Business Tip</h3>
              <p className="text-[10px] xs:text-xs text-muted-foreground">
                Sharing your products during peak hours (7-9 PM) can increase
                your visibility by up to 40%.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto text-xs sm:text-sm h-7 sm:h-8">
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}