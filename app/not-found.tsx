import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-primary text-4xl font-bold">404</span>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">Page Not Found</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/help">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

