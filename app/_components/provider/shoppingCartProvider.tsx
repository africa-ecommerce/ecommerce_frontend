"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  measurement: string;
  quantity: number;
}

interface ShoppingCartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
  excludePaths?: string[]; // Array of paths to exclude
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export function ShoppingCartProvider({
  children,
  excludePaths = [],
}: ShoppingCartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id && item.measurement === newItem.measurement
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, newItem];
      }
    });

    // Open cart when adding items
    setIsOpen(true);
  };

  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
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
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}

      {shouldShowCart && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-24 md:bottom-12 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md flex flex-col">
            <SheetHeader>
              <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-1">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Start shopping to add items to your cart
                </p>
                <SheetClose asChild>
                  <Button>Continue Shopping</Button>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.measurement}`}
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
                            Size: {item.measurement}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease</span>
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase</span>
                              </Button>
                            </div>
                            <p className="font-medium">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <SheetFooter className="border-t pt-4">
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-sm">Calculated at checkout</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full gap-1"
                        onClick={clearCart}
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear Cart
                      </Button>
                      <Button className="w-full">Checkout</Button>
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
