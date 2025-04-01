import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  ImageIcon,
  FileSpreadsheet,
  HelpCircle,
} from "lucide-react";
import { useFormResolver } from "@/hooks/useFormResolver";
import { productSchema } from "@/zod/schema"; // You'll need to create this schema
import { FormData } from "../page";

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
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface ProductStepProps {
  onNext: () => void;
  onPrev: () => void;
  update: (data: FormData) => void;
  initialData?: any;
}

export default function ProductStep({
  onNext,
  onPrev,
  update,
  initialData,
}: ProductStepProps) {
  const [activeTab, setActiveTab] = useState("single");

  const {
    form: { register, submit, control, setValue, errors, watch },
  } = useFormResolver((data) => {
    update({ productStep: data });
    onNext();
    return Promise.resolve(true);
  }, productSchema);

  // Set initial data if available
  useEffect(() => {
    if (initialData) {
      if (initialData.productName)
        setValue("productName", initialData.productName);
      if (initialData.description)
        setValue("description", initialData.description);
      if (initialData.price) setValue("price", initialData.price);
      if (initialData.quantity) setValue("quantity", initialData.quantity);
      if (initialData.category) setValue("category", initialData.category);
      if (initialData.shippingRegions)
        setValue("shippingRegions", initialData.shippingRegions);
      if (initialData.images) setValue("images", initialData.images);
    }
  }, [initialData, setValue]);

  const handleImageUpload =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const images = watch("images") || [];
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setValue("images", newImages);
      }
    };

  return (
    <>
     
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
        Add Your Products
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Start adding products to your store. You can add more later.
      </p>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single Product</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="single" className="space-y-6">
          <form onSubmit={submit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  {...register("productName")}
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm">
                    {errors.productName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product in detail"
                  rows={3}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      id="price"
                      placeholder="0.00"
                      type="number"
                      className="pl-8"
                      step="0.01"
                      {...register("price")}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    placeholder="0"
                    type="number"
                    {...register("quantity")}
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">
                          Fashion & Accessories
                        </SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="beauty">
                          Beauty & Wellness
                        </SelectItem>
                        <SelectItem value="home">Home & Living</SelectItem>
                        <SelectItem value="crafts">Local Crafts</SelectItem>
                        <SelectItem value="digital">
                          Digital Services
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="shippingRegions"
                  className="text-sm font-medium"
                >
                  Shipping Regions <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="shippingRegions"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="shippingRegions">
                        <SelectValue placeholder="Select shipping regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Only</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="regional">
                          Regional (Africa)
                        </SelectItem>
                        <SelectItem value="international">
                          International
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.shippingRegions && (
                  <p className="text-red-500 text-sm">
                    {errors.shippingRegions.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Product Images <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((index) => {
                    const images = watch("images") || [];
                    const imageUrl = images[index];

                    return (
                      <Card
                        key={index}
                        className="p-4 border border-dashed flex flex-col items-center justify-center"
                      >
                        <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                          {imageUrl ? (
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={imageUrl}
                                alt={`Product ${index}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <ImageIcon className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 text-center mb-2">
                          {index === 0 ? "Main Image" : `Image ${index + 1}`}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`image-upload-${index}`}
                          onChange={handleImageUpload(index)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <label
                            htmlFor={`image-upload-${index}`}
                            className="cursor-pointer"
                          >
                            Upload
                          </label>
                        </Button>
                      </Card>
                    );
                  })}
                </div>
                {errors.images && (
                  <p className="text-red-500 text-sm">
                    {errors.images.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="bulk" className="space-y-6">
          <Card className="p-6 border border-dashed">
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                <FileSpreadsheet className="h-8 w-8 text-orange-500" />
              </div>
              <p className="font-medium text-lg">Bulk Upload Products</p>
              <p className="text-sm text-gray-500 text-center mb-4">
                Download our template, fill it with your products, and upload it
                back
              </p>
              <div className="space-y-3 w-full max-w-xs">
                <Button variant="outline" size="sm" className="w-full">
                  Download Template
                </Button>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  id="bulk-upload"
                />
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <label htmlFor="bulk-upload" className="cursor-pointer">
                    Upload Completed File
                  </label>
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
        <Button variant="outline" className="px-6" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 px-6"
          onClick={activeTab === "single" ? submit : onNext}
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
