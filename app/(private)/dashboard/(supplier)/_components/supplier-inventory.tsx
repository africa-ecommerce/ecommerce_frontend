"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MoreHorizontal,
  Settings,
  Search,
  Tag,
  Trash2,
  X,
  Package,
  FilterX,
  Users,
  Sliders,
  Share2,
  Truck,
  Phone,
  PackageCheck,
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
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useSWR from "swr";
import Image from "next/image";
import { useDeleteResource } from "@/hooks/resourceManagement/useDeleteResources";
import DeleteDialog from "./delete-dialog";
import { PRODUCT_CATEGORIES } from "@/app/constant";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import EmptyState from "@/app/_components/empty-state";
import { useUser } from "@/app/_components/provider/UserContext";
import { formatPrice, getTotalStock, truncateText } from "@/lib/utils";
import { StockPriceModal } from "./update-modal";
import { AddProductModal } from "./add-product-modal";
import { UpdateProductModal } from "./update-product-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { ShareModal } from "../../(plug)/_components/share-modal";
import { SyncStoreModal } from "./sync-store-modal";

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
);

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

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={<AlertCircle className="h-12 w-12 text-destructive" />}
    title="Something went wrong"
    description="There was an error loading the products. Please try again later."
    actionText="Try Again"
    onAction={onRetry}
  />
);


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
    processed: {
      icon: <Truck className="h-12 w-12 text-muted-foreground" />,
      title: "No Processed Orders",
      description: "You don't have any orders processed yet.",
    },
   
    cancelled: {
      icon: <X className="h-12 w-12 text-muted-foreground" />,
      title: "No Cancelled Orders",
      description: "You don't have any cancelled order yet.",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <EmptyState
      icon={config.icon}
      title={config.title}
      description={config.description}
      showBorder={false}
    />
  );
};


const EmptyFilterState = ({
  onResetFilters,
}: {
  onResetFilters?: () => void;
}) => (
  <EmptyState
    icon={<FilterX className="h-12 w-12 text-muted-foreground" />}
    title="No products found matching your criteria"
    description="Try adjusting your search or filter parameters to find what you're looking for."
    actionText="Reset Filters"
    onAction={onResetFilters}
  />
);

const EmptyProductsState = ({
  onAddProduct,
  verified,
}: {
  onAddProduct?: () => void;
  verified: boolean;
}) => (
  <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
    <div className="text-center space-y-4 max-w-md">
      <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center">
        <Package className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">
          No products yet
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          You don't have products in your inventory yet.
        </p>
      </div>
      {onAddProduct && (
        <Button
          onClick={onAddProduct}
          disabled={verified}
          className="bg-primary text-white hover:bg-primary/90 text-sm h-9 sm:h-10 px-6 sm:px-8 mt-6
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
        >
          <Package className="h-4 w-4 mr-2" />
          Add Your First Product
        </Button>
      )}
    </div>
  </div>
);

const deleteProductFn = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    errorToast(result.error);
    return null;
  }
  successToast(result.message);
  return result;
};

export default function Inventory() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [syncStoreModalOpen, setSyncStoreModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // Add state for delete confirmation
  const [productToDelete, setProductToDelete] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [currentItemData, setCurrentItemData] = useState(null);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
    const [activeOrderTab, setActiveOrderTab] = useState("active"); // Add this state
      // Add these state variables inside the Products component, near the other state variables
      const [shareModalOpen, setShareModalOpen] = useState(false);
      const [productToShare, setProductToShare] = useState<{
        id: string;
        name: string;
      } | null>(null);
  

  const handleEdit = (productId: string, item: any) => {
    setSelectedProductId(productId);
    setCurrentItemData(item);
    setEditModalOpen(true);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

    const getOrdersUrl = (status: string) => {
    if (status === "active") status = "pending"; 
    if (status === "processed") status = "shipped"
    return `/api/orders/supplier?orderStatus=${status.toUpperCase()}`;
  };

  const {done
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
    mutate: ordersMutate,
  } = useSWR(getOrdersUrl(activeOrderTab), {
    refreshInterval: 30000, // Poll every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000, // Prevent duplicate requests within  10 seconds
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

    const orders = Array.isArray(ordersData?.data) ? ordersData?.data : [];


  const { deleteResource } = useDeleteResource(
    "/api/products/supplier/",
    async () => {
      const res = await fetch("/api/products/supplier/", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    deleteProductFn
  );

  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  const {
    userData: { user },
  } = useUser();

    const router = useRouter();
  

  // Fetch data
  const { data, error, isLoading, mutate } = useSWR("/api/products/supplier/");
  const products = Array.isArray(data?.data) ? data?.data : [];

  // Filter items based on selected category, filter, and search query
  const filteredItems = products?.filter((item: any) => {
    const totalStock = getTotalStock(item);
    const hasStock = totalStock !== undefined && totalStock !== null;

    // Category filter
    if (selectedCategory !== "all" && item.category !== selectedCategory)
      return false;

    // Status filter (NEW)
    if (
      selectedStatus !== "all" &&
      item.status?.toLowerCase() !== selectedStatus.toLowerCase()
    )
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


  const ErrorOrdersState = ({ onRetry }: { onRetry?: () => void }) => (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12 text-destructive" />}
      title="Failed to load orders"
      description="There was an error loading your orders. Please try again."
      actionText="Try Again"
      onAction={onRetry}
    />
  );

  const scrollableClasses = "max-h-[calc(100vh-400px)] overflow-y-auto pr-2";

  


  const OrderCard = ({ order }: { order: any }) => {
      const getStatusBadge = (status: string) => {
        // If no status is provided, determine from activeOrderTab or other context
        const currentStatus = status || activeOrderTab;
  
        switch (currentStatus?.toLowerCase()) {
          case "pending":
          case "active":
            return (
              <Badge
                variant="default"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Pending
              </Badge>
            );
          case "processed":
            return (
              <Badge
                variant="secondary"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Processed
              </Badge>
            );
          
          case "cancelled":
            return <Badge variant="destructive">Cancelled</Badge>;
          default:
            return (
              <Badge
                variant="default"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Pending
              </Badge>
            );
        }
      };
  
      // Calculate total amount from order items
      const totalAmount =
        order.orderItems?.reduce((total: number, item: any) => {
          return total + (item.plugPrice || 0) * item.quantity;
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
  
      // Handle track order navigation
      const handleTrackOrder = () => {
        router.push(`/track-order/${order.orderId}`);
      };
  
      // Handle native sharing
      const handleShareTracking = async () => {
        const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/track-order/${order.orderId}`;
  
        if (navigator.share) {
          try {
            await navigator.share({
              title: `Track Order ${order.orderId}`,
              text: `Track your order ${order.orderId} from pluggn`,
              url: trackingUrl,
            });
          } catch (error) {
            fallbackShare(trackingUrl);
          }
        } else {
          fallbackShare(trackingUrl);
        }
      };
  
      // Fallback sharing method
      const fallbackShare = async (url: string) => {
        try {
          await navigator.clipboard.writeText(url);
          successToast("Tracking link copied to clipboard!");
        } catch (error) {
          console.error("Failed to copy to clipboard:", error);
          // Final fallback: open in new window/tab
          window.open(url, "_blank");
        }
      };
  
      return (
        <Card className="mb-3 sm:mb-4 last:mb-0">
          <CardHeader className="p-3 sm:p-4 pb-2">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <CardTitle className="sm:text-sm text-xs font-medium">
                  {order.orderId}
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  {formatDate(order.createdAt)}
                </CardDescription>
              </div>
              {getStatusBadge(activeOrderTab)}
            </div>
          </CardHeader>
  
          <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
            {/* Customer Info */}
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium sm:text-base text-sm">
                {truncateText(capitalizeWords(order.buyerName), 30)}
              </span>
            </div>
  
            {/* Phone Number */}
            <div className="flex items-center gap-2 sm:text-sm text-xs text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{order.buyerPhone}</span>
            </div>
  
            {/* Products */}
            <div className="space-y-2">
              {order.orderItems?.map((item: any, index: number) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="sm:text-sm text-xs font-medium capitalize">
                      {truncateText(item.productName, 37)}{" "}
                      <span className="lowercase">x</span> {item.quantity}
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
                    ₦{((item.plugPrice || 0) * item.quantity).toLocaleString()}
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
  
          {/* Action Buttons */}
          <CardFooter className="p-3 sm:p-4 pt-1 flex gap-2">
            {activeOrderTab === "processed" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={handleShareTracking}
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share Tracking
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={handleTrackOrder}
                >
                  <Truck className="h-3 w-3 mr-1" />
                  Track Order
                </Button>
              </>
            )}
  
            {activeOrderTab === "active" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={handleShareTracking}
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share Tracking
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={handleTrackOrder}
                >
                  <Truck className="h-3 w-3 mr-1" />
                  Track Order
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      );
    };





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
        (sum: number, variation: any) => sum + (variation.stock || 0),
        0
      );

      // Check total stock across all variations
      if (totalStock === 0) return "out-of-stock";
      if (totalStock <= 5) return "low-stock";
      return "optimal";
    }

    // If no variations, use item stock directly
    if (item.stock === undefined || item.stock === null) return "unknown";
    if (item.stock === 0) return "out-of-stock";
    if (item.stock <= 5) return "low-stock";
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
  );


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
        inventoryValue: 0,
      };

    return {
      totalProducts: products.length,
      lowStockItems: products.filter((item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Get total stock across all variations
          const totalStock = item.variations.reduce(
            (sum: number, variation: any) => sum + (variation.stock || 0),
            0
          );
          return totalStock > 0 && totalStock <= 5;
        }
        // If no variations, use item stock directly
        return item.stock !== undefined && item.stock > 0 && item.stock <= 5;
      }).length,
      outOfStock: products.filter((item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Check if all variations have zero stock
          const totalStock = item.variations.reduce(
            (sum: number, variation: any) => sum + (variation.stock || 0),
            0
          );
          return totalStock === 0;
        }
        // If no variations, check item stock directly
        return item.stock === 0;
      }).length,
      inventoryValue: products.reduce((total: number, item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Calculate value across all variations
          const variationValue = item.variations.reduce(
            (sum: number, variation: any) =>
              sum + item.price * (variation.stock || 0),
            0
          );
          return total + variationValue;
        }
        // If no variations, calculate value using item stock directly
        return total + item.price * (item.stock || 0);
      }, 0),
    };
  }, [products]);

  // Generate stock alerts from product data

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-1.5 sm:p-4 md:p-6 gap-2 sm:gap-4 pb-16 sm:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold">
              Inventory Management
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage products and monitor stock levels
            </p>
          </div>
        </div>

        {/* Inventory Stats */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-semibold">
            Inventory Command Center
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
                      <p>Total products in inventory</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-lg font-bold">
                      {stats.totalProducts}
                    </div>
                  </>
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
                      <p>Products needing restock</p>
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
                    {stats.lowStockItems > 0 && (
                      <div className="flex items-center text-amber-600 text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Restock needed
                      </div>
                    )}
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
                    {stats.outOfStock > 0 && (
                      <div className="flex items-center text-destructive text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Urgent attention needed
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Inventory Value Card */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-1 text-sm">
                  Inventory Value
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total inventory value</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <>
                    <div className="text-lg font-bold">
                      {formatPrice(stats.inventoryValue)}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Product Catalog Management */}
        <section className="space-y-2 max-w-[360px]:space-y-1 sm:space-y-3">
          {/* Filters and Search */}
          <div className="flex flex-col gap-2 max-w-[360px]:gap-1.5 sm:gap-3">
            {/* Add Product Button and Search Row */}
            <div className="flex items-center gap-2 max-w-[360px]:gap-1.5">
              <div className="relative flex-1 flex items-center">
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

              <div className="flex gap-1.5 flex-shrink-0">
                {/* Sync Store Button */}
                <Button
                  onClick={() => setSyncStoreModalOpen(true)}
                 
                  variant="outline"
                  className="text-xs sm:text-sm h-8 max-w-[360px]:h-7 sm:h-9 md:h-10 px-3 max-w-[360px]:px-2 sm:px-4 whitespace-nowrap
        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Package className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-4 sm:w-4 mr-1.5 max-w-[360px]:mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Sync Store</span>
                  <span className="xs:hidden">Sync</span>
                </Button>
                <Button
                  onClick={() => setAddProductModalOpen(true)}
                  
                  className="bg-primary text-white hover:bg-primary/90 text-xs sm:text-sm h-8 max-w-[360px]:h-7 sm:h-9 md:h-10 px-3 max-w-[360px]:px-2 sm:px-4 whitespace-nowrap flex-shrink-0 min-w-0
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
                >
                  <Package className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-4 sm:w-4 mr-1.5 max-w-[360px]:mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Add Product</span>
                  <span className="xs:hidden">Add</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 max-w-[360px]:gap-1 overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex gap-1.5 max-w-[360px]:gap-1">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedFilter("all");
                    setSelectedStatus("all");
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

          {/* Desktop Product Table */}
          <div className="">
            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase bg-muted/50">
                      <tr>
                        <th className="p-2 sm:p-3 text-left">Product</th>
                        <th className="p-2 sm:p-3 text-left">Price</th>
                        <th className="p-2 sm:p-3 text-left">Stock</th>
                        <th className="p-2 sm:p-3 w-[70px] text-left">
                          Status
                        </th>

                        {/* NEW COLUMN */}
                        <th className="p-2 sm:p-3 text-left">Plugs</th>
                        <th className="p-2 sm:p-3 text-left">Sales</th>
                        <th className="p-2 sm:p-3 w-[70px] text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={9} className="p-0">
                            <LoadingSkeleton />
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={9} className="p-0">
                            <ErrorState onRetry={() => mutate()} />
                          </td>
                        </tr>
                      ) : filteredItems?.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-0">
                            {products.length === 0 ? (
                              <EmptyProductsState
                                onAddProduct={() =>
                                  setAddProductModalOpen(true)
                                }
                                verified={!user.supplier.verified}
                              />
                            ) : (
                              <EmptyFilterState
                                onResetFilters={() => {
                                  setSelectedCategory("all");
                                  setSelectedFilter("all");
                                  setSelectedStatus("all"); // NEW
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
                                    href={`/marketplace/product/${item.id}`}
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
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">
                                <div className="flex items-center gap-1">
                                  <span
                                    className={getStockStatusColor(stockStatus)}
                                  >
                                    {getTotalStock(item)}
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
                                {displayValue(item.sold)}
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
                                        handleEdit(item.id, item);
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

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive text-xs sm:text-sm"
                                      onClick={() =>
                                        setProductToDelete(item.id)
                                      }
                                    >
                                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Delete
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

        {isLoading ? (
          <TipSkeleton />
        ) : (
          <Card className="bg-blue-50 border-blue-200 mb-3 sm:mb-4">
            <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
              <div className="rounded-full bg-blue-100 p-1.5 flex-shrink-0">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm text-blue-800">
                  Don't Forget to Call!
                </h3>
                <p className="text-[10px] sm:text-xs text-blue-600">
                  After delivery, call your customer to check their
                  satisfaction. This personal touch creates loyal customers and
                  repeat business.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <section id="orders" className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">
              Order Management
            </h2>
          </div>

          <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab}>
            <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10 overflow-x-auto">
              <TabsTrigger
                value="active"
                className="text-[10px] sm:text-xs whitespace-nowrap"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="processed"
                className="text-[10px] sm:text-xs whitespace-nowrap"
              >
                Processed
              </TabsTrigger>

              <TabsTrigger
                value="cancelled"
                className="text-[10px] sm:text-xs whitespace-nowrap"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-3 sm:mt-4">
              {ordersLoading ? (
                <LoadingOrdersSkeleton />
              ) : ordersError ? (
                <ErrorOrdersState onRetry={() => ordersMutate()} />
              ) : orders.length === 0 ? (
                <EmptyOrdersState status="active" />
              ) : (
                <div className={scrollableClasses}>
                  {orders.map((order: any) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="processed" className="mt-3 sm:mt-4">
              {ordersLoading ? (
                <LoadingOrdersSkeleton />
              ) : ordersError ? (
                <ErrorOrdersState onRetry={() => ordersMutate()} />
              ) : orders.length === 0 ? (
                <EmptyOrdersState status="processed" />
              ) : (
                <div className={scrollableClasses}>
                  {orders.map((order: any) => (
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
              ) : orders.length === 0 ? (
                <EmptyOrdersState status="cancelled" />
              ) : (
                <div className={scrollableClasses}>
                  {orders.map((order: any) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        <AddProductModal
          open={addProductModalOpen}
          onOpenChange={setAddProductModalOpen}
        />

        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          productName={productToShare?.name || ""}
          productId={productToShare?.id || ""}
          plugId={user?.supplier.id}
        />

        <UpdateProductModal
          itemData={currentItemData}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          productId={selectedProductId}
        />

        <SyncStoreModal
  open={syncStoreModalOpen}
  onOpenChange={setSyncStoreModalOpen}
/>

        {/* Delete Confirmation Dialog */}
        <DeleteDialog
          productToDelete={productToDelete}
          setProductToDelete={setProductToDelete}
          deleteResource={deleteResource}
        />
      </div>
    </TooltipProvider>
  );
}
