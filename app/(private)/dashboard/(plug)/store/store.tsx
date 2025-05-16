


"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BarChart3,
  ExternalLink,
  Eye,
  PlusCircle,
  Settings,
  ShoppingBag,
  Store,
  Trash2,
  Users,
  Check,
  Sparkles,
  Award,
  Rocket,
  GraduationCap,
  Globe,
  Loader2,
  Copy,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@/app/_components/provider/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { useSwrUser } from "@/hooks/use-current-user";
import { clearThemeCustomizerData } from "@/lib/storage-helpers";




export default function StorePage() {
  const {
    userData: { user }
  } = useUser();


  const [copied, setCopied] = useState(false);


    
  

  // Mock analytics data
  const analyticsData = {
    visits: 245,
    customers: 18,
    orders: 12,
    revenue: "₦32,500",
  };

  // Function to copy store URL to clipboard
  const copyStoreUrl = () => {
    if (!user?.plug?.subdomain) return;

    const storeUrl = `https://${user.plug.subdomain}.pluggn.com`;
    navigator.clipboard.writeText(storeUrl);

    setCopied(true);
    

    // Reset copy status after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  // Show loading state until we have user data
  if (!user) {
    return <LoadingSkeletonView />;
  }

  return (
    <div className="container max-w-7xl px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Store
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your online store and track performance
          </p>
        </div>

        {user?.plug?.subdomain && (
          <div className="flex w-full md:w-auto flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 flex-1 sm:flex-auto"
            >
              <Link href="/dashboard/store/studio">
                <Settings className="mr-2 h-4 w-4" />
                <span>Customize</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 flex-1 sm:flex-auto"
            >
              <a
                href={`https://${user?.plug?.subdomain}.pluggn.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>View Store</span>
              </a>
            </Button>
          </div>
        )}
      </div>

      {user && !user?.plug?.subdomain ? (
        <NoStoreView />
      ) : (
        <StoreView
          analyticsData={analyticsData}
          storeSubdomain={user?.plug?.subdomain}
          copyStoreUrl={copyStoreUrl}
          copied={copied}
        />
      )}
    </div>
  );
}

function LoadingSkeletonView() {
  return (
    <div className="container max-w-7xl px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2 w-full sm:w-auto">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-9 w-24 flex-1 sm:flex-auto" />
          <Skeleton className="h-9 w-24 flex-1 sm:flex-auto" />
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="text-muted-foreground">
            Loading your store information...
          </p>
        </div>
      </div>

      {/* Analytics cards skeleton - shown in a staggered grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2 p-4 border rounded-lg">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NoStoreView() {
  return (
    <div className="space-y-8">
      <Card className="border-dashed border-2">
        <CardHeader className="text-center px-4 sm:px-6">
          <div className="mx-auto bg-secondary p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">
            Create your store
          </CardTitle>
          <CardDescription className="text-base sm:text-lg">
            Create a store to expand your reach and sell your products online
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center px-4 sm:px-6">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto animate-pulse-subtle"
          >
            <Link href="/dashboard/store/studio">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Store
            </Link>
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground px-4 sm:px-6">
          <p className="mx-auto max-w-md">
            Setting up your store takes just a few minutes. You'll be able to
            customize your store, add products, and start selling right away.
          </p>
        </CardFooter>
      </Card>

      {/* Benefits grid - responsive from 1 to 3 columns */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Reach More Customers
            </CardTitle>
            <CardDescription>
              Expand your business beyond physical limitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">
                  Custom storefront with your branding
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">Mobile-responsive design</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">Optimized for search engines</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Powerful Features
            </CardTitle>
            <CardDescription>
              Everything you need to run a successful online business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">Secure payment processing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">Inventory management</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">
                  Order tracking and notifications
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Easy to Get Started
            </CardTitle>
            <CardDescription>
              No technical skills required. We'll guide you through every step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">Step-by-step setup wizard</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">Pre-designed templates</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">24/7 customer support</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StoreView({
  analyticsData,
  storeSubdomain,
  copyStoreUrl,
  copied,
}: {
  analyticsData: {
    visits: number;
    customers: number;
    orders: number;
    revenue: string;
  };
  storeSubdomain: string;
  copyStoreUrl: () => void;
  copied: boolean;
}) {
 
  const {mutate}  = useSwrUser()

  const clearSavedData = useCallback(() => {
    if (typeof window !== "undefined") {
      clearThemeCustomizerData()
     
    }
  }, []);

  const deleteStore = async () => {
    const response = await fetch("/api/site", {
      method: "DELETE",
       credentials: "include" 
    });
    const result = await response.json();
  
    if (!response.ok) {
      errorToast(result.error);
      return null;
    }
    mutate()
    clearSavedData()
    successToast(result.message);
    return result;
  };

  return (
    <div className="space-y-6">
      {/* Store URL card - optimized for mobile */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <h3 className="font-medium mb-1 flex items-center">
                <Award className="h-4 w-4 mr-2 text-primary" />
                Your Store URL
              </h3>
              <div className="text-sm text-muted-foreground break-all w-full pr-2 overflow-hidden text-ellipsis">
                https://{storeSubdomain}.pluggn.com
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-auto"
                onClick={copyStoreUrl}
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              <Button asChild variant="default" className="flex-1 md:flex-auto">
                <a
                  href={`https://${storeSubdomain}.pluggn.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Visit</span>
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics cards - progressive grid from 1 to 4 columns */}
      <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base md:text-lg font-bold">
              {analyticsData.visits}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base md:text-lg font-bold">
              {analyticsData.customers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base md:text-lg font-bold">
              {analyticsData.orders}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base md:text-lg font-bold">
              {analyticsData.revenue}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Actions - full width on mobile, columns on desktop */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your store's recent orders and visits
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 p-2 rounded-full shrink-0">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">New order received</p>
                  <p className="text-sm text-muted-foreground truncate">
                    Order #PLG-4582 - ₦32,500
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  1h ago
                </div>
              </div>

              <div className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 p-2 rounded-full shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    New customer registered
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    Kwame Osei from Accra, Ghana
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  2h ago
                </div>
              </div>

              <div className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 p-2 rounded-full shrink-0">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Store visit spike</p>
                  <p className="text-sm text-muted-foreground truncate">
                    15 new visitors in the last hour
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  3h ago
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-4 sm:px-6 py-3">
            <Link
              href="/dashboard/analytics"
              className="text-sm text-primary hover:underline"
            >
              View all activity
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription>Manage your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/store/studio">
                  <Settings className="mr-2 h-4 w-4 shrink-0" />
                  Customize Store
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/product">
                  <Package className="mr-2 h-4 w-4 shrink-0" />
                  Manage Products
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4 shrink-0" />
                    Delete Store
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm mx-auto">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your store and remove all associated data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
                      onClick={deleteStore}
                    >
                      Delete Store
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}