"use client";
 
import React, { useEffect, useRef } from "react";

// Kaal brand colors
const kaalColors = {
  50: "#EAF0FF", // Ice White
  100: "#A9B4C7", // Cool Grey
  200: "#FF4D1A", // Electric Orange (Kaal accent)
  300: "#FF6B00", // Orange variant
  400: "#E65A00", // Darker orange
  500: "#0B0E12", // Deep Void
  600: "#111722", // Subtle Elevation
  700: "#141C28", // Card Surface
  800: "#000000", // Black
  900: "#050505", // Dark background
};
 
export function HeroSection() {
  const gradientRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });
 
    // Mouse gradient
    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "0.3";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
 
    // Word hover effects with Kaal orange
    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(255, 77, 26, 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });
 
    // Click ripple effect with Kaal orange
    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(255, 77, 26, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);
 
    // Floating elements on scroll
    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll<HTMLElement>(".floating-element").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
          }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);
 
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
 
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0B0E12] to-[#050505] text-kaal-text font-body overflow-hidden relative w-full"
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255, 77, 26, 0.08)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          className="grid-line"
          style={{ animationDelay: "2.5s", opacity: 0.05 }}
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className="grid-line"
          style={{ animationDelay: "3s", opacity: 0.05 }}
        />
        <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
        <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
        <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
        <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
        <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: "4s" }} />
      </svg>
 
      {/* Corner elements */}
      <div className="corner-element top-8 left-8" style={{ animationDelay: "4s" }}>
        <div
          className="absolute top-0 left-0 w-2 h-2 opacity-30"
          style={{ background: kaalColors[200] }}
        ></div>
      </div>
      <div className="corner-element top-8 right-8" style={{ animationDelay: "4.2s" }}>
        <div
          className="absolute top-0 right-0 w-2 h-2 opacity-30"
          style={{ background: kaalColors[200] }}
        ></div>
      </div>
      <div className="corner-element bottom-8 left-8" style={{ animationDelay: "4.4s" }}>
        <div
          className="absolute bottom-0 left-0 w-2 h-2 opacity-30"
          style={{ background: kaalColors[200] }}
        ></div>
      </div>
      <div className="corner-element bottom-8 right-8" style={{ animationDelay: "4.6s" }}>
        <div
          className="absolute bottom-0 right-0 w-2 h-2 opacity-30"
          style={{ background: kaalColors[200] }}
        ></div>
      </div>
 
      {/* Floating elements */}
      <div className="floating-element" style={{ top: "25%", left: "15%", animationDelay: "5s" }}></div>
      <div className="floating-element" style={{ top: "60%", left: "85%", animationDelay: "5.5s" }}></div>
      <div className="floating-element" style={{ top: "40%", left: "10%", animationDelay: "6s" }}></div>
      <div className="floating-element" style={{ top: "75%", left: "90%", animationDelay: "6.5s" }}></div>
 
      <div className="relative z-10 min-h-screen flex flex-col justify-between items-center px-8 py-12 md:px-16 md:py-20">
        {/* Top tagline */}
        <div className="text-center">
          <h2
            className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
            style={{ color: kaalColors[200] }}
          >
            <span className="word" data-delay="0">
              High-Impact
            </span>
            {' '}
            <span className="word" data-delay="200">
              Web
            </span>
            {' '}
            <span className="word" data-delay="400">
              Design
            </span>
            {' '}
            <span className="word" data-delay="600">
              —
            </span>
            {' '}
            <span className="word" data-delay="800">
              Built
            </span>
            {' '}
            <span className="word" data-delay="1000">
              for
            </span>
            {' '}
            <span className="word" data-delay="1200">
              Ambitious
            </span>
            {' '}
            <span className="word" data-delay="1400">
              Brands.
            </span>
          </h2>
          <div
            className="mt-4 w-16 h-px opacity-30"
            style={{
              background: `linear-gradient(to right, transparent, ${kaalColors[200]}, transparent)`,
            }}
          ></div>
        </div>
 
        {/* Main headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tighter"
            style={{ color: kaalColors[50] }}
          >
            <div className="mb-4 md:mb-6">
              <span className="word" data-delay="1600">
                Design
              </span>
              {' '}
              <span className="word" data-delay="1750">
                Should
              </span>
              {' '}
              <span className="word" data-delay="1900" style={{ color: kaalColors[200] }}>
                Feel
              </span>
              {' '}
              <span className="word" data-delay="2050" style={{ color: kaalColors[200] }}>
                Intentional.
              </span>
            </div>
            <div
              className="text-2xl md:text-3xl lg:text-4xl font-display font-light leading-relaxed"
              style={{ color: kaalColors[100] }}
            >
              <span className="word" data-delay="2600">
                We
              </span>
              {' '}
              <span className="word" data-delay="2750">
                help
              </span>
              {' '}
              <span className="word" data-delay="2900">
                ambitious
              </span>
              {' '}
              <span className="word" data-delay="3050">
                brands
              </span>
              {' '}
              <span className="word" data-delay="3200">
                break
              </span>
              {' '}
              <span className="word" data-delay="3350">
                through
              </span>
              {' '}
              <span className="word" data-delay="3500">
                the
              </span>
              {' '}
              <span className="word" data-delay="3650">
                noise
              </span>
              {' '}
              <span className="word" data-delay="3800">
                by
              </span>
              {' '}
              <span className="word" data-delay="3950">
                building
              </span>
              {' '}
              <span className="word" data-delay="4100">
                high-performance
              </span>
              {' '}
              <span className="word" data-delay="4250">
                sites
              </span>
              {' '}
              <span className="word" data-delay="4400">
                that
              </span>
              {' '}
              <span className="word" data-delay="4550">
                don&apos;t
              </span>
              {' '}
              <span className="word" data-delay="4700">
                just
              </span>
              {' '}
              <span className="word" data-delay="4850">
                look
              </span>
              {' '}
              <span className="word" data-delay="5000">
                like
              </span>
              {' '}
              <span className="word" data-delay="5150">
                art—
              </span>
              {' '}
              <span className="word" data-delay="5300">
                they
              </span>
              {' '}
              <span className="word" data-delay="5450">
                convert
              </span>
              {' '}
              <span className="word" data-delay="5600">
                like
              </span>
              {' '}
              <span className="word" data-delay="5750">
                machines.
              </span>
            </div>
          </h1>
          <div
            className="absolute -left-8 top-1/2 w-4 h-px opacity-20"
            style={{
              background: kaalColors[200],
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "3.5s",
            }}
          ></div>
          <div
            className="absolute -right-8 top-1/2 w-4 h-px opacity-20"
            style={{
              background: kaalColors[200],
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "3.7s",
            }}
          ></div>
        </div>
 
        {/* Bottom tagline */}
        <div className="text-center">
          <div
            className="mb-4 w-16 h-px opacity-30"
            style={{
              background: `linear-gradient(to right, transparent, ${kaalColors[200]}, transparent)`,
            }}
          ></div>
          <h2
            className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
            style={{ color: kaalColors[200] }}
          >
            <span className="word" data-delay="6000">
              Cinematic
            </span>
            {' '}
            <span className="word" data-delay="6150">
              Impact,
            </span>
            {' '}
            <span className="word" data-delay="6300">
              Conversion
            </span>
            {' '}
            <span className="word" data-delay="6450">
              Driven,
            </span>
            {' '}
            <span className="word" data-delay="6600">
              Zero
            </span>
            {' '}
            <span className="word" data-delay="6750">
              Friction.
            </span>
          </h2>
          <div
            className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "4.5s",
            }}
          >
            <div
              className="w-1 h-1 rounded-full opacity-40"
              style={{ background: kaalColors[200] }}
            ></div>
            <div
              className="w-1 h-1 rounded-full opacity-60"
              style={{ background: kaalColors[200] }}
            ></div>
            <div
              className="w-1 h-1 rounded-full opacity-40"
              style={{ background: kaalColors[200] }}
            ></div>
          </div>
        </div>
      </div>
 
      <div
        id="mouse-gradient"
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background: `radial-gradient(circle, ${kaalColors[200]}0D 0%, transparent 100%)`,
        }}
      ></div>
    </div>
  );
}
