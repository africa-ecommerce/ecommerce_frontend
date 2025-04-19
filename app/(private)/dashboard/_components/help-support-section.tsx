"use client";

import {
  ChevronLeft,
  Search,
  HelpCircle,
  MessageSquare,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HelpSupportSectionProps {
  onBack: () => void;
}

export function HelpSupportSection({ onBack }: HelpSupportSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for help..." className="pl-9" />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent>
                    To reset your password, go to the login screen and tap on
                    "Forgot Password". Enter your email address and follow the
                    instructions sent to your email.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How do I verify my identity?
                  </AccordionTrigger>
                  <AccordionContent>
                    To verify your identity, navigate to the "More" section,
                    then tap on "Identity Verification". Follow the step-by-step
                    process to submit your identification documents.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do I add a payment method?
                  </AccordionTrigger>
                  <AccordionContent>
                    To add a payment method, go to the "More" section, tap on
                    "Payment Settings", and then select "Add Payment Method".
                    Follow the prompts to enter your card or bank details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I change my notification settings?
                  </AccordionTrigger>
                  <AccordionContent>
                    To change your notification settings, go to the "More"
                    section, tap on "Notification Center", and then adjust your
                    preferences for push notifications, emails, and SMS.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How do I delete my account?
                  </AccordionTrigger>
                  <AccordionContent>
                    To delete your account, go to the "More" section, tap on
                    "Account Actions", and then select "Delete Account". Please
                    note that this action is permanent and cannot be undone.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Troubleshooting</CardTitle>
              <CardDescription>Common issues and solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trouble-1">
                  <AccordionTrigger>
                    App is running slow or crashing
                  </AccordionTrigger>
                  <AccordionContent>
                    Try clearing your app cache, ensuring your app is updated to
                    the latest version, and restarting your device. If the issue
                    persists, please contact our support team.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trouble-2">
                  <AccordionTrigger>
                    Payment failed or declined
                  </AccordionTrigger>
                  <AccordionContent>
                    Payment failures can occur due to insufficient funds,
                    expired cards, or security restrictions. Verify your payment
                    details, ensure sufficient funds, and try again. If the
                    issue persists, contact your bank or our support team.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trouble-3">
                  <AccordionTrigger>
                    Verification documents rejected
                  </AccordionTrigger>
                  <AccordionContent>
                    Documents may be rejected if they are unclear, expired, or
                    don't match your profile information. Ensure your documents
                    are current, clearly visible, and match the information in
                    your profile.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learn" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>
                Learn more about our features and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Getting Started Guide</p>
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of using our application
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Security Best Practices</p>
                    <p className="text-sm text-muted-foreground">
                      Learn how to keep your account secure
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Payment Methods Explained</p>
                    <p className="text-sm text-muted-foreground">
                      Understanding different payment options
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Identity Verification Guide</p>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step verification process
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Resources
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Watch helpful video guides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium">Getting Started Tutorial</p>
                    <p className="text-sm text-muted-foreground">3:45</p>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium">How to Verify Your Identity</p>
                    <p className="text-sm text-muted-foreground">2:30</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Videos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">
                    Chat with our support team
                  </p>
                </div>
                <div className="ml-auto px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  Online
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    support@example.com
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Submit a Support Ticket</h3>

                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What do you need help with?"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>

                <Button className="w-full">Submit Ticket</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Support Hours</CardTitle>
              <CardDescription>
                When our support team is available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 8:00 PM EST</p>
                </div>

                <div className="flex justify-between">
                  <p>Saturday</p>
                  <p>10:00 AM - 6:00 PM EST</p>
                </div>

                <div className="flex justify-between">
                  <p>Sunday</p>
                  <p>Closed</p>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  Emergency support is available 24/7 for account security
                  issues.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
