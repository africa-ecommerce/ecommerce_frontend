"use client";

import type React from "react";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, RefreshCw, ArrowLeft, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductStore } from "@/hooks/product-store";

interface ProductVariation {
  id: string;
  size: string;
  color: string;
  stock: number;
  productId: string;
  name?: string;
  price?: number;
}

interface SelectedVariation {
  variation: ProductVariation;
  quantity: number;
}




// Update the PickupLocation interface
interface PickupLocation {
  latitude: number;
  longitude: number;
  direction?: string; // Added
  state?: string; // Added
  lga?: string; // Added
  streetAddress?: string; // Added
}

// Update the ProductData interface
interface ProductData {
  originalId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Added
  images: string[];
  size: string;
  color: string;
  stocks: number;
  variations: ProductVariation[];
  features?: string[];
  seller?: string;
  inStock?: boolean;
  pickupLocation?: PickupLocation;
  supplierId?: string; // Added
}


interface SingleProductCartProps {
  productId?: string;
  referralId?: string;
  platform?: string;
}

export const SingleProduct = ({
  productId,
  referralId,
  platform,
}: SingleProductCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState<
    SelectedVariation[]
  >([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [notificationSignedUp, setNotificationSignedUp] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setOrderSummary, orderSummary } =
    useProductStore();

  // Get URL parameters for back navigation
  const urlProductId = searchParams.get("pid");
  const urlReferralId = searchParams.get("ref");
  const urlPlatform = searchParams.get("platform");

  // Use URL params if props are not provided
  const currentProductId = productId || urlProductId;
  const currentReferralId = referralId || urlReferralId;
  const currentPlatform = platform || urlPlatform;

  const { data, error, isLoading, mutate } = useSWR(
    currentProductId
      ? `/public/products/${currentProductId}${
          currentReferralId ? `/${currentReferralId}` : ""
        }`
      : null,
    async (url) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 404) {
        return { data: null };
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000,
    }
  );

  const productData: ProductData = data?.data || null;

  console.log("productData", productData)

  // Handle back navigation for non-store platforms

  // Handle variations logic
  const hasVariations =
    productData?.variations && productData.variations.length > 0;

  // Format variation display name
  const getVariationDisplayName = (variation: ProductVariation) => {
    if (variation.name) return variation.name;

    const parts = [];
    if (variation.size) parts.push(variation.size.toUpperCase());
    if (variation.color)
      parts.push(
        variation.color.charAt(0).toUpperCase() + variation.color.slice(1)
      );

    return parts.join(" - ") || `Variation ${variation.id}`;
  };

  // Get current stock for simple products (no variations)
  const currentStock = useMemo(() => {
    if (!hasVariations) {
      return productData?.stocks || 0;
    }
    return 0; // For products with variations, stock is managed per variation
  }, [hasVariations, productData?.stocks]);

  // Get current price for simple products
  const currentPrice = useMemo(() => {
    return productData?.price || 0;
  }, [productData?.price]);

  // Handle quantity input changes for simple products
  const handleQuantityInputChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;

    setQuantityInput(value);

    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      const validQuantity = Math.min(numValue, currentStock);
      setQuantity(validQuantity);
    } else if (value === "") {
      return;
    }
  };

  // Handle quantity input blur for simple products
  const handleQuantityInputBlur = () => {
    const numValue = Number.parseInt(quantityInput);
    if (isNaN(numValue) || numValue < 1) {
      setQuantity(1);
      setQuantityInput("1");
    } else {
      const validQuantity = Math.min(numValue, currentStock);
      setQuantity(validQuantity);
      setQuantityInput(validQuantity.toString());
    }
  };

  // Handle Enter key in quantity input for simple products
  const handleQuantityInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQuantityInputBlur();
    }
  };

  // Sync quantity input with quantity state for simple products
  useEffect(() => {
    setQuantityInput(quantity.toString());
  }, [quantity]);

  useEffect(() => {
    // Restore state from persisted order summary when component mounts
    if (
      orderSummary &&
      orderSummary.productId === currentProductId &&
      productData
    ) {
      if (hasVariations && orderSummary.items.length > 0) {
        // Restore selected variations from order summary
        const restoredVariations: SelectedVariation[] = [];

        orderSummary.items.forEach((item) => {
          if (item.variationId) {
            const variation = productData.variations?.find(
              (v) => v.id === item.variationId
            );
            if (variation) {
              restoredVariations.push({
                variation,
                quantity: item.quantity,
              });
            }
          }
        });

        if (restoredVariations.length > 0) {
          setSelectedVariations(restoredVariations);
        }
      } else if (!hasVariations && orderSummary.items.length > 0) {
        // Restore quantity for simple products
        const orderItem = orderSummary.items[0];
        if (orderItem && orderItem.id === currentProductId) {
          setQuantity(orderItem.quantity);
          setQuantityInput(orderItem.quantity.toString());
        }
      }
    }
  }, [orderSummary, currentProductId, productData, hasVariations]);

  const formatDescription = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Handle variation selection/deselection
  const handleVariationToggle = (variation: ProductVariation) => {
    setSelectedVariations((prev) => {
      const existingIndex = prev.findIndex(
        (sv) => sv.variation.id === variation.id
      );

      if (existingIndex >= 0) {
        // Remove variation if already selected
        return prev.filter((sv) => sv.variation.id !== variation.id);
      } else {
        // Add variation with quantity 1
        return [...prev, { variation, quantity: 1 }];
      }
    });
  };

  // Update quantity for a specific variation
  const updateVariationQuantity = (
    variationId: string,
    newQuantity: number
  ) => {
    setSelectedVariations((prev) =>
      prev.map((sv) => {
        if (sv.variation.id === variationId) {
          const maxQuantity = sv.variation.stock;
          const validQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
          return { ...sv, quantity: validQuantity };
        }
        return sv;
      })
    );
  };

  // Handle quantity input for variations
  const handleVariationQuantityInput = (variationId: string, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateVariationQuantity(variationId, numValue);
    } else if (value === "") {
      // Allow empty but don't update yet
      return;
    }
  };

  // Check if a variation is selected
  const isVariationSelected = (variationId: string) => {
    return selectedVariations.some((sv) => sv.variation.id === variationId);
  };

  // Get quantity for a variation
  const getVariationQuantity = (variationId: string) => {
    const selectedVar = selectedVariations.find(
      (sv) => sv.variation.id === variationId
    );
    return selectedVar?.quantity || 1;
  };

  const updateQuantity = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    const maxQuantity = currentStock;
    const validQuantity = Math.min(newQuantity, maxQuantity);
    setQuantity(validQuantity);
    setQuantityInput(validQuantity.toString());
  };

  // Calculate pricing information
  const pricing = useMemo(() => {
    if (!productData) {
      return { subtotal: 0, total: 0, items: [] };
    }

    let subtotal = 0;
    const items = [];

    if (hasVariations && selectedVariations.length > 0) {
      // Calculate for selected variations
      for (const sv of selectedVariations) {
        const price = sv.variation.price || productData.price;
        const itemTotal = price * sv.quantity;
        subtotal += itemTotal;
        items.push({
          name: getVariationDisplayName(sv.variation),
          price,
          quantity: sv.quantity,
          total: itemTotal,
        });
      }
    } else if (!hasVariations) {
      // Calculate for simple product
      subtotal = currentPrice * quantity;
      items.push({
        name: productData.name,
        price: currentPrice,
        quantity,
        total: subtotal,
      });
    }

    const total = subtotal;

    return { subtotal, total, items };
  }, [currentPrice, quantity, selectedVariations, hasVariations, productData]);

  

 
const handleCheckout = () => {
  if (!productData) return;

  // Extract pickup location from product data with all new fields
  const pickupLocation = productData.pickupLocation
    ? {
        latitude: productData.pickupLocation.latitude,
        longitude: productData.pickupLocation.longitude,
        
      }
    : undefined;

  // Store product data in Zustand
  if (hasVariations && selectedVariations.length > 0) {
    // Handle multiple variations
    const items = selectedVariations.map((sv) => ({
      id: productData.originalId,
      name: productData.name,
      price:  productData.price,
      originalPrice: productData.originalPrice, // Added
      quantity: sv.quantity,
      size: sv.variation.size,
      color: sv.variation.color,
      image: productData.images?.[0] || "/placeholder.svg",
      variationId: sv.variation.id,
      variationName: getVariationDisplayName(sv.variation),
      supplierId: productData.supplierId, // Added
    }));

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal;

    setOrderSummary({
      items,
      subtotal,
      total,
      productId: productData.originalId,
      referralId: currentReferralId,
      platform: currentPlatform,
      pickupLocation,
    });
  } else if (!hasVariations) {
    // Handle simple product
    const productItem = {
      id: productData.originalId,
      name: productData.name,
      price: currentPrice,
      size: productData.size,
      color: productData.color,
      originalPrice: productData.originalPrice, // Added
      quantity,
      image: productData.images?.[0] || "/placeholder.svg",
      supplierId: productData.supplierId, // Added
    };

    // Use setOrderSummary instead of addProductToOrder for consistency
    setOrderSummary({
      items: [productItem],
      subtotal: currentPrice * quantity,
      total: currentPrice * quantity,
      productId: productData.originalId,
      referralId: currentReferralId,
      platform: currentPlatform,
      pickupLocation,
    });
  }

  // Navigate to checkout
  let checkoutUrl = `/checkout?pid=${currentProductId}`;

  if (currentReferralId) {
    checkoutUrl += `&ref=${currentReferralId}`;
  }

  if (currentPlatform) {
    checkoutUrl += `&platform=${currentPlatform}`;
  }

  router.push(checkoutUrl);
};


  const handleWhatsAppSignup = () => {
    console.log("WhatsApp signup:", whatsappNumber);
    setNotificationSignedUp(true);
    setWhatsappNumber("");
  };

  const formatPrice = (price: number) => {
    return `₦${price?.toLocaleString()}`;
  };

  // Check if any items are out of stock
  const hasOutOfStockItems = useMemo(() => {
    if (hasVariations) {
      return selectedVariations.some((sv) => sv.variation.stock === 0);
    }
    return currentStock === 0;
  }, [hasVariations, selectedVariations, currentStock]);

  // Check if we can proceed to checkout
  const canCheckout = useMemo(() => {
    if (hasVariations) {
      return selectedVariations.length > 0 && !hasOutOfStockItems;
    }
    return currentStock > 0;
  }, [hasVariations, selectedVariations, hasOutOfStockItems, currentStock]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 w-full md:w-1/2">
                    <div className="aspect-square rounded-lg bg-muted animate-pulse mb-4"></div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-16 h-16 rounded-md bg-muted animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-muted rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-muted rounded-md w-24 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-muted rounded-md w-40 animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="h-6 bg-muted rounded-md w-1/2 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-muted rounded-md w-24 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-16 animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Technical Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md">
          <div className="mb-6 text-muted-foreground">
            <RefreshCw className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Something went wrong on our end
          </h2>
          <p className="text-muted-foreground mb-6">
            We're having trouble loading this product. Please refresh the page
            or try again in a moment.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => mutate()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md">
          <div className="mb-6 text-muted-foreground">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">
            This amazing product has been retired
          </h2>
          <p className="text-muted-foreground mb-6">
            We've moved on to even better versions of this product. Check out
            our latest collection!
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => router.push("/")} className="mx-auto">
              Explore New Arrivals
            </Button>
            <div className="text-sm text-muted-foreground">
              Want to be the first to know about new products?{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Join our newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if product is out of stock (for simple products)
  const isOutOfStock = !hasVariations && currentStock === 0;

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Back button for non-store platforms */}

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Enhanced Image Gallery */}
                  <div className="flex-shrink-0 w-full md:w-[45%]">
                    {/* Main Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
                      <Image
                        src={
                          productData.images?.[selectedImageIndex] ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={`${productData.name} - Image ${
                          selectedImageIndex + 1
                        }`}
                        fill
                        className="object-cover transition-opacity duration-300"
                        priority
                      />
                    </div>

                    {/* Thumbnail Gallery */}
                    {productData.images && productData.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {productData.images.slice(0, 3).map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-muted hover:border-muted-foreground"
                            }`}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${productData.name} thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-xl md:text-2xl font-bold capitalize">
                        {productData.name}
                      </h1>
                      {!hasVariations &&
                        currentStock > 0 &&
                        currentStock <= 5 && (
                          <Badge variant="destructive" className="ml-2">
                            Only {currentStock} left!
                          </Badge>
                        )}
                    </div>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {formatPrice(currentPrice)}
                    </p>

                    {/* Variations Selection - Multiple selection with quantities */}
                    {hasVariations && (
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Available Options (Select multiple)
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[320px] md:max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                            {productData.variations.map((variation) => {
                              const isSelected = isVariationSelected(
                                variation.id
                              );
                              const variationQuantity = getVariationQuantity(
                                variation.id
                              );

                              return (
                                <div
                                  key={variation.id}
                                  className={`border rounded-lg transition-all ${
                                    isSelected
                                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                      : "border-muted hover:border-muted-foreground"
                                  }`}
                                >
                                  <div
                                    className="p-4 cursor-pointer"
                                    onClick={() =>
                                      handleVariationToggle(variation)
                                    }
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex-1">
                                        <div className="font-medium">
                                          {getVariationDisplayName(variation)}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                          Stock: {variation.stock} available
                                          {variation.price &&
                                            variation.price !==
                                              productData.price && (
                                              <span className="ml-2 font-medium text-primary">
                                                {formatPrice(variation.price)}
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {variation.stock === 0 && (
                                          <Badge variant="destructive">
                                            Out of Stock
                                          </Badge>
                                        )}
                                        {variation.stock > 0 &&
                                          variation.stock <= 5 && (
                                            <Badge variant="secondary">
                                              Low Stock
                                            </Badge>
                                          )}
                                        <div
                                          className={`w-4 h-4 rounded border-2 transition-all ${
                                            isSelected
                                              ? "bg-primary border-primary"
                                              : "border-muted-foreground"
                                          }`}
                                        >
                                          {isSelected && (
                                            <div className="w-full h-full flex items-center justify-center">
                                              <div className="w-2 h-2 bg-white rounded-sm"></div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Quantity selector for selected variations */}
                                    {isSelected && variation.stock > 0 && (
                                      <div className="flex items-center justify-between pt-3 border-t border-muted">
                                        <div className="flex items-center space-x-2">
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 rounded-md"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              updateVariationQuantity(
                                                variation.id,
                                                variationQuantity - 1
                                              );
                                            }}
                                            disabled={variationQuantity <= 1}
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Input
                                            type="text"
                                            value={variationQuantity}
                                            onChange={(e) => {
                                              e.stopPropagation();
                                              handleVariationQuantityInput(
                                                variation.id,
                                                e.target.value
                                              );
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-14 h-7 text-center text-sm"
                                            min="1"
                                            max={variation.stock}
                                          />
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 rounded-md"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              updateVariationQuantity(
                                                variation.id,
                                                variationQuantity + 1
                                              );
                                            }}
                                            disabled={
                                              variationQuantity >=
                                              variation.stock
                                            }
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Description Dropdown */}
                    {productData.description && (
                      <div className="mb-6">
                        <button
                          onClick={() =>
                            setIsDescriptionExpanded(!isDescriptionExpanded)
                          }
                          className="flex items-center justify-between w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <span className="font-medium text-left">
                            Description
                          </span>
                          {isDescriptionExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>

                        {isDescriptionExpanded && (
                          <div className="mt-2 border border-muted rounded-lg bg-background">
                            <div className="max-h-[200px] overflow-y-auto overflow-x-hidden p-4">
                              <p className="text-muted-foreground leading-relaxed break-all word-wrap overflow-wrap-anywhere hyphens-auto text-sm">
                                {formatDescription(productData.description)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quantity and Stock for simple products */}
                    {!hasVariations && !isOutOfStock && (
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(-1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="text"
                            value={quantityInput}
                            onChange={(e) =>
                              handleQuantityInputChange(e.target.value)
                            }
                            onBlur={handleQuantityInputBlur}
                            onKeyDown={handleQuantityInputKeyDown}
                            className="w-16 h-8 text-center text-sm"
                            min="1"
                            max={currentStock}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(1)}
                            disabled={quantity >= currentStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {currentStock} available
                        </span>
                      </div>
                    )}

                    {/* Stock Status for simple products */}
                    {!hasVariations && (
                      <div className="flex items-center text-sm mb-4">
                        <span
                          className={
                            isOutOfStock
                              ? "text-red-600 font-medium"
                              : currentStock <= 5
                              ? "text-orange-600 font-medium"
                              : "text-green-600"
                          }
                        >
                          {isOutOfStock
                            ? "Currently Out of Stock"
                            : currentStock <= 5
                            ? `Only ${currentStock} left in stock`
                            : ""}
                        </span>
                      </div>
                    )}

                    {/* Out of Stock WhatsApp Signup */}
                    {isOutOfStock && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <h3 className="font-medium mb-2">
                          Good news travels fast!
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {isOutOfStock
                            ? "This popular item is temporarily sold out."
                            : "Select your preferred options above and"}{" "}
                          Drop your WhatsApp number and we'll ping you with
                          updates!
                        </p>

                        {!notificationSignedUp ? (
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Input
                                type="tel"
                                placeholder="Your WhatsApp number"
                                value={whatsappNumber}
                                onChange={(e) =>
                                  setWhatsappNumber(e.target.value)
                                }
                                className="text-sm"
                              />
                            </div>
                            <Button
                              size="sm"
                              onClick={handleWhatsAppSignup}
                              disabled={!whatsappNumber.trim()}
                              className="flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              Notify Me
                            </Button>
                          </div>
                        ) : (
                          <div className="text-sm text-green-600 font-medium">
                            ✓ You'll be notified with updates!
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">
                          We'll only use your number for notifications. No spam,
                          promise!
                        </p>
                      </div>
                    )}

                    {/* Seller Info */}
                    {productData.seller && (
                      <div className="text-sm text-muted-foreground">
                        Sold by:{" "}
                        <span className="font-medium">
                          {productData.seller}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    {/* Show selected items */}
                    {pricing.items.length > 0 ? (
                      <>
                        {pricing.items.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                              <span className="text-sm">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Quantity: {item.quantity}</span>
                              <span>{formatPrice(item.total)}</span>
                            </div>
                          </div>
                        ))}
                        <Separator className="my-3" />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>{formatPrice(pricing.subtotal)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground py-4">
                        {hasVariations
                          ? "Select options above to see pricing"
                          : !isOutOfStock
                          ? "Ready to order"
                          : "Product unavailable"}
                      </div>
                    )}

                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(pricing.total)}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                  >
                    {hasOutOfStockItems
                      ? "Some Items Out of Stock"
                      : !canCheckout
                      ? hasVariations
                        ? "Select Options Above"
                        : "Out of Stock"
                      : "Proceed to Checkout"}
                  </Button>

                  {hasVariations && selectedVariations.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Please select your preferred options above
                    </p>
                  )}

                  {hasOutOfStockItems && (
                    <p className="text-sm text-red-600 text-center mt-2">
                      Please remove out of stock items to continue
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
