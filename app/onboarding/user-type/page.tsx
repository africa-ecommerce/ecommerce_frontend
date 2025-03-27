import Link from "next/link"
import { ArrowRight, ShoppingBag, Store, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UserTypePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Step 1 of 5</span>
            <span className="text-sm font-medium text-gray-500">20% Complete</span>
          </div>
          <Progress value={20} className="h-2 bg-gray-100"  />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">How will you use Pluggn?</h1>
        <p className="mb-2 text-center text-orange-500 font-medium">Choose your role</p>
        <p className="mb-8 text-center text-gray-600">
          We'll customize your experience based on how you plan to use the platform.
        </p>

        <div className="space-y-4">
          <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
            <Link href="/onboarding/supplier" className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                <Store className="h-7 w-7 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Supplier</h3>
                <p className="text-gray-500">I want to sell my products on the platform</p>
              </div>
            </Link>
          </Card>

          <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
            <Link href="/onboarding/plug" className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                <ShoppingBag className="h-7 w-7 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Plug</h3>
                <p className="text-gray-500">I want to build my business by selling products from suppliers</p>
              </div>
            </Link>
          </Card>

          {/* <Card className="p-6 border-2 hover:border-orange-500 cursor-pointer transition-all">
            <Link href="/onboarding/both" className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                <Users className="h-7 w-7 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Both</h3>
                <p className="text-gray-500">I want to both supply products and build a business</p>
              </div>
            </Link>
          </Card> */}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Not sure which option is right for you?{" "}
            <Link href="/help/user-types" className="text-orange-500 hover:underline">
              Learn more about user types
            </Link>
          </p>
          {/* <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 py-6 text-lg">
            <Link href="/onboarding/supplier">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  )
}

