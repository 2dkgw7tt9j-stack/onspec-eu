"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { index: "01", label: "Launch", sub: "Turnkey Businesses", href: "/launch" },
  { index: "02", label: "Automate", sub: "AI & Systems", href: "/automate" },
  { index: "03", label: "Innovate", sub: "Submit Your Idea", href: "/innovate" },
  { index: "04", label: "Connect", sub: "Cyprus Legal Network", href: "/connect" },
  { index: "05", label: "About", sub: "Ecosystem", href: "/about" },
  { index: "06", label: "Contact", sub: "Direct Desk", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#A8B1BE]/35 bg-[#F7F8FA]/90 backdrop-blur-md">
      {/* Top Micro Telemetry Strip */}
      <div className="hidden border-b border-[#A8B1BE]/25 bg-[#101D35] px-6 py-1.5 text-[11px] font-mono text-[#F7F8FA]/80 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#27B58A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#27B58A] animate-pulse" />
              ONSPEC.EU // SYSTEM OPERATIONAL
            </span>
            <span className="text-[#A8B1BE]/40">|</span>
            <span>YOUR VISION. OUR EXECUTION.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>JURISDICTION: CYPRUS & EUROPEAN UNION</span>
            <Link
              href="/innovate"
              className="text-[#27B58A] hover:underline inline-flex items-center gap-1"
            >
              <span>FREE PRELIMINARY PROPOSAL</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Architectural Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#101D35] text-[#F7F8FA] border border-[#253B5B] transition-transform group-hover:scale-105">
            <span className="font-mono text-xs font-bold tracking-tighter text-[#27B58A]">
              OS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-[#101D35] leading-none">
              ONSPEC
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[#253B5B]/80">
              VISION // EXECUTION
            </span>
          </div>
        </Link>

        {/* Desktop Numbered Links */}
        <nav className="hidden items-center divide-x divide-[#A8B1BE]/30 rounded-lg border border-[#A8B1BE]/35 bg-white/80 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-4 py-2 transition-colors ${
                  isActive
                    ? "bg-[#101D35] text-[#F7F8FA]"
                    : "text-[#101D35] hover:bg-[#101D35]/5"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? "text-[#27B58A]" : "text-[#253B5B]/60"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-xs font-semibold tracking-tight">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Right Primary Actions */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <Link
            href="/launch"
            className="rounded-lg border border-[#101D35]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#101D35] hover:border-[#101D35] transition-colors"
          >
            Start Your Business
          </Link>
          <Link
            href="/innovate"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#27B58A] px-4 py-2 text-xs font-bold text-[#101D35] shadow-sm hover:bg-[#1F9470] hover:text-white transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Submit Your Idea</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg border border-[#A8B1BE]/50 p-2 text-[#101D35] lg:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#A8B1BE]/35 bg-[#F7F8FA] px-4 py-5 lg:hidden">
          <div className="grid grid-cols-1 gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg border border-[#A8B1BE]/35 bg-white px-4 py-3 text-sm font-semibold text-[#101D35]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#27B58A]">
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-[11px] text-[#253B5B]/75">
                  {item.sub}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Link
              href="/launch"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-lg border border-[#101D35] bg-white py-2.5 text-xs font-semibold text-[#101D35]"
            >
              Start Your Business
            </Link>
            <Link
              href="/innovate"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-lg bg-[#27B58A] py-2.5 text-xs font-bold text-[#101D35]"
            >
              Submit Your Idea
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
