"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { WHATSAPP_DESKS, WhatsAppDeskConfig } from "@/data/onspec-data";

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine contextually recommended desk based on current URL path
  const getRecommendedDeskId = (): "turnkey" | "ai" | "legal" => {
    if (pathname.includes("/businesses")) return "turnkey";
    if (pathname.includes("/ai-web")) return "ai";
    if (pathname.includes("/legal") || pathname.includes("/connect"))
      return "legal";
    return "ai";
  };

  const recommendedId = getRecommendedDeskId();

  const handleDeskClick = (desk: WhatsAppDeskConfig) => {
    const url = `https://wa.me/${desk.phoneNumber}?text=${encodeURIComponent(
      desk.defaultMessage
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <aside
      ref={containerRef}
      aria-label="ONSPEC Direct WhatsApp Operations Desks"
      className="fixed bottom-6 left-6 z-[9990] flex flex-col items-start pointer-events-auto"
    >
      {/* Expanded Multi-Desk Card */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[360px] rounded-3xl bg-neutral-950 text-white p-5 border border-white/20 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                  Direct Operations Desk
                </span>
              </div>
              <p className="text-sm font-semibold text-white mt-0.5">
                Select Your Specialized Department
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Close menu"
              aria-label="Close"
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
            </button>
          </div>

          {/* Desks List */}
          <div className="space-y-2">
            {WHATSAPP_DESKS.map((desk) => {
              const isRecommended = desk.id === recommendedId;
              return (
                <button
                  key={desk.id}
                  type="button"
                  onClick={() => handleDeskClick(desk)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group ${
                    isRecommended
                      ? "bg-white text-black border-white shadow-md hover:bg-neutral-100"
                      : "bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm truncate">
                        {desk.title}
                      </span>
                      {isRecommended && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-black text-white">
                          Current Page
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs truncate ${
                        isRecommended ? "text-neutral-700" : "text-neutral-400"
                      }`}
                    >
                      {desk.subtitle}
                    </p>
                    <p
                      className={`text-[11px] font-mono ${
                        isRecommended ? "text-neutral-900 font-semibold" : "text-neutral-300"
                      }`}
                    >
                      {desk.phoneDisplay}
                    </p>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isRecommended
                        ? "bg-black text-white"
                        : "bg-white/10 text-white group-hover:bg-white/20"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
              Direct encrypted channel to ONSPEC executive team
            </span>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/90 hover:bg-black text-white text-xs font-mono tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 cursor-pointer"
        title="Connect directly with ONSPEC Operations Desks"
        aria-expanded={isOpen}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <svg
          className="w-4 h-4 text-white transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="font-semibold text-white/95">WhatsApp Desk</span>
        <span className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-neutral-300">
          3 Desks
        </span>
      </button>
    </aside>
  );
}
