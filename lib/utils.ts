import { clsx, type ClassValue } from "clsx"
import NaijaStates from "naija-state-local-government";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const cacheUtils = {
  // Clear all product-related cache
  clearProductCache: async () => {
    const { mutate } = await import('swr');
    return mutate(
      key => typeof key === 'string' && key.includes('/api/marketplace/products'),
      undefined,
      { revalidate: false }
    );
  },
}



export const isValidCallbackUrl = (url: string) => {

  try {

    if (url.startsWith("/")) {
      return true;
    }

    const parsedUrl = new URL(url);

    const allowedHostname = process.env.APP_URL;
  

    return parsedUrl.hostname == allowedHostname
  } catch(error) {
    return false
  }
}


export const formatTimeAgo = (seconds: string) => {
  const num = parseInt(seconds);
  if (isNaN(num)) return "Just now";

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(num / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
};

export const formatQuantity = (quantity: number) => {
  if (quantity === 0) return "0";
    if (quantity > 99) return "99+";
    return quantity?.toLocaleString();
};



export const formatPrice = (price: string) => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return `₦0`; // or return `₦${price}` to show original
  return `₦${numPrice.toLocaleString()}`;
};

export const truncateText = (text: string, maxLength: number = 20) => {
  return text?.length > maxLength ? `${text?.substring(0, maxLength)}...` : text;
};



export const getTotalStock = (item: any) => {
    if (item.variations && item.variations.length > 0) {
      return item.variations.reduce(
        (sum: number, variation: any) => sum + (variation.stock || 0),
        0
      );
    }
    return item.stock;
  };



  export const getTotalStocks = (item: any) => {
    if (item.variations && item.variations.length > 0) {
      return item.variations.reduce(
        (sum: number, variation: any) => sum + (variation.stocks || 0),
        0
      );
    }
    return item.stocks
  };


  export const getLgasForState = (stateName: string): string[] => {
    try {
      // First, try to get the state data from the states array
      const statesData = NaijaStates.states();
  
      if (Array.isArray(statesData)) {
        const stateData = statesData.find((state: any) => {
          const currentStateName =
            typeof state === "string"
              ? state
              : (state as any).state || (state as any).name;
          return currentStateName === stateName;
        });
  
        if (
          stateData &&
          typeof stateData === "object" &&
          (stateData as any).lgas
        ) {
          return Array.isArray((stateData as any).lgas)
            ? (stateData as any).lgas
            : [];
        }
      }
  
      // Fallback: try the direct lgas method
      const lgasResult = NaijaStates.lgas(stateName);
      if (Array.isArray(lgasResult)) {
        return lgasResult;
      }
  
      // If lgasResult is an object with lgas property
      if (
        lgasResult &&
        typeof lgasResult === "object" &&
        (lgasResult as any).lgas
      ) {
        return Array.isArray((lgasResult as any).lgas)
          ? (lgasResult as any).lgas
          : [];
      }
  
      return [];
    } catch (error) {
      console.error("Error fetching LGAs for state:", stateName, error);
      return [];
    }
  };


  export const getStatesAsStrings = (): string[] => {
    try {
      const statesData = NaijaStates.states();
      if (Array.isArray(statesData)) {
        return statesData.map((state: any) => {
          return typeof state === 'string' ? state : (state as any).state || (state as any).name;
        }).filter(Boolean);
      }
      return [];
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  };
  