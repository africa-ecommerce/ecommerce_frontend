// contexts/UserContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";


interface UserContextType {
  userData: any | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children,
  userData
}: { 
  children: ReactNode;
  userData: any | null;
}) {
  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}