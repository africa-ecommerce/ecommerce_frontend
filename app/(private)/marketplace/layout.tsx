import { ShoppingCartProvider } from '@/app/_components/provider/shoppingCartProvider';
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({children}: LayoutProps) => {
  return (
    <div>
      <ShoppingCartProvider >
      {children}
       </ShoppingCartProvider >
    </div>
  );
}

export default layout
