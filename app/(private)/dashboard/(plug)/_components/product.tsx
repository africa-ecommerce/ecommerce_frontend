



"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MoreHorizontal,
  Search,
  Trash2,
  X,
  Package,
  FilterX,
  Users,
  Truck,
  Settings,
  Pencil,
  PackageCheck,
  Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import useSWR from "swr"
import Image from "next/image"
import { useDeleteResource } from "@/hooks/resourceManagement/useDeleteResources"
import { PRODUCT_CATEGORIES } from "@/app/constant"
import { errorToast, successToast } from "@/components/ui/use-toast-advanced"
import EmptyState from "@/app/_components/empty-state"
import DeleteDialog from "../../(supplier)/_components/delete-dialog"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getTotalStocks, truncateText } from "@/lib/utils"
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider"
import { EditPriceModal } from "./edit-price-modal"
import { ShareModal } from "./share-modal"
import { useUser } from "@/app/_components/provider/UserContext"
import { WriteReviewModal } from "./write-review-modal"

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
)

const LoadingOrdersSkeleton = () => (
  <div className="space-y-3 sm:space-y-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 space-y-1">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
            <Skeleton className="h-5 w-[60px]" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2 space-y-2">
          <Skeleton className="h-3 w-[100px]" />
          <Skeleton className="h-1 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-2 w-[40px]" />
            <Skeleton className="h-2 w-[40px]" />
            <Skeleton className="h-2 w-[40px]" />
          </div>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 pt-1 flex gap-2">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
        </CardFooter>
      </Card>
    ))}
  </div>
)

const LoadingSkeleton = () => (
  <Card>
    <CardContent className="p-0">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-2 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-md" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </td>
                <td className="p-2 sm:p-3">
                  <Skeleton className="h-4 w-[60px]" />
                </td>
                <td className="p-2 sm:p-3">
                  <Skeleton className="h-4 w-[40px]" />
                </td>
                <td className="p-2 sm:p-3">
                  <Skeleton className="h-6 w-[70px]" />
                </td>
                <td className="p-2 sm:p-3">
                  <Skeleton className="h-4 w-[40px]" />
                </td>
                <td className="p-2 sm:p-3">
                  <Skeleton className="h-4 w-[40px]" />
                </td>
                <td className="p-2 sm:p-3">
                  <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
)

// Add this component near your other components
const OrderCard = ({ order }: { order: Order }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "shipped":
        return <Badge variant="secondary">Shipped</Badge>
      case "delivered":
        return <Badge variant="outline">Delivered</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="mb-3 sm:mb-4 last:mb-0">
      <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">Order #{order.orderNumber}</CardTitle>
            <CardDescription className="text-xs">Placed {order.date}</CardDescription>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0 pb-1 sm:pb-2">
        <div className="flex items-center gap-1 sm:gap-2 text-xs">
          <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <span>
            {order.items} item{order.items !== 1 ? "s" : ""} • ₦{order.amount.toLocaleString()}
          </span>
        </div>
        {order.status !== "cancelled" && (
          <>
            <Progress value={order.progress} className="h-1 mt-2 sm:mt-3" />
            <div className="flex justify-between text-[10px] xs:text-xs mt-1">
              <span>Pending</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-1 flex gap-1 sm:gap-2">
        <Button variant="outline" size="sm" className="flex-1 h-7 sm:h-8 text-xs">
          <Share2 className="h-3 w-3 mr-1" />
          Share Tracking
        </Button>
        <Button size="sm" className="flex-1 h-7 sm:h-8 text-xs">
          <Truck className="h-3 w-3 mr-1" />
          Track Order
        </Button>
      </CardFooter>
    </Card>
  )
}

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={<AlertCircle className="h-12 w-12 text-destructive" />}
    title="Something went wrong"
    description="There was an error loading the products. Please try again later."
    actionText="Try Again"
    onAction={onRetry}
  />
)

const EmptyFilterState = ({
  onResetFilters,
}: {
  onResetFilters?: () => void
}) => (
  <EmptyState
    icon={<FilterX className="h-12 w-12 text-muted-foreground" />}
    title="No products found matching your criteria"
    description="Try adjusting your search or filter parameters to find what you're looking for."
    actionText="Reset Filters"
    onAction={onResetFilters}
  />
)

const EmptyProductsState = () => (
  <EmptyState
    icon={<Package className="h-12 w-12 text-muted-foreground" />}
    title="No products yet"
    description="You have not plugged into any product yet."
    showBorder={false}
  />
)

const EmptyOrdersState = ({ status }: { status: string }) => {
  const statusConfig = {
    active: {
      icon: <Package className="h-12 w-12 text-muted-foreground" />,
      title: "No Active Orders",
      description: "You don't have any active orders at the moment.",
    },
    pending: {
      icon: <PackageCheck className="h-12 w-12 text-muted-foreground" />,
      title: "No Pending Orders",
      description: "All your orders are either active or completed.",
    },
    delivered: {
      icon: <Truck className="h-12 w-12 text-muted-foreground" />,
      title: "No Delivered Orders",
      description: "Your delivered orders will appear here.",
    },
    cancelled: {
      icon: <X className="h-12 w-12 text-muted-foreground" />,
      title: "No Cancelled Orders",
      description: "You haven't cancelled any orders yet.",
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active

  return <EmptyState icon={config.icon} title={config.title} description={config.description} showBorder={false} />
}

const ErrorOrdersState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={<AlertCircle className="h-12 w-12 text-destructive" />}
    title="Failed to load orders"
    description="There was an error loading your orders. Please try again."
    actionText="Try Again"
    onAction={onRetry}
  />
)
// Scrollable container with max height
const scrollableClasses = "max-h-[calc(100vh-400px)] overflow-y-auto pr-2"

// Categorize orders and get counts

// Add this interface near your other types
interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "shipped" | "delivered" | "cancelled"
  items: number
  amount: number
  progress: number
  progressStage: "Pending" | "Shipped" | "Delivered"
}

export default function Products() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // Add state for delete confirmation
  const [productToDelete, setProductToDelete] = useState<string>("");
  const [activeOrderTab, setActiveOrderTab] = useState("active"); // Add this state
  const { userData } = useUser();
  const { user } = userData || { user: null };

  console.log("user", user);

  const { setIsMutate } = useShoppingCart();

  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState("");
  const [currentItemData, setCurrentItemData] = useState(null);

  // Add these state variables inside the Products component, near the other state variables
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [productToShare, setProductToShare] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [productToReview, setProductToReview] = useState<{
    originalId: string;
    name: string;
  } | null>(null);

  const { data, error, isLoading, mutate } = useSWR("/api/plug/products/");
  const products = Array.isArray(data?.data) ? data?.data : [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const deleteProductFn = async (productId: string) => {
    const response = await fetch(`/api/plug/products/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();

    if (!response.ok) {
      errorToast(result.error);
      return null;
    }
    setIsMutate(true);
    successToast(result.message);
    return result;
  };
  // const { data: ordersData, error: ordersError, isLoading: ordersLoading, mutate: ordersMutate } = useSWR("/api/orders/plug")

  // // Process orders data
  // const orders = Array.isArray(ordersData?.data) ? ordersData?.data : []

  // const orderCounts = useMemo(() => {
  //   return {
  //     active: orders.filter((order: Order) => order.status === "pending").length,
  //     shipped: orders.filter((order: Order) => order.status === "shipped").length,
  //     delivered: orders.filter((order: Order) => order.status === "delivered").length,
  //     cancelled: orders.filter((order: Order) => order.status === "cancelled").length,
  //   }
  // }, [orders])

  const getOrdersUrl = (status: string) => {
    if (status === "active") status = "pending"; // Map active to pending for API
    return `/api/orders/plug?orderStatus=${status}`;
  };

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
    mutate: ordersMutate,
  } = useSWR(getOrdersUrl(activeOrderTab), {
    refreshInterval: 30000, // Poll every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000, // Prevent duplicate requests within 10 seconds
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  console.log("ordersData", ordersData)

  // Also fetch all orders for counts (with less frequent polling)
  const { data: allOrdersData } = useSWR(
    "/api/orders/plug", // Without status param to get all orders
    {
      refreshInterval: 60000, // Poll every minute for counts
      revalidateOnFocus: false, // Don't refetch on focus for counts
      dedupingInterval: 30000,
    }
  );

  // Process orders data
  const orders = Array.isArray(ordersData?.data) ? ordersData?.data : [];
  const allOrders = Array.isArray(allOrdersData?.data)
    ? allOrdersData?.data
    : [];

  const orderCounts = useMemo(() => {
    return {
      active: allOrders.filter((order: Order) => order.status === "pending")
        .length,
      shipped: allOrders.filter((order: Order) => order.status === "shipped")
        .length,
      delivered: allOrders.filter(
        (order: Order) => order.status === "delivered"
      ).length,
      cancelled: allOrders.filter(
        (order: Order) => order.status === "cancelled"
      ).length,
    };
  }, [allOrders]);

  const { deleteResource } = useDeleteResource(
    "/api/plug/products/",
    async () => {
      const res = await fetch("/api/plug/products/", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    deleteProductFn
  );

  // Fetch data

  console.log("products", products);

  // Filter items based on selected category, filter, and search query
  const filteredItems = products?.filter((item: any) => {
    const totalStock = getTotalStocks(item);
    const hasStock = totalStock !== undefined && totalStock !== null;

    // Category filter
    if (selectedCategory !== "all" && item.category !== selectedCategory)
      return false;

    // Stock-based filters
    if (selectedFilter === "out-of-stock" && hasStock && totalStock > 0)
      return false;
    if (
      selectedFilter === "low-stock" &&
      (!hasStock || totalStock === 0 || totalStock > 5)
    )
      return false;
    if (
      selectedFilter === "optimal" &&
      (!hasStock || totalStock === 0 || totalStock <= 10)
    )
      return false;

    // Search filter
    if (
      searchQuery &&
      !item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredItems?.length || 0) / itemsPerPage);

  // Helper functions
  const getStockStatus = (item: any) => {
    // If item has variations, calculate total stock across all variations
    if (item.variations && item.variations.length > 0) {
      const totalStock = item.variations.reduce(
        (sum: number, variation: any) => sum + (variation.stocks || 0),
        0
      );

      // Check total stock across all variations
      if (totalStock === 0) return "out-of-stock";
      if (totalStock <= 5) return "low-stock";
      return "optimal";
    }

    // If no variations, use item stock directly
    if (item.stocks === undefined || item.stocks === null) return "unknown";
    if (item.stocks === 0) return "out-of-stock";
    if (item.stocks <= 5) return "low-stock";
    return "optimal";
  };

  const getStockStatusColor = (status: any) => {
    switch (status) {
      case "out-of-stock":
        return "text-destructive";
      case "low-stock":
        return "text-amber-500";
      case "optimal":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStockStatusBadge = (status: any) => {
    switch (status) {
      case "out-of-stock":
        return (
          <Badge
            variant="destructive"
            className="text-xs py-0 px-2 whitespace-nowrap"
          >
            Out of Stock
          </Badge>
        );
      case "low-stock":
        return (
          <Badge
            variant="outline"
            className="text-xs py-0 px-2 text-amber-500 border-amber-200 bg-amber-50 whitespace-nowrap"
          >
            Low Stock
          </Badge>
        );
      case "optimal":
        return (
          <Badge
            variant="outline"
            className="text-xs py-0 px-2 text-green-500 border-green-200 bg-green-50 whitespace-nowrap"
          >
            In Stock
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-xs py-0 px-2 text-muted-foreground border-muted bg-muted/50 whitespace-nowrap"
          >
            Unknown
          </Badge>
        );
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Display value helper
  const displayValue = (value: any) => {
    return value !== undefined && value !== null ? value : "-";
  };

  const stats = useMemo(() => {
    if (!products.length)
      return {
        totalProducts: 0,
        lowStockItems: 0,
        outOfStock: 0,
        totalProfit: 0,
      };

    return {
      totalProducts: products.length,
      lowStockItems: products.filter((item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Get total stock across all variations
          const totalStock = item.variations.reduce(
            (sum: number, variation: any) => sum + (variation.stocks || 0),
            0
          );
          return totalStock > 0 && totalStock <= 5;
        }
        // If no variations, use item stock directly
        return item.stocks !== undefined && item.stocks > 0 && item.stocks <= 5;
      }).length,
      outOfStock: products.filter((item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Check if all variations have zero stock
          const totalStock = item.variations.reduce(
            (sum: number, variation: any) => sum + (variation.stocks || 0),
            0
          );
          return totalStock === 0;
        }
        // If no variations, check item stock directly
        return item.stocks === 0;
      }).length,
      totalProfit: products.reduce((total: any, item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Calculate profit across all variations
          const variationProfit = item.variations.reduce(
            (sum: number, variation: any) =>
              sum +
              ((item.price || 0) - (item.originalPrice || 0)) *
                (variation.stocks || 0),
            0
          );
          return total + variationProfit;
        }
        // If no variations, calculate profit using item stock directly
        return (
          total +
          ((item.price || 0) - (item.originalPrice || 0)) * (item.stocks || 0)
        );
      }, 0),
    };
  }, [products]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-1.5 sm:p-4 md:p-6 gap-2 sm:gap-4 pb-16 sm:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold">
              Products
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              View products that you have plugged into
            </p>
          </div>
        </div>

        {/* Products Stats */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-semibold">
            Products Command Center
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Total Products Card */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-1 text-sm">
                  Total Products
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total products plugged into</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <div className="text-lg font-bold">{stats.totalProducts}</div>
                )}
              </CardContent>
            </Card>

            {/* Low Stock Card */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-1 text-sm">
                  Low Stock Items
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products low on stock</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-lg font-bold text-amber-500">
                      {stats.lowStockItems}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Out of Stock Card */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-1 text-sm">
                  Out of Stock
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Unavailable products</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-lg font-bold text-destructive">
                      {stats.outOfStock}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Total Profit Card */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-1 text-sm">
                  Total Profit
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total profit from plugged products</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <div className="text-lg font-bold">{`₦${stats.totalProfit.toLocaleString()}`}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {isLoading ? (
          <TipSkeleton />
        ) : (
          <Card className="bg-amber-100 border-amber-200 mb-3 sm:mb-4">
            <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
              <div className="rounded-full bg-amber-200 p-1.5 flex-shrink-0">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm">
                  Important Notice
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Unable to find a product, Note suppliers can sometimes
                  discontinue a product
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Catalog Management */}
        <section className="space-y-2 max-w-[360px]:space-y-1 sm:space-y-3">
          {/* Filters and Search */}
          <div className="flex flex-col gap-2 max-w-[360px]:gap-1.5 sm:gap-3">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 max-w-[360px]:left-2 top-1/2 transform -translate-y-1/2 h-3.5 max-w-[360px]:h-3 w-3.5 max-w-[360px]:w-3 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className={`pl-8 max-w-[360px]:pl-7 pr-8 max-w-[360px]:pr-7 text-xs sm:text-sm h-8 max-w-[360px]:h-7 sm:h-9 md:h-10 transition-all ${
                  isSearchFocused ? "border-primary ring-1 ring-primary" : ""
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 max-w-[360px]:h-5 w-6 max-w-[360px]:w-5"
                >
                  <X className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 max-w-[360px]:gap-1 overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex gap-1.5 max-w-[360px]:gap-1">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedFilter("all");
                    setCurrentPage(1);
                  }}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  All
                </Button>
                <Button
                  variant={
                    selectedFilter === "out-of-stock" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedFilter("out-of-stock");
                    setCurrentPage(1);
                  }}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  Out of Stock
                </Button>
                <Button
                  variant={
                    selectedFilter === "low-stock" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedFilter("low-stock");
                    setCurrentPage(1);
                  }}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  Low Stock
                </Button>
                <Button
                  variant={selectedFilter === "optimal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedFilter("optimal");
                    setCurrentPage(1);
                  }}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  In Stock
                </Button>
              </div>
              <div className="">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[120px] md:w-[150px] text-xs md:text-sm h-8 sm:h-9">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="text-xs md:text-sm"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="">
            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-xs uppercase bg-muted/50">
                      <tr>
                        <th className="p-2 sm:p-3  text-left">Product</th>
                        <th className="p-2 sm:p-3  text-left">Selling Price</th>
                        <th className="p-2 sm:p-3  text-left">Cost Price</th>
                        <th className="p-2 sm:p-3  text-left">Stock</th>
                        <th className="p-2 sm:p-3  w-[70px] text-left">
                          Status
                        </th>
                        <th className="p-2 sm:p-3  text-left">Plugs</th>
                        <th className="p-2 sm:p-3  text-left">Sales</th>
                        <th className="p-2 sm:p-3  w-[70px] text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={8} className="p-0">
                            <LoadingSkeleton />
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={8} className="p-0">
                            <ErrorState onRetry={() => mutate()} />
                          </td>
                        </tr>
                      ) : filteredItems?.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-0">
                            {products.length === 0 ? (
                              <EmptyProductsState />
                            ) : (
                              <EmptyFilterState
                                onResetFilters={() => {
                                  setSelectedCategory("all");
                                  setSelectedFilter("all");
                                  setSearchQuery("");
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      ) : (
                        currentItems.map((item: any) => {
                          const stockStatus = getStockStatus(item);
                          return (
                            <tr
                              key={item.id}
                              className="border-b hover:bg-muted/30"
                            >
                              <td className="p-2 sm:p-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                    <Image
                                      src={item.images[0] || "/placeholder.svg"}
                                      alt={item.name}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <Link
                                    href={`/marketplace/product/${item.originalId}`}
                                  >
                                    <span className="font-medium text-xs sm:text-sm whitespace-nowrap max-w-[250px] capitalize underline text-blue-700">
                                      {truncateText(item.name, 15) || "-"}
                                    </span>
                                  </Link>
                                </div>
                              </td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                                {item.price
                                  ? `₦${item.price.toLocaleString()}`
                                  : "-"}
                              </td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                                {item.originalPrice
                                  ? `₦${item.originalPrice.toLocaleString()}`
                                  : "-"}
                              </td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">
                                <div className="flex items-center gap-1">
                                  <span
                                    className={getStockStatusColor(stockStatus)}
                                  >
                                    {getTotalStocks(item)}
                                  </span>
                                </div>
                              </td>
                              <td className="p-2 sm:p-3">
                                {getStockStatusBadge(stockStatus)}
                              </td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-muted-foreground" />
                                  <span>{displayValue(item.plugsCount)}</span>
                                </div>
                              </td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                                {displayValue(item.sales)}
                              </td>
                              <td className="p-2 sm:p-3">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 sm:h-8 sm:w-8"
                                    >
                                      <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="text-xs sm:text-sm">
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                      className="text-xs sm:text-sm"
                                      onClick={() => {
                                        setProductToEdit(item.id);
                                        setCurrentItemData(item);
                                        setPriceModalOpen(true);
                                      }}
                                    >
                                      <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Manage
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-xs sm:text-sm"
                                      onClick={() => {
                                        setProductToShare({
                                          id: item.id,
                                          name: item.name,
                                        });
                                        setShareModalOpen(true);
                                      }}
                                    >
                                      <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-xs sm:text-sm"
                                      onClick={() => {
                                        setProductToReview({
                                          originalId: item.originalId,
                                          name: item.name,
                                        });
                                        setReviewModalOpen(true);
                                      }}
                                    >
                                      <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Review
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive text-xs sm:text-sm"
                                      onClick={() =>
                                        setProductToDelete(item.id)
                                      }
                                    >
                                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Remove
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-3 sm:p-4 border-t">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Showing{" "}
                  {Math.min(indexOfFirstItem + 1, filteredItems?.length || 0)}-
                  {Math.min(indexOfLastItem, filteredItems?.length || 0)} of{" "}
                  {filteredItems?.length || 0} products
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={prevPage}
                    className="h-7 sm:h-8 text-xs"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={nextPage}
                    className="h-7 sm:h-8 text-xs"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Order Management Hub - Better mobile tabs */}
        <section className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">
              Order Management
            </h2>
          </div>

          <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab}>
            <TabsList className="grid w-full grid-cols-4 h-9 sm:h-10 overflow-x-auto">
              <TabsTrigger
                value="active"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Pending ({orderCounts.active})
              </TabsTrigger>
              <TabsTrigger
                value="shipped"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Shipped ({orderCounts.shipped})
              </TabsTrigger>
              <TabsTrigger
                value="delivered"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Delivered ({orderCounts.delivered})
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Cancelled ({orderCounts.cancelled})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-3 sm:mt-4">
              {ordersLoading ? (
                <LoadingOrdersSkeleton />
              ) : ordersError ? (
                <ErrorOrdersState onRetry={() => ordersMutate()} />
              ) : orderCounts.active === 0 ? (
                <EmptyOrdersState status="active" />
              ) : (
                <div className={scrollableClasses}>
                  {orders
                    .filter((order: Order) => order.status === "pending")
                    .map((order: Order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shipped" className="mt-3 sm:mt-4">
              {ordersLoading ? (
                <LoadingOrdersSkeleton />
              ) : ordersError ? (
                <ErrorOrdersState onRetry={() => ordersMutate()} />
              ) : orderCounts.shipped === 0 ? (
                <EmptyOrdersState status="shipped" />
              ) : (
                <div className={scrollableClasses}>
                  {orders
                    .filter((order: Order) => order.status === "shipped")
                    .map((order: Order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="delivered" className="mt-3 sm:mt-4">
              {ordersLoading ? (
                <LoadingOrdersSkeleton />
              ) : ordersError ? (
                <ErrorOrdersState onRetry={() => ordersMutate()} />
              ) : orderCounts.delivered === 0 ? (
                <EmptyOrdersState status="delivered" />
              ) : (
                <div className={scrollableClasses}>
                  {orders
                    .filter((order: Order) => order.status === "delivered")
                    .map((order: Order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-3 sm:mt-4">
              {ordersLoading ? (
                <LoadingOrdersSkeleton />
              ) : ordersError ? (
                <ErrorOrdersState onRetry={() => ordersMutate()} />
              ) : orderCounts.cancelled === 0 ? (
                <EmptyOrdersState status="cancelled" />
              ) : (
                <div className={scrollableClasses}>
                  {orders
                    .filter((order: Order) => order.status === "cancelled")
                    .map((order: Order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Delete Confirmation Dialog */}
        <DeleteDialog
          productToDelete={productToDelete}
          setProductToDelete={setProductToDelete}
          deleteResource={deleteResource}
        />

        <EditPriceModal
          itemData={currentItemData}
          open={priceModalOpen}
          onOpenChange={setPriceModalOpen}
          itemId={productToEdit}
        />
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          productName={productToShare?.name || ""}
          productId={productToShare?.id || ""}
          plugId={user?.plug.id}
        />
        <WriteReviewModal
          open={reviewModalOpen}
          onOpenChange={setReviewModalOpen}
          productId={productToReview?.originalId || ""}
          productName={productToReview?.name || ""}
          existingReview={
            productToReview?.originalId
              ? products.find(
                  (p: any) => p.originalId === productToReview.originalId
                )?.review
              : null
          }
        />
      </div>
    </TooltipProvider>
  );
}
