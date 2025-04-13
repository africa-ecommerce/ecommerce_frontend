"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  HelpCircle,
  LineChart,
  MoreHorizontal,
  PackagePlus,
  Pencil,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  Tag,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Menu
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
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AddProductModal } from "./add-product-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

interface Product {
  id: string
  name: string
  category: string
  sku: string
  price: number
  stock: number
  reorderPoint: number
  plugs: number
  sales: number
  trend: "up" | "down" | "stable"
  image: string
}

export default function Inventory() {
  // State management
  const [refreshing, setRefreshing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showEnhancedAddProduct, setShowEnhancedAddProduct] = useState(false)
  const [showBulkUpdate, setShowBulkUpdate] = useState(false)
  const [showPromotion, setShowPromotion] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedView, setSelectedView] = useState("grid")
  const [showMobileActions, setShowMobileActions] = useState(false)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  // Sample inventory data
  const inventoryItems: Product[] = [
    {
      id: "prod-001",
      name: "Shea Butter (250g)",
      category: "Skincare",
      sku: "SB-250",
      price: 2500,
      stock: 85,
      reorderPoint: 20,
      plugs: 24,
      sales: 156,
      trend: "up",
      image: "/placeholder.svg",
    },
    {
      id: "prod-002",
      name: "African Black Soap",
      category: "Skincare",
      sku: "ABS-100",
      price: 1500,
      stock: 12,
      reorderPoint: 15,
      plugs: 18,
      sales: 92,
      trend: "up",
      image: "/placeholder.svg",
    },
    {
      id: "prod-003",
      name: "Hair Growth Oil",
      category: "Hair Care",
      sku: "HGO-100",
      price: 2000,
      stock: 45,
      reorderPoint: 10,
      plugs: 15,
      sales: 67,
      trend: "stable",
      image: "/placeholder.svg",
    },
    {
      id: "prod-004",
      name: "Body Butter",
      category: "Skincare",
      sku: "BB-200",
      price: 2800,
      stock: 32,
      reorderPoint: 15,
      plugs: 12,
      sales: 48,
      trend: "down",
      image: "/placeholder.svg",
    },
    {
      id: "prod-005",
      name: "Moringa Hair Mask",
      category: "Hair Care",
      sku: "MHM-150",
      price: 3200,
      stock: 0,
      reorderPoint: 10,
      plugs: 8,
      sales: 36,
      trend: "up",
      image: "/placeholder.svg",
    },
    {
      id: "prod-006",
      name: "Natural Deodorant",
      category: "Personal Care",
      sku: "ND-50",
      price: 1800,
      stock: 5,
      reorderPoint: 12,
      plugs: 6,
      sales: 24,
      trend: "up",
      image: "/placeholder.svg",
    },
  ]

  // Filter items based on selected category, filter, and search query
  const filteredItems = inventoryItems.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory)
      return false
    if (selectedFilter === "out-of-stock" && item.stock > 0) return false
    if (
      selectedFilter === "low-stock" &&
      (item.stock === 0 || item.stock > item.reorderPoint)
    )
      return false
    if (
      selectedFilter === "optimal" &&
      (item.stock === 0 || item.stock <= item.reorderPoint)
    )
      return false
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  // Helper functions
  const getStockStatus = (item: Product) => {
    if (item.stock === 0) return "out-of-stock"
    if (item.stock <= item.reorderPoint) return "low-stock"
    return "optimal"
  }

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "out-of-stock":
        return "text-destructive"
      case "low-stock":
        return "text-amber-500"
      case "optimal":
        return "text-green-500"
      default:
        return ""
    }
  }

  const getStockStatusBadge = (status: string) => {
  switch (status) {
    case "out-of-stock":
      return (
        <Badge variant="destructive" className="text-xs py-0 px-2 whitespace-nowrap">
          Out of Stock
        </Badge>
      )
    case "low-stock":
      return (
        <Badge
          variant="outline"
          className="text-xs py-0 px-2 text-amber-500 border-amber-200 bg-amber-50 whitespace-nowrap"
        >
          Low Stock
        </Badge>
      )
    case "optimal":
      return (
        <Badge
          variant="outline"
          className="text-xs py-0 px-2 text-green-500 border-green-200 bg-green-50 whitespace-nowrap"
        >
          In Stock
        </Badge>
      )
    default:
      return null
  }
}
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
      default:
        return <LineChart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const selectAllItems = () => {
    if (selectedItems.length === inventoryItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(inventoryItems.map((item) => item.id))
    }
  }

  const handleCardTap = (id: string) => {
    setActiveCardId(activeCardId === id ? null : id)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

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
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-7 max-w-[360px]:h-6 w-7 max-w-[360px]:w-6 sm:h-8 sm:w-8 md:h-9 md:w-9"
            >
              <RefreshCw
                className={`h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 max-w-[360px]:h-6 w-7 max-w-[360px]:w-6 sm:h-8 sm:w-8 md:h-9 md:w-9"
            >
              <Download className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="sr-only">Export</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 max-w-[360px]:h-6 w-7 max-w-[360px]:w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 md:hidden"
                >
                  <Menu className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 sm:h-3.5 sm:w-3.5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-4/5 sm:max-w-sm">
                <SheetHeader className="mb-6">
                  <SheetTitle>Inventory Menu</SheetTitle>
                  <SheetDescription>
                    Quick access to inventory features
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEnhancedAddProduct(true)}
                        className="justify-start text-xs"
                      >
                        <Plus className="h-3.5 w-3.5 mr-2" /> Add Product
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs"
                      >
                        <PackagePlus className="h-3.5 w-3.5 mr-2" /> Restock
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs"
                      >
                        <Tag className="h-3.5 w-3.5 mr-2" /> Promotions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs"
                      >
                        <Settings className="h-3.5 w-3.5 mr-2" /> Settings
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Quick Filters</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          selectedFilter === "out-of-stock"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFilter("out-of-stock")}
                        className="justify-start text-xs"
                      >
                        <AlertCircle className="h-3.5 w-3.5 mr-2" /> Out of
                        Stock
                      </Button>
                      <Button
                        variant={
                          selectedFilter === "low-stock" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFilter("low-stock")}
                        className="justify-start text-xs"
                      >
                        <AlertCircle className="h-3.5 w-3.5 mr-2" /> Low Stock
                      </Button>
                      <Button
                        variant={
                          selectedFilter === "optimal" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFilter("optimal")}
                        className="justify-start text-xs"
                      >
                        <TrendingUp className="h-3.5 w-3.5 mr-2" /> Optimal
                        Stock
                      </Button>
                      <Button
                        variant={
                          selectedFilter === "all" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFilter("all")}
                        className="justify-start text-xs"
                      >
                        <Filter className="h-3.5 w-3.5 mr-2" /> All Products
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          selectedCategory === "Skincare"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory("Skincare")}
                        className="justify-start text-xs"
                      >
                        Skincare
                      </Button>
                      <Button
                        variant={
                          selectedCategory === "Hair Care"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory("Hair Care")}
                        className="justify-start text-xs"
                      >
                        Hair Care
                      </Button>
                      <Button
                        variant={
                          selectedCategory === "Personal Care"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory("Personal Care")}
                        className="justify-start text-xs"
                      >
                        Personal Care
                      </Button>
                      <Button
                        variant={
                          selectedCategory === "all" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory("all")}
                        className="justify-start text-xs"
                      >
                        All Categories
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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

          {/* Mobile Add Button */}

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
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap flex items-center"
                  >
                    <Filter className="h-3 max-w-[360px]:h-2.5 w-3 max-w-[360px]:w-2.5 mr-1.5 max-w-[360px]:mr-1" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="px-4 max-w-[360px]:px-3 pb-4 max-w-[360px]:pb-3">
                  <div className="pt-4 max-w-[360px]:pt-3 pb-2 max-w-[360px]:pb-1 border-b">
                    <h3 className="font-medium text-sm max-w-[360px]:text-xs">
                      Filter Products
                    </h3>
                  </div>
                  <div className="py-4 max-w-[360px]:py-3 space-y-4 max-w-[360px]:space-y-3">
                    <div className="space-y-2 max-w-[360px]:space-y-1">
                      <label className="text-xs max-w-[360px]:text-[11px] font-medium">
                        Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-full text-xs h-8 max-w-[360px]:h-7">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-xs">
                            All Categories
                          </SelectItem>
                          <SelectItem value="Skincare" className="text-xs">
                            Skincare
                          </SelectItem>
                          <SelectItem value="Hair Care" className="text-xs">
                            Hair Care
                          </SelectItem>
                          <SelectItem value="Personal Care" className="text-xs">
                            Personal Care
                          </SelectItem>
                          <SelectItem value="Accessories" className="text-xs">
                            Accessories
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 max-w-[360px]:space-y-1">
                      <label className="text-xs max-w-[360px]:text-[11px] font-medium">
                        Stock Status
                      </label>
                      <Select
                        value={selectedFilter}
                        onValueChange={setSelectedFilter}
                      >
                        <SelectTrigger className="w-full text-xs h-8 max-w-[360px]:h-7">
                          <SelectValue placeholder="Stock Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-xs">
                            All Products
                          </SelectItem>
                          <SelectItem value="out-of-stock" className="text-xs">
                            Out of Stock
                          </SelectItem>
                          <SelectItem value="low-stock" className="text-xs">
                            Low Stock
                          </SelectItem>
                          <SelectItem value="optimal" className="text-xs">
                            Optimal Stock
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 max-w-[360px]:space-y-1">
                      <label className="text-xs max-w-[360px]:text-[11px] font-medium">
                        Sort By
                      </label>
                      <Select defaultValue="name-asc">
                        <SelectTrigger className="w-full text-xs h-8 max-w-[360px]:h-7">
                          <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name-asc" className="text-xs">
                            Name (A-Z)
                          </SelectItem>
                          <SelectItem value="name-desc" className="text-xs">
                            Name (Z-A)
                          </SelectItem>
                          <SelectItem value="price-asc" className="text-xs">
                            Price (Low to High)
                          </SelectItem>
                          <SelectItem value="price-desc" className="text-xs">
                            Price (High to Low)
                          </SelectItem>
                          <SelectItem value="stock-asc" className="text-xs">
                            Stock (Low to High)
                          </SelectItem>
                          <SelectItem value="stock-desc" className="text-xs">
                            Stock (High to Low)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 max-w-[360px]:gap-1 mt-2 max-w-[360px]:mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 max-w-[360px]:h-7"
                    >
                      Reset
                    </Button>
                    <Button size="sm" className="flex-1 h-8 max-w-[360px]:h-7">
                      Apply Filters
                    </Button>
                  </div>
                </DrawerContent>
              </Drawer>
              <div className="flex gap-1.5 max-w-[360px]:gap-1">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  All
                </Button>
                <Button
                  variant={
                    selectedFilter === "out-of-stock" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter("out-of-stock")}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  Out of Stock
                </Button>
                <Button
                  variant={
                    selectedFilter === "low-stock" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter("low-stock")}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  Low Stock
                </Button>
                <Button
                  variant={selectedFilter === "optimal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("optimal")}
                  className="text-xs h-8 max-w-[360px]:h-7 whitespace-nowrap px-2.5 max-w-[360px]:px-2 min-w-0"
                >
                  In Stock
                </Button>
              </div>
              <div className="hidden sm:block">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[120px] md:w-[150px] text-xs md:text-sm h-8 sm:h-9">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs md:text-sm">
                      All Categories
                    </SelectItem>
                    <SelectItem value="Skincare" className="text-xs md:text-sm">
                      Skincare
                    </SelectItem>
                    <SelectItem
                      value="Hair Care"
                      className="text-xs md:text-sm"
                    >
                      Hair Care
                    </SelectItem>
                    <SelectItem
                      value="Personal Care"
                      className="text-xs md:text-sm"
                    >
                      Personal Care
                    </SelectItem>
                    <SelectItem
                      value="Accessories"
                      className="text-xs md:text-sm"
                    >
                      Accessories
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Mobile View Selector Tabs */}

          {/* Desktop Product Table */}
          <div className="">
            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase bg-muted/50">
                      <tr>
                        <th className="p-2 sm:p-3 w-10 text-left">
                          <Checkbox
                            checked={
                              selectedItems.length === inventoryItems.length &&
                              inventoryItems.length > 0
                            }
                            onCheckedChange={selectAllItems}
                            aria-label="Select all"
                          />
                        </th>
                        <th className="p-2 sm:p-3 text-left">Product</th>
                        <th className="p-2 sm:p-3 text-left">Price</th>
                        <th className="p-2 sm:p-3 text-left">Stock</th>
                        <th className="p-2 sm:p-3 w-[70px] text-left">Status</th>
                        <th className="p-2 sm:p-3 text-left">Plugs</th>
                        <th className="p-2 sm:p-3 text-left">Sales</th>
                        <th className="p-2 sm:p-3 w-[70px] text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => {
                        const stockStatus = getStockStatus(item);
                        return (
                          <tr
                            key={item.id}
                            className="border-b hover:bg-muted/30"
                          >
                            <td className="p-2 sm:p-3">
                              <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() =>
                                  toggleItemSelection(item.id)
                                }
                                aria-label={`Select ${item.name}`}
                              />
                            </td>
                            <td className="p-2 sm:p-3">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="font-medium text-xs sm:text-sm truncate max-w-[150px]">
                                  {item.name}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                              ₦{item.price.toLocaleString()}
                            </td>
                            <td className="p-2 sm:p-3 text-xs sm:text-sm">
                              <div className="flex items-center gap-1">
                                <span
                                  className={getStockStatusColor(stockStatus)}
                                >
                                  {item.stock}
                                </span>
                                {item.stock > 0 && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Reorder point: {item.reorderPoint}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </td>
                            <td className="p-2 sm:p-3">
                              {getStockStatusBadge(stockStatus)}
                            </td>
                            <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-muted-foreground" />
                                <span>{item.plugs}</span>
                              </div>
                            </td>
                            <td className="p-2 sm:p-3 text-xs sm:text-sm whitespace-nowrap">
                              {item.sales}
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
                                  <DropdownMenuItem className="text-destructive text-xs sm:text-sm">
                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />{" "}
                                    Archive
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredItems.length === 0 && (
                        <tr>
                          <td
                            colSpan={11}
                            className="p-4 text-center text-muted-foreground text-xs sm:text-sm"
                          >
                            No products found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-3 sm:p-4 border-t">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Showing {filteredItems.length} of {inventoryItems.length}{" "}
                  products
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="h-7 sm:h-8 text-xs"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="h-7 sm:h-8 text-xs"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Mobile Action Bar */}

        {/* Enhanced Add Product Modal */}
        <AddProductModal
          open={showEnhancedAddProduct}
          onOpenChange={setShowEnhancedAddProduct}
        />
      </div>
    </TooltipProvider>
  );
}