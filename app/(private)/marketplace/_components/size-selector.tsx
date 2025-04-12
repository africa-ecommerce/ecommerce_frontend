"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface SizeOption {
  value: string
  label: string
  available: boolean
  tooltip?: string
}

interface SizeSelectorProps {
  sizes: SizeOption[]
  value?: string | null
  onChange: (size: string) => void
  className?: string
  showSizeGuide?: boolean
  onSizeGuideClick?: () => void
}

export function SizeSelector({
  sizes,
  value = null,
  onChange,
  className,
  showSizeGuide = true,
  onSizeGuideClick,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(value)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Auto-select first available size if none selected
    if (!selectedSize && sizes.length > 0) {
      const firstAvailable = sizes.find(size => size.available)
      if (firstAvailable) {
        setSelectedSize(firstAvailable.value)
        onChange(firstAvailable.value)
      }
    }
  }, [sizes, selectedSize, onChange])

  const handleSizeChange = (size: SizeOption) => {
    if (!size.available) return
    setSelectedSize(size.value)
    onChange(size.value)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium flex items-center gap-2">
            Select Size
            {isMobile && showSizeGuide && (
              <button 
                onClick={onSizeGuideClick}
                className="text-muted-foreground"
              >
                <Info className="h-4 w-4" />
              </button>
            )}
          </h3>
          
          {!isMobile && showSizeGuide && (
            <Button 
              variant="link" 
              className="h-auto p-0 text-xs text-primary"
              onClick={onSizeGuideClick}
            >
              Size Guide
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Tooltip key={size.value}>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "min-w-[3.5rem] h-12 px-3 rounded-md border text-sm font-medium transition-all",
                    "flex items-center justify-center",
                    selectedSize === size.value
                      ? "border-2 border-primary bg-primary/10 text-primary"
                      : "border",
                    !size.available
                      ? "cursor-not-allowed opacity-50 border-dashed"
                      : "hover:border-gray-400 hover:bg-accent",
                    isMobile ? "text-sm" : "text-base"
                  )}
                  onClick={() => handleSizeChange(size)}
                  disabled={!size.available}
                  aria-label={`Size ${size.label}${!size.available ? ' - Out of stock' : ''}`}
                >
                  {size.label}
                </button>
              </TooltipTrigger>
              {(size.tooltip || !size.available) && (
                <TooltipContent side="top" className="max-w-[200px]">
                  <p className="text-sm">
                    {!size.available 
                      ? 'Out of stock' 
                      : size.tooltip || `Size ${size.label}`
                    }
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>

        {/* Mobile size guide button */}
        {isMobile && showSizeGuide && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={onSizeGuideClick}
          >
            View Size Guide
          </Button>
        )}
      </div>
    </TooltipProvider>
  )
}