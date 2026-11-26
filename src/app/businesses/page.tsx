"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PREFAB_OPPORTUNITIES, PrefabOpportunity } from "@/data/onspec-data";
import { SpecDrawerModal } from "@/components/SpecDrawerModal";

export default function BusinessesPage() {
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<PrefabOpportunity | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  return (
    <main className="bg-white text-black">
      {/* Editorial Header */}
      <section className="container px-4 sm:px-6 pt-[16svh] md:pt-[22svh] pb-12 md:pb-16 text-center max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-black mb-4 font-semibold">
          [ PREFABRICATED COMMERCIAL VENTURES ]
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-6 leading-tight">
          Ready Businesses.
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Engineered turnkey automated dispensary &amp; hot meal models ready to deploy across Cyprus and Europe in 3 to 5 weeks. Pre-vetted host venues mapped and independent legal structures are ready for immediate execution.
        </p>
      </section>

      {/* Ready Businesses Grid (3 Flagship Automated Models) */}
      <section className="container px-4 sm:px-6 pb-20 md:pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PREFAB_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              id={opp.id}
              className="bg-[#F7F8FA] border border-[#D5DBE3] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-black hover:shadow-lg scroll-mt-28"
            >
              <div>
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/90 text-white font-mono text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {opp.specCode}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {opp.autonomyLevel}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-extrabold text-black mb-2">
                    {opp.title}
                  </h2>
                  <p className="text-xs font-mono uppercase text-black font-semibold mb-3">
                    {opp.tagline}
                  </p>
                  <p className="text-sm text-neutral-600 mb-5 leading-relaxed">
                    {opp.shortDescription}
                  </p>

                  <div className="space-y-2.5 py-4 border-y border-[#D5DBE3] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#A8B1BE] uppercase">Execution Scope:</span>
                      <span className="font-mono font-bold text-black">{opp.estimatedCapital}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#A8B1BE] uppercase">Timeline:</span>
                      <span className="font-mono font-semibold text-black">{opp.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#A8B1BE] uppercase">Owner Hours:</span>
                      <span className="font-mono font-semibold text-black">{opp.weeklyOwnerHours}</span>
                    </div>
                    <div className="flex justify-between items-start pt-1">
                      <span className="font-mono text-[#A8B1BE] uppercase">Placement:</span>
                      <span className="text-right text-xs text-black font-medium max-w-[65%]">{opp.locationStrategy}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 text-xs font-mono font-bold text-black">
                      <span className="h-1.5 w-1.5 rounded-full bg-black inline-block" />
                      <span>Locations &amp; Legal Structure Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(opp)}
                  className="flex-1 bg-black text-white py-3 px-4 rounded-xl text-xs font-semibold hover:bg-neutral-900 transition-colors cursor-pointer text-center"
                >
                  View Specifications
                </button>
                <Link
                  href={`/contact?business=${encodeURIComponent(opp.title)}`}
                  className="bg-black text-white font-bold py-3 px-5 rounded-xl text-xs hover:bg-neutral-900 transition-colors text-center"
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
