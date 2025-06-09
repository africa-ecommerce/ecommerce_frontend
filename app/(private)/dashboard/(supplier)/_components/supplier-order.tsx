
"use client";

import type React from "react";

import { useState } from "react";
import {
  AlertCircle,
  Clock,
  Package,
  PackageCheck,
  RefreshCw,
  Users,
  X,
  Phone,
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

// Error State
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

// Empty State
const EmptyState = ({
  message,
  icon: Icon = Package,
}: {
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <Card className="border rounded-lg">
    <CardContent className="p-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Icon className="h-6 w-6 text-muted-foreground" />
        <p className="text-muted-foreground text-xs">{message}</p>
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
  const delayOptions = [5, 10, 15, 30, 60, 120]; // minutes

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
                {time >= 60 ? `${time / 60} hr` : `${time} min`}
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

// Order Card Component
const OrderCard = ({ order }: { order: any }) => {
  const [delayModalOpen, setDelayModalOpen] = useState(false);
  const { userData } = useUser();
  const { user } = userData || { user: null };

  const handleDelaySelect = (minutes: number) => {
    console.log(`Delaying order ${order.id} by ${minutes} minutes`);
    // Add your delay logic here
  };

  const handleAccept = () => {
    console.log(`Accepting order ${order.id}`);
    // Add your accept logic here
  };

  const handleDecline = () => {
    console.log(`Declining order ${order.id}`);
    // Add your decline logic here
  };

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

  // Calculate total amount
  const totalAmount =
    order.orderItems?.reduce((total: number, item: any) => {
      return total + (order.supplierPrice || 0) * item.quantity;
    }, 0) || 0;

  return (
    <Card className="border rounded-lg">
      <CardHeader className="p-3 sm:p-4 pb-1">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">
              {order.orderId}
            </CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">
              {formatDate(order.createdAt)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 pt-0 pb-1">
        <div className="space-y-2">
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
          <div className="space-y-1">
            {order.orderItems?.map((item: any, index: number) => (
              <div
                key={item.id}
                className="flex justify-between text-xs sm:text-sm"
              >
                <span className="truncate max-w-[120px] capitalize sm:max-w-[180px]">
                  {item.productName} x {item.quantity}
                </span>
                <span className="whitespace-nowrap">
                  ₦
                  {(
                    (order.supplierPrice || 0) * item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
              <span>Total</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons - Only show if user is verified */}
      {user?.supplier?.verified && (
        <CardFooter className="p-3 sm:p-4 pt-1 flex gap-1 sm:gap-2">
          <Dialog open={delayModalOpen} onOpenChange={setDelayModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-7 sm:h-8 text-xs"
              >
                <Clock className="h-3 w-3 mr-1" />
                Delay
              </Button>
            </DialogTrigger>
            <DelayOrderModal
              open={delayModalOpen}
              onOpenChange={setDelayModalOpen}
              onDelaySelect={handleDelaySelect}
            />
          </Dialog>

          <Button
            variant="destructive"
            size="sm"
            className="flex-1 h-7 sm:h-8 text-xs"
            onClick={handleDecline}
          >
            <X className="h-3 w-3 mr-1" />
            Decline
          </Button>

          <Button
            size="sm"
            className="flex-1 h-7 sm:h-8 text-xs"
            onClick={handleAccept}
          >
            <PackageCheck className="h-3 w-3 mr-1" />
            Accept
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const SupplierOrder = () => {
  const { userData } = useUser();
  const { user } = userData || { user: null };

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
    mutate: ordersMutate,
  } = useSWR("/api/orders/supplier?orderStatus=PENDING", {
    refreshInterval: 30000, // Poll every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000, // Prevent duplicate requests within 10 seconds
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  console.log("ordersData", ordersData);

  // Process orders data
  const orders = Array.isArray(ordersData?.data) ? ordersData?.data : [];

  return (
    <div className="space-y-6">
      {/* Intelligence Section at the top */}
      <IntelligenceSection
        ordersData={orders}
        ordersLoading={ordersLoading}
        ordersError={ordersError}
      />
      {!user?.supplier?.verified ? (
        <>
          {ordersLoading ? (
            <TipSkeleton />
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
                    processing orders. Verified accounts are more likely to
                    receive orders.
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
          )}

          <section className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h2 className="text-sm sm:text-base font-semibold">
                Order Fulfillment
              </h2>
            </div>

            {ordersError ? (
              <ErrorState onRetry={() => ordersMutate()} />
            ) : ordersLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {orders.length === 0 ? (
                  <EmptyState message="No orders found" icon={PackageCheck} />
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
                    {orders.map((order: any) => (
                      <OrderCard key={order.id} order={order} />
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

          {ordersError ? (
            <ErrorState onRetry={() => ordersMutate()} />
          ) : ordersLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {orders.length === 0 ? (
                <EmptyState message="No orders found" icon={PackageCheck} />
              ) : (
                <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
                  {orders.map((order: any) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default SupplierOrder;

