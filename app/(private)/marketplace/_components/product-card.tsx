"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookmarkPlus,
  Heart,
  Info,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn, truncateText } from "@/lib/utils";
import Image from "next/image";
import { Product } from "@/types/product";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";
import { useUser } from "@/app/_components/provider/UserContext";

interface ProductCardProps {
  product: any;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { items, addItem } = useShoppingCart();

  const { userData: {user} } = useUser();
  console.log("p", user)


  // Check if product is already in cart
  const isInCart = items.some((item) => item.id === product.id);

  // Format the sales count with proper handling for 0 and 99+
  const formatCount = (count: number): string => {
    if (count === 0) return "0";
    if (count > 99) return "99+";
    return count.toLocaleString();
  };

  // Handle image carousel effect
  useEffect(() => {
    // Only set up the carousel if there are multiple images
    if (!product?.images || product.images.length === 0) return;
    if (product?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === product?.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [product?.images]);

  const handleAddToStore = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click when clicking the button
    e.stopPropagation(); // Stop event propagation

    if (isInCart) return; // Don't add if already in cart

    setIsAdding(true);

    // Create cart item from product
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "/placeholder.svg",
    };

    // Add item to cart after a short delay to show loading state
    setTimeout(() => {
      addItem(cartItem, false); // Pass false to prevent opening the cart
      setIsAdding(false);
    }, 800);
  };

  return (
    <TooltipProvider>
      <Link href={`/marketplace/product/${product?.id}`}>
        <Card
          className={cn(
            "overflow-hidden transition-all hover:shadow-md group relative border-muted cursor-pointer",
            "w-full max-w-[350px] mx-auto h-full flex flex-col", // Fixed height and flex column
            className
          )}
        >
          {/* Product Image with Badges */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {product?.images && product.images.length > 0 && (
              <div className="relative h-full w-full">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product?.name} - image ${index + 1}`}
                    className={`h-full w-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    width={350}
                    height={350}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-3 md:space-y-2 space-y-1 flex-1 flex flex-col">
            {/* Title */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-xs leading-tight md:text-base capitalize truncate max-w-full">
                {product?.name}
              </h3>
            </div>

            {/* Category and Sales */}
            <div className="flex items-center text-xs text-muted-foreground flex-wrap gap-x-1">
              <div className="flex items-center">
                <ShoppingBag className="mr-0.5 h-3 w-3" />
                <span className="truncate">
                  {formatCount(product?.sales || 0)} sold
                </span>
              </div>
            </div>

            {/* Price and Competition */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-semibold md:text-base">
                  ₦{product?.price?.toLocaleString()}
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Users className="h-3 w-3 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs">
                      {formatCount(product?.plugsCount || 0)}{" "}
                      {product?.plugsCount === 1 ? "plug" : "plugs"}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs">
                    Number of Plugs selling this product
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Supplier Info */}
            

            {/* Action Buttons - Push to bottom with flex spacer */}

            {user?.userType === "PLUG" && (
              <div className="mt-auto pt-2">
                <Button
                  className={`w-full h-8 sm:h-9 ${
                    isInCart
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ""
                  }`}
                  onClick={handleAddToStore}
                  disabled={isAdding || isInCart || product?.isPlugged}
                  aria-live="polite"
                >
                  {isAdding ? (
                    <span className="animate-pulse">Adding...</span>
                  ) : isInCart || product?.isPlugged ? (
                    <>
                      <Package className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Add to Store</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </Link>
    </TooltipProvider>
  );
}
