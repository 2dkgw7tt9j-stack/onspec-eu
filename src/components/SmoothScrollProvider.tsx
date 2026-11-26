"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("has-no-js");
    html.classList.add("has-js", "is-loaded", "is-ready", "is-first-loaded");

    const updateViewportVars = () => {
      const vw = document.documentElement.clientWidth * 0.01;
      const vh = window.innerHeight * 0.01;
      html.style.setProperty("--vw", `${vw}px`);
      html.style.setProperty("--vh", `${vh}px`);
      html.style.setProperty("--svh", `${vh}px`);
      html.style.setProperty("--dvh", `${vh}px`);
    };

    updateViewportVars();
    window.addEventListener("resize", updateViewportVars);

    // On mobile touch devices, use native buttery-smooth 120Hz momentum scrolling
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        window.innerWidth < 1024);

    if (!isTouchDevice) {
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      lenisRef.current = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        window.removeEventListener("resize", updateViewportVars);
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    return () => {
      window.removeEventListener("resize", updateViewportVars);
    };
  }, []);

  // On every route change: ensure instant rendering & reset scroll
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("has-js", "is-loaded", "is-ready");

    // Scroll to top instantly on route change
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    } else {
      window.scrollTo(0, 0);
    }

    // Guarantee all page elements are immediately revealed with zero blocking
    const revealAll = () => {
      const targets = document.querySelectorAll(
        ".scroll-reveal, [data-scroll], [data-anim-slide], .c-tile-feature, .c-hero-home_image-container"
      );
      targets.forEach((el) => {
        el.classList.add("is-revealed", "is-inview");
      });
    };

    revealAll();
    const t1 = setTimeout(revealAll, 100);
    const t2 = setTimeout(revealAll, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return <>{children}</>;
}

export default SmoothScrollProvider;
