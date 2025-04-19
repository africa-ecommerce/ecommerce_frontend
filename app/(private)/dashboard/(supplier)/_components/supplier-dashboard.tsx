


"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  Package,
  PackageCheck,
  Percent,
  PieChart,
  RefreshCw,
  TrendingUp,
  Users,
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
import { useUser } from "@/app/_components/provider/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

// ============== REUSABLE COMPONENTS ==============
const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(2)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[120px]" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-3">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <h3 className="text-lg font-medium">Failed to load data</h3>
        <p className="text-muted-foreground text-sm">
          Something went wrong while loading the data
        </p>
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({
  message,
  icon: Icon = Package,
  actionText,
  onAction,
}: {
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  onAction?: () => void;
}) => (
  <Card>
    <CardContent className="p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Icon className="h-8 w-8 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">{message}</p>
        {actionText && onAction && (
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

// ============== MAIN DASHBOARD COMPONENT ==============
export default function SupplierDashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mock data states
  // const [stats, setStats] = useState({
  //   totalProducts: 48,
  //   lowStockItems: 12,
  //   outOfStock: 5,
  //   inventoryValue: 1200000,
  // });

  // const [stockAlerts, setStockAlerts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const { userData } = useUser();


  // Simulate data fetching
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       // Simulate API delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Mock data - replace with actual API calls
  //       setStats({
  //         totalProducts: 48,
  //         lowStockItems: 12,
  //         outOfStock: 5,
  //         inventoryValue: 1200000,
  //       });

  //       setStockAlerts([
  //         {
  //           id: 1,
  //           product: "Shea Butter (250g)",
  //           status: "Low Stock",
  //           units: "Only 8 units left",
  //           salesRate: "Selling ~15 units/week",
  //           progress: 20,
  //         },
  //         {
  //           id: 2,
  //           product: "African Black Soap",
  //           status: "Out of Stock",
  //           units: "0 units left",
  //           salesRate: "12 pending orders",
  //           progress: 0,
  //         },
  //         {
  //           id: 3,
  //           product: "African Black Soap",
  //           status: "Out of Stock",
  //           units: "0 units left",
  //           salesRate: "12 pending orders",
  //           progress: 0,
  //         },
         
  //       ]);

  //       setOrders([
  //         {
  //           id: "SUP-4582",
  //           status: "pending",
  //           received: "Received 2 hours ago",
  //           customer: "Ade Johnson (Plug)",
  //           location: "Lagos, Nigeria",
  //           items: [
  //             { name: "Shea Butter (250g) x 10", price: "₦25K" },
  //             { name: "African Black Soap x 5", price: "₦7.5K" },
  //           ],
  //           total: "₦32.5K",
  //         },
  //         {
  //           id: "SUP-4581",
  //           status: "pending",
  //           received: "Received 3 hours ago",
  //           customer: "Fatima Osei (Plug)",
  //           location: "Accra, Ghana",
  //           items: [
  //             { name: "Hair Growth Oil x 8", price: "₦16K" },
  //             { name: "Body Butter x 5", price: "₦12.5K" },
  //           ],
  //           total: "₦28.5K",
  //         },
  //       ]);

  //       setError(false);
  //     } catch (err) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredOrders = orders.filter((order) => order.status === activeTab);

     const { data, error: errorData, isLoading, mutate } = useSWR("/api/products/supplier/");
  
  // Extract products from the response
  const products = Array.isArray(data?.data) ? data?.data : [];
  
  // Calculate inventory statistics based on actual product data
  const stats = useMemo(() => {
    if (!products.length) return {
      totalProducts: 0,
      lowStockItems: 0,
      outOfStock: 0,
      inventoryValue: 0
    };
    
    return {
      totalProducts: products.length,
      lowStockItems: products.filter(item => item.stock !== undefined && item.stock > 0 && item.stock <= 5).length,
      outOfStock: products.filter(item => item.stock === 0).length,
      inventoryValue: products.reduce((total, item) => total + (item.price * (item.stock || 0)), 0)
    };
  }, [products]);
  
  // Generate stock alerts from product data
  const stockAlerts = useMemo(() => {
    if (!products.length) return [];
    
    // Get out of stock items first
    const outOfStockItems = products
      .filter(item => item.stock === 0)
      .map(item => ({
        id: item.id,
        product: item.name,
        status: "Out of Stock",
        units: "0 units left",
        salesRate: "Urgent attention needed",
        progress: 0
      }));
    
    // Then get low stock items
    const lowStockItems = products
      .filter(item => item.stock !== undefined && item.stock > 0 && item.stock <= 5)
      .map(item => ({
        id: item.id,
        product: item.name,
        status: "Low Stock",
        units: `Only ${item.stock} units left`,
        salesRate: "Restock recommended",
        progress: (item.stock / 5) * 100 // 5 is the threshold for low stock
      }));
    
    // Combine and return only the first few items for the dashboard
    return [...outOfStockItems, ...lowStockItems].slice(0, 3);
  }, [products]);
  

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-3 sm:p-4 md:p-6 gap-4 sm:gap-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-muted-foreground font-semibold text-base truncate">
              Welcome back, {userData?.brandName || "NaturalGlow"}!
            </h1>
            <h1 className="text-muted-foreground text-base">
              Here's your business at a glance.
            </h1>
          </div>
        </div>

        {/* Inventory Stats */}
        {/* Inventory Stats replaced with Financial Stats */}
        <section className="space-y-3 md:space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-base md:text-lg font-semibold">
              Financial Overview
            </h2>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs md:text-sm"
            >
              <Link href="/dashboard/finance">View Finances</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs md:text-sm font-medium flex items-center gap-1">
                  Pending Payments
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total amount of pending payments</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 min-h-dvh:p-3 pt-0">
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-xl md:text-2xl font-bold">₦45.5K</div>
                    <div className="flex items-center text-[10px] xs:text-xs text-amber-600 mt-1">
                      <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span>3 pending orders</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Revenue This Month Card */}
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Revenue (This Month)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total revenue this month</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-xl sm:text-2xl font-bold text-green-500">
                      ₦127.8K
                    </div>
                    <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                      <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span>15% from last month</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Total Paid Card */}
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Total Paid
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total amount paid to date</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-xl sm:text-2xl font-bold">₦845.2K</div>
                    <div className="flex items-center text-[10px] xs:text-xs text-muted-foreground mt-1">
                      <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span>From 28 plugs</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Average Order Value Card */}
            <Card className="h-full">
              <CardHeader className="p-2 sm:p-3 pb-0">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                  Average Order Value
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average value per order</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 pt-0">
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-xl sm:text-2xl font-bold">₦18.7K</div>
                    <div className="flex items-center text-[10px] xs:text-xs text-green-600 mt-1">
                      <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span>8% from last month</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Account Verification Tip */}
        <Card className="bg-amber-100 border-amber-200 mb-3 sm:mb-4">
          <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
            <div className="rounded-full bg-amber-200 p-1.5 sm:p-2 flex-shrink-0">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-xs sm:text-sm">
                Action Required
              </h3>
              <p className="text-[10px] xs:text-xs text-muted-foreground">
                You have received new orders. Please verify your account to
                start accepting payments and processing orders.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto text-xs sm:text-sm h-7 sm:h-8"
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Verify Now
            </Button>
          </CardContent>
        </Card>

        {/* Order Fulfillment Section */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold">
              Order Fulfillment
            </h2>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs sm:text-sm"
            >
              <Link href="/dashboard/orders">View All Orders</Link>
            </Button>
          </div>

          {error ? (
            <ErrorState onRetry={handleRefresh} />
          ) : loading ? (
            <LoadingSkeleton />
          ) : (
            <Tabs
              defaultValue="pending"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4 h-9 sm:h-10 overflow-x-auto">
                <TabsTrigger
                  value="pending"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Pending ({orders.filter((o) => o.status === "pending").length}
                  )
                </TabsTrigger>
                <TabsTrigger
                  value="processing"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Processing (
                  {orders.filter((o) => o.status === "processing").length})
                </TabsTrigger>
                <TabsTrigger
                  value="shipped"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Shipped ({orders.filter((o) => o.status === "shipped").length}
                  )
                </TabsTrigger>
                <TabsTrigger
                  value="delivered"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Delivered (
                  {orders.filter((o) => o.status === "delivered").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-3 sm:mt-4">
                {filteredOrders.length === 0 ? (
                  <EmptyState
                    message={`No ${activeTab} orders found`}
                    icon={PackageCheck}
                    actionText="View All Orders"
                    onAction={() => console.log("View all orders clicked")}
                  />
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-[500px] overflow-y-auto">
                    {filteredOrders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                                {order.id}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {order.received}
                              </CardDescription>
                            </div>
                            <Badge className="text-xs capitalize">
                              {order.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                              <AvatarImage
                                src="/placeholder.svg?height=32&width=32"
                                alt="Customer"
                              />
                              <AvatarFallback>
                                {order.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium truncate">
                                {order.customer}
                              </p>
                              <p className="text-[10px] xs:text-xs text-muted-foreground truncate">
                                {order.location}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            {order.items.map((item: any, i: number) => (
                              <div
                                key={i}
                                className="flex justify-between text-xs sm:text-sm"
                              >
                                <span className="truncate">{item.name}</span>
                                <span className="whitespace-nowrap">
                                  {item.price}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
                              <span>Total</span>
                              <span>{order.total}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 sm:p-4 pt-1 sm:pt-2 flex gap-1 sm:gap-2">
                          {order.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-7 sm:h-8 text-xs"
                              >
                                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />{" "}
                                Delay
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 h-7 sm:h-8 text-xs"
                              >
                                <PackageCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />{" "}
                                Confirm
                              </Button>
                            </>
                          )}
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              className="flex-1 h-7 sm:h-8 text-xs"
                            >
                              <PackageCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />{" "}
                              Mark as Shipped
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button
                              size="sm"
                              className="flex-1 h-7 sm:h-8 text-xs"
                            >
                              <PackageCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />{" "}
                              Mark as Delivered
                            </Button>
                          )}
                          {order.status === "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-7 sm:h-8 text-xs"
                            >
                              <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />{" "}
                              Request Payment
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </section>

        {/* Educational Tip */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
            <div className="rounded-full bg-primary/20 p-1.5 sm:p-2 flex-shrink-0">
              <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-xs sm:text-sm">
                Recession-Era Tip
              </h3>
              <p className="text-[10px] xs:text-xs text-muted-foreground">
                Consider offering smaller package sizes at lower price points to
                maintain sales volume during economic downturns.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-xs sm:text-sm h-7 sm:h-8"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Learn
            </Button>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}