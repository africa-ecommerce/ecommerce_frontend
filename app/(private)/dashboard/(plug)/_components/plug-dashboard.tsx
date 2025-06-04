// "use client";

// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import {
//   AlertCircle,
  
//   HelpCircle,
//   LineChart,
//   Package,
//   PackageCheck,
//   RefreshCw,
//   Share2,
//   ShoppingBag,
//   Truck,
//   Users,
//   Wallet,
  
// } from "lucide-react";
// import Image from "next/image";


// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@/app/_components/provider/UserContext";
// import { Skeleton } from "@/components/ui/skeleton";
// import useSWR from "swr";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   formatPrice,
//   formatQuantity,
//   formatTimeAgo,
//   getTotalStocks,
//   truncateText,
// } from "@/lib/utils";

// function getTopAndBottomSales(productsArray: any, count = 5) {
//   // Create a copy of the array to avoid modifying the original
//   const productsCopy = [...productsArray];

//   // Filter out products with zero sales and sort by sales in descending order
//   const productsWithSales = productsCopy
//     .filter((product) => product.sales > 0)
//     .sort((a, b) => b.sales - a.sales);

//   // Get top products (limited to count)
//   const topProducts = productsWithSales.slice(0, count);

//   // Find the minimum sales value from top products
//   const minTopSales =
//     topProducts.length > 0
//       ? topProducts[topProducts.length - 1].sales
//       : Infinity;

//   // Get bottom products: those with sales > 0 but less than the minimum top sales
//   const bottomCandidates = productsCopy
//     .filter((product) => product.sales > 0 && product.sales < minTopSales)
//     .sort((a, b) => a.sales - b.sales);

//   // Take only up to 'count' bottom products
//   const bottomProducts = bottomCandidates.slice(0, count);

//   return {
//     topProducts,
//     bottomProducts,
//   };
// }

// // Error State
// const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
//   <Card className="border rounded-lg">
//     <CardContent className="p-4 text-center">
//       <div className="flex flex-col items-center justify-center space-y-2">
//         <AlertCircle className="h-6 w-6 text-destructive" />
//         <h3 className="text-sm font-medium">Failed to load data</h3>
//         <p className="text-muted-foreground text-xs">
//           Something went wrong while loading the data
//         </p>
//         {onRetry && (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={onRetry}
//             className="mt-1"
//           >
//             <RefreshCw className="mr-1 h-3 w-3" />
//             Retry
//           </Button>
//         )}
//       </div>
//     </CardContent>
//   </Card>
// );

// // Empty State with responsive adjustments
// const EmptyState = ({
//   message,
//   icon: Icon = Package,
//   actionText,
//   onAction,
//   className = "",
// }: {
//   message: string;
//   icon?: React.ComponentType<{ className?: string }>;
//   actionText?: string;
//   onAction?: () => void;
//   className?: string;
// }) => (
//   <Card className={`border rounded-lg ${className}`}>
//     <CardContent className="p-4 text-center">
//       <div className="flex flex-col items-center justify-center space-y-2">
//         <Icon className="h-6 w-6 text-muted-foreground" />
//         <p className="text-muted-foreground text-xs">{message}</p>
//         {actionText && onAction && (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={onAction}
//             className="mt-1"
//           >
//             {actionText}
//           </Button>
//         )}
//       </div>
//     </CardContent>
//   </Card>
// );

// // Loading Skeletons for different sections
// const RevenueLoadingSkeleton = () => (
//   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//     {[...Array(4)].map((_, i) => (
//       <Card key={i} className="h-full border rounded-lg">
//         <CardHeader className="p-2 sm:p-3 pb-0">
//           <Skeleton className="h-4 w-[100px]" />
//         </CardHeader>
//         <CardContent className="p-2 sm:p-3 pt-0">
//           <Skeleton className="h-5 w-12" />
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );

// const StockLoadingSkeleton = () => (
//   <div className="space-y-3">
//     {[...Array(3)].map((_, i) => (
//       <Card key={i} className="border rounded-lg">
//         <CardContent className="p-3">
//           <div className="flex items-center gap-3">
//             <Skeleton className="w-10 h-10 rounded-full" />
//             <div className="flex-1 space-y-2">
//               <Skeleton className="h-4 w-[120px]" />
//               <Skeleton className="h-3 w-[80px]" />
//               <Skeleton className="h-1 w-full" />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );

// const OrderLoadingSkeleton = () => (
//   <div className="space-y-3">
//     {[...Array(2)].map((_, i) => (
//       <Card key={i} className="border rounded-lg">
//         <CardContent className="p-3">
//           <div className="space-y-2">
//             <Skeleton className="h-4 w-[100px]" />
//             <div className="flex items-center gap-2">
//               <Skeleton className="h-6 w-6 rounded-full" />
//               <div className="space-y-1 flex-1">
//                 <Skeleton className="h-3 w-full" />
//                 <Skeleton className="h-3 w-2/3" />
//               </div>
//             </div>
//             <div className="space-y-1">
//               <Skeleton className="h-3 w-full" />
//               <Skeleton className="h-3 w-3/4" />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );

// const ProductLoadingSkeleton = () => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//     {[...Array(2)].map((_, i) => (
//       <Card key={i}>
//         <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
//           <Skeleton className="h-5 w-[150px]" />
//         </CardHeader>
//         <CardContent className="p-3 sm:p-4 pt-0">
//           <div className="space-y-3 sm:space-y-4">
//             {[...Array(3)].map((_, j) => (
//               <div key={j} className="flex items-center gap-2 sm:gap-3">
//                 <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
//                 <div className="flex-1 min-w-0 space-y-2">
//                   <Skeleton className="h-4 w-full" />
//                   <Skeleton className="h-3 w-3/4" />
//                   <Skeleton className="h-1 w-full" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );

// const SocialLoadingSkeleton = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//     {[...Array(4)].map((_, i) => (
//       <Card key={i}>
//         <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
//           <Skeleton className="h-5 w-[120px]" />
//         </CardHeader>
//         <CardContent className="p-3 sm:p-4 pt-0">
//           <Skeleton className="h-6 w-[50px] mb-2" />
//           <Skeleton className="h-3 w-full mb-3" />
//           <div className="space-y-2">
//             <Skeleton className="h-3 w-full" />
//             <Skeleton className="h-1 w-full" />
//             <Skeleton className="h-3 w-full" />
//             <Skeleton className="h-1 w-full" />
//           </div>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );

// const EducationalTipSkeleton = () => (
//   <Card className="bg-primary/10 border-primary/20">
//     <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
//       <Skeleton className="rounded-full h-8 w-8 flex-shrink-0" />
//       <div className="flex-1 min-w-0 space-y-2">
//         <Skeleton className="h-3 w-[120px]" />
//         <Skeleton className="h-2 w-full" />
//         <Skeleton className="h-2 w-3/4" />
//       </div>
//       <Skeleton className="h-7 w-[80px]" />
//     </CardContent>
//   </Card>
// );

// const WelcomeSkeleton = () => (
//   <div className="flex-1 min-w-0">
//     <Skeleton className="h-4 w-[180px] mb-1" />
//     <Skeleton className="h-3 w-[200px]" />
//   </div>
// );

// export default function PlugDashboard() {
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const {
//     userData: { user },
//   } = useUser();
//   const {
//     data,
//     error: errorData,
//     isLoading,
//     mutate,
//   } = useSWR("/api/plug/products/");

//   const [socialLoading, setSocialLoading] = useState(true);
//   const [socialError, setSocialError] = useState(false);

//   const [orders, setOrders] = useState<any[]>([]);
//   const [socialAnalytics, setSocialAnalytics] = useState<any[]>([]);
//   const products = Array.isArray(data?.data) ? data?.data : [];

//   const { topProducts, bottomProducts } = getTopAndBottomSales(products);

//   const stockAlerts = useMemo(() => {
//     if (!products.length) return [];

//     const outOfStockItems = products
//       .filter((item: any) => getTotalStocks(item) === 0)
//       .map((item: any) => ({
//         id: item.id,
//         product: item.name,
//         status: "Out of Stock",
//         units: "0 units left",
//         salesRate: "Urgent attention needed",
//         progress: 0,
//       }));

//     const lowStockItems = products
//       .filter(
//         (item: any) =>
//           getTotalStocks(item) !== undefined && getTotalStocks(item) > 0 && getTotalStocks(item) <= 5
//       )
//       .map((item: any) => ({
//         id: item.id,
//         product: item.name,
//         status: "Low Stock",
//         units: `Only ${formatQuantity(getTotalStocks(item))} units left`,
//         salesRate: "Restock recommended",
       
//       }));

//     return [...outOfStockItems, ...lowStockItems].slice(0, 3);
//   }, [products]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         setOrders([
//           {
//             id: "PLG-4582",
//             status: "active",
//             received: "3600",
//             customer: "Chioma Nwosu",
//             location: "Lagos, Nigeria",
//             items: [
//               { name: "Shea Butter (250g) x 10", price: "₦25,000" },
//               { name: "African Black Soap x 5", price: "₦7,500" },
//             ],
//             total: "₦32,500",
//           },
//           {
//             id: "PLG-4581",
//             status: "active",
//             received: "7200",
//             customer: "Kwame Osei",
//             location: "Accra, Ghana",
//             items: [{ name: "Ankara Dress x 1", price: "₦12,500" }],
//             total: "₦12,500",
//           },
//           {
//             id: "PLG-4583",
//             status: "processing",
//             received: "10800",
//             customer: "Amina Bello",
//             location: "Abuja, Nigeria",
//             items: [
//               { name: "Beaded Necklace x 2", price: "₦10,000" },
//               { name: "Leather Sandals x 1", price: "₦8,200" },
//             ],
//             total: "₦18,200",
//           },
//           {
//             id: "PLG-4584",
//             status: "delivered",
//             received: "14400",
//             customer: "John Doe",
//             location: "Nairobi, Kenya",
//             items: [{ name: "Kente Cloth x 3", price: "₦45,000" }],
//             total: "₦45,000",
//           },
//         ]);

//         setError(false);
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Simulate loading social analytics
//     const loadSocialAnalytics = async () => {
//       try {
//         setSocialLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 1200));

//         setSocialAnalytics([
//           {
//             platform: "Instagram",
//             percentage: "65%",
//             description: "Of your sales come from Instagram",
//             color: "text-pink-600",
//             imageSrc: "/instagram_logo.png",
//             stats: [
//               { label: "Link clicks", value: "245", progress: 65 },
//               { label: "Conversions", value: "32 (13%)", progress: 13 },
//             ],
//           },
//           {
//             platform: "Twitter",
//             percentage: "25%",
//             description: "Of your sales come from Twitter",
//             color: "text-blue-500",
//             imageSrc: "/twitter.png",
//             stats: [
//               { label: "Link clicks", value: "120", progress: 35 },
//               { label: "Conversions", value: "18 (15%)", progress: 15 },
//             ],
//           },
//           {
//             platform: "Facebook",
//             percentage: "10%",
//             description: "Of your sales come from Facebook",
//             color: "text-red-600",
//             imageSrc: "/facebook.png",
//             stats: [
//               { label: "Link clicks", value: "85", progress: 25 },
//               { label: "Conversions", value: "8 (9%)", progress: 9 },
//             ],
//           },
//           {
//             platform: "Whatsapp",
//             percentage: "15%",
//             description: "Of your sales come from your Whatsapp",
//             color: "text-purple-600",
//             imageSrc: "/whatsapp.png",
//             stats: [
//               { label: "Visits", value: "320", progress: 45 },
//               { label: "Conversions", value: "48 (15%)", progress: 15 },
//             ],
//           },
//         ]);

//         setSocialError(false);
//       } catch (err) {
//         setSocialError(true);
//       } finally {
//         setSocialLoading(false);
//       }
//     };

//     fetchData();
//     loadSocialAnalytics();
//   }, []);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => setRefreshing(false), 1500);
//   };

//   const activeOrders = orders.filter((order) => order.status === "active");

//   return (
//     <TooltipProvider>
//       <div className="flex flex-col min-h-screen bg-background p-3 sm:p-4 gap-3 sm:gap-4">
//         {/* Header */}

//         {isLoading && !user?.plug.businessName ? (
//           <WelcomeSkeleton />
//         ) : (
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex-1 min-w-0">
//               <h1 className="text-muted-foreground font-semibold text-sm truncate capitalize">
//                 Welcome back, {user?.plug.businessName}!
//               </h1>
//               <h1 className="text-muted-foreground text-xs sm:text-sm">
//                 Here's your business at a glance.
//               </h1>
//             </div>
//           </div>
//         )}

//         {/* Revenue Snapshot */}
//         <section className="space-y-3 sm:space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
//             <h2 className="text-sm sm:text-base font-semibold">
//               Revenue Snapshot
//             </h2>
//             <Button variant="outline" size="sm" asChild className="text-xs">
//               <Link href="/dashboard/finance">View Finances</Link>
//             </Button>
//           </div>

//           {isLoading ? (
//             <RevenueLoadingSkeleton />
//           ) : errorData ? (
//             <ErrorState onRetry={() => mutate()} />
//           ) : (
//             <div className="grid grid-cols-2 gap-2 sm:gap-3">
//               <Card className="h-full border rounded-lg">
//                 <CardHeader className="p-2 sm:p-3 pb-0">
//                   <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
//                     Total Earnings
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <HelpCircle className="h-3 w-3 text-muted-foreground" />
//                       </TooltipTrigger>
//                       <TooltipContent className="text-xs">
//                         <p>Total amount earned from sales</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-2 sm:p-3 pt-0">
//                   <div className="text-base sm:text-lg font-bold">₦45,500</div>
//                 </CardContent>
//               </Card>

//               <Card className="h-full border rounded-lg">
//                 <CardHeader className="p-2 sm:p-3 pb-0">
//                   <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
//                     Profit Margin
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <HelpCircle className="h-3 w-3 text-muted-foreground" />
//                       </TooltipTrigger>
//                       <TooltipContent className="text-xs">
//                         <p>Your earnings after platform fees</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-2 sm:p-3 pt-0">
//                   <div className="text-base sm:text-lg font-bold text-green-500">
//                     ₦18,080
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="h-full border rounded-lg">
//                 <CardHeader className="p-2 sm:p-3 pb-0">
//                   <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
//                     Pending Payments
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <HelpCircle className="h-3 w-3 text-muted-foreground" />
//                       </TooltipTrigger>
//                       <TooltipContent className="text-xs">
//                         <p>Money in escrow to be released</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-2 sm:p-3 pt-0">
//                   <div className="text-base sm:text-lg font-bold">₦12,500</div>
                 
//                 </CardContent>
//               </Card>

//               <Card className="h-full border rounded-lg">
//                 <CardHeader className="p-2 sm:p-3 pb-0">
//                   <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
//                     Available Balance
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <HelpCircle className="h-3 w-3 text-muted-foreground" />
//                       </TooltipTrigger>
//                       <TooltipContent className="text-xs">
//                         <p>Money ready for withdrawal</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-2 sm:p-3 pt-0">
//                   <div className="text-base sm:text-lg font-bold">₦5,580</div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="w-full mt-1 h-6 text-xs"
//                   >
//                     <Wallet className="h-2.5 w-2.5 mr-1" /> Withdraw
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </section>

//         {/* Stock Alerts Section */}
//         <section className="space-y-3 sm:space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
//             <h2 className="text-sm sm:text-base font-semibold">Stock Alerts</h2>
//           </div>

//           {isLoading ? (
//             <StockLoadingSkeleton />
//           ) : errorData ? (
//             <ErrorState onRetry={() => mutate()} />
//           ) : stockAlerts.length === 0 ? (
//             <EmptyState
//               message="No stock alerts at this time"
//               icon={AlertCircle}
//             />
//           ) : (
//             <Card className="border rounded-lg">
//               <CardHeader className="p-3 sm:p-4 pb-1">
//                 <CardTitle className="text-xs sm:text-sm font-medium">
//                   Stock Alerts
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-3 sm:p-4 pt-0">
//                 <div className="space-y-3 max-h-[300px] overflow-y-auto">
//                   {stockAlerts.map((alert) => (
//                     <div
//                       key={alert.id}
//                       className="flex items-center gap-2 sm:gap-3"
//                     >
//                       <div
//                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                           alert.status === "Out of Stock"
//                             ? "bg-red-100"
//                             : "bg-amber-100"
//                         }`}
//                       >
//                         <AlertCircle
//                           className={`h-4 w-4 sm:h-5 sm:w-5 ${
//                             alert.status === "Out of Stock"
//                               ? "text-red-600"
//                               : "text-amber-600"
//                           }`}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center gap-1">
//                           <p className="text-xs sm:text-sm font-medium truncate capitalize">
//                             {truncateText(alert.product, 20)}
//                           </p>
//                           <Badge
//                             variant="outline"
//                             className={`text-[10px] sm:text-xs ${
//                               alert.status === "Out of Stock"
//                                 ? "text-red-600 border-red-200 bg-red-50"
//                                 : "text-amber-600 border-amber-200 bg-amber-50"
//                             }`}
//                           >
//                             {alert.status}
//                           </Badge>
//                         </div>
//                         <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
//                           <p>{alert.units}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </section>

//         {/* Order Management Section */}
//         <section className="space-y-3 sm:space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
//             <h2 className="text-sm sm:text-base font-semibold">
//               Order Management
//             </h2>
//             <Button variant="outline" size="sm" asChild className="text-xs">
//               <Link href="/dashboard/product">View All Orders</Link>
//             </Button>
//           </div>

//           {loading ? (
//             <OrderLoadingSkeleton />
//           ) : error ? (
//             <ErrorState onRetry={handleRefresh} />
//           ) : activeOrders.length === 0 ? (
//             <EmptyState
//               message="No active orders found"
//               icon={PackageCheck}
//             />
//           ) : (
//             <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
//               {activeOrders.map((order) => (
//                 <Card key={order.id} className="border rounded-lg">
//                   <CardHeader className="p-3 sm:p-4 pb-1">
//                     <div className="flex justify-between items-start gap-2">
//                       <div className="min-w-0">
//                         <CardTitle className="text-xs sm:text-sm font-medium truncate">
//                           {order.id}
//                         </CardTitle>
//                         <CardDescription className="text-[10px] sm:text-xs">
//                           {formatTimeAgo(order.received)}
//                         </CardDescription>
//                       </div>
//                       <Badge className="text-[10px] sm:text-xs capitalize">
//                         {order.status}
//                       </Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="p-3 sm:p-4 pt-0 pb-1">
//                     <div className="space-y-1 sm:space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Users className="h-4 w-4 text-muted-foreground" />
//                         <span className="text-xs sm:text-sm">
//                           {order.customer} • {order.location}
//                         </span>
//                       </div>
//                       {order.items.map((item: any, i: number) => (
//                         <div
//                           key={i}
//                           className="flex justify-between text-xs sm:text-sm"
//                         >
//                           <span className="truncate max-w-[120px] sm:max-w-[180px]">
//                             {item.name}
//                           </span>
//                           <span className="whitespace-nowrap">
//                             {formatPrice(item.price)}
//                           </span>
//                         </div>
//                       ))}
//                       <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2 border-t">
//                         <span>Total</span>
//                         <span>{formatPrice(order.total)}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="p-3 sm:p-4 pt-1 flex gap-1 sm:gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 h-7 sm:h-8 text-xs"
//                     >
//                       <Share2 className="h-3 w-3 mr-1" />
//                       Share Tracking
//                     </Button>
//                     <Button size="sm" className="flex-1 h-7 sm:h-8 text-xs">
//                       <Truck className="h-3 w-3 mr-1" />
//                       Track Order
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Product Performance */}
//         <section className="space-y-3 sm:space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//             <h2 className="text-sm sm:text-base font-semibold">
//               Product Performance
//             </h2>
//             <Button variant="outline" size="sm" asChild className="text-xs">
//               <Link href="/dashboard/product">View All Products</Link>
//             </Button>
//           </div>

//           {isLoading ? (
//             <ProductLoadingSkeleton />
//           ) : errorData ? (
//             <ErrorState
//               onRetry={() => {
//                 mutate()
//               }}
//             />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//               {/* Top Selling Products with Scroll Area */}
//               <Card>
//                 <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
//                   <CardTitle className="text-sm sm:text-base font-medium">
//                     Top Perfoming Products
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-3 sm:p-4 pt-0">
//                   <ScrollArea className="max-h-[250px]">
//                     <div className="space-y-3 sm:space-y-4 pr-3">
//                       {topProducts.length === 0 ? (
//                         <EmptyState
//                           message="No top performing products"
//                           icon={ShoppingBag}
//                         />
//                       ) : (
//                         topProducts.map((product) => (
//                           <div
//                             key={product.id}
//                             className="flex items-center gap-2 sm:gap-3"
//                           >
//                             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
//                               <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex justify-between gap-1">
//                                 <p className="text-xs sm:text-sm font-medium capitalize">
//                                   {truncateText(product.name, 30)}
//                                 </p>
//                                 <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
//                                   {formatPrice(product.price)}
//                                 </p>
//                               </div>
//                               <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
//                                 <p>{product.sales || 0} units sold</p>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </ScrollArea>
//                 </CardContent>
//               </Card>

//               {/* Recommended Products with Scroll Area */}
//               <Card>
//                 <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
//                   <CardTitle className="text-sm sm:text-base font-medium">
//                     Low Performing Products
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-3 sm:p-4 pt-0">
//                   <ScrollArea className="max-h-[250px]">
//                     <div className="space-y-3 sm:space-y-4 pr-3">
//                       {bottomProducts.length === 0 ? (
//                         <EmptyState
//                           message="No low performing products"
//                           icon={ShoppingBag}
//                         />
//                       ) : (
//                         bottomProducts.map((product) => (
//                           <div
//                             key={product.id}
//                             className="flex items-center gap-2 sm:gap-3"
//                           >
//                             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
//                               <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex justify-between gap-1">
//                                 <p className="text-xs sm:text-sm font-medium capitalize">
//                                   {truncateText(product.name, 30)}
//                                 </p>
//                                 <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
//                                   {formatPrice(product.price)}
//                                 </p>
//                               </div>
//                               <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
//                                 <p>{formatQuantity(product.sales) || 0} units sold</p>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </ScrollArea>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </section>

//         {/* Social Analytics */}
//         <section className="space-y-3 sm:space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//             <h2 className="text-sm sm:text-base font-semibold">
//               Social Analytics
//             </h2>
//             <Button variant="outline" size="sm" asChild className="text-xs">
//               <Link href="#">Detailed Reports</Link>
//             </Button>
//           </div>

//           {socialLoading ? (
//             <SocialLoadingSkeleton />
//           ) : socialError ? (
//             <ErrorState
//               onRetry={() => {
//                 setSocialError(false);
//                 setSocialLoading(true);
//                 setTimeout(() => setSocialLoading(false), 1000);
//               }}
//             />
//           ) : socialAnalytics.length === 0 ? (
//             <EmptyState
//               message="No social analytics data"
//               icon={Users}
//               className="col-span-full"
//             />
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//             {socialAnalytics.map((platform) => {
//               return (
//                 <Card key={platform.platform}>
//                   <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-sm sm:text-base font-medium">
//                         Platform Traffic
//                       </CardTitle>
//                       <Image 
//                         src={platform.imageSrc}
//                         alt={`${platform.platform} logo`}
//                         width={16}
//                         height={16}
//                         className="object-contain"
//                       />
//                     </div>
//                   </CardHeader>
//                   <CardContent className="p-3 sm:p-4 pt-0">
//                     <div className="2xl font-bold">{platform.percentage}</div>
//                     <p className="text-[10px] xs:text-xs text-muted-foreground">
//                       {platform.description}
//                     </p>
//                     <div className="mt-3 space-y-2">
//                       {platform.stats.map((stat: any, i: number) => (
//                         <div key={i}>
//                           <div className="flex justify-between text-[10px] xs:text-xs">
//                             <span>{stat.label}</span>
//                             <span className="font-medium">{stat.value}</span>
//                           </div>
//                           <Progress value={stat.progress} className="h-1" />
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//           )}
//         </section>
//         {/* Educational Tip */}
//         {isLoading ? (
//           <EducationalTipSkeleton />
//         ) : (
//           <Card className="bg-primary/10 border-primary/20">
//             <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
//               <div className="rounded-full bg-primary/20 p-1.5 flex-shrink-0">
//                 <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-medium text-xs sm:text-sm">Business Tip</h3>
//                 <p className="text-[10px] sm:text-xs text-muted-foreground">
//                   Sharing your products during peak hours (7-9 PM) can increase
//                   your visibility by up to 40%.
//                 </p>
//               </div>
             
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </TooltipProvider>
//   );
// }



"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
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

function getTopAndBottomSales(productsArray: any, count = 5) {
  // Create a copy of the array to avoid modifying the original
  const productsCopy = [...productsArray];

  // Filter out products with zero sales and sort by sales in descending order
  const productsWithSales = productsCopy
    .filter((product) => product.sales > 0)
    .sort((a, b) => b.sales - a.sales);

  // Get top products (limited to count)
  const topProducts = productsWithSales.slice(0, count);

  // Find the minimum sales value from top products
  const minTopSales =
    topProducts.length > 0
      ? topProducts[topProducts.length - 1].sales
      : Number.POSITIVE_INFINITY;

  // Get bottom products: those with sales > 0 but less than the minimum top sales
  const bottomCandidates = productsCopy
    .filter((product) => product.sales > 0 && product.sales < minTopSales)
    .sort((a, b) => a.sales - b.sales);

  // Take only up to 'count' bottom products
  const bottomProducts = bottomCandidates.slice(0, count);

  return {
    topProducts,
    bottomProducts,
  };
}

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
  const [refreshing, setRefreshing] = useState(false);
  const [socialLoading, setSocialLoading] = useState(true);
  const [socialError, setSocialError] = useState(false);
  const [socialAnalytics, setSocialAnalytics] = useState<any[]>([]);

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

  const { topProducts, bottomProducts } = getTopAndBottomSales(products);

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
        return total + order.productAmount * item.quantity;
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
                  ₦{(order.productAmount * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t">
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

  useEffect(() => {
    // Simulate loading social analytics
    const loadSocialAnalytics = async () => {
      try {
        setSocialLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setSocialAnalytics([
          {
            platform: "Instagram",
            percentage: "65%",
            description: "Of your sales come from Instagram",
            color: "text-pink-600",
            imageSrc: "/instagram_logo.png",
            stats: [
              { label: "Link clicks", value: "245", progress: 65 },
              { label: "Conversions", value: "32 (13%)", progress: 13 },
            ],
          },
          {
            platform: "Twitter",
            percentage: "25%",
            description: "Of your sales come from Twitter",
            color: "text-blue-500",
            imageSrc: "/twitter.png",
            stats: [
              { label: "Link clicks", value: "120", progress: 35 },
              { label: "Conversions", value: "18 (15%)", progress: 15 },
            ],
          },
          {
            platform: "Facebook",
            percentage: "10%",
            description: "Of your sales come from Facebook",
            color: "text-red-600",
            imageSrc: "/facebook.png",
            stats: [
              { label: "Link clicks", value: "85", progress: 25 },
              { label: "Conversions", value: "8 (9%)", progress: 9 },
            ],
          },
          {
            platform: "Whatsapp",
            percentage: "15%",
            description: "Of your sales come from your Whatsapp",
            color: "text-purple-600",
            imageSrc: "/whatsapp.png",
            stats: [
              { label: "Visits", value: "320", progress: 45 },
              { label: "Conversions", value: "48 (15%)", progress: 15 },
            ],
          },
        ]);

        setSocialError(false);
      } catch (err) {
        setSocialError(true);
      } finally {
        setSocialLoading(false);
      }
    };

    loadSocialAnalytics();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

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
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/dashboard/finance">View Finances</Link>
            </Button>
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
            <h2 className="text-sm sm:text-base font-semibold">
              Product Performance
            </h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Top Selling Products with Scroll Area */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium">
                    Top Perfoming Products
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {topProducts.length === 0 ? (
                        <EmptyState
                          message="No top performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        topProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
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
                                <p>{product.sales || 0} units sold</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Recommended Products with Scroll Area */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium">
                    Low Performing Products
                  </CardTitle>
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
                        bottomProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
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
                                  {formatQuantity(product.sales) || 0} units
                                  sold
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

        {/* Social Analytics */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-sm sm:text-base font-semibold">
              Social Analytics
            </h2>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="#">Detailed Reports</Link>
            </Button>
          </div>

          {socialLoading ? (
            <SocialLoadingSkeleton />
          ) : socialError ? (
            <ErrorState
              onRetry={() => {
                setSocialError(false);
                setSocialLoading(true);
                setTimeout(() => setSocialLoading(false), 1000);
              }}
            />
          ) : socialAnalytics.length === 0 ? (
            <EmptyState
              message="No social analytics data"
              icon={Users}
              className="col-span-full"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {socialAnalytics.map((platform) => {
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
                      <div className="2xl font-bold">{platform.percentage}</div>
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
