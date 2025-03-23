"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewProductPage() {
  const [productImages, setProductImages] = useState<string[]>([
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ])
  const [variants, setVariants] = useState<{ size: string; color: string; price: string; stock: string }[]>([
    { size: "M", color: "Blue", price: "12500", stock: "10" },
  ])

  // Add new variant
  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", price: "", stock: "" }])
  }

  // Remove variant
  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  // Add new image placeholder
  const addImagePlaceholder = () => {
    setProductImages([...productImages, "/placeholder.svg?height=200&width=200"])
  }

  // Remove image
  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link href="/dashboard/products" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Add New Product</h1>
              <p className="text-sm text-primary-foreground/80">Create a new product listing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Product Information</h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input id="product-name" placeholder="e.g. Traditional Ankara Fabric Blouse" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product-price">Price (₦)</Label>
                          <Input id="product-price" placeholder="e.g. 12500" type="number" />
                        </div>

                        <div>
                          <Label htmlFor="product-compare-price">Compare at Price (₦)</Label>
                          <Input id="product-compare-price" placeholder="e.g. 15000" type="number" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product-description">Description</Label>
                        <Textarea
                          id="product-description"
                          placeholder="Describe your product..."
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Media</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {productImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-muted rounded-md overflow-hidden relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                              Main
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        className="aspect-square bg-muted rounded-md border-2 border-dashed flex flex-col items-center justify-center hover:bg-muted/80 transition-colors"
                        onClick={addImagePlaceholder}
                      >
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Add Image</span>
                      </button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      You can upload up to 8 images. First image will be used as the product thumbnail.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Inventory</h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-sku">SKU (Stock Keeping Unit)</Label>
                        <Input id="product-sku" placeholder="e.g. ANK-BLU-001" />
                      </div>

                      <div>
                        <Label htmlFor="product-barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                        <Input id="product-barcode" placeholder="e.g. 123456789012" />
                      </div>

                      <div>
                        <Label htmlFor="product-quantity">Quantity</Label>
                        <Input id="product-quantity" placeholder="e.g. 100" type="number" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="track-inventory" />
                        <Label htmlFor="track-inventory">Track inventory</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="continue-selling" />
                        <Label htmlFor="continue-selling">Continue selling when out of stock</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Organization</h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-category">Category</Label>
                        <Select>
                          <SelectTrigger id="product-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="fabric">Fabric</SelectItem>
                            <SelectItem value="footwear">Footwear</SelectItem>
                            <SelectItem value="jewelry">Jewelry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="product-tags">Tags</Label>
                        <Input id="product-tags" placeholder="e.g. ankara, traditional, blouse" />
                        <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Product Status</h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-status">Status</Label>
                        <Select defaultValue="draft">
                          <SelectTrigger id="product-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="product-featured" />
                        <Label htmlFor="product-featured">Mark as featured product</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="variants">
            <Card className="border-none shadow-sm mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Product Variants</h2>
                  <div className="flex items-center space-x-2">
                    <Switch id="has-variants" />
                    <Label htmlFor="has-variants">
                      This product has multiple options, like different sizes or colors
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label>Option Name</Label>
                      <Select defaultValue="size">
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="size">Size</SelectItem>
                          <SelectItem value="color">Color</SelectItem>
                          <SelectItem value="material">Material</SelectItem>
                          <SelectItem value="style">Style</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Option Values</Label>
                      <Input placeholder="e.g. S, M, L, XL" />
                      <p className="text-xs text-muted-foreground mt-1">Separate values with commas</p>
                    </div>

                    <div>
                      <Label>Option Name</Label>
                      <Select defaultValue="color">
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="size">Size</SelectItem>
                          <SelectItem value="color">Color</SelectItem>
                          <SelectItem value="material">Material</SelectItem>
                          <SelectItem value="style">Style</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Option Values</Label>
                      <Input placeholder="e.g. Red, Blue, Green" />
                      <p className="text-xs text-muted-foreground mt-1">Separate values with commas</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Variants</h3>

                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-3 text-sm font-medium">
                        <div>Size</div>
                        <div>Color</div>
                        <div>Price (₦)</div>
                        <div>Stock</div>
                        <div></div>
                      </div>

                      {variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3">
                          <Input
                            value={variant.size}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].size = e.target.value
                              setVariants(newVariants)
                            }}
                          />
                          <Input
                            value={variant.color}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].color = e.target.value
                              setVariants(newVariants)
                            }}
                          />
                          <Input
                            value={variant.price}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].price = e.target.value
                              setVariants(newVariants)
                            }}
                          />
                          <Input
                            value={variant.stock}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].stock = e.target.value
                              setVariants(newVariants)
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                            onClick={() => removeVariant(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button variant="outline" className="w-full mt-2" onClick={addVariant}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Variant
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card className="border-none shadow-sm mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Shipping Information</h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch id="physical-product" defaultChecked />
                    <Label htmlFor="physical-product">This is a physical product</Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="product-weight">Weight (kg)</Label>
                      <Input id="product-weight" placeholder="e.g. 0.5" type="number" step="0.01" />
                    </div>

                    <div>
                      <Label>Dimensions</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="Length" type="number" step="0.1" />
                        <Input placeholder="Width" type="number" step="0.1" />
                        <Input placeholder="Height" type="number" step="0.1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="customs-code">HS Tariff Code (optional)</Label>
                      <Input id="customs-code" placeholder="e.g. 6104.43" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Shipping Options</h3>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="free-shipping" />
                        <Label htmlFor="free-shipping">Free shipping</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="local-pickup" />
                        <Label htmlFor="local-pickup">Local pickup available</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="shipping-calculator" />
                        <Label htmlFor="shipping-calculator">Show shipping calculator</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Product</Button>
        </div>
      </div>
    </div>
  )
}

