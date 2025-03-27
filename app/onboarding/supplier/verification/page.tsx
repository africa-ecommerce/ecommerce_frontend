import Link from "next/link"
import { ArrowRight, ArrowLeft, Upload, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function VerificationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Step 3 of 5</span>
            <span className="text-sm font-medium text-gray-500">60% Complete</span>
          </div>
          <Progress value={60} className="h-2 bg-gray-100"  />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">Business Verification</h1>
        <p className="mb-8 text-center text-gray-600">
          Please provide the following documents to verify your business and build trust with customers.
        </p>

        <Tabs defaultValue="now" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="now">Verify Now</TabsTrigger>
            <TabsTrigger value="later">Verify Later</TabsTrigger>
          </TabsList>

          <TabsContent value="now" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="business-name">Business Name</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">
                          Enter your registered business name as it appears on your official documents.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input id="business-name" placeholder="Enter your business name" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tax-id">Tax Identification Number</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">Your Tax ID helps verify your business and enables proper tax reporting.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input id="tax-id" placeholder="Enter your tax ID" />
              </div>

              <Card className="p-4 border border-dashed">
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <Upload className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="font-medium">Business Registration</p>
                  <p className="text-sm text-gray-500 text-center">
                    Upload your business registration certificate (PDF, JPG, PNG)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </Card>

              <Card className="p-4 border border-dashed">
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <Upload className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="font-medium">Operational License</p>
                  <p className="text-sm text-gray-500 text-center">
                    Upload your operational license or permit (PDF, JPG, PNG)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </Card>

              <Card className="p-4 border border-dashed">
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <Upload className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="font-medium">Bank Verification</p>
                  <p className="text-sm text-gray-500 text-center">
                    Upload a bank statement or verification letter (PDF, JPG, PNG)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="later">
            <Card className="p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                  <Info className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Verification Can Be Completed Later</h3>
                <p className="text-gray-500 mb-6">
                  You can continue setting up your account now and complete verification later. However, some features
                  will be limited until verification is complete.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-left">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-bold">
                      ✕
                    </div>
                    <p className="text-sm text-gray-600">Cannot receive payments</p>
                  </div>
                  <div className="flex items-center gap-2 text-left">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-bold">
                      ✕
                    </div>
                    <p className="text-sm text-gray-600">Limited to 5 product listings</p>
                  </div>
                  <div className="flex items-center gap-2 text-left">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-bold">
                      ✕
                    </div>
                    <p className="text-sm text-gray-600">No "Verified Seller" badge</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button asChild variant="outline" className="px-6">
            <Link href="/onboarding/supplier">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 px-6">
            <Link href="/onboarding/supplier/products">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

