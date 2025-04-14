"use client";

import { ToasterAdvanced } from "@/components/toaster-advanced";
import { useToast } from "@/components/ui/use-toast-advanced";

// This component serves as a client-side wrapper for toast functionality
export function ClientToastWrapper() {
  return <ToasterAdvanced />;
}

// Export a helper function to create toast provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ClientToastWrapper />
    </>
  );
}