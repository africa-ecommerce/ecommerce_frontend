import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
 
  return `₦${price?.toLocaleString()}`;
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
    console.log(item)
    if (item.variations && item.variations.length > 0) {
      return item.variations.reduce(
        (sum: number, variation: any) => sum + (variation.stocks || 0),
        0
      );
    }
    return item.stocks
  };