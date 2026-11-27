"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface PageReturnBarProps {
  currentPage: string;
  parentHref?: string;
  parentLabel?: string;
  className?: string;
}

export function PageReturnBar({
  currentPage,
  parentHref = "/",
  parentLabel = "Home",
  className = "",
}: PageReturnBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(parentHref);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 text-xs font-mono py-3 mb-6 border-b border-black/10 text-black/70 ${className}`}
      aria-label="Breadcrumb & Navigation Back"
    >
      {/* Left: Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-black font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-x-0.5 cursor-pointer"
          title="Return to previous page"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13L5 8l5-5" />
          </svg>
          <span>Back</span>
        </button>

        <span className="text-black/30">/</span>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          <Link
            href={parentHref}
            className="hover:text-black hover:underline transition-colors"
          >
            {parentLabel}
          </Link>
          <span className="text-black/30">/</span>
          <span className="text-black font-medium">{currentPage}</span>
        </nav>
      </div>

      {/* Right: Close / Return to Home X */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] text-black/50 hover:text-black hover:bg-black/5 transition-all"
        title="Return to homepage"
      >
        <span>Home</span>
        <svg
          className="w-3 h-3"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 3L3 11M3 3l8 8" />
        </svg>
      </Link>
    </div>
  );
}
