"use client";

import { preload } from "swr";
import { useEffect } from "react";
import { SWRConfig } from "swr";

// Define a global fetcher function that can be reused
const globalFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.log("noooooo");
    throw new Error("Something went wrong");
  }

  const  data  = await response.json();
  console.log(data);
  console.log("yessssss");

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
    // preload("/api/user", globalFetcher);
    // preload("/api/orders", globalFetcher);

    // You can add more preload calls as needed
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
