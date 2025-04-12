"use client"

import { useState } from "react"
import { ChevronRight, LineChart, TrendingUp, ChevronDown } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MarketInsightsCard() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="bg-primary/5 border-primary/20 hover:shadow-sm transition-shadow">
      <CardContent className="p-4 space-y-4 sm:p-6 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 p-2">
              <LineChart className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            </div>
            <h3 className="font-medium text-base sm:text-lg">Market Insights</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs sm:text-sm sm:h-9 sm:px-3"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse insights" : "Expand insights"}
          >
            {expanded ? (
              <>
                <span>Show Less</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Insights Content */}
        <div className="space-y-4 sm:space-y-5">
          {/* Top Selling Category */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-muted-foreground">Top Selling Category</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">Skincare</span>
                <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                  #1
                </Badge>
              </div>
            </div>
            <Progress 
              value={65} 
              className="h-2 sm:h-[6px]" 
              // indicatorClassName="bg-primary"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground sm:text-sm">
              <span>65% of your total sales</span>
              <span className="text-primary font-medium">+12% from last month</span>
            </div>
          </div>

          {/* Expanded Content */}
          {expanded && (
            <div className="space-y-4 sm:space-y-5 border-t pt-4">
              {/* Fastest Growing */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Fastest Growing</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Hair Care</span>
                    <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Rising
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={28} 
                  className="h-2 sm:h-[6px]" 
                  // indicatorClassName="bg-green-500"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground sm:text-sm">
                  <span>Growth rate</span>
                  <span className="text-green-600 font-medium flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> 
                    28% this month
                  </span>
                </div>
              </div>

              {/* Market Gap */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Market Gap</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Eco-Friendly</span>
                    <Badge variant="secondary" className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800">
                      Opportunity
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={85} 
                  className="h-2 sm:h-[6px]" 
                  // indicatorClassName="bg-yellow-500"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground sm:text-sm">
                  <span>Demand vs. Supply</span>
                  <span className="text-yellow-600 font-medium">
                    High demand, low competition
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Full Report Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-sm sm:text-base sm:h-10"
          asChild
        >
          <Link href="/marketplace/insights">
            View Full Report <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}