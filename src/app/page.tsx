"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Layers,
  MapPin,
  Scale,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Building2,
  Compass,
  SlidersHorizontal,
} from "lucide-react";
import {
  BRAND_INFO,
  HERO_TELEMETRY_ITEMS,
  MARQUEE_TICKER_ITEMS,
  PILLARS,
  SCRATCH_VS_ONSPEC_COMPARISON,
  VENDING_FLAGSHIP_BLUEPRINT,
  PREFAB_OPPORTUNITIES,
  CUSTOMER_JOURNEY_STEPS,
  ECOSYSTEM_STAGES,
  LEGAL_NETWORK_CATEGORIES,
  PrefabOpportunity,
  OpportunityCategory,
} from "@/data/onspec-data";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { SpecDrawerModal } from "@/components/SpecDrawerModal";
import { AutomationInteractiveConsole } from "@/components/home/AutomationInteractiveConsole";
import { HomepageIdeaQuickIntake } from "@/components/home/HomepageIdeaQuickIntake";

const OPPORTUNITY_FILTERS: ("All" | OpportunityCategory)[] = [
  "All",
  "Automated Retail",
  "Physical Infrastructure",
  "Digital & E-Commerce",
  "Semi-Automated",
];

export default function HomePage() {
  // Technical Specification Drawer Modal state
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<PrefabOpportunity | null>(null);

  // Section 02: Comparison interactive toggle
  const [comparisonMode, setComparisonMode] = useState<
    "matrix" | "onspec" | "scratch"
  >("matrix");

  // Section 04: Flagship Vending stage selector & opportunity grid filter
  const [activeVendingStage, setActiveVendingStage] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | OpportunityCategory
  >("All");

  // Section 06: Interactive 6-Step Customer Journey active step
  const [activeJourneyIdx, setActiveJourneyIdx] = useState<number>(0);

  // Section 08: Interactive Legal Network category tab
  const [activeLegalIdx, setActiveLegalIdx] = useState<number>(0);

  const flagshipVending = PREFAB_OPPORTUNITIES[0];
  const filteredOpportunities =
    selectedCategory === "All"
      ? PREFAB_OPPORTUNITIES
      : PREFAB_OPPORTUNITIES.filter((op) => op.category === selectedCategory);

  const activeJourneyStep = CUSTOMER_JOURNEY_STEPS[activeJourneyIdx];
  const activeLegalCategory = LEGAL_NETWORK_CATEGORIES[activeLegalIdx];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* =====================================================================
          SECTION 01 — HERO (Lightship Full-Bleed Technical Editorial Hero)
      ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/40 stripe-mesh-light tech-grid-bg">
        {/* Top Coordinate Hairline Rule */}
        <div className="border-b border-[#A8B1BE]/30 bg-white/75 backdrop-blur-xs">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#101D35]">
                ONSPEC // BUSINESS SOLUTIONS & TECHNOLOGY — CYPRUS & EU
              </span>
            </div>
            <div className="hidden items-center gap-6 font-mono text-[11px] text-[#253B5B] md:flex">
              <span>COORD: 34.6786° N, 33.0413° E</span>
              <span className="text-[#A8B1BE]">|</span>
              <span>SPEC REV: 2026.4 // 4 PILLARS ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main Hero Editorial + Architectural Telemetry Container */}
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Monumental Headline, Sub-copy & Dual CTAs */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-white px-4 py-1.5 shadow-2xs">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#27B58A]">
                  00 // EXECUTIVE BRIEFING
                </span>
                <span className="text-[#A8B1BE]">•</span>
                <span className="font-mono text-xs text-[#253B5B]">
                  {BRAND_INFO.descriptor}
                </span>
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-[#101D35] sm:text-6xl lg:text-7xl leading-[1.03]">
                Your vision.{" "}
                <span className="block text-[#253B5B]">Our execution.</span>
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-[#253B5B] sm:text-xl">
                From launching your own business to automating the one you
                already have, we make the complicated simple. We help
                entrepreneurs launch businesses, implement intelligent systems
                and turn ideas into practical solutions.
              </p>

              {/* Dual Primary & Secondary CTAs */}
              <div className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center">
                <Link
                  href="/launch"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#27B58A] px-7 py-4 text-xs font-mono font-bold uppercase tracking-widest text-[#101D35] shadow-md hover:bg-[#1F9470] hover:text-white transition-all"
                >
                  <span>START YOUR BUSINESS</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/automate"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#101D35]/25 bg-[#101D35] px-7 py-4 text-xs font-mono font-bold uppercase tracking-widest text-[#F7F8FA] shadow-sm hover:bg-[#253B5B] transition-all"
                >
                  <span>AUTOMATE YOUR BUSINESS</span>
                  <Cpu className="h-4 w-4 text-[#27B58A]" />
                </Link>
              </div>

              {/* Micro-Credibility Proof Strip */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#A8B1BE]/40 pt-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#253B5B]/75">
                    TURNKEY VENTURES
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-[#101D35]">
                    7 Ready Models
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#253B5B]/75">
                    AI & AUTOMATION
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-[#101D35]">
                    24/7 Autonomous
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#253B5B]/75">
                    IDEA EVALUATION
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-[#27B58A]">
                    Free Proposal
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Lightship-Style Architectural Specification & Telemetry Showcase */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#A8B1BE]/50 bg-white shadow-2xl">
                {/* Top HUD Header */}
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 bg-[#101D35] px-5 py-3.5 text-[#F7F8FA]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#27B58A] animate-pulse" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#F7F8FA]">
                      ONSPEC EXECUTION ARCHITECTURE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#27B58A]">
                    CYPRUS & EU
                  </span>
                </div>

                {/* Visual Hero Blueprint Card */}
                <div className="relative h-56 w-full overflow-hidden bg-[#101D35]">
                  <img
                    src={flagshipVending.image}
                    alt="Onspec Turnkey Business & AI Execution"
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/45 to-transparent" />
                  <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                    <span className="rounded bg-[#101D35]/85 border border-[#A8B1BE]/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#27B58A] backdrop-blur-xs">
                      FLAGSHIP // {flagshipVending.specCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedOpportunity(flagshipVending)}
                      className="rounded bg-[#27B58A] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#101D35] hover:bg-white transition-colors cursor-pointer"
                    >
                      OPEN SPEC DRAWER
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-[#F7F8FA]">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#A8B1BE]">
                      FEATURED TURNKEY DEPLOYMENT
                    </p>
                    <h2 className="mt-0.5 text-xl font-bold">
                      {flagshipVending.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#F7F8FA]/80">
                      Location scouting, smart hardware, suppliers & Cyprus
                      company formation coordinated end-to-end.
                    </p>
                  </div>
                </div>

                {/* 4-Pillar Quick Matrix Inside Hero Card */}
                <div className="divide-y divide-[#A8B1BE]/30 bg-white">
                  {PILLARS.map((pil) => (
                    <Link
                      key={pil.id}
                      href={pil.href}
                      className="group flex items-center justify-between px-5 py-3.5 hover:bg-[#F7F8FA] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded border border-[#A8B1BE]/50 bg-[#F7F8FA] font-mono text-xs font-bold text-[#101D35] group-hover:border-[#27B58A] group-hover:bg-[#101D35] group-hover:text-[#27B58A] transition-colors">
                          {pil.index}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#101D35] group-hover:text-[#253B5B]">
                            {pil.shortTitle}
                          </p>
                          <p className="font-mono text-[10px] text-[#253B5B]/75">
                            {pil.coreMessage}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden rounded bg-[#101D35]/5 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#253B5B] sm:inline-block">
                          {pil.telemetryValue}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[#A8B1BE] group-hover:text-[#27B58A] transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightship-Style Interactive Bottom Telemetry Spec Bar (01..04) */}
        <div className="border-t border-[#A8B1BE]/40 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#A8B1BE]/35 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {HERO_TELEMETRY_ITEMS.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                className="group flex flex-col justify-between p-5 hover:bg-[#101D35] hover:text-[#F7F8FA] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#27B58A]">
                    {item.index} // {item.code.split(" // ")[1]}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#A8B1BE] group-hover:text-[#27B58A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-[#253B5B] group-hover:text-[#A8B1BE]">
                    SPEC METRIC: {item.metric}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Velocity-Reactive InfiniteMarquee Ticker */}
        <div className="border-t border-[#A8B1BE]/30 bg-[#101D35] py-1">
          <InfiniteMarquee
            items={MARQUEE_TICKER_ITEMS}
            speed={46}
            variant="telemetry"
          />
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 — INTRODUCTION ("Business shouldn't be complicated.")
      ===================================================================== */}
      <section className="relative border-b border-[#A8B1BE]/35 bg-[#F7F8FA] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Editorial McKinsey / Stripe Split Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-white px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#101D35]">
                  SECTION 02 // THE ONSPEC THESIS
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-5xl leading-tight">
                Business shouldn&rsquo;t be complicated.
              </h2>

              <p className="text-base leading-relaxed text-[#253B5B]">
                We help entrepreneurs launch businesses, implement intelligent
                systems and turn ideas into practical solutions. Whether you are
                starting from zero, expanding an existing business or looking
                for reliable operational support,{" "}
                <strong className="text-[#101D35]">Onspec</strong> provides the
                structure, tools and connections needed to move forward.
              </p>

              <p className="text-sm leading-relaxed text-[#253B5B]">
                Most ventures stall in the gap between ambition and execution:
                fragmented suppliers, unvetted locations, manual admin overload,
                and unfamiliar legal bureaucracy. Onspec replaces fragmentation
                with a single coordinated execution specification.
              </p>

              <div className="rounded-xl border border-[#A8B1BE]/45 bg-white p-5 shadow-2xs">
                <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A] font-semibold">
                  CORE OPERATING PRINCIPLE
                </p>
                <p className="mt-2 text-base font-bold text-[#101D35]">
                  &ldquo;The real product isn&rsquo;t just starting a business.
                  It&rsquo;s making business ownership easier, more accessible
                  and more efficient.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Side-by-Side Comparison Toggle & Table */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-[#A8B1BE]/45 bg-white shadow-lg">
                {/* Header & Mode Switcher */}
                <div className="flex flex-col justify-between gap-4 border-b border-[#A8B1BE]/35 bg-[#101D35] px-6 py-4 text-[#F7F8FA] sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#27B58A]">
                      EXECUTION BENCHMARK // COMPARATIVE ANALYSIS
                    </p>
                    <h3 className="mt-0.5 text-base font-bold">
                      Starting From Scratch vs. Engineered OnSpec
                    </h3>
                  </div>

                  <div className="inline-flex rounded-lg border border-[#A8B1BE]/30 bg-[#253B5B]/60 p-1">
                    <button
                      type="button"
                      onClick={() => setComparisonMode("matrix")}
                      className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                        comparisonMode === "matrix"
                          ? "bg-[#27B58A] text-[#101D35] font-bold"
                          : "text-[#F7F8FA]/80 hover:text-white"
                      }`}
                    >
                      Side-by-Side
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonMode("scratch")}
                      className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                        comparisonMode === "scratch"
                          ? "bg-[#27B58A] text-[#101D35] font-bold"
                          : "text-[#F7F8FA]/80 hover:text-white"
                      }`}
                    >
                      Scratch Risk
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonMode("onspec")}
                      className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                        comparisonMode === "onspec"
                          ? "bg-[#27B58A] text-[#101D35] font-bold"
                          : "text-[#F7F8FA]/80 hover:text-white"
                      }`}
                    >
                      OnSpec Spec
                    </button>
                  </div>
                </div>

                {/* Comparison Rows */}
                <div className="divide-y divide-[#A8B1BE]/30">
                  {SCRATCH_VS_ONSPEC_COMPARISON.map((row, idx) => (
                    <div
                      key={row.dimension}
                      className="p-5 transition-colors hover:bg-[#F7F8FA]/70"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#101D35]">
                          0{idx + 1} // {row.dimension}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#253B5B]/70">
                          VERIFIED DIMENSION
                        </span>
                      </div>

                      <div
                        className={`mt-3 grid gap-3 ${
                          comparisonMode === "matrix"
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {(comparisonMode === "matrix" ||
                          comparisonMode === "scratch") && (
                          <div className="rounded-lg border border-[#A8B1BE]/40 bg-[#F7F8FA] p-3.5">
                            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#253B5B]">
                              <XCircle className="h-3.5 w-3.5 text-[#A8B1BE]" />
                              <span>STARTING FROM SCRATCH (FRAGMENTED)</span>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-[#253B5B]">
                              {row.scratch}
                            </p>
                          </div>
                        )}

                        {(comparisonMode === "matrix" ||
                          comparisonMode === "onspec") && (
                          <div className="rounded-lg border border-[#27B58A]/45 bg-[#27B58A]/5 p-3.5">
                            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#101D35]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#27B58A]" />
                              <span>ENGINEERED ONSPEC (TURNKEY EXECUTION)</span>
                            </div>
                            <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#101D35]">
                              {row.onspec}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03 — THE FOUR BUSINESS PILLARS (01 LAUNCH .. 04 CONNECT)
      ===================================================================== */}
      <section className="relative border-b border-[#A8B1BE]/35 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[#A8B1BE]/35 pb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-[#F7F8FA] px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#101D35]">
                  SECTION 03 // ARCHITECTURAL PILLARS (01 — 04)
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-5xl">
                Four pillars. One unified execution partner.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#253B5B]">
              Every Onspec engagement operates within a clear modular structure—
              allowing you to launch a ready business, automate operations,
              build a custom idea, or connect with vetted Cyprus legal counsel.
            </p>
          </div>

          {/* 4-Pillar Lightship Architectural Specification Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#A8B1BE]/45 bg-[#F7F8FA] p-7 transition-all hover:border-[#101D35] hover:bg-white hover:shadow-xl"
              >
                <div>
                  {/* Top Spec Bar */}
                  <div className="flex items-center justify-between border-b border-[#A8B1BE]/35 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101D35] font-mono text-sm font-bold text-[#27B58A]">
                        {pillar.index}
                      </span>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#253B5B]">
                          {pillar.code}
                        </p>
                        <h3 className="text-xl font-extrabold text-[#101D35]">
                          {pillar.shortTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/70">
                        {pillar.telemetryMetric}
                      </p>
                      <p className="font-mono text-xs font-bold text-[#27B58A]">
                        {pillar.telemetryValue}
                      </p>
                    </div>
                  </div>

                  {/* Core Message Quote */}
                  <div className="mt-5 rounded-lg border-l-2 border-[#27B58A] bg-white px-4 py-2.5">
                    <p className="font-mono text-xs font-semibold text-[#101D35]">
                      &ldquo;{pillar.coreMessage}&rdquo;
                    </p>
                  </div>

                  {/* Headline & Description */}
                  <h4 className="mt-4 text-lg font-bold text-[#101D35]">
                    {pillar.headline}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                    {pillar.description}
                  </p>

                  {/* Deliverables Preview List */}
                  <div className="mt-5 border-t border-[#A8B1BE]/30 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#253B5B]/80 font-semibold">
                      KEY DELIVERABLES & SCOPE
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {pillar.deliverables.map((del) => (
                        <li
                          key={del}
                          className="flex items-start gap-2 text-xs text-[#101D35]"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Pillar Navigation Footer */}
                <div className="mt-7 pt-4 border-t border-[#A8B1BE]/30">
                  <Link
                    href={pillar.href}
                    className="inline-flex w-full items-center justify-between rounded-xl bg-[#101D35] px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-[#F7F8FA] group-hover:bg-[#27B58A] group-hover:text-[#101D35] transition-colors"
                  >
                    <span>{pillar.ctaLabel}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04 — FEATURED READY-TO-LAUNCH BUSINESS OPPORTUNITIES
      ===================================================================== */}
      <section
        id="ready-to-launch"
        className="relative border-b border-[#A8B1BE]/35 bg-[#F7F8FA] py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-[#A8B1BE]/35 pb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-white px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#101D35]">
                  SECTION 04 // PILLAR 01 — READY-TO-LAUNCH BUSINESSES
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-5xl">
                You don&rsquo;t have to start from scratch.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#253B5B]">
                Launch a prefabricated, turnkey business engineered for real
                demand in Cyprus & the EU. Click any business model below to
                inspect its technical specification sheet, included deliverables,
                and request a free preliminary setup quotation.
              </p>
            </div>
            <Link
              href="/launch"
              className="inline-flex items-center gap-2 rounded-xl bg-[#101D35] px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#F7F8FA] hover:bg-[#253B5B] transition-colors"
            >
              <span>VIEW FULL TURNKEY CATALOG (/LAUNCH)</span>
              <ArrowUpRight className="h-4 w-4 text-[#27B58A]" />
            </Link>
          </div>

          {/* FLAGSHIP SHOWCASE: VENDING MACHINE NETWORKS (8-STAGE BLUEPRINT) */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-[#A8B1BE]/50 bg-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A8B1BE]/35 bg-[#101D35] px-6 py-4 text-[#F7F8FA]">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#27B58A] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#101D35]">
                  FLAGSHIP OPPORTUNITY
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#A8B1BE]">
                  {flagshipVending.specCode} // CYPRUS & EU TURNKEY DEPLOYMENT
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOpportunity(flagshipVending)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#27B58A] hover:underline cursor-pointer"
              >
                <span>OPEN FULL TECHNICAL DOSSIER & ENQUIRE</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 5 Cols: Vending Overview & Core Specs */}
              <div className="border-b border-[#A8B1BE]/35 p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
                <div className="relative h-52 w-full overflow-hidden rounded-xl border border-[#A8B1BE]/40 bg-[#101D35]">
                  <img
                    src={flagshipVending.image}
                    alt={flagshipVending.title}
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="font-mono text-xs font-bold">
                      {flagshipVending.estimatedCapital}
                    </span>
                    <span className="rounded bg-[#27B58A] px-2 py-0.5 font-mono text-[10px] font-bold text-[#101D35]">
                      {flagshipVending.timeline}
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-[#101D35]">
                  {flagshipVending.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                  {flagshipVending.fullDescription}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {flagshipVending.technicalSpecs.slice(0, 4).map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-lg border border-[#A8B1BE]/35 bg-[#F7F8FA] p-2.5"
                    >
                      <p className="font-mono text-[10px] uppercase text-[#253B5B]/75">
                        {spec.label}
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#101D35]">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedOpportunity(flagshipVending)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#27B58A] px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Inspect Specs & Request Quote</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right 7 Cols: Complete 8-Stage Turnkey Execution Breakdown */}
              <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between bg-[#F7F8FA]/60">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#27B58A]">
                        COMPLETE 8-STAGE TURNKEY EXECUTION BREAKDOWN
                      </p>
                      <h4 className="mt-1 text-lg font-extrabold text-[#101D35]">
                        How Onspec takes your Vending Network from zero to live
                        cashflow
                      </h4>
                    </div>
                    <span className="hidden font-mono text-xs text-[#253B5B] sm:inline-block">
                      CLICK ANY STAGE TO INSPECT
                    </span>
                  </div>

                  {/* Interactive 8-Stage Grid */}
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {VENDING_FLAGSHIP_BLUEPRINT.map((stage, idx) => {
                      const active = activeVendingStage === idx;
                      return (
                        <button
                          key={stage.step}
                          type="button"
                          onClick={() => setActiveVendingStage(idx)}
                          className={`text-left rounded-xl border p-3.5 transition-all cursor-pointer ${
                            active
                              ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA] shadow-md"
                              : "border-[#A8B1BE]/40 bg-white text-[#101D35] hover:border-[#253B5B]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                                active ? "text-[#27B58A]" : "text-[#253B5B]/75"
                              }`}
                            >
                              {stage.step}
                            </span>
                            <ChevronRight
                              className={`h-3.5 w-3.5 ${
                                active ? "text-[#27B58A]" : "text-[#A8B1BE]"
                              }`}
                            />
                          </div>
                          <p className="mt-1 text-xs font-bold">
                            {stage.title}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Stage Detailed Inspector */}
                <div className="mt-5 rounded-xl border border-[#27B58A]/45 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#27B58A]">
                      {VENDING_FLAGSHIP_BLUEPRINT[activeVendingStage].step} //{" "}
                      {VENDING_FLAGSHIP_BLUEPRINT[activeVendingStage].title}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#253B5B]">
                      COORDINATED BY ONSPEC
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                    {VENDING_FLAGSHIP_BLUEPRINT[activeVendingStage].detail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FILTERABLE SPEC GRID OF ALL 7 READY-TO-LAUNCH OPPORTUNITIES */}
          <div className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#27B58A]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#101D35]">
                  FILTER PREFABRICATED BUSINESS SPECIFICATIONS:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {OPPORTUNITY_FILTERS.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-lg border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? "border-[#101D35] bg-[#101D35] text-[#27B58A] font-bold"
                          : "border-[#A8B1BE]/50 bg-white text-[#253B5B] hover:border-[#101D35] hover:text-[#101D35]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#A8B1BE]/45 bg-white shadow-xs transition-all hover:-translate-y-1 hover:border-[#101D35] hover:shadow-xl cursor-pointer"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#101D35]">
                      <img
                        src={opp.image}
                        alt={opp.title}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/30 to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="rounded bg-[#101D35]/85 border border-[#A8B1BE]/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#27B58A]">
                          {opp.specCode}
                        </span>
                        <span className="rounded bg-white/95 px-2.5 py-1 font-mono text-[10px] font-bold text-[#101D35]">
                          {opp.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3.5 right-3.5">
                        <p className="font-mono text-[11px] font-semibold text-[#27B58A]">
                          {opp.estimatedCapital}
                        </p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h3 className="text-lg font-extrabold text-[#101D35] group-hover:text-[#253B5B]">
                        {opp.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#253B5B] line-clamp-3">
                        {opp.shortDescription}
                      </p>

                      {/* Key Telemetry Metrics */}
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#A8B1BE]/30 pt-3.5 font-mono text-[11px]">
                        <div>
                          <span className="block text-[9px] uppercase text-[#253B5B]/70">
                            LAUNCH WINDOW
                          </span>
                          <span className="font-bold text-[#101D35]">
                            {opp.timeline}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase text-[#253B5B]/70">
                            OWNER TIME
                          </span>
                          <span className="font-bold text-[#101D35]">
                            {opp.weeklyOwnerHours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="flex items-center justify-between border-t border-[#A8B1BE]/30 bg-[#F7F8FA] px-5 py-3.5 group-hover:bg-[#101D35] transition-colors">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#101D35] group-hover:text-[#27B58A]">
                      OPEN TECHNICAL SPEC DRAWER
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#253B5B] group-hover:text-[#27B58A]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INFINITE SCROLL OPPORTUNITY TRACK (Lightship Card Marquee) */}
          <div className="mt-16 rounded-2xl border border-[#A8B1BE]/45 bg-[#101D35] p-6 text-[#F7F8FA]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#27B58A] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                  INFINITE OPPORTUNITY STREAM // CLICK ANY CARD TO LAUNCH SPEC
                  DRAWER
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#A8B1BE]">
                HOVER TO PAUSE • SCROLL REACTIVE
              </span>
            </div>

            <InfiniteMarquee speed={36} pauseOnHover={true} variant="cards">
              <div className="flex items-stretch gap-4 pr-4">
                {PREFAB_OPPORTUNITIES.map((opp) => (
                  <button
                    key={`stream-${opp.id}`}
                    type="button"
                    onClick={() => setSelectedOpportunity(opp)}
                    className="group flex w-80 shrink-0 flex-col justify-between rounded-xl border border-[#A8B1BE]/25 bg-[#253B5B]/45 p-4 text-left transition-all hover:border-[#27B58A] hover:bg-[#253B5B] cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#27B58A]">
                          {opp.specCode}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#A8B1BE] group-hover:text-[#27B58A]" />
                      </div>
                      <h4 className="mt-1.5 text-sm font-bold text-[#F7F8FA]">
                        {opp.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#F7F8FA]/75 line-clamp-2">
                        {opp.tagline}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-[#A8B1BE]/20 pt-2.5 font-mono text-[10px] text-[#A8B1BE]">
                      <span>{opp.estimatedCapital.split(" (")[0]}</span>
                      <span className="text-[#27B58A]">INSPECT SPEC →</span>
                    </div>
                  </button>
                ))}
              </div>
            </InfiniteMarquee>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 05 — AI & BUSINESS AUTOMATION (Deep Navy #101D35 + Steel Blue)
      ===================================================================== */}
      <AutomationInteractiveConsole />

      {/* =====================================================================
          SECTION 06 — THE 6-STEP CUSTOMER JOURNEY & 7-STAGE ECOSYSTEM LOOP
      ===================================================================== */}
      <section className="relative border-b border-[#A8B1BE]/35 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-[#F7F8FA] px-3.5 py-1.5">
              <Compass className="h-3.5 w-3.5 text-[#27B58A]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#101D35]">
                SECTION 06 // EXECUTION CHOREOGRAPHY & LONG-TERM ECOSYSTEM
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-5xl">
              From first discovery to long-term scaling.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#253B5B]">
              Every client journey follows a transparent 6-step engineering
              protocol—and feeds into a 7-stage long-term business ecosystem so
              your company never outgrows its execution partner.
            </p>
          </div>

          {/* PART A: Interactive 6-Step Customer Journey Horizontal Stepper */}
          <div className="mt-12 rounded-2xl border border-[#A8B1BE]/45 bg-[#F7F8FA] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A8B1BE]/35 pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#101D35]">
                THE 6-STEP ONSPEC CUSTOMER JOURNEY
              </span>
              <span className="font-mono text-xs text-[#27B58A] font-semibold">
                SELECT ANY STEP TO INSPECT PROTOCOL
              </span>
            </div>

            {/* 6-Step Selector Bar */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {CUSTOMER_JOURNEY_STEPS.map((step, idx) => {
                const isActive = idx === activeJourneyIdx;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveJourneyIdx(idx)}
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      isActive
                        ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA] shadow-md"
                        : "border-[#A8B1BE]/45 bg-white text-[#101D35] hover:border-[#253B5B]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? "text-[#27B58A]" : "text-[#253B5B]/70"
                        }`}
                      >
                        STEP {step.number}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? "bg-[#27B58A]" : "bg-[#A8B1BE]/50"
                        }`}
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-extrabold">{step.title}</p>
                      <p
                        className={`mt-0.5 text-[11px] ${
                          isActive ? "text-[#A8B1BE]" : "text-[#253B5B]/75"
                        }`}
                      >
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Journey Step Spotlight */}
            <div className="mt-6 rounded-xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xs">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#27B58A]">
                    {activeJourneyStep.code}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold text-[#101D35]">
                    {activeJourneyStep.title} — {activeJourneyStep.subtitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                    {activeJourneyStep.description}
                  </p>
                </div>
                <div className="lg:col-span-4 rounded-xl border border-[#27B58A]/40 bg-[#101D35] p-4 text-[#F7F8FA]">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#27B58A]">
                    STAGE DELIVERABLE
                  </p>
                  <p className="mt-1.5 text-sm font-bold">
                    {activeJourneyStep.deliverable}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#A8B1BE]/20 pt-2.5">
                    <span className="font-mono text-[10px] text-[#A8B1BE]">
                      STEP {activeJourneyIdx + 1} OF 6
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveJourneyIdx(
                          (activeJourneyIdx + 1) % CUSTOMER_JOURNEY_STEPS.length
                        )
                      }
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#27B58A] hover:underline cursor-pointer"
                    >
                      <span>NEXT STEP</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PART B: 7-Stage Long-Term Business Ecosystem Loop */}
          <div className="mt-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#27B58A]">
                  LONG-TERM BUSINESS ECOSYSTEM // 7-STAGE LIFECYCLE
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-[#101D35]">
                  How all four Onspec pillars compound over your business
                  lifecycle
                </h3>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#101D35] hover:text-[#27B58A]"
              >
                <span>READ OUR FULL PHILOSOPHY (/ABOUT)</span>
                <ArrowUpRight className="h-4 w-4 text-[#27B58A]" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
              {ECOSYSTEM_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="flex flex-col justify-between rounded-xl border border-[#A8B1BE]/45 bg-[#F7F8FA] p-4 transition-colors hover:border-[#101D35] hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-[#27B58A]">
                        {stage.step}
                      </span>
                      <span className="rounded bg-[#101D35] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#F7F8FA]">
                        {stage.pillarRef}
                      </span>
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-[#101D35]">
                      {stage.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#253B5B]">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07 — SUBMIT YOUR IDEA ("Have an idea? Let's build it.")
      ===================================================================== */}
      <HomepageIdeaQuickIntake />

      {/* =====================================================================
          SECTION 08 — PROFESSIONAL LEGAL NETWORK IN CYPRUS & FINAL CTA
      ===================================================================== */}
      <section className="relative bg-[#F7F8FA] pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Cyprus Legal Network Block */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left 5 Cols: Overview & Compliance Framing */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-white px-3.5 py-1.5">
                <Scale className="h-3.5 w-3.5 text-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#101D35]">
                  SECTION 08 // PILLAR 04 — CYPRUS LEGAL NETWORK
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl leading-tight">
                The right professionals. The right guidance. Without the hassle
                of finding them yourself.
              </h2>

              <p className="text-base leading-relaxed text-[#253B5B]">
                Whether you are forming a company in Cyprus, applying for
                residency or immigration permits, reviewing commercial leases,
                or requiring representation in criminal or regulatory matters,
                Onspec connects you directly with experienced independent legal
                professionals in Cyprus.
              </p>

              {/* Prominent Legal Compliance Framing */}
              <div className="rounded-xl border border-[#253B5B]/30 bg-[#101D35] p-5 text-[#F7F8FA]">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>INDEPENDENT NETWORK COMPLIANCE NOTICE</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#F7F8FA]/85">
                  {BRAND_INFO.legalDisclaimer}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#101D35] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-[#F7F8FA] hover:bg-[#253B5B] transition-colors"
                >
                  <span>REQUEST CYPRUS LEGAL REFERRAL (/CONNECT)</span>
                  <ArrowUpRight className="h-4 w-4 text-[#27B58A]" />
                </Link>
              </div>
            </div>

            {/* Right 7 Cols: Interactive 5-Category Legal Network Explorer */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-[#A8B1BE]/45 bg-white shadow-lg">
                {/* Category Tabs */}
                <div className="flex flex-wrap border-b border-[#A8B1BE]/35 bg-[#F7F8FA] p-2 gap-1.5">
                  {LEGAL_NETWORK_CATEGORIES.map((cat, idx) => {
                    const active = idx === activeLegalIdx;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveLegalIdx(idx)}
                        className={`rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          active
                            ? "bg-[#101D35] text-[#27B58A] font-bold shadow-xs"
                            : "text-[#253B5B] hover:bg-white hover:text-[#101D35]"
                        }`}
                      >
                        0{idx + 1} // {cat.title.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>

                {/* Active Legal Category Detail */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#27B58A]">
                      {activeLegalCategory.code}
                    </span>
                    <span className="rounded bg-[#101D35]/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#253B5B]">
                      JURISDICTION: REPUBLIC OF CYPRUS
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#101D35]">
                    {activeLegalCategory.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#253B5B]">
                    {activeLegalCategory.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#253B5B]">
                    {activeLegalCategory.description}
                  </p>

                  <div className="mt-5 border-t border-[#A8B1BE]/30 pt-4">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#101D35]">
                      TYPICAL MATTERS COORDINATED THROUGH INDEPENDENT COUNSEL:
                    </p>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {activeLegalCategory.typicalMatters.map((matter) => (
                        <div
                          key={matter}
                          className="flex items-start gap-2 rounded-lg border border-[#A8B1BE]/35 bg-[#F7F8FA] p-2.5 text-xs text-[#101D35]"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                          <span>{matter}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#A8B1BE]/40 bg-[#F7F8FA] px-4 py-3">
                    <span className="font-mono text-xs text-[#253B5B]">
                      <strong>REFERRAL PROTOCOL:</strong>{" "}
                      {activeLegalCategory.referralProcess}
                    </span>
                    <Link
                      href="/connect"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase text-[#101D35] hover:text-[#27B58A]"
                    >
                      <span>CONNECT NOW</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#27B58A]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              HIGH-IMPACT FINAL CTA SECTION
          ================================================================= */}
          <div className="mt-24 overflow-hidden rounded-3xl border border-[#A8B1BE]/35 linear-navy-surface tech-grid-dark p-8 sm:p-14 text-[#F7F8FA] shadow-2xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#27B58A]/40 bg-[#253B5B]/60 px-3.5 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#27B58A] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    ONSPEC.EU // READY FOR DEPLOYMENT
                  </span>
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-[#F7F8FA] sm:text-5xl leading-tight">
                  Ready to take the next step?{" "}
                  <span className="text-[#27B58A]">
                    Let&rsquo;s turn your plans into something real.
                  </span>
                </h2>

                <p className="max-w-2xl text-base leading-relaxed text-[#F7F8FA]/80">
                  Whether you want to launch a turnkey vending or automated
                  retail business, integrate 24/7 AI & WhatsApp systems into
                  your existing company, submit a custom business idea for a
                  free preliminary quotation, or connect with legal
                  professionals in Cyprus—our desk is ready.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#27B58A] px-7 py-4 text-xs font-mono font-bold uppercase tracking-widest text-[#101D35] shadow-lg hover:bg-[#1F9470] hover:text-white transition-all"
                >
                  <span>CONTACT ONSPEC</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/launch"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A8B1BE]/35 bg-[#253B5B]/60 px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#F7F8FA] hover:border-[#27B58A] hover:text-[#27B58A] transition-colors"
                >
                  <Building2 className="h-4 w-4 text-[#27B58A]" />
                  <span>EXPLORE TURNKEY BUSINESSES</span>
                </Link>

                <Link
                  href="/innovate"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A8B1BE]/35 bg-[#101D35]/70 px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#F7F8FA] hover:border-[#27B58A] hover:text-[#27B58A] transition-colors"
                >
                  <Sparkles className="h-4 w-4 text-[#27B58A]" />
                  <span>SUBMIT YOUR IDEA (FREE PROPOSAL)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightship-Style Slide-Over Technical Specification Drawer Modal */}
      <SpecDrawerModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </div>
  );
}
