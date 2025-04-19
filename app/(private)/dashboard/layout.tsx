"use client";

import { preload } from "swr";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import { useUser } from "@/app/_components/provider/UserContext";


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

     const { userData } = useUser();

  useEffect(() => {
    if(userData.userType === "SUPPLIER") {
       preload("/api/products/supplier/", globalFetcher);
    } else {
      console.log("plug")
    }
   
    
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
