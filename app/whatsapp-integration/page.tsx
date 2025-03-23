"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  QrCode,
  Smartphone,
  Check,
  Copy,
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Settings,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function WhatsAppIntegrationPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("+234 812 345 6789")
  const [activeTab, setActiveTab] = useState("connect")

  // Connect WhatsApp
  const connectWhatsApp = () => {
    // In a real app, this would initiate the WhatsApp connection process
    setIsConnected(true)
    setActiveTab("settings")
  }

  // Disconnect WhatsApp
  const disconnectWhatsApp = () => {
    // In a real app, this would disconnect the WhatsApp account
    setIsConnected(false)
    setActiveTab("connect")
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification
    alert("Copied to clipboard!")
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/dashboard" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">WhatsApp Integration</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">WhatsApp Integration</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="connect" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="connect">Connect</TabsTrigger>
              <TabsTrigger value="settings" disabled={!isConnected}>
                Settings
              </TabsTrigger>
              <TabsTrigger value="templates" disabled={!isConnected}>
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connect">
              <Card className="border-none shadow-sm mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                      <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                        {isConnected ? (
                          <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Check className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="text-sm font-medium">Connected</p>
                          </div>
                        ) : (
                          <QrCode className="h-24 w-24 text-muted-foreground" />
                        )}
                      </div>
                      {!isConnected && (
                        <p className="text-sm text-center text-muted-foreground">
                          Scan this QR code with your WhatsApp
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-medium mb-4">
                        {isConnected ? "WhatsApp Connected" : "Connect Your WhatsApp Business Account"}
                      </h2>

                      {isConnected ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Connected Number</Label>
                            <div className="flex items-center mt-1">
                              <Smartphone className="h-5 w-5 text-muted-foreground mr-2" />
                              <span className="font-medium">{phoneNumber}</span>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm text-muted-foreground">Status</Label>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="font-medium">Active</span>
                            </div>
                          </div>

                          <Button variant="destructive" onClick={disconnectWhatsApp}>
                            Disconnect WhatsApp
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Connect your WhatsApp Business account to AfriConnect to enable seamless communication with
                            your customers.
                          </p>

                          <div className="space-y-2">
                            <h3 className="font-medium">How to connect:</h3>
                            <ol className="space-y-2 text-sm text-muted-foreground ml-5 list-decimal">
                              <li>Open WhatsApp on your phone</li>
                              <li>Tap Menu or Settings and select Linked Devices</li>
                              <li>Tap on "Link a Device"</li>
                              <li>Point your phone to this screen to scan the QR code</li>
                            </ol>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="flex-1" onClick={connectWhatsApp}>
                              Connect WhatsApp
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Need Help?
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">Benefits of WhatsApp Integration</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Direct Communication</h3>
                        <p className="text-sm text-muted-foreground">
                          Chat directly with customers through WhatsApp, their preferred messaging platform.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Order Updates</h3>
                        <p className="text-sm text-muted-foreground">
                          Send automated order confirmations, shipping updates, and delivery notifications.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Customer Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Provide real-time customer support and answer product questions instantly.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M12 2v4" />
                          <path d="M12 18v4" />
                          <path d="m4.93 4.93 2.83 2.83" />
                          <path d="m16.24 16.24 2.83 2.83" />
                          <path d="M2 12h4" />
                          <path d="M18 12h4" />
                          <path d="m4.93 19.07 2.83-2.83" />
                          <path d="m16.24 7.76 2.83-2.83" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Marketing Campaigns</h3>
                        <p className="text-sm text-muted-foreground">
                          Send promotional messages, special offers, and product announcements.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-none shadow-sm mb-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">WhatsApp Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="business-name" className="font-medium">
                        Business Name
                      </Label>
                      <Input id="business-name" defaultValue="Adire Textiles" />
                      <p className="text-xs text-muted-foreground mt-1">
                        This name will be displayed to customers in WhatsApp messages.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="business-description" className="font-medium">
                        Business Description
                      </Label>
                      <Textarea
                        id="business-description"
                        defaultValue="Traditional African fabrics and modern clothing designs. Handcrafted by skilled artisans."
                        className="min-h-[100px]"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Notification Settings</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-notifications" className="flex-1">
                            <span className="font-medium">Order Notifications</span>
                            <p className="text-xs text-muted-foreground">Send notifications for new orders</p>
                          </Label>
                          <Switch id="order-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="payment-notifications" className="flex-1">
                            <span className="font-medium">Payment Notifications</span>
                            <p className="text-xs text-muted-foreground">Send notifications for payments</p>
                          </Label>
                          <Switch id="payment-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="shipping-notifications" className="flex-1">
                            <span className="font-medium">Shipping Notifications</span>
                            <p className="text-xs text-muted-foreground">Send notifications when orders are shipped</p>
                          </Label>
                          <Switch id="shipping-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="delivery-notifications" className="flex-1">
                            <span className="font-medium">Delivery Notifications</span>
                            <p className="text-xs text-muted-foreground">
                              Send notifications when orders are delivered
                            </p>
                          </Label>
                          <Switch id="delivery-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Auto-Reply Settings</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-reply" className="flex-1">
                            <span className="font-medium">Enable Auto-Reply</span>
                            <p className="text-xs text-muted-foreground">Automatically reply to customer messages</p>
                          </Label>
                          <Switch id="auto-reply" defaultChecked />
                        </div>

                        <div>
                          <Label htmlFor="auto-reply-message" className="font-medium">
                            Auto-Reply Message
                          </Label>
                          <Textarea
                            id="auto-reply-message"
                            defaultValue="Thank you for contacting Adire Textiles. We'll get back to you as soon as possible. In the meantime, you can browse our products at africonnect.com/adire-textiles"
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">WhatsApp Business API</h2>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Use these API credentials to integrate WhatsApp with your other business systems.
                    </p>

                    <div>
                      <Label className="text-sm text-muted-foreground">API Key</Label>
                      <div className="flex items-center mt-1">
                        <Input value="wba_12345678abcdefghijklmnopqrstuvwxyz" readOnly className="font-mono text-sm" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard("wba_12345678abcdefghijklmnopqrstuvwxyz")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">API Secret</Label>
                      <div className="flex items-center mt-1">
                        <Input value="••••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard("wbs_98765432zyxwvutsrqponmlkjihgfedcba")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">Webhook URL</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          value="https://africonnect.com/api/whatsapp/webhook"
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard("https://africonnect.com/api/whatsapp/webhook")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Advanced API Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card className="border-none shadow-sm mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Message Templates</h2>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Message templates help you send consistent messages to your customers. Create templates for common
                    scenarios like order confirmations, shipping updates, and more.
                  </p>

                  <div className="space-y-4">
                    {[
                      { name: "Order Confirmation", status: "approved", language: "English", category: "UTILITY" },
                      { name: "Shipping Update", status: "approved", language: "English", category: "UTILITY" },
                      { name: "Delivery Notification", status: "approved", language: "English", category: "UTILITY" },
                      { name: "Payment Confirmation", status: "approved", language: "English", category: "UTILITY" },
                      { name: "Welcome Message", status: "approved", language: "English", category: "MARKETING" },
                      { name: "Product Promotion", status: "pending", language: "English", category: "MARKETING" },
                    ].map((template, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{template.name}</h3>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2">
                                  {template.language}
                                </Badge>
                                <Badge variant="outline">{template.category}</Badge>
                                {template.status === "pending" && (
                                  <Badge className="ml-2 bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20 border-none">
                                    Pending Review
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">Template Guidelines</h2>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      All message templates must be approved by WhatsApp before they can be used. Follow these
                      guidelines to ensure your templates are approved:
                    </p>

                    <div className="space-y-2">
                      <h3 className="font-medium">Do:</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-5 list-disc">
                        <li>Keep messages clear and concise</li>
                        <li>Use proper grammar and spelling</li>
                        <li>Include only necessary information</li>
                        <li>Use placeholders for personalized information</li>
                        <li>Follow WhatsApp's content policy</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Don't:</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-5 list-disc">
                        <li>Include promotional content in utility templates</li>
                        <li>Use all caps or excessive punctuation</li>
                        <li>Include misleading or deceptive content</li>
                        <li>Use templates for unsolicited messages</li>
                        <li>Include sensitive or personal information</li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        View WhatsApp's Template Guidelines
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

