import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface CustomerAddress {
  streetAddress: string;
  state: string;
  lga: string;
  directions?: string;
}

interface CheckoutData {
  customerInfo: CustomerInfo;
  customerAddress: CustomerAddress;
  deliveryMethod: "terminal" | "home";
  paymentMethod: "online" | "cash";
  deliveryInstructions?: string;
  currentStep: "delivery" | "review";
  terminalAddress?: string;
  // Add new fields for delivery options
  supplierDeliverySelections: Record<string, string>;
  supplierPaymentMethods: Record<string, "ONLINE" | "P_O_D">;
}

interface CheckoutStore {
  checkoutData: CheckoutData;
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setCustomerAddress: (address: Partial<CustomerAddress>) => void;
  setDeliveryMethod: (method: "terminal" | "home") => void;
  setPaymentMethod: (method: "online" | "cash") => void;
  setDeliveryInstructions: (instructions: string) => void;
  setCurrentStep: (step: "delivery" | "review") => void;
  updateCheckoutData: (data: Partial<CheckoutData>) => void;
  clearCheckoutData: () => void;
  getCheckoutData: () => CheckoutData;
  setTerminalAddress: (address: string) => void;
  // Add new methods for delivery options
  setSupplierDeliverySelection: (
    supplierId: string,
    locationId: string | null
  ) => void;
  setSupplierPaymentMethod: (
    supplierId: string,
    method: "ONLINE" | "P_O_D"
  ) => void;
  clearSupplierDeliverySelection: (supplierId: string) => void;
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
  deliveryMethod: "terminal",
  paymentMethod: "online",
  deliveryInstructions: "",
  currentStep: "delivery",
  terminalAddress: "",
  supplierDeliverySelections: {},
  supplierPaymentMethods: {},
};

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
            customerAddress: {
              ...state.checkoutData.customerAddress,
              ...address,
            },
          },
        })),

      setTerminalAddress: (address) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            terminalAddress: address,
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

      clearCheckoutData: () => {
        set({ checkoutData: defaultCheckoutData });
        // Clear from storage immediately
        localStorage.removeItem("checkout-store");
      },

      getCheckoutData: () => get().checkoutData,

      // New methods for delivery options
      setSupplierDeliverySelection: (supplierId, locationId) =>
  set((state) => {
    const newSelections = { ...state.checkoutData.supplierDeliverySelections };
    
    if (locationId === null) {
      // Remove the supplier's selection
      delete newSelections[supplierId];
    } else {
      // Add or update the supplier's selection
      newSelections[supplierId] = locationId;
    }
    
    return {
      checkoutData: {
        ...state.checkoutData,
        supplierDeliverySelections: newSelections,
      },
    };
  }),

      setSupplierPaymentMethod: (supplierId, method) =>
        set((state) => ({
          checkoutData: {
            ...state.checkoutData,
            supplierPaymentMethods: {
              ...state.checkoutData.supplierPaymentMethods,
              [supplierId]: method,
            },
          },
        })),

      clearSupplierDeliverySelection: (supplierId) =>
        set((state) => {
          const { [supplierId]: _, ...restDelivery } =
            state.checkoutData.supplierDeliverySelections;
          const { [supplierId]: __, ...restPayment } =
            state.checkoutData.supplierPaymentMethods;

          return {
            checkoutData: {
              ...state.checkoutData,
              supplierDeliverySelections: restDelivery,
              supplierPaymentMethods: restPayment,
            },
          };
        }),
    }),
    {
      name: "checkout-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Optional: You can add logic here if needed
      },
    }
  )
);
