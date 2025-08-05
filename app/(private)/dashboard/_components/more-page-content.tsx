

"use client";

import { useState } from "react";
import {
  User,
  CreditCard,
  LogOut,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ProfileSection } from "./profile-section";
import PaymentSection from "./payment-section";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IssueSection } from "./issue-section";
import  LearnMoreSection  from "./learn-more-section";

type Section = "profile" | "payment" | "issues" | "learnMore" | "account";

interface MorePageContentProps {
  onBack: () => void; // New prop to handle closing the more page
  userType: "PLUG" | "SUPPLIER";
}

export function MorePageContent({ onBack, userType }: MorePageContentProps) {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false); // State for the confirmation modal
  const router = useRouter();

  // Handler for back button in subsections
  const handleBackFromSection = () => {
    setActiveSection(null);
  };

  // Open the sign out confirmation modal
  const openSignOutModal = () => {
    setShowSignOutModal(true);
  };

  // Handle sign out process
  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        // Successfully logged out, redirect to login page
        router.push("/auth/login");
        successToast(result.message);
      } else {
        errorToast(result.error);
      }
    } catch (error) {
      errorToast("An error occurred while logging out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSection onBack={handleBackFromSection} userType={userType} />
        );

      case "payment":
        return (
          <PaymentSection onBack={handleBackFromSection} userType={userType} />
        );

      case "issues":
        return (
          <IssueSection onBack={handleBackFromSection} userType={userType} />
        );

      case "learnMore":
        return <LearnMoreSection onBack={handleBackFromSection} />;

      default:
        return (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {/* Add back button to close More component */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="mr-2"
                  aria-label="Back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl md:text-2xl font-bold">More</h1>
              </div>
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
                    onClick={() => setActiveSection("payment")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <span>Payment</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>

              {/* Learn More Section - Only for PLUG users */}
              {userType === "PLUG" && (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setActiveSection("learnMore")}
                      className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <span>Learn More</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </CardContent>
                </Card>
              )}

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setActiveSection("issues")}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <AlertCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span>Returns & Issues</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <Separator />

                  <button
                    onClick={openSignOutModal}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                    disabled={isLoggingOut}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10">
                        <LogOut className="h-4 w-4 text-destructive" />
                      </div>
                      <span>
                        {isLoggingOut ? "Signing Out..." : "Sign Out"}
                      </span>
                    </div>
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

      {/* Sign Out Confirmation Modal */}
      <AlertDialog open={showSignOutModal} onOpenChange={setShowSignOutModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out of your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Signing Out..." : "Sign Out"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}