"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR, { mutate as globalMutate } from "swr";
import {
  X,
  Package,
  Users,
  ShoppingBag,
  CheckCircle,
  UserPlus,
  UserMinus,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { useUser } from "@/app/_components/provider/UserContext";
import { formatPrice, getTotalStock, truncateText } from "@/lib/utils";
import { ProductImageGallery } from "../../_components/product-image-gallery";
import { ProductSpecifications } from "../../_components/product-specifications";
import { PlugReviews } from "../../_components/plug-reviews";


// Fetcher function for useSWR
const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  const { data } = await res.json();
  return data;
};

// Product Skeleton Loading Component
const ProductSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Gallery Skeleton */}
      <div className="relative overflow-hidden rounded-lg">
        <Skeleton className="aspect-square w-full" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-md" />
        ))}
      </div>

      {/* Product Info Skeletons */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-7 w-3/4 mb-2" />
          <div className="flex items-center gap-2 mt-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Supplier Skeleton */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery & Stock Skeleton */}
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
}

export function ProductDetailsModal({
  isOpen,
  onClose,
  productId,
}: ProductDetailsModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { items, addItem } = useShoppingCart();
  const {
    userData: { user },
  } = useUser();

  // Use SWR for data fetching with caching
  // const {
  //   data: product,
  //   error,
  //   isLoading,
  // } = useSWR(productId ? `/api/products/${productId}` : null, fetcher, {
  //   revalidateOnFocus: false,
  //   revalidateIfStale: false,
  //   dedupingInterval: 600000,
  //   shouldRetryOnError: false,
  // });

  const hasValidId = typeof productId === "string" && productId.trim().length > 0;

const {
  data: product,
  error,
  isLoading,
} = useSWR(hasValidId ? `/api/products/${productId}` : null, fetcher, {
  revalidateOnFocus: false,
  revalidateIfStale: false,
  dedupingInterval: 600000,
  shouldRetryOnError: false,
});


  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const isInCart = items.some((item) => item.id === product?.id);

  const handleAddToStore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) return;

    setIsAdding(true);

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "/placeholder.svg",
      minPrice: product.minPrice,
      maxPrice: product.maxPrice,
    };

    setTimeout(() => {
      addItem(cartItem, false);
      setIsAdding(false);
    }, 800);
  };

  const handleSubscriptionToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.supplierId) return;

    setIsSubscribing(true);

    const isCurrentlySubscribed = product.isSubscribedToSupplier;
    const url = `/api/subscribe/${encodeURIComponent(product.supplierId)}`;
    const method = isCurrentlySubscribed ? "DELETE" : "POST";

    // Optimistic update
    globalMutate(
      `/api/products/${productId}`,
      (current: any) => {
        if (!current) return current;
        return {
          ...current,
          data: {
            ...current.data,
            isSubscribedToSupplier: !isCurrentlySubscribed,
          },
        };
      },
      false
    );

    try {
      const response = await fetch(url, { method });
      if (!response.ok) {
        throw new Error("Subscription request failed");
      }

      globalMutate(`/api/products/${productId}`);
      globalMutate("/api/subscribe/plug");
      globalMutate("/api/subscribe/supplier");
    } catch (error) {
      console.error("Subscription error:", error);
      globalMutate(`/api/products/${productId}`);
    } finally {
      setIsSubscribing(false);
    }
  };

  const formatPlural = (count: number, singular: string, plural: string) => {
    return count === 1 ? `1 ${singular}` : `${count} ${plural}`;
  };

  const fulfillmentRate = 100;
  const getFulfillmentRateDescription = (rate: number) => {
    if (rate >= 85) return "Excellent";
    if (rate >= 70) return "Very Good";
    if (rate >= 60) return "Good";
    if (rate >= 45) return "Fair";
    return "Poor";
  };

  const getFulfillmentRateColor = (rate: number) => {
    if (rate >= 60) return "text-green-600";
    if (rate >= 45) return "text-yellow-600";
    return "text-red-600";
  };

  const formattedDescription = product?.description
    ? product.description.charAt(0).toUpperCase() + product.description.slice(1)
    : "";

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariantsMobile = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariantsDesktop = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      y: 20,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  if (!isOpen || !hasValidId) return null;


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal - Mobile */}
          <motion.div
            variants={modalVariantsMobile}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 150 || velocity.y > 500) {
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl md:hidden"
            style={{ height: "75vh" }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Close Button */}

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto pb-24 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {isLoading ? (
                <ProductSkeleton />
              ) : error ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-destructive mb-4">Error loading product</p>
                  <Button onClick={onClose} variant="outline">
                    Close
                  </Button>
                </div>
              ) : product ? (
                <div className="space-y-4 px-4 pb-4">
                  {/* Product Images */}
                  <ProductImageGallery images={product?.images} />

                  {product?.trending && (
                    <Badge
                      className="bg-primary text-primary-foreground"
                      variant="secondary"
                    >
                      Trending
                    </Badge>
                  )}

                  {/* Product Info */}
                  <div>
                    <div className="flex items-start justify-between">
                      <h2 className="text-sm md:text-lg font-bold capitalize">
                        {truncateText(product?.name)}
                      </h2>
                      <div className="font-semibold">
                        {formatPrice(product?.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                        {product?.sold >= 100
                          ? "99+"
                          : `${product?.sold || 0}`}{" "}
                        sold
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3.5 w-3.5" />
                        <span className="text-muted-foreground">
                          {formatPlural(
                            product?.plugsCount || 0,
                            "plug",
                            "plugs"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Supplier Info */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage
                            src={product?.supplier?.image || "/placeholder.svg"}
                            alt={product?.supplier?.businessName}
                          />
                          <AvatarFallback className="capitalize">
                            {getInitials(product?.supplier?.businessName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs md:text-sm capitalize break-words">
                            {product?.supplier?.businessName}
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground capitalize">
                            {product?.supplier?.pickupLocation.lga},{" "}
                            {product?.supplier?.pickupLocation.state}
                          </div>
                        </div>

                        {user?.userType === "PLUG" && product?.supplierId && (
                          <div className="flex-shrink-0">
                            <Button
                              variant={
                                product?.isSubscribedToSupplier
                                  ? "outline"
                                  : "default"
                              }
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={handleSubscriptionToggle}
                              disabled={isSubscribing}
                            >
                              {isSubscribing ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : product?.isSubscribedToSupplier ? (
                                <>
                                  <UserMinus className="h-3 w-3 mr-1" />
                                  Unsubscribe
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Subscribe
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery & Stock Info */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-xs md:text-sm font-medium">
                            Stock
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Available
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm">
                        {formatPlural(
                          getTotalStock(product) || 0,
                          "unit",
                          "units"
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-xs md:text-sm font-medium">
                            Fulfillment Rate
                          </div>
                          <div
                            className={`text-xs font-medium ${getFulfillmentRateColor(
                              fulfillmentRate
                            )}`}
                          >
                            {getFulfillmentRateDescription(fulfillmentRate)}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm">
                        {fulfillmentRate}%
                      </div>
                    </div>
                  </div>

                  {/* Fulfillment Rate Description */}
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p>
                      <span className="font-medium">Fulfillment Rate:</span> The
                      percentage of orders successfully delivered without
                      returns or issues.
                    </p>
                  </div>

                  {/* Product Details Tabs */}
                  <Tabs defaultValue="description" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="specifications">Details</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-4 space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          About this product
                        </h3>
                        <div className="text-sm prose prose-sm max-w-full">
                          <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere capitalize">
                            {formattedDescription ||
                              "No description available."}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-4">
                      <ProductSpecifications product={product} />
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-4">
                      <PlugReviews reviews={product?.reviews || []} />
                    </TabsContent>
                  </Tabs>
                </div>
              ) : null}
            </div>

            {/* Sticky Add to Store Button */}
            {/* {product && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                <Button
                  onClick={handleAddToStore}
                  disabled={isAdding || isInCart}
                  className="w-full"
                  size="lg"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : isInCart ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      In Your Picks
                    </>
                  ) : (
                    "Add to Store"
                  )}
                </Button>
              </div>
            )} */}
          </motion.div>

          {/* Modal - Desktop */}
        <div className="hidden md:fixed md:inset-0 md:z-50 md:flex md:justify-center md:items-center">
  <motion.div
    variants={modalVariantsDesktop}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-background rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative"
  >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-muted transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {isLoading ? (
                <ProductSkeleton />
              ) : error ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-destructive mb-4">Error loading product</p>
                  <Button onClick={onClose} variant="outline">
                    Close
                  </Button>
                </div>
              ) : product ? (
                <div className="space-y-4 p-6 pb-24">
                  {/* Product Images */}
                  <ProductImageGallery images={product?.images} />

                  {product?.trending && (
                    <Badge
                      className="bg-primary text-primary-foreground"
                      variant="secondary"
                    >
                      Trending
                    </Badge>
                  )}

                  {/* Product Info */}
                  <div>
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-bold capitalize">
                        {truncateText(product?.name)}
                      </h2>
                      <div className="font-semibold">
                        {formatPrice(product?.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                        {product?.sold >= 100
                          ? "99+"
                          : `${product?.sold || 0}`}{" "}
                        sold
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3.5 w-3.5" />
                        <span className="text-muted-foreground">
                          {formatPlural(
                            product?.plugsCount || 0,
                            "plug",
                            "plugs"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Supplier Info */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage
                            src={product?.supplier?.image || "/placeholder.svg"}
                            alt={product?.supplier?.businessName}
                          />
                          <AvatarFallback className="capitalize">
                            {getInitials(product?.supplier?.businessName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm capitalize break-words">
                            {product?.supplier?.businessName}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {product?.supplier?.pickupLocation.lga},{" "}
                            {product?.supplier?.pickupLocation.state}
                          </div>
                        </div>

                        {user?.userType === "PLUG" && product?.supplierId && (
                          <div className="flex-shrink-0">
                            <Button
                              variant={
                                product?.isSubscribedToSupplier
                                  ? "outline"
                                  : "default"
                              }
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={handleSubscriptionToggle}
                              disabled={isSubscribing}
                            >
                              {isSubscribing ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : product?.isSubscribedToSupplier ? (
                                <>
                                  <UserMinus className="h-3 w-3 mr-1" />
                                  Unsubscribe
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Subscribe
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery & Stock Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Stock</div>
                          <div className="text-xs text-muted-foreground">
                            Available
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm">
                        {formatPlural(
                          getTotalStock(product) || 0,
                          "unit",
                          "units"
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            Fulfillment Rate
                          </div>
                          <div
                            className={`text-xs font-medium ${getFulfillmentRateColor(
                              fulfillmentRate
                            )}`}
                          >
                            {getFulfillmentRateDescription(fulfillmentRate)}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm">
                        {fulfillmentRate}%
                      </div>
                    </div>
                  </div>

                  {/* Fulfillment Rate Description */}
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p>
                      <span className="font-medium">Fulfillment Rate:</span> The
                      percentage of orders successfully delivered without
                      returns or issues.
                    </p>
                  </div>

                  {/* Product Details Tabs */}
                  <Tabs defaultValue="description" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="specifications">Details</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-4 space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          About this product
                        </h3>
                        <div className="text-sm prose prose-sm max-w-full">
                          <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere capitalize">
                            {formattedDescription ||
                              "No description available."}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-4">
                      <ProductSpecifications product={product} />
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-4">
                      <PlugReviews reviews={product?.reviews || []} />
                    </TabsContent>
                  </Tabs>
                </div>
              ) : null}
            </div>

            {/* Sticky Add to Store Button */}
            {/* {product && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t rounded-b-3xl">
                <Button
                  onClick={handleAddToStore}
                  disabled={isAdding || isInCart}
                  className="w-full"
                  size="lg"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : isInCart ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      In Your Picks
                    </>
                  ) : (
                    "Add to Store"
                  )}
                </Button>
              </div>
            )} */}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
