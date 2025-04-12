"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface Specification {
  name: string
  value: string
  tooltip?: string
}

interface ProductSpecificationsProps {
  specifications: Specification[]
  className?: string
  defaultVisibleCount?: number
}

export function ProductSpecifications({
  specifications,
  className,
  defaultVisibleCount = 4,
}: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Show only a few specs when collapsed (3 on mobile, 4 on desktop by default)
  const visibleSpecifications = isExpanded 
    ? specifications 
    : specifications.slice(0, defaultVisibleCount)
  
  const hasMoreToShow = specifications.length > defaultVisibleCount

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("space-y-3", className)}>
        <h3 className="text-lg font-semibold">Specifications</h3>

        <div className="rounded-lg border divide-y">
          {visibleSpecifications.map((spec, index) => (
            <div 
              key={`${spec.name}-${index}`} 
              className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {spec.name}
                </span>
                {spec.tooltip && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[280px] text-sm">
                      {spec.tooltip}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <span className="text-sm font-medium text-right">
                {spec.value}
              </span>
            </div>
          ))}

          {hasMoreToShow && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 py-2 h-auto rounded-none text-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show all {specifications.length} specifications
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}