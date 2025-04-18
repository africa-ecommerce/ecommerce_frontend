// app/(private)/ClientLayoutWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import ClientLayout from "./clientLayout";
import { useSwrUser } from "@/hooks/use-current-user";
import { UserProvider } from "../_components/provider/UserContext";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  serverUserType: "PLUG" | "SUPPLIER" | null;
  initialUserData?: any;
}

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
        loading....
      </div>
    );
  }

  const userType = isHydrated && user?.userType ? user.userType : serverUserType;

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        loading...
      </div>
    );
  }

  return (
    <UserProvider  userData={user}>
      <ClientLayout userType={userType}>{children}</ClientLayout>
    </UserProvider>
  );
}