// lib/auth-utils.ts
import { headers } from 'next/headers';

export async function getUserFromHeaders() {
  const headersList = await headers();
  const userDataHeader =  headersList.get("X-User-Data");
  
  if (!userDataHeader) {
    return null;
  }
  
  try {
    return JSON.parse(userDataHeader);
  } catch (error) {
    console.error('Error parsing user data from header:', error);
    return null;
  }
}





