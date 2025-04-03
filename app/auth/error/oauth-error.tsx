import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OAuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-red-50 p-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Authentication Failed
          </h1>

          <p className="text-gray-600">
            We were unable to complete your sign-in request.
          </p>

          <div className="w-full text-left">
            <p className="mb-2 font-medium text-gray-700">
              This could be due to:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-600">
              <li>Invalid credentials</li>
              <li>Account access revoked</li>
              <li>Session expired</li>
              <li>Server error</li>
            </ul>
          </div>

          <div className="flex w-full flex-col gap-2 pt-2 sm:flex-row">
            
            <Button className="w-full bg-[#FF7A29] hover:bg-[#FF7A29]/90">
            <Link href="/auth/login">
              Try Again
              </Link>
            </Button>
           
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-center text-xs text-gray-500">
          <div className="flex justify-center space-x-4">
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
