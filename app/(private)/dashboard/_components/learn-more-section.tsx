"use client";

import type React from "react";
import { useState } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ExternalLink,
  Link,
  ShoppingBag,
  Zap,
  Heart,
  TrendingUp,
  Camera,
  Video,
  Settings,
} from "lucide-react";

interface PlatformInfo {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  requirements: string[];
  limitations: string[];
  opportunities: string[];
  steps: { title: string; description: string; completed?: boolean }[];
  tips: string[];
}

export default function LearnMoreSection() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {}
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState("instagram");

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const universalPrinciples = [
    {
      icon: <Link className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Always use your Pluggn store URL",
      description:
        "Use mystore.pluggn.store (e.g., yourstore.pluggn.store) as your main link across all platforms",
    },
    {
      icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "High-quality product images",
      description:
        "Pluggn shares help with this - always include marketing messages with product links",
    },
    {
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Sound human and trustworthy",
      description:
        "Maintain a friendly, authentic tone that builds trust with customers",
    },
    {
      icon: <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Optimize your bio",
      description:
        "Clearly state what you sell and include a call-to-action with your store URL",
    },
  ];

  const platforms: Record<string, PlatformInfo> = {
    instagram: {
      name: "Instagram",
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "text-pink-600",
      bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400",
      requirements: [
        "Professional Account for business features",
        "1k+ followers for Shop Now buttons",
      ],
      limitations: [
        "Only 1 clickable link in bio",
        "Links in captions/comments are NOT clickable",
      ],
      opportunities: [
        "Stories and Reels for engagement",
        "Hashtag discovery",
        "Visual product showcase",
      ],
      steps: [
        {
          title: "Switch to Professional Account",
          description:
            "Go to Settings > Account > Switch to Professional Account",
        },
        {
          title: "Optimize your bio",
          description:
            "🎁 Affordable Accessories & More\n🛍 Shop Now 👇\n🔗 mystore.pluggn.store (e.g., yourstore.pluggn.store)",
        },
        {
          title: "Post branded content",
          description: "Use Pluggn-generated branded images consistently",
        },
        {
          title: "Use relevant hashtags",
          description:
            "Include hashtags like #pluggn #perfumeplug #abujaaccessories",
        },
        {
          title: "Create Stories and Reels",
          description:
            "Post consistently to increase visibility and engagement",
        },
      ],
      tips: [
        "Post at least once daily to maintain visibility",
        "Use Instagram Stories highlights to showcase products",
        "Engage with comments and DMs promptly",
        "Collaborate with micro-influencers in your niche",
      ],
    },
    facebook: {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-600",
      requirements: ["Business Page for shop features"],
      limitations: ["Organic reach is limited"],
      opportunities: [
        "Clickable links in posts and bio",
        "Shop Now buttons",
        "Facebook Groups",
        "Marketplace",
      ],
      steps: [
        {
          title: "Create Business Page",
          description: "Set up a dedicated business page for your store",
        },
        {
          title: "Add website link",
          description:
            "Add mystore.pluggn.store (e.g., yourstore.pluggn.store) under 'About' section",
        },
        {
          title: "Add Shop Now button",
          description: "Link the button directly to your Pluggn store",
        },
        {
          title: "Share to relevant groups",
          description:
            "Post product content and share to relevant Facebook groups",
        },
        {
          title: "Pin your store link",
          description:
            "Pin a post with your store link to the top of your page",
        },
      ],
      tips: [
        "Join and actively participate in relevant Facebook groups",
        "Use Facebook Events for product launches",
        "Share customer testimonials and reviews",
        "Post during peak hours (1-3 PM and 7-9 PM)",
      ],
    },
    tiktok: {
      name: "TikTok",
      icon: <Video className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "text-black",
      bgColor: "bg-black",
      requirements: [
        "1,000 followers for bio link",
        "Business Account recommended",
      ],
      limitations: [
        "No clickable links in captions",
        "Link in bio requires 1k followers",
      ],
      opportunities: [
        "Viral potential",
        "Young audience",
        "Creative content formats",
        "Trend participation",
      ],
      steps: [
        {
          title: "Set up Business Account",
          description: "Switch to business account for analytics and features",
        },
        {
          title: "Create product showcase videos",
          description: "Show unboxings, usage, and product experiences",
        },
        {
          title: "Direct to other channels",
          description:
            "Mention: 'DM to shop or visit mystore.pluggn.store' (replace with your actual store URL)",
        },
        {
          title: "Post engaging content regularly",
          description:
            "Consistent posting to grow followers and reach 1k threshold",
        },
        {
          title: "Use trending sounds and hashtags",
          description: "Participate in trends to increase discoverability",
        },
      ],
      tips: [
        "Post 1-3 times daily for maximum growth",
        "Use trending sounds and effects",
        "Keep videos under 30 seconds for better engagement",
        "Respond to comments to boost engagement",
      ],
    },
    whatsapp: {
      name: "WhatsApp Business",
      icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-600",
      requirements: ["WhatsApp Business App"],
      limitations: ["Limited to direct messaging"],
      opportunities: [
        "Direct customer communication",
        "Catalog feature",
        "Auto-replies",
        "Status updates",
      ],
      steps: [
        {
          title: "Download WhatsApp Business",
          description: "Install the WhatsApp Business app from your app store",
        },
        {
          title: "Set up Business Profile",
          description:
            "Add your Pluggn store link (e.g., mystore.pluggn.store) in the business profile",
        },
        {
          title: "Create a Catalog",
          description:
            "Set up catalog with link in description, even if empty initially",
        },
        {
          title: "Set up auto-reply",
          description:
            "Thanks for reaching out! Shop here: mystore.pluggn.store 👇 (replace with your store URL)",
        },
        {
          title: "Share in Status and Groups",
          description:
            "Share Pluggn products with links in statuses and relevant groups",
        },
      ],
      tips: [
        "Use WhatsApp Status to showcase new products",
        "Create broadcast lists for regular customers",
        "Set business hours and quick replies",
        "Use voice messages for personal touch",
      ],
    },
    twitter: {
      name: "X (Twitter)",
      icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "text-black",
      bgColor: "bg-black",
      requirements: ["Active account"],
      limitations: ["Character limit for posts"],
      opportunities: [
        "Viral potential",
        "Real-time engagement",
        "Trending hashtags",
        "Thread storytelling",
      ],
      steps: [
        {
          title: "Optimize bio",
          description:
            "Affordable fashion | DM to order 🛍 mystore.pluggn.store (e.g., yourstore.pluggn.store)",
        },
        {
          title: "Tweet product drops",
          description: "Share new products with Pluggn links and images",
        },
        {
          title: "Share social proof",
          description: "Retweet testimonials, reviews, and customer photos",
        },
        {
          title: "Use trending hashtags",
          description: "Participate in relevant trending topics and hashtags",
        },
        {
          title: "Engage with community",
          description:
            "Reply to tweets, join conversations, build relationships",
        },
      ],
      tips: [
        "Tweet during peak hours (9 AM and 7-9 PM)",
        "Use threads to tell product stories",
        "Engage with influencers in your niche",
        "Share behind-the-scenes content",
      ],
    },
  };

  return (
    <div className="w-full max-w-none mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Social Media Marketing Strategy
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-2">
          Master social media marketing for your e-commerce store with
          platform-specific strategies and universal best practices.
        </p>
      </div>

      {/* Universal Principles */}
      <div className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-purple-200">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            Universal Principles
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            These principles apply to all social media platforms and form the
            foundation of your strategy.
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {universalPrinciples.map((principle, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-lg border"
              >
                <div className="text-purple-600 mt-1 flex-shrink-0">
                  {principle.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg min-w-max">
            {Object.entries(platforms).map(([key, platform]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className={platform.color}>{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Platform Content */}
        {Object.entries(platforms).map(([key, platform]) => (
          <div
            key={key}
            className={`space-y-4 sm:space-y-6 mt-6 ${
              activeTab === key ? "block" : "hidden"
            }`}
          >
            {/* Platform Overview */}
            <div className="bg-white border rounded-lg">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`p-2 sm:p-3 rounded-full text-white ${platform.bgColor} flex-shrink-0`}
                  >
                    {platform.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
                      {platform.name} Strategy
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Platform-specific requirements, limitations, and
                      opportunities
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Requirements */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <Settings className="w-4 h-4 flex-shrink-0" />
                      Requirements
                    </h3>
                    <div className="space-y-2">
                      {platform.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm leading-relaxed">
                            {req}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Limitations */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                      Limitations
                    </h3>
                    <div className="space-y-2">
                      {platform.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm leading-relaxed">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <TrendingUp className="w-4 h-4 flex-shrink-0" />
                      Opportunities
                    </h3>
                    <div className="space-y-2">
                      {platform.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm leading-relaxed">
                            {opportunity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Steps */}
            <div className="bg-white border rounded-lg">
              <div className="p-4 sm:p-6 border-b">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  Action Steps
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Follow these steps to set up and optimize your {platform.name}{" "}
                  presence
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {platform.steps.map((step, index) => {
                    const stepId = `${key}-step-${index}`;
                    const isCompleted = completedSteps[stepId];

                    return (
                      <div
                        key={index}
                        className={`p-3 sm:p-4 border rounded-lg transition-all ${
                          isCompleted
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleStep(stepId)}
                            className="mt-1 flex-shrink-0 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-semibold text-sm sm:text-base leading-tight ${
                                isCompleted ? "text-green-800" : "text-gray-900"
                              }`}
                            >
                              {index + 1}. {step.title}
                            </h3>
                            <p
                              className={`text-xs sm:text-sm mt-1 whitespace-pre-line leading-relaxed ${
                                isCompleted ? "text-green-700" : "text-gray-600"
                              }`}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-white border rounded-lg">
              <button
                onClick={() => toggleSection(`${key}-tips`)}
                className="w-full p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <h2 className="flex items-center justify-between text-lg sm:text-xl font-semibold">
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Pro Tips for {platform.name}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      expandedSections[`${key}-tips`] ? "rotate-180" : ""
                    }`}
                  />
                </h2>
              </button>
              {expandedSections[`${key}-tips`] && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="grid gap-3">
                    {platform.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <Zap className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-yellow-800 leading-relaxed">
                          {tip}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-blue-200">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <ExternalLink className="w-5 h-5 text-blue-600" />
            Quick Reference
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Key reminders for successful social media marketing
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-800 text-sm sm:text-base">
                ✅ Always Do
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Use your Pluggn store URL consistently
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Post high-quality, branded content
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Engage authentically with your audience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Include clear calls-to-action
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-red-800 text-sm sm:text-base">
                ❌ Never Do
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Spam or over-promote
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Ignore customer comments/messages
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Use low-quality images
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    Forget to include your store link
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
