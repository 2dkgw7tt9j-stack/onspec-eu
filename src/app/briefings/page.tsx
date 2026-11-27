"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRIEFINGS } from "@/data/briefings-data";

export default function BriefingsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    "ALL",
    "Turnkey Commercial",
    "AI & Software",
    "Legal & Corporate",
    "Venture Engineering",
  ];

  const filteredBriefings =
    selectedCategory === "ALL"
      ? BRIEFINGS
      : BRIEFINGS.filter((b) =>
          b.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <main className="min-h-screen bg-white text-black pt-[14svh] md:pt-[18svh] pb-24 px-4 sm:px-6 max-w-5xl mx-auto selection:bg-black selection:text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-3">
          INSTITUTIONAL INTEL & FIELD NOTES
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
          Executive Briefings
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Operational blueprints, technical telemetry analysis, and corporate structuring guidance for founders deploying across Cyprus and the European Union.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Briefings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBriefings.map((briefing, idx) => (
          <article
            key={briefing.slug}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-black transition-all duration-300 hover:shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>0{idx + 1} // {briefing.date}</span>
                <span>{briefing.readTime}</span>
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 font-mono text-[11px] uppercase tracking-wider">
                {briefing.category}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:text-neutral-700 transition-colors">
                <Link href={`/briefings/${briefing.slug}`} className="cursor-pointer">
                  {briefing.title}
                </Link>
              </h2>

              <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                {briefing.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-200/60 flex items-center justify-between">
              <Link
                href={`/briefings/${briefing.slug}`}
                className="text-xs font-mono font-bold uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 cursor-pointer"
              >
                Read Full Briefing <span>→</span>
              </Link>

              <Link
                href={briefing.relatedPillar.href}
                className="text-[11px] font-mono text-neutral-400 hover:text-black transition-colors"
              >
                {briefing.relatedPillar.name}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA to WhatsApp Desk */}
      <div className="mt-16 p-8 rounded-3xl bg-black text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold">Have a venture or automation requirement?</h3>
          <p className="text-sm text-neutral-400">
            Our engineering team prepares free preliminary proposals and feasibility blueprints within 48 business hours.
          </p>
        </div>
        <a
          href="https://wa.me/35795604442?text=Hello%20ONSPEC%20Desk%2C%20I%20reviewed%20your%20Executive%20Briefings%20and%20would%20like%20to%20discuss%20a%20commercial%20deployment."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer inline-flex items-center gap-2"
        >
          <span>Chat on WhatsApp (+357 95 604442)</span>
        </a>
      </div>
    </main>
  );
}
