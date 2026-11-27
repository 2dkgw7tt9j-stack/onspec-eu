"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StepOption {
  id: string;
  label: string;
  desc: string;
  badge?: string;
}

const STEPS = [
  {
    step: 1,
    title: "Select Venture Track",
    subtitle: "What type of commercial operation are you looking to engineer?",
    options: [
      {
        id: "turnkey",
        label: "Turnkey Automated Dispensary / Station",
        desc: "Prefabricated luxury perfume, wellness, or hot meal kiosks with mapped locations.",
        badge: "Pillar 01",
      },
      {
        id: "ai",
        label: "Autonomous AI & Workflow Infrastructure",
        desc: "24/7 AI concierges, WhatsApp API pipelines, and sub-second web engineering.",
        badge: "Pillar 02",
      },
      {
        id: "custom",
        label: "Bespoke Idea & Venture Prototyping",
        desc: "Custom physical or digital concept requiring feasibility modeling and execution.",
        badge: "Pillar 03",
      },
    ],
  },
  {
    step: 2,
    title: "Select Operational Geography",
    subtitle: "Where will your operation be deployed or incorporated?",
    options: [
      {
        id: "limassol",
        label: "Limassol, Cyprus",
        desc: "Coastal high-density commercial & luxury hospitality core.",
        badge: "Primary Hub",
      },
      {
        id: "nicosia",
        label: "Nicosia, Cyprus",
        desc: "Capital administrative, university, and corporate district.",
        badge: "Corporate",
      },
      {
        id: "larnaca_paphos",
        label: "Larnaca / Paphos Transit & Resorts",
        desc: "High foot-traffic international transit & resort hubs.",
        badge: "Hospitality",
      },
      {
        id: "pan_cyprus_eu",
        label: "Multi-City Cyprus or Pan-European",
        desc: "Distributed multi-unit route or cross-border EU operation.",
        badge: "Scalable",
      },
    ],
  },
  {
    step: 3,
    title: "Primary Operational Objective",
    subtitle: "What is your primary commercial benchmark for this project?",
    options: [
      {
        id: "passive_cashflow",
        label: "Unattended Commercial Revenue",
        desc: "Automated hardware generating daily transactions with remote telemetry.",
      },
      {
        id: "eliminate_hours",
        label: "Eliminate 25–35+ Manual Hours / Week",
        desc: "Autonomous AI agents handling qualification, lead routing, and bookings.",
      },
      {
        id: "new_venture_launch",
        label: "Launch a Validated New Venture in Weeks",
        desc: "From blueprint to operational reality without traditional bureaucracy.",
      },
    ],
  },
  {
    step: 4,
    title: "Target Deployment Velocity",
    subtitle: "What is your target timeframe from contract to live operation?",
    options: [
      {
        id: "fast_track",
        label: "Fast-Track Sprint (3 to 5 Weeks)",
        desc: "Prefabricated inventory and priority location deployment.",
        badge: "High Demand",
      },
      {
        id: "standard",
        label: "Staged Rollout (6 to 8 Weeks)",
        desc: "Detailed phased commissioning and comprehensive integration.",
      },
      {
        id: "discovery",
        label: "Preliminary Proposal & Feasibility First",
        desc: "Evaluate technical blueprint, risk matrix, and operational scope first.",
        badge: "Recommended",
      },
    ],
  },
];

export function FeasibilityCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, StepOption>>({
    0: STEPS[0].options[0],
    1: STEPS[1].options[0],
    2: STEPS[2].options[0],
    3: STEPS[3].options[2],
  });
  const [calculated, setCalculated] = useState(false);

  const handleSelect = (option: StepOption) => {
    setSelections((prev) => ({ ...prev, [currentStep]: option }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCalculated(true);
    }
  };

  const resetCalculator = () => {
    setCurrentStep(0);
    setCalculated(false);
  };

  // Dynamically route to the dedicated specialist desk
  const targetDesk =
    selections[0]?.id === "turnkey"
      ? { phone: "35794055553", label: "Turnkey Desk (+357 94 055553)" }
      : selections[0]?.id === "ai"
      ? { phone: "35795604442", label: "AI Desk (+357 95 604442)" }
      : { phone: "35794055552", label: "Legal & Venture Desk (+357 94 055552)" };

  // Generate customized WhatsApp inquiry URL
  const whatsappSummary = encodeURIComponent(
    `Hello ONSPEC ${targetDesk.label}, I ran the Operational Feasibility Calculator:\n` +
      `• Track: ${selections[0]?.label || "Turnkey"}\n` +
      `• Location: ${selections[1]?.label || "Cyprus"}\n` +
      `• Objective: ${selections[2]?.label || "Automation"}\n` +
      `• Target Velocity: ${selections[3]?.label || "3-5 Weeks"}\n\n` +
      `I would like to review the formal Preliminary Proposal.`
  );
  const whatsappUrl = `https://wa.me/${targetDesk.phone}?text=${whatsappSummary}`;

  return (
    <section className="my-fluid-2xl container" id="calculator">
      <div className="max-w-4xl mx-auto rounded-3xl bg-neutral-950 text-white p-6 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 pattern-background opacity-10 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Interactive Engineering Engine
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Operational Feasibility Calculator
            </h2>
            <p className="text-sm md:text-base text-neutral-400 mt-2 max-w-xl">
              Model your commercial deployment velocity, hardware & software stack, and execution roadmap across Cyprus and the EU.
            </p>
          </div>

          {!calculated && (
            <div className="flex items-center gap-2 self-start md:self-auto bg-white/5 px-4 py-2 rounded-full border border-white/10 font-mono text-xs text-neutral-300">
              <span>Step 0{currentStep + 1}</span>
              <span className="text-neutral-500">/</span>
              <span>0{STEPS.length}</span>
            </div>
          )}
        </div>

        {/* Interactive Steps */}
        {!calculated ? (
          <div className="relative z-10 py-8 space-y-6">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                Question {currentStep + 1} of {STEPS.length}
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-white">
                {STEPS[currentStep].title}
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                {STEPS[currentStep].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {STEPS[currentStep].options.map((option) => {
                const isSelected = selections[currentStep]?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`group text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-base md:text-lg">
                          {option.label}
                        </span>
                        {option.badge && (
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-black text-white"
                                : "bg-white/10 text-neutral-300"
                            }`}
                          >
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs md:text-sm ${
                          isSelected ? "text-neutral-700" : "text-neutral-400"
                        }`}
                      >
                        {option.desc}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-white/20 text-transparent group-hover:border-white/60"
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M13 4L6 11l-3-3" />
                        </svg>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step navigation indicator */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ← Previous Step
              </button>

              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentStep(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStep
                        ? "w-8 bg-white"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    title={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 cursor-pointer"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCalculated(true)}
                  className="text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                >
                  View Blueprint Result →
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Blueprint View */
          <div className="relative z-10 py-8 space-y-8 animate-fadeIn">
            {/* Score & Verdict Banner */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-wider border border-emerald-500/30">
                    High Commercial Feasibility
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    Confidence: 98.4%
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                  Feasibility Blueprint Ready
                </h3>
                <p className="text-sm text-neutral-400 mt-1 max-w-lg">
                  Targeted deployment:{" "}
                  <strong className="text-white">
                    {selections[0]?.label}
                  </strong>{" "}
                  in{" "}
                  <strong className="text-white">
                    {selections[1]?.label}
                  </strong>
                  .
                </p>
              </div>

              <div className="text-left md:text-right shrink-0">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                  Est. Go-Live Velocity
                </span>
                <span className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">
                  3–5 Weeks
                </span>
                <span className="text-xs text-emerald-400 block mt-0.5">
                  Turnkey Commissioning
                </span>
              </div>
            </div>

            {/* Architecture Deliverables Matrix */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                Engineered Inclusions for This Architecture
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                    01 • Physical & Telemetry Layer
                  </span>
                  <p className="text-sm font-medium text-white">
                    Dual-Band 4G LTE IoT Telemetry & Touchscreen
                  </p>
                  <p className="text-xs text-neutral-400">
                    Cloud monitoring, remote reboot, live inventory tracking, and cashless EMV/NFC processing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                    02 • Host Venue & Placement
                  </span>
                  <p className="text-sm font-medium text-white">
                    Vetted High-Foot-Traffic Location Mapped
                  </p>
                  <p className="text-xs text-neutral-400">
                    Placement agreements pre-negotiated across hospitality, fitness, or corporate parks in {selections[1]?.label}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                    03 • Autonomous Software & AI
                  </span>
                  <p className="text-sm font-medium text-white">
                    24/7 AI Lead Routing & WhatsApp Pipeline
                  </p>
                  <p className="text-xs text-neutral-400">
                    Automated client concierges, dispatch hooks, and sub-second Next.js digital interface.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                    04 • Regulatory & Corporate
                  </span>
                  <p className="text-sm font-medium text-white">
                    Cyprus Bar Association Legal Introductions
                  </p>
                  <p className="text-xs text-neutral-400">
                    Vetted licensed advocates coordinate entity incorporation, VAT compliance, and municipal licensing.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Conversion Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetCalculator}
                className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer text-center sm:text-left py-2"
              >
                ← Recalculate Other Parameters
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Chat with {targetDesk.label}</span>
                </a>

                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all duration-200 text-center border border-white/20"
                >
                  Request Full Dossier →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
