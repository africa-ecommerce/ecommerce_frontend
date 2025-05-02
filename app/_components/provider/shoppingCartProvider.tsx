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

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ShoppingCartContextType {
  items: CartItem[];
  itemCount: number;

  addItem: (item: CartItem, openCart?: boolean) => void;
  removeItem: (itemId: string) => void;

  clearCart: () => void;
  openCart: () => void;
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
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const pathname = usePathname();

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
        // Add new item to cart
        return [...prevItems, newItem];
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

  const clearCart = () => {
    setItems([]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // const handleConfirm = () => {

  //

  // };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/plug/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });

      const result = await response.json();

      if (!response.ok) {
        errorToast(result.error);
        return null;
      }

      successToast(result.message);
      setIsConfirmMode(false);
      setIsOpen(false);
      mutate("/api/plug/products/");
      return result;
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      return null;
    }
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
        // totalPrice,
        addItem,
        removeItem,
        // updateQuantity,
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
                            <h4 className="font-medium">{item.name}</h4>
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
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)}
                          </p>
                          <div className="">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <SheetFooter className="border-t pt-4 sticky bottom-0 bg-background pb-4">
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Items</span>
                      <span className="font-medium">
                        {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </span>
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
                      <Button className="w-full gap-1" onClick={handleSubmit}>
                        <Check className="h-4 w-4" />
                        Confirm
                      </Button>
                    </div>
                  </div>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        </Sheet>
      )}
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
