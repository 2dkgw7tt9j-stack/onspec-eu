"use client";

import React, { useEffect, useRef, useState } from "react";

export interface InfiniteMarqueeProps {
  children?: React.ReactNode;
  items?: string[];
  speed?: number; // pixels per second, default 45
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  variant?: "telemetry" | "cards";
  onItemClick?: (item: string, index: number) => void;
}

/**
 * Velocity-reactive & hover-pausable Infinite Scroll Marquee.
 * Supports both:
 * 1) String array ticker (`items={["01 // ...", ...]}`) for HUD telemetry bars
 * 2) Rich custom React node track (`children`) for prefab business opportunity cards
 */
export function InfiniteMarquee({
  children,
  items,
  speed = 48,
  direction = "left",
  pauseOnHover = true,
  className = "",
  variant = "telemetry",
  onItemClick,
}: InfiniteMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const offsetRef = useRef(0);
  const velocityBoostRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY / lastScrollYRef.current);
      lastScrollYRef.current = currentY;
      velocityBoostRef.current = Math.min(delta * 1.6, 140);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now / lastTime) / 1000, 0.1);
      lastTime = now;

      // Decay scroll velocity boost smoothly
      velocityBoostRef.current *= 0.92;

      const track = trackRef.current;
      if (track && !(pauseOnHover && isHovered)) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          const effectiveSpeed = speed + velocityBoostRef.current;
          const deltaPx = effectiveSpeed * dt * (direction === "left" ? 1 : -1);
          offsetRef.current += deltaPx;

          if (direction === "left" && offsetRef.current >= halfWidth) {
            offsetRef.current -= halfWidth;
          } else if (direction === "right" && offsetRef.current <= 0) {
            offsetRef.current += halfWidth;
          }

          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [speed, direction, pauseOnHover, isHovered]);

  const renderContent = () => {
    if (items && items.length > 0) {
      return items.map((text, idx) => (
        <button
          key={`${text}-${idx}`}
          type="button"
          onClick={() => onItemClick?.(text, idx)}
          className={`inline-flex items-center gap-3 px-6 py-2.5 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-colors ${
            variant === "telemetry"
              ? "text-[#F7F8FA]/85 hover:text-[#27B58A]"
              : "text-[#101D35] hover:text-[#27B58A]"
          } ${onItemClick ? "cursor-pointer" : "cursor-default"}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#27B58A] shrink-0" />
          <span>{text}</span>
          <span className="text-[#A8B1BE]/40 ml-3">/</span>
        </button>
      ));
    }

    return children;
  };

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className="flex w-max items-stretch will-change-transform"
      >
        <div className="flex items-stretch shrink-0">{renderContent()}</div>
        <div className="flex items-stretch shrink-0" aria-hidden="true">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default InfiniteMarquee;
