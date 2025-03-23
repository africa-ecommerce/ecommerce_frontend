"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample products data
const products = [
  {
    id: 1,
    name: "Traditional Ankara Fabric Blouse",
    price: 12500,
    stock: 24,
    category: "Fashion",
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "African Print Headwrap",
    price: 2500,
    stock: 18,
    category: "Fashion",
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Embroidered Dashiki Shirt",
    price: 9800,
    stock: 15,
    category: "Fashion",
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Handwoven Kente Scarf",
    price: 7500,
    stock: 12,
    category: "Fashion",
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Adire Fabric - 6 Yards",
    price: 15000,
    stock: 8,
    category: "Fabric",
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Beaded Ankara Clutch Purse",
    price: 6500,
    stock: 0,
    category: "Accessories",
    status: "out_of_stock",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 7,
    name: "Hand-carved Wooden Earrings",
    price: 3200,
    stock: 5,
    category: "Jewelry",
    status: "low_stock",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 8,
    name: "Leather Sandals with Beads",
    price: 8700,
    stock: 0,
    category: "Footwear",
    status: "out_of_stock",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [filterStatus, setFilterStatus] = useState("all")

  // Format price in Naira
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  // Filter products based on search query and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "in_stock" && product.stock > 0) ||
      (filterStatus === "out_of_stock" && product.stock === 0) ||
      (filterStatus === "low_stock" && product.stock > 0 && product.stock <= 5)

    return matchesSearch && matchesStatus
  })

  // Toggle product selection
  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  // Toggle all products selection
  const toggleAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Get status badge for product
  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-600 hover:bg-red-500/10 border-none">
          Out of Stock
        </Badge>
      )
    } else if (status === "low_stock" || (stock > 0 && stock <= 5)) {
      return (
        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/10 border-none">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-none">
          In Stock
        </Badge>
      )
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Products</h1>
              <p className="text-sm text-primary-foreground/80">Manage your store inventory</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="stock_high">Stock: High to Low</SelectItem>
                <SelectItem value="stock_low">Stock: Low to High</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <Card className="mb-6 border-none shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">{selectedProducts.length} products selected</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        <Card className="border-none shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-[40px] px-4 py-3 text-left">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={toggleAllProducts}
                    />
                  </th>
                  <th className="w-[80px] px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <span>Product</span>
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <span>Price</span>
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <span>Stock</span>
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="w-[80px] px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 relative rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3 font-medium">{product.stock}</td>
                    <td className="px-4 py-3">{getStatusBadge(product.status, product.stock)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
            <span className="font-medium">8</span> products
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

