import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full py-10 md:py-12 lg:py-16 bg-[#0F172A] text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src="/pluggn_logo.png"
                alt="Pluggn Logo"
                width={120}
                height={30}
                priority // Add this for above-the-fold logos
                className="h-auto" // Maintains aspect ratio
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs text-sm md:text-base">
              The fulfillment infrastructure layer for emerging markets
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/pluggnhq/"
                className="text-gray-400 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className="h-5 w-5 fill-current"
                >
                  <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                      d="M 31.336 8.741 c -0.078 -1.71 -0.35 -2.878 -0.747 -3.9 c -0.403 -1.072 -1.036 -2.043 -1.853 -2.846 c -0.802 -0.817 -1.774 -1.45 -2.846 -1.854 c -1.022 -0.397 -2.19 -0.668 -3.9 -0.746 c -1.713 -0.078 -2.261 -0.097 -6.624 -0.097 s -4.911 0.019 -6.624 0.097 c -1.71 0.078 -2.878 0.35 -3.9 0.747 C 3.769 0.546 2.798 1.178 1.996 1.996 c -0.817 0.802 -1.45 1.773 -1.854 2.846 c -0.397 1.022 -0.668 2.19 -0.746 3.9 c -0.079 1.714 -0.097 2.261 -0.097 6.625 c 0 4.364 0.019 4.911 0.097 6.625 c 0.078 1.71 0.35 2.878 0.747 3.9 c 0.403 1.072 1.036 2.043 1.853 2.846 c 0.802 0.817 1.774 1.45 2.846 1.853 c 1.022 0.397 2.19 0.669 3.9 0.747 c 1.713 0.078 2.261 0.097 6.624 0.097 s 4.911 -0.018 6.624 -0.097 c 1.71 -0.078 2.878 -0.35 3.9 -0.747 c 2.158 -0.834 3.864 -2.541 4.699 -4.699 c 0.397 -1.022 0.669 -2.19 0.747 -3.9 c 0.078 -1.714 0.097 -2.261 0.097 -6.625 S 31.414 10.455 31.336 8.741 z M 28.444 21.858 c -0.071 1.567 -0.333 2.417 -0.553 2.983 c -0.541 1.401 -1.648 2.509 -3.049 3.049 c -0.566 0.22 -1.417 0.482 -2.983 0.553 c -1.694 0.077 -2.202 0.094 -6.492 0.094 c -4.291 0 -4.799 -0.016 -6.492 -0.094 c -1.566 -0.071 -2.417 -0.333 -2.983 -0.553 c -0.698 -0.258 -1.329 -0.668 -1.847 -1.202 c -0.534 -0.518 -0.944 -1.149 -1.202 -1.847 c -0.22 -0.566 -0.482 -1.417 -0.553 -2.983 c -0.077 -1.694 -0.094 -2.202 -0.094 -6.492 s 0.016 -4.798 0.094 -6.492 C 2.359 7.306 2.62 6.456 2.84 5.89 C 3.098 5.192 3.509 4.56 4.042 4.042 C 4.561 3.508 5.192 3.098 5.89 2.84 c 0.566 -0.22 1.417 -0.482 2.983 -0.553 c 1.694 -0.077 2.202 -0.093 6.492 -0.093 h 0 c 4.29 0 4.798 0.016 6.492 0.094 c 1.567 0.071 2.417 0.333 2.983 0.553 c 0.698 0.258 1.329 0.668 1.847 1.202 c 0.534 0.518 0.944 1.15 1.202 1.848 c 0.22 0.566 0.482 1.417 0.553 2.983 c 0.077 1.694 0.094 2.202 0.094 6.492 S 28.521 20.164 28.444 21.858 z"
                      transform="matrix(2.8008 0 0 2.8008 1.9639999999999986 1.9639999999999702)"
                    />
                    <path
                      d="M 15.365 7.115 c -4.557 0 -8.25 3.694 -8.25 8.25 s 3.694 8.251 8.25 8.251 c 4.557 0 8.251 -3.694 8.251 -8.251 S 19.922 7.115 15.365 7.115 z M 15.365 20.721 c -2.957 0 -5.355 -2.398 -5.355 -5.356 s 2.398 -5.356 5.356 -5.356 c 2.958 0 5.356 2.398 5.356 5.356 S 18.323 20.721 15.365 20.721 z"
                      transform="matrix(2.8008 0 0 2.8008 1.9639999999999986 1.9639999999999702)"
                    />
                    <path
                      d="M 25.87 6.789 c 0 1.065 -0.863 1.928 -1.928 1.928 c -1.065 0 -1.928 -0.863 -1.928 -1.928 c 0 -1.065 0.863 -1.928 1.928 -1.928 S 25.87 5.724 25.87 6.789 z"
                      transform="matrix(2.8008 0 0 2.8008 1.9639999999999986 1.9639999999999702)"
                    />
                  </g>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className="h-5 w-5 fill-current"
                >
                  <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                      d="M 45 -0.228 c -24.853 0 -45 20.25 -45 45.229 c 0 22.806 16.797 41.66 38.633 44.77 V 58.779 h -10.64 V 46.328 h 10.64 v -9.182 c 0 -10.656 6.441 -16.458 15.849 -16.458 c 4.506 0 8.38 0.339 9.508 0.491 v 11.136 l -6.525 0.003 c -5.116 0 -6.107 2.457 -6.107 6.061 v 7.949 h 12.202 l -1.589 12.451 H 51.359 v 30.993 C 73.199 86.666 90 67.81 90 45.001 C 90 20.022 69.853 -0.228 45 -0.228 z"
                      transform="matrix(1 0 0 1 0 0)"
                    />
                  </g>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://x.com/pluggnhq"
                className="text-gray-400 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className="h-5 w-5 fill-current"
                >
                  <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <polygon
                      points="24.89,23.01 57.79,66.99 65.24,66.99 32.34,23.01"
                      transform="matrix(1 0 0 1 0 0)"
                    />
                    <path
                      d="M 72.349 0 H 17.651 C 7.902 0 0 7.902 0 17.651 v 54.699 C 0 82.098 7.902 90 17.651 90 h 54.699 C 82.098 90 90 82.098 90 72.349 V 17.651 C 90 7.902 82.098 0 72.349 0 z M 56.032 70.504 L 41.054 50.477 L 22.516 70.504 h -4.765 L 38.925 47.63 L 17.884 19.496 h 16.217 L 47.895 37.94 l 17.072 -18.444 h 4.765 L 50.024 40.788 l 22.225 29.716 H 56.032 z"
                      transform="matrix(1 0 0 1 0 0)"
                    />
                  </g>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  For Suppliers
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  For Plugs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Contact
                </Link>
              </li>
             
              
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  About Us
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Privacy Policy
                </Link>
              </li>
             
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col items-center space-y-2">
          <p className="text-gray-400 text-xs md:text-sm text-center">
            © {new Date().getFullYear()} Pluggn. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs md:text-sm text-center">
            A brand of <span className="font-semibold">PLUGGN INNOVATIONS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
