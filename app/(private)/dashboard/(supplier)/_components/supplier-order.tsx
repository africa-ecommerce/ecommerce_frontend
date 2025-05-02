"use client";

import { useState, useEffect, useMemo } from "react";
import {
  AlertCircle,
  Clock,
  DollarSign,
  ExternalLink,
  Package,
  PackageCheck,
  RefreshCw,
  Users,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IntelligenceSection } from "./order-intelligence";
import { formatPrice, formatQuantity, formatTimeAgo } from "@/lib/utils";

// Utility functions remain the same

// Responsive Loading Skeleton
const LoadingSkeleton = () => (
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

// Error State remains the same
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
}: {
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  onAction?: () => void;
}) => (
  <Card className="border rounded-lg">
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

// Responsive Delay Order Modal
const DelayOrderModal = ({
  open,
  onOpenChange,
  onDelaySelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelaySelect: (minutes: number) => void;
}) => {
  const delayOptions = [5, 10, 15, 30, 1, 2];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-[400px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-base">
            Delay Order
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 py-3">
          {delayOptions.map((time) => (
            <Button
              key={time}
              variant="outline"
              className="flex flex-col h-12 p-2"
              onClick={() => {
                onDelaySelect(time);
                onOpenChange(false);
              }}
            >
              <span className="font-medium text-sm">
                {time} {time < 5 ? "hr" : "min"}
              </span>
            </Button>
          ))}
        </div>
        <div className="flex justify-center mt-1">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-destructive text-sm"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TipSkeleton = () => (
  <Card className="bg-amber-100 border-amber-200 mb-3 sm:mb-4">
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

const SupplierOrder = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [delayModalOpen, setDelayModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { userData: {user} } = useUser();
  const {
    data,
    error: errorData,
    isLoading,
    mutate,
  } = useSWR("/api/products/supplier/");

  const [orders, setOrders] = useState<any[]>([]);
  const products = Array.isArray(data?.data) ? data?.data : [];

  const stockAlerts = useMemo(() => {
    if (!products.length) return [];

    const outOfStockItems = products
      .filter((item: any) => item.stock === 0)
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
        (item: any) => item.stock !== undefined && item.stock > 0 && item.stock <= 5
      )
      .map((item: any) => ({
        id: item.id,
        product: item.name,
        status: "Low Stock",
        units: `Only ${formatQuantity(item.stock)} units left`,
        salesRate: "Restock recommended",
        progress: (item.stock / 5) * 100,
      }));

    return [...outOfStockItems, ...lowStockItems].slice(0, 3);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setOrders([
          {
            id: "SUP-4582",
            status: "pending",
            received: "3600",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4581",
            status: "pending",
            received: "7200",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4583",
            status: "processing",
            received: "10800",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4584",
            status: "processing",
            received: "14400",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4585",
            status: "shipped",
            received: "18000",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4586",
            status: "shipped",
            received: "86400",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4587",
            status: "delivered",
            received: "172800",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
          {
            id: "SUP-4589",
            status: "delivered",
            received: "259200",
            customer: "Ade Johnson (Plug)",
            location: "Lagos, Nigeria",
            items: [
              { name: "Shea Butter (250g) x 10", price: "₦25,000" },
              { name: "African Black Soap x 5", price: "₦7,500" },
            ],
            total: "₦32,500",
          },
        ]);

        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const handleDelayClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setDelayModalOpen(true);
  };

  const handleDelaySelect = (minutes: number) => {
    console.log(`Delaying order ${selectedOrderId} by ${minutes} minutes`);
  };

  return (
    <div className="space-y-6">
      {/* Intelligence Section at the top */}
      <IntelligenceSection />

      {!user?.supplier.verified ? (
        <>
        {isLoading ? (
          <TipSkeleton/>
        ) : (
          <Card className="bg-amber-100 border-amber-200 mb-3 sm:mb-4">
            <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
              <div className="rounded-full bg-amber-200 p-1.5 flex-shrink-0">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm">
                  Action Required
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Please verify your account to start accepting payments and
                  processing orders. Verified account are more likely to receive
                  orders.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto text-xs h-7 sm:h-8"
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Verify
              </Button>
            </CardContent>
          </Card>
        )
}

          <section className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h2 className="text-sm sm:text-base font-semibold">
                Order Fulfillment
              </h2>
            </div>

            {error ? (
              <ErrorState onRetry={handleRefresh} />
            ) : loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {filteredOrders.length === 0 ? (
                  <EmptyState message={"No orders found"} icon={PackageCheck} />
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
                    {filteredOrders.map((order) => (
                      <Card key={order.id} className="border rounded-lg">
                        <CardHeader className="p-3 sm:p-4 pb-1">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                                {order.id}
                              </CardTitle>
                              <CardDescription className="text-[10px] sm:text-xs">
                                {formatTimeAgo(order.received)}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0 pb-1">
                          <div className="space-y-1 sm:space-y-2">
                            {order.items.map((item: any, i: number) => (
                              <div
                                key={i}
                                className="flex justify-between text-xs sm:text-sm"
                              >
                                <span className="truncate max-w-[120px] capitalize sm:max-w-[180px]">
                                  {item.name}
                                </span>
                                <span className="whitespace-nowrap">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
                              <span>Total</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </>
      ) : (
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">
              Order Fulfillment
            </h2>
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
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 overflow-x-auto">
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
                  />
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
                    {filteredOrders.map((order) => (
                      <Card key={order.id} className="border rounded-lg">
                        <CardHeader className="p-3 sm:p-4 pb-1">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                                {order.id}
                              </CardTitle>
                              <CardDescription className="text-[10px] sm:text-xs">
                                {formatTimeAgo(order.received)}
                              </CardDescription>
                            </div>
                            <Badge className="text-[10px] sm:text-xs capitalize">
                              {order.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0 pb-1">
                          <div className="space-y-1 sm:space-y-2">
                            {order.items.map((item: any, i: number) => (
                              <div
                                key={i}
                                className="flex justify-between text-xs sm:text-sm"
                              >
                                <span className="truncate max-w-[120px] sm:max-w-[180px]">
                                  {item.name}
                                </span>
                                <span className="whitespace-nowrap">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
                              <span>Total</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 sm:p-4 pt-1 flex gap-1 sm:gap-2">
                          {order.status === "pending" && (
                            <>
                              <Dialog
                                open={
                                  delayModalOpen && selectedOrderId === order.id
                                }
                                onOpenChange={(open) => {
                                  if (!open) {
                                    setDelayModalOpen(false);
                                    setSelectedOrderId(null);
                                  } else {
                                    setDelayModalOpen(true);
                                    setSelectedOrderId(order.id);
                                  }
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 h-7 sm:h-8 text-xs"
                                    onClick={() => handleDelayClick(order.id)}
                                  >
                                    <Clock className="h-3 w-3 mr-1" />
                                    Delay
                                  </Button>
                                </DialogTrigger>
                                <DelayOrderModal
                                  open={
                                    delayModalOpen &&
                                    selectedOrderId === order.id
                                  }
                                  onOpenChange={(open) => {
                                    setDelayModalOpen(open);
                                    if (!open) setSelectedOrderId(null);
                                  }}
                                  onDelaySelect={handleDelaySelect}
                                />
                              </Dialog>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1 h-7 sm:h-8 text-xs"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Decline
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 h-7 sm:h-8 text-xs"
                              >
                                <PackageCheck className="h-3 w-3 mr-1" />
                                Confirm
                              </Button>
                            </>
                          )}
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              className="flex-1 h-7 sm:h-8 text-xs"
                            >
                              <PackageCheck className="h-3 w-3 mr-1" />
                              Track
                            </Button>
                          )}
                          {order.status === "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-7 sm:h-8 text-xs"
                            >
                              <DollarSign className="h-3 w-3 mr-1" />
                              Request
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
      )}
    </div>
  );
};

export default SupplierOrder;
