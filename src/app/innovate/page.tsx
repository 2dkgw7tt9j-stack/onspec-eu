"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers,
  ShieldCheck,
  Compass,
  Cpu,
  Wallet,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { BRAND_INFO, PILLARS, MARQUEE_TICKER_ITEMS } from "@/data/onspec-data";
import {
  submitOnspecEnquiry,
  type SubmissionResult,
} from "@/lib/integrations-placeholder";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";

const BUDGET_OPTIONS = [
  "< €10k",
  "€10k – €25k",
  "€25k – €50k",
  "€50k – €100k+",
  "Flexible / Need Quotation",
];

const TIMEFRAME_OPTIONS = [
  "Immediate / < 30 days",
  "1 – 3 Months",
  "3 – 6 Months",
  "Exploratory",
];

const CONCEPT_ARCHETYPES = [
  {
    id: "physical-automated",
    code: "ARCH-01 // PHYSICAL ASSET",
    title: "Custom Vending, Kiosk or Unmanned Retail Concept",
    summary:
      "Bespoke automated hardware, specialty dispensing, smart lockers, or unattended micro-retail pods tailored to a specific niche in Cyprus or the EU.",
    deliverables: [
      "Custom hardware manufacturer sourcing & telemetry pairing",
      "Site footprint & concession feasibility in Cyprus",
      "Unit economics & landed equipment quotation",
    ],
  },
  {
    id: "digital-ai-venture",
    code: "ARCH-02 // DIGITAL & AI SYSTEM",
    title: "Proprietary Software, Marketplace or AI Service Platform",
    summary:
      "A new web platform, automated service business, or AI-powered B2B/B2C application engineered from zero to commercial readiness.",
    deliverables: [
      "Full-stack architecture & AI integration specification",
      "Payment gateway, billing & user onboarding flows",
      "Phased MVP-to-Scale development & cost roadmap",
    ],
  },
  {
    id: "brick-and-mortar-modern",
    code: "ARCH-03 // COMMERCIAL INFRASTRUCTURE",
    title: "Modern Brick-and-Mortar or Service Facility",
    summary:
      "Launching a physical service venue, automated studio, specialty hospitality concept, or commercial facility with modern operational automation baked in.",
    deliverables: [
      "Location scouting, commercial lease & fit-out coordination",
      "Equipment procurement, supplier chain & IoT access setup",
      "Cyprus corporate formation & licensing via independent counsel",
    ],
  },
  {
    id: "hybrid-expansion",
    code: "ARCH-04 // HYBRID & CUSTOM",
    title: "Unconventional or First-to-Market Business Concept",
    summary:
      "Have an idea that doesn't fit a standard template? We deconstruct the concept into practical engineering, legal, operational, and financial blocks.",
    deliverables: [
      "First-principles feasibility & risk matrix",
      "Vendor, hardware & software stack identification",
      "Actionable step-by-step execution quotation",
    ],
  },
];

const EVALUATION_PROTOCOL = [
  {
    step: "01",
    code: "PHASE 01 // INTAKE",
    title: "Concept Intake & Scope Definition",
    description:
      "You share what you are thinking—whether it is a rough sketch or a detailed commercial vision—along with your goals, target timeframe, and budget comfort zone.",
    metric: "100% Confidential Review",
  },
  {
    step: "02",
    code: "PHASE 02 // ARCHITECTURE",
    title: "Technical, Operational & Market Assessment",
    description:
      "Our team evaluates what is required to make the concept work in the real world: equipment, software, suppliers, location criteria, and Cyprus/EU corporate prerequisites.",
    metric: "Multi-Disciplinary Audit",
  },
  {
    step: "03",
    code: "PHASE 03 // FREE PROPOSAL",
    title: "Free Preliminary Proposal or Quotation",
    description:
      "We prepare a structured preliminary proposal outlining potential solutions, recommended architecture, estimated setup costs, and concrete next steps—at zero cost or obligation.",
    metric: "€0 Preliminary Dossier",
  },
  {
    step: "04",
    code: "PHASE 04 // EXECUTION",
    title: "Turnkey Build, Procurement & Launch",
    description:
      "Once you approve the roadmap, Onspec transitions into your execution partner—coordinating suppliers, technology, independent legal professionals, and launch handover.",
    metric: "End-to-End Delivery",
  },
];

export default function InnovatePage() {
  const pillar = PILLARS.find((p) => p.id === "innovate") || PILLARS[2];

  // Form state for all 7 required fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [budget, setBudget] = useState<string>("Flexible / Need Quotation");
  const [goals, setGoals] = useState("");
  const [timeframe, setTimeframe] = useState<string>("1 – 3 Months");
  const [selectedArchetype, setSelectedArchetype] = useState<string>(
    CONCEPT_ARCHETYPES[0].id
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleApplyArchetype = (archetypeTitle: string) => {
    if (!ideaDescription.trim()) {
      setIdeaDescription(`Concept Category: ${archetypeTitle}\n\nMy Idea: `);
    }
    const formEl = document.getElementById("submit-idea-engine");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !ideaDescription.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await submitOnspecEnquiry({
        pillar: "03_INNOVATE",
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        ideaDescription: ideaDescription.trim(),
        budget,
        goals: goals.trim(),
        timeframe,
        metadata: {
          archetype: selectedArchetype,
          proposalType: "Free Preliminary Proposal & Quotation",
          sourceRoute: "/innovate",
        },
      });
      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(submissionResult.referenceId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setName("");
    setEmail("");
    setWhatsapp("");
    setIdeaDescription("");
    setGoals("");
    setBudget("Flexible / Need Quotation");
    setTimeframe("1 – 3 Months");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* SECTION 01: ARCHITECTURAL HERO */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/35 stripe-mesh-light tech-grid-bg pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Top Specification Telemetry Pill */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#A8B1BE]/35 pb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#101D35]/15 bg-white px-3.5 py-1.5 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#101D35]">
                {pillar.code} // SUBMIT YOUR IDEA
              </span>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs text-[#253B5B]">
              <span>EVALUATION FEE: €0.00 (FREE PRELIMINARY PROPOSAL)</span>
              <span className="hidden sm:inline text-[#A8B1BE]">|</span>
              <span className="hidden sm:inline">
                JURISDICTION: CYPRUS &amp; EU
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Core Statement */}
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                YOUR IDEA. OUR EXECUTION.
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#101D35] sm:text-5xl lg:text-6xl leading-[1.06]">
                Your idea doesn’t have to stay an idea.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#253B5B] sm:text-xl">
                Have an idea? Let’s build it. Tell us what you’re thinking.
                We’ll help you figure out how to bring it to life—with a{" "}
                <span className="font-semibold text-[#101D35]">
                  free preliminary proposal or quotation
                </span>{" "}
                outlining potential solutions, estimated costs, and recommended
                next steps.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#submit-idea-engine"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-bold text-[#101D35] shadow-sm transition-all hover:bg-[#1F9470] hover:text-white"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>SUBMIT YOUR IDEA NOW</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#evaluation-protocol"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#101D35]/20 bg-white px-5 py-3.5 text-sm font-semibold text-[#101D35] transition-colors hover:border-[#101D35]"
                >
                  <span>How We Evaluate Concepts</span>
                </a>
              </div>

              {/* Trust Micro-Grid */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[#A8B1BE]/35 pt-6">
                <div>
                  <div className="font-mono text-xs text-[#253B5B]/75">
                    01 // DELIVERABLE
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#101D35]">
                    Free Preliminary Proposal
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#253B5B]/75">
                    02 // TRANSPARENCY
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#101D35]">
                    Estimated Costs &amp; Roadmap
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#253B5B]/75">
                    03 // EXECUTION
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#101D35]">
                    Hardware, AI &amp; Cyprus Setup
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sample Preliminary Proposal Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xl sm:p-8">
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 pb-4">
                  <div>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#27B58A]">
                      SPECIFICATION PREVIEW // DOSSIER
                    </span>
                    <h2 className="mt-0.5 text-lg font-bold text-[#101D35]">
                      What Your Free Proposal Includes
                    </h2>
                  </div>
                  <span className="rounded bg-[#101D35] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#27B58A]">
                    OSP-PROP-V1
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#253B5B]">
                  Every idea submitted through Pillar 03 is reviewed by our
                  solutions architects to produce a structured preliminary
                  brief:
                </p>

                <div className="mt-5 space-y-3.5">
                  <div className="flex items-start gap-3 rounded-xl border border-[#A8B1BE]/30 bg-[#F7F8FA] p-3.5">
                    <Compass className="mt-0.5 h-4 w-4 shrink-0 text-[#27B58A]" />
                    <div>
                      <div className="text-xs font-bold text-[#101D35]">
                        1. Potential Solutions &amp; Architecture
                      </div>
                      <p className="mt-0.5 text-xs text-[#253B5B]">
                        Practical breakdown of the hardware, software, suppliers,
                        and operational model required to execute your concept.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-[#A8B1BE]/30 bg-[#F7F8FA] p-3.5">
                    <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#27B58A]" />
                    <div>
                      <div className="text-xs font-bold text-[#101D35]">
                        2. Estimated Costs &amp; Budget Brackets
                      </div>
                      <p className="mt-0.5 text-xs text-[#253B5B]">
                        Transparent preliminary quotation covering equipment/tech
                        procurement, setup coordination, and phased options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-[#A8B1BE]/30 bg-[#F7F8FA] p-3.5">
                    <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[#27B58A]" />
                    <div>
                      <div className="text-xs font-bold text-[#101D35]">
                        3. Recommended Next Steps &amp; Timeline
                      </div>
                      <p className="mt-0.5 text-xs text-[#253B5B]">
                        Clear milestone schedule from feasibility validation and
                        Cyprus company setup (via vetted professionals) to launch.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-[#101D35] px-4 py-3 text-xs text-[#F7F8FA]">
                  <span className="font-mono text-[11px] text-[#A8B1BE]">
                    NO OBLIGATION • CONFIDENTIAL ASSESSMENT
                  </span>
                  <a
                    href="#submit-idea-engine"
                    className="font-semibold text-[#27B58A] hover:underline"
                  >
                    Start Intake →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TELEMETRY MARQUEE */}
      <InfiniteMarquee items={MARQUEE_TICKER_ITEMS} speed={35} />

      {/* SECTION 02: EXECUTIVE EXPLANATION — HOW ONSPEC EVALUATES & EXECUTES */}
      <section
        id="evaluation-protocol"
        className="border-b border-[#A8B1BE]/35 bg-white py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#253B5B]">
              01 // CONCEPT EVALUATION METHODOLOGY
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
              Most good ideas stall at the execution gap. We bridge it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#253B5B]">
              Many people have strong commercial ideas—a new automated service,
              a niche retail pod, a digital platform, or a local facility—but do
              not know how to source the equipment, integrate the software,
              coordinate suppliers, or structure the entity in Cyprus. Onspec
              turns abstract concepts into structured, buildable projects.
            </p>
          </div>

          {/* 4-Stage Protocol Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {EVALUATION_PROTOCOL.map((phase) => (
              <div
                key={phase.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/40 bg-[#F7F8FA] p-6 transition-all hover:border-[#101D35] hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 pb-3">
                    <span className="font-mono text-xs font-bold text-[#253B5B]">
                      {phase.code}
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#101D35] font-mono text-xs font-bold text-[#27B58A]">
                      {phase.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#101D35]">
                    {phase.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#253B5B]">
                    {phase.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#A8B1BE]/30 pt-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#101D35]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#27B58A]" />
                    {phase.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Concept Archetypes Selector */}
          <div className="mt-16 rounded-2xl border border-[#A8B1BE]/40 bg-[#F7F8FA] p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-4 border-b border-[#A8B1BE]/35 pb-6 lg:flex-row lg:items-end">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                  02 // WHAT WE CAN BUILD TOGETHER
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-[#101D35]">
                  Select a Concept Archetype to Pre-Configure Your Intake
                </h3>
              </div>
              <p className="max-w-md text-xs text-[#253B5B]">
                Click any category below to load its context directly into the
                Submit Your Idea intake form.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {CONCEPT_ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetype === arch.id;
                return (
                  <div
                    key={arch.id}
                    onClick={() => setSelectedArchetype(arch.id)}
                    className={`cursor-pointer rounded-xl border p-6 transition-all ${
                      isSelected
                        ? "border-[#101D35] bg-white shadow-md ring-1 ring-[#101D35]"
                        : "border-[#A8B1BE]/35 bg-white/70 hover:border-[#253B5B]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#253B5B]">
                        {arch.code}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                          isSelected
                            ? "bg-[#27B58A] text-[#101D35]"
                            : "bg-[#F7F8FA] text-[#253B5B]"
                        }`}
                      >
                        {isSelected ? "ACTIVE ARCHETYPE" : "SELECT"}
                      </span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-[#101D35]">
                      {arch.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                      {arch.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-[#A8B1BE]/25 pt-3">
                      {arch.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-[#101D35]"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArchetype(arch.id);
                          handleApplyArchetype(arch.title);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101D35] hover:text-[#27B58A] cursor-pointer"
                      >
                        <span>Use this archetype in my submission</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: FULL INTERACTIVE "SUBMIT YOUR IDEA" INTAKE ENGINE */}
      <section
        id="submit-idea-engine"
        className="border-b border-[#A8B1BE]/35 py-20 lg:py-28 stripe-mesh-light"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Sidebar: Why Submit & What Happens Next */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                    03 // IDEA INTAKE ENGINE
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                    Tell us what you’re thinking.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#253B5B]">
                    Fill out the concept brief with as much detail as you have
                    today. You don’t need a finished business plan—our role is
                    to evaluate the concept and return a{" "}
                    <strong className="text-[#101D35]">
                      free preliminary proposal or quotation
                    </strong>{" "}
                    outlining potential solutions, estimated costs, and
                    recommended next steps.
                  </p>
                </div>

                {/* Spec Assurance Box */}
                <div className="rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xs">
                  <div className="font-mono text-xs font-bold uppercase text-[#101D35]">
                    ONSPEC PROPOSAL GUARANTEE
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#27B58A]" />
                      <div>
                        <div className="text-xs font-bold text-[#101D35]">
                          Strict Client Confidentiality
                        </div>
                        <p className="mt-0.5 text-xs text-[#253B5B]">
                          Your business concept, location thoughts, and contact
                          details are strictly protected and used solely to
                          prepare your preliminary proposal.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#27B58A]" />
                      <div>
                        <div className="text-xs font-bold text-[#101D35]">
                          Written Preliminary Proposal &amp; Costing
                        </div>
                        <p className="mt-0.5 text-xs text-[#253B5B]">
                          We respond with concrete architectural direction,
                          estimated budget requirements, and execution steps.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-[#27B58A]" />
                      <div>
                        <div className="text-xs font-bold text-[#101D35]">
                          Hardware + AI + Cyprus Legal Ecosystem
                        </div>
                        <p className="mt-0.5 text-xs text-[#253B5B]">
                          Unlike standard agencies, we combine physical equipment
                          sourcing, AI automation, and Cyprus corporate referrals
                          under one roof.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Alternative */}
                <div className="rounded-2xl bg-[#101D35] p-6 text-[#F7F8FA]">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#27B58A]">
                    PREFER A VOICE OR WHATSAPP BRIEFING?
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#A8B1BE]">
                    If you prefer to discuss your concept directly with our
                    Cyprus &amp; EU operations desk before submitting a written
                    brief:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={BRAND_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#27B58A] px-3.5 py-2 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>WhatsApp Desk</span>
                    </a>
                    <a
                      href={`mailto:${BRAND_INFO.emailPrimary}?subject=Custom%20Idea%20Submission%20—%20ONSPEC`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#A8B1BE]/30 px-3.5 py-2 text-xs font-semibold text-[#F7F8FA] hover:border-white transition-colors"
                    >
                      <span>{BRAND_INFO.emailPrimary}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 7-Field Intake Form or Confirmation State */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-lg sm:p-10">
                {submissionResult ? (
                  /* INTERACTIVE SUBMISSION CONFIRMATION STATE */
                  <div className="py-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#27B58A]/15 px-3.5 py-1.5 text-xs font-bold text-[#101D35]">
                      <CheckCircle2 className="h-4 w-4 text-[#27B58A]" />
                      <span>CONCEPT DOSSIER LOGGED // PHASE 1 VERIFIED</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-extrabold text-[#101D35] sm:text-3xl">
                      Your idea submission has been registered.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                      Thank you, <strong className="text-[#101D35]">{name}</strong>.
                      Our solutions engineering team has logged your concept for
                      feasibility evaluation and preliminary proposal preparation.
                    </p>

                    {/* Reference Code Telemetry Card */}
                    <div className="mt-6 rounded-xl border border-[#101D35]/15 bg-[#F7F8FA] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="font-mono text-[11px] uppercase text-[#253B5B]">
                            PROPOSAL REFERENCE ID
                          </div>
                          <div className="mt-1 font-mono text-xl font-extrabold text-[#101D35]">
                            {submissionResult.referenceId}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyRef}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#A8B1BE]/50 bg-white px-3.5 py-2 text-xs font-semibold text-[#101D35] hover:border-[#101D35] cursor-pointer"
                        >
                          {copiedRef ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[#27B58A]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Reference ID</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#A8B1BE]/30 pt-4 text-xs sm:grid-cols-3">
                        <div>
                          <span className="font-mono text-[10px] text-[#253B5B]">
                            BUDGET BRACKET
                          </span>
                          <div className="font-semibold text-[#101D35]">
                            {budget}
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-[#253B5B]">
                            TARGET TIMEFRAME
                          </span>
                          <div className="font-semibold text-[#101D35]">
                            {timeframe}
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-[#253B5B]">
                            DELIVERABLE
                          </span>
                          <div className="font-semibold text-[#27B58A]">
                            Free Preliminary Proposal
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary of submitted idea */}
                    <div className="mt-6 rounded-xl border border-[#A8B1BE]/35 p-4 text-xs">
                      <div className="font-mono text-[11px] font-bold text-[#101D35]">
                        SUBMITTED BRIEF SUMMARY
                      </div>
                      <p className="mt-1.5 line-clamp-3 text-[#253B5B]">
                        {ideaDescription}
                      </p>
                      {goals && (
                        <p className="mt-2 border-t border-[#A8B1BE]/25 pt-2 text-[#253B5B]">
                          <strong className="text-[#101D35]">Goals:</strong>{" "}
                          {goals}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={`${BRAND_INFO.whatsappLink}?text=${encodeURIComponent(
                          `Hello Onspec, I just submitted my business idea (Ref: ${submissionResult.referenceId}) and would like to discuss my free preliminary proposal.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-3 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Fast-Track on WhatsApp with Ref ID</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-lg border border-[#101D35]/20 px-4 py-3 text-xs font-semibold text-[#101D35] hover:border-[#101D35] cursor-pointer"
                      >
                        Submit Another Idea
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 7-FIELD INTERACTIVE INTAKE FORM */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A8B1BE]/30 pb-4">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#253B5B]">
                          SPECIFICATION INTAKE // PILLAR 03
                        </span>
                        <h3 className="text-xl font-extrabold text-[#101D35]">
                          Submit Your Idea for a Free Preliminary Proposal
                        </h3>
                      </div>
                      <span className="rounded-md bg-[#F7F8FA] px-2.5 py-1 font-mono text-[11px] text-[#253B5B] border border-[#A8B1BE]/35">
                        7 REQUIRED / OPTIONAL FIELDS
                      </span>
                    </div>

                    {/* Field 1 & 2: Name + Email */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="innovate-name"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          1. Full Name <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="innovate-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Andreas Georgiou"
                          className="mt-2 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] placeholder:text-[#A8B1BE] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="innovate-email"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          2. Email Address{" "}
                          <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="innovate-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.eu"
                          className="mt-2 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] placeholder:text-[#A8B1BE] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Field 3: WhatsApp Number */}
                    <div>
                      <label
                        htmlFor="innovate-whatsapp"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        3. WhatsApp Number{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <input
                        id="innovate-whatsapp"
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+357 99 000 000 (for rapid proposal updates & direct consultation)"
                        className="mt-2 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] placeholder:text-[#A8B1BE] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Field 4: Description of the Idea */}
                    <div>
                      <label
                        htmlFor="innovate-description"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        4. Description of Your Idea{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <p className="mt-0.5 text-xs text-[#253B5B]">
                        Describe the business, product, automated system, or
                        service you have in mind, target customers, and location
                        (e.g. Limassol, Nicosia, Cyprus-wide, or EU).
                      </p>
                      <textarea
                        id="innovate-description"
                        required
                        rows={4}
                        value={ideaDescription}
                        onChange={(e) => setIdeaDescription(e.target.value)}
                        placeholder="Tell us what you are thinking..."
                        className="mt-2 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] placeholder:text-[#A8B1BE] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Field 5: Budget (Optional Selector) */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block font-mono text-xs font-bold uppercase text-[#101D35]">
                          5. Estimated Budget Range{" "}
                          <span className="font-normal text-[#253B5B]">
                            (Optional Selector)
                          </span>
                        </label>
                        <span className="font-mono text-[11px] text-[#27B58A]">
                          Selected: {budget}
                        </span>
                      </div>
                      <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {BUDGET_OPTIONS.map((option) => {
                          const active = budget === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setBudget(option)}
                              className={`rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                                active
                                  ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA]"
                                  : "border-[#A8B1BE]/50 bg-[#F7F8FA] text-[#101D35] hover:border-[#253B5B]"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {active && (
                                  <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Field 6: Goals and Expectations */}
                    <div>
                      <label
                        htmlFor="innovate-goals"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        6. Goals and Expectations{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <p className="mt-0.5 text-xs text-[#253B5B]">
                        What does success look like for you? (e.g., passive
                        side-income, full turnkey launch, custom prototype,
                        automating operations, or scaling across Cyprus).
                      </p>
                      <textarea
                        id="innovate-goals"
                        required
                        rows={3}
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        placeholder="Share your main goals, desired level of involvement, and what support you need from Onspec..."
                        className="mt-2 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] placeholder:text-[#A8B1BE] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Field 7: Desired Timeframe */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block font-mono text-xs font-bold uppercase text-[#101D35]">
                          7. Desired Timeframe{" "}
                          <span className="text-[#27B58A]">*</span>
                        </label>
                        <span className="font-mono text-[11px] text-[#253B5B]">
                          Target: {timeframe}
                        </span>
                      </div>
                      <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {TIMEFRAME_OPTIONS.map((option) => {
                          const active = timeframe === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setTimeframe(option)}
                              className={`rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                                active
                                  ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA]"
                                  : "border-[#A8B1BE]/50 bg-[#F7F8FA] text-[#101D35] hover:border-[#253B5B]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span>{option}</span>
                                {active && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#27B58A]" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#27B58A] px-6 py-4 text-sm font-extrabold text-[#101D35] shadow-md transition-all hover:bg-[#1F9470] hover:text-white disabled:opacity-60 cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                        <span>
                          {isSubmitting
                            ? "GENERATING PROPOSAL REFERENCE ID..."
                            : "SUBMIT YOUR IDEA FOR FREE PRELIMINARY PROPOSAL"}
                        </span>
                      </button>
                      <p className="mt-3 text-center font-mono text-[11px] text-[#253B5B]">
                        FREE PRELIMINARY PROPOSAL OR QUOTATION • ZERO OBLIGATION
                        • PHASE 2 SUPABASE READY
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: CROSS-PILLAR NAVIGATION BANNER */}
      <section className="linear-navy-surface tech-grid-dark py-16 text-[#F7F8FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                PREFER A PROVEN TURNKEY MODEL?
              </span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Explore our Ready-to-Launch Prefabricated Businesses
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#A8B1BE]">
                If you want a pre-engineered business specification with known
                equipment costs and timelines, browse Pillar 01 (Smart Vending,
                Automated Coffee Stations, Self-Service Kiosks, Laundromats &amp;
                Car Wash systems).
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/launch"
                className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-3 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
              >
                <span>01 // Explore Ready-to-Launch</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 rounded-lg border border-[#A8B1BE]/35 px-5 py-3 text-xs font-semibold text-[#F7F8FA] hover:border-white transition-colors"
              >
                <span>04 // Cyprus Legal Network</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
