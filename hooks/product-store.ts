



// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface ProductItem {
//   id: string;
//   name: string;
//   price: number;
//   color?: string;
//   size?: string;
//   originalPrice?: number; // Added originalPrice
//   quantity: number;
//   image: string;
//   variationId?: string;
//   variationName?: string;
//   supplierId?: string; // Added supplierId
// }

// interface PickupLocation {
//   latitude: number;
//   longitude: number;
 
// }

// interface OrderSummary {
//   items: ProductItem[];
//   subtotal: number;
//   total: number;
//   productId: string;
//   referralId: string | null;
//   platform: string | null;
//   pickupLocation?: PickupLocation;
//   deliveryFee?: number; // Add optional delivery fee
// }

// interface ProductStore {
//   orderSummary: OrderSummary | null;
//   setOrderSummary: (summary: OrderSummary) => void;
//   clearOrderSummary: () => void;
//   updateDeliveryFee: (fee: number) => void; // Add method to update delivery fee
//   addProductToOrder: (
//     product: ProductItem,
//     productId: string,
//     referralId: string | null,
//     platform: string | null,
//     pickupLocation?: PickupLocation
//   ) => void;
// }

// export const useProductStore = create<ProductStore>()(
//   persist(
//     (set, get) => ({
//       orderSummary: null,

//       setOrderSummary: (summary) => set({ orderSummary: summary }),

//       clearOrderSummary: () => set({ orderSummary: null }),

//       updateDeliveryFee: (fee) => {
//         const currentSummary = get().orderSummary;
//         if (currentSummary) {
//           const updatedSummary = {
//             ...currentSummary,
//             deliveryFee: fee,
//             total: currentSummary.subtotal + fee,
//           };
//           set({ orderSummary: updatedSummary });
//         }
//       },

//       addProductToOrder: (
//         product,
//         productId,
//         referralId,
//         platform,
//         pickupLocation
//       ) => {
//         const subtotal = product.price * product.quantity;
//         // Don't add delivery fee here - let it be calculated dynamically
//         // or set a default that can be updated later
//         const defaultDeliveryFee = 0; // This can be updated via updateDeliveryFee
//         const total = subtotal + defaultDeliveryFee;

//         const orderSummary: OrderSummary = {
//           items: [product],
//           subtotal,
//           total,
//           productId,
//           referralId,
//           platform,
//           pickupLocation,
//           deliveryFee: defaultDeliveryFee, // Store the delivery fee separately
//         };

//         set({ orderSummary });
//       },
//     }),
//     {
//       name: "product-store",
//     }
//   )
// );









// Updated product-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
  originalPrice?: number;
  quantity: number;
  image: string;
  variationId?: string;
  variationName?: string;
  supplierId?: string;
}

interface PickupLocation {
  latitude: number;
  longitude: number;
}

interface OrderSummary {
  items: ProductItem[];
  subtotal: number;
  total: number;
  productId: string;
  referralId: string | null;
  platform: string | null;
  pickupLocation?: PickupLocation;
  deliveryFee?: number;
}

interface ProductStore {
  orderSummaries: OrderSummary[]; // Changed from single orderSummary to array
  setOrderSummaries: (summaries: OrderSummary[]) => void;
  clearOrderSummaries: () => void;
  updateDeliveryFeeForOrder: (orderIndex: number, fee: number) => void;
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
      orderSummaries: [],

      setOrderSummaries: (summaries) => set({ orderSummaries: summaries }),

      clearOrderSummaries: () => set({ orderSummaries: [] }),

      updateDeliveryFeeForOrder: (orderIndex, fee) => {
        const currentSummaries = get().orderSummaries;
        if (currentSummaries[orderIndex]) {
          const updatedSummaries = [...currentSummaries];
          updatedSummaries[orderIndex] = {
            ...updatedSummaries[orderIndex],
            deliveryFee: fee,
            total: updatedSummaries[orderIndex].subtotal + fee,
          };
          set({ orderSummaries: updatedSummaries });
        }
      },

      addProductToOrder: (
        product,
        productId,
        referralId,
        platform,
        pickupLocation
      ) => {
        const subtotal = product.price * product.quantity;
        const defaultDeliveryFee = 0;
        const total = subtotal + defaultDeliveryFee;

        const orderSummary: OrderSummary = {
          items: [product],
          subtotal,
          total,
          productId,
          referralId,
          platform,
          pickupLocation,
          deliveryFee: defaultDeliveryFee,
        };

        const currentSummaries = get().orderSummaries;
        set({ orderSummaries: [...currentSummaries, orderSummary] });
      },
    }),
    {
      name: "product-store",
    }
  )
);