import { LoadingIndicatorAdvanced } from "@/components/ui/loading-indicator-advanced";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingIndicatorAdvanced
        size="large"
        type="pattern"
        fullScreen
        showText
        text="Preparing your experience..."
      />
    </div>
  );
}
