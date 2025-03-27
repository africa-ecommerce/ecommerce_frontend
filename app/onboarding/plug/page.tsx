import Link from "next/link"
import { ArrowRight, ArrowLeft, Shirt, Smartphone, Sparkles, Home, Palette, FileCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function PlugPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Step 2 of 5</span>
            <span className="text-sm font-medium text-gray-500">40% Complete</span>
          </div>
          <Progress value={40} className="h-2 bg-gray-100" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">Select Your Niche</h1>
        <p className="mb-8 text-center text-gray-600">
          Choose a niche to help us recommend the best products for your business.
        </p>

        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="general" />
            <Label htmlFor="general" className="font-medium">
              I want to be a General Merchant
            </Label>
          </div>
          <p className="text-sm text-gray-500 mb-6">Or select specific niches below (you can select multiple):</p>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-2 hover:border-orange-500 cursor-pointer transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Shirt className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fashion" />
                    <Label htmlFor="fashion" className="font-medium">
                      Fashion
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">Clothing & accessories</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 hover:border-orange-500 cursor-pointer transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Smartphone className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="electronics" />
                    <Label htmlFor="electronics" className="font-medium">
                      Electronics
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">Gadgets & devices</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 hover:border-orange-500 cursor-pointer transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="beauty" />
                    <Label htmlFor="beauty" className="font-medium">
                      Beauty
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">Cosmetics & wellness</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 hover:border-orange-500 cursor-pointer transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Home className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="home" />
                    <Label htmlFor="home" className="font-medium">
                      Home & Living
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">Decor & furnishings</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 hover:border-orange-500 cursor-pointer transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Palette className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="crafts" />
                    <Label htmlFor="crafts" className="font-medium">
                      Local Crafts
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">Handmade & artisanal</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 hover:border-orange-500 cursor-pointer transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <FileCode className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="digital" />
                    <Label htmlFor="digital" className="font-medium">
                      Digital Services
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">Software & digital products</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="other" />
              <Label htmlFor="other" className="font-medium">
                Other (please specify)
              </Label>
            </div>
            <input
              type="text"
              placeholder="Enter your niche"
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button asChild variant="outline" className="px-6">
            <Link href="/onboarding/user-type">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 px-6">
            <Link href="/onboarding/plug/profile">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

