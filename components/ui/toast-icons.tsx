import { CheckCircle, AlertCircle, AlertTriangle, Info, ShoppingCart, Bell, Zap } from "lucide-react"

type ToastIconProps = {
  variant: "success" | "error" | "warning" | "info" | "cart" | "primary" | string
  className?: string
}

export function ToastIconComponent({ variant, className }: ToastIconProps) {
  const iconClassName = `h-5 w-5 ${className || ""}`

  switch (variant) {
    case "success":
      return <CheckCircle className={iconClassName} />
    case "error":
      return <AlertCircle className={iconClassName} />
    case "warning":
      return <AlertTriangle className={iconClassName} />
    case "info":
      return <Info className={iconClassName} />
    case "cart":
      return <ShoppingCart className={iconClassName} />
    case "notification":
      return <Bell className={iconClassName} />
    case "primary":
      return <Zap className={iconClassName} />
    default:
      return <Info className={iconClassName} />
  }
}

