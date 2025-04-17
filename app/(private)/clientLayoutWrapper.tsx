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
  LogOut,
  Bell,
  CreditCard,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
import ThemeWrapper from "../themeWrapper";

// More menu component for desktop
function MoreMenu({
  isOpen,
  onClose,
  userType,
}: {
  isOpen: boolean;
  onClose: () => void;
  userType: "PLUG" | "SUPPLIER";
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-20 left-0 w-64 bg-background rounded-lg shadow-xl border p-3 z-50 animate-in slide-in-from-bottom duration-200">
      <div className="flex flex-col space-y-1">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          <User className="w-5 h-5 text-primary" />
          <span>Profile</span>
        </Link>

        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          <Bell className="w-5 h-5 text-primary" />
          <span>Notifications</span>
          <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </Link>

        {userType === "PLUG" ? (
          <Link
            href="/dashboard/payments"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
            onClick={onClose}
          >
            <CreditCard className="w-5 h-5 text-primary" />
            <span>Payments</span>
          </Link>
        ) : (
          <Link
            href="/dashboard/account"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
            onClick={onClose}
          >
            <Shield className="w-5 h-5 text-primary" />
            <span>Account Security</span>
          </Link>
        )}

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          <Settings className="w-5 h-5 text-primary" />
          <span>Settings</span>
        </Link>

        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          <HelpCircle className="w-5 h-5 text-primary" />
          <span>Help & Support</span>
        </Link>

        <div className="border-t my-2"></div>

        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2.5 text-destructive rounded-md hover:bg-destructive/10"
          onClick={onClose}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  label?: string;
  isActive: boolean;
  badge?: string;
  compact?: boolean;
  onClick?: () => void;
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  badge,
  compact,
  onClick,
}: NavItemProps) {
  const content = (
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
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full flex",
          compact ? "flex-col items-center" : "items-center px-4 py-3 gap-3"
        )}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "w-full flex",
          compact ? "flex-col items-center" : "items-center px-4 py-3 gap-3"
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "w-full flex",
        compact ? "flex-col items-center" : "items-center px-4 py-3 gap-3"
      )}
    >
      {content}
    </div>
  );
}

// Helper function to check if path starts with a pattern
const isPathActive = (pathname: string, pattern: string) => {
  // Special case for dashboard root
  if (pattern === "/dashboard") {
    return pathname === "/dashboard";
  }

  // For all other patterns, check if path starts with pattern
  return pathname === pattern || pathname.startsWith(pattern + "/");
};

interface DesktopNavigationProps {
  pathname: string;
  userType: "PLUG" | "SUPPLIER";
}

// Desktop sidebar navigation
function DesktopNavigation({ pathname, userType }: DesktopNavigationProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 border-r bg-background z-40 flex-col">
      <div className="p-4 flex items-center justify-center border-b h-16">
        <div className="font-bold text-xl text-primary">
          {userType === "PLUG" ? "Plug Dashboard" : "Supplier Portal"}
        </div>
      </div>

      {userType === "PLUG" ? (
        <>
          <div className="flex flex-col p-3 gap-1 flex-grow overflow-y-auto">
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              isActive={isPathActive(pathname, "/dashboard")}
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Marketplace"
              isActive={isPathActive(pathname, "/marketplace")}
            />
            <NavItem
              href="/dashboard/store"
              icon={<Store className="w-5 h-5" />}
              label="Store"
              isActive={isPathActive(pathname, "/dashboard/store")}
              badge="New"
            />
            <NavItem
              href="/dashboard/products"
              icon={<Package className="w-5 h-5" />}
              label="Products"
              isActive={isPathActive(pathname, "/dashboard/products")}
            />

            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Analytics
              </h3>
            </div>

            <NavItem
              href="/dashboard/analytics"
              icon={<ChartNoAxesCombined className="w-5 h-5" />}
              label="Performance"
              isActive={isPathActive(pathname, "/dashboard/analytics")}
            />
          </div>
          <div className="mt-auto border-t p-3 relative">
            <NavItem
              icon={<CircleEllipsis className="w-5 h-5" />}
              label="More"
              isActive={
                moreMenuOpen || isPathActive(pathname, "/dashboard/profile")
              }
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            />
            <MoreMenu
              isOpen={moreMenuOpen}
              onClose={() => setMoreMenuOpen(false)}
              userType={userType}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col p-3 gap-1 flex-grow overflow-y-auto">
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              isActive={isPathActive(pathname, "/dashboard")}
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Marketplace"
              isActive={isPathActive(pathname, "/marketplace")}
            />
            <NavItem
              href="/dashboard/order"
              icon={<PackageOpen className="w-5 h-5" />}
              label="Orders"
              isActive={isPathActive(pathname, "/dashboard/order")}
              badge="5"
            />
            <NavItem
              href="/dashboard/inventory"
              icon={<Boxes className="w-5 h-5" />}
              label="Inventory"
              isActive={isPathActive(pathname, "/dashboard/inventory")}
            />

            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Business
              </h3>
            </div>

            <NavItem
              href="/dashboard/analytics"
              icon={<ChartNoAxesCombined className="w-5 h-5" />}
              label="Analytics"
              isActive={isPathActive(pathname, "/dashboard/analytics")}
            />
          </div>
          <div className="mt-auto border-t p-3 relative">
            <NavItem
              icon={<CircleEllipsis className="w-5 h-5" />}
              label="More"
              isActive={
                moreMenuOpen || isPathActive(pathname, "/dashboard/profile")
              }
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            />
            <MoreMenu
              isOpen={moreMenuOpen}
              onClose={() => setMoreMenuOpen(false)}
              userType={userType}
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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t shadow-lg md:hidden z-50">
      <nav className="flex justify-between items-center px-3 py-2 relative">
        {userType === "PLUG" ? (
          <>
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Home"
              isActive={isPathActive(pathname, "/dashboard")}
              compact
            />

            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Market"
              isActive={isPathActive(pathname, "/marketplace")}
              compact
            />

            <NavItem
              href="/dashboard/store"
              icon={<Store className="w-5 h-5" />}
              label="Store"
              isActive={isPathActive(pathname, "/dashboard/store")}
              compact
              badge="New"
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
              isActive={moreMenuOpen}
              compact
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            />
          </>
        ) : (
          <>
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Home"
              isActive={isPathActive(pathname, "/dashboard")}
              compact
            />

            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Market"
              isActive={isPathActive(pathname, "/marketplace")}
              compact
            />

            <NavItem
              href="/dashboard/order"
              icon={<PackageOpen className="w-5 h-5" />}
              label="Orders"
              isActive={isPathActive(pathname, "/dashboard/order")}
              compact
              badge="5"
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
              isActive={moreMenuOpen}
              compact
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            />
          </>
        )}

        {moreMenuOpen && (
          <div className="absolute bottom-16 right-3 w-64 bg-background rounded-lg shadow-xl border p-3 z-50 animate-in slide-in-from-bottom duration-200">
            <div className="flex flex-col space-y-1">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
                onClick={() => setMoreMenuOpen(false)}
              >
                <User className="w-5 h-5 text-primary" />
                <span>Profile</span>
              </Link>

              <Link
                href="/dashboard/notifications"
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
                onClick={() => setMoreMenuOpen(false)}
              >
                <Bell className="w-5 h-5 text-primary" />
                <span>Notifications</span>
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  3
                </span>
              </Link>

              {userType === "PLUG" ? (
                <Link
                  href="/dashboard/payments"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
                  onClick={() => setMoreMenuOpen(false)}
                >
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>Payments</span>
                </Link>
              ) : (
                <Link
                  href="/dashboard/account"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
                  onClick={() => setMoreMenuOpen(false)}
                >
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Account Security</span>
                </Link>
              )}

              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
                onClick={() => setMoreMenuOpen(false)}
              >
                <Settings className="w-5 h-5 text-primary" />
                <span>Settings</span>
              </Link>

              <Link
                href="/dashboard/help"
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
                onClick={() => setMoreMenuOpen(false)}
              >
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>Help & Support</span>
              </Link>

              <div className="border-t my-2"></div>

              <Link
                href="/logout"
                className="flex items-center gap-3 px-3 py-2.5 text-destructive rounded-md hover:bg-destructive/10"
                onClick={() => setMoreMenuOpen(false)}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </Link>
            </div>
          </div>
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
  // Get pathname only on client side
  const [currentPathname, setCurrentPathname] = useState("/dashboard");

  useEffect(() => {
    // Only run on client side
    const pathname = window.location.pathname;
    setCurrentPathname(pathname);
  }, []);

  return (
    <ThemeWrapper>
      <div className="flex flex-col min-h-screen">
        {/* Desktop sidebar navigation */}
        <DesktopNavigation pathname={currentPathname} userType={userType} />

        <div className="flex-1 flex flex-col md:ml-64">
          <main className="flex-1 pb-16 md:pb-0">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <GlobalLoadingIndicatorAdvanced />
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </div>

        {/* Mobile Navigation - only rendered on client-side */}
        <MobileNavigation pathname={currentPathname} userType={userType} />
      </div>
    </ThemeWrapper>
  );
}






// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import {
//   Home,
//   Store,
//   LayoutGrid,
//   ChartNoAxesCombined,
//   User,
//   MessageCircle,
//   Settings,
//   HelpCircle,
//   PackageOpen,
//   Package,
//   CircleEllipsis,
//   Boxes,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
// import ThemeWrapper from "../themeWrapper";

// interface NavItemProps {
//   href?: string;
//   icon: React.ReactNode;
//   label?: string;
//   isActive: boolean;
//   badge?: string;
//   compact?: boolean;
// }

// function NavItem({
//   href,
//   icon,
//   label,
//   isActive,
//   badge,
//   compact,
// }: NavItemProps) {
//   return (
//     <Link
//       href={href || ""}
//       className={cn(
//         "w-full flex",
//         compact ? "flex-col items-center" : "items-center px-4 py-3 gap-3"
//       )}
//     >
//       <div
//         className={cn(
//           "relative flex items-center justify-center transition-all duration-200 rounded-lg",
//           compact
//             ? "flex-col min-w-[56px] min-h-[44px] p-1.5"
//             : "flex-row w-full",
//           isActive
//             ? "text-primary"
//             : "text-muted-foreground hover:text-primary hover:bg-muted"
//         )}
//       >
//         <div className={cn("relative", isActive && "animate-pulse-gentle")}>
//           {icon}

//           {badge && (
//             <span className="absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-medium bg-primary text-primary-foreground animate-pulse">
//               {badge}
//             </span>
//           )}
//         </div>

//         <span
//           className={cn(
//             compact ? "text-[10px] mt-0.5" : "font-medium text-sm ml-3"
//           )}
//         >
//           {label}
//         </span>

//         {isActive && (
//           <span className="absolute inset-0 rounded-lg bg-primary/10 animate-glow"></span>
//         )}
//       </div>
//     </Link>
//   );
// }

// // Helper function to check if path starts with a pattern
// const isPathActive = (pathname: string, pattern: string) => {
//   // Special case for dashboard root
//   if (pattern === "/dashboard") {
//     return pathname === "/dashboard";
//   }

//   // For all other patterns, check if path starts with pattern
//   // and either it's an exact match or the next character is a slash
//   return pathname === pattern || pathname.startsWith(pattern + "/");
// };

// interface DesktopNavigationProps {
//   pathname: string;
//   userType: "PLUG" | "SUPPLIER";
// }

// // Desktop sidebar navigation
// function DesktopNavigation({ pathname, userType }: DesktopNavigationProps) {
//   return (
//     <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-32 border-r bg-background z-40 flex-col">
//       <div className="p-4 flex items-center border-b h-16" />

//       {userType === "PLUG" ? (
//         <>
//           <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
//             <NavItem
//               href="/dashboard"
//               icon={<Home className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard")}
//             />
//             <NavItem
//               href="/marketplace"
//               icon={<LayoutGrid className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/marketplace")}
//             />
//             <NavItem
//               href="/dashboard/store"
//               icon={<Store className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard/store")}
//             />

//             <NavItem
//               href="/dashboard/products"
//               icon={<Package className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard/products")}
//             />
//           </div>
//           <div className="mt-auto border-t p-3">
//             <NavItem
//               icon={<CircleEllipsis className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard/profile")}
//             />
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
//             <NavItem
//               href="/dashboard"
//               icon={<Home className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard")}
//             />
//             <NavItem
//               href="/marketplace"
//               icon={<LayoutGrid className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/marketplace")}
//             />
//             <NavItem
//               href="/dashboard/order"
//               icon={<PackageOpen className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard/order")}
//             />
//             <NavItem
//               href="/dashboard/inventory"
//               icon={<Boxes className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard/inventory")}
//             />
//           </div>
//           <div className="mt-auto border-t p-3">
//             <NavItem
//               icon={<CircleEllipsis className="w-5 h-5" />}
//               isActive={isPathActive(pathname, "/dashboard/profile")}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// interface MobileNavigationProps {
//   pathname: string;
//   userType: "PLUG" | "SUPPLIER";
// }

// // Mobile bottom navigation
// function MobileNavigation({ pathname, userType }: MobileNavigationProps) {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t shadow-lg md:hidden z-50">
//       <nav className="flex justify-between items-center px-3 py-2">
//         {userType === "PLUG" ? (
//           <>
//             <NavItem
//               href="/dashboard"
//               icon={<Home className="w-5 h-5" />}
//               label="Dashboard"
//               isActive={isPathActive(pathname, "/dashboard")}
//               compact
//             />

//             <NavItem
//               href="/marketplace"
//               icon={<LayoutGrid className="w-5 h-5" />}
//               label="Marketplace"
//               isActive={isPathActive(pathname, "/marketplace")}
//               compact
//             />
//             <NavItem
//               href="/dashboard/store"
//               icon={<Store className="w-5 h-5" />}
//               label="Store"
//               isActive={isPathActive(pathname, "/dashboard/store")}
//               compact
//             />

//             <NavItem
//               href="/dashboard/products"
//               icon={<Package className="w-5 h-5" />}
//               label="Products"
//               isActive={isPathActive(pathname, "/dashboard/products")}
//               compact
//             />
//             <NavItem
//               icon={<CircleEllipsis className="w-5 h-5" />}
//               label="More"
//               isActive={isPathActive(pathname, "/dashboard/profile")}
//               compact
//             />
//           </>
//         ) : (
//           <>
//             <NavItem
//               href="/dashboard"
//               icon={<Home className="w-5 h-5" />}
//               label="Dashboard"
//               isActive={isPathActive(pathname, "/dashboard")}
//               compact
//             />
//             <NavItem
//               href="/marketplace"
//               icon={<LayoutGrid className="w-5 h-5" />}
//               label="Marketplace"
//               isActive={isPathActive(pathname, "/marketplace")}
//               compact
//             />
//             <NavItem
//               href="/dashboard/order"
//               icon={<PackageOpen className="w-5 h-5" />}
//               label="Order"
//               isActive={isPathActive(pathname, "/dashboard/order")}
//               compact
//             />
//             <NavItem
//               href="/dashboard/inventory"
//               icon={<Boxes className="w-5 h-5" />}
//               label="Inventory"
//               isActive={isPathActive(pathname, "/dashboard/inventory")}
//               compact
//             />
//             <NavItem
//               icon={<CircleEllipsis className="w-5 h-5" />}
//               label="More"
//               isActive={isPathActive(pathname, "/dashboard/profile")}
//               compact
//             />
//           </>
//         )}
//       </nav>
//     </div>
//   );
// }

// interface ClientLayoutProps {
//   children: React.ReactNode;
//   userType: "PLUG" | "SUPPLIER";
// }

// export default function ClientLayout({
//   children,
//   userType,
// }: ClientLayoutProps) {
//   const pathname = usePathname();

//   return (
//     <ThemeWrapper>
//       <div className="flex flex-col min-h-screen">
//         {/* Desktop sidebar navigation */}
//         <DesktopNavigation pathname={pathname} userType={userType} />

//         <div className="flex-1 flex flex-col md:ml-32">
//           <main className="flex-1 pb-16 md:pb-0">
//             <Suspense
//               fallback={
//                 <div className="flex items-center justify-center min-h-[50vh]">
//                   <GlobalLoadingIndicatorAdvanced />
//                 </div>
//               }
//             >
//               {children}
//               {/* </ShoppingCartProvider> */}
//             </Suspense>
//           </main>
//         </div>

//         {/* Mobile Navigation - only rendered on client-side */}
//         <MobileNavigation pathname={pathname} userType={userType} />
//       </div>
//     </ThemeWrapper>
//   );
// }