"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

interface PracticeCapability {
  code: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
  timeline: string;
  sla: string;
  image: string;
  anchorId: string;
}

const AUDITFLOW_PRACTICES: PracticeCapability[] = [
  {
    code: "PRACTICE 01 // AUTONOMOUS-AI",
    tagline: "AUTONOMOUS SYSTEMS (DEFAULT)",
    title: "Autonomous AI & Workflow Automations",
    subtitle: "Engineered to Eliminate Operational Friction",
    description:
      "Stop burning human capital on manual copy-pasting, repetitive customer inquiries, and disjointed software. We build bespoke, self-orchestrating AI agents and automated pipelines that run silently 24/7 with strict deterministic validation schemas and zero hallucinations.",
    capabilities: [
      {
        title: "Inbound Lead Qualification & Auto-Routing",
        description:
          "Instantly enrich incoming inquiries, analyze purchase intent using advanced LLM reasoning, and route qualified enterprise buyers directly to your calendar in under 60 seconds.",
      },
      {
        title: "Intelligent Conversational Concierge",
        description:
          "Custom conversational agents connected to your product catalog, real-time inventory, and scheduling APIs. Answers customer queries and closes sales 24/7 in fluent natural language.",
      },
      {
        title: "Multi-App Workflow Orchestration",
        description:
          "Resilient, event-driven pipelines syncing HubSpot, Airtable, Stripe, Supabase, Notion, and internal REST APIs with zero data loss and automated error recovery.",
      },
      {
        title: "Document Intelligence & OCR Extraction",
        description:
          "Autonomous processing of complex PDFs, supplier invoices, legal agreements, and receipts. Converts unstructured data into clean, typed JSON inserted directly into your database.",
      },
      {
        title: "Private RAG & Enterprise Knowledge Bases",
        description:
          "Vector-indexed semantic retrieval engines that allow your support team or customers to query internal SOPs, product documentation, and case archives with zero hallucinations.",
      },
      {
        title: "Automated Data Scraping & Web Monitors",
        description:
          "Custom scheduled headless crawlers that track competitor pricing changes, regulatory shifts, real estate listings, and market data feeds delivered straight to your Slack or dashboard.",
      },
    ],
    metrics: [
      { label: "Autonomous Runtime", value: "24/7/365" },
      { label: "Agent Response Time", value: "<3.0s" },
      { label: "Deterministic Guardrails", value: "100%" },
      { label: "Manual Data Entry", value: "Zero" },
    ],
    timeline: "1 to 3 Weeks to Live Integration",
    sla: "Zero-Downtime Serverless Webhooks",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    anchorId: "ai-automations",
  },
  {
    code: "PRACTICE 02 // WEB-ENGINEERING-CRO",
    tagline: "FLAGSHIP WEB & CRO DIAGNOSTICS",
    title: "High-Converting Web Platforms & Website Diagnostics",
    subtitle: "Sub-Second Next.js Architecture, CRO Diagnostics & Exact Code Patches",
    description:
      "Most agency websites are pretty but slow and fail to convert. We architect sub-second, visually stunning digital platforms from scratch using Next.js App Router and Stripe, and deliver rigorous senior-engineer teardowns with ready-to-merge code patches to eliminate conversion leaks and guarantee 95+ Core Web Vitals.",
    capabilities: [
      {
        title: "High-Converting Next.js Web Platforms",
        description:
          "Architected from scratch using Next.js App Router, Tailwind CSS, and behavioral conversion psychology with sub-second page loads and zero layout shift.",
      },
      {
        title: "Professional Website Diagnostics & CRO Teardowns",
        description:
          "Granular screen-by-screen breakdown of visitor hesitation points, cognitive friction in your copy, visual hierarchy gaps, and CTA positioning flaws.",
      },
      {
        title: "Production-Ready Code Patches",
        description:
          "We don't give generic advice like 'compress images'. We provide ready-to-merge CSS rules, Next.js image configurations, and HTML markup patches tailored to your stack.",
      },
      {
        title: "Custom Web Applications & Portals",
        description:
          "Full-stack React and Next.js applications featuring user authentication, Supabase backends, and dedicated customer dashboards.",
      },
      {
        title: "Stripe E-Commerce & Automated Subscriptions",
        description:
          "Custom checkout flows, customer billing portals, webhook synchronization, and automated invoice delivery with 100% reliability.",
      },
      {
        title: "15-Minute Senior Engineer Loom Walkthrough & Debrief",
        description:
          "Personalized video walkthrough by our lead engineer walking step-by-step through every critical finding, followed by a direct 30-minute debrief call.",
      },
    ],
    metrics: [
      { label: "Core Web Vitals", value: "95+" },
      { label: "First Contentful Paint", value: "<1.0s" },
      { label: "Diagnostics SLA", value: "48 Hours" },
      { label: "Payment & Security", value: "100% Stripe" },
    ],
    timeline: "2-Week Sprints / 48h Diagnostics",
    sla: "Edge Deployment & 95+ Guarantee",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    anchorId: "web-diagnostics",
  },
];

export default function AiWebPage() {
  // Autonomous AI is index 0 and active by default
  const [activePracticeIndex, setActivePracticeIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [projectType, setProjectType] = useState(AUDITFLOW_PRACTICES[0].title);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "02_AUTOMATE",
      name,
      email,
      whatsapp: phone.trim() || undefined,
      companyName: website.trim() || undefined,
      message: `[Project Type: ${projectType}] ${message}`,
      targetUrl: website.trim() || undefined,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  const currentPractice = AUDITFLOW_PRACTICES[activePracticeIndex];

  return (
    <main className="bg-white text-black min-h-screen">
      {/* Editorial Studio Hero Header */}
      <section className="container px-4 sm:px-6 pt-[14svh] md:pt-[18svh] pb-10 text-center max-w-4xl mx-auto scroll-reveal">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-black mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
          DIGITAL ENGINEERING STUDIO &bull; AUDITFLOW CAPABILITIES
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black mb-4 leading-tight">
          Autonomous AI &amp; High-Converting Web Platforms.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          We architect sub-second Next.js web applications, deploy autonomous 24/7 AI pipelines, and deliver rigorous senior-engineer website diagnostics with ready-to-merge code patches.
        </p>

        {/* Live Studio Telemetry Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-700">
          <span className="bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full font-bold text-black">
            24/7 Autonomous AI
          </span>
          <span className="bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full font-semibold">
            LCP &lt;1.0s
          </span>
          <span className="bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full font-semibold">
            95+ Core Web Vitals
          </span>
          <span className="bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full font-semibold">
            2-Week Sprints
          </span>
          <span className="bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full font-semibold">
            48h Diagnostics SLA
          </span>
        </div>

        {/* Action Triggers */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#project-brief"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs hover-lift"
          >
            Submit Project Brief →
          </a>
          <a
            href="#practices-section"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-neutral-100 transition-colors hover-lift"
          >
            Explore Practices
          </a>
        </div>
      </section>

      {/* Streamlined Practice Showcase (Tabs + Compact Editorial Presentation) */}
      <section
        id="practices-section"
        className="container px-4 sm:px-6 pb-16 md:pb-24 max-w-5xl mx-auto scroll-mt-24 scroll-reveal"
      >
        {/* Sleek Practice Tabs Switcher: 01 Autonomous AI (Default) & 02 Web & Diagnostics */}
        <div className="flex justify-center mb-8 border-b border-neutral-200 pb-4 overflow-x-auto">
          <div className="inline-flex p-1 rounded-full bg-neutral-100 border border-neutral-200">
            {AUDITFLOW_PRACTICES.map((practice, idx) => {
              const active = idx === activePracticeIndex;
              const shortLabels = [
                "01 // Autonomous AI & Workflows (Default)",
                "02 // Web Engineering & Diagnostics",
              ];
              return (
                <button
                  key={practice.code}
                  type="button"
                  onClick={() => setActivePracticeIndex(idx)}
                  className={`rounded-full px-4 sm:px-6 py-2.5 text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? "bg-black text-white shadow-xs"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {shortLabels[idx] || practice.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Practice Editorial Layout */}
        <article
          key={currentPractice.code}
          className="border border-neutral-300 rounded-2xl p-6 sm:p-8 md:p-10 bg-white shadow-xs transition-all duration-300 animate-fadeIn"
        >
          {/* Header Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                {currentPractice.code}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                {currentPractice.tagline}
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-600 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded-full">
              {currentPractice.sla}
            </span>
          </div>

          {/* Title & Core Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-2 tracking-tight">
                {currentPractice.title}
              </h2>
              <p className="text-xs font-mono uppercase text-black font-semibold mb-3">
                {currentPractice.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                {currentPractice.description}
              </p>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {currentPractice.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-2.5 text-center"
                  >
                    <span className="block text-base sm:text-lg font-mono font-extrabold text-black">
                      {m.value}
                    </span>
                    <span className="block text-[10px] font-mono uppercase text-neutral-500 mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Media Preview */}
            <div className="lg:col-span-5 h-52 lg:h-64 rounded-xl overflow-hidden border border-neutral-200 relative bg-neutral-900 hover-lift">
              <img
                src={currentPractice.image}
                alt={currentPractice.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 block">
                  {currentPractice.timeline}
                </span>
                <span className="text-xs font-semibold">
                  Fixed-Scope Sprints &bull; Transparent Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Granular Capabilities (Clean Hairline Grid - Zero Bulky Boxes) */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 font-bold">
              CORE PRACTICE CAPABILITIES &amp; DELIVERABLES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPractice.capabilities.map((cap, cIdx) => (
                <div
                  key={cap.title}
                  className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/40 hover:border-black/40 hover:bg-white transition-all space-y-1.5 hover-lift"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 font-semibold">
                    <span>0{cIdx + 1}</span>
                    <span>//</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-black leading-snug">
                    {cap.title}
                  </h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Practice Action */}
          <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-neutral-600">
              Turnaround: <strong className="text-black font-bold">{currentPractice.timeline}</strong>
            </span>
            <a
              href="#project-brief"
              onClick={() => setProjectType(currentPractice.title)}
              className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer hover-lift"
            >
              Request {currentPractice.title.split(" ")[0]} Brief →
            </a>
          </div>
        </article>
      </section>

      {/* Studio Confidentiality Standard */}
      <section className="container px-4 sm:px-6 pb-12 max-w-5xl mx-auto scroll-reveal">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover-lift">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-black font-bold">
              STUDIO CONFIDENTIALITY &amp; ZERO-CREDENTIAL SECURITY PROTOCOL
            </span>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Diagnostics and project briefs evaluate publicly accessible web assets and client-provided specifications only. We do not require internal credentials, server logins, or hosting passwords. All client briefs and completed deliverables are governed by our mutual non-disclosure standard.
            </p>
          </div>
          <div className="shrink-0">
            <span className="font-mono text-xs font-bold text-black bg-white border border-neutral-300 px-3.5 py-1.5 rounded-full shadow-2xs">
              100% NDA Standard
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Project Brief Consultation Form */}
      <section id="project-brief" className="container px-4 sm:px-6 pb-16 max-w-3xl mx-auto scroll-mt-24 scroll-reveal">
        <div className="border border-neutral-300 rounded-2xl p-6 sm:p-8 bg-white shadow-xs">
          <div className="text-center mb-6 border-b border-neutral-200 pb-5">
            <span className="font-mono text-xs uppercase tracking-widest text-black font-semibold block mb-1">
              DIRECT STUDIO INTAKE DESK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Submit Your Project Brief
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-lg mx-auto">
              Tell us your objectives. We review technical requirements and deliver a transparent fixed-scope sprint quote or diagnostic schedule within 4 hours.
            </p>
          </div>

          {referenceId ? (
            <div className="rounded-2xl bg-neutral-50 border border-black p-8 text-center space-y-4">
              <span className="inline-block h-3 w-3 rounded-full bg-black animate-ping" />
              <h3 className="text-xl font-bold text-black">
                Project Brief Received
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                Reference ID: <strong className="font-mono text-black">{referenceId}</strong>.
                Our lead digital engineer will evaluate your requirements and reach out via email or phone with a structured scope and timeline.
              </p>
              <button
                type="button"
                onClick={() => setReferenceId(null)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Submit Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-2">
                  01 // Select Practice *
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs font-mono text-black focus:border-black focus:bg-white focus:outline-hidden transition-colors"
                >
                  <option value="Autonomous AI & Workflow Automations">
                    Autonomous AI &amp; Workflow Automations (24/7 Ops) [Default]
                  </option>
                  <option value="High-Converting Web Platforms & Website Diagnostics">
                    High-Converting Web Platforms &amp; Diagnostics (Next.js &amp; Code Patches)
                  </option>
                  <option value="Full Studio Sprint (Web + AI + Diagnostics)">
                    Full Studio Sprint (Web + AI + Diagnostics)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:bg-white focus:outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:bg-white focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Phone / Contact Desk
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+357..."
                    className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:bg-white focus:outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Website URL (If evaluating existing site)
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs text-black focus:border-black focus:bg-white focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1">
                  Project Brief &amp; Target Objectives *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your objectives, current conversion bottlenecks, or what you want automated..."
                  className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 p-3 text-xs text-black focus:border-black focus:bg-white focus:outline-hidden transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-black py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer shadow-xs hover-lift"
              >
                {submitting ? "Submitting Brief..." : "Submit Project Brief →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Powered by AuditFlow Footer Attribution */}
      <footer className="border-t border-neutral-200 py-8 bg-neutral-50 text-center">
        <div className="container px-4 mx-auto space-y-2">
          <p className="font-mono text-xs text-neutral-600 uppercase tracking-widest">
            ONSPEC DIGITAL STUDIO &bull; POWERED BY{" "}
            <a
              href="https://www.auditflow.ink"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-black underline underline-offset-4 hover:text-neutral-700 transition-colors"
            >
              AUDITFLOW
            </a>
          </p>
          <p className="text-[11px] text-neutral-500 font-mono">
            Next.js Engineering &bull; Autonomous AI &bull; Conversion Diagnostics
          </p>
        </div>
      </footer>
    </main>
  );
}
