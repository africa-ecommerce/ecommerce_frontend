



"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MapPin,
  Package,
  Truck,
  Clock,
  Phone,
  Share2,
  Printer,
  AlertCircle,
  CheckCircle,
  Navigation,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import dynamic from "next/dynamic";

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
  trackingHistory: Array<{
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }>;
}

interface DemoAddress {
  label: string;
  address: string;
  lat: number;
  lng: number;
}

// Mock order data
const mockOrders: Record<string, OrderData> = {
  "ORD-2024-001": {
    orderId: "ORD-2024-001",
    status: "In Transit",
    currentLocation: {
      lat: 6.618,
      lng: 3.3209,
      address: "Chicago Distribution Center, IL",
      timestamp: "2024-01-15T14:30:00Z",
    },
    origin: {
      lat: 6.6018,
      lng: 3.3515,
      address: "123 Warehouse St, New York, NY 10001",
      name: "NYC Fulfillment Center",
    },
    destination: {
      lat: 6.6484,
      lng: 3.2992,
      address: "456 Delivery Ave, Los Angeles, CA 90210",
      recipientName: "John Smith",
    },
    estimatedDelivery: "2024-01-17T18:00:00Z",
    trackingHistory: [
      {
        status: "Order Placed",
        location: "Online",
        timestamp: "2024-01-14T10:00:00Z",
        description: "Order confirmed and payment processed",
      },
      {
        status: "Processing",
        location: "NYC Fulfillment Center",
        timestamp: "2024-01-14T15:30:00Z",
        description: "Package prepared for shipment",
      },
      {
        status: "Shipped",
        location: "NYC Fulfillment Center",
        timestamp: "2024-01-15T08:00:00Z",
        description: "Package departed from origin facility",
      },
      {
        status: "In Transit",
        location: "Chicago Distribution Center",
        timestamp: "2024-01-15T14:30:00Z",
        description: "Package arrived at sorting facility",
      },
    ],
  },
  "ORD-2024-002": {
    orderId: "ORD-2024-002",
    status: "Out for Delivery",
    currentLocation: {
      lat: 37.7749,
      lng: -122.4194,
      address: "San Francisco Local Depot, CA",
      timestamp: "2024-01-15T09:15:00Z",
    },
    origin: {
      lat: 47.6062,
      lng: -122.3321,
      address: "789 Supply Chain Blvd, Seattle, WA 98101",
      name: "Seattle Distribution Hub",
    },
    destination: {
      lat: 37.7849,
      lng: -122.4094,
      address: "321 Market St, San Francisco, CA 94102",
      recipientName: "Sarah Johnson",
    },
    estimatedDelivery: "2024-01-15T17:00:00Z",
    trackingHistory: [
      {
        status: "Order Placed",
        location: "Online",
        timestamp: "2024-01-13T14:20:00Z",
        description: "Order confirmed and payment processed",
      },
      {
        status: "Processing",
        location: "Seattle Distribution Hub",
        timestamp: "2024-01-14T09:00:00Z",
        description: "Package prepared for shipment",
      },
      {
        status: "Shipped",
        location: "Seattle Distribution Hub",
        timestamp: "2024-01-14T16:45:00Z",
        description: "Package departed from origin facility",
      },
      {
        status: "Out for Delivery",
        location: "San Francisco Local Depot",
        timestamp: "2024-01-15T09:15:00Z",
        description: "Package loaded for final delivery",
      },
    ],
  },
};


export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<DemoAddress | null>(
    null
  );
  const [showTrackingHistory, setShowTrackingHistory] = useState(false);
  const [showAddressUpdate, setShowAddressUpdate] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchOrderData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const order = mockOrders[orderId];
        if (!order) {
          throw new Error("Order not found");
        }

        setOrderData(order);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch order data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);



  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "out for delivery":
        return "bg-blue-500";
      case "in transit":
        return "bg-yellow-500";
      case "processing":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
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
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
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
              {error}. Please check the order ID and try again.
            </AlertDescription>
          </Alert>
         
        </div>
      </div>
    );
  }

  if (!orderData) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
        {/* Header - Mobile Optimized */}
        <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
              Track Your Order
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground break-all">
              Order ID: {orderData.orderId}
            </p>
          </div>
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
                  <Badge variant="secondary" className="text-xs sm:text-sm">
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
                      {orderData.destination.recipientName}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">
                      Delivery Address
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">
                      {orderData.destination.address}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">
                      Origin
                    </h4>
                    <p className="text-xs sm:text-sm font-medium">
                      {orderData.origin.name}
                    </p>
                    <p className="text-xs text-muted-foreground break-words">
                      {orderData.origin.address}
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
      <a
        href="mailto:support@pluggn.com.ng"
        className="w-full"
      >
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

        {/* Tracking History - Collapsible on mobile */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <button
              onClick={() => setShowTrackingHistory(!showTrackingHistory)}
              className="w-full flex items-center justify-between text-left md:cursor-default"
            >
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                Tracking History
              </CardTitle>
              <div className="md:hidden">
                {showTrackingHistory ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </button>
          </CardHeader>
          <CardContent
            className={`p-3 md:p-6 ${
              !showTrackingHistory ? "hidden md:block" : ""
            }`}
          >
            <div className="space-y-3 sm:space-y-4">
              {orderData.trackingHistory.map((event, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        event.status
                      )}`}
                    ></div>
                    {index < orderData.trackingHistory.length - 1 && (
                      <div className="w-px h-6 sm:h-8 bg-border mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-3 sm:pb-4 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h4 className="font-medium text-sm">{event.status}</h4>
                      <Badge variant="outline" className="text-xs w-fit">
                        {event.location}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 break-words">
                      {event.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="md:hidden">
                        {formatDateMobile(event.timestamp)}
                      </span>
                      <span className="hidden md:inline">
                        {formatDate(event.timestamp)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}