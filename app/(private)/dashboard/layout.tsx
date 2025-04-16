"use client";

import { preload } from "swr";
import { useEffect } from "react";
import { SWRConfig } from "swr";

// Define a global fetcher function that can be reused
const globalFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const  data  = await response.json();
  

  return data;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Prefetch multiple data sources using the same fetcher
    preload("/api/products/supplier/", globalFetcher);
    
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: globalFetcher,
        revalidateOnFocus: false,
        dedupingInterval: 5000,
      }}
    >
      <div>{children}</div>
    </SWRConfig>
  );
}
