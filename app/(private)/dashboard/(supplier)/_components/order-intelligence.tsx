"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Sample data for metrics calculation
const allOrders = [
  // Pending orders
  {
    id: "SUP-4582",
    time: "1 hour ago",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    items: [
      { name: "Shea Butter (250g)", quantity: 10, price: 2500 },
      { name: "African Black Soap", quantity: 5, price: 1500 },
    ],
    total: 32500,
  },
  {
    id: "SUP-4581",
    time: "2 hours ago",
    status: "pending",
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    items: [
      { name: "Shea Butter (250g)", quantity: 10, price: 2500 },
      { name: "African Black Soap", quantity: 5, price: 1500 },
    ],
    total: 32500,
  },
  // Processing orders
  {
    id: "SUP-4580",
    time: "3 hours ago",
    status: "processing",
    createdAt: new Date(Date.now() - 10800000), // 3 hours ago
    items: [
      { name: "Cocoa Butter (500g)", quantity: 5, price: 3000 },
      { name: "Neem Oil (100ml)", quantity: 3, price: 2000 },
    ],
    total: 21000,
  },
  {
    id: "SUP-4579",
    time: "5 hours ago",
    status: "processing",
    createdAt: new Date(Date.now() - 18000000), // 5 hours ago
    items: [
      { name: "Aloe Vera Gel (200ml)", quantity: 8, price: 1800 },
      { name: "Coconut Oil (250ml)", quantity: 4, price: 2200 },
    ],
    total: 23200,
  },
  // Delivered orders
  {
    id: "SUP-4578",
    time: "1 day ago",
    status: "delivered",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    deliveredAt: new Date(Date.now() - 64800000), // Delivered 18 hours ago
    items: [
      { name: "Moringa Powder (100g)", quantity: 6, price: 1500 },
      { name: "Baobab Oil (50ml)", quantity: 2, price: 3500 },
    ],
    total: 16000,
  },
  {
    id: "SUP-4577",
    time: "2 days ago",
    status: "delivered",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    deliveredAt: new Date(Date.now() - 144000000), // Delivered 40 hours ago
    items: [
      { name: "Shea Butter (500g)", quantity: 4, price: 4500 },
      { name: "Black Soap (Premium)", quantity: 3, price: 2800 },
    ],
    total: 26400,
  },
];

// Format currency in Naira
const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

type MetricState = "loading" | "empty" | "error" | "loaded";

interface MetricData {
  totalOrders: number;
  totalItemsDelivered: number;
  fulfillmentRate: number;
  avgDeliveryTime: number;
  pendingOrders: number;
  state: MetricState;
  errorMessage?: string;
}

export function IntelligenceSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [metrics, setMetrics] = useState<MetricData>({
    totalOrders: 0,
    totalItemsDelivered: 0,
    fulfillmentRate: 0,
    avgDeliveryTime: 0,
    pendingOrders: 0,
    state: "loading",
  });

  const fetchMetrics = async () => {
    setMetrics((prev) => ({ ...prev, state: "loading" }));

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Randomly decide whether to show empty state (10% chance)
      const showEmpty = Math.random() < 0.1;
      if (showEmpty) {
        setMetrics((prev) => ({ ...prev, state: "empty" }));
        return;
      }

      // Randomly decide whether to show error state (10% chance)
      const showError = Math.random() < 0.1;
      if (showError) {
        setMetrics((prev) => ({
          ...prev,
          state: "error",
          errorMessage:
            "Failed to fetch intelligence data. Server returned an error.",
        }));
        return;
      }

      // Calculate metrics from order data
      const totalOrders = allOrders.length;

      // Calculate total items delivered
      const deliveredOrders = allOrders.filter(
        (order) => order.status === "delivered"
      );
      const totalItemsDelivered = deliveredOrders.reduce((sum, order) => {
        return (
          sum +
          order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
        );
      }, 0);

      // Calculate fulfillment rate
      const fulfillmentRate = (deliveredOrders.length / totalOrders) * 100;

      // Calculate average delivery time (in hours)
      const deliveryTimes = deliveredOrders.map((order) => {
        const createdTime = order.createdAt.getTime();
        const deliveredTime = order.deliveredAt?.getTime();
        return (deliveredTime! - createdTime) / (1000 * 60 * 60); // Convert to hours
      });

      const avgDeliveryTime =
        deliveryTimes.length > 0
          ? deliveryTimes.reduce((sum, time) => sum + time, 0) /
            deliveryTimes.length
          : 0;

      // Calculate pending orders
      const pendingOrders = allOrders.filter(
        (order) => order.status === "pending"
      ).length;

      setMetrics({
        totalOrders,
        totalItemsDelivered,
        fulfillmentRate,
        avgDeliveryTime,
        pendingOrders,
        state: "loaded",
      });
    } catch (error) {
      setMetrics((prev) => ({
        ...prev,
        state: "error",
        errorMessage: "An unexpected error occurred while fetching data.",
      }));
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const renderContent = () => {
    switch (metrics.state) {
      case "loading":
        return <LoadingState />;
      case "empty":
        return <EmptyState onRetry={fetchMetrics} />;
      case "error":
        return (
          <ErrorState
            message={metrics.errorMessage || "Unknown error"}
            onRetry={fetchMetrics}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {Array(5)
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
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      <MetricCard
        title="Total Orders"
        value={metrics.totalOrders.toString()}
        icon={<Package className="h-4 w-4 text-orange-500" />}
      />

      <MetricCard
        title="Items Delivered"
        value={metrics.totalItemsDelivered.toString()}
        icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
      />

      <MetricCard
        title="Fulfillment Rate"
        value={`${Math.round(metrics.fulfillmentRate)}%`}
        icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
      />

      <MetricCard
        title="Avg. Delivery Time"
        value={`${Math.round(metrics.avgDeliveryTime)} hrs`}
        icon={<Clock className="h-4 w-4 text-purple-500" />}
      />

      <MetricCard
        title="Pending Orders"
        value={metrics.pendingOrders.toString()}
        icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
        className="xs:col-span-2 md:col-span-1"
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
