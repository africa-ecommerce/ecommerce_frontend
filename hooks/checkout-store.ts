import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CustomerInfo {
  name: string
  email: string
  phone: string
}

interface CustomerAddress {
  streetAddress: string
  state: string
  lga: string
  directions?: string
}

interface CheckoutData {
  customerInfo: CustomerInfo
  customerAddress: CustomerAddress
  deliveryMethod: "standard" | "express" | "pickup"
  paymentMethod: "online" | "cash"
  deliveryInstructions?: string
  currentStep: "delivery" | "review"
}

interface CheckoutStore {
  checkoutData: CheckoutData
  setCustomerInfo: (info: Partial<CustomerInfo>) => void
  setCustomerAddress: (address: Partial<CustomerAddress>) => void
  setDeliveryMethod: (method: "standard" | "express" | "pickup") => void
  setPaymentMethod: (method: "online" | "cash") => void
  setDeliveryInstructions: (instructions: string) => void
  setCurrentStep: (step: "delivery" | "review") => void
  updateCheckoutData: (data: Partial<CheckoutData>) => void
  clearCheckoutData: () => void
  getCheckoutData: () => CheckoutData
}

const defaultCheckoutData: CheckoutData = {
  customerInfo: {
    name: "",
    email: "",
    phone: "",
  },
  customerAddress: {
    streetAddress: "",
    state: "",
    lga: "",
    directions: "",
  },
  deliveryMethod: "standard",
  paymentMethod: "online",
  deliveryInstructions: "",
  currentStep: "delivery",
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      checkoutData: defaultCheckoutData,

      setCustomerInfo: (info) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            customerInfo: { ...state.checkoutData.customerInfo, ...info },
          },
        })),

      setCustomerAddress: (address) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            customerAddress: { ...state.checkoutData.customerAddress, ...address },
          },
        })),

      setDeliveryMethod: (method) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            deliveryMethod: method,
          },
        })),

      setPaymentMethod: (method) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            paymentMethod: method,
          },
        })),

      setDeliveryInstructions: (instructions) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            deliveryInstructions: instructions,
          },
        })),

      setCurrentStep: (step) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            currentStep: step,
          },
        })),

      updateCheckoutData: (data) =>
        set((state) => ({
          checkoutData: { ...state.checkoutData, ...data },
        })),

      clearCheckoutData: () => set({ checkoutData: defaultCheckoutData }),

      getCheckoutData: () => get().checkoutData,
    }),
    {
      name: "checkout-store",
      storage: createJSONStorage(() => localStorage), // Changed from sessionStorage to localStorage
    }
  )
)