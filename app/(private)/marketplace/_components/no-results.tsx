// components/no-results.tsx
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NoResultsProps {
  onReset: () => void;
}

export const NoResults = ({ onReset }: NoResultsProps) => {
  return (
    <div className="px-4 py-8 sm:px-6 text-center">
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-muted mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No products found or you have added all products within this criteria</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search or filter criteria
      </p>
      <Button onClick={onReset}>Reset Filters</Button>
    </div>
  );
};