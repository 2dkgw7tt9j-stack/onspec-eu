"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function FloatingNavPill() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled(y > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const isHome = pathname === "/";
  // Show if scrolled down OR if on any inner page
  const shouldShow = scrolled || !isHome;

  if (!shouldShow) return null;

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <aside
      aria-label="Quick page navigation"
      className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 pointer-events-auto transition-all duration-300 animate-fadeIn"
    >
      {/* Back Button (Only if not directly on the homepage, or if scrolled) */}
      {!isHome && (
        <button
          type="button"
          onClick={goBack}
          className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/90 hover:bg-black text-white text-xs font-mono tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          title="Go back to previous page"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13L5 8l5-5" />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>
      )}

      {/* Quick Return to Homepage X / Home (If on inner page) */}
      {!isHome && (
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black text-xs font-mono backdrop-blur-md border border-black/15 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:rotate-90"
          title="Return to Home (Close Page)"
          aria-label="Return to Home"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 3L3 11M3 3l8 8" />
          </svg>
        </Link>
      )}

      {/* Scroll to Top Button (When scrolled down) */}
      {scrolled && (
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center justify-center w-8 h-8 rounded-full bg-black/90 hover:bg-black text-white text-xs font-mono backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          title="Scroll back to top"
          aria-label="Scroll back to top"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10l5-5 5 5" />
          </svg>
        </button>
      )}
    </aside>
  );
}
