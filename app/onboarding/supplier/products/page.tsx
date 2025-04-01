import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  ImageIcon,
  FileSpreadsheet,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Step 4 of 5
            </span>
            <span className="text-sm font-medium text-gray-500">
              80% Complete
            </span>
          </div>
          <Progress
            value={80}
            className="h-2 bg-gray-100"
          />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
          Add Your Products
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Start adding products to your store. You can add more later.
        </p>

        <Tabs defaultValue="single" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="single">Single Product</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="single" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product-name" className="text-sm font-medium">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input id="product-name" placeholder="Enter product name" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="product-description"
                className="text-sm font-medium"
              >
                Description <span className="text-red-500">*</span><span className="text-gray-500">{" "}(Recommended)</span>
              </Label>
              <Textarea
                id="product-description"
                placeholder="Describe your product in detail"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-price" className="text-sm font-medium">
                  Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="product-price"
                    placeholder="0.00"
                    type="number"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="product-quantity"
                  className="text-sm font-medium"
                >
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input id="product-quantity" placeholder="0" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-category" className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="product-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Fashion & Accessories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                  <SelectItem value="home">Home & Living</SelectItem>
                  <SelectItem value="crafts">Local Crafts</SelectItem>
                  <SelectItem value="digital">Digital Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping-regions" className="text-sm font-medium">
                Shipping Regions <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="shipping-regions">
                  <SelectValue placeholder="Select shipping regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Only</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="regional">Regional (Africa)</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Product Images <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 border border-dashed flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                    <ImageIcon className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mb-2">
                    Main Image
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Upload
                  </Button>
                </Card>
                <Card className="p-4 border border-dashed flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                    <ImageIcon className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mb-2">
                    Image 2
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Upload
                  </Button>
                </Card>
                <Card className="p-4 border border-dashed flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                    <ImageIcon className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mb-2">
                    Image 3
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Upload
                  </Button>
                </Card>
              </div>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </TabsContent>
          <TabsContent value="bulk" className="space-y-6">
            <Card className="p-6 border border-dashed">
              <div className="flex flex-col items-center justify-center gap-2 py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                  <FileSpreadsheet className="h-8 w-8 text-orange-500" />
                </div>
                <p className="font-medium text-lg">Bulk Upload Products</p>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Download our template, fill it with your products, and upload
                  it back
                </p>
                <div className="space-y-3 w-full max-w-xs">
                  <Button variant="outline" size="sm" className="w-full">
                    Download Template
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Completed File
                  </Button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <HelpCircle className="h-4 w-4" />
                  <span>
                    Need help?{" "}
                    <Link
                      href="/help/bulk-upload"
                      className="text-orange-500 hover:underline"
                    >
                      View tutorial
                    </Link>
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button asChild variant="outline" className="px-6">
            <Link href="/onboarding/supplier/verification">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 px-6">
            <Link href="/onboarding/success">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
