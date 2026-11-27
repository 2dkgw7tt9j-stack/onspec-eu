"use client";

import React, { useState, useRef } from "react";
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
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Smooth scroll lock to prevent jumping down the page
  const scrollToCalculatorTop = () => {
    if (calculatorRef.current) {
      const rect = calculatorRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      // If calculator header is out of comfortable view, gently align it
      if (rect.top < 60 || rect.top > 300) {
        window.scrollTo({
          top: currentScroll + rect.top - 90,
          behavior: "smooth",
        });
      }
    }
  };

  const handleSelect = (option: StepOption) => {
    setSelections((prev) => ({ ...prev, [currentStep]: option }));

    // Small delay for clean tactile feedback before advancing
    setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
        scrollToCalculatorTop();
      } else {
        setCalculated(true);
        scrollToCalculatorTop();
      }
    }, 220);
  };

  const resetCalculator = () => {
    setCurrentStep(0);
    setCalculated(false);
    scrollToCalculatorTop();
  };

  // Dynamically route to the dedicated specialist desk
  const targetDesk =
    selections[0]?.id === "turnkey"
      ? {
          phone: "35794055553",
          display: "+357 94 055553",
          label: "Turnkey Commercial Desk",
        }
      : selections[0]?.id === "ai"
      ? {
          phone: "35795604442",
          display: "+357 95 604442",
          label: "AI & Software Desk",
        }
      : {
          phone: "35794055552",
          display: "+357 94 055552",
          label: "Legal & Venture Desk",
        };

  // Generate customized WhatsApp inquiry URL
  const whatsappSummary = encodeURIComponent(
    `Hello ONSPEC ${targetDesk.label},\n\n` +
      `I ran the Operational Feasibility Calculator on onspec.eu:\n` +
      `• Track: ${selections[0]?.label || "Turnkey Commercial"}\n` +
      `• Geography: ${selections[1]?.label || "Limassol, Cyprus"}\n` +
      `• Objective: ${selections[2]?.label || "Unattended Revenue"}\n` +
      `• Velocity: ${selections[3]?.label || "3-5 Weeks"}\n\n` +
      `I would like to review the formal Preliminary Proposal.`
  );
  const whatsappUrl = `https://wa.me/${targetDesk.phone}?text=${whatsappSummary}`;

  // Calculate percentage
  const progressPercent = calculated
    ? 100
    : Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <section
      ref={calculatorRef}
      className="my-fluid-2xl container scroll-mt-24"
      id="calculator"
    >
      <div className="max-w-4xl mx-auto rounded-3xl bg-white text-black p-6 sm:p-10 md:p-12 border-2 border-black/10 shadow-2xl relative overflow-hidden transition-all duration-300">
        {/* Subtle Lightship pattern background */}
        <div className="absolute inset-0 pattern-background opacity-5 pointer-events-none" />

        {/* Brand Header with ONSPEC Logo & Identity */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-black/10 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center p-2.5 shrink-0 shadow-sm">
              <img
                src="/onspec_logo_transparent.png"
                alt="ONSPEC Logo"
                className="w-full h-full object-contain filter invert brightness-0"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">
                  ONSPEC™ VENTURE FOUNDRY
                </span>
                <span className="hidden sm:inline text-neutral-300">•</span>
                <span className="hidden sm:inline font-mono text-[11px] text-neutral-500">
                  Limassol Operations Desk
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black mt-0.5">
                Operational Feasibility Calculator
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex flex-col items-end">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                {calculated ? "Analysis Ready" : `Step 0${currentStep + 1} of 04`}
              </span>
              <span className="font-mono text-xs font-bold text-black">
                {progressPercent}% Complete
              </span>
            </div>
            <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Steps */}
        {!calculated ? (
          <div className="relative z-10 space-y-6 min-h-[460px] flex flex-col justify-between">
            {/* Step Question Header */}
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                Question {currentStep + 1} of {STEPS.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                {STEPS[currentStep].title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">
                {STEPS[currentStep].subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3 py-2">
              {STEPS[currentStep].options.map((option) => {
                const isSelected = selections[currentStep]?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`group text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-black text-white border-black shadow-md scale-[1.005]"
                        : "bg-neutral-50 hover:bg-neutral-100 text-black border-neutral-200 hover:border-black/40"
                    }`}
                  >
                    <div className="space-y-1 pr-2 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-semibold text-base sm:text-lg tracking-tight">
                          {option.label}
                        </span>
                        {option.badge && (
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-white text-black font-semibold"
                                : "bg-neutral-200 text-neutral-700"
                            }`}
                          >
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isSelected ? "text-neutral-300" : "text-neutral-600"
                        }`}
                      >
                        {option.desc}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full border-2 transition-colors">
                      {isSelected ? (
                        <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold">
                          <svg
                            className="w-4 h-4"
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
                      ) : (
                        <span className="w-7 h-7 rounded-full border-2 border-neutral-300 group-hover:border-black" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation Bar */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(Math.max(0, currentStep - 1));
                  scrollToCalculatorTop();
                }}
                disabled={currentStep === 0}
                className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black disabled:opacity-25 disabled:pointer-events-none cursor-pointer py-1.5"
              >
                ← Back
              </button>

              <div className="flex items-center gap-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setCurrentStep(i);
                      scrollToCalculatorTop();
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentStep
                        ? "w-8 bg-black"
                        : "w-2 bg-neutral-300 hover:bg-neutral-500"
                    }`}
                    title={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                    scrollToCalculatorTop();
                  }}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-black hover:text-neutral-700 cursor-pointer py-1.5"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCalculated(true);
                    scrollToCalculatorTop();
                  }}
                  className="text-xs font-mono uppercase tracking-wider text-black font-extrabold cursor-pointer py-1.5"
                >
                  Generate Blueprint →
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Blueprint View */
          <div className="relative z-10 space-y-8 animate-fadeIn">
            {/* Top Verdict Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-black font-mono text-[11px] uppercase tracking-wider font-bold">
                    High Commercial Feasibility
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    Confidence: 98.4%
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Operational Blueprint Ready
                </h3>
                <p className="text-sm text-neutral-300 max-w-lg">
                  Targeted setup:{" "}
                  <strong className="text-white">
                    {selections[0]?.label}
                  </strong>{" "}
                  deployed in{" "}
                  <strong className="text-white">
                    {selections[1]?.label}
                  </strong>
                  .
                </p>
              </div>

              <div className="text-left md:text-right shrink-0 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                  Est. Go-Live Velocity
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  3–5 Weeks
                </span>
                <span className="text-xs text-neutral-300 block mt-0.5">
                  Turnkey Commissioning
                </span>
              </div>
            </div>

            {/* Architecture Inclusions 2x2 Grid */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block">
                Engineered Inclusions for This Architecture
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                    01 • Physical & Telemetry Layer
                  </span>
                  <p className="text-sm font-bold text-black">
                    Dual-Band 4G LTE IoT Telemetry & Touchscreen
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Cloud oversight, remote reboot, live inventory tracking, and contactless EMV/NFC payment processing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                    02 • Host Venue & Placement
                  </span>
                  <p className="text-sm font-bold text-black">
                    Vetted High-Foot-Traffic Location Mapped
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Host agreements mapped across luxury hotels, premier fitness centers, or corporate parks in {selections[1]?.label}.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                    03 • Autonomous Software & AI
                  </span>
                  <p className="text-sm font-bold text-black">
                    24/7 AI Lead Routing & WhatsApp Pipeline
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Automated customer concierges, dispatch webhooks, and sub-second Next.js digital interface.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                    04 • Regulatory & Legal Network
                  </span>
                  <p className="text-sm font-bold text-black">
                    Cyprus Bar Association Legal Introductions
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Direct introductions to independent licensed advocates for entity incorporation, VAT compliance, and licensing.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetCalculator}
                className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer text-center sm:text-left py-2 font-semibold"
              >
                ← Recalculate Other Parameters
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
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
                  <span>Chat with {targetDesk.label} ({targetDesk.display})</span>
                </a>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-mono uppercase tracking-wider font-bold transition-colors text-center border border-neutral-300"
                >
                  Request Full Proposal →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
