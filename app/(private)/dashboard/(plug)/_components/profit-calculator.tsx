"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface ProfitCalculatorProps {
  supplierPrice: number
  recommendedPrice: number
  className?: string
}

export function ProfitCalculator({ 
  supplierPrice, 
  recommendedPrice,
  className 
}: ProfitCalculatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [customPrice, setCustomPrice] = useState(recommendedPrice)
  const [profit, setProfit] = useState(recommendedPrice - supplierPrice)
  const [margin, setMargin] = useState(Math.round((profit / recommendedPrice) * 100))

  // Calculate min, max and step values for the slider
  const minPrice = Math.round(supplierPrice * 1.1) // Minimum 10% markup
  const maxPrice = Math.round(supplierPrice * 3) // Maximum 200% markup
  const step = Math.max(1, Math.round((maxPrice - minPrice) / 100)) // 100 steps between min and max

  // Update profit and margin when custom price changes
  useEffect(() => {
    const newProfit = customPrice - supplierPrice
    setProfit(newProfit)
    setMargin(Math.round((newProfit / customPrice) * 100))
  }, [customPrice, supplierPrice])

  const handleSliderChange = (value: number[]) => {
    setCustomPrice(Math.round(value[0]))
  }

  const incrementPrice = () => {
    setCustomPrice(prev => Math.min(maxPrice, prev + step))
  }

  const decrementPrice = () => {
    setCustomPrice(prev => Math.max(minPrice, prev - step))
  }

  return (
    <div className={cn("space-y-3", className)}>
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse profit calculator" : "Expand profit calculator"}
      >
        <span className="font-medium text-sm sm:text-base">Profit Calculator</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>

      <div
        className={cn(
          "space-y-4 overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!isExpanded}
      >
        <div className="space-y-4">
          {/* Price Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground sm:text-sm">Your selling price</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  onClick={decrementPrice}
                  disabled={customPrice <= minPrice}
                  aria-label="Decrease price"
                >
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="font-medium min-w-[80px] text-center text-sm sm:text-base">
                  ₦{customPrice.toLocaleString()}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  onClick={incrementPrice}
                  disabled={customPrice >= maxPrice}
                  aria-label="Increase price"
                >
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            <Slider
              defaultValue={[recommendedPrice]}
              min={minPrice}
              max={maxPrice}
              step={step}
              value={[customPrice]}
              onValueChange={handleSliderChange}
              className="py-2"
              aria-label="Price slider"
            />
          </div>

          {/* Profit and Margin Display */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-xs text-muted-foreground sm:text-sm">Your Profit</div>
              <div className={cn(
                "font-bold text-lg sm:text-xl",
                profit > 0 ? "text-green-600" : "text-red-600"
              )}>
                {profit > 0 ? '+' : ''}₦{Math.abs(profit).toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-xs text-muted-foreground sm:text-sm">Profit Margin</div>
              <div className={cn(
                "font-bold text-lg sm:text-xl",
                margin > 0 ? "text-green-600" : "text-red-600"
              )}>
                {margin > 0 ? '+' : ''}{margin}%
              </div>
            </div>
          </div>

          {/* Price References */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">Supplier:</span>
              <span>₦{supplierPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">Recommended:</span>
              <span>₦{recommendedPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}