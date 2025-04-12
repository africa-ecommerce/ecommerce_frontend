"use client";
import React, { Suspense } from "react";
import ClientLayout from "./clientLayout";
import { useCurrentUser } from "@/hooks/use-current-user";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCurrentUser();
  return (
    <Suspense fallback={<div>Loading user data...</div>}>
      <ClientLayout userType={user?.userType}>{children}</ClientLayout>
    </Suspense>
  );
};

export default layout;
