"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND_INFO, CUSTOMER_JOURNEY_STEPS } from "@/data/onspec-data";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const IDEA_ARCHETYPES = [
  {
    id: "physical-automated",
    code: "ARCH-01 // AUTOMATED RETAIL & PODS",
    title: "Physical Automated Business or Kiosk Concept",
    examples: "Custom vending concept, unmanned retail store, automated locker pod, smart wash or self service station",
  },
  {
    id: "digital-ai-platform",
    code: "ARCH-02 // AI & DIGITAL PLATFORM",
    title: "Digital Platform, SaaS, or AI-Powered Venture",
    examples: "Vertical AI service, automated marketplace, booking platform, or B2B software-enabled business",
  },
  {
    id: "hybrid-commercial",
    code: "ARCH-03 // HYBRID COMMERCIAL VENTURE",
    title: "Brick-and-Mortar + Automated Operations",
    examples: "Specialty hospitality, studio/court rental, logistics hub, or physical service with automated booking & CRM",
  },
  {
    id: "existing-expansion",
    code: "ARCH-04 // NEW PRODUCT OR EXPANSION",
    title: "New Concept for an Existing Business",
    examples: "Launching a new automated revenue stream, Cyprus/EU market expansion, or custom hardware/software rollout",
  },
];

const BUDGET_TIERS = [
  "Need Onspec Cost Estimation (Open)",
  "€10,000 to €25,000",
  "€25,000 to €50,000",
  "€50,000 to €100,000",
  "€100,000+",
];

const TIMEFRAME_OPTIONS = [
  "Immediate (Start within 30 days)",
  "1 to 3 Months",
  "3 to 6 Months",
  "Exploratory / Feasibility Assessment First",
];

const FOUNDRY_SPECS = [
  {
    groupTitle: "01 // Feasibility & Commercial Blueprinting",
    rows: [
      {
        label: "Preliminary Proposal Cost",
        value: "€0 : Free Preliminary Proposal & Quotation",
      },
      {
        label: "Turnaround Window",
        value: "48 to 72 Hours from Concept Submission",
      },
      {
        label: "Confidentiality Standard",
        value: "Strict Non-Disclosure & Protected Intake Handling",
      },
      {
        label: "Unit Economics Modeling",
        value: "CAPEX, OPEX, Supplier Margins & Break-Even Horizon",
      },
      {
        label: "Location & Market Vetting",
        value: "Cyprus (Limassol, Nicosia, Larnaca, Paphos) & EU Markets",
      },
    ],
  },
  {
    groupTitle: "02 // Hardware, Software & Operational Execution",
    rows: [
      {
        label: "Commercial Hardware Sourcing",
        value: "Direct Manufacturer & European Distributor Procurement",
      },
      {
        label: "Payment & Telemetry Stack",
        value: "EMV Contactless, Apple/Google Pay, Stripe & Live Cloud HUD",
      },
      {
        label: "Embedded AI & Automation",
        value: "24/7 AI Customer Support, WhatsApp API, CRM & Booking Engine",
      },
      {
        label: "Corporate & Legal Structuring",
        value: "Coordinated via Independent Licensed Legal Professionals in Cyprus",
      },
      {
        label: "Commissioning & Handover",
        value: "Turnkey Launch Readiness, SOP Playbooks & Ongoing Scaling Support",
      },
    ],
  },
];

export default function InnovatePage() {
  const [archetype, setArchetype] = useState(IDEA_ARCHETYPES[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [budget, setBudget] = useState(BUDGET_TIERS[0]);
  const [goals, setGoals] = useState("");
  const [timeframe, setTimeframe] = useState(TIMEFRAME_OPTIONS[1]);
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const selectedArchetype =
    IDEA_ARCHETYPES.find((a) => a.id === archetype) || IDEA_ARCHETYPES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "03_INNOVATE",
      name,
      email,
      whatsapp,
      ideaDescription: `[Archetype: ${selectedArchetype.title}] ${ideaDescription}`,
      budget,
      goals,
      timeframe,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-[#F7F8FA] text-[#101D35]">
      {/* Section 1: Lightship specs.html Centered Split-Text Hero Header */}
      <section className="container mt-fluid-4xl mb-fluid-md">
        <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-4xl">
          <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
            PILLAR 03 // INNOVATE : SUBMIT YOUR IDEA
          </p>
          <h1 className="sr-only">
            Your Idea. Our Execution. Have an idea? Let&apos;s build it.
          </h1>
          <div
            aria-hidden="true"
            className="c-split-text anim-text-balance heading-xl text-[#101D35]"
          >
            Your Idea. Our Execution.
          </div>
          <p className="text-lg text-[#253B5B] max-w-2xl">
            Your idea doesn&apos;t have to stay an idea. Tell us what you&apos;re thinking : we evaluate feasibility, engineer the operational blueprint, and provide a{" "}
            <strong className="text-[#101D35]">
              free preliminary proposal or quotation
            </strong>
            .
          </p>
        </div>
      </section>

      {/* Section 2: Lightship specs.html 9:5 Visual + 4 Pattern-Background Telemetry Boxes */}
      <section className="container mt-fluid-lg mb-fluid-2xl flex flex-col gap-y-2">
        <div className="c-image aspect-ratio-[9/5] -rounded-md -lazy-load is-loaded relative overflow-hidden max-h-[520px]">
          <picture className="c-image_inner h-full w-full block">
            <img
              alt="ONSPEC Custom Venture Foundry & Proposal Engine"
              className="c-image_img is-loaded h-full w-full object-cover"
              height={1000}
              width={1800}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D35]/85 via-[#101D35]/30 to-transparent flex items-end p-6 md:p-12">
            <div className="max-w-2xl text-white">
              <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                CUSTOM CONCEPT EVALUATION &amp; BUILD ENGINE
              </span>
              <h2 className="heading-sm mt-2 text-white">
                Have an idea? Let&apos;s build it.
              </h2>
              <p className="text-sm text-[#A8B1BE] mt-2">
                Whether you have a rough concept on a napkin or a detailed commercial vision, Onspec bridges the gap between idea and functioning business.
              </p>
            </div>
          </div>
        </div>

        <ul className="grid xs:grid-cols-2 md:grid-cols-4 gap-2">
          <li className="bg-sand p-5 rounded-md flex flex-col justify-between gap-y-4 pattern-background min-h-[160px] border border-[#A8B1BE]/30">
            <span className="heading-2xs text-[#101D35]">Free Proposal</span>
            <span className="text-md text-[#253B5B]">
              01 // Preliminary Feasibility &amp; Cost Quotation
            </span>
          </li>
          <li className="bg-sand p-5 rounded-md flex flex-col justify-between gap-y-4 pattern-background min-h-[160px] border border-[#A8B1BE]/30">
            <span className="heading-2xs text-[#101D35]">48 to 72 hrs</span>
            <span className="text-md text-[#253B5B]">
              02 // Executive Assessment &amp; Architecture Review
            </span>
          </li>
          <li className="bg-sand p-5 rounded-md flex flex-col justify-between gap-y-4 pattern-background min-h-[160px] border border-[#A8B1BE]/30">
            <span className="heading-2xs text-[#101D35]">Turnkey Build</span>
            <span className="text-md text-[#253B5B]">
              03 // Hardware, Suppliers, AI Systems &amp; Launch
            </span>
          </li>
          <li className="bg-sand p-5 rounded-md flex flex-col justify-between gap-y-4 pattern-background min-h-[160px] border border-[#A8B1BE]/30">
            <span className="heading-2xs text-[#27B58A]">Cyprus &amp; EU</span>
            <span className="text-md text-[#253B5B]">
              04 // Independent Legal &amp; Corporate Network Ready
            </span>
          </li>
        </ul>
      </section>

      {/* Section 3: Lightship Two-Column Sticky Specification & Custom Proposal Configurator */}
      <section
        id="proposal-configurator"
        className="container my-fluid-2xl grid lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Sticky Visual Card with Live Spec Summary & Free Preliminary Proposal Guarantee */}
        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-area)+1.5rem)] space-y-4">
          <div className="rounded-[20px] bg-[#101D35] text-[#F7F8FA] p-7 md:p-8 border border-[#253B5B] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#A8B1BE]/20 pb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                LIVE PROPOSAL SPECIFICATION
              </span>
              <span className="font-mono text-xs text-[#A8B1BE]">
                OSP-INNOVATE-26
              </span>
            </div>

            <div>
              <p className="text-eyebrow text-[#A8B1BE] uppercase tracking-widest">
                SELECTED CONCEPT ARCHETYPE
              </p>
              <h2 className="heading-xs text-white mt-1">
                {selectedArchetype.title}
              </h2>
              <p className="text-xs text-[#A8B1BE] mt-2 leading-relaxed">
                {selectedArchetype.examples}
              </p>
            </div>

            {/* Live Configurator Telemetry Readout */}
            <div className="rounded-xl bg-[#253B5B]/45 border border-[#A8B1BE]/20 divide-y divide-[#A8B1BE]/15">
              <div className="flex items-center justify-between px-4 py-3 text-xs">
                <span className="font-mono uppercase text-[#A8B1BE]">
                  TARGET BUDGET
                </span>
                <span className="font-semibold text-white">{budget}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-xs">
                <span className="font-mono uppercase text-[#A8B1BE]">
                  DESIRED TIMEFRAME
                </span>
                <span className="font-semibold text-white">{timeframe}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-xs">
                <span className="font-mono uppercase text-[#A8B1BE]">
                  PRELIMINARY PROPOSAL
                </span>
                <span className="font-mono font-semibold text-[#27B58A]">
                  FREE QUOTATION
                </span>
              </div>
            </div>

            {/* Free Preliminary Proposal Guarantee Box */}
            <div className="rounded-xl bg-[#F7F8FA]/5 border border-[#27B58A]/40 p-5 space-y-2">
              <p className="font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                THE ONSPEC PROPOSAL GUARANTEE
              </p>
              <p className="text-xs text-[#F7F8FA]/90 leading-relaxed">
                Every idea submitted receives a structured review by our venture &amp; automation architects. We outline recommended hardware/software, operational steps, estimated costs, and realistic launch timelines before you commit capital.
              </p>
            </div>

            {/* Lightship .c-product-widget twin action cards inside sticky left column */}
            <div
              className="c-product-widget !grid-cols-1 sm:!grid-cols-2 !max-w-none"
              style={{ "--mask-progress": 1 } as React.CSSProperties}
            >
              <div className="c-product-widget_card -secondary">
                <p className="text-eyebrow">Prefer to talk live?</p>
                <div className="c-product-widget_content">
                  <p className="text-sm max-w-[12rem]">
                    Discuss your idea on WhatsApp
                  </p>
                  <a
                    aria-label="Talk with an expert"
                    className="c-button -icon -blur-light absolute-link c-product-widget_button"
                    href={BRAND_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="c-button_inner">
                      <span className="c-icon c-button_icon">
                        <svg
                          aria-hidden="true"
                          className="svg-arrow-right"
                          focusable="false"
                        >
                          <use href="/assets/svgs/sprite.svg#arrow-right" />
                        </svg>
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="c-product-widget_card -primary">
                <p className="text-eyebrow">Want a proven model?</p>
                <div className="c-product-widget_content">
                  <p className="text-sm max-w-[12rem]">
                    Browse 7 turnkey businesses
                  </p>
                  <Link
                    aria-label="Browse turnkey models"
                    className="c-button -icon -blur-dark absolute-link"
                    href="/launch"
                  >
                    <span className="c-button_inner">
                      <span className="c-icon c-button_icon">
                        <svg
                          aria-hidden="true"
                          className="svg-arrow-right"
                          focusable="false"
                        >
                          <use href="/assets/svgs/sprite.svg#arrow-right" />
                        </svg>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hairline-Divided Interactive Intake & Specification Configurator (1:1 specs.html) */}
        <div className="lg:col-span-7">
          {referenceId ? (
            <div className="bg-sand p-unit-md rounded-md border border-[#27B58A] space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#27B58A]/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#101D35]">
                <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                CONCEPT LOGGED FOR PRELIMINARY PROPOSAL
              </div>
              <h2 className="heading-md text-[#101D35]">
                Proposal Reference: {referenceId}
              </h2>
              <p className="text-md text-[#253B5B]">
                Thank you, <strong>{name}</strong>. Your concept under{" "}
                <strong>{selectedArchetype.title}</strong> has been transmitted to the Onspec Execution Desk. We are preparing your free preliminary proposal and feasibility breakdown and will deliver it to{" "}
                <strong>{email}</strong> and WhatsApp (
                <strong>{whatsapp}</strong>).
              </p>

              <div className="rounded-xl bg-white p-6 border border-[#A8B1BE]/40 space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-[#253B5B]">
                  SUBMITTED SPECIFICATION SUMMARY
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#253B5B]/70 block">ARCHETYPE</span>
                    <strong className="text-[#101D35]">
                      {selectedArchetype.title}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#253B5B]/70 block">BUDGET</span>
                    <strong className="text-[#101D35]">{budget}</strong>
                  </div>
                  <div>
                    <span className="text-[#253B5B]/70 block">TIMEFRAME</span>
                    <strong className="text-[#101D35]">{timeframe}</strong>
                  </div>
                  <div>
                    <span className="text-[#253B5B]/70 block">STATUS</span>
                    <strong className="text-[#27B58A]">
                      Stage 03 Assessment Queued
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setReferenceId(null);
                    setIdeaDescription("");
                    setGoals("");
                  }}
                  className="c-button -color-black cursor-pointer"
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Submit Another Concept"
                    >
                      <span className="c-button_label">
                        Submit Another Concept
                      </span>
                    </span>
                  </span>
                </button>
                <Link href="/launch" className="c-button -color-grey">
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Explore Ready Businesses Models"
                    >
                      <span className="c-button_label">
                        Explore Ready Businesses Models
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              {/* Step Block 1: Concept Archetype Selector */}
              <div className="bg-sand p-unit-md rounded-md flex flex-col gap-y-4 border border-[#A8B1BE]/30">
                <div className="flex items-center justify-between">
                  <h2 className="heading-xs text-[#101D35]">
                    01 // Concept Direction
                  </h2>
                  <span className="font-mono text-xs text-[#253B5B]">
                    STEP 1 OF 3
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {IDEA_ARCHETYPES.map((item) => {
                    const active = item.id === archetype;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setArchetype(item.id)}
                        className={`text-left rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          active
                            ? "bg-[#101D35] text-white border-[#27B58A] shadow-md"
                            : "bg-white text-[#101D35] border-[#A8B1BE]/45 hover:border-[#253B5B]"
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest ${
                            active ? "text-[#27B58A]" : "text-[#253B5B]"
                          }`}
                        >
                          {item.code}
                        </span>
                        <span className="text-sm font-bold">{item.title}</span>
                        <span
                          className={`text-xs ${
                            active ? "text-[#A8B1BE]" : "text-[#253B5B]/80"
                          }`}
                        >
                          {item.examples}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Block 2: Hairline-Divided Idea Specification Fields (1:1 specs.html rows) */}
              <div className="bg-sand p-unit-md rounded-md flex flex-col gap-y-4 border border-[#A8B1BE]/30">
                <div className="flex items-center justify-between">
                  <h2 className="heading-xs text-[#101D35]">
                    02 // Idea, Goals, Budget &amp; Timeframe
                  </h2>
                  <span className="font-mono text-xs text-[#253B5B]">
                    STEP 2 OF 3
                  </span>
                </div>

                <ul className="flex flex-col">
                  {/* Description of the idea */}
                  <li className="grid sm:grid-cols-12 gap-x-gutter gap-y-3 border-t border-grey py-6">
                    <div className="sm:col-span-4">
                      <span className="text-eyebrow text-[#101D35] block">
                        Description of the Idea *
                      </span>
                      <span className="text-xs text-[#253B5B] mt-1 block">
                        What is the business, product, or automated system you want to build?
                      </span>
                    </div>
                    <div className="sm:col-span-8">
                      <textarea
                        rows={4}
                        required
                        value={ideaDescription}
                        onChange={(e) => setIdeaDescription(e.target.value)}
                        placeholder="Describe your concept, target customers, preferred location in Cyprus or EU, and any equipment or software you envision..."
                        className="w-full rounded-2xl border border-[#A8B1BE]/60 bg-white px-4 py-3 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                  </li>

                  {/* Goals and expectations */}
                  <li className="grid sm:grid-cols-12 gap-x-gutter gap-y-3 border-t border-grey py-6">
                    <div className="sm:col-span-4">
                      <span className="text-eyebrow text-[#101D35] block">
                        Goals &amp; Expectations *
                      </span>
                      <span className="text-xs text-[#253B5B] mt-1 block">
                        What does a successful launch look like for you?
                      </span>
                    </div>
                    <div className="sm:col-span-8">
                      <textarea
                        rows={3}
                        required
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        placeholder="e.g. Passive/semi-automated monthly cashflow, turnkey location + hardware setup in Limassol, or full MVP + AI customer pipeline..."
                        className="w-full rounded-2xl border border-[#A8B1BE]/60 bg-white px-4 py-3 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                  </li>

                  {/* Budget (optional) */}
                  <li className="grid sm:grid-cols-12 gap-x-gutter gap-y-3 border-t border-grey py-6">
                    <div className="sm:col-span-4">
                      <span className="text-eyebrow text-[#101D35] block">
                        Estimated Budget (Optional)
                      </span>
                      <span className="text-xs text-[#253B5B] mt-1 block">
                        Helps us tailor hardware &amp; scale options.
                      </span>
                    </div>
                    <div className="sm:col-span-8 flex flex-wrap gap-2">
                      {BUDGET_TIERS.map((tier) => {
                        const active = budget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setBudget(tier)}
                            className={`rounded-full px-4 py-2 text-xs font-mono transition-colors cursor-pointer border ${
                              active
                                ? "bg-[#101D35] text-[#27B58A] border-[#101D35]"
                                : "bg-white text-[#101D35] border-[#A8B1BE]/50 hover:border-[#101D35]"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </li>

                  {/* Desired timeframe */}
                  <li className="grid sm:grid-cols-12 gap-x-gutter gap-y-3 border-t border-grey py-6">
                    <div className="sm:col-span-4">
                      <span className="text-eyebrow text-[#101D35] block">
                        Desired Timeframe *
                      </span>
                      <span className="text-xs text-[#253B5B] mt-1 block">
                        When would you like to deploy?
                      </span>
                    </div>
                    <div className="sm:col-span-8 flex flex-wrap gap-2">
                      {TIMEFRAME_OPTIONS.map((tf) => {
                        const active = timeframe === tf;
                        return (
                          <button
                            key={tf}
                            type="button"
                            onClick={() => setTimeframe(tf)}
                            className={`rounded-full px-4 py-2 text-xs font-mono transition-colors cursor-pointer border ${
                              active
                                ? "bg-[#27B58A] text-[#101D35] border-[#27B58A] font-semibold"
                                : "bg-white text-[#101D35] border-[#A8B1BE]/50 hover:border-[#101D35]"
                            }`}
                          >
                            {tf}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </div>

              {/* Step Block 3: Founder Contact Coordinates */}
              <div className="bg-sand p-unit-md rounded-md flex flex-col gap-y-4 border border-[#A8B1BE]/30">
                <div className="flex items-center justify-between">
                  <h2 className="heading-xs text-[#101D35]">
                    03 // Where Should We Send Your Free Proposal?
                  </h2>
                  <span className="font-mono text-xs text-[#253B5B]">
                    STEP 3 OF 3
                  </span>
                </div>

                <ul className="flex flex-col">
                  <li className="grid sm:grid-cols-2 gap-x-gutter gap-y-4 border-t border-grey py-6 items-center">
                    <label className="text-eyebrow text-[#101D35]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-5 py-3 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    />
                  </li>
                  <li className="grid sm:grid-cols-2 gap-x-gutter gap-y-4 border-t border-grey py-6 items-center">
                    <label className="text-eyebrow text-[#101D35]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.eu"
                      className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-5 py-3 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    />
                  </li>
                  <li className="grid sm:grid-cols-2 gap-x-gutter gap-y-4 border-t border-grey py-6 items-center">
                    <label className="text-eyebrow text-[#101D35]">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+357 99 000 000"
                      className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-5 py-3 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    />
                  </li>
                </ul>

                <div className="border-t border-grey pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#253B5B]">
                    Includes free preliminary proposal, architecture roadmap &amp; budgetary quotation.
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="c-button primary cursor-pointer w-full sm:w-auto"
                    style={{
                      backgroundColor: "#27B58A",
                      color: "#101D35",
                    }}
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label={
                          submitting
                            ? "Generating Proposal Request..."
                            : "Request Free Preliminary Proposal"
                        }
                      >
                        <span className="c-button_label font-semibold">
                          {submitting
                            ? "Generating Proposal Request..."
                            : "Request Free Preliminary Proposal"}
                        </span>
                      </span>
                      <span className="c-icon c-button_icon">
                        <svg
                          aria-hidden="true"
                          className="svg-arrow-right"
                          focusable="false"
                        >
                          <use href="/assets/svgs/sprite.svg#arrow-right" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Section 4: Lightship specs.html Main Specs Hairline Tables */}
      <section className="container my-fluid-2xl flex flex-col gap-y-8">
        <h2 className="heading-md text-[#101D35]">
          Execution &amp; Proposal Specifications
        </h2>
        <div className="flex flex-col gap-y-2">
          {FOUNDRY_SPECS.map((group) => (
            <div
              key={group.groupTitle}
              className="bg-sand p-unit-md rounded-md flex flex-col gap-y-4 border border-[#A8B1BE]/25"
            >
              <h3 className="heading-xs text-[#101D35]">{group.groupTitle}</h3>
              <ul className="flex flex-col">
                {group.rows.map((row) => (
                  <li
                    key={row.label}
                    className="grid sm:grid-cols-2 gap-x-gutter gap-y-4 border-t border-grey py-6"
                  >
                    <span className="text-eyebrow text-[#253B5B]">
                      {row.label}
                    </span>
                    <span className="text-md text-[#101D35] font-medium">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Lightship specs.html 2-Column Upgrade Options Grid (Six Step Customer Journey) */}
      <section className="container my-fluid-2xl flex flex-col gap-y-8">
        <h2 className="heading-md text-[#101D35]">
          How Your Idea Becomes a Business (6-Stage Protocol)
        </h2>
        <div className="grid md:grid-cols-2 gap-gutter">
          {CUSTOMER_JOURNEY_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-sand p-unit-md rounded-md flex flex-col gap-y-4 border border-[#A8B1BE]/25"
            >
              <div className="flex items-center justify-between">
                <h3 className="heading-2xs text-[#101D35]">
                  {step.number}. {step.title}
                </h3>
                <span className="font-mono text-xs text-[#27B58A]">
                  {step.code}
                </span>
              </div>
              <ul className="flex flex-col">
                <li className="grid sm:grid-cols-2 gap-x-gutter gap-y-4 border-t border-grey py-5">
                  <span className="text-eyebrow text-[#253B5B]">What Happens</span>
                  <span className="text-md text-[#101D35]">
                    {step.description}
                  </span>
                </li>
                <li className="grid sm:grid-cols-2 gap-x-gutter gap-y-4 border-t border-grey py-5">
                  <span className="text-eyebrow text-[#253B5B]">Deliverable</span>
                  <span className="text-md text-[#27B58A] font-semibold">
                    {step.deliverable}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Lightship specs.html Bottom Abstract Mask with .c-product-widget */}
      <div
        className="c-abstract-mask"
        style={{ "--mask-progress": 1 } as React.CSSProperties}
      >
        <div className="c-abstract-mask_inner">
          <div className="c-abstract-mask_background">
            <div className="c-image -cover -overlay -lazy-load is-loaded h-full w-full">
              <picture className="c-image_inner h-full w-full block">
                <img
                  alt="Build your venture with ONSPEC"
                  className="c-image_img is-loaded h-full w-full object-cover"
                  height={1333}
                  width={2000}
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                />
              </picture>
            </div>
          </div>
          <div className="c-abstract-mask_content">
            <div className="flex flex-col items-center justify-end h-full p-(--grid-margin-xl)">
              <h2 className="sr-only">Make it yours</h2>
              <div className="absolute inset-0 pt-fluid-2xl flex-1 z-below flex items-start justify-center">
                <div
                  aria-hidden="true"
                  className="heading-3xl md:heading-4xl text-center text-white"
                >
                  Build it yours
                </div>
              </div>
              <div
                className="c-product-widget"
                style={{ "--mask-progress": 1 } as React.CSSProperties}
              >
                <div className="c-product-widget_card -secondary">
                  <p className="text-eyebrow">Talk with an expert</p>
                  <div className="c-product-widget_content">
                    <p className="text-lg max-w-[15rem]">
                      Get your concept questions answered
                    </p>
                    <Link
                      aria-label="Talk with an expert"
                      className="c-button -icon -blur-light absolute-link c-product-widget_button"
                      href="/contact"
                    >
                      <span className="c-button_inner">
                        <span className="c-icon c-button_icon">
                          <svg
                            aria-hidden="true"
                            className="svg-arrow-right"
                            focusable="false"
                          >
                            <use href="/assets/svgs/sprite.svg#arrow-right" />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="c-product-widget_card -primary">
                  <p className="text-eyebrow">Ready Businesses</p>
                  <div className="c-product-widget_content">
                    <p className="text-lg max-w-[15rem]">
                      Explore 7 proven turnkey business models
                    </p>
                    <Link
                      aria-label="Explore turnkey models"
                      className="c-button -icon -blur-dark absolute-link"
                      href="/launch"
                    >
                      <span className="c-button_inner">
                        <span className="c-icon c-button_icon">
                          <svg
                            aria-hidden="true"
                            className="svg-arrow-right"
                            focusable="false"
                          >
                            <use href="/assets/svgs/sprite.svg#arrow-right" />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
