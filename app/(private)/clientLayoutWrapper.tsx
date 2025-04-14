// app/(private)/ClientLayoutWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import ClientLayout from "./clientLayout";
import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
import { useSwrUser } from "@/hooks/use-current-user";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  serverUserType: "PLUG" | "SUPPLIER" | null;
  initialUserData?: any;
}

// In ClientLayoutWrapper.tsx
export default function ClientLayoutWrapper({
  children,
  serverUserType,
  initialUserData,
}: ClientLayoutWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { user, isLoading } = useSwrUser(initialUserData);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render children until user data is loaded
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* <GlobalLoadingIndicatorAdvanced /> */}
        loading....
      </div>
    );
  }

  const userType = isHydrated && user?.userType ? user.userType : serverUserType;

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* <GlobalLoadingIndicatorAdvanced /> */}
        loading...
      </div>
    );
  }

  return <ClientLayout userType={userType}>{children}</ClientLayout>;
}