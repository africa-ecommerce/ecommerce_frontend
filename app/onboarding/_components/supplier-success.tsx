"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Package,
  CreditCard,
  Share2,
  Lightbulb,
  Users,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the confetti piece type
interface ConfettiPiece {
  id: number
  left: string
  startPosition: string
  color: string
  shape: string
  size: number
  delay: number
  duration: number
  rotation: number
  rotationSpeed: number
  horizontalSwing: number
}

export default function SupplierSuccess() {
  const [showConfetti, setShowConfetti] = useState<boolean>(true)
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Generate random confetti pieces
    const generateConfetti = (): ConfettiPiece[] => {
      const colors = ["#FF7A29", "#4ADE80", "#38BDF8", "#A78BFA", "#FB923C", "#F472B6"]
      const shapes = ["circle", "square", "rectangle"]
      const pieces: ConfettiPiece[] = []

      // Use fewer confetti pieces for better performance
      const confettiCount = 60

      for (let i = 0; i < confettiCount; i++) {
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
        })
      }
      return pieces
    }

    setConfettiPieces(generateConfetti())

    // Hide confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => {
      clearTimeout(confettiTimer)
    }
  }, [])

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
                  height: piece.shape === "rectangle" ? `${piece.size * 2}px` : `${piece.size}px`,
                  borderRadius: piece.shape === "circle" ? "50%" : "0",
                  transform: `rotate(${piece.rotation}deg)`,
                  animation: `confettiSpin ${Math.abs(6 / piece.rotationSpeed)}s linear infinite, confettiSwing ${
                    Math.random() * 2 + 1
                  }s ease-in-out infinite alternate`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        {/* Success icon with animation */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full bg-green-50 flex items-center justify-center animate-pulse-subtle">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-500" />
          </div>
        </div>

        {/* Main heading - Responsive text sizing */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Supplier Registration Complete!
          </h1>
          <p className="text-[#FF7A29] font-medium text-sm sm:text-base md:text-lg mb-2">Your supplier account is now active</p>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Congratulations! Your supplier account has been successfully created. You can now access your dashboard to
            manage your products, receive orders, and grow your business.
          </p>
        </div>

        {/* Verification alert - Highlighting importance */}
        <Alert className="w-full mb-5 bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-xs sm:text-sm ml-2">
            <span className="font-medium">Important:</span> Complete verification to start receiving orders from customers. Verified suppliers receive 5x more orders!
          </AlertDescription>
        </Alert>

        {/* Main action buttons - Stack on mobile, side by side on larger screens */}
       

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
            <Link href="/">
               Complete Verification
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* What You Can Do Next section - Responsive grid */}
        <Card className="w-full p-3 sm:p-4 md:p-5 mb-5 sm:mb-6 text-left hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 flex items-center">
            <span className="bg-[#FF7A29]/10 p-1.5 rounded-full mr-2 flex-shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF7A29]" />
            </span>
            Next Steps for Suppliers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <div className="group">
              <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-xs sm:text-sm">Complete Verification</h3>
                  <p className="text-xs text-gray-500">Verify your business to start receiving customer orders</p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-xs sm:text-sm">Complete Your Profile</h3>
                  <p className="text-xs text-gray-500">Add your company details and business information</p>
                  <div className="mt-1.5">
                    <Progress value={25} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-xs sm:text-sm">Add Your Products</h3>
                  <p className="text-xs text-gray-500">Upload your product catalog with descriptions and pricing</p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-xs sm:text-sm">Set Up Payment Details</h3>
                  <p className="text-xs text-gray-500">Connect your bank account to receive payments</p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="group sm:col-span-2 md:col-span-1">
              <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF7A29]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-xs sm:text-sm">Set Shipping Options</h3>
                  <p className="text-xs text-gray-500">Configure your shipping methods and delivery areas</p>
                  <div className="mt-1.5">
                    <Progress value={0} className="h-1.5 bg-gray-100 w-full" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </Card>

        {/* Quick Tips box - Responsive layout */}
        <div className="w-full bg-[#FF7A29]/10 p-3 sm:p-4 md:p-5 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#FF7A29]/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF7A29]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm sm:text-base text-center sm:text-left mb-2 sm:mb-3">Supplier Success Tips</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>Complete verification to start receiving orders from customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>Maintain accurate inventory levels to prevent overselling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>Respond quickly to order notifications for better ratings</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A29] flex-shrink-0"></div>
                  <span>Provide detailed product specifications to reduce returns</span>
                </li>
              </ul>
              <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                <Button variant="outline" className="bg-white text-[#FF7A29] border-[#FF7A29] text-xs sm:text-sm group h-8 sm:h-9">
                  <Users className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Join Supplier Community
                  <ChevronRight className="ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes confettiSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes confettiSwing {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--swing-distance, 10px));
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}