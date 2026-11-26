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
    code: "PRACTICE 01 // WEB-ENGINEERING",
    tagline: "FLAGSHIP ENGINEERING",
    title: "High-Converting Web Development",
    subtitle: "Engineered for Measurable Growth & Sub-Second Speed",
    description:
      "Most agency websites are pretty but slow and fail to convert. We architect sub-second, visually stunning digital platforms from scratch using Next.js App Router, Tailwind CSS, and behavioral conversion psychology with guaranteed 95+ Core Web Vitals.",
    capabilities: [
      {
        title: "High-Converting Landing Pages",
        description:
          "Engineered specifically for paid traffic, product launches, and SaaS lead generation with single-minded focus on visitor conversion.",
      },
      {
        title: "Full Website Rebuilds & Redesigns",
        description:
          "Transform outdated, sluggish sites into sleek, modern, authoritative digital experiences that establish instant credibility.",
      },
      {
        title: "Custom Web Applications & Portals",
        description:
          "Full-stack React and Next.js applications featuring user authentication, Supabase backends, and dedicated customer dashboards.",
      },
      {
        title: "Stripe E-Commerce & Subscriptions",
        description:
          "Custom checkout flows, customer billing portals, webhook synchronization, and automated invoice delivery with 100% reliability.",
      },
      {
        title: "Mobile Ergonomics & Touch Perfection",
        description:
          "Flawless mobile viewports with verified 48×48px tap boundaries, zero layout shift (CLS), and thumb-friendly navigation.",
      },
      {
        title: "95+ Core Web Vitals & Technical SEO",
        description:
          "Sub-second load times, automatic image optimization, Schema.org JSON-LD structured data, and semantic HTML for Google and AI search engines.",
      },
    ],
    metrics: [
      { label: "Core Web Vitals", value: "95+" },
      { label: "First Contentful Paint", value: "<1.0s" },
      { label: "Sprint Turnaround", value: "2 Weeks" },
      { label: "Payment & Security", value: "100% Stripe" },
    ],
    timeline: "2-Week Rapid Sprint Turnaround",
    sla: "Edge Deployment & 95+ Guarantee",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    anchorId: "web-development",
  },
  {
    code: "PRACTICE 02 // AUTONOMOUS-AI",
    tagline: "AUTONOMOUS SYSTEMS",
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
        title: "Intelligent WhatsApp & Telegram Concierge",
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
    code: "PRACTICE 03 // DIAGNOSTICS-CRO",
    tagline: "DIAGNOSTIC PRACTICE",
    title: "Professional Website Diagnostics & CRO Teardowns",
    subtitle: "Uncovering Hidden Conversion Leaks with Exact Code Patches",
    description:
      "Generic automated bot crawlers spit out generic warnings and leave you stranded. We deliver rigorous, senior-engineer manual and programmatic teardowns — identifying conversion leaks, mobile UX friction, and Core Web Vitals issues with exact production-ready CSS, Next.js, and HTML code patches.",
    capabilities: [
      {
        title: "Production-Ready Code Patches",
        description:
          "We don't give generic advice like 'compress images'. We provide ready-to-merge CSS rules, Next.js image configurations, and HTML markup patches tailored to your exact stack.",
      },
      {
        title: "Conversion Psychology Teardown",
        description:
          "A granular screen-by-screen breakdown of visitor hesitation points, cognitive friction in your copy, visual hierarchy gaps, and CTA positioning flaws.",
      },
      {
        title: "Mobile Touch & Ergonomics Audit",
        description:
          "Detailed viewport inspection across iOS and Android devices, ensuring 48×48px tap targets, zero horizontal overflow, and thumb-friendly checkout funnels.",
      },
      {
        title: "Senior Engineer Video Walkthrough",
        description:
          "A 15-minute personalized Loom recording where our lead engineer steps through your live website, demonstrating bottlenecks and explaining recommended fixes.",
      },
      {
        title: "1-on-1 Strategy & Implementation Call",
        description:
          "A direct 30-minute debrief call via Google Meet or WhatsApp with our senior engineer to review findings, prioritize fixes, or plan full studio execution.",
      },
      {
        title: "Zero Backend Passwords Needed",
        description:
          "We inspect publicly accessible HTML assets and client specifications only. Zero server logins, database keys, or repository access required.",
      },
    ],
    metrics: [
      { label: "Delivery SLA", value: "48 Hours" },
      { label: "Backend Access Needed", value: "Zero" },
      { label: "Actionable Deliverable", value: "Exact Code" },
      { label: "Strategy Call", value: "1-on-1 30m" },
    ],
    timeline: "48-Hour Delivery Guarantee",
    sla: "Ready-to-Merge Production Patches",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    anchorId: "diagnostics",
  },
];

export default function AiWebPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [projectType, setProjectType] = useState("High-Converting Web Development Sprint");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "02_AUTOMATE",
      name: name.trim() || "Studio Project Lead",
      email: email.trim(),
      whatsapp: whatsapp.trim() || undefined,
      message: `[Studio Practice: ${projectType}] [URL: ${websiteUrl || "N/A"}] ${details}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-white text-black">
      {/* Editorial Header */}
      <section className="container px-4 sm:px-6 pt-[16svh] md:pt-[22svh] pb-12 md:pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/20 bg-neutral-100 font-mono text-[11px] font-semibold uppercase tracking-widest text-black mb-5">
          <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
          FULL-STACK WEB PLATFORMS, AUTONOMOUS AI &amp; DIAGNOSTICS
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black mb-6 leading-[1.12]">
          We Diagnose Websites to Turn Them into High-Performing Growth Engines, Architect High-Velocity Web Platforms, and Automate Complex Workflows.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Onspec is an elite digital engineering practice. We diagnose digital bottlenecks, engineer sub-second Next.js web applications, and deploy autonomous 24/7 AI pipelines to maximize conversions and operational scale.
        </p>

        {/* Live Studio Telemetry Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-neutral-700">
          <span className="bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-full font-bold text-black">
            LCP &lt;1.0s
          </span>
          <span className="bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-full font-semibold">
            95+ Core Web Vitals
          </span>
          <span className="bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-full font-semibold">
            2-Week Sprints
          </span>
          <span className="bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-full font-semibold">
            24/7 AI Concierges
          </span>
          <span className="bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-full font-semibold">
            48h Diagnostics SLA
          </span>
        </div>

        {/* Action Triggers */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#project-brief"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
          >
            Submit Project Brief &rarr;
          </a>
          <a
            href="#web-development"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-neutral-100 transition-colors"
          >
            Explore Studio Practices
          </a>
        </div>
      </section>

      {/* 3 Dedicated Studio Practices */}
      <section className="container px-4 sm:px-6 pb-20 md:pb-28 max-w-5xl mx-auto space-y-20 md:space-y-28">
        {AUDITFLOW_PRACTICES.map((practice, pIdx) => (
          <article
            key={practice.code}
            id={practice.anchorId}
            className="border border-[#D5DBE3] rounded-3xl p-6 sm:p-8 md:p-12 bg-[#F7F8FA] transition-all hover:border-black/60 hover:shadow-xl scroll-mt-24"
          >
            {/* Header Eyebrow & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D5DBE3]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-black/10 px-3 py-1 rounded-md">
                  {practice.code}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                  {practice.tagline}
                </span>
              </div>
              <span className="font-mono text-xs text-neutral-600 bg-white border border-neutral-200 px-3 py-1 rounded-full">
                {practice.sla}
              </span>
            </div>

            {/* Title & Core Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-3 tracking-tight">
                  {practice.title}
                </h2>
                <p className="text-sm font-mono uppercase text-black font-semibold mb-4">
                  {practice.subtitle}
                </p>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6">
                  {practice.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {practice.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-neutral-200 bg-white p-3 text-center"
                    >
                      <span className="block text-lg font-mono font-extrabold text-black">
                        {m.value}
                      </span>
                      <span className="block text-[11px] font-mono uppercase text-neutral-500 mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Visual */}
              <div className="lg:col-span-5 h-64 lg:h-80 rounded-2xl overflow-hidden border border-[#D5DBE3] relative">
                <img
                  src={practice.image}
                  alt={practice.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/80 block">
                    {practice.timeline}
                  </span>
                  <span className="text-xs font-semibold">
                    Fixed-Scope Sprints &bull; Zero Retainer Lock-in
                  </span>
                </div>
              </div>
            </div>

            {/* Granular Capabilities 6-Grid */}
            <div className="border-t border-[#D5DBE3] pt-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6 font-bold">
                CORE PRACTICE CAPABILITIES &amp; DELIVERABLES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {practice.capabilities.map((cap, cIdx) => (
                  <div
                    key={cap.title}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-2 hover:border-black/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 font-semibold">
                      <span>0{cIdx + 1}</span>
                      <span>//</span>
                    </div>
                    <h4 className="text-sm font-bold text-black leading-snug">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Practice Action */}
            <div className="mt-8 pt-6 border-t border-[#D5DBE3] flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-xs text-neutral-600">
                Turnaround: <strong className="text-black font-bold">{practice.timeline}</strong>
              </span>
              <a
                href="#project-brief"
                onClick={() => setProjectType(practice.title)}
                className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Request {practice.title.split(" ")[0]} Brief &rarr;
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Security & Confidentiality Standard (Exact AuditFlow Policy) */}
      <section className="container px-4 sm:px-6 pb-16 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-neutral-300 bg-[#F7F8FA] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-black font-bold">
              STUDIO CONFIDENTIALITY &amp; ZERO-CREDENTIAL SECURITY PROTOCOL
            </span>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Diagnostics and project briefs evaluate publicly accessible web assets and client-provided specifications only. We do not require internal credentials, server logins, or hosting passwords. All client briefs and completed deliverables are governed by our mutual non-disclosure standard.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-black bg-white border border-neutral-200 px-3 py-1.5 rounded-full">
              100% NDA Standard
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Project Brief Consultation Form */}
      <section id="project-brief" className="container px-4 sm:px-6 pb-20 max-w-3xl mx-auto scroll-mt-24">
        <div className="border border-neutral-300 rounded-3xl p-6 sm:p-10 md:p-12 bg-white shadow-sm">
          <div className="text-center mb-8 border-b border-neutral-200 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-black font-semibold block mb-2">
              DIRECT STUDIO INTAKE DESK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Submit Your Project Brief
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg mx-auto">
              Tell us your objectives. We review technical requirements and deliver a transparent fixed-scope sprint quote or diagnostic schedule within 4 hours.
            </p>
          </div>

          {referenceId ? (
            <div className="rounded-2xl bg-neutral-50 border border-black p-8 text-center space-y-4">
              <span className="inline-block h-3 w-3 rounded-full bg-black animate-ping" />
              <h3 className="text-xl font-bold text-black">
                Project Brief Received
              </h3>
              <p className="text-xs font-mono text-neutral-600">
                Reference ID: <strong className="text-black font-bold">{referenceId}</strong>
              </p>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Our lead digital engineer will evaluate your requirements and reach out via WhatsApp or email with a structured scope and timeline.
              </p>
              <button
                type="button"
                onClick={() => setReferenceId(null)}
                className="mt-4 inline-flex items-center rounded-full bg-black px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Submit Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                  Target Studio Practice *
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#F7F8FA] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black font-medium"
                >
                  <option value="High-Converting Web Development Sprint">
                    High-Converting Web Development Sprint (2-Week Turnaround)
                  </option>
                  <option value="Autonomous AI & WhatsApp Concierge">
                    Autonomous AI &amp; WhatsApp Concierge (24/7 Ops)
                  </option>
                  <option value="Professional Website Diagnostics & CRO (48h SLA)">
                    Professional Website Diagnostics &amp; CRO (48h SLA)
                  </option>
                  <option value="Full Studio Engineering Package">
                    Full Studio Engineering Package (Web + AI + Diagnostics)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First & Last Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F7F8FA] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F8FA] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+357..."
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-[#F7F8FA] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                    Live Website / Project URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-[#F7F8FA] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                  Project Scope &amp; Conversion Objectives
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your current bottleneck, desired features, or key timeline goals..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-[#F7F8FA] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white font-mono font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {submitting ? "Transmitting Project Brief..." : "Submit Project Brief & Receive Proposal &rarr;"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Powered by AuditFlow Badge — Displayed Exclusively on this Page */}
      <section className="border-t border-black/15 pt-16 pb-14 bg-white text-center">
        <div className="container px-4 sm:px-6 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/25 bg-[#F7F8FA] shadow-xs">
            <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
              POWERED BY AUDITFLOW
            </span>
            <span className="font-mono text-[10px] uppercase text-neutral-500 border-l border-neutral-300 pl-3 hidden sm:inline">
              AUDITFLOW.INK
            </span>
          </div>
          <p className="text-xs font-mono text-neutral-600 mt-4 max-w-lg mx-auto leading-relaxed">
            Full-stack Next.js web platforms, autonomous AI agent pipelines, and senior-engineer website diagnostics engineered in direct studio partnership with AuditFlow (VISION CRAFT VC CY LTD).
          </p>
        </div>
      </section>
    </main>
  );
}
