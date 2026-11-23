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

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

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
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrollProvider;
