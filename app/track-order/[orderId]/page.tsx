"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MapPin,
  Package,
  Truck,
  Clock,
  Phone,
  AlertCircle,
  CheckCircle,
  Navigation,
  Mail,
  PackageCheck,
  ShoppingCart,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { truncateText } from "@/lib/utils";

// Dynamically import the map component to avoid SSR issues
const OrderTrackingMap = dynamic(() => import("./order-tracking-map"), {
  ssr: false,
  loading: () => (
    <div className="h-48 sm:h-64 md:h-80 lg:h-96 bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Loading map...
        </p>
      </div>
    </div>
  ),
});

// TypeScript interfaces
interface OrderData {
  orderId: string;
  status: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
    timestamp: string;
  };
  origin: {
    lat: number;
    lng: number;
    address: string;
    name: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
    recipientName: string;
  };
  estimatedDelivery: string;
  trackingProgress: Array<{
    status: string;
    timestamp: string;
    description: string;
    stepState: "completed" | "current" | "upcoming";
  }>;
}

interface ApiResponse {
  message: string;
  data: {
    base: {
      latitude: number;
      longitude: number;
      address: string;
      lga: string;
      state: string;
    };
    buyer: {
      latitude: number;
      longitude: number;
      address: string;
      lga: string;
      state: string;
      name: string;
    };
    status: "PENDING" | "SHIPPED" | "DELIVERED";
  };
}

// Utility functions
const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const truncateAddress = (address: string, maxLength = 50) => {
  if (address.length <= maxLength) return address;
  return address.substring(0, maxLength) + "...";
};

const formatFullAddress = (address: string, lga: string, state: string) => {
  return `${capitalizeWords(address)}, ${capitalizeWords(
    lga
  )}, ${capitalizeWords(state)}`;
};

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Transform API data to OrderData format
const transformApiData = (
  apiData: ApiResponse,
  trackingId: string
): OrderData => {
  const { data } = apiData;
  const currentTime = new Date().toISOString();

  // Hardcoded current location as requested
  const currentLocation = {
    lat: 6.618,
    lng: 3.3209,
    address: "Adealu Street, Agege, Lagos",
    timestamp: currentTime,
  };

  // Generate estimated delivery time (2-3 days from now)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(
    estimatedDelivery.getDate() +
      (data.status === "DELIVERED" ? 0 : data.status === "SHIPPED" ? 1 : 2)
  );
  estimatedDelivery.setHours(17, 0, 0, 0); // Set to 5 PM

  // Create tracking progress based on actual status
  const getTrackingProgress = (status: string) => {
    const statusLower = status.toLowerCase();

    const baseProgress = [
      {
        status: "pending",
        timestamp:
          statusLower === "pending"
            ? currentTime
            : statusLower === "shipped" || statusLower === "delivered"
            ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
            : "",
        description:
          statusLower === "pending"
            ? "Order confirmed and being prepared for shipment"
            : "Order was confirmed and prepared for shipment",
        stepState:
          statusLower === "pending"
            ? ("current" as const)
            : statusLower === "shipped" || statusLower === "delivered"
            ? ("completed" as const)
            : ("upcoming" as const),
      },
      {
        status: "shipped",
        timestamp:
          statusLower === "shipped"
            ? currentTime
            : statusLower === "delivered"
            ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
            : "",
        description:
          statusLower === "shipped"
            ? "Package has left our facility and is on its way to you"
            : statusLower === "delivered"
            ? "Package left our facility and was on its way to you"
            : "Package will leave our facility and be on its way to you",
        stepState:
          statusLower === "shipped"
            ? ("current" as const)
            : statusLower === "delivered"
            ? ("completed" as const)
            : ("upcoming" as const),
      },
      {
        status: "delivered",
        timestamp: statusLower === "delivered" ? currentTime : "",
        description:
          statusLower === "delivered"
            ? "Package successfully delivered to your address"
            : "Package will be delivered to your address",
        stepState:
          statusLower === "delivered"
            ? ("current" as const)
            : ("upcoming" as const),
      },
    ];
    return baseProgress;
  };

  return {
    orderId: trackingId,
    status: data.status.toLowerCase(),
    currentLocation,
    origin: {
      lat: data.base.latitude,
      lng: data.base.longitude,
      address: formatFullAddress(
        data.base.address,
        data.base.lga,
        data.base.state
      ),
      name: `${capitalizeWords(data.base.lga)} Distribution Center`,
    },
    destination: {
      lat: data.buyer.latitude,
      lng: data.buyer.longitude,
      address: formatFullAddress(
        data.buyer.address,
        data.buyer.lga,
        data.buyer.state
      ),
      recipientName: capitalizeWords(data.buyer.name),
    },
    estimatedDelivery: estimatedDelivery.toISOString(),
    trackingProgress: getTrackingProgress(data.status),
  };
};

export default function TrackOrderPage() {
  const params = useParams();
  const trackingId = params.orderId as string;

  // SWR hook for data fetching
  const {
    data: apiData,
    error,
    isLoading,
    mutate,
  } = useSWR<ApiResponse>(
    trackingId ? `/api/logistics/tracking/${trackingId}` : null,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every 60 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      errorRetryCount: 1,
      errorRetryInterval: 5000,
    }
  );

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  // Transform API data when it changes
  useEffect(() => {
    if (apiData && trackingId) {
      try {
        const transformedData = transformApiData(apiData, trackingId);
        setOrderData(transformedData);
      } catch (err) {
        console.error("Error transforming API data:", err);
      }
    }
  }, [apiData, trackingId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (
    status: string,
    stepState: "completed" | "current" | "upcoming"
  ) => {
    switch (status.toLowerCase()) {
      case "pending":
        return stepState === "completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : stepState === "current" ? (
          <ShoppingCart className="h-5 w-5 text-blue-500" />
        ) : (
          <ShoppingCart className="h-5 w-5 text-gray-400" />
        );
      case "shipped":
        return stepState === "completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : stepState === "current" ? (
          <Truck className="h-5 w-5 text-blue-500" />
        ) : (
          <Truck className="h-5 w-5 text-gray-400" />
        );
      case "delivered":
        return stepState === "completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : stepState === "current" ? (
          <PackageCheck className="h-5 w-5 text-blue-500" />
        ) : (
          <PackageCheck className="h-5 w-5 text-gray-400" />
        );
      case "cancelled":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateMobile = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fixed function to get current step index based on order status
  const getCurrentStepIndex = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return 0; // Pending is current step
      case "shipped":
        return 1; // Shipped is current step, pending is completed
      case "delivered":
        return 2; // Delivered is current step, pending and shipped are completed
      default:
        return 0;
    }
  };

  const getCompletedStepsCount = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return 0; // No steps completed yet
      case "shipped":
        return 1; // Only pending is completed
      case "delivered":
        return 3; // All steps are completed
      default:
        return 0;
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4 sm:space-y-6">
            <div className="h-6 sm:h-8 bg-muted rounded w-1/2 sm:w-1/3"></div>
            <div className="space-y-4">
              <div className="h-48 sm:h-64 md:h-80 lg:h-96 bg-muted rounded-lg"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="h-32 bg-muted rounded-lg sm:col-span-2 lg:col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-6xl mx-auto">
          <Alert className="mb-4 sm:mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {error.message.includes("404")
                ? "Tracking ID not found. Please check the tracking ID and try again."
                : "Failed to load tracking information. Please try again later."}
            </AlertDescription>
          </Alert>
          <Button onClick={handleRefresh} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!orderData) return null;

  const currentStepIndex = getCurrentStepIndex(orderData.status);
  const completedStepsCount = getCompletedStepsCount(orderData.status);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
        {/* Header - Mobile Optimized */}
        <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
              Track Your Order
            </h1>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            Refresh
          </Button>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {/* Map Section - Full width on mobile */}
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
                  Live Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <OrderTrackingMap orderData={orderData} />
              </CardContent>
            </Card>

            {/* Tracking Progress - Always visible, moved after map */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                  Tracking Progress
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Follow your order's journey from start to delivery
                </p>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      {orderData.trackingProgress.map((step, index) => (
                        <div
                          key={index}
                          className={`flex flex-col items-center relative z-10 ${
                            step.stepState === "completed"
                              ? "text-green-600"
                              : step.stepState === "current"
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                              step.stepState === "completed"
                                ? "bg-green-500 border-green-500 text-white"
                                : step.stepState === "current"
                                ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            {getStatusIcon(step.status, step.stepState)}
                          </div>
                          <span className="text-xs font-medium capitalize">
                            {step.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Fixed Progress Line */}
                    <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0 flex items-center px-4 sm:px-5">
                      <div className="w-full h-0.5 bg-gray-200 relative">
                        <div
                          className="h-full bg-green-500 transition-all duration-500 ease-out absolute left-0 top-0"
                          style={{
                            width:
                              orderData.trackingProgress.length > 1
                                ? `${Math.min(
                                    (completedStepsCount /
                                      (orderData.trackingProgress.length - 1)) *
                                      100,
                                    100
                                  )}%`
                                : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Progress Details */}
                  <div className="space-y-4">
                    {orderData.trackingProgress.map((step, index) => (
                      <div
                        key={index}
                        className={`flex gap-4 p-3 rounded-lg transition-all duration-200 ${
                          step.stepState === "completed"
                            ? "bg-green-50 border border-green-200"
                            : step.stepState === "current"
                            ? "bg-blue-50 border border-blue-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(step.status, step.stepState)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                            <h4
                              className={`font-semibold text-sm capitalize ${
                                step.stepState === "completed"
                                  ? "text-green-700"
                                  : step.stepState === "current"
                                  ? "text-blue-700"
                                  : "text-gray-600"
                              }`}
                            >
                              {step.status === "pending"
                                ? "Order Confirmed"
                                : step.status === "shipped"
                                ? "Package Shipped"
                                : step.status === "delivered"
                                ? "Package Delivered"
                                : step.status}
                            </h4>
                            {step.stepState === "completed" && (
                              <Badge
                                variant="secondary"
                                className="text-xs w-fit bg-green-100 text-green-700"
                              >
                                Completed
                              </Badge>
                            )}
                            {step.stepState === "current" && (
                              <Badge
                                variant="secondary"
                                className="text-xs w-fit bg-blue-100 text-blue-700"
                              >
                                Current Step
                              </Badge>
                            )}
                            {step.stepState === "upcoming" && (
                              <Badge
                                variant="secondary"
                                className="text-xs w-fit bg-gray-100 text-gray-700"
                              >
                                Upcoming
                              </Badge>
                            )}
                          </div>
                          <p
                            className={`text-xs sm:text-sm mb-2 ${
                              step.stepState === "completed"
                                ? "text-green-600"
                                : step.stepState === "current"
                                ? "text-blue-600"
                                : "text-gray-500"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Info Sidebar - Stacked on mobile */}
          <div className="space-y-4">
            {/* Order Status - Prominent on mobile */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Package className="h-4 w-4 md:h-5 md:w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      orderData.status
                    )}`}
                  ></div>
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm capitalize"
                  >
                    {orderData.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Estimated Delivery:</span>
                  </div>
                  <p className="font-medium text-sm md:text-base">
                    <span className="md:hidden">
                      {formatDateMobile(orderData.estimatedDelivery)}
                    </span>
                    <span className="hidden md:inline">
                      {formatDate(orderData.estimatedDelivery)}
                    </span>
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Current Location</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {orderData.currentLocation.address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated:{" "}
                    <span className="md:hidden">
                      {formatDateMobile(orderData.currentLocation.timestamp)}
                    </span>
                    <span className="hidden md:inline">
                      {formatDate(orderData.currentLocation.timestamp)}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Details - Condensed on mobile */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">
                      Recipient
                    </h4>
                    <p className="text-sm sm:text-base font-medium">
                      {truncateText(orderData.destination.recipientName, 25)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">
                      Delivery Address
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">
                      {truncateText(orderData.destination.address, 60)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">
                      Origin
                    </h4>
                    <p className="text-xs text-muted-foreground break-words">
                      {truncateText(orderData.origin.address, 60)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-base md:text-lg">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-3">
                  <a href="mailto:support@pluggn.com.ng" className="w-full">
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      size="sm"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/2349151425001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp Support
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
