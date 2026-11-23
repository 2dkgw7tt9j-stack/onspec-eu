"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  MapPin,
  Layers,
  ShieldCheck,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  Building2,
  Wrench,
  FileCheck2,
  Send,
  Compass,
  Box,
  Check,
  ArrowRight,
} from "lucide-react";
import {
  PREFAB_OPPORTUNITIES,
  VENDING_FLAGSHIP_BLUEPRINT,
  SCRATCH_VS_ONSPEC_COMPARISON,
  CUSTOMER_JOURNEY_STEPS,
  LAUNCH_FAQS,
  MARQUEE_TICKER_ITEMS,
  PrefabOpportunity,
  OpportunityCategory,
} from "@/data/onspec-data";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { SpecDrawerModal } from "@/components/SpecDrawerModal";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

type FilterCategory = "All Specs" | OpportunityCategory;

const CATEGORY_FILTERS: FilterCategory[] = [
  "All Specs",
  "Automated Retail",
  "Physical Infrastructure",
  "Digital & E-Commerce",
  "Semi-Automated",
];

export default function LaunchPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All Specs");
  const [activeOpportunity, setActiveOpportunity] =
    useState<PrefabOpportunity | null>(null);
  const [activeVendingStage, setActiveVendingStage] = useState<number>(0);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Inline Reserve Spec Dossier Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formWhatsapp, setFormWhatsapp] = useState("");
  const [formSpecId, setFormSpecId] = useState(
    PREFAB_OPPORTUNITIES[0]?.id || "smart-vending-network"
  );
  const [formCity, setFormCity] = useState("Limassol, Cyprus");
  const [formBudget, setFormBudget] = useState("€15,000 – €45,000");
  const [formTimeframe, setFormTimeframe] = useState("Within 30–60 Days");
  const [formNotes, setFormNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionRef, setSubmissionRef] = useState<string | null>(null);

  const flagshipVending = useMemo(
    () =>
      PREFAB_OPPORTUNITIES.find((item) => item.id === "smart-vending-network") ||
      PREFAB_OPPORTUNITIES[0],
    []
  );

  const filteredOpportunities = useMemo(() => {
    if (selectedCategory === "All Specs") return PREFAB_OPPORTUNITIES;
    return PREFAB_OPPORTUNITIES.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  const handleCategorySelect = (cat: FilterCategory, scrollToCatalog = false) => {
    setSelectedCategory(cat);
    if (scrollToCatalog && typeof document !== "undefined") {
      const el = document.getElementById("catalog-grid");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const chosenSpec = PREFAB_OPPORTUNITIES.find((o) => o.id === formSpecId);
    const result = await submitOnspecEnquiry({
      pillar: "01_LAUNCH",
      name: formName,
      email: formEmail,
      whatsapp: formWhatsapp,
      opportunityId: formSpecId,
      opportunityTitle: chosenSpec?.title || "Turnkey Business Specification",
      budget: formBudget,
      timeframe: formTimeframe,
      message: `Target Region: ${formCity}. Notes: ${formNotes}`,
    });
    setIsSubmitting(false);
    if (result.ok) {
      setSubmissionRef(result.referenceId);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* =====================================================================
          1. ARCHITECTURAL HERO WITH SPEC TELEMETRY & CATEGORY FILTERS
      ====================================================================== */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/40 bg-[#101D35] text-[#F7F8FA] tech-grid-dark">
        {/* Subtle Radial Accent */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 18%, rgba(39, 181, 138, 0.16), transparent 45%), radial-gradient(circle at 12% 80%, rgba(37, 59, 91, 0.55), transparent 55%)",
          }}
        />

        {/* Top Telemetry Coordinate Bar */}
        <div className="relative border-b border-[#A8B1BE]/20 bg-[#101D35]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#27B58A]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                PILLAR 01 // LAUNCH A BUSINESS
              </span>
              <span className="hidden text-[#A8B1BE]/40 sm:inline">|</span>
              <span className="hidden font-mono text-xs text-[#A8B1BE] sm:inline">
                SPECIFICATION SERIES: 2026.CY-EU
              </span>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs text-[#A8B1BE]">
              <span>MODELS: 07 ACTIVE</span>
              <span className="hidden sm:inline">DEPLOYMENT: 4–12 WKS</span>
              <span className="text-[#27B58A]">STATUS: ACCEPTING INTAKES</span>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#A8B1BE]/25 bg-[#253B5B]/40 px-4 py-1.5">
                <Box className="h-3.5 w-3.5 text-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#F7F8FA]">
                  Ready-to-Launch Prefabricated Business Models
                </span>
              </div>

              <p className="font-mono text-sm uppercase tracking-widest text-[#27B58A]">
                “You don’t have to start from scratch.”
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.06]">
                Turnkey commercial ventures engineered for{" "}
                <span className="text-[#27B58A]">rapid deployment.</span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#A8B1BE]">
                Starting a business from zero often means months of fragmented
                vendor calls, uncertain site leases, and operational trial and
                error. Onspec packages proven physical and digital business
                models—coordinating location scouting, commercial hardware,
                wholesale suppliers, Cyprus corporate setup via independent
                legal professionals, and launch telemetry.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog-grid"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-semibold text-[#101D35] shadow-lg shadow-[#27B58A]/15 hover:bg-[#1F9470] hover:text-white transition-all"
                >
                  <span>Explore 07 Turnkey Specifications</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveOpportunity(flagshipVending)}
                  className="inline-flex items-center gap-2.5 rounded-lg border border-[#A8B1BE]/35 bg-[#253B5B]/35 px-6 py-3.5 text-sm font-semibold text-white hover:border-[#27B58A] hover:text-[#27B58A] transition-colors cursor-pointer"
                >
                  <span>Inspect Flagship Vending Spec</span>
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Telemetry HUD Module */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-[#A8B1BE]/25 bg-[#101D35]/90 p-6 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/20 pb-3.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#A8B1BE]">
                    SPEC TELEMETRY // OVERVIEW
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded bg-[#27B58A]/15 px-2 py-0.5 font-mono text-[11px] text-[#27B58A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#27B58A]" />
                    TURNKEY READY
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-[#A8B1BE]/15 bg-[#253B5B]/25 p-3.5">
                    <p className="font-mono text-[11px] uppercase text-[#A8B1BE]">
                      ENTRY CAPITAL
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      From €8.5k
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#27B58A]">
                      Digital to Heavy Infra
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#A8B1BE]/15 bg-[#253B5B]/25 p-3.5">
                    <p className="font-mono text-[11px] uppercase text-[#A8B1BE]">
                      TIME TO LAUNCH
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      3 – 12 Weeks
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#27B58A]">
                      Pre-Engineered Critical Path
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#A8B1BE]/15 bg-[#253B5B]/25 p-3.5">
                    <p className="font-mono text-[11px] uppercase text-[#A8B1BE]">
                      AUTONOMY RATING
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      85% – 94%
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#27B58A]">
                      Cloud Telemetry + Cashless
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#A8B1BE]/15 bg-[#253B5B]/25 p-3.5">
                    <p className="font-mono text-[11px] uppercase text-[#A8B1BE]">
                      JURISDICTION
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      Cyprus & EU
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#27B58A]">
                      Legal Network Coordinated
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-[#27B58A]/30 bg-[#27B58A]/10 p-3 text-xs text-[#F7F8FA]/90">
                  <span className="font-mono font-semibold text-[#27B58A]">
                    ALL-IN COORDINATION:
                  </span>{" "}
                  Site scouting, equipment import, wholesale suppliers, legal
                  formation referrals & operational commissioning.
                </div>
              </div>
            </div>
          </div>

          {/* Hero Interactive Category Filter Bar */}
          <div className="mt-12 border-t border-[#A8B1BE]/20 pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#A8B1BE]">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#27B58A]" />
                <span>FILTER SPECIFICATION CATALOG BY ARCHITECTURE:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map((cat) => {
                  const active = selectedCategory === cat;
                  const count =
                    cat === "All Specs"
                      ? PREFAB_OPPORTUNITIES.length
                      : PREFAB_OPPORTUNITIES.filter((o) => o.category === cat)
                          .length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategorySelect(cat, true)}
                      className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? "bg-[#27B58A] text-[#101D35] font-semibold shadow-sm"
                          : "border border-[#A8B1BE]/25 bg-[#253B5B]/30 text-[#F7F8FA]/85 hover:border-[#27B58A] hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] ${
                          active
                            ? "bg-[#101D35]/15 text-[#101D35]"
                            : "bg-[#101D35]/60 text-[#27B58A]"
                        }`}
                      >
                        0{count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FLAGSHIP CASE STUDY BLUEPRINT: TURNKEY VENDING MACHINE BUSINESS
      ====================================================================== */}
      <section className="relative border-b border-[#A8B1BE]/40 py-20 lg:py-24 stripe-mesh-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-[#A8B1BE]/40 pb-8 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#27B58A]" />
                <span>FLAGSHIP CASE STUDY BLUEPRINT // SPEC-L01</span>
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                Turnkey Smart Vending Machine Business in Cyprus & EU
              </h2>
              <p className="mt-2 max-w-3xl text-base text-[#253B5B]">
                See how Onspec transforms a high-demand automated retail concept
                into a cash-flowing asset. Instead of leaving you with an empty
                machine in a crate, we execute all{" "}
                <strong className="text-[#101D35]">
                  8 coordinated deployment stages
                </strong>{" "}
                end to end.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveOpportunity(flagshipVending)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white hover:bg-[#253B5B] transition-colors cursor-pointer"
              >
                <span>Open Full Vending Spec Sheet</span>
                <ArrowUpRight className="h-4 w-4 text-[#27B58A]" />
              </button>
            </div>
          </div>

          {/* Flagship Overview Card + Active Stage Telemetry Panel */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Visual Hardware Blueprint & Core Specs */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/50 bg-white overflow-hidden shadow-sm">
              <div>
                <div className="relative h-64 w-full bg-[#101D35] overflow-hidden">
                  <img
                    src={flagshipVending.image}
                    alt={flagshipVending.title}
                    className="h-full w-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/35 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded bg-[#27B58A] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#101D35]">
                      FLAGSHIP BLUEPRINT
                    </span>
                    <span className="rounded bg-[#101D35]/85 border border-[#A8B1BE]/30 px-2.5 py-1 font-mono text-[11px] text-[#F7F8FA]">
                      OSP-VND-2026
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-mono text-xs text-[#27B58A]">
                      24/7 UNATTENDED CASHLESS RETAIL
                    </p>
                    <h3 className="text-xl font-bold">
                      Smart Vending Network Specification
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#A8B1BE]/35 bg-[#F7F8FA] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/75">
                        TURNKEY CAPITAL (1–4 UNITS)
                      </span>
                      <p className="mt-0.5 text-sm font-bold text-[#101D35]">
                        €12,500 – €45,000
                      </p>
                    </div>
                    <div className="rounded-lg border border-[#A8B1BE]/35 bg-[#F7F8FA] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/75">
                        COMMISSIONING TIMELINE
                      </span>
                      <p className="mt-0.5 text-sm font-bold text-[#101D35]">
                        4 – 6 Weeks
                      </p>
                    </div>
                    <div className="rounded-lg border border-[#A8B1BE]/35 bg-[#F7F8FA] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/75">
                        OWNER TIME COMMITMENT
                      </span>
                      <p className="mt-0.5 text-sm font-bold text-[#101D35]">
                        3 – 6 hrs / week
                      </p>
                    </div>
                    <div className="rounded-lg border border-[#A8B1BE]/35 bg-[#F7F8FA] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/75">
                        TELEMETRY & PAYMENTS
                      </span>
                      <p className="mt-0.5 text-sm font-bold text-[#101D35]">
                        EMV / NFC + 4G Cloud
                      </p>
                    </div>
                  </div>

                  {/* Highlighted Active Stage Preview Box */}
                  <div className="rounded-xl border border-[#253B5B]/25 bg-[#101D35] p-5 text-[#F7F8FA]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                        ACTIVE STAGE INSPECTOR //{" "}
                        {VENDING_FLAGSHIP_BLUEPRINT[activeVendingStage]?.step}
                      </span>
                      <span className="font-mono text-[11px] text-[#A8B1BE]">
                        0{activeVendingStage + 1} / 08
                      </span>
                    </div>
                    <h4 className="mt-2 text-lg font-bold text-white">
                      {VENDING_FLAGSHIP_BLUEPRINT[activeVendingStage]?.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#A8B1BE]">
                      {VENDING_FLAGSHIP_BLUEPRINT[activeVendingStage]?.detail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#A8B1BE]/35 bg-[#F7F8FA] px-6 py-4 flex items-center justify-between">
                <span className="font-mono text-xs text-[#253B5B]">
                  Limassol • Nicosia • Larnaca • Paphos
                </span>
                <button
                  type="button"
                  onClick={() => setActiveOpportunity(flagshipVending)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#101D35] hover:text-[#27B58A] transition-colors cursor-pointer"
                >
                  <span>Request Vending Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: All 8 Coordinated Execution Stages Grid */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#253B5B] font-semibold">
                  8-STAGE TURNKEY EXECUTION MATRIX (CLICK ANY STAGE TO INSPECT)
                </span>
                <span className="font-mono text-xs text-[#27B58A]">
                  100% Managed by Onspec
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {VENDING_FLAGSHIP_BLUEPRINT.map((stage, idx) => {
                  const isSelected = activeVendingStage === idx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => setActiveVendingStage(idx)}
                      className={`group text-left rounded-xl border p-4 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#27B58A] bg-[#101D35] text-white shadow-lg"
                          : "border-[#A8B1BE]/45 bg-white text-[#101D35] hover:border-[#253B5B]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold uppercase tracking-wider ${
                            isSelected ? "text-[#27B58A]" : "text-[#253B5B]"
                          }`}
                        >
                          {stage.step}
                        </span>
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-mono ${
                            isSelected
                              ? "bg-[#27B58A] text-[#101D35] font-bold"
                              : "bg-[#F7F8FA] text-[#253B5B]"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </div>
                      <h4
                        className={`mt-2 text-sm font-bold ${
                          isSelected ? "text-white" : "text-[#101D35]"
                        }`}
                      >
                        {stage.title}
                      </h4>
                      <p
                        className={`mt-1.5 text-xs leading-relaxed ${
                          isSelected ? "text-[#A8B1BE]" : "text-[#253B5B]"
                        }`}
                      >
                        {stage.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Starting From Scratch vs. Onspec Turnkey Comparison Strip */}
          <div className="mt-14 rounded-2xl border border-[#A8B1BE]/50 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-[#A8B1BE]/35 bg-[#101D35] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  ARCHITECTURAL COMPARISON // STARTING FROM SCRATCH VS. ONSPEC
                  TURNKEY
                </span>
              </div>
              <span className="font-mono text-xs text-[#27B58A]">
                Eliminate 6–12 Months of Trial & Error
              </span>
            </div>
            <div className="divide-y divide-[#A8B1BE]/30">
              {SCRATCH_VS_ONSPEC_COMPARISON.map((row) => (
                <div
                  key={row.dimension}
                  className="grid grid-cols-1 gap-4 p-5 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#101D35]">
                      {row.dimension}
                    </span>
                  </div>
                  <div className="md:col-span-4 rounded-lg bg-[#F7F8FA] p-3 text-xs text-[#253B5B]">
                    <span className="block font-mono text-[10px] uppercase text-[#253B5B]/70">
                      STARTING FROM SCRATCH:
                    </span>
                    <span className="mt-0.5 block">{row.scratch}</span>
                  </div>
                  <div className="md:col-span-5 rounded-lg border border-[#27B58A]/35 bg-[#27B58A]/10 p-3 text-xs text-[#101D35]">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-[#1F9470]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#27B58A]" />
                      ONSPEC TURNKEY SPECIFICATION:
                    </span>
                    <span className="mt-0.5 block font-medium">
                      {row.onspec}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FULL INTERACTIVE CATALOG OF READY-TO-LAUNCH OPPORTUNITIES
      ====================================================================== */}
      <section
        id="catalog-grid"
        className="relative border-b border-[#A8B1BE]/40 py-20 lg:py-24 tech-grid-bg"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                <Layers className="h-3.5 w-3.5 text-[#27B58A]" />
                <span>TURNKEY SPECIFICATION CATALOG // 07 MODELS</span>
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                Ready-to-Launch Business Opportunities
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#253B5B]">
                Select any prefabricated business model below to review capital
                requirements, included deliverables, location strategy, setup
                timelines, and full hardware/software telemetry.
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? "bg-[#101D35] text-white font-semibold shadow-sm"
                        : "border border-[#A8B1BE]/50 bg-white text-[#253B5B] hover:border-[#101D35] hover:text-[#101D35]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opportunities Cards Grid */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {filteredOpportunities.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/50 bg-white overflow-hidden shadow-sm hover:border-[#101D35] hover:shadow-xl transition-all"
              >
                <div>
                  {/* Card Top Telemetry Bar */}
                  <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 bg-[#101D35] px-5 py-3 text-white">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                      <span className="font-mono text-xs tracking-wider uppercase text-[#A8B1BE]">
                        {item.specCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.flagship && (
                        <span className="rounded bg-[#27B58A] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#101D35]">
                          FLAGSHIP
                        </span>
                      )}
                      <span className="rounded bg-[#253B5B] px-2.5 py-0.5 font-mono text-[11px] text-[#F7F8FA]">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Image Banner + Investment Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#101D35]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/40 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-2 text-white">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#27B58A]">
                          {item.investmentTier}
                        </span>
                        <h3 className="text-2xl font-bold tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-5">
                    <p className="text-sm font-medium text-[#101D35]">
                      {item.tagline}
                    </p>
                    <p className="text-xs leading-relaxed text-[#253B5B]">
                      {item.shortDescription}
                    </p>

                    {/* 4 Key Telemetry Metrics */}
                    <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#A8B1BE]/35 bg-[#F7F8FA] p-3.5">
                      <div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#253B5B]/80">
                          <Layers className="h-3.5 w-3.5 text-[#27B58A]" />
                          <span>ESTIMATED CAPITAL</span>
                        </div>
                        <p className="mt-1 text-xs font-bold text-[#101D35]">
                          {item.estimatedCapital}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#253B5B]/80">
                          <Clock className="h-3.5 w-3.5 text-[#27B58A]" />
                          <span>SETUP TIMELINE</span>
                        </div>
                        <p className="mt-1 text-xs font-bold text-[#101D35]">
                          {item.timeline}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#253B5B]/80">
                          <MapPin className="h-3.5 w-3.5 text-[#27B58A]" />
                          <span>LOCATION STRATEGY</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-[#101D35] line-clamp-1">
                          {item.locationStrategy}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#253B5B]/80">
                          <Cpu className="h-3.5 w-3.5 text-[#27B58A]" />
                          <span>AUTONOMY / HOURS</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-[#101D35]">
                          {item.weeklyOwnerHours}
                        </p>
                      </div>
                    </div>

                    {/* What's Included List */}
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#253B5B]">
                        WHAT IS INCLUDED IN THIS TURNKEY SPEC:
                      </p>
                      <ul className="mt-2.5 grid grid-cols-1 gap-2">
                        {item.whatsIncluded.slice(0, 5).map((inc) => (
                          <li
                            key={inc}
                            className="flex items-start gap-2 text-xs text-[#101D35]"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Spec Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.technicalSpecs.slice(0, 3).map((ts) => (
                        <span
                          key={ts.label}
                          className="rounded border border-[#A8B1BE]/40 bg-[#F7F8FA] px-2.5 py-1 font-mono text-[10px] text-[#253B5B]"
                        >
                          <strong className="text-[#101D35]">{ts.label}:</strong>{" "}
                          {ts.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Trigger for SpecDrawerModal */}
                <div className="border-t border-[#A8B1BE]/35 bg-[#F7F8FA] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveOpportunity(item)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white hover:bg-[#253B5B] transition-colors cursor-pointer"
                  >
                    <span>Inspect Technical Spec & Stages</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#27B58A]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOpportunity(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#27B58A] bg-[#27B58A]/10 px-3.5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#101D35] hover:bg-[#27B58A] transition-colors cursor-pointer"
                  >
                    <span>Request Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INFINITE-SCROLL HORIZONTAL BLUEPRINT REEL (InfiniteMarquee)
      ====================================================================== */}
      <section className="border-b border-[#A8B1BE]/40 bg-[#101D35] py-14 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
              CONTINUOUS SPECIFICATION REEL // CLICK ANY BLUEPRINT TO OPEN
              DRAWER
            </span>
          </div>
          <span className="font-mono text-xs text-[#A8B1BE]">
            Hover to pause • Scroll to accelerate velocity
          </span>
        </div>

        {/* Rich Cards Infinite Marquee */}
        <InfiniteMarquee speed={40} pauseOnHover variant="cards" className="py-2">
          <div className="flex items-stretch gap-5 px-2.5">
            {PREFAB_OPPORTUNITIES.map((opp) => (
              <div
                key={opp.id}
                onClick={() => setActiveOpportunity(opp)}
                className="w-80 shrink-0 rounded-xl border border-[#A8B1BE]/25 bg-[#253B5B]/35 p-5 hover:border-[#27B58A] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#27B58A]">
                    <span>{opp.specCode}</span>
                    <span>{opp.timeline}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-white">
                    {opp.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#A8B1BE] line-clamp-2">
                    {opp.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#A8B1BE]/20 flex items-center justify-between font-mono text-xs">
                  <span className="text-white font-semibold">
                    {opp.estimatedCapital.split("(")[0]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#27B58A]">
                    <span>OPEN SPEC</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </InfiniteMarquee>

        {/* Bottom Telemetry String Marquee */}
        <div className="mt-8 border-t border-[#A8B1BE]/20 pt-3">
          <InfiniteMarquee
            items={MARQUEE_TICKER_ITEMS}
            speed={52}
            variant="telemetry"
          />
        </div>
      </section>

      {/* =====================================================================
          5. 6-STAGE SETUP PROCESS INTERACTIVE TIMELINE
      ====================================================================== */}
      <section className="border-b border-[#A8B1BE]/40 py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#253B5B]">
              <Compass className="h-3.5 w-3.5 text-[#27B58A]" />
              <span>6-STAGE SETUP PROCESS // FROM DISCOVERY TO HANDOVER</span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
              How Your Turnkey Launch Is Executed
            </h2>
            <p className="mt-2 text-base text-[#253B5B]">
              Every Ready-to-Launch specification follows a deterministic
              6-stage operational protocol so you always have full visibility on
              costs, timelines, and deliverables.
            </p>
          </div>

          {/* Interactive Timeline Selector */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CUSTOMER_JOURNEY_STEPS.map((step, idx) => {
              const active = activeProcessStep === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveProcessStep(idx)}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    active
                      ? "border-[#27B58A] bg-[#101D35] text-white shadow-md"
                      : "border-[#A8B1BE]/45 bg-[#F7F8FA] text-[#101D35] hover:border-[#253B5B]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className={active ? "text-[#27B58A]" : "text-[#253B5B]"}
                    >
                      STEP {step.number}
                    </span>
                    {active && (
                      <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                    )}
                  </div>
                  <p className="mt-2 text-sm font-bold">{step.title}</p>
                  <p
                    className={`mt-0.5 text-[11px] ${
                      active ? "text-[#A8B1BE]" : "text-[#253B5B]"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Card */}
          <div className="mt-6 rounded-2xl border border-[#A8B1BE]/50 bg-[#F7F8FA] p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#27B58A]">
                  {CUSTOMER_JOURNEY_STEPS[activeProcessStep]?.code}
                </span>
                <h3 className="text-2xl font-extrabold text-[#101D35]">
                  {CUSTOMER_JOURNEY_STEPS[activeProcessStep]?.number}.{" "}
                  {CUSTOMER_JOURNEY_STEPS[activeProcessStep]?.title} —{" "}
                  {CUSTOMER_JOURNEY_STEPS[activeProcessStep]?.subtitle}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#253B5B]">
                  {CUSTOMER_JOURNEY_STEPS[activeProcessStep]?.description}
                </p>
              </div>
              <div className="lg:col-span-4 rounded-xl border border-[#A8B1BE]/40 bg-white p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                  STAGE DELIVERABLE
                </p>
                <p className="mt-1.5 text-base font-bold text-[#101D35]">
                  {CUSTOMER_JOURNEY_STEPS[activeProcessStep]?.deliverable}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#A8B1BE]/30 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveProcessStep((prev) =>
                        prev > 0 ? prev - 1 : CUSTOMER_JOURNEY_STEPS.length - 1
                      )
                    }
                    className="font-mono text-xs text-[#253B5B] hover:text-[#101D35] cursor-pointer"
                  >
                    ← Prev Stage
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveProcessStep(
                        (prev) => (prev + 1) % CUSTOMER_JOURNEY_STEPS.length
                      )
                    }
                    className="font-mono text-xs font-semibold text-[#27B58A] hover:underline cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FAQ ACCORDION & INLINE "RESERVE SPEC DOSSIER" FORM
      ====================================================================== */}
      <section className="py-20 lg:py-24 stripe-mesh-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: FAQ Accordion + Custom Idea Callout */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                  FREQUENTLY ASKED QUESTIONS // PILLAR 01
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35]">
                  Turnkey Launch & Cyprus Setup FAQs
                </h2>
                <p className="mt-2 text-sm text-[#253B5B]">
                  Everything you need to know about capital requirements,
                  location securing, and corporate formation coordination.
                </p>
              </div>

              <div className="space-y-3">
                {LAUNCH_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-[#A8B1BE]/50 bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold text-[#101D35] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[#253B5B] transition-transform ${
                            isOpen ? "rotate-180 text-[#27B58A]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-[#A8B1BE]/30 px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#253B5B] bg-[#F7F8FA]/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Custom Idea Bridge Card */}
              <div className="rounded-2xl border border-[#253B5B]/30 bg-[#101D35] p-6 text-white">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                  <Sparkles className="h-4 w-4" />
                  <span>PILLAR 03 // CUSTOM BUSINESS CREATION</span>
                </div>
                <h3 className="mt-2 text-xl font-bold">
                  Have your own custom business concept?
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#A8B1BE]">
                  If your vision is not listed in our prefabricated catalog,
                  submit your custom idea. Onspec evaluates feasibility and
                  prepares a{" "}
                  <strong className="text-white">
                    free preliminary proposal or quotation
                  </strong>
                  .
                </p>
                <Link
                  href="/innovate"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                >
                  <span>Submit Your Idea for Free Proposal</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Inline "Request Information / Reserve Spec Dossier" Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#A8B1BE]/50 bg-white p-6 sm:p-8 shadow-lg">
                <div className="border-b border-[#A8B1BE]/35 pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    DIRECT INTAKE // PILLAR 01 LAUNCH DESK
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold text-[#101D35]">
                    Request Information & Reserve Spec Dossier
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#253B5B]">
                    Select a turnkey business model below to receive detailed
                    unit economics, available Cyprus/EU deployment slots, and a
                    preliminary quotation.
                  </p>
                </div>

                {submissionRef ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#27B58A]/15 text-[#27B58A]">
                      <Check className="h-7 w-7" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                      TURNKEY DOSSIER REQUEST CONFIRMED
                    </p>
                    <h4 className="text-2xl font-extrabold text-[#101D35]">
                      Reference: {submissionRef}
                    </h4>
                    <p className="mx-auto max-w-md text-sm text-[#253B5B]">
                      Thank you, <strong>{formName}</strong>. Our Business
                      Launch team has logged your request for{" "}
                      <strong>
                        {
                          PREFAB_OPPORTUNITIES.find((o) => o.id === formSpecId)
                            ?.title
                        }
                      </strong>{" "}
                      in <strong>{formCity}</strong>. We will reach out via
                      email and WhatsApp with your specification dossier.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionRef(null);
                        setFormNotes("");
                      }}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#253B5B] transition-colors cursor-pointer"
                    >
                      Submit Another Specification Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInlineSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        Select Ready-to-Launch Specification *
                      </label>
                      <select
                        value={formSpecId}
                        onChange={(e) => setFormSpecId(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm font-medium text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      >
                        {PREFAB_OPPORTUNITIES.map((opp) => (
                          <option key={opp.id} value={opp.id}>
                            {opp.specCode} — {opp.title} ({opp.estimatedCapital})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Elena Constantinou"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="you@domain.eu"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formWhatsapp}
                          onChange={(e) => setFormWhatsapp(e.target.value)}
                          placeholder="+357 99 000 000"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Target Deployment City
                        </label>
                        <select
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        >
                          <option value="Limassol, Cyprus">
                            Limassol, Cyprus
                          </option>
                          <option value="Nicosia, Cyprus">
                            Nicosia, Cyprus
                          </option>
                          <option value="Larnaca, Cyprus">
                            Larnaca, Cyprus
                          </option>
                          <option value="Paphos, Cyprus">Paphos, Cyprus</option>
                          <option value="Ayia Napa / Protaras, Cyprus">
                            Ayia Napa / Protaras, Cyprus
                          </option>
                          <option value="All Cyprus / Multi-Location">
                            All Cyprus / Multi-Location
                          </option>
                          <option value="European Union (Other)">
                            European Union (Other)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Planned Capital Allocation
                        </label>
                        <select
                          value={formBudget}
                          onChange={(e) => setFormBudget(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        >
                          <option value="€10,000 – €20,000">
                            €10,000 – €20,000
                          </option>
                          <option value="€15,000 – €45,000">
                            €15,000 – €45,000
                          </option>
                          <option value="€45,000 – €100,000">
                            €45,000 – €100,000
                          </option>
                          <option value="€100,000+ Multi-Unit Portfolio">
                            €100,000+ Multi-Unit Portfolio
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Target Launch Window
                        </label>
                        <select
                          value={formTimeframe}
                          onChange={(e) => setFormTimeframe(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        >
                          <option value="Immediate (< 30 Days)">
                            Immediate (&lt; 30 Days)
                          </option>
                          <option value="Within 30–60 Days">
                            Within 30–60 Days
                          </option>
                          <option value="Within 3–6 Months">
                            Within 3–6 Months
                          </option>
                          <option value="Exploratory / Need Guidance">
                            Exploratory / Need Guidance
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        Specific Goals, Location Preferences or Questions
                      </label>
                      <textarea
                        rows={3}
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Tell us if you already have a site in mind, need Cyprus company formation support, or want to compare two models..."
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-semibold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting
                          ? "Generating Dossier Reference..."
                          : "Request Turnkey Spec Dossier & Free Quote"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-Over Technical Specification Drawer Modal */}
      <SpecDrawerModal
        opportunity={activeOpportunity}
        onClose={() => setActiveOpportunity(null)}
      />
    </div>
  );
}
