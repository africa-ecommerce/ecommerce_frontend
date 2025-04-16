"use client";

import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AlertCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  HelpCircle,
  MoreHorizontal,
  PackagePlus,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  X,
  Menu,
  Package,
  FilterX,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddProductModal } from "./add-product-modal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useSWR from "swr";
import Image from "next/image";
import { useDeleteResource } from "@/hooks/resourceManagement/useDeleteResources";
import DeleteDialog from "./delete-dialog";
import { PRODUCT_CATEGORIES } from "@/app/constant";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import EmptyState from "@/app/_components/empty-state";

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
  const [selectedItems, setSelectedItems] = useState([]);
  const [showEnhancedAddProduct, setShowEnhancedAddProduct] = useState(false);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // Add state for delete confirmation
  const [productToDelete, setProductToDelete] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const { deleteResource } = useDeleteResource(
    "/api/products/supplier/",
    async () => {
      const res = await fetch("/api/products/supplier/");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    deleteProductFn
  );

  // Fetch data
  const { data, error, isLoading, mutate } = useSWR("/api/products/supplier/");
  console.log(data);
  const products = Array.isArray(data?.data) ? data?.data : [];
  console.log("products", products);

  // Filter items based on selected category, filter, and search query
  const filteredItems = products?.filter((item: any) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory)
      return false;
    if (
      selectedFilter === "out-of-stock" &&
      (item.stock > 0 || item.stock === undefined)
    )
      return false;
    if (
      selectedFilter === "low-stock" &&
      (item.stock === 0 || item.stock === undefined || item.stock > 5)
    )
      return false;
    if (
      selectedFilter === "optimal" &&
      (item.stock === 0 || item.stock === undefined || item.stock <= 10)
    )
      return false;
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
  const getStockStatus = (item) => {
    if (!item.stock && item.stock !== 0) return "unknown";
    if (item.stock === 0) return "out-of-stock";
    if (item.stock <= 5) return "low-stock";
    return "optimal";
  };

  const getStockStatusColor = (status) => {
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

  const getStockStatusBadge = (status) => {
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
  const displayValue = (value) => {
    return value !== undefined && value !== null ? value : "-";
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-1.5 max-w-[360px]:p-1 sm:p-4 md:p-6 gap-2 max-w-[360px]:gap-1.5 sm:gap-4 pb-16 sm:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <h1 className="text-lg max-w-[360px]:text-base sm:text-xl md:text-2xl font-bold tracking-tight">
              Inventory Management
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Manage your products and monitor stock levels
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="icon"
              className="h-7 max-w-[360px]:h-6 w-7 max-w-[360px]:w-6 sm:h-8 sm:w-8 md:h-9 md:w-9"
            >
              <Download className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="sr-only">Export</span>
            </Button>
           
            <Button
              variant="outline"
              size="icon"
              className="h-7 max-w-[360px]:h-6 w-7 max-w-[360px]:w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 hidden md:flex"
            >
              <Settings className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
        {/* Inventory Command Center */}
        <section className="space-y-2 max-w-[360px]:space-y-1 sm:space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm max-w-[360px]:text-xs sm:text-base md:text-lg font-semibold">
              Inventory Command Center
            </h2>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs h-7 hidden sm:inline-flex"
            >
              <Link href="#">View Reports</Link>
            </Button>
          </div>

          {/* Mobile Touch-Friendly Stats */}

          {/* Tablet/Desktop Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="p-2 md:p-3">
              <CardHeader className="p-1 md:p-2 pb-0">
                <CardTitle className="text-xs md:text-sm font-medium flex items-center gap-1">
                  Total Products
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of products in your catalog</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-2 pt-0">
                <div className="text-lg md:text-2xl font-bold">48</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>5 new this month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-2 md:p-3">
              <CardHeader className="p-1 md:p-2 pb-0">
                <CardTitle className="text-xs md:text-sm font-medium flex items-center gap-1">
                  Low Stock Items
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products that need restocking soon</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-2 pt-0">
                <div className="text-lg md:text-2xl font-bold text-amber-500">
                  12
                </div>
                <div className="flex items-center text-xs text-amber-600 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>Restock needed</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-2 md:p-3">
              <CardHeader className="p-1 md:p-2 pb-0">
                <CardTitle className="text-xs md:text-sm font-medium flex items-center gap-1">
                  Out of Stock
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products currently unavailable</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-2 pt-0">
                <div className="text-lg md:text-2xl font-bold text-destructive">
                  5
                </div>
                <div className="flex items-center text-xs text-destructive mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>Urgent attention needed</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-2 md:p-3">
              <CardHeader className="p-1 md:p-2 pb-0">
                <CardTitle className="text-xs md:text-sm font-medium flex items-center gap-1">
                  Inventory Value
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total value of current inventory</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-2 pt-0">
                <div className="text-lg md:text-2xl font-bold">₦1.2M</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>15% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Product Catalog Management */}
        <section className="space-y-2 max-w-[360px]:space-y-1 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center justify-between"></div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkUpdate(true)}
                className="text-xs md:text-sm h-7 sm:h-8"
                disabled={selectedItems.length === 0}
              >
                <Sliders className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1" />{" "}
                Bulk Update
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPromotion(true)}
                className="text-xs md:text-sm h-7 sm:h-8"
                disabled={selectedItems.length === 0}
              >
                <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1" />{" "}
                Promote
              </Button>
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
                        {/* <th className="p-2 sm:p-3 w-10 text-left">
                          <Checkbox
                            checked={
                              selectedItems.length === currentItems?.length &&
                              currentItems?.length > 0
                            }
                            onCheckedChange={selectAllItems}
                            aria-label="Select all"
                          />
                        </th> */}
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
                        currentItems.map((item) => {
                          const stockStatus = getStockStatus(item);
                          return (
                            <tr
                              key={item.id}
                              className="border-b hover:bg-muted/30"
                            >
                              {/* <td className="p-2 sm:p-3">
                                <Checkbox
                                  checked={selectedItems.includes(item.id)}
                                  onCheckedChange={() =>
                                    toggleItemSelection(item.id)
                                  }
                                  aria-label={`Select ${item.name}`}
                                />
                              </td> */}
                              <td className="p-2 sm:p-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium text-xs sm:text-sm truncate max-w-[150px]">
                                    {item.name || "-"}
                                  </span>
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
                                    {displayValue(item.stock)}
                                  </span>
                                </div>
                              </td>
                              <td className="p-2 sm:p-3">
                                {getStockStatusBadge(stockStatus)}
                              </td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-muted-foreground" />
                                  <span>{displayValue(item.plugs)}</span>
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
                                    <DropdownMenuItem className="text-xs sm:text-sm">
                                      <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs sm:text-sm">
                                      <PackagePlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Restock
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs sm:text-sm">
                                      <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                      Promote
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
