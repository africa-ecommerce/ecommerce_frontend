"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Store,
  LayoutGrid,
  ChartNoAxesCombined,
  User,
  MessageCircle,
  Settings,
  HelpCircle,
  PackageOpen,
  Package,
  CircleEllipsis,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
import ThemeWrapper from "../themeWrapper";

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  label?: string;
  isActive: boolean;
  badge?: string;
  compact?: boolean;
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  badge,
  compact,
}: NavItemProps) {
  return (
    <Link
      href={href || ""}
      className={cn(
        "w-full flex",
        compact ? "flex-col items-center" : "items-center px-4 py-3 gap-3"
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center transition-all duration-200 rounded-lg",
          compact
            ? "flex-col min-w-[56px] min-h-[44px] p-1.5"
            : "flex-row w-full",
          isActive
            ? "text-primary"
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

        <span
          className={cn(
            compact ? "text-[10px] mt-0.5" : "font-medium text-sm ml-3"
          )}
        >
          {label}
        </span>

        {isActive && (
          <span className="absolute inset-0 rounded-lg bg-primary/10 animate-glow"></span>
        )}
      </div>
    </Link>
  );
}

// Helper function to check if path starts with a pattern
const isPathActive = (pathname: string, pattern: string) => {
  // Special case for dashboard root
  if (pattern === "/dashboard") {
    return pathname === "/dashboard";
  }
  
  // For all other patterns, check if path starts with pattern
  // and either it's an exact match or the next character is a slash
  return (
    pathname === pattern ||
    pathname.startsWith(pattern + "/")
  );
};

interface DesktopNavigationProps {
  pathname: string;
  userType: "PLUG" | "SUPPLIER";
}

// Desktop sidebar navigation
function DesktopNavigation({ pathname, userType }: DesktopNavigationProps) {
  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-32 border-r bg-background z-40 flex-col">
      <div className="p-4 flex items-center border-b h-16" />

      {userType === "PLUG" ? (
        <>
          <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard")}
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/marketplace")}
            />
            <NavItem
              href="/dashboard/store"
              icon={<Store className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard/store")}
            />

            <NavItem
              href="/dashboard/products"
              icon={<Package className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard/products")}
            />
          </div>
          <div className="mt-auto border-t p-3">
            <NavItem
              icon={<CircleEllipsis className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard/profile")}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard")}
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/marketplace")}
            />
            <NavItem
              href="/dashboard/order"
              icon={<PackageOpen className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard/order")}
            />
            <NavItem
              href="/dashboard/inventory"
              icon={<Boxes className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard/inventory")}
            />
          </div>
          <div className="mt-auto border-t p-3">
            <NavItem
              icon={<CircleEllipsis className="w-5 h-5" />}
              isActive={isPathActive(pathname, "/dashboard/profile")}
            />
          </div>
        </>
      )}
    </div>
  );
}

interface MobileNavigationProps {
  pathname: string;
  userType: "PLUG" | "SUPPLIER";
}

// Mobile bottom navigation
function MobileNavigation({ pathname, userType }: MobileNavigationProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t shadow-lg md:hidden z-50">
      <nav className="flex justify-between items-center px-3 py-2">
        {userType === "PLUG" ? (
          <>
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              isActive={isPathActive(pathname, "/dashboard")}
              compact
            />

            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Marketplace"
              isActive={isPathActive(pathname, "/marketplace")}
              compact
            />
            <NavItem
              href="/dashboard/store"
              icon={<Store className="w-5 h-5" />}
              label="Store"
              isActive={isPathActive(pathname, "/dashboard/store")}
              compact
            />

            <NavItem
              href="/dashboard/products"
              icon={<Package className="w-5 h-5" />}
              label="Products"
              isActive={isPathActive(pathname, "/dashboard/products")}
              compact
            />
            <NavItem
              icon={<CircleEllipsis className="w-5 h-5" />}
              label="More"
              isActive={isPathActive(pathname, "/dashboard/profile")}
              compact
            />
          </>
        ) : (
          <>
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              isActive={isPathActive(pathname, "/dashboard")}
              compact
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Marketplace"
              isActive={isPathActive(pathname, "/marketplace")}
              compact
            />
            <NavItem
              href="/dashboard/order"
              icon={<PackageOpen className="w-5 h-5" />}
              label="Order"
              isActive={isPathActive(pathname, "/dashboard/order")}
              compact
            />
            <NavItem
              href="/dashboard/inventory"
              icon={<Boxes className="w-5 h-5" />}
              label="Inventory"
              isActive={isPathActive(pathname, "/dashboard/inventory")}
              compact
            />
            <NavItem
             
              icon={<CircleEllipsis className="w-5 h-5" />}
              label="More"
              isActive={isPathActive(pathname, "/dashboard/profile")}
              compact
            />
          </>
        )}
      </nav>
    </div>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
  userType: "PLUG" | "SUPPLIER";
}

export default function ClientLayout({
  children,
  userType,
}: ClientLayoutProps) {
  const pathname = usePathname();

  // const excludedPaths = [
  //   "/checkout",
  //   "/payment",
  //   "/admin/*",
  //   "/account/settings",
  //   "/",
  //   "/auth/*",
  //   "/onboarding/*",
  // ];

  // // Enhanced path matching for excluded paths
  // const isExcludedPath = excludedPaths.some(path => {
  //   // Handle paths with wildcards
  //   if (path.endsWith('/*')) {
  //     const basePath = path.replace('/*', '');
  //     return pathname.startsWith(basePath);
  //   }
  //   return pathname === path;
  // });

  return (
    <ThemeWrapper>
      <div className="flex flex-col min-h-screen">
        {/* Desktop sidebar navigation */}
        <DesktopNavigation pathname={pathname} userType={userType} />

        <div className="flex-1 flex flex-col md:ml-32">
          <main className="flex-1 pb-16 md:pb-0">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <GlobalLoadingIndicatorAdvanced />
                </div>
              }
            >
              {/* <ShoppingCartProvider excludePaths={isExcludedPath ? [pathname] : []}> */}
                {children}
              {/* </ShoppingCartProvider> */}
            </Suspense>
          </main>
        </div>

        {/* Mobile Navigation - only rendered on client-side */}
        <MobileNavigation pathname={pathname} userType={userType} />
      </div>
    </ThemeWrapper>
  );
}