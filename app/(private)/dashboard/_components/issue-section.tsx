

"use client";

import {
  ArrowLeft,
  Package,
  RotateCcw,
  AlertTriangle,
  Loader2,
  HelpCircle,
} from "lucide-react";
import useSWR from "swr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface OrderItem {
  orderNumber: string;
  pausedQuantity: number;
  productName: string;
  productSize: string;
  productColor: string;
  variantSize: string;
  variantColor: string;
}

interface ApiResponse {
  message: string;
  data: OrderItem[];
}

interface IssueSectionProps {
  onBack: () => void;
  userType: "PLUG" | "SUPPLIER";
}

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const getDisplaySize = (item: OrderItem): string => {
  return item.variantSize || item.productSize || "N/A";
};

const getDisplayColor = (item: OrderItem): string => {
  return item.variantColor || item.productColor || "N/A";
};

const OrderCard = ({
  item,
  type,
}: {
  item: OrderItem;
  type: "issues" | "returns";
}) => {
  const displaySize = getDisplaySize(item);
  const displayColor = getDisplayColor(item);

  return (
    <Card className="animate-slide-up hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {item.orderNumber}
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            Qty: {item.pausedQuantity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">
              {item.productName}
            </h4>
            <div className="flex flex-wrap gap-2">
              {displaySize !== "N/A" && (
                <Badge variant="outline" className="text-xs">
                  Size: {displaySize}
                </Badge>
              )}
              {displayColor !== "N/A" && (
                <Badge variant="outline" className="text-xs">
                  Color: {displayColor}
                </Badge>
              )}
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {type === "issues" ? "Paused Items" : "Returned Items"}
              </span>
              <span className="font-medium">{item.pausedQuantity} units</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TabContent = ({
  data,
  error,
  isLoading,
  type,
}: {
  data?: ApiResponse;
  error: any;
  isLoading: boolean;
  type: "issues" | "returns";
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-32 bg-muted rounded animate-glow" />
                <div className="h-6 w-16 bg-muted rounded animate-glow" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-48 bg-muted rounded animate-glow" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-muted rounded animate-glow" />
                  <div className="h-5 w-20 bg-muted rounded animate-glow" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading {type}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="animate-fade-in">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load {type}. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex flex-col items-center justify-center py-12">
          {type === "issues" ? (
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          ) : (
            <RotateCcw className="h-12 w-12 text-muted-foreground mb-4" />
          )}
          <h3 className="text-base font-semibold mb-2">
            No {type === "issues" ? "Issues" : "Returns"} Found
          </h3>
          <p className="text-muted-foreground text-center">
            You don't have any{" "}
            {type === "issues" ? "paused orders" : "returned items"} at the
            moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1">
        {data.data.map((item, index) => (
          <div
            key={`${item.orderNumber}-${index}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <OrderCard item={item} type={type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export function IssueSection({ onBack, userType }: IssueSectionProps) {
  const [activeTab, setActiveTab] = useState("issues");

  const issuesEndpoint =
    userType === "PLUG"
      ? "/api/orders/plug/paused"
      : "/api/orders/supplier/paused";

  const returnsEndpoint =
    userType === "PLUG"
      ? "/api/orders/plug/returned"
      : "/api/orders/supplier/returned";

  const {
    data: issuesData,
    error: issuesError,
    isLoading: issuesLoading,
  } = useSWR<ApiResponse>(issuesEndpoint, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000,
  });

  const {
    data: returnsData,
    error: returnsError,
    isLoading: returnsLoading,
  } = useSWR<ApiResponse>(returnsEndpoint, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000,
  });

  const userTypeLabel = userType === "PLUG" ? "Plug" : "Supplier";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">Issues & Returns</h1>
            </div>
          </div>

          {/* Contact Support Link */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a href="/help">
              <HelpCircle className="h-4 w-4" />
              Contact Support
            </a>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="issues" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Issues
              {issuesData && issuesData.data.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {issuesData.data.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Returns
              {returnsData && returnsData.data.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {returnsData.data.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="mt-0">
            <TabContent
              data={issuesData}
              error={issuesError}
              isLoading={issuesLoading}
              type="issues"
            />
          </TabsContent>

          <TabsContent value="returns" className="mt-0">
            <TabContent
              data={returnsData}
              error={returnsError}
              isLoading={returnsLoading}
              type="returns"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}