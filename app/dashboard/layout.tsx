"use client";
import React, { Suspense } from "react";
import ClientLayout from "./clientLayout";
import { useReadResource } from "@/hooks/resourceManagement/useReadResources";

const currentUser = async () => {
  const response = await fetch("/api/auth/current-user");
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return response.json();
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const { data } = useReadResource("/auth/current-user", currentUser);

  return (
    <Suspense fallback={<div>Loading user data...</div>}>
      <ClientLayout userType={data?.user?.userType}>{children}</ClientLayout>
    </Suspense>
  );
};

export default layout;
