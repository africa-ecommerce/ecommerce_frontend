"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Sample FAQ data
const faqCategories = [
 
  {
    id: "orders",
    name: "Orders & Payments",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        id: "track-order",
        question: "How do I track my order?",
        answer:
          "A link to track an order would be sent to your mail, click on it and you'll see the current status and delivery information.",
      },
     
      
    ],
  },

  {
    id: "delivery",
    name: "Shipping & Delivery",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        id: "delivery-time",
        question: "How long does delivery take?",
        answer:
          "Standard delivery typically takes 1-3 days in some location, and 3-7 days for some other locations."
          
      },
      {
        id: "delivery-cost",
        question: "How much does delivery cost?",
        answer:
          "Delivery costs vary based on location.",
      },
      {
        id: "delivery-areas",
        question: "Which areas do you deliver to?",
        answer:
          "We currently deliver to all major cities in Nigeria.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        id: "return-policy",
        question: "What is your return policy?",
        answer:
          "You can return most items within 3 days of delivery, provided they meet our return policy",
      },
     
      {
        id: "damaged-items",
        question: "What if I receive a damaged item?",
        answer:
          "If you receive a damaged item, please take photos and contact our support team within 24 hours of delivery. We'll arrange a replacement or refund.",
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "account"
  );
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
   
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
 console.log("formData", formData)
    try {
      const response = await fetch("/api/contact-support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({  email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp link handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "2349151425001"; // International format
    const message = encodeURIComponent(
      "Hi, I need help with my order/account. Please assist me."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Email link handler
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Support Request");
    const body = encodeURIComponent(
      "Hi Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you."
    );
    window.open(
      `mailto:support@pluggn.com.ng?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  // Filter FAQs based on search query
  const filteredFAQs =
    searchQuery.trim() === ""
      ? faqCategories
      : faqCategories
          .map((category) => ({
            ...category,
            questions: category.questions.filter(
              (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((category) => category.questions.length > 0);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Help & Support
          </h1>
          <p className="text-primary-foreground/80 mb-6">
            Find answers to your questions or contact our support team
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10 pr-4 h-12 bg-white text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  Frequently Asked Questions
                </h2>

                {filteredFAQs.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium mb-2">
                        No results found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We couldn't find any FAQs matching your search. Try
                        different keywords or contact our support team.
                      </p>
                      <Button onClick={handleWhatsAppClick}>
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs.map((category) => (
                      <Card
                        key={category.id}
                        className={
                          expandedCategory === category.id
                            ? "border-primary"
                            : ""
                        }
                      >
                        <div
                          className="p-4 flex items-center justify-between cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                expandedCategory === category.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              {category.icon}
                            </div>
                            <h3 className="font-medium ml-3">
                              {category.name}
                            </h3>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 text-muted-foreground transition-transform ${
                              expandedCategory === category.id
                                ? "transform rotate-180"
                                : ""
                            }`}
                          />
                        </div>

                        {expandedCategory === category.id && (
                          <div className="px-4 pb-4">
                            <Separator className="mb-4" />
                            <div className="space-y-3">
                              {category.questions.map((question) => (
                                <div key={question.id}>
                                  <div
                                    className="flex items-start justify-between cursor-pointer py-2"
                                    onClick={() => toggleQuestion(question.id)}
                                  >
                                    <h4 className="font-medium text-sm flex-1">
                                      {question.question}
                                    </h4>
                                    <ChevronDown
                                      className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ml-2 ${
                                        expandedQuestion === question.id
                                          ? "transform rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </div>

                                  {expandedQuestion === question.id && (
                                    <div className="text-sm text-muted-foreground mt-2 mb-4 pl-4 border-l-2 border-muted">
                                      {question.answer}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>

                <div className="space-y-3">
                  {[
                    {
                      id: "returns",
                      name: "Returns & Refunds",
                      icon: <ChevronRight className="h-5 w-5" />,
                    },
                    {
                      id: "delivery",
                      name: "Shipping & Delivery",
                      icon: <ChevronRight className="h-5 w-5" />,
                    },
                   
                  
                    {
                      id: "orders",
                      name: "Order Tracking",
                      icon: <ChevronRight className="h-5 w-5" />,
                    },
                  ].map((topic) => (
                    <Card key={topic.id} className="overflow-hidden">
                      <Link
                        href={`#${topic.id}`}
                        onClick={() => setExpandedCategory(topic.id)}
                      >
                        <CardContent className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                          <span>{topic.name}</span>
                          {topic.icon}
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">
                  Still Need Help?
                </h2>

                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleWhatsAppClick}
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Chat with Support
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleEmailClick}
                      >
                        <Mail className="h-5 w-5 mr-2" />
                        Email Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Our Support Team
                </h2>

                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is your inquiry about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your issue in detail..."
                          className="min-h-[150px]"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {submitStatus === "success" && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-green-800 text-sm">
                            Your message has been sent successfully! We'll get
                            back to you within 24 hours.
                          </p>
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-red-800 text-sm">
                            There was an error sending your message. Please try
                            again or contact us directly.
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Submit Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>

                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <a
                            href="mailto:support@pluggn.com.ng"
                            className="text-sm text-primary hover:underline"
                          >
                            support@pluggn.com.ng
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">
                            We aim to respond within 24 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">WhatsApp Support</h3>
                          <button
                            onClick={handleWhatsAppClick}
                            className="text-sm text-primary hover:underline"
                          >
                            +234 (0) 915 142 5001
                          </button>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fastest way to get help
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="font-medium mb-3">Our Office</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Lagos, Nigeria (HQ)</h4>
                        <p className="text-sm text-muted-foreground">
                         7, seidu ajibowu, ikeja
                          <br />
                          Lagos, Nigeria
                        </p>
                        
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Label({
  htmlFor,
  className,
  children,
}: {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2 ${className}`}
    >
      {children}
    </label>
  );
}

function Textarea({
  id,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      id={id}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
