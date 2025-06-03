



import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Added originalPrice
  quantity: number;
  image: string;
  variationId?: string;
  variationName?: string;
  seller?: string;
  supplierId?: string; // Added supplierId
}

interface PickupLocation {
  latitude: number;
  longitude: number;
  direction?: string; // Added direction
  state?: string; // Added state
  lga?: string; // Added lga
  streetAddress?: string; // Added streetAddress
}

interface OrderSummary {
  items: ProductItem[];
  subtotal: number;
  total: number;
  productId: string;
  referralId: string | null;
  platform: string | null;
  pickupLocation?: PickupLocation;
}

interface ProductStore {
  orderSummary: OrderSummary | null;
  setOrderSummary: (summary: OrderSummary) => void;
  clearOrderSummary: () => void;
  addProductToOrder: (
    product: ProductItem,
    productId: string,
    referralId: string | null,
    platform: string | null,
    pickupLocation?: PickupLocation
  ) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      orderSummary: null,

      setOrderSummary: (summary) => set({ orderSummary: summary }),

      clearOrderSummary: () => set({ orderSummary: null }),

      addProductToOrder: (
        product,
        productId,
        referralId,
        platform,
        pickupLocation
      ) => {
        const deliveryFee = 1500;
        const subtotal = product.price * product.quantity;
        const total = subtotal + deliveryFee;

        const orderSummary: OrderSummary = {
          items: [product],
          subtotal,
          total,
          productId,
          referralId,
          platform,
          pickupLocation,
        };

        set({ orderSummary });
      },
    }),
    {
      name: "product-store",
    }
  )
);