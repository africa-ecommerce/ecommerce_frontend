import Link from "next/link"
import { ArrowRight, CheckCircle2, BarChart3, ShoppingCart, CreditCard, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8 text-center">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Step 5 of 5</span>
            <span className="text-sm font-medium text-gray-500">100% Complete</span>
          </div>
          <Progress value={100} className="h-2 bg-gray-100" />
        </div>

        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Congratulations!</h1>
        <p className="mb-2 text-orange-500 font-medium">Your Pluggn journey begins now!</p>
        <p className="mb-8 text-gray-600">
          Your account has been created successfully. You're now ready to start your digital entrepreneurship journey
          with Pluggn.
        </p>

        <Card className="p-6 mb-8 text-left">
          <h2 className="font-semibold text-lg mb-4">What's Next?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                <BarChart3 className="h-3 w-3 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Complete Your Dashboard</h3>
                <p className="text-sm text-gray-500">Customize your store with your brand colors and logo</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                <ShoppingCart className="h-3 w-3 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Add More Products</h3>
                <p className="text-sm text-gray-500">Expand your inventory with more products</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                <CreditCard className="h-3 w-3 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Set Up Payments</h3>
                <p className="text-sm text-gray-500">Connect your payment methods to start receiving orders</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                <Share2 className="h-3 w-3 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Promote Your Store</h3>
                <p className="text-sm text-gray-500">Share your store link on social media to attract customers</p>
              </div>
            </li>
          </ul>
        </Card>

        <div className="bg-orange-50 p-4 rounded-md mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-orange-500"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Join the Pluggn Community</h3>
              <p className="text-sm">Connect with other entrepreneurs and learn from their experiences</p>
            </div>
          </div>
        </div>

        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 py-4 text-lg">
          <Link href="/dashboard">
            Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

