"use client"

import { ArrowLeft, Clock, CreditCard, AlertCircle, Loader2 } from "lucide-react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PaymentData {
  orderNumber: string
  daysLeft: number
  amount: number
}

interface ApiResponse {
  message: string
  result: PaymentData[]
}

interface PaymentSectionProps {
  userType: "PLUG" | "SUPPLIER"
  onBack: () => void
}

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch payments")
  }
  return response.json()
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDaysLeft = (days: number): string => {
  return days === 1 ? "1 day left" : `${days} days left`
}


export default function PaymentSection({ userType, onBack }: PaymentSectionProps) {
  const endpoint = userType === "PLUG" ? "/api/payments/plug/pending" : "/api/payments/supplier/pending"

  const { data, error, isLoading } = useSWR<ApiResponse>(endpoint, fetcher, {
    refreshInterval: 60000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000, // Dedupe requests within 10 seconds
  })

  const userTypeLabel = userType === "PLUG" ? "Plug" : "Supplier"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack} className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Pending Payments</h1>
           
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse-gentle">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted rounded animate-glow" />
                      <div className="h-3 w-24 bg-muted rounded animate-glow" />
                    </div>
                    <div className="space-y-2 text-right">
                      <div className="h-6 w-20 bg-muted rounded animate-glow" />
                      <div className="h-4 w-16 bg-muted rounded animate-glow" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading payments...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load pending payments. Please try again later.</AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {data && data.result.length === 0 && !isLoading && !error && (
          <Card className="animate-fade-in">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Pending Payments</h3>
              <p className="text-muted-foreground text-center">You don't have any pending payments at the moment.</p>
            </CardContent>
          </Card>
        )}

        {/* Payment List */}
        {data && data.result.length > 0 && !isLoading && !error && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {data.result.length} pending payment{data.result.length !== 1 ? "s" : ""}
              </p>
              <Badge variant="outline" className="animate-primary-pulse">
                Total: {formatCurrency(data.result.reduce((sum, payment) => sum + payment.amount, 0))}
              </Badge>
            </div>

            {data.result.map((payment, index) => (
              <Card
                key={payment.orderNumber}
                className="animate-slide-up hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">{payment.orderNumber}</CardTitle>
                    <Badge  className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDaysLeft(payment.daysLeft)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Amount Due</p>
                      <p className="text-base font-bold text-primary">{formatCurrency(payment.amount)}</p>
                    </div>
                   
                  </div>

                 
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
