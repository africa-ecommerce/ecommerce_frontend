"use client"

import { useState } from "react"
import Link from "next/link"
import { BookmarkPlus, Heart, Info, Plus, ShoppingBag, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  category: string
  supplierPrice: number
  recommendedPrice: number
  profit: number
  profitMargin: number
  rating: number
  reviews: number
  sales: number
  marketFitScore: number
  trending: boolean
  stock: number
  image: string
  supplier: {
    id: string
    name: string
    rating: number
    fulfillmentRate: number
    responseTime: string
    image: string
  }
  plugsCount: number
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleAddToStore = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click when clicking the button
    e.stopPropagation(); // Stop event propagation
    
    setIsAdding(true)
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false)
      setIsAdded(true)
      // Reset after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    }, 800)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved)
  }

  const navigateToProduct = () => {
    window.location.href = `/dashboard/marketplace/product/${product.id}`;
  }

  return (
    <TooltipProvider>
      <Card 
        className={cn(
          "overflow-hidden transition-all hover:shadow-md group relative border-muted cursor-pointer",
          "w-full max-w-[300px] mx-auto h-full flex flex-col", // Fixed height and flex column
          className
        )}
        onClick={navigateToProduct}
      >
        {/* Product Image with Badges */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
            width={300}
            height={300}
          />
          {product.trending && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground" variant="secondary">
              Trending
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="p-3 md:space-y-2 space-y-1  flex-1 flex flex-col">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-xs leading-tight md:text-base truncate max-w-full">
              {product.name}
            </h3>
          </div>

          {/* Category and Sales */}
          <div className="flex items-center text-xs text-muted-foreground flex-wrap gap-x-1">
            <div className="flex items-center">
              <ShoppingBag className="mr-0.5 h-3 w-3" />
              <span className="truncate">{product.sales.toLocaleString()} sold</span>
            </div>
          </div>

          {/* Price and Competition */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs font-semibold md:text-base">
                ₦{product.recommendedPrice.toLocaleString()}
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
                    {product.plugsCount} {product.plugsCount === 1 ? 'plug' : 'plugs'}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" onClick={(e) => e.stopPropagation()}>
                <p className="text-xs">Number of Plugs selling this product</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Supplier Info */}
          <div className="flex items-center gap-1 pt-1">
            <Avatar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0">
              <AvatarImage 
                src={product.supplier.image || "/placeholder.svg"} 
                alt={product.supplier.name} 
              />
              <AvatarFallback>
                {product.supplier.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs sm:text-sm truncate max-w-[calc(100%-24px)]">
              {product.supplier.name}
            </span>
          </div>

          {/* Action Buttons - Push to bottom with flex spacer */}
          <div className="mt-auto pt-2">
            <Button 
              className="w-full h-8 sm:h-9" 
              onClick={handleAddToStore} 
              disabled={isAdding || isAdded}
              aria-live="polite"
            >
              {isAdding ? (
                <span className="animate-pulse">Adding...</span>
              ) : isAdded ? (
                <span className="text-green-500">✓ Added</span>
              ) : (
                <>
                  <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> 
                  <span className="text-xs sm:text-sm">Add to Store</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  )
}