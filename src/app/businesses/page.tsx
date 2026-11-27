"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PREFAB_OPPORTUNITIES, PrefabOpportunity } from "@/data/onspec-data";
import { SpecDrawerModal } from "@/components/SpecDrawerModal";
import { PageReturnBar } from "@/components/PageReturnBar";

export default function BusinessesPage() {
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<PrefabOpportunity | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  return (
    <main className="bg-white text-black min-h-screen">
      {/* Editorial Header */}
      <section className="container px-4 sm:px-6 pt-[14svh] md:pt-[18svh] pb-8 md:pb-12 text-center max-w-4xl mx-auto">
        <PageReturnBar currentPage="Ready Businesses" />
        <p className="font-mono text-xs uppercase tracking-widest text-black mb-3 font-semibold">
          [ 03 PREFABRICATED COMMERCIAL MODELS ]
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-4 leading-tight">
          Ready Businesses.
        </h1>
        <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Turnkey automated dispensary &amp; hot meal heating stations engineered to deploy across Cyprus and the EU in 3 to 5 weeks. Host venues mapped and independent legal structures ready for execution.
        </p>
      </section>

      {/* Ready Businesses Grid (3 Compact Flagship Models) */}
      <section className="container px-4 sm:px-6 pb-16 md:pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PREFAB_OPPORTUNITIES.map((opp, idx) => (
            <div
              key={opp.id}
              id={opp.id}
              style={{ transitionDelay: `${idx * 0.12}s` }}
              className="bg-[#F7F8FA] border border-[#D5DBE3] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-black hover:-translate-y-1.5 hover:shadow-lg scroll-mt-24 group scroll-reveal hover-lift"
            >
              <div>
                {/* Compact Media Header */}
                <div className="h-44 sm:h-48 relative overflow-hidden bg-neutral-900">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-xs text-white font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/10">
                    {opp.specCode}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white font-mono text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
                    {opp.autonomyLevel}
                  </div>
                </div>

                {/* Compact Editorial Body */}
                <div className="p-5 sm:p-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                    Model 0{idx + 1} &bull; Turnkey Unit
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-black mb-1.5 leading-snug">
                    {opp.title}
                  </h2>
                  <p className="text-[11px] font-mono uppercase text-black font-semibold mb-2">
                    {opp.tagline}
                  </p>
                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed line-clamp-3">
                    {opp.shortDescription}
                  </p>

                  {/* Compact Key Telemetry */}
                  <div className="space-y-1.5 py-3 border-y border-[#D5DBE3] text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-neutral-500 uppercase">Scope:</span>
                      <span className="font-mono font-bold text-black">{opp.estimatedCapital}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-neutral-500 uppercase">Timeline:</span>
                      <span className="font-mono font-semibold text-black">{opp.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-neutral-500 uppercase">Owner Hours:</span>
                      <span className="font-mono font-semibold text-black">{opp.weeklyOwnerHours}</span>
                    </div>
                    <div className="flex justify-between items-start pt-1">
                      <span className="font-mono text-neutral-500 uppercase">Placement:</span>
                      <span className="text-right text-[11px] text-black font-medium max-w-[65%] line-clamp-2">
                        {opp.locationStrategy}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1.5 text-[11px] font-mono font-bold text-black">
                      <span className="h-1.5 w-1.5 rounded-full bg-black inline-block" />
                      <span>Locations &amp; Legal Structure Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(opp)}
                  className="flex-1 bg-black text-white py-2.5 px-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer text-center"
                >
                  View Blueprint
                </button>
                <Link
                  href={`/contact?business=${encodeURIComponent(opp.title)}`}
                  className="border border-neutral-300 bg-white text-black font-mono font-bold py-2.5 px-4 rounded-full text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors text-center"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blueprint Detail Drawer */}
      <SpecDrawerModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </main>
  );
}
