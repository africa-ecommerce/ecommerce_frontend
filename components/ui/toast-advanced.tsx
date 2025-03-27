"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-600",
        error: "border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/5 text-red-600",
        warning: "border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 text-yellow-600",
        info: "border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-blue-600/5 text-blue-600",
        primary: "border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 text-primary",
        cart: "border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5 text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

// Progress bar for auto-dismissal
const ToastProgressBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    duration?: number
    variant?: string
  }
>(({ className, duration = 5000, variant = "default", ...props }, ref) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateProgress = () => {
      const now = Date.now()
      const remaining = Math.max(0, endTime - now)
      const newProgress = 100 - (remaining / duration) * 100

      setProgress(newProgress)

      if (remaining > 0) {
        requestAnimationFrame(updateProgress)
      }
    }

    const animationId = requestAnimationFrame(updateProgress)

    return () => cancelAnimationFrame(animationId)
  }, [duration])

  // Map variant to color
  const getProgressColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-blue-500"
      case "primary":
        return "bg-primary"
      case "cart":
        return "bg-accent"
      default:
        return "bg-foreground/20"
    }
  }

  return (
    <div ref={ref} className={cn("absolute bottom-0 left-0 h-1 w-full bg-foreground/10", className)} {...props}>
      <div className={cn("h-full transition-all", getProgressColor())} style={{ width: `${progress}%` }} />
    </div>
  )
})
ToastProgressBar.displayName = "ToastProgressBar"

// Toast Icon with animation
const ToastIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: string
    icon?: React.ReactNode
  }
>(({ className, variant = "default", icon, ...props }, ref) => {
  // Map variant to animation and background
  const getAnimationAndBg = () => {
    switch (variant) {
      case "success":
        return "animate-success-pulse bg-green-500/20"
      case "error":
        return "animate-error-pulse bg-red-500/20"
      case "warning":
        return "animate-warning-pulse bg-yellow-500/20"
      case "info":
        return "animate-info-pulse bg-blue-500/20"
      case "primary":
        return "animate-primary-pulse bg-primary/20"
      case "cart":
        return "animate-cart-pulse bg-accent/20"
      default:
        return "animate-pulse bg-foreground/20"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
        getAnimationAndBg(),
        className,
      )}
      {...props}
    >
      {icon}
    </div>
  )
})
ToastIcon.displayName = "ToastIcon"

// Product preview for cart toasts
const ToastProductPreview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    productImage?: string
    productName?: string
  }
>(({ className, productImage, productName, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border border-border", className)}
      {...props}
    >
      {productImage && (
        <div className="relative w-full h-full">
          <img
            src={productImage || "/placeholder.svg"}
            alt={productName || "Product"}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  )
})
ToastProductPreview.displayName = "ToastProductPreview"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastProgressBar,
  ToastIcon,
  ToastProductPreview,
}

