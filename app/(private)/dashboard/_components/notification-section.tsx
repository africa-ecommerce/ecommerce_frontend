"use client";

import {
  ChevronLeft,
  Bell,
  Mail,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotificationSectionProps {
  onBack: () => void;
}

export function NotificationSection({ onBack }: NotificationSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Notification Center</h1>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Manage your push notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">All Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Master toggle for all push notifications
                    </p>
                  </div>
                </div>
                <Switch id="push-all" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Account Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Security alerts and account changes
                    </p>
                  </div>
                </div>
                <Switch id="push-account" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Payment confirmations and receipts
                    </p>
                  </div>
                </div>
                <Switch id="push-payments" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Promotional Messages</p>
                    <p className="text-sm text-muted-foreground">
                      Deals, offers, and promotions
                    </p>
                  </div>
                </div>
                <Switch id="push-promo" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">All Emails</p>
                    <p className="text-sm text-muted-foreground">
                      Master toggle for all email notifications
                    </p>
                  </div>
                </div>
                <Switch id="email-all" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Account Statements</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly account statements
                    </p>
                  </div>
                </div>
                <Switch id="email-statements" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">
                      Weekly newsletter and updates
                    </p>
                  </div>
                </div>
                <Switch id="email-newsletter" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">
                      Special offers and promotions
                    </p>
                  </div>
                </div>
                <Switch id="email-marketing" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>
                Manage your SMS notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">All SMS</p>
                    <p className="text-sm text-muted-foreground">
                      Master toggle for all SMS notifications
                    </p>
                  </div>
                </div>
                <Switch id="sms-all" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Login attempts and security codes
                    </p>
                  </div>
                </div>
                <Switch id="sms-security" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Transaction Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Payment confirmations
                    </p>
                  </div>
                </div>
                <Switch id="sms-transactions" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notification History</CardTitle>
              <CardDescription>Recent notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-3 p-3 border rounded-md">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Payment Successful</p>
                      <p className="text-xs text-muted-foreground">2h ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your payment of $49.99 for Premium Subscription was
                      successful.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 border rounded-md">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Verification Reminder</p>
                      <p className="text-xs text-muted-foreground">1d ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please complete your identity verification to unlock all
                      features.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 border rounded-md">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">New Feature Available</p>
                      <p className="text-xs text-muted-foreground">3d ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      We've added new features to help you manage your account
                      more efficiently.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 border rounded-md">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Security Update</p>
                      <p className="text-xs text-muted-foreground">1w ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      We've enhanced our security measures to better protect
                      your account.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
