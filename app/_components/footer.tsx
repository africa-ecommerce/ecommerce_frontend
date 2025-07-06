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
            <Image
              src="/pluggn_logo.png"
              alt="Pluggn Logo"
              width={120}
              height={30}
              priority // Add this for above-the-fold logos
              className="h-auto" // Maintains aspect ratio
            />
            <p className="text-gray-400 mb-4 max-w-xs text-sm md:text-base">
              Empowering entrepreneurs across Africa to build successful
              digital businesses without inventory.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:opacity-80">
                <Image
                  src="/instagram_logo.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:opacity-80">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:opacity-80">
                <Image
                  src="/twitter.png"
                  alt="Twitter"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:opacity-80">
                <Image
                  src="/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="sr-only">WhatsApp</span>
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
                  href="/privacy"
                  className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} Pluggn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}