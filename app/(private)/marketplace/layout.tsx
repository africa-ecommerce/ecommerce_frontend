import { ShoppingCartProvider } from "@/app/_components/provider/shoppingCartProvider";
import { getUserFromHeaders } from "@/lib/auth-utils";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {
  const userData = await getUserFromHeaders();
 
  return (
    <div>
      <ShoppingCartProvider exclude={userData?.userType === "SUPPLIER"}>
        {children}
      </ShoppingCartProvider>
    </div>
  );
};

export default layout;
