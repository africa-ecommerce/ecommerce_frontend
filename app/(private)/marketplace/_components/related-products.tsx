"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface RelatedProductsProps {
  title: string;
  products: Product[];
  className?: string;
}

export function RelatedProducts({
  title,
  products,
  className,
}: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <div className="relative">
        {showLeftButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background shadow-md"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          onScroll={handleScroll}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/marketplace/product/${product.id}`}
              className="flex-shrink-0 w-[180px] snap-start"
            >
              <div className="rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {product.category}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center text-xs">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showRightButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background shadow-md"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </div>
  );
}
