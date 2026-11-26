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
    <main className="bg-white text-[#101D35]">
      {/* Editorial Header */}
      <section className="container pt-[16svh] md:pt-[22svh] pb-12 md:pb-16 text-center max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#101D35] mb-4 font-semibold">
          [ PREFABRICATED COMMERCIAL VENTURES ]
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101D35] mb-6 leading-tight">
          Ready Businesses.
        </h1>
        <p className="text-lg md:text-xl text-[#253B5B] max-w-2xl mx-auto leading-relaxed">
          Engineered turnkey business models ready to deploy across Cyprus and Europe in 4 to 10 weeks. Location, equipment, telemetry, and corporate structure coordinated end to end.
        </p>
      </section>

      {/* Ready Businesses Grid */}
      <section className="container pb-20 md:pb-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PREFAB_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="bg-[#F7F8FA] border border-[#D5DBE3] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#101D35] hover:shadow-lg"
            >
              <div>
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#101D35]/90 text-white font-mono text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {opp.specCode}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-extrabold text-[#101D35] mb-2">
                    {opp.title}
                  </h2>
                  <p className="text-xs text-[#253B5B] mb-4 leading-relaxed line-clamp-3">
                    {opp.shortDescription}
                  </p>

                  <div className="space-y-2 py-3 border-y border-[#D5DBE3] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#A8B1BE] uppercase">Capital:</span>
                      <span className="font-mono font-bold text-[#101D35]">{opp.estimatedCapital}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#A8B1BE] uppercase">Timeline:</span>
                      <span className="font-mono font-semibold text-[#101D35]">{opp.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#A8B1BE] uppercase">Owner Hours:</span>
                      <span className="font-mono font-semibold text-[#101D35]">{opp.weeklyOwnerHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(opp)}
                  className="flex-1 bg-[#101D35] text-white py-2.5 px-4 rounded-xl text-xs font-semibold hover:bg-[#253B5B] transition-colors cursor-pointer text-center"
                >
                  View Specifications
                </button>
                <Link
                  href={`/contact?business=${encodeURIComponent(opp.title)}`}
                  className="bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-[#253B5B] transition-colors text-center"
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
