import Link from "next/link";
import { ErrorIllustration } from "./error-illustration";

export default function SubdomainErrorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <ErrorIllustration />

          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800">Oops! This subdomain isn't available</h1>
            <p className="mt-2 text-xl text-gray-600">
            The subdomain you're trying to access either doesn't exist, has been removed, or is temporarily unavailable.
            </p>
          </div>

         
        </div>
      </main>

      <footer className="py-6 px-4 text-center text-sm text-gray-500">
        <div className="flex justify-center items-center gap-6 mb-4">
          <Link
            href="https://pluggn.vercel.app"
            className="hover:text-purple-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="https://pluggn.vercel.app/help"
            className="hover:text-purple-600 transition-colors"
          >
            Contact Support
          </Link>
          
        </div>
        <p>© {new Date().getFullYear()} Pluggn</p>
      </footer>
    </div>
  );
}
