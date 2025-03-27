import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Search,
  Star,
  Filter,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function PlugProductsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Step 5 of 5
            </span>
            <span className="text-sm font-medium text-gray-500">
              100% Complete
            </span>
          </div>
          <Progress
            value={100}
            className="h-2 bg-gray-100"
            
          />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
          Discover Products
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Find products to add to your store and start selling.
        </p>

        <Card className="p-6 mb-8">
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="profitable">Most Profitable</TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search for products" className="pl-10" />
              </div>

              <div className="flex gap-2 overflow-x-auto py-2 -mx-4 px-4">
                <Badge variant="outline" className="whitespace-nowrap">
                  All Products
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap">
                  Fashion
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap">
                  Electronics
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap">
                  Beauty
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap">
                  Home & Living
                </Badge>
              </div>
            </div>

            <TabsContent value="recommended" className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Recommended for You</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>

              <div className="space-y-4">
                <Card className="p-4 flex gap-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Product"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">African Print Shirt</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />
                          <span>4.8 (120 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$45.00</p>
                        <p className="text-xs text-green-600">Profit: $15.00</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Fashion
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Checkbox id="product1" />
                        <Label htmlFor="product1" className="text-xs">
                          Add to store
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 flex gap-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Product"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Wireless Earbuds</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />
                          <span>4.6 (85 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$35.00</p>
                        <p className="text-xs text-green-600">Profit: $12.00</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Electronics
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Checkbox id="product2" />
                        <Label htmlFor="product2" className="text-xs">
                          Add to store
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 flex gap-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Product"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Shea Butter Cream</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />
                          <span>4.9 (210 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$25.00</p>
                        <p className="text-xs text-green-600">Profit: $10.00</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Beauty
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Checkbox id="product3" />
                        <Label htmlFor="product3" className="text-xs">
                          Add to store
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              <div className="flex items-center gap-2 mb-4 p-3 bg-orange-50 rounded-md">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <p className="text-sm">
                  Products trending in your selected categories
                </p>
              </div>

              <div className="space-y-4">
                <Card className="p-4 flex gap-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0 relative">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Product"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                    <Badge className="absolute top-0 right-0 bg-orange-500 text-[10px]">
                      Hot
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Smartphone Gimbal</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />
                          <span>4.7 (95 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$55.00</p>
                        <p className="text-xs text-green-600">Profit: $18.00</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Electronics
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Checkbox id="trending1" />
                        <Label htmlFor="trending1" className="text-xs">
                          Add to store
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profitable" className="space-y-4">
              <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-md">
                <DollarSign className="h-5 w-5 text-green-500" />
                <p className="text-sm">
                  Products with the highest profit margins
                </p>
              </div>

              <div className="space-y-4">
                <Card className="p-4 flex gap-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0 relative">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Product"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                    <Badge className="absolute top-0 right-0 bg-green-500 text-[10px]">
                      70% Margin
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Digital Marketing eBook</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />
                          <span>4.9 (65 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$19.99</p>
                        <p className="text-xs text-green-600">Profit: $14.00</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        Digital
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Checkbox id="profitable1" />
                        <Label htmlFor="profitable1" className="text-xs">
                          Add to store
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-orange-50 rounded-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium">Potential Earnings</h3>
                  <p className="text-sm text-gray-600">
                    Based on selected products
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold text-orange-500">
                  $1,250 - $2,500
                </p>
                <p className="text-xs text-gray-600">
                  Estimated monthly revenue
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button asChild variant="outline" className="px-6">
            <Link href="/onboarding/plug/store">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 px-6">
            <Link href="/onboarding/success">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
