"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  HelpCircle,
  ImageIcon,
  LineChart,
  Loader2,
  MoreHorizontal,
  PackageCheck,
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
  Upload,
  Users,
  X,
  Zap,
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormResolver } from "@/hooks/useFormResolver";
import { productFormSchema, ProductFormData } from "@/zod/schema";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { z } from "zod";
import { mutate } from "swr";

export function AddProductModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [newTag, setNewTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  // Define all hooks at the top level, not conditionally
  const addProduct = async (data: ProductFormData) => {
    try {
      console.log("posted data", data);

      const formData = new FormData();

      // 2. Append the images
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });

      // 3. Append all other form data as JSON
      const { images, imageUrls, ...jsonData } = data;
      formData.append("productData", JSON.stringify(jsonData));
      console.log("formData", formData);

      // 4. Send with FormData
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        errorToast(result.error);
        return null;
      }

      successToast(result.message);
      return result;
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      return null;
    }
  };

  const {
  form: { register, submit, errors, setValue, isSubmitting, watch },
} = useFormResolver<ProductFormData>(
  addProduct,
  productFormSchema,
  () => {
    onOpenChange(false);
    setCurrentStep(0);
      mutate('/api/products/supplier/');
  },
  {
    hasVariations: false,
    variations: [],
    tags: [],
  }
);

  const formData = watch();

  // Handle drag and drop for images
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea || !open) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.add("border-primary");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("border-primary");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("border-primary");

      if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files);
      }
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [open]); // Added open as a dependency

  const handleFiles = (files: FileList) => {
    const currentImages = formData.images || [];
    const newFiles = Array.from(files).filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 5 * 1024 * 1024 // 5MB
    );

    if (newFiles.length === 0) {
      errorToast("Only JPG/PNG images under 5MB allowed");
      return;
    }

    if (currentImages.length + newFiles.length > 5) {
      errorToast("Maximum 5 images allowed");
      newFiles.splice(5 - currentImages.length);
    }

    const newImages = [...currentImages, ...newFiles];
    const newImageUrls = [
      ...(formData.imageUrls || []),
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ];

    setValue("images", newImages);
    setValue("imageUrls", newImageUrls);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    const newImageUrls = [...(formData.imageUrls || [])];

    URL.revokeObjectURL(newImageUrls[index]);
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);

    setValue("images", newImages);
    setValue("imageUrls", newImageUrls);
  };

  const addVariation = () => {
    const newVariation = {
      id: `var-${Date.now()}`,
      size: "",
      color: "",

      stock: 0,
    };

    setValue("variations", [...(formData.variations || []), newVariation]);
  };

  const updateVariation = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedVariations = [...(formData.variations || [])];
    updatedVariations[index] = {
      ...updatedVariations[index],
      [field]: value,
    };

    setValue("variations", updatedVariations);
  };

  const removeVariation = (index: number) => {
    const updatedVariations = [...(formData.variations || [])];
    updatedVariations.splice(index, 1);

    setValue("variations", updatedVariations);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setValue("tags", [...(formData.tags || []), newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setValue("tags", formData.tags?.filter((t) => t !== tag) || []);
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const steps = [
    { id: "category", title: "Category" },
    { id: "details", title: "Details" },
    { id: "variations", title: "Variations" },
    { id: "media", title: "Media" },
    { id: "review", title: "Review" },
  ];

  // Custom validation function for step 2
  

  // Change the isStepValid function to properly handle the hasVariations check
const isStepValid = () => {
  switch (currentStep) {
    case 0:
      return !!formData.category && !errors.category;
    case 1:
      // Check price is valid (not negative and matches the required format)
      const priceValue = formData.price;
      const isPriceValid =
        !!priceValue &&
        !errors.price &&
        /^\d+(\.\d{1,2})?$/.test(priceValue) &&
        parseFloat(priceValue) >= 0;

      return !!formData.name && isPriceValid && !errors.name;
    case 2:
      // If hasVariations is false, this step is always valid
      if (!formData.hasVariations) return true;

      // If variations are needed but none exist, it's invalid
      if (!formData.variations || formData.variations.length === 0) {
        return false;
      }

      // Check that each variation has both size and color, and a valid stock
      return formData.variations.every(
        (v) =>
          !!v.size && 
          !!v.color && 
          typeof v.stock === "number" &&
          v.stock >= 0
      );
    case 3:
      // At least one image is required
      return (
        (formData.images?.length > 0 || formData.imageUrls?.length > 0) &&
        !errors.images
      );
    case 4:
      // For the review step, make the validation conditional on hasVariations
      const baseValidation = 
        !!formData.category &&
        !!formData.name &&
        !!formData.price &&
        !errors.price &&
        ((formData.images && formData.images.length > 0) ||
         (formData.imageUrls && formData.imageUrls.length > 0));
         
      // Only check variations if hasVariations is true
      if (formData.hasVariations) {
        return baseValidation && 
               formData.variations && 
               formData.variations.length > 0 &&
               formData.variations.every(
                 v => !!v.size && !!v.color && typeof v.stock === "number" && v.stock >= 0
               );
      }
      
      return baseValidation;
    default:
      return false;
  }
};

// Update the handleSubmit function to properly handle the form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // If hasVariations is false, make sure variations is an empty array
  if (!formData.hasVariations) {
    setValue("variations", []);
  }
  
  // Now we can submit the form
  await submit(e);
};
  // If modal is not open, render nothing but ensure hooks are called
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm md:items-center">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: open ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative flex h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-background shadow-xl md:h-[85vh] md:max-h-[700px] md:w-[95vw] md:max-w-2xl md:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with swipe indicator for mobile */}
        <div className="sticky top-0 z-10 bg-background">
          <div className="flex justify-center py-2 md:hidden">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/30"></div>
          </div>
          <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPreviousStep}
                  className="h-9 w-9 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <h2 className="text-lg font-semibold">Add Product</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-9 w-9 rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Progress indicator - simplified for mobile */}
        <div className="sticky top-[60px] z-10 border-b bg-background px-4 py-2 md:px-6">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
            {steps.map((step, index) => (
              <div
                key={step.id}
                // onClick={() => setCurrentStep(index)}
                className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-2 border-primary bg-background text-foreground"
                    : "border border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-3 w-3" />
                ) : (
                  index + 1
                )}
                <span className="sr-only">{step.title}</span>
              </div>
            ))}
          </div>
          <p className="mt-1 text-center text-xs font-medium text-muted-foreground md:hidden">
            {steps[currentStep].title}
          </p>
        </div>

        {/* Form content with swipe gestures */}
        <ScrollArea className="flex-1">
          <form onSubmit={submit}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.3 }}
                className="h-full p-4 md:p-6"
              >
                {/* Step 1: Category - Improved mobile layout */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="category">Product Category</Label>
                      <Select
                        {...register("category")}
                        onValueChange={(value) => setValue("category", value)}
                        defaultValue={formData.category}
                      >
                        <SelectTrigger id="category" className="h-12 text-base">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="z-[200]">
                          <SelectItem value="skincare" className="text-base">
                            Skincare
                          </SelectItem>
                          <SelectItem value="haircare" className="text-base">
                            Hair Care
                          </SelectItem>
                          <SelectItem value="bodycare" className="text-base">
                            Body Care
                          </SelectItem>
                          <SelectItem value="makeup" className="text-base">
                            Makeup
                          </SelectItem>
                          <SelectItem value="fragrance" className="text-base">
                            Fragrance
                          </SelectItem>
                          <SelectItem value="accessories" className="text-base">
                            Accessories
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.category && (
                      <div className="rounded-xl border bg-muted/30 p-4">
                        <h3 className="mb-3 text-sm font-medium">
                          Category Requirements
                        </h3>
                        <ul className="space-y-3">
                          {(categoryRequirements as Record<string, string[]>)[
                            formData.category
                          ]?.map((req, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Details - Optimized input sizes */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="e.g. Shea Butter Moisturizer"
                        maxLength={100}
                        className="h-12 text-base"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description">Description</Label>
                      <div className="relative">
                        <Textarea
                          id="description"
                          {...register("description")}
                          placeholder="Describe your product..."
                          className="min-h-[120px] text-base"
                          maxLength={1000}
                        />
                        {/* Character counter */}
                        <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                          {formData.description?.length || 0}/1000
                        </div>
                      </div>
                      {errors.description && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="price">Price (₦)</Label>
                        <Input
                          id="price"
                          type="number"
                          min="1"
                          {...register("price")}
                          placeholder="0.00"
                          className="h-12 text-base"
                        />
                        {errors.price && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="weight">Weight (g)</Label>
                        <Input
                          id="weight"
                          type="number"
                          {...register("weight")}
                          placeholder="e.g. 250"
                          className="h-12 text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Dimensions (cm)</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <Input
                          placeholder="Length"
                          {...register("dimensions.length")}
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="Width"
                          {...register("dimensions.width")}
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="Height"
                          {...register("dimensions.height")}
                          className="h-12 text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags?.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1 text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="rounded-full p-0.5 hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add tag"
                          maxLength={20}
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addTag()}
                          className="h-12 flex-1 text-base"
                        />
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={addTag}
                          className="h-12"
                          type="button"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Variations - Mobile-friendly cards */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                      <div className="flex items-center gap-3">
                        <Switch
                          id="hasVariations"
                          checked={formData.hasVariations}
                          onCheckedChange={(checked) =>
                            setValue("hasVariations", checked)
                          }
                        />
                        <Label htmlFor="hasVariations" className="font-medium">
                          Multiple Variations
                        </Label>
                      </div>
                      {formData.hasVariations && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addVariation}
                          className="h-9"
                          type="button"
                        >
                          <Plus className="mr-1 h-4 w-4" /> Add
                        </Button>
                      )}
                    </div>

                    {!formData.hasVariations ? (
                      <div className="rounded-xl border bg-muted/30 p-4 text-center">
                        <p className="text-muted-foreground">
                          This product will be managed as a single item.
                        </p>
                      </div>
                    ) : (formData.variations?.length || 0) === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 p-8 text-center">
                        <ImageIcon className="mb-3 h-8 w-8 text-muted-foreground" />
                        <p className="mb-3 font-medium">No variations added</p>
                        <Button onClick={addVariation} type="button">
                          <Plus className="mr-2 h-4 w-4" /> Add First Variation
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formData.variations?.map((variation, index) => (
                          <div
                            key={variation.id}
                            className="rounded-xl border bg-muted/30 p-4"
                          >
                            <div className="mb-4 flex items-center justify-between">
                              <h3 className="font-medium">
                                Variation {index + 1}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeVariation(index)}
                                className="text-destructive hover:text-destructive/80"
                                type="button"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="space-y-3">
                                <Label htmlFor={`size-${index}`}>Size</Label>
                                <Input
                                  id={`size-${index}`}
                                  placeholder="e.g. Small, 250ml"
                                  value={variation.size || ""}
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "size",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 text-base"
                                />
                              </div>
                              <div className="space-y-3">
                                <Label htmlFor={`color-${index}`}>Color</Label>
                                <Input
                                  id={`color-${index}`}
                                  placeholder="e.g. Red, #FF0000"
                                  value={variation.color || ""}
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "color",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 text-base"
                                />
                              </div>

                              <div className="space-y-3">
                                <Label htmlFor={`stock-${index}`}>Stock</Label>
                                <Input
                                  id={`stock-${index}`}
                                  type="number"
                                  placeholder="0"
                                  value={variation.stock}
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "stock",
                                      Number(e.target.value) || 0
                                    )
                                  }
                                  className="h-12 text-base"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Media - Improved drag and drop */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Product Images</Label>
                      <p className="text-sm text-muted-foreground">
                        Max 5 images (5MB each) - JPG, PNG only
                      </p>
                      <div
                        ref={dropAreaRef}
                        className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center transition-colors hover:border-primary hover:bg-muted/50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg, image/png"
                          multiple
                          className="hidden"
                          onChange={handleFileInputChange}
                        />
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">Drag & drop images here</p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse files
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          className="mt-2"
                          type="button"
                        >
                          Select Images
                        </Button>
                      </div>
                    </div>

                    {(formData.imageUrls?.length || 0) > 0 && (
                      <div className="space-y-3">
                        <Label>
                          Uploaded Images ({formData.imageUrls?.length})
                        </Label>
                        <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                          {formData.imageUrls?.map((url, index) => (
                            <div
                              key={index}
                              className="group relative aspect-square overflow-hidden rounded-lg"
                            >
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                type="button"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Step 5: Review - Summary cards */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">
                        Review Your Product
                      </h3>
                      <p className="text-muted-foreground">
                        Check all details before submitting. You can go back to
                        edit any section.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl border bg-muted/30 p-5">
                        <h4 className="mb-3 text-sm font-medium">
                          Basic Information
                        </h4>
                        <div className="grid gap-4 grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Name
                            </p>
                            <p className="font-medium">
                              {formData.name || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Category
                            </p>
                            <p className="font-medium capitalize">
                              {formData.category || "-"}
                            </p>
                          </div>
                          <div className="col-span-2 w-full">
                            {" "}
                            {/* Span full width on medium+ screens */}
                            <div className="rounded-xl border bg-muted/30 w-full p-5">
                              <h4 className="mb-3 text-sm font-medium">
                                Description
                              </h4>
                              <ScrollArea className="h-[200px] w-full rounded-md border p-2">
                                <p className="text-muted-foreground whitespace-pre-line break-words">
                                  {formData.description ||
                                    "No description provided"}
                                </p>
                              </ScrollArea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border bg-muted/30 p-5">
                        <h4 className="mb-3 text-sm font-medium">
                          Pricing & Inventory
                        </h4>
                        <div className="grid gap-4 grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Price
                            </p>
                            <p className="font-medium">
                              ₦{formData.price || "0.00"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Weight
                            </p>
                            <p className="font-medium">
                              {formData.weight ? `${formData.weight}g` : "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {formData.hasVariations &&
                        (formData.variations?.length || 0) > 0 && (
                          <div className="rounded-xl border bg-muted/30 p-5">
                            <h4 className="mb-3 text-sm font-medium">
                              Variations ({formData.variations?.length})
                            </h4>
                            <div className="space-y-3">
                              {formData.variations?.map((variation, index) => (
                                <div
                                  key={variation.id}
                                  className="rounded-lg border p-3"
                                >
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">
                                        Variation
                                      </p>
                                      <p className="font-medium">
                                        {variation.size || variation.color
                                          ? [variation.size, variation.color]
                                              .filter(Boolean)
                                              .join(" / ")
                                          : `Variation ${index + 1}`}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-sm text-muted-foreground">
                                        Stock
                                      </p>
                                      <p className="font-medium">
                                        {variation.stock}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">
                                        Price
                                      </p>
                                      <p className="font-medium">
                                        ₦
                                        {variation.price ||
                                          formData.price ||
                                          "0.00"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {(formData.imageUrls?.length || 0) > 0 && (
                        <div className="rounded-xl border bg-muted/30 p-5">
                          <h4 className="mb-3 text-sm font-medium">
                            Images ({formData.imageUrls?.length})
                          </h4>
                          <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                            {formData.imageUrls?.map((url, index) => (
                              <div
                                key={index}
                                className="aspect-square overflow-hidden rounded-lg"
                              >
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </ScrollArea>

        {/* Footer with floating action on mobile */}
        <div className="sticky bottom-0 border-t bg-background/95 p-4 backdrop-blur-sm md:p-6">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => goToPreviousStep()}
              className=""
              type="button"
            >
              Back
            </Button>
            <div className="flex items-center gap-3">
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={goToNextStep}
                  disabled={!isStepValid()}
                  className="flex-1 md:flex-none"
                  type="button"
                >
                  Continue <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 md:flex-none"
                   type="button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper data for category requirements
const categoryRequirements = {
  skincare: [
    "Include skin type compatibility",
    "List key ingredients",
    "Specify product volume/weight",
  ],
  haircare: [
    "Include hair type compatibility",
    "List key ingredients",
    "Specify product volume",
  ],
  bodycare: [
    "Include product volume/weight",
    "List key ingredients",
    "Specify usage instructions",
  ],
  makeup: [
    "Include shades/variants",
    "List key ingredients",
    "Specify product weight",
  ],
  fragrance: [
    "Include scent notes",
    "Specify bottle size",
    "Indicate concentration",
  ],
  accessories: [
    "Include dimensions",
    "Specify materials used",
    "Add color variations",
  ],
};
