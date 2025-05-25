// components/active-filters.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ProductsFilter } from "@/hooks/use-products";
import { PRODUCT_CATEGORIES } from "@/app/constant";

interface ActiveFiltersProps {
  filters: ProductsFilter;
  onClearSearch: () => void;
  onClearPriceRange: () => void;
  onRemoveCategory: (category: string) => void;
  onRemoveRating: (rating: number) => void;
  onResetAll: () => void;
}

export const ActiveFilters = ({
  filters,
  onClearSearch,
  onClearPriceRange,
  onRemoveCategory,
  onRemoveRating,
  onResetAll,
}: ActiveFiltersProps) => {
  const hasActiveFilters = 
    filters.search || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 9999999 || 
    filters.selectedCategories.length > 0 || 
    filters.selectedRatings.length > 0;
  
  if (!hasActiveFilters) return null;
  
  return (
    <section className="px-4 py-2 sm:px-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium">Active Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetAll}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.search && (
          <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
            Search: {filters.search}
            <X className="h-3 w-3 cursor-pointer" onClick={onClearSearch} />
          </Badge>
        )}
        
        {(filters.priceRange[0] > 0 || filters.priceRange[1] < 9999999) && (
          <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
            Price: ₦{filters.priceRange[0].toLocaleString()} - ₦{filters.priceRange[1].toLocaleString()}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={onClearPriceRange} 
            />
          </Badge>
        )}
        
        {filters.selectedCategories.map(category => {
          const categoryLabel = PRODUCT_CATEGORIES.find(c => c.value === category)?.label || category;
          return (
            <Badge key={category} variant="outline" className="flex items-center gap-1 py-1 px-2">
              {categoryLabel}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onRemoveCategory(category)} 
              />
            </Badge>
          );
        })}
        
        {filters.selectedRatings.map(rating => (
          <Badge key={rating} variant="outline" className="flex items-center gap-1 py-1 px-2">
            {rating}{rating === 5 ? "" : "+"} Stars
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onRemoveRating(rating)} 
            />
          </Badge>
        ))}
      </div>
    </section>
  );
};