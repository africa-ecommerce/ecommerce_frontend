"use client"

import { ShoppingCartProvider } from '@/app/_components/provider/shoppingCartProvider';
import { useUser } from '@/app/_components/provider/UserContext';
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({children}: LayoutProps) => {

       const { userData } = useUser()

    return (
    <div>
      <ShoppingCartProvider exclude={userData?.userType === "SUPPLIER"} >
      {children}
       </ShoppingCartProvider >
    </div>
  );
 
  
}

export default layout
