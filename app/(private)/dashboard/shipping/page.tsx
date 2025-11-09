import React, { useState, useEffect } from "react";

export default function ComingSoonPage() {
  const [count, setCount] = useState(2847);
  const [isHovered, setIsHovered] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = () => {
    setJoined(true);
    setCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animate-delay-150"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animate-delay-300"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Teasing hint */}
        <div className="mb-8 inline-block">
          <span className="text-primary text-sm font-medium tracking-widest uppercase animate-pulse-gentle">
            Something Extraordinary
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
          Is Coming
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          We're crafting something that will change everything.
          <span className="block mt-2 text-primary">
            The wait will be worth it.
          </span>
        </p>

        {/* Join button */}
        <div className="mb-10">
          <button
            onClick={handleJoin}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={joined}
            className={`
              relative px-12 py-5 text-lg font-semibold rounded-full
              bg-primary text-primary-foreground shadow-2xl
              transform transition-all duration-300 ease-out
              ${isHovered && !joined ? "scale-110 shadow-primary/50" : ""}
              ${
                joined
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-primary/70 cursor-pointer"
              }
              disabled:transform-none
            `}
          >
            <span className="relative z-10">
              {joined ? "Welcome Aboard! 🎉" : "Join the Waitlist"}
            </span>
            {isHovered && !joined && (
              <span className="absolute inset-0 rounded-full bg-accent animate-pulse-gentle"></span>
            )}
          </button>
        </div>

        {/* Social proof counter */}
        <div className="text-muted-foreground text-sm md:text-base">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Join{" "}
            <span className="font-bold text-primary mx-1 text-lg">
              {count.toLocaleString()}
            </span>{" "}
            others anticipating launch
          </span>
        </div>

        {/* Mysterious hint */}
        <div className="mt-16 text-muted-foreground/60 text-xs tracking-wider">
          <p className="opacity-60">Big things ahead...</p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
