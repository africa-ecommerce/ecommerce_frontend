import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProductItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variationId?: string
  variationName?: string
  seller?: string
}

interface OrderSummary {
  items: ProductItem[]
  subtotal: number
  total: number
  productId: string
  referralId: string | null
  platform: string | null
}

interface ProductStore {
  orderSummary: OrderSummary | null
  setOrderSummary: (summary: OrderSummary) => void
  clearOrderSummary: () => void
  addProductToOrder: (product: ProductItem, productId: string, referralId: string | null, platform: string | null) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      orderSummary: null,

      setOrderSummary: (summary) => set({ orderSummary: summary }),

      clearOrderSummary: () => set({ orderSummary: null }),

      addProductToOrder: (product, productId, referralId, platform) => {
        const deliveryFee = 1500
        const subtotal = product.price * product.quantity
        const total = subtotal + deliveryFee

        const orderSummary: OrderSummary = {
          items: [product],
          subtotal,
         
          total,
          productId,
          referralId,
          platform,
        }

        set({ orderSummary })
      },
    }),
    {
      name: "product-store",
    },
  ),
)
