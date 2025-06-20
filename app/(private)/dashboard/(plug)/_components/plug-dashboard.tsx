"use client";

import type React from "react";

import {  useMemo } from "react";
import Link from "next/link";
import {
  AlertCircle,
  HelpCircle,
  LineChart,
  Package,
  RefreshCw,
  Share2,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
  Phone,
} from "lucide-react";
import Image from "next/image";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/app/_components/provider/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatPrice,
  formatQuantity,
  getTotalStocks,
  truncateText,
} from "@/lib/utils";

function getProductPerformanceByAverage(productsArray: any) {
  const productsWithSales = productsArray.filter((product: any) => product.sold > 0);

  if (productsWithSales.length === 0) {
    return {
      topProducts: [],
      bottomProducts: [],
      averageProducts: [],
      averageSales: 0,
    };
  }

  const totalSales = productsWithSales.reduce(
    (sum: any, product: any) => sum + product.sold,
    0
  );
  const averageSales = totalSales / productsWithSales.length;
  const threshold = averageSales * 0.5; // 50% below average = low performing

  const topProducts = productsWithSales
    .filter((product: any) => product.sold >= averageSales)
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5);

  const bottomProducts = productsWithSales
    .filter((product: any) => product.sold < threshold)
    .sort((a: any, b: any) => a.sold - b.sold)
    .slice(0, 5);

  const averageProducts = productsWithSales
    .filter(
      (product: any) => product.sold >= threshold && product.sold < averageSales
    )
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5);

  return {
    topProducts,
    bottomProducts,
    averageProducts,
    averageSales: Math.round(averageSales),
  };
}

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <Card className="border rounded-lg">
    <CardContent className="p-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <AlertCircle className="h-6 w-6 text-destructive" />
        <h3 className="text-sm font-medium">Failed to load data</h3>
        <p className="text-muted-foreground text-xs">
          Something went wrong while loading the data
        </p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-1"
          >
            <RefreshCw className="mr-1 h-3 w-3" />
            Retry
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

// Empty State with responsive adjustments
const EmptyState = ({
  message,
  icon: Icon = Package,
  actionText,
  onAction,
  className = "",
}: {
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}) => (
  <Card className={`border rounded-lg ${className}`}>
    <CardContent className="p-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Icon className="h-6 w-6 text-muted-foreground" />
        <p className="text-muted-foreground text-xs">{message}</p>
        {actionText && onAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="mt-1"
          >
            {actionText}
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

// Loading Skeletons for different sections
const RevenueLoadingSkeleton = () => (
  <div className="grid grid-cols-2 gap-2 sm:gap-3">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="h-full border rounded-lg">
        <CardHeader className="p-2 sm:p-3 pb-0">
          <Skeleton className="h-4 w-[100px]" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3 pt-0">
          <Skeleton className="h-5 w-12" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const StockLoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="border rounded-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
              <Skeleton className="h-1 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const OrderLoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(2)].map((_, i) => (
      <Card key={i} className="border rounded-lg">
        <CardContent className="p-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ProductLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
    {[...Array(2)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
          <Skeleton className="h-5 w-[150px]" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const SocialLoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
          <Skeleton className="h-5 w-[120px]" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <Skeleton className="h-6 w-[50px] mb-2" />
          <Skeleton className="h-3 w-full mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-1 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-1 w-full" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const EducationalTipSkeleton = () => (
  <Card className="bg-primary/10 border-primary/20">
    <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
      <Skeleton className="rounded-full h-8 w-8 flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-3 w-[120px]" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/4" />
      </div>
      <Skeleton className="h-7 w-[80px]" />
    </CardContent>
  </Card>
);

const WelcomeSkeleton = () => (
  <div className="flex-1 min-w-0">
    <Skeleton className="h-4 w-[180px] mb-1" />
    <Skeleton className="h-3 w-[200px]" />
  </div>
);

export default function PlugDashboard() {
  

  const {
    userData: { user },
  } = useUser();

  // Fetch products data
  const {
    data,
    error: errorData,
    isLoading,
    mutate,
  } = useSWR("/api/plug/products/");


  const {
    data: analyticsData,
    error: analyticsError,
    isLoading: analyticsLoading,
    mutate: analyticsMutate,
  } = useSWR("/api/analytics/links", {
    refreshInterval: 300000, // Refresh every 5 minutes
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // Prevent duplicate requests within 1 minute
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  // Fetch shipped orders data - following the exact pattern from products component
  const getOrdersUrl = (status: string) => {
    return `/api/orders/plug?orderStatus=${status.toUpperCase()}`;
  };

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
    mutate: ordersMutate,
  } = useSWR(getOrdersUrl("shipped"), {
    refreshInterval: 30000, // Poll every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000, // Prevent duplicate requests within 10 seconds
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  const products = Array.isArray(data?.data) ? data?.data : [];

  // Process orders data - following the exact pattern from products component
  const orders = Array.isArray(ordersData?.data) ? ordersData?.data : [];


  const processAnalyticsData = useMemo(() => {
    if (!analyticsData?.data || !Array.isArray(analyticsData.data)) {
      return [];
    }

    const data = analyticsData.data;

    // Calculate total orders to determine sales percentage
    const totalOrders = data.reduce(
      (sum: number, item: any) => sum + (item.orders || 0),
      0
    );

    // Platform image mapping
    const platformImages: { [key: string]: string } = {
      WhatsApp: "/whatsapp.png",
      Instagram: "/instagram_logo.png",
      Twitter: "/twitter.png",
      Facebook: "/facebook.png",
      facebook: "/facebook.png", // Handle both cases
    };

    // Platform color mapping
    const platformColors: { [key: string]: string } = {
      WhatsApp: "text-green-600",
      Instagram: "text-pink-600",
      Twitter: "text-blue-500",
      Facebook: "text-blue-600",
      facebook: "text-blue-600", // Handle both cases
    };

    return data.map((item: any) => {
      const platformName = item.platform;
      const salesPercentage =
        totalOrders > 0 ? Math.round((item.orders / totalOrders) * 100) : 0;

      return {
        platform: platformName,
        percentage: `${salesPercentage}%`,
        description: `Of your sales come from ${platformName}`,
        color: platformColors[platformName] || "text-gray-600",
        imageSrc: platformImages[platformName] || "/placeholder.png",
        stats: [
          {
            label: "Visits",
            value: item.clicks.toString(),
            progress:
              Math.min(
                (item.clicks / Math.max(...data.map((d: any) => d.clicks))) *
                  100,
                100
              ) || 0,
          },
          {
            label: "Conversions",
            value: `${item.orders} (${item.conversionRate}%)`,
            progress: item.conversionRate || 0,
          },
        ],
      };
    });
  }, [analyticsData]);

  const { topProducts, bottomProducts, averageProducts, averageSales } =
    getProductPerformanceByAverage(products);

  // OrderCard component - following the exact pattern from products component
  const OrderCard = ({ order }: { order: any }) => {
    const getStatusBadge = (status: string) => {
      return (
        <Badge
          variant="secondary"
          className="bg-orange-500 hover:bg-orange-600"
        >
          Shipped
        </Badge>
      );
    };

    // Calculate total amount from order items
    const totalAmount =
      order.orderItems?.reduce((total: number, item: any) => {
        return total + (item.plugPrice || 0) * item.quantity;
      }, 0) || 0;

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const capitalizeWords = (str: string) => {
      return (
        str
          ?.split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ") || ""
      );
    };

    return (
      <Card className="mb-3 sm:mb-4 last:mb-0">
        <CardHeader className="p-3 sm:p-4 pb-2">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <CardTitle className="text-sm font-medium">
                {order.orderId}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {formatDate(order.createdAt)}
              </CardDescription>
            </div>
            {getStatusBadge("shipped")}
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
          {/* Customer Info */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {capitalizeWords(order.buyerName)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {capitalizeWords(order.buyerLga)},{" "}
              {capitalizeWords(order.buyerState)}
            </span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{order.buyerPhone}</span>
          </div>

          {/* Products */}
          <div className="space-y-2">
            {order.orderItems?.map((item: any, index: number) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium capitalize">
                    {item.productName} x {item.quantity}
                  </div>
                  {/* Show variant details if available */}
                  {item.variantId &&
                    (item.variantColor || item.variantSize) && (
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        {item.variantColor && (
                          <span className="capitalize">
                            {item.variantColor}
                          </span>
                        )}
                        {item.variantSize && (
                          <span className="capitalize">
                            ({item.variantSize})
                          </span>
                        )}
                      </div>
                    )}
                  {/* Show product color/size if no variant but has product color/size */}
                  {!item.variantId &&
                    (item.productColor || item.productSize) && (
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        {item.productColor && (
                          <span className="capitalize">
                            {item.productColor}
                          </span>
                        )}
                        {item.productSize && (
                          <span className="capitalize">
                            ({item.productSize})
                          </span>
                        )}
                      </div>
                    )}
                </div>
                <div className="text-sm font-medium">
                  ₦{((item.plugPrice || 0) * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 text-sm border-t">
            <span className="font-medium">Total</span>
            <span className="font-bold">₦{totalAmount.toLocaleString()}</span>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="p-3 sm:p-4 pt-1 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
            <Share2 className="h-3 w-3 mr-1" />
            Share Tracking
          </Button>
          <Button size="sm" className="flex-1 h-8 text-xs">
            <Truck className="h-3 w-3 mr-1" />
            Track Order
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const stockAlerts = useMemo(() => {
    if (!products.length) return [];

    const outOfStockItems = products
      .filter((item: any) => getTotalStocks(item) === 0)
      .map((item: any) => ({
        id: item.id,
        product: item.name,
        status: "Out of Stock",
        units: "0 units left",
        salesRate: "Urgent attention needed",
        progress: 0,
      }));

    const lowStockItems = products
      .filter(
        (item: any) =>
          getTotalStocks(item) !== undefined &&
          getTotalStocks(item) > 0 &&
          getTotalStocks(item) <= 5
      )
      .map((item: any) => ({
        id: item.id,
        product: item.name,
        status: "Low Stock",
        units: `Only ${formatQuantity(getTotalStocks(item))} units left`,
        salesRate: "Restock recommended",
      }));

    return [...outOfStockItems, ...lowStockItems].slice(0, 3);
  }, [products]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-3 sm:p-4 gap-3 sm:gap-4">
        {/* Header */}
        {isLoading && !user?.plug.businessName ? (
          <WelcomeSkeleton />
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-muted-foreground font-semibold text-sm truncate capitalize">
                Welcome back, {user?.plug.businessName}!
              </h1>
              <h1 className="text-muted-foreground text-xs sm:text-sm">
                Here's your business at a glance.
              </h1>
            </div>
          </div>
        )}

        {/* Revenue Snapshot */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">
              Revenue Snapshot
            </h2>
          </div>

          {isLoading ? (
            <RevenueLoadingSkeleton />
          ) : errorData ? (
            <ErrorState onRetry={() => mutate()} />
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Total Earnings
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Total amount earned from sales</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold">₦45,500</div>
                </CardContent>
              </Card>

              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Profit Margin
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Your earnings after platform fees</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold text-green-500">
                    ₦18,080
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Pending Payments
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Money in escrow to be released</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold">₦12,500</div>
                </CardContent>
              </Card>

              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Available Balance
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Money ready for withdrawal</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold">₦5,580</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-1 h-6 text-xs"
                  >
                    <Wallet className="h-2.5 w-2.5 mr-1" /> Withdraw
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        {/* Stock Alerts Section */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">Stock Alerts</h2>
          </div>

          {isLoading ? (
            <StockLoadingSkeleton />
          ) : errorData ? (
            <ErrorState onRetry={() => mutate()} />
          ) : stockAlerts.length === 0 ? (
            <EmptyState
              message="No stock alerts at this time"
              icon={AlertCircle}
            />
          ) : (
            <Card className="border rounded-lg">
              <CardHeader className="p-3 sm:p-4 pb-1">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {stockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          alert.status === "Out of Stock"
                            ? "bg-red-100"
                            : "bg-amber-100"
                        }`}
                      >
                        <AlertCircle
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            alert.status === "Out of Stock"
                              ? "text-red-600"
                              : "text-amber-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-1">
                          <p className="text-xs sm:text-sm font-medium truncate capitalize">
                            {truncateText(alert.product, 20)}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] sm:text-xs ${
                              alert.status === "Out of Stock"
                                ? "text-red-600 border-red-200 bg-red-50"
                                : "text-amber-600 border-amber-200 bg-amber-50"
                            }`}
                          >
                            {alert.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                          <p>{alert.units}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Order Management Section - Now showing shipped orders */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">
              Shipped Orders
            </h2>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/dashboard/product">View All Orders</Link>
            </Button>
          </div>

          {ordersLoading ? (
            <OrderLoadingSkeleton />
          ) : ordersError ? (
            <ErrorState onRetry={() => ordersMutate()} />
          ) : orders.length === 0 ? (
            <EmptyState message="No shipped orders found" icon={Truck} />
          ) : (
            <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
              {orders.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>

        {/* Product Performance */}

        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-semibold">
                Product Performance
              </h2>
              {!isLoading && !errorData && averageSales > 0 && (
                <p className="text-xs text-muted-foreground">
                  Average sales: {averageSales} units per product
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/dashboard/product">View All Products</Link>
            </Button>
          </div>

          {isLoading ? (
            <ProductLoadingSkeleton />
          ) : errorData ? (
            <ErrorState
              onRetry={() => {
                mutate();
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Top Performing Products */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    High Performers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {averageSales}+ units (above average)
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {topProducts.length === 0 ? (
                        <EmptyState
                          message="No high performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        topProducts.map((product: any) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-green-50 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {truncateText(product.name, 30)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                                <p>{product.sold || 0} units sold</p>
                                <p className="text-green-600 font-medium">
                                  {Math.round(
                                    (product.sold / averageSales) * 100
                                  )}
                                  % of avg
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Average Performing Products */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Average Performers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(averageSales * 0.5)}-{averageSales - 1} units
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {averageProducts.length === 0 ? (
                        <EmptyState
                          message="No average performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        averageProducts.map((product: any) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {truncateText(product.name, 30)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                                <p>{product.sold || 0} units sold</p>
                                <p className="text-blue-600 font-medium">
                                  {Math.round(
                                    (product.sold / averageSales) * 100
                                  )}
                                  % of avg
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Low Performing Products */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Low Performers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Under {Math.round(averageSales * 0.5)} units
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {bottomProducts.length === 0 ? (
                        <EmptyState
                          message="No low performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        bottomProducts.map((product: any) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {truncateText(product.name, 30)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                                <p>
                                  {formatQuantity(product.sold) || 0} units sold
                                </p>
                                <p className="text-red-600 font-medium">
                                  {Math.round(
                                    (product.sold / averageSales) * 100
                                  )}
                                  % of avg
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-sm sm:text-base font-semibold">
              Social Analytics
            </h2>
          </div>

          {analyticsLoading ? (
            <SocialLoadingSkeleton />
          ) : analyticsError ? (
            <ErrorState onRetry={() => analyticsMutate()} />
          ) : processAnalyticsData.length === 0 ? (
            <EmptyState
              message="No social analytics data"
              icon={Users}
              className="col-span-full"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {processAnalyticsData.map((platform) => {
                return (
                  <Card key={platform.platform}>
                    <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm sm:text-base font-medium">
                          Platform Traffic
                        </CardTitle>
                        <Image
                          src={platform.imageSrc || "/placeholder.svg"}
                          alt={`${platform.platform} logo`}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-xl font-bold">
                        {platform.percentage}
                      </div>
                      <p className="text-[10px] xs:text-xs text-muted-foreground">
                        {platform.description}
                      </p>
                      <div className="mt-3 space-y-2">
                        {platform.stats.map((stat: any, i: number) => (
                          <div key={i}>
                            <div className="flex justify-between text-[10px] xs:text-xs">
                              <span>{stat.label}</span>
                              <span className="font-medium">{stat.value}</span>
                            </div>
                            <Progress value={stat.progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
        {/* Educational Tip */}
        {isLoading ? (
          <EducationalTipSkeleton />
        ) : (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
              <div className="rounded-full bg-primary/20 p-1.5 flex-shrink-0">
                <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm">Business Tip</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Sharing your products during peak hours (7-9 PM) can increase
                  your visibility by up to 40%.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
