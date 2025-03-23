"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronRight, Upload, Store, ShoppingBag, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label as LabelComponent } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [businessType, setBusinessType] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  // Move to next step
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      setProgress((currentStep + 1) * 20)
    }
  }

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setProgress((currentStep - 1) * 20)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                A
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Set up your AfriConnect account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Let's get you started with a few simple steps
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>

          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Welcome to AfriConnect!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We're excited to have you join our community. Let's set up your account to get the most out of
                    AfriConnect.
                  </p>
                </div>

                <div className="space-y-4 mt-6">
                  <h4 className="font-medium">What will you be using AfriConnect for?</h4>
                  <RadioGroup value={businessType || ""} onValueChange={setBusinessType}>
                    <div className="space-y-3">
                      <Card
                        className={`cursor-pointer hover:border-primary ${businessType === "physical" ? "border-primary" : ""}`}
                      >
                        <CardContent className="p-4 flex items-start">
                          <RadioGroupItem value="physical" id="physical" className="mt-1" />
                          <LabelComponent htmlFor="physical" className="flex-1 ml-3 cursor-pointer">
                            <div className="flex items-center">
                              <Store className="h-5 w-5 mr-2 text-primary" />
                              <span className="font-medium">I have a physical store</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Connect your existing physical business with online customers
                            </p>
                          </LabelComponent>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:border-primary ${businessType === "online" ? "border-primary" : ""}`}
                      >
                        <CardContent className="p-4 flex items-start">
                          <RadioGroupItem value="online" id="online" className="mt-1" />
                          <LabelComponent htmlFor="online" className="flex-1 ml-3 cursor-pointer">
                            <div className="flex items-center">
                              <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                              <span className="font-medium">I want to sell online</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Create a digital storefront to sell products online
                            </p>
                          </LabelComponent>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer hover:border-primary ${businessType === "whatsapp" ? "border-primary" : ""}`}
                      >
                        <CardContent className="p-4 flex items-start">
                          <RadioGroupItem value="whatsapp" id="whatsapp" className="mt-1" />
                          <LabelComponent htmlFor="whatsapp" className="flex-1 ml-3 cursor-pointer">
                            <div className="flex items-center">
                              <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                              <span className="font-medium">I sell via WhatsApp</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Integrate your WhatsApp business with our platform
                            </p>
                          </LabelComponent>
                        </CardContent>
                      </Card>
                    </div>
                  </RadioGroup>
                </div>

                <Button className="w-full" onClick={nextStep} disabled={!businessType}>
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Business Information</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your business so customers can find you easily.
                </p>

                <div className="space-y-4">
                  <div>
                    <LabelComponent htmlFor="business-name">Business Name</LabelComponent>
                    <Input id="business-name" placeholder="e.g. Adire Textiles" />
                  </div>

                  <div>
                    <LabelComponent htmlFor="business-category">Business Category</LabelComponent>
                    <select
                      id="business-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled selected>
                        Select a category
                      </option>
                      <option value="fashion">Fashion & Clothing</option>
                      <option value="food">Food & Groceries</option>
                      <option value="beauty">Beauty & Personal Care</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="electronics">Electronics</option>
                      <option value="art">Art & Crafts</option>
                    </select>
                  </div>

                  <div>
                    <LabelComponent htmlFor="business-description">Business Description</LabelComponent>
                    <Textarea
                      id="business-description"
                      placeholder="Tell customers about your business, products, and what makes you unique..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <LabelComponent htmlFor="business-location">Business Location</LabelComponent>
                    <Input id="business-location" placeholder="e.g. Lagos, Nigeria" />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Logo & Images */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Upload Your Logo & Images</h3>
                <p className="text-sm text-muted-foreground">Add visual elements to make your store stand out.</p>

                <div className="space-y-6">
                  <div>
                    <LabelComponent className="block mb-2">Business Logo</LabelComponent>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">SVG, PNG, JPG (MAX. 800x800px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <LabelComponent className="block mb-2">Cover Image (Optional)</LabelComponent>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">SVG, PNG, JPG (Recommended: 1200x300px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <p className="text-sm text-muted-foreground">How would you like customers to reach you?</p>

                <div className="space-y-4">
                  <div>
                    <LabelComponent htmlFor="contact-email">Business Email</LabelComponent>
                    <Input id="contact-email" type="email" placeholder="e.g. info@yourbusiness.com" />
                  </div>

                  <div>
                    <LabelComponent htmlFor="contact-phone">Business Phone</LabelComponent>
                    <Input id="contact-phone" type="tel" placeholder="e.g. +234 800 000 0000" />
                  </div>

                  <div>
                    <LabelComponent htmlFor="whatsapp">WhatsApp Number (Optional)</LabelComponent>
                    <Input id="whatsapp" type="tel" placeholder="e.g. +234 800 000 0000" />
                  </div>

                  <div className="space-y-2">
                    <LabelComponent>Social Media (Optional)</LabelComponent>

                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white">
                        <span className="text-xs font-bold">FB</span>
                      </div>
                      <Input placeholder="Facebook username or page" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-[#E1306C] flex items-center justify-center text-white">
                        <span className="text-xs font-bold">IG</span>
                      </div>
                      <Input placeholder="Instagram handle" />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Completion */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Setup Complete!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your AfriConnect account is ready to use. You can now start adding products and customizing your
                    store.
                  </p>
                </div>

                <div className="space-y-4 mt-6">
                  <h4 className="font-medium">Next Steps:</h4>

                  <div className="space-y-3">
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">1</span>
                          </div>
                          <span>Add your first product</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">2</span>
                          </div>
                          <span>Set up payment methods</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">3</span>
                          </div>
                          <span>Customize your store</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    Back
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Need help?{" "}
            <Link href="/help" className="text-primary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

interface LabelProps {
  htmlFor?: string
  className?: string
  children: React.ReactNode
}

function Label({ htmlFor, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2 ${className}`}
    >
      {children}
    </label>
  )
}

