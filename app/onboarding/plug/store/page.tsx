import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Palette, Layout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Step 4 of 5
            </span>
            <span className="text-sm font-medium text-gray-500">
              80% Complete
            </span>
          </div>
          <Progress
            value={80}
            className="h-2 bg-gray-100"
          />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
          Create Your Online Store
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Choose a template and customize your online store.
        </p>

        <Card className="p-6 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" placeholder="Enter your store name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-url">Store URL</Label>
              <div className="flex">
                <div className="flex h-10 items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                  yourstore.pluggn.com
                </div>
                <Input
                  id="store-url"
                  className="rounded-l-none"
                  placeholder="yourstore"
                />
              </div>
              <p className="text-xs text-gray-500">
                Your store will be accessible at yourstore.pluggn.com
              </p>
            </div>

            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
              </TabsList>

              <TabsContent value="templates">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Choose a template for your store:
                  </p>

                  <RadioGroup
                    defaultValue="template1"
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="template1"
                      className="cursor-pointer [&:has(:checked)]:border-orange-500 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-orange-500"
                    >
                      <RadioGroupItem
                        id="template1"
                        value="template1"
                        className="sr-only"
                      />
                      <Card className="overflow-hidden">
                        <div className="aspect-[3/4] bg-gray-100 relative">
                          <Image
                            src="/placeholder.svg?height=200&width=150"
                            alt="Fashion template"
                            width={150}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium">Fashion</p>
                        </div>
                      </Card>
                    </Label>
                    <Label
                      htmlFor="template2"
                      className="cursor-pointer [&:has(:checked)]:border-orange-500 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-orange-500"
                    >
                      <RadioGroupItem
                        id="template2"
                        value="template2"
                        className="sr-only"
                      />
                      <Card className="overflow-hidden">
                        <div className="aspect-[3/4] bg-gray-100 relative">
                          <Image
                            src="/placeholder.svg?height=200&width=150"
                            alt="Electronics template"
                            width={150}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium">Electronics</p>
                        </div>
                      </Card>
                    </Label>
                    <Label
                      htmlFor="template3"
                      className="cursor-pointer [&:has(:checked)]:border-orange-500 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-orange-500"
                    >
                      <RadioGroupItem
                        id="template3"
                        value="template3"
                        className="sr-only"
                      />
                      <Card className="overflow-hidden">
                        <div className="aspect-[3/4] bg-gray-100 relative">
                          <Image
                            src="/placeholder.svg?height=200&width=150"
                            alt="Beauty template"
                            width={150}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium">Beauty</p>
                        </div>
                      </Card>
                    </Label>
                    <Label
                      htmlFor="template4"
                      className="cursor-pointer [&:has(:checked)]:border-orange-500 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-orange-500"
                    >
                      <RadioGroupItem
                        id="template4"
                        value="template4"
                        className="sr-only"
                      />
                      <Card className="overflow-hidden">
                        <div className="aspect-[3/4] bg-gray-100 relative">
                          <Image
                            src="/placeholder.svg?height=200&width=150"
                            alt="General template"
                            width={150}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium">General</p>
                        </div>
                      </Card>
                    </Label>
                  </RadioGroup>

                  <div className="flex items-center justify-center mt-4">
                    <Button variant="outline" size="sm">
                      Preview Selected Template
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customize">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-md">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Palette className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Drag & Drop Editor</h3>
                      <p className="text-sm text-gray-600">
                        Customize your store with our easy-to-use editor
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-md">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Layout className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mobile Responsive</h3>
                      <p className="text-sm text-gray-600">
                        All templates are optimized for mobile devices
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button variant="outline" size="sm">
                      Open Store Editor
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button asChild variant="outline" className="px-6">
            <Link href="/onboarding/plug/profile">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 px-6">
            <Link href="/onboarding/plug/products">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
