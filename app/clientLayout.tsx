"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShoppingCartProvider } from "./_components/provider/shoppingCartProvider";
import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
import ThemeWrapper from "./themeWrapper";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: string;
}

function NavItem({ href, icon, label, isActive, badge }: NavItemProps) {
  return (
    <Link href={href} className="w-full flex flex-col items-center">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] p-1.5 rounded-lg transition-all duration-200",
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-primary hover:bg-muted"
        )}
      >
        <div className={cn("relative", isActive && "animate-pulse-gentle")}>
          {icon}

          {badge && (
            <span className="absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-medium bg-primary text-primary-foreground animate-pulse">
              {badge}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">{label}</span>

        {isActive && (
          <span className="absolute inset-0 rounded-lg bg-primary/10 animate-glow"></span>
        )}
      </div>
    </Link>
  );
}

// This component will only render on the client side
function MobileNavigation({ pathname }: { pathname: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const homePage = "/";

  // Determine if we're on a public page
  const isPublicPage =
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/onboarding") ||
    pathname === homePage;

  // Use useEffect to ensure this only runs on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!isMounted) return null;

  // Don't render on public pages
  if (isPublicPage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t shadow-lg md:hidden z-50">
      <nav className="flex justify-between items-center px-3 py-2">
        <NavItem
          href="/"
          icon={<Home className="w-5 h-5" />}
          label="Home"
          isActive={pathname === "/"}
        />
        <NavItem
          href="/search"
          icon={<Search className="w-5 h-5" />}
          label="Search"
          isActive={pathname === "/search"}
        />
        <NavItem
          href="/categories"
          icon={<LayoutGrid className="w-5 h-5" />}
          label="Categories"
          isActive={pathname === "/categories"}
        />
        <NavItem
          href="/cart"
          icon={<ShoppingCart className="w-5 h-5" />}
          label="Cart"
          isActive={pathname === "/cart"}
          badge="3"
        />
        <NavItem
          href="/profile"
          icon={<User className="w-5 h-5" />}
          label="Profile"
          isActive={pathname === "/profile"}
        />
      </nav>
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const excludedPaths = [
    "/checkout",
    "/payment",
    "/admin/*",
    "/account/settings",
    "/",
    "/auth/*",
    "/onboarding/*",
  ];

  return (
    <ThemeWrapper>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 pb-16 md:pb-0">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <GlobalLoadingIndicatorAdvanced />
                </div>
              }
            >
              <ShoppingCartProvider excludePaths={excludedPaths}>
                {children}
              </ShoppingCartProvider>
            </Suspense>
          </main>
        </div>

        {/* Mobile Navigation - only rendered on client-side */}
        <MobileNavigation pathname={pathname} />
      </div>
    </ThemeWrapper>
  );
}
