"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export function IntroSplashScreen() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
    }, 450);
  }, []);

  useEffect(() => {
    // ONLY show on the homepage, and ONLY ONCE per browser session
    if (pathname !== "/") {
      return;
    }

    try {
      if (sessionStorage.getItem("onspec_intro_shown")) {
        return;
      }
      sessionStorage.setItem("onspec_intro_shown", "true");
    } catch {
      // Ignore storage errors if disabled
    }

    setMounted(true);

    // Escape key or any click to allow instant skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Snappy progress animation from 0 to 100 over ~1.4 seconds
    const startTime = performance.now();
    const duration = 1400; // ms

    let animId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          dismiss();
        }, 200);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [pathname, dismiss]);

  if (!mounted) return null;

  return (
    <aside
      aria-label="Welcome to Onspec"
      onClick={dismiss}
      className={`fixed inset-0 z-[9999999] flex flex-col justify-between bg-black text-white select-none transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] cursor-pointer ${
        isExiting
          ? "opacity-0 scale-[1.02] pointer-events-none"
          : "opacity-100 scale-100 pointer-events-auto"
      }`}
    >
      {/* Background Architectural Subtle Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Telemetry Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-12 sm:py-8 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span>ONSPEC &bull; CYPRUS &amp; EUROPE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 hidden sm:inline">INITIALIZING</span>
          <span className="text-white font-bold tabular-nums">
            [{progress.toString().padStart(3, "0")}%]
          </span>
        </div>
      </header>

      {/* Center Cinematic Brand Composition */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto my-auto py-6 sm:py-12">
        {/* White Onspec Logo with Crisp Transparent Background */}
        <div className="relative mb-6 sm:mb-8 transform transition-all duration-700 ease-out">
          <img
            src="/onspec_logo_dark_bg.png"
            alt="ONSPEC Logo"
            className="h-11 sm:h-20 md:h-24 w-auto object-contain mx-auto drop-shadow-[0_0_35px_rgba(255,255,255,0.12)]"
          />
        </div>

        {/* Professional Human Typography (No robotic slashes) */}
        <p className="font-mono text-[11px] sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-2 sm:mb-3">
          TURNKEY BUSINESS ARCHITECTURE &bull; AI SYSTEMS
        </p>

        {/* Primary Slogan */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 max-w-2xl leading-tight">
          Welcome to Onspec.
          <br />
          <span className="text-neutral-300 font-normal">
            Your vision. Our execution.
          </span>
        </h1>

        {/* Minimalist Progress Meter */}
        <div className="w-48 sm:w-64 h-1 bg-neutral-900 rounded-full overflow-hidden mb-4 border border-neutral-800">
          <div
            className="h-full bg-white transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] sm:text-xs text-neutral-500 font-mono tracking-wider">
          Click anywhere or press Esc to enter
        </p>
      </main>

      {/* Bottom Footer Telemetry */}
      <footer className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-12 sm:py-8 font-mono text-[10px] sm:text-xs tracking-wider text-neutral-500 border-t border-neutral-900/80">
        <div className="flex items-center gap-3">
          <span>LIMASSOL &bull; NICOSIA &bull; ATHENS</span>
        </div>
        <div className="text-neutral-400">
          <span>&copy; {new Date().getFullYear()} ONSPEC</span>
        </div>
      </footer>
    </aside>
  );
}
