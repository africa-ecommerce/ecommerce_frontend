



// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // interface ProductItem {
// //   id: string;
// //   name: string;
// //   price: number;
// //   color?: string;
// //   size?: string;
// //   originalPrice?: number; // Added originalPrice
// //   quantity: number;
// //   image: string;
// //   variationId?: string;
// //   variationName?: string;
// //   supplierId?: string; // Added supplierId
// // }

// // interface PickupLocation {
// //   latitude: number;
// //   longitude: number;
 
// // }

// // interface OrderSummary {
// //   items: ProductItem[];
// //   subtotal: number;
// //   total: number;
// //   productId: string;
// //   referralId: string | null;
// //   platform: string | null;
// //   pickupLocation?: PickupLocation;
// //   deliveryFee?: number; // Add optional delivery fee
// // }

// // interface ProductStore {
// //   orderSummary: OrderSummary | null;
// //   setOrderSummary: (summary: OrderSummary) => void;
// //   clearOrderSummary: () => void;
// //   updateDeliveryFee: (fee: number) => void; // Add method to update delivery fee
// //   addProductToOrder: (
// //     product: ProductItem,
// //     productId: string,
// //     referralId: string | null,
// //     platform: string | null,
// //     pickupLocation?: PickupLocation
// //   ) => void;
// // }

// // export const useProductStore = create<ProductStore>()(
// //   persist(
// //     (set, get) => ({
// //       orderSummary: null,

// //       setOrderSummary: (summary) => set({ orderSummary: summary }),

// //       clearOrderSummary: () => set({ orderSummary: null }),

// //       updateDeliveryFee: (fee) => {
// //         const currentSummary = get().orderSummary;
// //         if (currentSummary) {
// //           const updatedSummary = {
// //             ...currentSummary,
// //             deliveryFee: fee,
// //             total: currentSummary.subtotal + fee,
// //           };
// //           set({ orderSummary: updatedSummary });
// //         }
// //       },

// //       addProductToOrder: (
// //         product,
// //         productId,
// //         referralId,
// //         platform,
// //         pickupLocation
// //       ) => {
// //         const subtotal = product.price * product.quantity;
// //         // Don't add delivery fee here - let it be calculated dynamically
// //         // or set a default that can be updated later
// //         const defaultDeliveryFee = 0; // This can be updated via updateDeliveryFee
// //         const total = subtotal + defaultDeliveryFee;

// //         const orderSummary: OrderSummary = {
// //           items: [product],
// //           subtotal,
// //           total,
// //           productId,
// //           referralId,
// //           platform,
// //           pickupLocation,
// //           deliveryFee: defaultDeliveryFee, // Store the delivery fee separately
// //         };

// //         set({ orderSummary });
// //       },
// //     }),
// //     {
// //       name: "product-store",
// //     }
// //   )
// // );









// // // Updated product-store.ts
// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // interface ProductItem {
// //   id: string;
// //   name: string;
// //   price: number;
// //   color?: string;
// //   size?: string;
// //   originalPrice?: number;
// //   quantity: number;
// //   image: string;
// //   variationId?: string;
// //   variationName?: string;
// //   supplierId?: string;
// // }

// // interface PickupLocation {
// //   latitude: number;
// //   longitude: number;
// // }

// // interface OrderSummary {
// //   items: ProductItem[];
// //   subtotal: number;
// //   total: number;
// //   productId: string;
// //   referralId: string | null;
// //   platform: string | null;
// //   pickupLocation?: PickupLocation;
// //   deliveryFee?: number;
// // }

// // interface ProductStore {
// //   orderSummaries: OrderSummary[]; // Changed from single orderSummary to array
// //   setOrderSummaries: (summaries: OrderSummary[]) => void;
// //   clearOrderSummaries: () => void;
// //   updateDeliveryFeeForOrder: (orderIndex: number, fee: number) => void;
// //   addProductToOrder: (
// //     product: ProductItem,
// //     productId: string,
// //     referralId: string | null,
// //     platform: string | null,
// //     pickupLocation?: PickupLocation
// //   ) => void;
// // }

// // export const useProductStore = create<ProductStore>()(
// //   persist(
// //     (set, get) => ({
// //       orderSummaries: [],

// //       setOrderSummaries: (summaries) => set({ orderSummaries: summaries }),

// //       clearOrderSummaries: () => set({ orderSummaries: [] }),

// //       updateDeliveryFeeForOrder: (orderIndex, fee) => {
// //         const currentSummaries = get().orderSummaries;
// //         if (currentSummaries[orderIndex]) {
// //           const updatedSummaries = [...currentSummaries];
// //           updatedSummaries[orderIndex] = {
// //             ...updatedSummaries[orderIndex],
// //             deliveryFee: fee,
// //             total: updatedSummaries[orderIndex].subtotal + fee,
// //           };
// //           set({ orderSummaries: updatedSummaries });
// //         }
// //       },

// //       addProductToOrder: (
// //         product,
// //         productId,
// //         referralId,
// //         platform,
// //         pickupLocation
// //       ) => {
// //         const subtotal = product.price * product.quantity;
// //         const defaultDeliveryFee = 0;
// //         const total = subtotal + defaultDeliveryFee;

// //         const orderSummary: OrderSummary = {
// //           items: [product],
// //           subtotal,
// //           total,
// //           productId,
// //           referralId,
// //           platform,
// //           pickupLocation,
// //           deliveryFee: defaultDeliveryFee,
// //         };

// //         const currentSummaries = get().orderSummaries;
// //         set({ orderSummaries: [...currentSummaries, orderSummary] });
// //       },
// //     }),
// //     {
// //       name: "product-store",
// //     }
// //   )
// // );



// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface ProductItem {
//   id: string;
//   name: string;
//   price: number;
//   color?: string;
//   size?: string;
//   originalPrice?: number;
//   quantity: number;
//   image: string;
//   variationId?: string;
//   variationName?: string;
//   supplierId?: string;
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
//   deliveryFee?: number;
// }

// interface ProductStore {
//   orderSummaries: OrderSummary[];
//   currentOrderIndex: number;
//   setOrderSummaries: (summaries: OrderSummary[]) => void;
//   addOrderSummary: (summary: OrderSummary) => void;
//   setCurrentOrderIndex: (index: number) => void;
//   clearOrderSummaries: () => void;
//   updateDeliveryFee: (fee: number, orderIndex?: number) => void;

//   // Legacy support - these will work with the current order
//   orderSummary: OrderSummary | null;
//   setOrderSummary: (summary: OrderSummary) => void;
//   clearOrderSummary: () => void;
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
//       orderSummaries: [],
//       currentOrderIndex: 0,
//       orderSummary: null, // Initialize as null

//       // New methods for multiple orders
//       setOrderSummaries: (summaries) =>
//         set({
//           orderSummaries: summaries,
//           currentOrderIndex: 0,
//           orderSummary: summaries[0] || null, // Update orderSummary when setting summaries
//         }),

//       addOrderSummary: (summary) =>
//         set((state) => {
//           const newSummaries = [...state.orderSummaries, summary];
//           return {
//             orderSummaries: newSummaries,
//             orderSummary:
//               state.currentOrderIndex === 0 && state.orderSummaries.length === 0
//                 ? summary
//                 : state.orderSummary,
//           };
//         }),

//       setCurrentOrderIndex: (index) =>
//         set((state) => ({
//           currentOrderIndex: index,
//           orderSummary: state.orderSummaries[index] || null, // Update orderSummary when index changes
//         })),

//       clearOrderSummaries: () =>
//         set({
//           orderSummaries: [],
//           currentOrderIndex: 0,
//           orderSummary: null,
//         }),

//       updateDeliveryFee: (fee, orderIndex) => {
//         const state = get();
//         const targetIndex = orderIndex ?? state.currentOrderIndex;

//         if (state.orderSummaries[targetIndex]) {
//           const updatedSummaries = [...state.orderSummaries];
//           const currentSummary = updatedSummaries[targetIndex];

//           const updatedSummary = {
//             ...currentSummary,
//             deliveryFee: fee,
//             total: currentSummary.subtotal + fee,
//           };

//           updatedSummaries[targetIndex] = updatedSummary;

//           set({
//             orderSummaries: updatedSummaries,
//             orderSummary:
//               targetIndex === state.currentOrderIndex
//                 ? updatedSummary
//                 : state.orderSummary,
//           });
//         }
//       },

//       // Legacy support methods
//       setOrderSummary: (summary) => {
//         const state = get();
//         const updatedSummaries = [...state.orderSummaries];
//         updatedSummaries[state.currentOrderIndex] = summary;
//         set({
//           orderSummaries: updatedSummaries,
//           orderSummary: summary,
//         });
//       },

//       clearOrderSummary: () => {
//         const state = get();
//         const updatedSummaries = state.orderSummaries.filter(
//           (_, index) => index !== state.currentOrderIndex
//         );
//         const newCurrentIndex = Math.max(0, state.currentOrderIndex - 1);
//         set({
//           orderSummaries: updatedSummaries,
//           currentOrderIndex: newCurrentIndex,
//           orderSummary: updatedSummaries[newCurrentIndex] || null,
//         });
//       },

//       addProductToOrder: (
//         product,
//         productId,
//         referralId,
//         platform,
//         pickupLocation
//       ) => {
//         const subtotal = product.price * product.quantity;
//         const defaultDeliveryFee = 0;
//         const total = subtotal + defaultDeliveryFee;

//         const orderSummary: OrderSummary = {
//           items: [product],
//           subtotal,
//           total,
//           productId,
//           referralId,
//           platform,
//           pickupLocation,
//           deliveryFee: defaultDeliveryFee,
//         };

//         const state = get();
//         const updatedSummaries = [...state.orderSummaries];
//         updatedSummaries[state.currentOrderIndex] = orderSummary;
//         set({
//           orderSummaries: updatedSummaries,
//           orderSummary: orderSummary,
//         });
//       },
//     }),
//     {
//       name: "product-store",
//     }
//   )
// );






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
  productId: string
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
    productId: string,
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
        productId,
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
          productId,
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
