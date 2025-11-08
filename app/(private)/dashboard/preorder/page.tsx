"use client"

import { useState } from "react"
import { Check, Sparkles, Zap, Shield, TrendingUp } from "lucide-react"

export function ComingSoon() {
  const [joined, setJoined] = useState(false)
  const waitlistCount = 1247

  const features = [
    {
      icon: Sparkles,
      title: "Intuitive Design",
      description: "Beautiful and elegant interface",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Enterprise-grade security",
    },
    {
      icon: TrendingUp,
      title: "Scalable",
      description: "Grows with your needs",
    },
  ]

  const handleJoin = () => {
    setJoined(true)
    setTimeout(() => setJoined(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              ✦
            </div>
            <span className="font-semibold text-lg hidden sm:inline">NextGen</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Announcement Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-medium text-accent">Coming Soon</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-pretty animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Something <span className="text-accent">extraordinary</span> is coming
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Get early access to the platform that reimagines how teams work together. Be the first to experience the
            future.
          </p>

          {/* CTA Section */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={handleJoin}
              className={`px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 ${
                joined
                  ? "bg-accent/20 text-accent border border-accent flex items-center gap-2"
                  : "bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {joined ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>You're on the list!</span>
                </>
              ) : (
                "Be the First to Know"
              )}
            </button>
            <button className="px-8 py-4 rounded-full font-semibold text-base border border-border text-foreground hover:bg-secondary transition-colors">
              Learn More
            </button>
          </div>

          {/* Social Proof */}
          <div
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-accent/30 border border-background"></div>
              <div className="w-6 h-6 rounded-full bg-accent/20 border border-background"></div>
              <div className="w-6 h-6 rounded-full bg-accent/10 border border-background"></div>
            </div>
            <span>
              Join <span className="font-semibold text-foreground">{waitlistCount.toLocaleString()}</span> people
              waiting
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-pretty">What's coming your way</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of innovation with features designed for modern teams
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Timeline</h2>
            <p className="text-muted-foreground">Milestones on the road to launch</p>
          </div>

          <div className="space-y-8">
            {[
              { date: "Q1 2025", title: "Beta Launch", status: "current" },
              { date: "Q2 2025", title: "Feature Expansion", status: "upcoming" },
              { date: "Q3 2025", title: "Public Release", status: "upcoming" },
            ].map((milestone, index) => (
              <div
                key={index}
                className="flex gap-6 items-start animate-slide-up"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div
                  className={`w-4 h-4 rounded-full mt-2 flex-shrink-0 ${milestone.status === "current" ? "bg-accent" : "bg-muted"}`}
                ></div>
                <div>
                  <p className="text-sm font-semibold text-accent">{milestone.date}</p>
                  <p className="text-lg font-semibold text-foreground">{milestone.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/20">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Something extraordinary is coming.</p>
        </div>
      </footer>
    </div>
  )
}
