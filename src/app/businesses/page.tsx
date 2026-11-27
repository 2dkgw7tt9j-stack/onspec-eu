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

      {/* =====================================================================
          TECHNICAL HARDWARE & ARCHITECTURE BLUEPRINT SECTION
         ===================================================================== */}
      <section className="container px-4 sm:px-6 pb-20 md:pb-28 max-w-6xl mx-auto border-t border-neutral-200 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
            ENGINEERING SPECIFICATION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">
            Hardware Architecture & Remote Telemetry
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Industrial components engineered for continuous unattended operation across Cyprus and the European Union. Zero cashier overhead, encrypted payment routing, and real-time cloud oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Spec Card 01 */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">01 // TELEMETRY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-black tracking-tight">
              4G LTE / 5G Cloud Bus
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Industrial dual-band cellular modem sending 30-second heartbeats to your smartphone dashboard. Remote reboot, over-the-air firmware updates, and live transaction logs.
            </p>
          </div>

          {/* Spec Card 02 */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">02 // TRANSACTIONS</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-black tracking-tight">
              Contactless NFC & EMV
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              PCI-PTS certified cashless terminals supporting Apple Pay, Google Pay, Visa, and Mastercard with instant settlement into your independent Cyprus bank account.
            </p>
          </div>

          {/* Spec Card 03 */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">03 // SENSORS</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-black tracking-tight">
              Active Environmental Safety
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Precision temperature probes, optical fluid-level gauges, tilt/vibration tamper sensors, and automated WhatsApp replenishment alerts when inventory drops below 15%.
            </p>
          </div>

          {/* Spec Card 04 */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">04 // ENCLOSURE</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-black tracking-tight">
              1.5mm Cold-Rolled Steel
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Anti-shatter capacitive HD touch displays, electronic solenoid locks, corrosion-resistant powder coat, and bespoke brand vinyl wraps tailored to your venue.
            </p>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-10 p-6 rounded-2xl bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-sm font-semibold">Want to review the technical blueprint for a specific host venue?</p>
            <p className="text-xs text-neutral-400">Our engineering team provides location suitability audits and hardware schematics.</p>
          </div>
          <a
            href="https://wa.me/35794055553?text=Hello%20ONSPEC%20Turnkey%20Desk%2C%20I%20would%20like%20to%20request%20the%20technical%20hardware%20blueprint%20and%20location%20suitability%20audit."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Inquire on WhatsApp (+357 94 055553)</span>
          </a>
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
