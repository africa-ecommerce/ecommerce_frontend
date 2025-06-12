




// components/filter-sheet.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { PRODUCT_CATEGORIES } from "@/app/constant";
import { Filter, Star } from "lucide-react";
import { ProductsFilter } from "@/hooks/use-products";
import { useState, useEffect } from "react";

interface FilterSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ProductsFilter;
  onPriceChange: (value: [number, number]) => void;
  onToggleCategory: (category: string) => void;
  onToggleRating: (rating: number) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

export const FilterSheet = ({
  isOpen,
  onOpenChange,
  filters,
  onPriceChange,
  onToggleCategory,
  onToggleRating,
  onResetFilters,
  onApplyFilters,
}: FilterSheetProps) => {
  const [minPrice, setMinPrice] = useState(filters.priceRange[0].toString());
  const [maxPrice, setMaxPrice] = useState(filters.priceRange[1].toString());

  // Update local state when filters change
  useEffect(() => {
    setMinPrice(filters.priceRange[0].toString());
    setMaxPrice(filters.priceRange[1].toString());
  }, [filters.priceRange]);

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    const numValue = parseInt(value.replace(/,/g, '')) || 1000;
    if (numValue >= 1000 && numValue <= filters.priceRange[1]) {
      onPriceChange([numValue, filters.priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    const numValue = parseInt(value.replace(/,/g, '')) || 9999999;
    if (numValue <= 9999999 && numValue >= filters.priceRange[0]) {
      onPriceChange([filters.priceRange[0], numValue]);
    }
  };

  const formatPriceInput = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    return isNaN(numValue) ? '' : numValue.toLocaleString();
  };

  const handleMinPriceBlur = () => {
    const formatted = formatPriceInput(minPrice);
    setMinPrice(formatted);
  };

  const handleMaxPriceBlur = () => {
    const formatted = formatPriceInput(maxPrice);
    setMaxPrice(formatted);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] z-[200]">
        <SheetHeader className="m-4">
          <SheetTitle className="flex items-center justify-between">
            <span>Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-sm"
            >
              Reset
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-medium mb-4">Price Range</h3>
            
            {/* Price Input Fields */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="space-y-2">
                <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                  Min Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    ₦
                  </span>
                  <Input
                    id="min-price"
                    value={minPrice}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                    onBlur={handleMinPriceBlur}
                    placeholder="1,000"
                    className="pl-8 text-sm h-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                  Max Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    ₦
                  </span>
                  <Input
                    id="max-price"
                    value={maxPrice}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                    onBlur={handleMaxPriceBlur}
                    placeholder="9,999,999"
                    className="pl-8 text-sm h-9"
                  />
                </div>
              </div>
            </div>

            {/* Price Slider */}
            <div className="px-2">
              <div className="mb-2">
                <Label className="text-xs text-muted-foreground">Or use slider</Label>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={onPriceChange}
                max={9999999}
                min={1000}
                step={25000}
                minStepsBetweenThumbs={1}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₦{filters.priceRange[0].toLocaleString()}</span>
                <span>₦{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Categories Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`cat-${category.value}`}
                    checked={filters.selectedCategories.includes(
                      category.value
                    )}
                    onCheckedChange={() => onToggleCategory(category.value)}
                  />
                  <Label htmlFor={`cat-${category.value}`} className="text-sm">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Ratings Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.selectedRatings.includes(rating)}
                    onCheckedChange={() => onToggleRating(rating)}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm flex items-center"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    {rating === 5 ? "" : " & up"}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Apply Button */}
          <Button className="w-full" onClick={onApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};