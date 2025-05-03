"use client"

import { useState } from "react"
import { ChevronLeft, Upload, Check, AlertCircle, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface VerificationSectionProps {
  onBack: () => void
}

export function VerificationSection({ onBack }: VerificationSectionProps) {
  const [activeStep, setActiveStep] = useState(1)
  const [verificationProgress, setVerificationProgress] = useState(33)

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
      setVerificationProgress((activeStep + 1) * 33)
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
      setVerificationProgress((activeStep - 1) * 33)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Identity Verification</h1>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div>
                  <CardTitle className="text-base">Status</CardTitle>
                  <CardDescription className="text-sm">Complete your identity verification</CardDescription>
                </div>
               
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={verificationProgress} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Step {activeStep} of 3</span>
                  <span>{verificationProgress}% Complete</span>
                </div>
              </div>

              {activeStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800">Why we need to verify your identity</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          We're required by regulations to verify the identity of our users. This helps prevent fraud
                          and keeps your account secure.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="nin">National Identification Number (NIN)</Label>
                    <Input id="nin" placeholder="Enter your NIN" />
                    <p className="text-xs text-muted-foreground">
                      Your NIN is a unique number assigned by the government
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-medium">Upload Identification Document</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload a clear photo of your government-issued ID (passport, driver's license, or national ID
                    card)
                  </p>

                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Drag and drop your document here</p>
                        <p className="text-xs text-muted-foreground">Supports JPG, PNG, PDF up to 10MB</p>
                      </div>
                      <Button size="sm" variant="secondary" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-800">Documents Submitted</h3>
                        <p className="text-sm text-green-700 mt-1">
                          Your verification documents have been submitted successfully. We'll review them and update
                          your status within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Verification Summary</h3>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium">National Identification Number</p>
                      <p className="text-sm text-muted-foreground">••••••••1234</p>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Document Type</p>
                      <p className="text-sm text-muted-foreground">National ID Card</p>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Submission Date</p>
                      <p className="text-sm text-muted-foreground">April 19, 2025</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep} disabled={activeStep === 1}>
                Back
              </Button>
              <Button onClick={handleNextStep} disabled={activeStep === 3}>
                {activeStep < 3 ? "Continue" : "Done"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Verification Benefits</CardTitle>
              <CardDescription>Why verification is important</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Enhanced Security</h3>
                    <p className="text-sm text-muted-foreground">Protect your account from unauthorized access</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Higher Limits</h3>
                    <p className="text-sm text-muted-foreground">Access higher transaction limits</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Regulatory Compliance</h3>
                    <p className="text-sm text-muted-foreground">Meet regulatory requirements for financial services</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Business Verification</CardTitle>
              <CardDescription>Verify your business identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <h3 className="font-medium">Business Verification Coming Soon</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We're working on adding business verification features. Please check back later.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Enter your business name" disabled />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessRegistration">Business Registration Number</Label>
                <Input id="businessRegistration" placeholder="Enter registration number" disabled />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input id="businessAddress" placeholder="Enter business address" disabled />
              </div>

              <Button className="w-full" disabled>
                Start Business Verification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
