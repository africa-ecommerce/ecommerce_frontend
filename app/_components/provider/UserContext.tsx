// contexts/UserContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";


interface UserContextType {
  userData: any | null;
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children,
  userData,
  isLoading
}: { 
  children: ReactNode;
  userData: any | null;
  isLoading: boolean
}) {
  return (
    <UserContext.Provider value={{ userData, isLoading }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}