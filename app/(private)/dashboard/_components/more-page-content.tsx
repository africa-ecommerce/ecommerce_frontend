"use client";

import { useState } from "react";
import {
  User,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ProfileSection } from "./profile-section";
import { VerificationSection } from "./verification-section";
import { PaymentSection } from "./payment-section";
import { NotificationSection } from "./notification-section";
import { AppSettingsSection } from "./app-settings-section";
import { HelpSupportSection } from "./help-support-section";
import { AccountActionsSection } from "./account-actions-section";

type Section =
  | "profile"
  | "verification"
  | "payment"
  | "notifications"
  | "settings"
  | "help"
  | "account";

export function MorePageContent() {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection onBack={() => setActiveSection(null)} />;
      case "verification":
        return <VerificationSection onBack={() => setActiveSection(null)} />;
      case "payment":
        return <PaymentSection onBack={() => setActiveSection(null)} />;
      case "notifications":
        return <NotificationSection onBack={() => setActiveSection(null)} />;
      case "settings":
        return <AppSettingsSection onBack={() => setActiveSection(null)} />;
      case "help":
        return <HelpSupportSection onBack={() => setActiveSection(null)} />;
      case "account":
        return <AccountActionsSection onBack={() => setActiveSection(null)} />;
      default:
        return (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">More</h1>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>

            <div className="grid gap-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setActiveSection("profile")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span>Profile Management</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <Separator />

                  <button
                    onClick={() => setActiveSection("verification")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span>Identity Verification</span>
                        <span className="text-xs text-muted-foreground">
                          Verify your identity
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                        Pending
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>

                  <Separator />

                  <button
                    onClick={() => setActiveSection("payment")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <span>Payment Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setActiveSection("notifications")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <span>Notification Center</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <Separator />

                  <button
                    onClick={() => setActiveSection("settings")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Settings className="h-4 w-4 text-primary" />
                      </div>
                      <span>Application Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setActiveSection("help")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <HelpCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span>Help & Support</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <Separator />

                  <button
                    onClick={() => setActiveSection("account")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10">
                        <LogOut className="h-4 w-4 text-destructive" />
                      </div>
                      <span>Account Actions</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>

              <div className="text-center text-xs text-muted-foreground mt-4">
                Version 1.0.0
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container max-w-md mx-auto py-6 px-4">
      <ScrollArea className="h-[calc(100vh-100px)]">
        {renderActiveSection()}
      </ScrollArea>
    </div>
  );
}
