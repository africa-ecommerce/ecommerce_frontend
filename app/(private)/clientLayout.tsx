"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { MorePageContent } from "./dashboard/_components/more-page-content";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper function to check if path starts with a pattern
const isPathActive = (pathname: string, pattern: string) => {
  // Special case for dashboard root
  if (pattern === "/dashboard") {
    return pathname === "/dashboard";
  }

  // For all other patterns, check if path starts with pattern
  // and either it's an exact match or the next character is a slash
  return pathname === pattern || pathname.startsWith(pattern + "/");
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label?: string;
  tip?: string;
  isActive: boolean;
  badge?: string;
  compact?: boolean;
  closeMorePage: () => void;
  showTooltip?: boolean;
}

function NavItem({
  href,
  icon,
  label,
  tip,
  isActive,
  badge,
  compact,
  closeMorePage,
  showTooltip = false,
}: NavItemProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMorePage();
    router.push(href);
  };

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

      {compact && <span className="text-[10px] mt-0.5">{label}</span>}

      {!compact && <span className="font-medium text-sm ml-3">{label}</span>}

      {isActive && (
        <span className="absolute inset-0 rounded-lg bg-primary/10 animate-glow"></span>
      )}
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              onClick={handleClick}
              className={cn(
                "w-full flex",
                compact
                  ? "flex-col items-center"
                  : "items-center px-4 py-3 gap-3"
              )}
            >
              {content}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{tip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "w-full flex",
        compact ? "flex-col items-center" : "items-center px-4 py-3 gap-3"
      )}
    >
      {content}
    </Link>
  );
}

interface MoreButtonProps {
  isActive: boolean;
  onClick: () => void;
  compact?: boolean;
  showTooltip?: boolean;
}

function MoreButton({
  isActive,
  onClick,
  compact,
  showTooltip = false,
}: MoreButtonProps) {
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
        <CircleEllipsis className="w-5 h-5" />
      </div>

      {compact && <span className="text-[10px] mt-0.5">More</span>}

      {isActive && (
        <span className="absolute inset-0 rounded-lg bg-primary/10 animate-glow"></span>
      )}
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onClick}
              className={cn(
                "w-full flex",
                compact
                  ? "flex-col items-center"
                  : "items-center px-4 py-3 gap-3"
              )}
            >
              {content}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">More Options</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

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

interface DesktopNavigationProps {
  pathname: string;
  userType: "PLUG" | "SUPPLIER";
  onMoreClick: () => void;
  isMoreActive: boolean;
  closeMorePage: () => void;
}

// Desktop sidebar navigation
function DesktopNavigation({
  pathname,
  userType,
  onMoreClick,
  isMoreActive,
  closeMorePage,
}: DesktopNavigationProps) {
  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 border-r bg-background z-40 flex-col">
      <div className="p-4 flex items-center border-b h-16" />

      {userType === "PLUG" ? (
        <>
          <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              tip="Dashboard"
              isActive={isPathActive(pathname, "/dashboard") && !isMoreActive}
              closeMorePage={closeMorePage}
              showTooltip
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              tip="Marketplace"
              isActive={isPathActive(pathname, "/marketplace") && !isMoreActive}
              closeMorePage={closeMorePage}
              showTooltip
            />
            <NavItem
              href="/dashboard/store"
              icon={<Store className="w-5 h-5" />}
              tip="Store"
              isActive={
                isPathActive(pathname, "/dashboard/store") && !isMoreActive
              }
              closeMorePage={closeMorePage}
              showTooltip
            />
            <NavItem
              href="/dashboard/product"
              icon={<Package className="w-5 h-5" />}
              tip="Product"
              isActive={
                isPathActive(pathname, "/dashboard/product") && !isMoreActive
              }
              closeMorePage={closeMorePage}
              showTooltip
            />
          </div>
          <div className="mt-auto border-t p-3">
            <MoreButton
              isActive={isMoreActive}
              onClick={onMoreClick}
              showTooltip
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col p-3 gap-5 flex-grow overflow-y-auto">
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              tip="Dashboard"
              isActive={isPathActive(pathname, "/dashboard") && !isMoreActive}
              closeMorePage={closeMorePage}
              showTooltip
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              tip="Marketplace"
              isActive={isPathActive(pathname, "/marketplace") && !isMoreActive}
              closeMorePage={closeMorePage}
              showTooltip
            />
            <NavItem
              href="/dashboard/order"
              icon={<PackageOpen className="w-5 h-5" />}
              tip="Orders"
              isActive={
                isPathActive(pathname, "/dashboard/order") && !isMoreActive
              }
              closeMorePage={closeMorePage}
              showTooltip
            />
            <NavItem
              href="/dashboard/inventory"
              icon={<Boxes className="w-5 h-5" />}
              tip="Inventory"
              isActive={
                isPathActive(pathname, "/dashboard/inventory") && !isMoreActive
              }
              closeMorePage={closeMorePage}
              showTooltip
            />
          </div>
          <div className="mt-auto border-t p-3">
            <MoreButton
              isActive={isMoreActive}
              onClick={onMoreClick}
              showTooltip
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
  onMoreClick: () => void;
  isMoreActive: boolean;
  closeMorePage: () => void;
}

// Mobile bottom navigation
function MobileNavigation({
  pathname,
  userType,
  onMoreClick,
  isMoreActive,
  closeMorePage,
}: MobileNavigationProps) {
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
              isActive={isPathActive(pathname, "/dashboard") && !isMoreActive}
              compact
              closeMorePage={closeMorePage}
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Marketplace"
              isActive={isPathActive(pathname, "/marketplace") && !isMoreActive}
              compact
              closeMorePage={closeMorePage}
            />
            <NavItem
              href="/dashboard/store"
              icon={<Store className="w-5 h-5" />}
              label="Store"
              isActive={
                isPathActive(pathname, "/dashboard/store") && !isMoreActive
              }
              compact
              closeMorePage={closeMorePage}
            />
            <NavItem
              href="/dashboard/product"
              icon={<Package className="w-5 h-5" />}
              label="Product"
              isActive={
                isPathActive(pathname, "/dashboard/product") && !isMoreActive
              }
              compact
              closeMorePage={closeMorePage}
            />
            <MoreButton isActive={isMoreActive} onClick={onMoreClick} compact />
          </>
        ) : (
          <>
            <NavItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              isActive={isPathActive(pathname, "/dashboard") && !isMoreActive}
              compact
              closeMorePage={closeMorePage}
            />
            <NavItem
              href="/marketplace"
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Marketplace"
              isActive={isPathActive(pathname, "/marketplace") && !isMoreActive}
              compact
              closeMorePage={closeMorePage}
            />
            <NavItem
              href="/dashboard/order"
              icon={<PackageOpen className="w-5 h-5" />}
              label="Orders"
              isActive={
                isPathActive(pathname, "/dashboard/order") && !isMoreActive
              }
              compact
              closeMorePage={closeMorePage}
            />
            <NavItem
              href="/dashboard/inventory"
              icon={<Boxes className="w-5 h-5" />}
              label="Inventory"
              isActive={
                isPathActive(pathname, "/dashboard/inventory") && !isMoreActive
              }
              compact
              closeMorePage={closeMorePage}
            />
            <MoreButton isActive={isMoreActive} onClick={onMoreClick} compact />
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
  // Simple useState for managing More page visibility without persistence
  const [showMorePage, setShowMorePage] = useState(false);

  const toggleMorePage = () => {
    setShowMorePage((prev) => !prev);
  };

  // Function to explicitly close the more page
  const closeMorePage = () => {
    setShowMorePage(false);
  };

  return (
    <ThemeWrapper>
      <div className="flex flex-col min-h-screen">
        {/* Desktop sidebar navigation */}
        <DesktopNavigation
          pathname={pathname}
          userType={userType}
          onMoreClick={toggleMorePage}
          isMoreActive={showMorePage}
          closeMorePage={closeMorePage}
        />

        <div className="flex-1 flex flex-col md:ml-24">
          <main className="flex-1 pb-16 md:pb-0">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <GlobalLoadingIndicatorAdvanced />
                </div>
              }
            >
              {showMorePage ? (
                <MorePageContent onBack={closeMorePage} />
              ) : (
                children
              )}
            </Suspense>
          </main>
        </div>

        {/* Mobile Navigation - only rendered on client-side */}
        <MobileNavigation
          pathname={pathname}
          userType={userType}
          onMoreClick={toggleMorePage}
          isMoreActive={showMorePage}
          closeMorePage={closeMorePage}
        />
      </div>
    </ThemeWrapper>
  );
}
