"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, ShoppingBag, Tag, CreditCard, Truck, MessageCircle, Mail, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NotificationSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [whatsappNotifications, setWhatsappNotifications] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState("immediate")

  // Notification categories
  const categories = [
    {
      id: "orders",
      name: "Orders",
      icon: <ShoppingBag className="h-5 w-5 text-primary" />,
      email: true,
      push: true,
      sms: false,
      whatsapp: true,
    },
    {
      id: "promotions",
      name: "Promotions & Deals",
      icon: <Tag className="h-5 w-5 text-purple-500" />,
      email: true,
      push: false,
      sms: false,
      whatsapp: false,
    },
    {
      id: "payments",
      name: "Payments",
      icon: <CreditCard className="h-5 w-5 text-green-500" />,
      email: true,
      push: true,
      sms: true,
      whatsapp: true,
    },
    {
      id: "shipping",
      name: "Shipping & Delivery",
      icon: <Truck className="h-5 w-5 text-blue-500" />,
      email: true,
      push: true,
      sms: true,
      whatsapp: true,
    },
    {
      id: "messages",
      name: "Messages from Sellers",
      icon: <MessageCircle className="h-5 w-5 text-yellow-500" />,
      email: true,
      push: true,
      sms: false,
      whatsapp: true,
    },
  ]

  // Toggle notification setting for a category
  const toggleCategorySetting = (categoryId: string, channel: "email" | "push" | "sms" | "whatsapp") => {
    // In a real app, this would update the state for the specific category and channel
    console.log(`Toggling ${channel} notifications for ${categoryId}`)
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/notifications" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Notification Settings</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/notifications" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Notification Settings</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Notification Channels */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Notification Channels</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="push-notifications" className="font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="sms-notifications" className="font-medium">
                          SMS Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500"
                        >
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        </svg>
                      </div>
                      <div>
                        <Label htmlFor="whatsapp-notifications" className="font-medium">
                          WhatsApp Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                      </div>
                    </div>
                    <Switch
                      id="whatsapp-notifications"
                      checked={whatsappNotifications}
                      onCheckedChange={setWhatsappNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Categories */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Notification Categories</h2>

                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          {category.icon}
                        </div>
                        <h3 className="font-medium">{category.name}</h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-12">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${category.id}-email`} className="text-sm">
                            Email
                          </Label>
                          <Switch
                            id={`${category.id}-email`}
                            checked={category.email}
                            onCheckedChange={() => toggleCategorySetting(category.id, "email")}
                            disabled={!emailNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${category.id}-push`} className="text-sm">
                            Push
                          </Label>
                          <Switch
                            id={`${category.id}-push`}
                            checked={category.push}
                            onCheckedChange={() => toggleCategorySetting(category.id, "push")}
                            disabled={!pushNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${category.id}-sms`} className="text-sm">
                            SMS
                          </Label>
                          <Switch
                            id={`${category.id}-sms`}
                            checked={category.sms}
                            onCheckedChange={() => toggleCategorySetting(category.id, "sms")}
                            disabled={!smsNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${category.id}-whatsapp`} className="text-sm">
                            WhatsApp
                          </Label>
                          <Switch
                            id={`${category.id}-whatsapp`}
                            checked={category.whatsapp}
                            onCheckedChange={() => toggleCategorySetting(category.id, "whatsapp")}
                            disabled={!whatsappNotifications}
                          />
                        </div>
                      </div>

                      {categories.indexOf(category) < categories.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Notification Preferences */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>

                <div className="space-y-4">
                  <div>
                    <Label className="font-medium mb-2 block">Notification Frequency</Label>
                    <RadioGroup value={notificationFrequency} onValueChange={setNotificationFrequency}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="immediate" id="immediate" />
                        <Label htmlFor="immediate">Immediate</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="hourly" id="hourly" />
                        <Label htmlFor="hourly">Hourly Digest</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Daily Digest</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound-notifications" className="font-medium">
                        Notification Sounds
                      </Label>
                      <Switch id="sound-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="vibration-notifications" className="font-medium">
                        Vibration
                      </Label>
                      <Switch id="vibration-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="do-not-disturb" className="font-medium">
                        Do Not Disturb
                      </Label>
                      <Switch id="do-not-disturb" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="font-medium mb-2 block">Quiet Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quiet-start" className="text-sm">
                          From
                        </Label>
                        <Input id="quiet-start" type="time" defaultValue="22:00" />
                      </div>
                      <div>
                        <Label htmlFor="quiet-end" className="text-sm">
                          To
                        </Label>
                        <Input id="quiet-end" type="time" defaultValue="07:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button className="w-full">Save Preferences</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Input component for time input
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

