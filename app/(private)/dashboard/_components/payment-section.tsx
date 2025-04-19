"use client";

import { useState } from "react";
import { ChevronLeft, CreditCard, Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentSectionProps {
  onBack: () => void;
}

export function PaymentSection({ onBack }: PaymentSectionProps) {
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Payment Settings</h1>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="methods">Methods</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-4">
          {showAddCard ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Add Payment Method</CardTitle>
                <CardDescription>
                  Add a new credit or debit card
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="defaultCard"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="defaultCard">
                    Set as default payment method
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowAddCard(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddCard(false)}>Add Card</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="card1">
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card1" id="card1" />
                      <Label
                        htmlFor="card1"
                        className="flex items-center gap-3"
                      >
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 04/25
                          </p>
                        </div>
                      </Label>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card2" id="card2" />
                      <Label
                        htmlFor="card2"
                        className="flex items-center gap-3"
                      >
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Mastercard ending in 8888
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires 09/26
                          </p>
                        </div>
                      </Label>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </RadioGroup>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowAddCard(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Preferences</CardTitle>
              <CardDescription>Manage your payment preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Receipts</p>
                  <p className="text-sm text-muted-foreground">
                    Receive receipts for payments
                  </p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary px-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about payment events
                  </p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary px-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <Download className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-muted-foreground">
                        From: John Smith
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+$250.00</p>
                    <p className="text-xs text-muted-foreground">
                      Apr 15, 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 rotate-180">
                      <Download className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Subscription Payment</p>
                      <p className="text-sm text-muted-foreground">
                        Premium Plan
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-$49.99</p>
                    <p className="text-xs text-muted-foreground">
                      Apr 10, 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 rotate-180">
                      <Download className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Service Fee</p>
                      <p className="text-sm text-muted-foreground">
                        Transaction #12345
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-$5.00</p>
                    <p className="text-xs text-muted-foreground">Apr 5, 2025</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Download Statements</CardTitle>
              <CardDescription>
                Download your transaction statements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="statementPeriod">Select Period</Label>
                <Select>
                  <SelectTrigger id="statementPeriod">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apr2025">April 2025</SelectItem>
                    <SelectItem value="mar2025">March 2025</SelectItem>
                    <SelectItem value="feb2025">February 2025</SelectItem>
                    <SelectItem value="jan2025">January 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="statementFormat">Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="statementFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Download Statement</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>Manage your billing address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="billingName">Full Name</Label>
                <Input id="billingName" defaultValue="John Doe" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="billingAddress1">Address Line 1</Label>
                <Input id="billingAddress1" defaultValue="123 Main St" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="billingAddress2">Address Line 2</Label>
                <Input id="billingAddress2" defaultValue="Apt 4B" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="billingCity">City</Label>
                  <Input id="billingCity" defaultValue="Anytown" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="billingState">State</Label>
                  <Input id="billingState" defaultValue="NY" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="billingZip">Zip Code</Label>
                  <Input id="billingZip" defaultValue="12345" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="billingCountry">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="billingCountry">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full">Save Billing Address</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
