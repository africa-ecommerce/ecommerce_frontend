

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ProductItem {
  id: string
  name: string
  price: number
  color?: string
  size?: string
  originalPrice?: number
  quantity: number
  image: string
  variationId?: string
  variationName?: string
  supplierId?: string
}

interface PickupLocation {
  latitude: number
  longitude: number
}

interface OrderProduct {
  item: ProductItem // Changed from items array to single item
  subtotal: number
  total: number
 
  referralId: string | null
  platform: string | null
  pickupLocation?: PickupLocation
  deliveryFee?: number
}

interface ProductStore {
  orderSummaries: OrderProduct[]
  setOrderSummaries: (summaries: OrderProduct[]) => void
  addOrderSummary: (summary: OrderProduct) => void
  clearOrderSummaries: () => void
  updateDeliveryFee: (fee: number, orderIndex?: number) => void
  addProductToOrder: (
    product: ProductItem,
   
    referralId: string | null,
    platform: string | null,
    pickupLocation?: PickupLocation,
  ) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      orderSummaries: [],

      setOrderSummaries: (summaries) =>
        set({
          orderSummaries: summaries,
        }),

      addOrderSummary: (summary) =>
        set((state) => ({
          orderSummaries: [...state.orderSummaries, summary],
        })),

      clearOrderSummaries: () =>
        set({
          orderSummaries: [],
        }),

      updateDeliveryFee: (fee, orderIndex) => {
        const state = get();
        const targetIndex = orderIndex ?? 0;

        if (state.orderSummaries[targetIndex]) {
          const updatedSummaries = [...state.orderSummaries];
          const currentSummary = updatedSummaries[targetIndex];

          const updatedSummary = {
            ...currentSummary,
            deliveryFee: fee,
            total: currentSummary.subtotal + fee,
          };

          updatedSummaries[targetIndex] = updatedSummary;

          set({
            orderSummaries: updatedSummaries,
          });
        }
      },

      addProductToOrder: (
        product,
       
        referralId,
        platform,
        pickupLocation
      ) => {
        const subtotal = product.price * product.quantity;
        const defaultDeliveryFee = 0;
        const total = subtotal + defaultDeliveryFee;

        const orderProduct: OrderProduct = {
          item: product, // Single item instead of array
          subtotal,
          total,
         
          referralId,
          platform,
          pickupLocation,
          deliveryFee: defaultDeliveryFee,
        };

        set((state) => ({
          orderSummaries: [...state.orderSummaries, orderProduct],
        }));
      },
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
