"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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

import useSWR from "swr";
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
import { PRODUCT_CATEGORIES } from "@/app/constant";


interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

interface Variation {
  id: string;
  price: number;
  stock: number;
  size?: string;
  color?: string;
  weight?: number;
  dimensions?: Dimensions;
  [key: string]: any; // This adds an index signature
}

export function EditProductModal({
  open,
  onOpenChange,
  productId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch product data when modal opens
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to fetch product");
    }
    return res.json();
  };

  const {
    data: initialData,
    error,
    isLoading,
  } = useSWR(open && productId ? `/api/products/${productId}` : null, fetcher);

  // Handle error
  useEffect(() => {
    if (error) {
      errorToast(error.message || "Failed to fetch product");
      onOpenChange(false);
    }
  }, [error, onOpenChange]);

  const updateProduct = async (data: ProductFormData) => {
    try {
      const formData = new FormData();

      // Append the images
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });

      // Append all other form data as JSON
      const { images, imageUrls, ...jsonData } = data;
      formData.append("productData", JSON.stringify(jsonData));

      // Send with FormData
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        errorToast(result.error);
        return null;
      }

      successToast("Product updated successfully");
      // Trigger revalidation of the product list
      mutate("/api/products/supplier/");
      return result.data;
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      return null;
    }
  };

  const {
    form: { register, submit, errors, setValue, isSubmitting, watch, reset },
  } = useFormResolver<ProductFormData>(
    updateProduct,
    productFormSchema,
    () => {
      onOpenChange(false);
      setCurrentStep(0);
      mutate("/api/products/supplier/");
    },
    initialData?.data || {
      hasVariations: false,
      variations: [],
      images: [],
      imageUrls: [],
    }
  );
  useEffect(() => {
    if (initialData?.data && !isInitialized) {
      const formattedData = {
        ...initialData.data,
        imageUrls:
          initialData.data.imageUrls ||
          (initialData.data.images && Array.isArray(initialData.data.images)
            ? initialData.data.images
            : []),
        images: [],
      };

      // Reset the form with the formatted data
      reset(formattedData);

      // Handle category initialization
      if (initialData.data.category) {
        // Force set the category value
        setValue("category", initialData.data.category);

        // Find and set the display label
        const categoryOption = PRODUCT_CATEGORIES.find(
          (c) => c.value === initialData.data.category
        );

        if (categoryOption) {
          setSelectedCategoryLabel(categoryOption.label);
        } else {
          setSelectedCategoryLabel(initialData.data.category);
        }
      }

      setIsInitialized(true);
    }
  }, [initialData, reset, setValue, isInitialized]);

  useEffect(() => {
    if (!open) {
      setIsInitialized(false);
    }
  }, [open]);

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
  }, [open, formData.images, formData.imageUrls]);

  const handleFiles = (files: FileList) => {
    const currentImages = formData.images || [];
    const currentImageUrls = formData.imageUrls || [];

    const newFiles = Array.from(files).filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 5 * 1024 * 1024 // 5MB
    );

    if (newFiles.length === 0) {
      errorToast("Only JPG/PNG images under 5MB allowed");
      return;
    }

    // Calculate how many more images we can add
    const remainingSlots = 5 - currentImageUrls.length;

    if (remainingSlots <= 0) {
      errorToast("Maximum 5 images allowed");
      return;
    }

    // Trim to remaining slots if needed
    const trimmedNewFiles =
      remainingSlots < newFiles.length
        ? newFiles.slice(0, remainingSlots)
        : newFiles;

    // Generate object URLs for the new files
    const newImageUrls = trimmedNewFiles.map((file) =>
      URL.createObjectURL(file)
    );

    // Update the form values
    setValue("images", [...currentImages, ...trimmedNewFiles]);
    setValue("imageUrls", [...currentImageUrls, ...newImageUrls]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    const newImageUrls = [...(formData.imageUrls || [])];

    // If we're removing a URL that was initially loaded (not a new upload)
    const isInitialImage = index < newImageUrls.length - newImages.length;

    if (isInitialImage) {
      // Remove the image URL but keep track that we deleted it
      // You might want to add a tracking array for deleted images here
      newImageUrls.splice(index, 1);
      setValue("imageUrls", newImageUrls);
    } else {
      // This is a newly uploaded image
      const adjustedIndex = index - (newImageUrls.length - newImages.length);
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(newImageUrls[index]);
      // Remove from both arrays
      newImages.splice(adjustedIndex, 1);
      newImageUrls.splice(index, 1);
      setValue("images", newImages);
      setValue("imageUrls", newImageUrls);
    }
  };

  const addVariation = () => {
    const newVariation = {
      id: `var-${Date.now()}`,
      size: "",
      color: "",
      stock: formData.stock || 0,
      price: formData.price || 0,
      weight: formData.weight || undefined,
      dimensions: {
        length: formData.dimensions?.length || undefined,
        width: formData.dimensions?.width || undefined,
        height: formData.dimensions?.height || undefined,
      },
    };

    setValue("variations", [...(formData.variations || []), newVariation]);
  };

  const updateVariation = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedVariations = [...(formData.variations || [])] as Variation[];

    // Handle nested dimensions fields
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (parent === "dimensions") {
        updatedVariations[index] = {
          ...updatedVariations[index],
          dimensions: {
            ...(updatedVariations[index].dimensions || {}),
            [child]: value,
          },
        };
      }
    } else {
      updatedVariations[index] = {
        ...updatedVariations[index],
        [field]: value,
      };
    }

    setValue("variations", updatedVariations);
  };

  const removeVariation = (index: number) => {
    const updatedVariations = [...(formData.variations || [])];
    updatedVariations.splice(index, 1);

    setValue("variations", updatedVariations);
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);

      if (currentStep === 1 && formData.hasVariations) {
        setCurrentStep(3); // Skip to media step
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1);

      if (currentStep === 3 && formData.hasVariations) {
        setCurrentStep(1);
      } else {
        setCurrentStep(currentStep - 1);
      }
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
    { id: "variations", title: "Variations" },
    { id: "details", title: "Details" },
    { id: "media", title: "Media" },
    { id: "review", title: "Review" },
  ];

  const truncateName = (name: string, maxLength = 15) => {
    if (!name) return "";
    return name.length > maxLength
      ? name.substring(0, maxLength) + "..."
      : name;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          
          !!formData.name &&
          !errors.name
        );
      case 1:
        // For variations step
        if (formData.hasVariations) {
          // Check if at least one variation exists and has required fields
          return (
            formData.variations &&
            formData.variations.length > 0 &&
            formData.variations.every((v) => !!v.price && v.stock >= 1)
          );
        }
        return true; // If no variations, this step is valid
      case 2: // For single product details
        return (
          !!formData.name &&
          !!formData.price &&
          formData.stock !== undefined &&
          formData.stock >= 1 && // Improved check
          !errors.stock &&
          !errors.name &&
          !errors.price
        );
      case 3:
        // For media step
        return (
          (formData.images?.length > 0 || formData.imageUrls?.length > 0) &&
          !errors.images
        );
      case 4:
        // For the review step specifically, double-check category
        let categoryValue = formData.category;

        // If it's not properly in form state, try to get it from the rendered label
        if (!categoryValue && selectedCategoryLabel) {
          const foundCategory = PRODUCT_CATEGORIES.find(
            (c) => c.label === selectedCategoryLabel
          );
          if (foundCategory) {
            categoryValue = foundCategory.value;
          } else {
            categoryValue = selectedCategoryLabel; // Use label as fallback
          }
        }

        const baseValidation =
          !!categoryValue && // Use our enhanced category checking
          !!formData.name &&
          !!formData.price &&
          !errors.price &&
          ((formData.images && formData.images.length > 0) ||
            (formData.imageUrls && formData.imageUrls.length > 0));

        if (formData.hasVariations) {
          return (
            baseValidation &&
            formData.variations &&
            formData.variations.length > 0 &&
            formData.variations.every((v) => !!v.price && v.stock >= 1)
          );
        }

        return baseValidation;

      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.hasVariations) {
      setValue("variations", []);
    }

    if (isNaN(formData.weight!)) {
      setValue("weight", undefined);
    }

    // Make sure the category is set
    if (!formData.category) {
      errorToast("Please select a category");
      return;
    }

    // Clean up dimension NaN values
    if (formData.dimensions) {
      if (isNaN(formData.dimensions.length!)) {
        setValue("dimensions.length", undefined);
      }
      if (isNaN(formData.dimensions.width!)) {
        setValue("dimensions.width", undefined);
      }
      if (isNaN(formData.dimensions.height!)) {
        setValue("dimensions.height", undefined);
      }

      // Make sure the form data is correctly structured before submission
      // If there are no new images, but there are imageUrls, use those
      if (
        (formData.images?.length || 0) === 0 &&
        (formData.imageUrls?.length || 0) > 0
      ) {
        setValue("images", formData.images);
      }

      await submit(e);
    }
  };
  if (!open) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

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
              <h2 className="text-lg font-semibold">Edit Product</h2>
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

        {/* Progress indicator */}
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

        {/* Form content */}
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
                {/* Step 1: Category */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="category">Product Category</Label>

                      <Select
                        value={formData.category || ""}
                        onValueChange={(value) => {
                          setValue("category", value);

                          const categoryOption = PRODUCT_CATEGORIES.find(
                            (c) => c.value === value
                          );
                          if (categoryOption) {
                            setSelectedCategoryLabel(categoryOption.label);
                          }
                        }}
                      >
                        <SelectTrigger id="category" className="h-12 text-base">
                          {selectedCategoryLabel ? (
                            <span>{selectedCategoryLabel}</span>
                          ) : (
                            <SelectValue placeholder="Select a category" />
                          )}
                        </SelectTrigger>
                        <SelectContent className="z-[200]">
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

                    {formData.category && (
                      <div className="rounded-xl border bg-muted/30 p-4">
                        <h3 className="mb-3 text-sm font-medium">
                          Category Recommendations
                        </h3>
                        <ul className="space-y-3">
                          {(
                            categoryRecommendations as Record<string, string[]>
                          )[formData.category]?.map((req, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

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
                      <p className="text-xs text-muted-foreground">
                        {formData.name?.length || 0}/100 (Long names will be
                        truncated in display)
                      </p>
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
                  </div>
                )}

                {/* Step 2: Variations */}
                {currentStep === 1 && (
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
                          This product will be managed as a single item with no
                          variations.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          You'll be able to set stock in the next step.
                        </p>
                      </div>
                    ) : (formData.variations?.length || 0) === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 p-8 text-center">
                        <ImageIcon className="mb-3 h-8 w-8 text-muted-foreground" />
                        <p className="mb-3 font-medium">No variations added</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add variations with different sizes, colors, prices,
                          and stock levels.
                        </p>
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
                                <Label htmlFor={`size-${index}`}>Size *</Label>
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
                                <Label htmlFor={`color-${index}`}>
                                  Color *
                                </Label>
                                <Input
                                  id={`color-${index}`}
                                  placeholder="e.g. Red"
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
                                <Label htmlFor={`price-${index}`}>
                                  Price (₦) *
                                </Label>
                                <Input
                                  id={`price-${index}`}
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="0.00"
                                  value={variation.price || ""}
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "price",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-12 text-base"
                                  required
                                />
                              </div>

                              <div className="space-y-3">
                                <Label htmlFor={`stock-${index}`}>
                                  Stock *
                                </Label>
                                <Input
                                  id={`stock-${index}`}
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  value={variation.stock || ""}
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "stock",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-12 text-base"
                                  required
                                />
                              </div>

                              <div className="space-y-3">
                                <Label htmlFor={`weight-${index}`}>
                                  Weight (g)
                                </Label>
                                <Input
                                  id={`weight-${index}`}
                                  type="number"
                                  min="1"
                                  placeholder="e.g. 250"
                                  value={variation.weight || ""}
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "weight",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-12 text-base"
                                />
                              </div>
                            </div>

                            <div className="mt-4 space-y-3">
                              <Label>Dimensions (inch)</Label>
                              <div className="grid grid-cols-3 gap-3">
                                <Input
                                  placeholder="Length"
                                  value={variation.dimensions?.length || ""}
                                  type="number"
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "dimensions.length",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-12 text-base"
                                />
                                <Input
                                  placeholder="Width"
                                  value={variation.dimensions?.width || ""}
                                  type="number"
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "dimensions.width",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-12 text-base"
                                />
                                <Input
                                  placeholder="Height"
                                  value={variation.dimensions?.height || ""}
                                  type="number"
                                  onChange={(e) =>
                                    updateVariation(
                                      index,
                                      "dimensions.height",
                                      Number(e.target.value)
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

                    {formData.hasVariations &&
                      formData.variations?.length > 0 && (
                        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 text-blue-800 dark:text-blue-300">
                          <div className="flex items-start gap-3">
                            <HelpCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">
                              When using variations, the general product details
                              will be skipped. Each variation must have price
                              and stock specified.
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Step 3: Single Product Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-3 text-sm font-medium">
                        Single Product Details
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        These details will apply to this product since you're
                        not using variations.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="price">Price (₦)</Label>
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          {...register("price", {
                            valueAsNumber: true, // Convert to number automatically
                          })}
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
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          min="0"
                          {...register("stock", {
                            valueAsNumber: true, // Convert to number automatically
                          })}
                          placeholder="0"
                          className="h-12 text-base"
                        />
                        {errors.stock && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.stock.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="size">Size</Label>
                        <Input
                          id="size"
                          {...register("size")}
                          placeholder="e.g. Small, 250ml"
                          className="h-12 text-base"
                        />
                        {errors.size && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.size.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="weight">Weight (g)</Label>
                        <Input
                          id="weight"
                          type="number"
                          min="0"
                          {...register("weight", {
                            valueAsNumber: true, // Convert to number automatically
                          })}
                          placeholder="e.g. 250"
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          type="text"
                          {...register("color")}
                          placeholder="e.g. Red"
                          className="h-12 text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Dimensions (inch)</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <Input
                          placeholder="Length"
                          type="number"
                          {...register("dimensions.length", {
                            valueAsNumber: true, // Convert to number automatically
                          })}
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="Width"
                          type="number"
                          {...register("dimensions.width", {
                            valueAsNumber: true, // Convert to number automatically
                          })}
                          className="h-12 text-base"
                        />
                        <Input
                          placeholder="Height"
                          type="number"
                          {...register("dimensions.height", {
                            valueAsNumber: true, // Convert to number automatically
                          })}
                          className="h-12 text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Media */}
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

                {/* Step 5: Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">
                        Review Your Changes
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
                            <p className="font-medium truncate capitalize">
                              {truncateName(formData.name) || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Category
                            </p>
                            <p className="font-medium capitalize">
                              {selectedCategoryLabel ||
                                formData.category ||
                                "-"}
                            </p>
                          </div>
                          <div className="col-span-2 w-full">
                            <div className="rounded-xl border bg-muted/30 w-full p-5">
                              <h4 className="mb-3 text-sm font-medium">
                                Description
                              </h4>
                              <ScrollArea className="h-[150px] w-full rounded-md border p-2">
                                <p className="text-muted-foreground whitespace-pre-line capitalize break-words">
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
                          Pricing & Specifications
                        </h4>
                        <div className="grid gap-4 grid-cols-2">
                          {!formData.hasVariations && (
                            <>
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
                                  Stock
                                </p>
                                <p className="font-medium">
                                  {formData.stock || "0"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Color
                                </p>
                                <p className="font-medium capitalize ">
                                  {formData.color || "-"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Weight
                                </p>
                                <p className="font-medium">
                                  {formData.weight
                                    ? `${formData.weight}g`
                                    : "-"}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">
                                  Dimensions
                                </p>
                                <p className="font-medium">
                                  {formData.dimensions?.length ||
                                  formData.dimensions?.width ||
                                  formData.dimensions?.height
                                    ? `${
                                        formData.dimensions?.length || "-"
                                      } × ${
                                        formData.dimensions?.width || "-"
                                      } × ${
                                        formData.dimensions?.height || "-"
                                      } (inch)`
                                    : "-"}
                                </p>
                              </div>
                            </>
                          )}
                          {formData.hasVariations && (
                            <div className="col-span-2 text-sm text-muted-foreground italic">
                              Product is managed with variations. See details
                              below.
                            </div>
                          )}
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
                                        Price
                                      </p>
                                      <p className="font-medium">
                                        ₦
                                        {variation.price ||
                                          formData.price ||
                                          "0.00"}
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
                                        Weight
                                      </p>
                                      <p className="font-medium">
                                        {variation.weight
                                          ? `${variation.weight}g`
                                          : "-"}
                                      </p>
                                    </div>
                                    <div className="col-span-2">
                                      <p className="text-sm text-muted-foreground">
                                        Dimensions
                                      </p>
                                      <p className="font-medium">
                                        {variation.dimensions?.length ||
                                        variation.dimensions?.width ||
                                        variation.dimensions?.height
                                          ? `${
                                              variation.dimensions?.length ||
                                              "-"
                                            } × ${
                                              variation.dimensions?.width || "-"
                                            } × ${
                                              variation.dimensions?.height ||
                                              "-"
                                            } (inch)`
                                          : "-"}
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

        {/* Footer with action buttons */}
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
                  onClick={(e) => handleSubmit(e)} // Ensure event is passed
                  disabled={isSubmitting || !isStepValid()}
                  className="flex-1 md:flex-none"
                  type="button" // Change to "button" to avoid double submission
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Product"
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

const categoryRecommendations = {
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
