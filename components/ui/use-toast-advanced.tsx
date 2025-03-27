"use client";

import * as React from "react";

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast-advanced";
import { ToastIconComponent } from "@/components/ui/toast-icons";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  icon?: React.ReactNode;
  duration?: number;
  position?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  productImage?: string;
  productName?: string;
  variant?: string;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

// Haptic feedback patterns
const hapticPatterns = {
  success: [50],
  error: [100, 50, 100],
  warning: [75, 50],
  info: [25],
  cart: [40, 30, 40],
  primary: [60],
  default: [50],
};

function triggerHapticFeedback(variant = "default") {
  if (
    typeof window !== "undefined" &&
    window.navigator &&
    window.navigator.vibrate
  ) {
    const pattern =
      hapticPatterns[variant as keyof typeof hapticPatterns] ||
      hapticPatterns.default;
    window.navigator.vibrate(pattern);
  }
}

function toast({ ...props }: Toast) {
  const id = genId();

  // Trigger haptic feedback based on variant
  triggerHapticFeedback(props.variant);

  const update = (props: Toast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

// Enhanced toast functions with icons and variants
function successToast(
  message: string,
  title?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "success",
    title: title || "Success",
    description: message,
    icon: <ToastIconComponent variant="success" />,
    duration: 3000,
    ...options,
  });
}

function errorToast(message: string, title?: string, options?: Partial<Toast>) {
  return toast({
    variant: "error",
    title: title || "Error",
    description: message,
    icon: <ToastIconComponent variant="error" />,
    duration: 4000,
    ...options,
  });
}

function warningToast(
  message: string,
  title?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "warning",
    title: title || "Warning",
    description: message,
    icon: <ToastIconComponent variant="warning" />,
    duration: 4000,
    ...options,
  });
}

function infoToast(message: string, title?: string, options?: Partial<Toast>) {
  return toast({
    variant: "info",
    title: title || "Information",
    description: message,
    icon: <ToastIconComponent variant="info" />,
    duration: 3000,
    ...options,
  });
}

function cartToast(
  message: string,
  action?: ToastActionElement,
  options?: Partial<Toast> & { productImage?: string; productName?: string }
) {
  return toast({
    variant: "cart",
    title: "Added to Cart",
    description: message,
    icon: options?.productImage ? undefined : (
      <ToastIconComponent variant="cart" />
    ),
    action,
    duration: 3000,
    productImage: options?.productImage,
    productName: options?.productName,
    ...options,
  });
}

function notificationToast(
  message: string,
  title?: string,
  options?: Partial<Toast>
) {
  return toast({
    variant: "primary",
    title: title || "Notification",
    description: message,
    icon: <ToastIconComponent variant="notification" />,
    duration: 3000,
    ...options,
  });
}

export {
  useToast,
  toast,
  successToast,
  errorToast,
  warningToast,
  infoToast,
  cartToast,
  notificationToast,
};
