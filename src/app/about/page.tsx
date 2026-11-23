"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Cpu,
  Layers,
  Target,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  BRAND_INFO,
  PILLARS,
  CUSTOMER_JOURNEY_STEPS,
  ECOSYSTEM_STAGES,
  SCRATCH_VS_ONSPEC_COMPARISON,
  MARQUEE_TICKER_ITEMS,
} from "@/data/onspec-data";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";

const CORE_PILLARS_OF_THOUGHT = [
  {
    code: "01 // THE MISSION",
    title: "To simplify business creation, automation, and execution.",
    body: "Starting or modernizing a business often feels overwhelming because everything is fragmented—finding locations, vetting hardware suppliers, registering a company, configuring software, and hiring staff. Onspec exists to unify those moving parts into clear, actionable execution.",
    icon: Target,
  },
  {
    code: "02 // THE PHILOSOPHY",
    title: "Execution is the multiplier of every great vision.",
    body: "Ideas are valuable only when translated into reliable systems. Whether through a prefabricated turnkey business model, an AI automation pipeline, or a custom-built concept, we prioritize practical, durable operations over theoretical complexity.",
    icon: Compass,
  },
  {
    code: "03 // THE APPROACH",
    title: "Structured specifications, intelligent systems, vetted partners.",
    body: "We approach business building like engineering: clear specifications, predictable investment requirements, automated customer and back-office workflows, and direct introductions to independent legal professionals in Cyprus.",
    icon: Layers,
  },
  {
    code: "04 // WHY ONSPEC EXISTS",
    title: "Bridging the gap between ambition and a running operation.",
    body: "Too many capable entrepreneurs never launch because they don't want to start from scratch, and too many existing businesses burn out doing repetitive manual tasks. Onspec solves both challenges under one integrated roof.",
    icon: Cpu,
  },
];

export default function AboutPage() {
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0);
  const [activeEcosystemStage, setActiveEcosystemStage] = useState<number>(0);

  const selectedStep =
    CUSTOMER_JOURNEY_STEPS[activeJourneyStep] || CUSTOMER_JOURNEY_STEPS[0];
  const selectedEco =
    ECOSYSTEM_STAGES[activeEcosystemStage] || ECOSYSTEM_STAGES[0];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* SECTION 01: BRAND OVERVIEW & POSITIONING HERO */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/35 stripe-mesh-light tech-grid-bg pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#A8B1BE]/35 pb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#101D35]/15 bg-white px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#101D35]">
                ABOUT ONSPEC // CORPORATE ARCHITECTURE &amp; VISION
              </span>
            </div>
            <div className="font-mono text-xs text-[#253B5B]">
              {BRAND_INFO.descriptor}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                ONSPEC.EU — CYPRUS &amp; EUROPEAN UNION
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#101D35] sm:text-6xl leading-[1.05]">
                Your vision. Our execution.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#253B5B] sm:text-xl">
                Onspec is a modern business solutions and technology company
                helping individuals and organizations launch ready-to-run
                businesses, implement AI and automation systems, turn custom
                ideas into reality, and connect with vetted independent legal
                professionals in Cyprus.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-md">
                <div className="font-mono text-[11px] font-bold uppercase text-[#27B58A]">
                  THE ONSPEC VISION STATEMENT
                </div>
                <blockquote className="mt-3 text-base font-bold leading-snug text-[#101D35]">
                  “The real product isn’t just starting a business. It’s making
                  business ownership easier, more accessible and more
                  efficient.”
                </blockquote>
                <div className="mt-4 flex items-center justify-between border-t border-[#A8B1BE]/30 pt-3 font-mono text-[11px] text-[#253B5B]">
                  <span>ONSPEC EXECUTIVE DOSSIER</span>
                  <span>CYPRUS // EU</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillar Metrics Strip */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group rounded-xl border border-[#A8B1BE]/40 bg-white p-5 transition-all hover:border-[#101D35] hover:shadow-md"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#27B58A]">
                    {pillar.code}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#253B5B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-2 text-base font-extrabold text-[#101D35]">
                  {pillar.shortTitle}
                </div>
                <p className="mt-1 text-xs text-[#253B5B]">
                  {pillar.coreMessage}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InfiniteMarquee items={MARQUEE_TICKER_ITEMS} speed={38} />

      {/* SECTION 02: MISSION, PHILOSOPHY, APPROACH & WHY ONSPEC EXISTS */}
      <section className="border-b border-[#A8B1BE]/35 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#253B5B]">
              01 // MISSION, PHILOSOPHY &amp; APPROACH
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
              Business shouldn’t be complicated.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#253B5B]">
              We built Onspec around a foundational truth: entrepreneurs and
              business owners achieve far more when they don’t have to reinvent
              operational infrastructure from zero.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CORE_PILLARS_OF_THOUGHT.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.code}
                  className="rounded-2xl border border-[#A8B1BE]/40 bg-[#F7F8FA] p-7 transition-all hover:border-[#101D35] hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#27B58A]">
                      {item.code}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101D35] text-[#F7F8FA]">
                      <Icon className="h-4 w-4 text-[#27B58A]" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold text-[#101D35]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#253B5B]">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Monumental Vision Callout Banner */}
          <div className="mt-12 rounded-2xl linear-navy-surface tech-grid-dark p-8 text-[#F7F8FA] sm:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                  OUR LONG-TERM VISION
                </span>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                  “The real product isn’t just starting a business. It’s making
                  business ownership easier, more accessible and more
                  efficient.”
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#A8B1BE] sm:text-base">
                  Whether you are launching your very first automated vending
                  unit in Cyprus, deploying AI agents to reclaim 20 hours a week
                  in an established company, or building an entirely new
                  venture, Onspec is engineered to be your long-term execution
                  backbone.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/launch"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#27B58A] px-6 py-4 text-sm font-extrabold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                >
                  <span>Explore Turnkey Ventures</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: INTERACTIVE VISUAL DIAGRAM OF THE 6-STEP CUSTOMER JOURNEY */}
      <section className="border-b border-[#A8B1BE]/35 py-20 lg:py-28 stripe-mesh-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                02 // INTERACTIVE ARCHITECTURE DIAGRAM
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                The 6-Step Customer Journey
              </h2>
              <p className="mt-3 text-base text-[#253B5B]">
                From first discovery to long-term operational scaling, every
                client engagement follows a transparent six-stage execution
                protocol. Click any stage below to inspect the process.
              </p>
            </div>
            <div className="font-mono text-xs text-[#253B5B]">
              DISCOVERY → ENQUIRY → ASSESSMENT → PROPOSAL → EXECUTION → SUPPORT
            </div>
          </div>

          {/* Interactive 6-Node Flowchart Diagram */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CUSTOMER_JOURNEY_STEPS.map((step, index) => {
              const isActive = activeJourneyStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveJourneyStep(index)}
                  className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isActive
                      ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA] shadow-lg"
                      : "border-[#A8B1BE]/45 bg-white text-[#101D35] hover:border-[#253B5B]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-[#27B58A]" : "text-[#253B5B]"
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
                  <div className="mt-4">
                    <div className="text-base font-extrabold">{step.title}</div>
                    <div
                      className={`mt-1 text-xs ${
                        isActive ? "text-[#A8B1BE]" : "text-[#253B5B]"
                      }`}
                    >
                      {step.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Panel */}
          <div className="mt-6 rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-md sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-md bg-[#F7F8FA] px-3 py-1 font-mono text-xs font-bold text-[#101D35] border border-[#A8B1BE]/35">
                  <span>{selectedStep.code}</span>
                </div>
                <h3 className="mt-3 text-2xl font-extrabold text-[#101D35] sm:text-3xl">
                  {selectedStep.number}. {selectedStep.title} —{" "}
                  <span className="text-[#253B5B]">
                    {selectedStep.subtitle}
                  </span>
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#253B5B]">
                  {selectedStep.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveJourneyStep(
                        (prev) => (prev + 1) % CUSTOMER_JOURNEY_STEPS.length
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-4 py-2.5 text-xs font-bold text-[#F7F8FA] hover:bg-[#253B5B] cursor-pointer"
                  >
                    <span>
                      Next Stage: Step{" "}
                      {
                        CUSTOMER_JOURNEY_STEPS[
                          (activeJourneyStep + 1) %
                            CUSTOMER_JOURNEY_STEPS.length
                        ].number
                      }
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#27B58A]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl border border-[#A8B1BE]/35 bg-[#F7F8FA] p-6">
                  <div className="font-mono text-xs font-bold uppercase text-[#253B5B]">
                    STAGE OUTPUT &amp; CLIENT DELIVERABLE
                  </div>
                  <div className="mt-2 flex items-start gap-2.5 text-base font-bold text-[#101D35]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#27B58A]" />
                    <span>{selectedStep.deliverable}</span>
                  </div>
                  <div className="mt-4 border-t border-[#A8B1BE]/30 pt-4">
                    <div className="font-mono text-[11px] text-[#253B5B]">
                      PROGRESSION TRACKER: STEP {selectedStep.number} OF 06
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#A8B1BE]/30">
                      <div
                        className="h-full bg-[#27B58A] transition-all duration-300"
                        style={{
                          width: `${
                            ((activeJourneyStep + 1) /
                              CUSTOMER_JOURNEY_STEPS.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: INTERACTIVE 7-STAGE LONG-TERM BUSINESS ECOSYSTEM */}
      <section className="border-b border-[#A8B1BE]/35 linear-navy-surface tech-grid-dark py-20 text-[#F7F8FA] lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[#A8B1BE]/20 pb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                03 // THE 7-STAGE LONG-TERM BUSINESS ECOSYSTEM
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Designed for the Entire Lifecycle of Business Ownership
              </h2>
              <p className="mt-3 text-base text-[#A8B1BE]">
                Onspec is not a one-off vendor. Our four pillars form a
                continuous 7-stage growth loop—from launching your first turnkey
                unit and structuring your Cyprus company to automating daily
                operations and expanding across multiple locations.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#27B58A]/40 bg-[#27B58A]/10 px-4 py-2 font-mono text-xs text-[#27B58A]">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>CONTINUOUS ECOSYSTEM LOOP</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left 7-Stage Interactive Architecture List */}
            <div className="space-y-3 lg:col-span-7">
              {ECOSYSTEM_STAGES.map((stage, idx) => {
                const isSelected = activeEcosystemStage === idx;
                return (
                  <div
                    key={stage.step}
                    onClick={() => setActiveEcosystemStage(idx)}
                    className={`cursor-pointer rounded-xl border p-5 transition-all ${
                      isSelected
                        ? "border-[#27B58A] bg-[#253B5B]/70 shadow-lg"
                        : "border-[#A8B1BE]/20 bg-[#101D35]/70 hover:border-[#A8B1BE]/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                            isSelected
                              ? "bg-[#27B58A] text-[#101D35]"
                              : "bg-[#253B5B] text-[#F7F8FA]"
                          }`}
                        >
                          {stage.step}
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {stage.title}
                        </h3>
                      </div>
                      <span className="rounded bg-[#101D35] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#27B58A] border border-[#A8B1BE]/20">
                        {stage.pillarRef}
                      </span>
                    </div>
                    <p className="mt-2.5 pl-11 text-xs leading-relaxed text-[#A8B1BE] sm:text-sm">
                      {stage.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Visual Ecosystem Loop Diagram Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-[#A8B1BE]/30 bg-[#101D35]/90 p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/20 pb-4">
                  <span className="font-mono text-xs font-bold text-[#27B58A]">
                    ACTIVE STAGE // {selectedEco.step} OF 07
                  </span>
                  <span className="font-mono text-xs text-[#A8B1BE]">
                    {selectedEco.pillarRef}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-white">
                  {selectedEco.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A8B1BE]">
                  {selectedEco.description}
                </p>

                {/* Visual Circular / Connected Node Map */}
                <div className="mt-6 rounded-xl border border-[#A8B1BE]/20 bg-[#253B5B]/30 p-5">
                  <div className="font-mono text-[11px] font-bold uppercase text-[#F7F8FA]">
                    ECOSYSTEM INTERCONNECTION
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg border border-[#A8B1BE]/20 bg-[#101D35] p-3">
                      <div className="font-mono text-[10px] text-[#27B58A]">
                        01 LAUNCH
                      </div>
                      <div className="mt-1 font-semibold text-white">
                        Turnkey Hardware &amp; Sites
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#A8B1BE]/20 bg-[#101D35] p-3">
                      <div className="font-mono text-[10px] text-[#27B58A]">
                        02 AUTOMATE
                      </div>
                      <div className="mt-1 font-semibold text-white">
                        AI Agents &amp; Workflows
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#A8B1BE]/20 bg-[#101D35] p-3">
                      <div className="font-mono text-[10px] text-[#27B58A]">
                        03 INNOVATE
                      </div>
                      <div className="mt-1 font-semibold text-white">
                        Custom Idea Execution
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#A8B1BE]/20 bg-[#101D35] p-3">
                      <div className="font-mono text-[10px] text-[#27B58A]">
                        04 CONNECT
                      </div>
                      <div className="mt-1 font-semibold text-white">
                        Cyprus Legal Referrals
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#27B58A] px-4 py-3 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                  >
                    <span>Start Your Journey With Onspec</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: STARTING FROM SCRATCH VS. ENGINEERED ONSPEC */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#253B5B]">
              04 // THE ONSPEC DIFFERENCE
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#101D35]">
              Starting From Scratch vs. Engineered With Onspec
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#A8B1BE]/45">
            <div className="grid grid-cols-1 bg-[#101D35] p-4 font-mono text-xs font-bold text-[#F7F8FA] md:grid-cols-12">
              <div className="md:col-span-3">OPERATIONAL DIMENSION</div>
              <div className="hidden md:col-span-4 md:block text-[#A8B1BE]">
                STARTING FROM SCRATCH
              </div>
              <div className="hidden md:col-span-5 md:block text-[#27B58A]">
                ENGINEERED WITH ONSPEC
              </div>
            </div>
            <div className="divide-y divide-[#A8B1BE]/30 bg-white">
              {SCRATCH_VS_ONSPEC_COMPARISON.map((row) => (
                <div
                  key={row.dimension}
                  className="grid grid-cols-1 gap-4 p-5 md:grid-cols-12 md:items-center"
                >
                  <div className="font-bold text-[#101D35] md:col-span-3">
                    {row.dimension}
                  </div>
                  <div className="text-xs text-[#253B5B] md:col-span-4">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#253B5B]/70 md:hidden">
                      From Scratch:{" "}
                    </span>
                    {row.scratch}
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#101D35] md:col-span-5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#27B58A]" />
                    <span>{row.onspec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA Box */}
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#A8B1BE]/45 bg-[#F7F8FA] p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-[#101D35]">
                Ready to take the next step?
              </h3>
              <p className="mt-1 text-sm text-[#253B5B]">
                Let’s turn your plans into something real—whether launching a
                business, automating operations, or building your custom idea.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/innovate"
                className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-3 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>Submit Your Idea</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-3 text-xs font-bold text-[#F7F8FA] hover:bg-[#253B5B] transition-colors"
              >
                <span>Contact Onspec</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
