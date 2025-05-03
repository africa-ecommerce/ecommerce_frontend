"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Package,
  Check,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useFormResolver } from "@/hooks/useFormResolver";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { mutate } from "swr";
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { truncateText } from "@/lib/utils";
import { useCreateResource } from "@/hooks/resourceManagement/useCreateResources";
import { z } from "zod";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  sellingPrice?: number;
  profit?: number;
}

interface ShoppingCartContextType {
  items: CartItem[];
  itemCount: number;
  totalProfit: number;

  addItem: (item: CartItem, openCart?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateItemPrice: (itemId: string, sellingPrice: number) => void;

  clearCart: () => void;
  openCart: () => void;
}

interface PriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (price: number, profit: number) => void;
  minPrice: number;
  itemId: string;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
  excludePaths?: string[];
  exclude?: boolean;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export function ShoppingCartProvider({
  children,
  excludePaths = [],
  exclude,
}: ShoppingCartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [openAddPrice, setOpenAddPrice] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  // Check if current path should be excluded
  const shouldShowCart = !excludePaths.some((path) => {
    // Support exact matches and wildcard patterns (e.g., "/checkout/*")
    if (path.endsWith("/*")) {
      const basePath = path.slice(0, -2);
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });

  const itemCount = items.length;
  
  // Calculate total profit across all items
  const totalProfit = items.reduce((sum, item) => sum + (item.profit || 0), 0);

  // Function to explicitly open the cart
  const openCart = () => {
    setIsOpen(true);
  };

  // Modified addItem to accept an openCart parameter that defaults to false
  const addItem = (newItem: CartItem, openCart = false) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        // updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item to cart with initial profit of 0
        return [...prevItems, { ...newItem, profit: 0 }];
      }
    });

    // Only open cart if explicitly requested
    if (openCart) {
      setIsOpen(true);
    }
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemPrice = (itemId: string, sellingPrice: number) => {
    setItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id === itemId) {
          const profit = sellingPrice - item.price;
          return { ...item, sellingPrice, profit };
        }
        return item;
      })
    );
  };




   const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Transform items to include user's price and product ID
      const products = items.map(item => ({
        id: item.id,
        price: item.sellingPrice || item.price,
      }));

      console.log("items",JSON.stringify(products))

       
      const response = await fetch("/api/plug/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });

      const result = await response.json();

      if (!response.ok) {
        errorToast(result.error);
        return null;
      }

      successToast(result.message);
     localStorage.removeItem("cartItems")
      setItems([]);
      setIsOpen(false);
      mutate("/api/plug/products/");
      return result;
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      return null;
    }
    finally{
      setIsLoading(false)
    }
  };

  

  const clearCart = () => {
    localStorage.removeItem("cartItems")
    setItems([]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

 

  const handlePriceModalOpen = (itemId: string) => {
    setSelectedItemId(itemId);
    setOpenAddPrice(true);
  };

  const handlePriceSubmit = (price: number, profit: number) => {
    updateItemPrice(selectedItemId, price);
  };

  // Use effect to persist cart items in localStorage
  useEffect(() => {
    // Load cart items from localStorage on initial render
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Failed to parse stored cart items:", error);
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  return (
    <ShoppingCartContext.Provider
      value={{
        items,
        itemCount,
        totalProfit,
        addItem,
        removeItem,
        updateItemPrice,
        clearCart,
        openCart,
      }}
    >
      {children}

      {shouldShowCart && !exclude && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-24 md:bottom-12 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Package className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md flex flex-col">
            <SheetHeader>
              <SheetTitle>Selected Products ({itemCount})</SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-1">
                  No products selected
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse the marketplace to add products to your store
                </p>
                <SheetClose asChild>
                  <Button>Browse Products</Button>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.id}`}
                        className="flex gap-4 border-b pb-4"
                      >
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium capitalize">
                              {truncateText(item.name)}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Cost Price: {formatPrice(item.price)}
                            </p>

                            {item.sellingPrice ? (
                              <div className="flex flex-col">
                                <p className="text-sm font-medium">
                                  Selling Price:{" "}
                                  {formatPrice(item.sellingPrice)}
                                </p>
                                <p className="text-sm text-green-600">
                                  Profit: {formatPrice(item.profit || 0)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-amber-600">
                                Profit: {formatPrice(0)}
                              </p>
                            )}
                          </div>

                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => handlePriceModalOpen(item.id)}
                            >
                              {item.sellingPrice ? (
                                <Pencil className="h-3 w-3 mr-1" />
                              ) : null}
                              {item.sellingPrice ? "Edit Price" : "Add Price"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <SheetFooter className="border-t pt-4 sticky bottom-0 bg-background pb-4">
                  <div className="space-y-4 w-full">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Total Items
                        </span>
                        <span className="font-medium">
                          {itemCount} item{itemCount !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Total Profit
                        </span>
                        <span className="font-medium text-green-600">
                          {formatPrice(totalProfit)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full gap-1"
                        onClick={clearCart}
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                      </Button>
                      <Button
                        className="w-full gap-1"
                        disabled={isLoading}
                        onClick={handleSubmit}
                      >
                        <Check className="h-4 w-4" />
                        {isLoading ? "Submitting.." : "Confirm"}
                      </Button>
                    </div>
                  </div>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        </Sheet>
      )}

      {/* Price Modal - Now connected to selected item */}
      <PriceModal
        open={openAddPrice}
        onOpenChange={setOpenAddPrice}
        onSubmit={handlePriceSubmit}
        minPrice={items.find((item) => item.id === selectedItemId)?.price || 0}
        itemId={selectedItemId}
      />
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}


function PriceModal({
  open,
  onOpenChange,
  onSubmit,
  minPrice,
  itemId,
}: PriceModalProps) {
  const [price, setPrice] = useState<string>("");
  const [profit, setProfit] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  // Calculate profit whenever price changes
  useEffect(() => {
    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    // Validate minimum price
    if (touched) {
      if (!price) {
        setError("Please enter a price");
      } else if (numericPrice < minPrice) {
        setError(`Price must be at least ₦${minPrice.toLocaleString()}`);
      } else {
        setError(null);
        setProfit(numericPrice - minPrice);
      }
    }
  }, [price, touched, minPrice]);

  // Format price with commas as thousands separators
  const formatPrice = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Format with commas
    if (numericValue) {
      const parts = numericValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return numericValue;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setPrice(formatPrice(rawValue));
    if (!touched) setTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number.parseFloat(price.replace(/,/g, "")) || 0;

    if (!price || numericPrice < minPrice) {
      setTouched(true);
      return;
    }

    onSubmit(numericPrice, profit);

    // Reset form
    setPrice("");
    setProfit(0);
    setTouched(false);
    onOpenChange(false);
  };

  // Reset form when modal opens with a different item
  useEffect(() => {
    if (open) {
      setPrice("");
      setProfit(0);
      setTouched(false);
      setError(null);
    }
  }, [open, itemId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Price</DialogTitle>
          <DialogDescription>
            Set a price for your product. Minimum price is ₦
            {minPrice.toLocaleString()}.
          </DialogDescription>
         
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (NGN)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₦
                </span>
                <Input
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                  className={cn(
                    "pl-7",
                    error ? "border-red-500 focus-visible:ring-red-500" : ""
                  )}
                  placeholder="0.00"
                  aria-invalid={!!error}
                  aria-describedby={error ? "price-error" : undefined}
                />
              </div>
              {error && (
                <p
                  id="price-error"
                  className="text-sm font-medium text-red-500"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                Profit Calculation
              </div>
              <div className="flex items-center">
                <span className="font-medium">
                  ₦
                  {profit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Price</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}