"use client";

import React from "react";

export function WhatsAppFloatingButton() {
  const whatsappUrl =
    "https://wa.me/35795604442?text=Hello%20ONSPEC%20Operations%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20a%20turnkey%20business%20%2F%20AI%20automation%20solution.";

  return (
    <aside
      aria-label="Direct WhatsApp Operations Desk"
      className="fixed bottom-6 left-6 z-[9990] flex items-center pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/90 hover:bg-black text-white text-xs font-mono tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 cursor-pointer"
        title="Direct channel to ONSPEC Operations Desk (+357 95 604442)"
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
        <span className="hidden md:inline text-neutral-400 text-[10px] lowercase tracking-normal">
          +357 95 604442
        </span>
      </a>
    </aside>
  );
}
