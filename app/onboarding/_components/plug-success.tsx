

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShoppingCart,
  CreditCard,
  Share2,
  Lightbulb,
  Users,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define the confetti piece type
interface ConfettiPiece {
  id: number;
  left: string;
  startPosition: string;
  color: string;
  shape: string;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  rotationSpeed: number;
  horizontalSwing: number;
}

export default function PlugSuccess() {
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate random confetti pieces
    const generateConfetti = (): ConfettiPiece[] => {
      const colors = [
        "#FF7A29",
        "#4ADE80",
        "#38BDF8",
        "#A78BFA",
        "#FB923C",
        "#F472B6",
      ];
      const shapes = ["circle", "square", "rectangle"];
      const pieces: ConfettiPiece[] = [];

      for (let i = 0; i < 80; i++) {
        pieces.push({
          id: i,
          left: `${Math.random() * 100}%`,
          startPosition: `-${Math.random() * 20 + 5}vh`, // Start above the viewport
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          size: Math.floor(Math.random() * 8) + 3, // 3-10px
          delay: Math.random() * 1.5, // Shorter delay for faster start
          duration: Math.random() * 3 + 2, // 2-5s fall duration
          rotation: Math.floor(Math.random() * 360),
          rotationSpeed: (Math.random() - 0.5) * 720, // -360 to 360 degrees
          horizontalSwing: Math.random() * 40 - 20, // -20px to 20px
        });
      }
      return pieces;
    };

    setConfettiPieces(generateConfetti());

    // Hide confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Gradient top border */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF7A29] to-orange-400 z-10"></div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute"
              style={{
                left: piece.left,
                top: piece.startPosition,
                animation: `confettiFall ${piece.duration}s ease-in forwards ${piece.delay}s`,
              }}
            >
              <div
                style={{
                  backgroundColor: piece.color,
                  width: `${piece.size}px`,
                  height:
                    piece.shape === "rectangle"
                      ? `${piece.size * 2}px`
                      : `${piece.size}px`,
                  borderRadius: piece.shape === "circle" ? "50%" : "0",
                  transform: `rotate(${piece.rotation}deg)`,
                  animation: `confettiSpin ${Math.abs(
                    6 / piece.rotationSpeed
                  )}s linear infinite, confettiSwing ${
                    Math.random() * 2 + 1
                  }s ease-in-out infinite alternate`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center px-4 py-6 md:py-8 max-w-xl mx-auto">
        {/* Success icon with animation */}
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-green-50 flex items-center justify-center animate-pulse-subtle">
            <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-500" />
          </div>
        </div>

        {/* Main heading - Mobile first */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            You're All Set!
          </h1>
          <p className="text-[#FF7A29] font-medium text-base md:text-lg mb-2">
            Your journey to success begins now
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            Your Pluggn account has been created successfully. You're now ready
            to start your digital entrepreneurship journey and build your online
            presence.
          </p>
        </div>

        {/* Main action buttons - Stacked on mobile, side-by-side on larger screens */}
        <div className="w-full flex flex-col md:flex-row gap-3 mb-8">
          <Button
            asChild
            className="w-full md:w-[85%] md:flex-1 bg-[#FF7A29] py-3 text-sm md:text-base group transition-all duration-200 hover:scale-[1.02]"
          >
            <Link href="/dashboard">
              Go to Your Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full md:w-[85%] md:flex-1 border-[#FF7A29] text-[#FF7A29] py-3 text-sm md:text-base group transition-all duration-200"
          >
            <Link href="/store/create">
              Create Your Store Now
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* What You Can Do Next section - Single column on mobile, two columns on larger screens */}
        <Card className="w-full p-4 md:p-5 mb-6 text-left hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg md:text-xl mb-4 flex items-center">
            <span className="bg-[#FF7A29]/10 p-1.5 rounded-full mr-2 flex-shrink-0">
              <CheckCircle2 className="h-4 w-4 text-[#FF7A29]" />
            </span>
            What You Can Do Next
          </h2>

          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <div className="group">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <BarChart3 className="h-4 w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    Complete Your Dashboard
                  </h3>
                  <p className="text-xs text-gray-500">
                    Customize your store with your brand colors and logo
                  </p>
                  <div className="mt-1.5">
                    <Progress value={25} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <ShoppingCart className="h-4 w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Add Your Products</h3>
                  <p className="text-xs text-gray-500">
                    Expand your inventory with your first products
                  </p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <CreditCard className="h-4 w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Set Up Payments</h3>
                  <p className="text-xs text-gray-500">
                    Connect your payment methods to start receiving orders
                  </p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Share2 className="h-4 w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Promote Your Store</h3>
                  <p className="text-xs text-gray-500">
                    Share your store link on social media to attract customers
                  </p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Tips box - Restructured for mobile first */}
        <div className="w-full bg-[#FF7A29]/10 p-4 md:p-5 rounded-lg">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-[#FF7A29]/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-[#FF7A29]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-base text-center md:text-left mb-3">
                Quick Tips for Success
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>
                    Add high-quality product images to increase conversion rates
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>
                    Write detailed product descriptions to improve SEO
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>
                    Share your store on social media to reach more customers
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex justify-center md:justify-start">
                <Button
                  variant="outline"
                  className="bg-white text-[#FF7A29] border-[#FF7A29] text-sm group"
                >
                  <Users className="mr-1.5 h-3.5 w-3.5" />
                  Join the Pluggn Community
                  <ChevronRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

