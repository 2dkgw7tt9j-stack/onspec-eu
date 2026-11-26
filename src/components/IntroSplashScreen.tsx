"use client";

import React, { useEffect, useState, useCallback } from "react";

export function IntroSplashScreen() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
    }, 650);
  }, []);

  useEffect(() => {
    // Escape key listener to allow instant skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Progress counter animation from 0 to 100 over ~2.5 seconds
    const startTime = performance.now();
    const duration = 2500; // ms

    let animId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% briefly, then trigger elegant exit at ~2.8s total
        setTimeout(() => {
          dismiss();
        }, 300);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [dismiss]);

  if (!mounted) return null;

  return (
    <aside
      aria-label="Welcome to Onspec"
      className={`fixed inset-0 z-[9999999] flex flex-col justify-between bg-black text-white select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting
          ? "opacity-0 scale-[1.03] pointer-events-none"
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
          <span>ONSPEC // CYPRUS &amp; EU</span>
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
        <div className="relative mb-6 sm:mb-8 transform transition-all duration-1000 ease-out">
          <img
            src="/onspec_logo_dark_bg.png"
            alt="ONSPEC Logo"
            className="h-11 sm:h-20 md:h-24 w-auto object-contain mx-auto drop-shadow-[0_0_35px_rgba(255,255,255,0.12)]"
          />
        </div>

        {/* Monospace Architectural Eyebrow */}
        <p className="font-mono text-[11px] sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-2 sm:mb-3">
          Welcome to Onspec
        </p>

        {/* Slogan */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
          Your vision. Our execution.
        </h1>

        {/* Status Indicator */}
        <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span>Engineered To Operate : Fully Prepared</span>
        </div>
      </main>

      {/* Bottom Telemetry & Controls */}
      <footer className="relative z-10 px-4 pb-4 sm:px-12 sm:pb-8">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider mb-2.5">
          <span className="truncate max-w-[190px] sm:max-w-none">SPEC // READY BUSINESSES</span>
          <button
            type="button"
            onClick={dismiss}
            className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer py-1 px-2 -mr-1 shrink-0"
          >
            <span>Skip</span>
            <span className="text-[10px] text-neutral-600 sm:inline hidden group-hover:text-neutral-400">[ESC]</span>
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </button>
        </div>

        {/* Precision Progress Bar */}
        <div className="relative h-[2px] w-full bg-neutral-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </aside>
  );
}
