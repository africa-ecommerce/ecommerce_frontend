'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import { publicRoutes } from '@/routes';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  const isPublicRoute = publicRoutes.some((route) => route.test(pathname));

  if (!isPublicRoute) {
    return null;
  }
  
  return <Footer />;
}