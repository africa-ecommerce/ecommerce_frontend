// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   AlertCircle,
//   Package,
//   Clock,
//   CheckCircle2,
//   TrendingUp,
// } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";


// type MetricState = "loading" | "empty" | "error" | "loaded";

// interface MetricData {
//   totalOrders: number;
//   totalItemsDelivered: number;
//   fulfillmentRate: number;
//   avgDeliveryTime: number;
 
//   state: MetricState;
//   errorMessage?: string;
// }


// interface IntelligenceSectionProps {
//   ordersData?: any[];
//   ordersLoading?: boolean;
//   ordersError?: any;
// }

// export function IntelligenceSection({
//   ordersData = [],
//   ordersLoading = false,
//   ordersError = null,
// }: IntelligenceSectionProps) {
//   const [metrics, setMetrics] = useState<MetricData>({
//     totalOrders: 0,
//     totalItemsDelivered: 0,
//     fulfillmentRate: 0,
//     avgDeliveryTime: 0,
//     state: "loading",
//   });

//   const fetchMetrics = async () => {
//     setMetrics((prev) => ({ ...prev, state: "loading" }));

//     try {
//       // If orders are still loading, keep loading state
//       if (ordersLoading) {
//         return;
//       }

//       // If there's an error loading orders, show error state
//       if (ordersError) {
//         setMetrics((prev) => ({
//           ...prev,
//           state: "error",
//           errorMessage: "Failed to load order data for intelligence metrics.",
//         }));
//         return;
//       }

//       // If no orders data, show empty state
//       if (!ordersData || ordersData.length === 0) {
//         setMetrics((prev) => ({ ...prev, state: "empty" }));
//         return;
//       }

//       // Simulate API delay for other metrics
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       // Use real total orders from props, keep other metrics static for now
//       const totalOrders = ordersData.length;

//       // Keep these static as requested
//       const totalItemsDelivered = Math.floor(Math.random() * 50) + 20; // Random between 20-70
//       const fulfillmentRate = Math.floor(Math.random() * 30) + 70; // Random between 70-100%
//       const avgDeliveryTime = Math.floor(Math.random() * 12) + 6; // Random between 6-18 hours

//       setMetrics({
//         totalOrders,
//         totalItemsDelivered,
//         fulfillmentRate,
//         avgDeliveryTime,
//         state: "loaded",
//       });
//     } catch (error) {
//       setMetrics((prev) => ({
//         ...prev,
//         state: "error",
//         errorMessage: "An unexpected error occurred while calculating metrics.",
//       }));
//     }
//   };

//   useEffect(() => {
//     fetchMetrics();
//   }, [ordersData, ordersLoading, ordersError]);

//   const renderContent = () => {
//     switch (metrics.state) {
//       case "loading":
//         return <LoadingState />;
//       case "empty":
//         return <EmptyState onRetry={fetchMetrics} />;
//       case "error":
//         return (
//           <ErrorState
//             message={metrics.errorMessage || "Unknown error"}
//             onRetry={fetchMetrics}
//           />
//         );
//       case "loaded":
//         return <LoadedState metrics={metrics} />;
//       default:
//         return null;
//     }
//   };

//   return <div className="mb-8 w-full">{renderContent()}</div>;
// }

// function LoadingState() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//       {Array(4)
//         .fill(0)
//         .map((_, i) => (
//           <Card key={i} className="overflow-hidden">
//             <CardContent className="p-3 sm:p-4">
//               <Skeleton className="h-3 sm:h-4 w-1/2 mb-2" />
//               <Skeleton className="h-6 sm:h-8 w-3/4" />
//             </CardContent>
//           </Card>
//         ))}
//     </div>
//   );
// }


// function EmptyState({ onRetry }: { onRetry: () => void }) {
//   return (
//     <Card className="p-4 sm:p-6 text-center">
//       <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
//         <Package className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
//         <h3 className="text-base sm:text-lg font-semibold">
//           No Order Data Available
//         </h3>
//         <p className="text-muted-foreground max-w-md mx-auto text-xs sm:text-sm">
//           There is currently no order data available. This could be because you
//           haven't processed any orders yet.
//         </p>
//         <Button size="sm" onClick={onRetry} className="mt-2">
//           Refresh Data
//         </Button>
//       </div>
//     </Card>
//   );
// }

// function ErrorState({
//   message,
//   onRetry,
// }: {
//   message: string;
//   onRetry: () => void;
// }) {
//   return (
//     <Alert variant="destructive" className="flex flex-col sm:flex-row">
//       <div className="flex items-start">
//         <AlertCircle className="h-4 w-4 mt-0.5" />
//         <div className="ml-2">
//           <AlertTitle className="text-sm sm:text-base">
//             Error Loading Intelligence Data
//           </AlertTitle>
//           <AlertDescription className="text-xs sm:text-sm">
//             {message}
//           </AlertDescription>
//         </div>
//       </div>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={onRetry}
//         className="mt-2 sm:mt-0 sm:ml-auto"
//       >
//         Try Again
//       </Button>
//     </Alert>
//   );
// }

// function LoadedState({ metrics }: { metrics: MetricData }) {
//   return (
//     <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//       <MetricCard
//         title="Total Orders"
//         value={metrics.totalOrders.toString()}
//         icon={<Package className="h-4 w-4 text-orange-500" />}
//       />

//       <MetricCard
//         title="Items Delivered"
//         value={metrics.totalItemsDelivered.toString()}
//         icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
//       />

//       <MetricCard
//         title="Fulfillment Rate"
//         value={`${Math.round(metrics.fulfillmentRate)}%`}
//         icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
//       />

//       <MetricCard
//         title="Avg. Delivery Time"
//         value={`${Math.round(metrics.avgDeliveryTime)} hrs`}
//         icon={<Clock className="h-4 w-4 text-purple-500" />}
//       />

     
//     </div>
//   );
// }

// interface MetricCardProps {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
//   className?: string;
// }

// function MetricCard({ title, value, icon, className = "" }: MetricCardProps) {
//   return (
//     <Card className={className}>
//       <CardContent className="p-3 sm:p-4">
//         <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
//           {icon}
//           <p className="text-xs sm:text-sm font-medium text-muted-foreground">
//             {title}
//           </p>
//         </div>
//         <p className="text-xl sm:text-2xl font-bold">{value}</p>
//       </CardContent>
//     </Card>
//   );
// }








"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Package,
  DollarSign,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

type MetricState = "loading" | "empty" | "error" | "loaded";

interface MetricData {
  totalOrders: number;
  totalOrdersDelivered: number;
  fulfillmentRate: number;
  totalValueDelivered: number;
  state: MetricState;
  errorMessage?: string;
}

interface IntelligenceSectionProps {
  ordersData?: any[];
  ordersLoading?: boolean;
  ordersError?: any;
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function IntelligenceSection({
  ordersData = [],
  ordersLoading = false,
  ordersError = null,
}: IntelligenceSectionProps) {
  const [metrics, setMetrics] = useState<MetricData>({
    totalOrders: 0,
    totalOrdersDelivered: 0,
    fulfillmentRate: 100, // Hardcoded to 100
    totalValueDelivered: 0,
    state: "loading",
  });

  // Fetch delivered orders using SWR
  const {
    data: deliveredOrdersData,
    error: deliveredOrdersError,
    isLoading: deliveredOrdersLoading,
  } = useSWR("/api/orders/supplier?orderStatus=DELIVERED", fetcher);

  const calculateMetrics = () => {
    setMetrics((prev) => ({ ...prev, state: "loading" }));

    try {
      // If orders are still loading, keep loading state
      if (ordersLoading || deliveredOrdersLoading) {
        return;
      }

      // If there's an error loading orders, show error state
      if (ordersError || deliveredOrdersError) {
        setMetrics((prev) => ({
          ...prev,
          state: "error",
          errorMessage: "Failed to load order data for intelligence metrics.",
        }));
        return;
      }

      // If no orders data, show empty state
      if (!ordersData || ordersData.length === 0) {
        setMetrics((prev) => ({ ...prev, state: "empty" }));
        return;
      }

      // Calculate metrics
      const totalOrders = ordersData.length;
      const totalOrdersDelivered = deliveredOrdersData?.data?.length || 0;
      const fulfillmentRate = 100; // Hardcoded to 100 as requested

      // Calculate total value of delivered orders
      const totalValueDelivered =
        deliveredOrdersData?.data?.reduce((total: number, order: any) => {
          const orderTotal =
            order.orderItems?.reduce((orderSum: number, item: any) => {
              return orderSum + (item.supplierPrice || 0) * item.quantity;
            }, 0) || 0;
          return total + orderTotal;
        }, 0) || 0;

      setMetrics({
        totalOrders,
        totalOrdersDelivered,
        fulfillmentRate,
        totalValueDelivered,
        state: "loaded",
      });
    } catch (error) {
      setMetrics((prev) => ({
        ...prev,
        state: "error",
        errorMessage: "An unexpected error occurred while calculating metrics.",
      }));
    }
  };

  useEffect(() => {
    calculateMetrics();
  }, [
    ordersData,
    ordersLoading,
    ordersError,
    deliveredOrdersData,
    deliveredOrdersLoading,
    deliveredOrdersError,
  ]);

  const renderContent = () => {
    switch (metrics.state) {
      case "loading":
        return <LoadingState />;
      case "empty":
        return <EmptyState onRetry={calculateMetrics} />;
      case "error":
        return (
          <ErrorState
            message={metrics.errorMessage || "Unknown error"}
            onRetry={calculateMetrics}
          />
        );
      case "loaded":
        return <LoadedState metrics={metrics} />;
      default:
        return null;
    }
  };

  return <div className="mb-8 w-full">{renderContent()}</div>;
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-3 sm:p-4">
              <Skeleton className="h-3 sm:h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 sm:h-8 w-3/4" />
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="p-4 sm:p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
        <Package className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
        <h3 className="text-base sm:text-lg font-semibold">
          No Order Data Available
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto text-xs sm:text-sm">
          There is currently no order data available. This could be because you
          haven't processed any orders yet.
        </p>
        <Button size="sm" onClick={onRetry} className="mt-2">
          Refresh Data
        </Button>
      </div>
    </Card>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Alert variant="destructive" className="flex flex-col sm:flex-row">
      <div className="flex items-start">
        <AlertCircle className="h-4 w-4 mt-0.5" />
        <div className="ml-2">
          <AlertTitle className="text-sm sm:text-base">
            Error Loading Intelligence Data
          </AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            {message}
          </AlertDescription>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="mt-2 sm:mt-0 sm:ml-auto"
      >
        Try Again
      </Button>
    </Alert>
  );
}

function LoadedState({ metrics }: { metrics: MetricData }) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      <MetricCard
        title="Total Orders"
        value={metrics.totalOrders.toString()}
        icon={<Package className="h-4 w-4 text-orange-500" />}
      />

      <MetricCard
        title="Orders Delivered"
        value={metrics.totalOrdersDelivered.toString()}
        icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
      />

      <MetricCard
        title="Fulfillment Rate"
        value={`${Math.round(metrics.fulfillmentRate)}%`}
        icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
      />

      <MetricCard
        title="Total Value Delivered"
        value={`₦${metrics.totalValueDelivered.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4 text-purple-500" />}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

function MetricCard({ title, value, icon, className = "" }: MetricCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          {icon}
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {title}
          </p>
        </div>
        <p className="text-xl sm:text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}