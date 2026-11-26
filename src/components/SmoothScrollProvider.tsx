"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

    // Global Scroll-Reveal Observer for buttery-smooth entrance animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed", "is-inview");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1,
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        "[data-reveal], [data-scroll], .reveal-on-scroll, .c-tile-feature, .c-hero-home_image-container"
      );
      targets.forEach((el) => {
        if (!el.classList.contains("is-revealed")) {
          revealObserver.observe(el);
        }
      });
    };

    observeElements();
    const observerTimer = setTimeout(observeElements, 500);

    // On mobile touch devices, disable Lenis touch hijacking to preserve buttery-smooth native momentum scrolling (60/120Hz)
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        window.innerWidth < 1024);

    if (isTouchDevice) {
      return () => {
        clearTimeout(observerTimer);
        revealObserver.disconnect();
        window.removeEventListener("resize", updateViewportVars);
      };
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      clearTimeout(observerTimer);
      revealObserver.disconnect();
      window.removeEventListener("resize", updateViewportVars);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrollProvider;
