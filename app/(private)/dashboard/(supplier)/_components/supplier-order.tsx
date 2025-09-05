
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
import { truncateText } from "@/lib/utils";

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


// Updated Supplier Order Card Component
const OrderCard = ({ order }: { order: any }) => {
  const [delayModalOpen, setDelayModalOpen] = useState(false);

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
      return total + (item.supplierPrice || 0) * item.quantity;
    }, 0) || 0;

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
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
        {/* Customer Info */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {truncateText(capitalizeWords(order.buyerName), 30)}
          </span>
          
        </div>

       

        {/* Products */}
        <div className="space-y-2">
          {order.orderItems?.map((item: any, index: number) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <div className="text-sm font-medium capitalize">
                  {truncateText(item.productName, 37)} <span className="lowercase">x</span> {item.quantity}
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
                ₦{(
                  (item.supplierPrice || 0) * item.quantity
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-sm pt-2 border-t">
          <span className="font-medium">Total</span>
          <span className="font-bold">₦{totalAmount.toLocaleString()}</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-1 flex gap-2">
          <Dialog open={delayModalOpen} onOpenChange={setDelayModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs"
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
            className="flex-1 h-8 text-xs"
            onClick={handleDecline}
          >
            <X className="h-3 w-3 mr-1" />
            Decline
          </Button>

          <Button
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={handleAccept}
          >
            <PackageCheck className="h-3 w-3 mr-1" />
            Accept
          </Button>
        </CardFooter>
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
      {/* )} */}
    </div>
  );
};

export default SupplierOrder;

