"use client";
import { SwipeGuide } from "./swipe-guide";

interface SwipeGuideManagerProps {
  guides: Array<{
    context: string;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    condition?: () => boolean;
  }>;
}

export function SwipeGuideManager({ guides }: SwipeGuideManagerProps) {
  return (
    <>
      {guides.map(({ context, position, condition }) => {
        // Only render if condition is met (if provided)
        if (condition && !condition()) return null;

        return (
          <SwipeGuide key={context} context={context} position={position} />
        );
      })}
    </>
  );
}
