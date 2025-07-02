// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   MapPin,
//   Package,
//   Truck,
//   Clock,
//   Phone,
//   Share2,
//   Printer,
//   AlertCircle,
//   CheckCircle,
//   Navigation,
// } from "lucide-react";
// import dynamic from "next/dynamic";

// // Dynamically import the map component to avoid SSR issues
// const OrderTrackingMap = dynamic(
//   () => import("./order-tracking-map"),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
//           <p className="text-sm text-muted-foreground">Loading map...</p>
//         </div>
//       </div>
//     ),
//   }
// );

// // TypeScript interfaces
// interface OrderData {
//   orderId: string;
//   status: string;
//   currentLocation: {
//     lat: number;
//     lng: number;
//     address: string;
//     timestamp: string;
//   };
//   origin: {
//     lat: number;
//     lng: number;
//     address: string;
//     name: string;
//   };
//   destination: {
//     lat: number;
//     lng: number;
//     address: string;
//     recipientName: string;
//   };
//   estimatedDelivery: string;
//   trackingHistory: Array<{
//     status: string;
//     location: string;
//     timestamp: string;
//     description: string;
//   }>;
// }

// interface DemoAddress {
//   label: string;
//   address: string;
//   lat: number;
//   lng: number;
// }

// // Mock order data
// const mockOrders: Record<string, OrderData> = {
//   "ORD-2024-001": {
//     orderId: "ORD-2024-001",
//     status: "In Transit",
//     currentLocation: {
//       lat: 41.8781,
//       lng: -87.6298,
//       address: "Chicago Distribution Center, IL",
//       timestamp: "2024-01-15T14:30:00Z",
//     },
//     origin: {
//       lat: 40.7128,
//       lng: -74.006,
//       address: "123 Warehouse St, New York, NY 10001",
//       name: "NYC Fulfillment Center",
//     },
//     destination: {
//       lat: 34.0522,
//       lng: -118.2437,
//       address: "456 Delivery Ave, Los Angeles, CA 90210",
//       recipientName: "John Smith",
//     },
//     estimatedDelivery: "2024-01-17T18:00:00Z",
//     trackingHistory: [
//       {
//         status: "Order Placed",
//         location: "Online",
//         timestamp: "2024-01-14T10:00:00Z",
//         description: "Order confirmed and payment processed",
//       },
//       {
//         status: "Processing",
//         location: "NYC Fulfillment Center",
//         timestamp: "2024-01-14T15:30:00Z",
//         description: "Package prepared for shipment",
//       },
//       {
//         status: "Shipped",
//         location: "NYC Fulfillment Center",
//         timestamp: "2024-01-15T08:00:00Z",
//         description: "Package departed from origin facility",
//       },
//       {
//         status: "In Transit",
//         location: "Chicago Distribution Center",
//         timestamp: "2024-01-15T14:30:00Z",
//         description: "Package arrived at sorting facility",
//       },
//     ],
//   },
//   "ORD-2024-002": {
//     orderId: "ORD-2024-002",
//     status: "Out for Delivery",
//     currentLocation: {
//       lat: 37.7749,
//       lng: -122.4194,
//       address: "San Francisco Local Depot, CA",
//       timestamp: "2024-01-15T09:15:00Z",
//     },
//     origin: {
//       lat: 47.6062,
//       lng: -122.3321,
//       address: "789 Supply Chain Blvd, Seattle, WA 98101",
//       name: "Seattle Distribution Hub",
//     },
//     destination: {
//       lat: 37.7849,
//       lng: -122.4094,
//       address: "321 Market St, San Francisco, CA 94102",
//       recipientName: "Sarah Johnson",
//     },
//     estimatedDelivery: "2024-01-15T17:00:00Z",
//     trackingHistory: [
//       {
//         status: "Order Placed",
//         location: "Online",
//         timestamp: "2024-01-13T14:20:00Z",
//         description: "Order confirmed and payment processed",
//       },
//       {
//         status: "Processing",
//         location: "Seattle Distribution Hub",
//         timestamp: "2024-01-14T09:00:00Z",
//         description: "Package prepared for shipment",
//       },
//       {
//         status: "Shipped",
//         location: "Seattle Distribution Hub",
//         timestamp: "2024-01-14T16:45:00Z",
//         description: "Package departed from origin facility",
//       },
//       {
//         status: "Out for Delivery",
//         location: "San Francisco Local Depot",
//         timestamp: "2024-01-15T09:15:00Z",
//         description: "Package loaded for final delivery",
//       },
//     ],
//   },
// };

// // Demo addresses for testing
// const demoAddresses: DemoAddress[] = [
//   {
//     label: "Downtown Miami",
//     address: "100 Biscayne Blvd, Miami, FL 33132",
//     lat: 25.7617,
//     lng: -80.1918,
//   },
//   {
//     label: "Austin Tech District",
//     address: "500 W 2nd St, Austin, TX 78701",
//     lat: 30.2672,
//     lng: -97.7431,
//   },
//   {
//     label: "Boston Financial District",
//     address: "200 State St, Boston, MA 02109",
//     lat: 42.3601,
//     lng: -71.0589,
//   },
//   {
//     label: "Denver Downtown",
//     address: "1600 17th St, Denver, CO 80202",
//     lat: 39.7392,
//     lng: -104.9903,
//   },
//   {
//     label: "Phoenix Central",
//     address: "300 N Central Ave, Phoenix, AZ 85004",
//     lat: 33.4484,
//     lng: -112.074,
//   },
// ];

// export default function TrackOrderPage() {
//   const params = useParams();
//   const orderId = params.orderId as string;

//   const [orderData, setOrderData] = useState<OrderData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [address, setAddress] = useState("");
//   const [selectedAddress, setSelectedAddress] =
//     useState<DemoAddress | null>(null);

//   useEffect(() => {
//     // Simulate API call
//     const fetchOrderData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Simulate network delay
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const order = mockOrders[orderId];
//         if (!order) {
//           throw new Error("Order not found");
//         }

//         setOrderData(order);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to fetch order data"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrderData();
//     }
//   }, [orderId]);

//   const handleAddressSubmit = () => {
   

//     if (orderData) {
//         setSelectedAddress(selectedAddress);
//       setOrderData({
//         ...orderData,
//         destination: {
//           ...orderData.destination,
//           lat: selectedAddress!.lat,
//           lng: selectedAddress!.lng,
//           address: selectedAddress!.address,
//         },
//       });
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "delivered":
//         return "bg-green-500";
//       case "out for delivery":
//         return "bg-blue-500";
//       case "in transit":
//         return "bg-yellow-500";
//       case "processing":
//         return "bg-orange-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background p-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="animate-pulse space-y-6">
//             <div className="h-8 bg-muted rounded w-1/3"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2">
//                 <div className="h-96 bg-muted rounded-lg"></div>
//               </div>
//               <div className="space-y-4">
//                 <div className="h-32 bg-muted rounded-lg"></div>
//                 <div className="h-48 bg-muted rounded-lg"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-background p-4">
//         <div className="max-w-6xl mx-auto">
//           <Alert className="mb-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               {error}. Please check the order ID and try again.
//             </AlertDescription>
//           </Alert>
//           <div className="text-center">
//             <p className="text-muted-foreground mb-4">
//               Try these sample order IDs:
//             </p>
//             <div className="flex gap-2 justify-center flex-wrap">
//               {Object.keys(mockOrders).map((id) => (
//                 <Button
//                   key={id}
//                   variant="outline"
//                   onClick={() => (window.location.href = `/track-order/${id}`)}
//                 >
//                   {id}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!orderData) return null;

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Track Your Order</h1>
//             <p className="text-muted-foreground">
//               Order ID: {orderData.orderId}
//             </p>
//           </div>
          
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Map Section */}
//           <div className="lg:col-span-2 space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Navigation className="h-5 w-5" />
//                   Live Tracking
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <OrderTrackingMap orderData={orderData} />
//               </CardContent>
//             </Card>

          
//             <Card>
//               <CardHeader>
//                 <CardTitle> Different Destination?</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex gap-2">
//                   <Input
//                     placeholder="Enter a address or city name..."
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     onKeyPress={(e) =>
//                       e.key === "Enter" && handleAddressSubmit()
//                     }
//                   />
//                   <Button onClick={handleAddressSubmit}>Update</Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="text-sm text-muted-foreground">Try:</span>
                 
//                 </div>
//                 {selectedAddress && (
//                   <Alert>
//                     <CheckCircle className="h-4 w-4" />
//                     <AlertDescription>
//                       Destination updated to: {selectedAddress.address}
//                     </AlertDescription>
//                   </Alert>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Order Info Sidebar */}
//           <div className="space-y-4">
//             {/* Order Status */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Package className="h-5 w-5" />
//                   Order Status
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={`w-3 h-3 rounded-full ${getStatusColor(
//                       orderData.status
//                     )}`}
//                   ></div>
//                   <Badge variant="secondary">{orderData.status}</Badge>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Clock className="h-4 w-4" />
//                     <span>Estimated Delivery:</span>
//                   </div>
//                   <p className="font-medium">
//                     {formatDate(orderData.estimatedDelivery)}
//                   </p>
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <h4 className="font-medium">Current Location</h4>
//                   <p className="text-sm text-muted-foreground">
//                     {orderData.currentLocation.address}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     Last updated:{" "}
//                     {formatDate(orderData.currentLocation.timestamp)}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Delivery Details */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="h-5 w-5" />
//                   Delivery Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <h4 className="font-medium text-sm">Recipient</h4>
//                   <p className="text-sm">
//                     {orderData.destination.recipientName}
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-sm">Delivery Address</h4>
//                   <p className="text-sm text-muted-foreground">
//                     {orderData.destination.address}
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-sm">Origin</h4>
//                   <p className="text-sm text-muted-foreground">
//                     {orderData.origin.name}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     {orderData.origin.address}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Contact Support */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Need Help?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Button className="w-full bg-transparent" variant="outline">
//                   <Phone className="h-4 w-4 mr-2" />
//                   Contact Support
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Tracking History */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Truck className="h-5 w-5" />
//               Tracking History
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {orderData.trackingHistory.map((event, index) => (
//                 <div key={index} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`w-3 h-3 rounded-full ${getStatusColor(
//                         event.status
//                       )}`}
//                     ></div>
//                     {index < orderData.trackingHistory.length - 1 && (
//                       <div className="w-px h-8 bg-border mt-2"></div>
//                     )}
//                   </div>
//                   <div className="flex-1 pb-4">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h4 className="font-medium text-sm">{event.status}</h4>
//                       <Badge variant="outline" className="text-xs">
//                         {event.location}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       {event.description}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {formatDate(event.timestamp)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }







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

// Demo addresses for testing
const demoAddresses: DemoAddress[] = [
  {
    label: "Downtown Miami",
    address: "100 Biscayne Blvd, Miami, FL 33132",
    lat: 25.7617,
    lng: -80.1918,
  },
  {
    label: "Austin Tech District",
    address: "500 W 2nd St, Austin, TX 78701",
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    label: "Boston Financial District",
    address: "200 State St, Boston, MA 02109",
    lat: 42.3601,
    lng: -71.0589,
  },
  {
    label: "Denver Downtown",
    address: "1600 17th St, Denver, CO 80202",
    lat: 39.7392,
    lng: -104.9903,
  },
  {
    label: "Phoenix Central",
    address: "300 N Central Ave, Phoenix, AZ 85004",
    lat: 33.4484,
    lng: -112.074,
  },
];

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

  const handleAddressSubmit = () => {
    if (orderData) {
      setSelectedAddress(selectedAddress);
      setOrderData({
        ...orderData,
        destination: {
          ...orderData.destination,
          lat: selectedAddress!.lat,
          lng: selectedAddress!.lng,
          address: selectedAddress!.address,
        },
      });
    }
  };

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
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Try these sample order IDs:
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {Object.keys(mockOrders).map((id) => (
                <Button
                  key={id}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => (window.location.href = `/track-order/${id}`)}
                >
                  {id}
                </Button>
              ))}
            </div>
          </div>
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
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
              <CardContent className="p-3 sm:p-6">
                <OrderTrackingMap orderData={orderData} />
              </CardContent>
            </Card>

            {/* Address Update - Collapsible on mobile */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <button
                  onClick={() => setShowAddressUpdate(!showAddressUpdate)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <CardTitle className="text-base sm:text-lg">
                    Different Destination?
                  </CardTitle>
                  {showAddressUpdate ? (
                    <ChevronUp className="h-4 w-4 sm:hidden" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:hidden" />
                  )}
                </button>
              </CardHeader>
              <CardContent
                className={`space-y-4 p-3 sm:p-6 ${
                  !showAddressUpdate ? "hidden sm:block" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter address or city..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddressSubmit()
                    }
                    className="text-sm"
                  />
                  <Button
                    onClick={handleAddressSubmit}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    Update
                  </Button>
                </div>
                {selectedAddress && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Destination updated to: {selectedAddress.address}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Info Sidebar - Stacked on mobile */}
          <div className="space-y-4">
            {/* Order Status - Prominent on mobile */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
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
                  <p className="font-medium text-sm sm:text-base">
                    <span className="sm:hidden">
                      {formatDateMobile(orderData.estimatedDelivery)}
                    </span>
                    <span className="hidden sm:inline">
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
                    <span className="sm:hidden">
                      {formatDateMobile(orderData.currentLocation.timestamp)}
                    </span>
                    <span className="hidden sm:inline">
                      {formatDate(orderData.currentLocation.timestamp)}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Details - Condensed on mobile */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
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
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  size="sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tracking History - Collapsible on mobile */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <button
              onClick={() => setShowTrackingHistory(!showTrackingHistory)}
              className="w-full flex items-center justify-between text-left sm:cursor-default"
            >
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                Tracking History
              </CardTitle>
              <div className="sm:hidden">
                {showTrackingHistory ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </button>
          </CardHeader>
          <CardContent
            className={`p-3 sm:p-6 ${
              !showTrackingHistory ? "hidden sm:block" : ""
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
                      <span className="sm:hidden">
                        {formatDateMobile(event.timestamp)}
                      </span>
                      <span className="hidden sm:inline">
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