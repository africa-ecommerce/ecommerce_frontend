"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MoreHorizontal,
  Settings,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
  Package,
  FilterX,
  Users,
  Sliders,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

import { AddProductModal } from "./add-product-modal";
import useSWR from "swr";
import Image from "next/image";
import { useDeleteResource } from "@/hooks/resourceManagement/useDeleteResources";
import DeleteDialog from "./delete-dialog";
import { PRODUCT_CATEGORIES } from "@/app/constant";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import EmptyState from "@/app/_components/empty-state";
import { EditProductModal } from "./update-product-modal";
import { useUser } from "@/app/_components/provider/UserContext";
import { formatPrice, getTotalStock, truncateText } from "@/lib/utils";

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
}: {
  onAddProduct?: () => void;
}) => (
  <EmptyState
    icon={<Package className="h-12 w-12 text-muted-foreground" />}
    title="No products yet"
    description="You haven't added any products to your inventory. Add your first product to get started."
    actionText="Add Your First Product"
    onAction={onAddProduct}
    showBorder={false}
  />
);

const deleteProductFn = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
     credentials: "include" 
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showEnhancedAddProduct, setShowEnhancedAddProduct] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // Add state for delete confirmation
  const [productToDelete, setProductToDelete] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [currentItemData, setCurrentItemData] = useState(null);

  const handleEdit = (productId: string, item: any) => {
    setSelectedProductId(productId);
    setCurrentItemData(item);
    setEditModalOpen(true);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const { deleteResource } = useDeleteResource(
    "/api/products/supplier/",
    async () => {
      const res = await fetch("/api/products/supplier/", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    deleteProductFn
  );

  const {
    userData: { user },
  } = useUser();

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

        {isLoading && <TipSkeleton />}

        {!user?.supplier.verified && !isLoading ? (
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
                  processing orders. Verified account are more likely to receive
                  orders.
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
        ) : (
          ""
        )}

        {/* Product Catalog Management */}
        <section className="space-y-2 max-w-[360px]:space-y-1 sm:space-y-3">
          <div className="flex justify-end gap-2">
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                onClick={() => setShowEnhancedAddProduct(true)}
                className="text-xs md:text-sm h-7 sm:h-8"
              >
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1" />{" "}
                Add Product
              </Button>
            </div>
          </div>
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
                              <EmptyProductsState
                                onAddProduct={() =>
                                  setShowEnhancedAddProduct(true)
                                }
                              />
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
        {/* Enhanced Add Product Modal */}
        <AddProductModal
          open={showEnhancedAddProduct}
          onOpenChange={setShowEnhancedAddProduct}
        />

        <EditProductModal
          itemData={currentItemData}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          productId={selectedProductId}
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
