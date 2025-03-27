"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastProgressBar,
  ToastIcon,
  ToastProductPreview,
} from "@/components/ui/toast-advanced";
import { useToast } from "@/components/ui/use-toast-advanced";

export function ToasterAdvanced() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(
        ({
          id,
          title,
          description,
          action,
          icon,
          duration,
          variant,
          productImage,
          productName,
          ...props
        }) => (
          <Toast key={id} {...props} variant={variant}>
            <div className="flex items-start gap-3 w-full">
              {productImage ? (
                <ToastProductPreview
                  productImage={productImage}
                  productName={productName}
                />
              ) : icon ? (
                <ToastIcon variant={variant} icon={icon} />
              ) : null}

              <div className="flex-1 flex flex-col gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>

              {action}
            </div>
            <ToastClose />
            <ToastProgressBar duration={duration} variant={variant} />
          </Toast>
        )
      )}
      <ToastViewport />
    </ToastProvider>
  );
}
