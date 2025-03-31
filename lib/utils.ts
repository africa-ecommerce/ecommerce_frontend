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