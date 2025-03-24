import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight, ShoppingBag, Globe, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "./_components/header"


export default function Home() {
  return (
       <div>
        <Header/>
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] md:min-h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=800')] bg-cover bg-center mix-blend-overlay z-0"></div>

          <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl">
              Bridging Digital and Physical Commerce for African Businesses
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-lg text-white/90">
              Empower your SME with a seamless online presence that grows your
              business across Africa
            </p>

            <div className="mt-8">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-12 md:py-16 px-4 container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Grow Your Business with AfriConnect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Globe className="h-10 w-10 text-primary" />}
              title="Expand Your Reach"
              description="Connect with millions of potential customers across Africa and beyond."
            />
            <BenefitCard
              icon={<ShoppingBag className="h-10 w-10 text-primary" />}
              title="Sell Anywhere"
              description="Manage sales through your website, WhatsApp, or physical store."
            />
            <BenefitCard
              icon={<TrendingUp className="h-10 w-10 text-primary" />}
              title="Grow Your Business"
              description="Increase sales and build a loyal customer base with powerful tools."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StepCard
                number="1"
                title="Create Your Store"
                description="Sign up and build your digital storefront in minutes, no technical skills required."
              />
              <StepCard
                number="2"
                title="Add Your Products"
                description="Upload your inventory with photos, descriptions, and prices."
              />
              <StepCard
                number="3"
                title="Start Selling"
                description="Accept orders online, through WhatsApp, or connect your physical store."
              />
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="rounded-full px-8">
                Start Selling Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Success Stories
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            See how businesses across Africa are thriving with AfriConnect
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="AfriConnect increased my sales by 200% in just 3 months. Now customers find me online and in my physical shop."
              name="Grace Okafor"
              business="Fashion Retailer"
              location="Lagos, Nigeria"
              image="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="I can now sell to customers across East Africa. The WhatsApp integration makes communication so easy."
              name="Daniel Mwangi"
              business="Artisan Crafts"
              location="Nairobi, Kenya"
              image="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="My market stall now has an online presence. Customers scan my QR code to see all my products."
              name="Amina Diallo"
              business="Spice Vendor"
              location="Dakar, Senegal"
              image="/placeholder.svg?height=80&width=80"
            />
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Featured Businesses
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BusinessCard
                  key={i}
                  name={`Store ${i}`}
                  category={i % 2 === 0 ? "Fashion" : "Home Goods"}
                  location={i % 3 === 0 ? "Ghana" : "Nigeria"}
                  image="/placeholder.svg?height=120&width=200"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold">44M+</div>
                <div className="mt-2 text-primary-foreground/90">
                  SMEs across Africa
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">500+</div>
                <div className="mt-2 text-primary-foreground/90">
                  Active merchants
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">180%</div>
                <div className="mt-2 text-primary-foreground/90">
                  Average sales increase
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-12 md:py-16 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Simple, Affordable Pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Plans that grow with your business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              title="Free"
              price="₦0"
              description="Perfect for starting your online journey"
              features={[
                "Up to 5 products",
                "Basic subdomain",
                "Standard website template",
                "Basic payment integration",
                "Community support",
              ]}
              buttonText="Start Free"
              buttonVariant="outline"
            />
            <PricingCard
              title="Premium"
              price="₦2,500"
              description="Most popular for growing businesses"
              features={[
                "Up to 50 products",
                "Custom domain option",
                "Advanced website templates",
                "Multiple payment gateways",
                "Priority support",
                "Featured in directory",
              ]}
              buttonText="Try Premium"
              buttonVariant="default"
              highlighted={true}
            />
            <PricingCard
              title="Business"
              price="₦5,000"
              description="Advanced tools for established businesses"
              features={[
                "Unlimited products",
                "Priority SEO optimization",
                "Advanced analytics",
                "Inventory management",
                "Multiple user accounts",
                "Premium support",
                "Marketing tools",
              ]}
              buttonText="Get Business"
              buttonVariant="outline"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to Start Selling?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-accent-foreground/90">
              Join thousands of African businesses already growing with
              AfriConnect
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 bg-white text-accent hover:bg-white/90"
            >
              Start Selling Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-muted/80">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">AfriConnect</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Seller Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/success-stories"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Success Stories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/partners"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/press"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AfriConnect. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
      </div>
  );
}

function SearchBar() {
  return (
    <Tabs defaultValue="products" className="w-full max-w-2xl bg-white/95 rounded-lg shadow-lg">
      <TabsList className="grid w-full grid-cols-2 mb-2">
        <TabsTrigger value="products">Find Products</TabsTrigger>
        <TabsTrigger value="stores">Find Stores</TabsTrigger>
      </TabsList>
      <TabsContent value="products" className="p-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search for products..." className="min-h-11" />
          <Button size="lg" className="shrink-0">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="stores" className="p-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search for stores..." className="min-h-11" />
          <Button size="lg" className="shrink-0">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-4">{icon}</div>
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function TestimonialCard({
  quote,
  name,
  business,
  location,
  image,
}: {
  quote: string
  name: string
  business: string
  location: string
  image: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4 flex-1">
            <p className="italic text-muted-foreground">"{quote}"</p>
          </div>
          <div className="flex items-center mt-4">
            <div className="mr-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image src={image || "/placeholder.svg"} alt={name} width={48} height={48} className="object-cover" />
              </div>
            </div>
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-muted-foreground">
                {business}, {location}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BusinessCard({
  name,
  category,
  location,
  image,
}: {
  name: string
  category: string
  location: string
  image: string
}) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] relative">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-base">{name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">{category}</span>
          <span className="text-xs text-muted-foreground">{location}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  highlighted?: boolean
}) {
  return (
    <Card className={`overflow-hidden h-full ${highlighted ? "ring-2 ring-primary shadow-lg relative" : ""}`}>
      {highlighted && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardContent className={`p-6 flex flex-col h-full ${highlighted ? "pt-10" : ""}`}>
        <div className="mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            <span className="ml-1 text-muted-foreground">/month</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <ul className="mt-4 space-y-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <div className="mr-2 mt-1 h-5 w-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button variant={buttonVariant} className="w-full" size="lg">
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

