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
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ShoppingCartProvider } from "./_components/provider/shoppingCartProvider";
// import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
// import ThemeWrapper from "./themeWrapper";

// interface NavItemProps {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   isActive: boolean;
//   badge?: string;
// }

// function NavItem({ href, icon, label, isActive, badge }: NavItemProps) {
//   return (
//     <Link href={href} className="w-full flex flex-col items-center">
//       <div
//         className={cn(
//           "relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] p-1.5 rounded-lg transition-all duration-200",
//           isActive
//             ? "text-primary bg-primary/10"
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
//         <span className="text-[10px] mt-0.5">{label}</span>

//         {isActive && (
//           <span className="absolute inset-0 rounded-lg bg-primary/10 animate-glow"></span>
//         )}
//       </div>
//     </Link>
//   );
// }

// // This component will only render on the client side
// function MobileNavigation({ pathname }: { pathname: string }) {
//   const [isMounted, setIsMounted] = useState(false);
//   const homePage = "/";

//   // Determine if we're on a public page
//   const isPublicPage =
//     pathname?.startsWith("/auth") ||
//     pathname?.startsWith("/onboarding") ||
//     pathname === homePage;

//   // Use useEffect to ensure this only runs on the client
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Don't render anything during SSR
//   if (!isMounted) return null;

//   // Don't render on public pages
//   if (isPublicPage) return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t shadow-lg md:hidden z-50">
//       <nav className="flex justify-between items-center px-3 py-2">
//         <NavItem
//           href="/dashboard"
//           icon={<Home className="w-5 h-5" />}
//           label="Dashboard"
//           isActive={pathname === "/dashoard"}         
//         />
//         <NavItem
//           href="/search"
//           icon={<Store  className="w-5 h-5" />}
//           label="Store"
//           isActive={pathname === "/store"}
//         />
//         <NavItem
//           href="/categories"
//           icon={<LayoutGrid className="w-5 h-5" />}
//           label="Marketplace"
//           isActive={pathname === "/marketplace"}
//         />
//         <NavItem
//           href="/cart"
//           icon={<ChartNoAxesCombined className="w-5 h-5" />}
//           label="Analytics"
//           isActive={pathname === "/analytics"}
//         />
//         <NavItem
//           href="/profile"
//           icon={<User className="w-5 h-5" />}
//           label="Profile"
//           isActive={pathname === "/profile"}
//         />
//       </nav>
//     </div>
//   );
// }

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   const excludedPaths = [
//     "/checkout",
//     "/payment",
//     "/admin/*",
//     "/account/settings",
//     "/",
//     "/auth/*",
//     "/onboarding/*",
//   ];

//   return (
//     <ThemeWrapper>
//       <div className="flex flex-col min-h-screen">
//         <div className="flex-1 flex flex-col">
//           <main className="flex-1 pb-16 md:pb-0">
//             <Suspense
//               fallback={
//                 <div className="flex items-center justify-center min-h-[50vh]">
//                   <GlobalLoadingIndicatorAdvanced />
//                 </div>
//               }
//             >
//               <ShoppingCartProvider excludePaths={excludedPaths}>
//                 {children}
//               </ShoppingCartProvider>
//             </Suspense>
//           </main>
//         </div>

//         {/* Mobile Navigation - only rendered on client-side */}
//         <MobileNavigation pathname={pathname} />
//       </div>
//     </ThemeWrapper>
//   );
// }


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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ShoppingCartProvider } from "./_components/provider/shoppingCartProvider";
import { GlobalLoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";
import ThemeWrapper from "./themeWrapper";

interface NavItemProps {
  href: string;
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
      href={href}
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

// Desktop sidebar navigation
function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-32 border-r bg-background z-40 flex-col">
      <div className="p-4 flex items-center border-b h-16"/>
        
      
      <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
        <NavItem
          href="/dashboard"
          icon={<Home className="w-5 h-5" />}
          // label="Dashboard"
          isActive={pathname === "/dashboard"}
        />
        <NavItem
          href="/store"
          icon={<Store className="w-5 h-5" />}
          // label="Store"
          isActive={pathname === "/store"}
        />
        <NavItem
          href="/marketplace"
          icon={<LayoutGrid className="w-5 h-5" />}
          // label="Marketplace"
          isActive={pathname === "/marketplace"}
        />
        <NavItem
          href="/analytics"
          icon={<ChartNoAxesCombined className="w-5 h-5" />}
          // label="Analytics"
          isActive={pathname === "/analytics"}
        />
       
       
      </div>

      <div className="mt-auto border-t p-3">
         <NavItem
          href="/profile"
          icon={<User className="w-5 h-5" />}
          // label="Profile"
          isActive={pathname === "/profile"}
          // badge="2"
        />
        
      </div>
    </div>
  );
}

// Mobile bottom navigation
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
          href="/dashboard"
          icon={<Home className="w-5 h-5" />}
          label="Dashboard"
          isActive={pathname === "/dashboard"}
          compact
        />
        <NavItem
          href="/store"
          icon={<Store className="w-5 h-5" />}
          label="Store"
          isActive={pathname === "/store"}
          compact
        />
        <NavItem
          href="/marketplace"
          icon={<LayoutGrid className="w-5 h-5" />}
          label="Marketplace"
          isActive={pathname === "/marketplace"}
          compact
        />
        <NavItem
          href="/analytics"
          icon={<ChartNoAxesCombined className="w-5 h-5" />}
          label="Analytics"
          isActive={pathname === "/analytics"}
          compact
        />
        <NavItem
          href="/profile"
          icon={<User className="w-5 h-5" />}
          label="Profile"
          isActive={pathname === "/profile"}
          compact
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
        {/* Desktop sidebar navigation */}
        <DesktopNavigation pathname={pathname} />

        <div className="flex-1 flex flex-col md:ml-32">
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