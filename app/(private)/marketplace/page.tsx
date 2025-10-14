// app/marketplace/page.tsx (Server Component - no "use client")

import { getUserFromHeaders } from "@/lib/auth-utils";
import Discover from "./discover/components/discover";
import SupplierMarketplace from "./_components/supplier-marketplace"; // move client logic here

export default async function MarketplacePage() {
  const userData = await getUserFromHeaders();
  const userType = userData?.userType || null;

  if (userType === "PLUG") {
    return <Discover />;
  }

  return <SupplierMarketplace user={userData} />;
}
