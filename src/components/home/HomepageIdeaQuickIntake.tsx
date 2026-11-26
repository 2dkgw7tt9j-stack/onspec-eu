"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileSearch,
  Compass,
  Rocket,
} from "lucide-react";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const BUDGET_TIERS = [
  "Flexible / Need Quotation",
  "< €10,000",
  "€10,000 to €25,000",
  "€25,000 to €50,000",
  "€50,000 to €100,000+",
];

const TIMEFRAME_OPTIONS = [
  "Immediate / < 30 Days",
  "1 to 3 Months",
  "3 to 6 Months",
  "Exploratory / Feasibility Stage",
];

export function HomepageIdeaQuickIntake() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [budget, setBudget] = useState(BUDGET_TIERS[0]);
  const [goals, setGoals] = useState("");
  const [timeframe, setTimeframe] = useState(TIMEFRAME_OPTIONS[1]);
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "03_INNOVATE",
      name,
      email,
      whatsapp,
      ideaDescription,
      budget,
      goals,
      timeframe,
      message: `Homepage Idea Intake : Timeframe: ${timeframe}, Budget: ${budget}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <section
      id="submit-your-idea"
      className="relative border-b border-[#A8B1BE]/35 stripe-mesh-light py-24 text-black"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Editorial Narrative & How Idea Evaluation Works */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/50 bg-white px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-black" />
              <span className="font-mono text-xs uppercase tracking-widest text-black">
                SECTION 07 // PILLAR 03 : SUBMIT YOUR IDEA
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl">
              Have an idea? Let&rsquo;s build it.
            </h2>

            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-black">
              &ldquo;Your idea doesn&rsquo;t have to stay an idea.&rdquo;
            </p>

            <p className="text-base leading-relaxed text-neutral-600">
              Many people have strong business ideas, software concepts, or
              physical venture plans, but don&rsquo;t know how to source the
              hardware, build the digital systems, structure the company in
              Cyprus, or bring everything together. Tell us what you are
              thinking, and Onspec will evaluate it and prepare a{" "}
              <strong className="text-black">
                free preliminary proposal or quotation
              </strong>
              .
            </p>

            {/* 3-Step Idea-to-Proposal Flow */}
            <div className="space-y-3 pt-2">
              <div className="rounded-xl border border-[#A8B1BE]/40 bg-white p-4 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                    <FileSearch className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold">
                      01 // CONFIDENTIAL CONCEPT REVIEW
                    </p>
                    <h3 className="text-sm font-bold text-black">
                      We assess feasibility & technical requirements
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                      Our team reviews your concept, operational scope, hardware
                      or software requirements, and budget parameters.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#A8B1BE]/40 bg-white p-4 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold">
                      02 // FREE PRELIMINARY PROPOSAL & QUOTATION
                    </p>
                    <h3 className="text-sm font-bold text-black">
                      Potential solutions, estimated costs & next steps
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                      You receive a clear breakdown of recommended architecture,
                      estimated investment range, and realistic launch timeline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#A8B1BE]/40 bg-white p-4 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                    <Rocket className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold">
                      03 // TURNKEY EXECUTION & LAUNCH
                    </p>
                    <h3 className="text-sm font-bold text-black">
                      We source, build, automate & coordinate launch
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                      From vendor procurement and AI development to Cyprus legal
                      coordination, Onspec turns your blueprint into reality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black hover:text-neutral-500 transition-colors"
              >
                <span>OPEN DEDICATED SERVICES & IDEA WORKSPACE</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-600" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Intake Form */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[#A8B1BE]/45 bg-white shadow-xl">
              {/* Top Spec Header */}
              <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 bg-black px-6 py-4 text-[#F7F8FA]">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F7F8FA]">
                    IDEA INTAKE ENGINE // FREE PRELIMINARY PROPOSAL
                  </span>
                </div>
                <span className="rounded bg-neutral-900 px-2.5 py-0.5 font-mono text-[11px] text-white">
                  CONFIDENTIAL
                </span>
              </div>

              {referenceId ? (
                <div className="p-8 sm:p-10 text-center space-y-5">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-black">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black font-semibold">
                    IDEA SUBMISSION REGISTERED FOR EVALUATION
                  </p>
                  <h3 className="text-2xl font-extrabold text-black">
                    Proposal Reference: {referenceId}
                  </h3>
                  <p className="mx-auto max-w-lg text-sm leading-relaxed text-neutral-600">
                    Thank you, <strong>{name}</strong>. Your concept has been
                    logged with our Custom Execution desk. We will review your
                    objectives and prepare your{" "}
                    <strong>free preliminary proposal & quotation</strong> via
                    Email ({email}) and WhatsApp ({whatsapp}).
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setReferenceId(null);
                        setIdeaDescription("");
                        setGoals("");
                      }}
                      className="rounded-lg border border-[#A8B1BE]/60 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-black hover:border-black transition-colors cursor-pointer"
                    >
                      Submit Another Concept
                    </button>
                    <Link
                      href="/innovate"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-black px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#F7F8FA] hover:bg-neutral-900 transition-colors"
                    >
                      <span>View Full Innovate Process</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-black" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        01. Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Constantinou"
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        02. Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@domain.eu"
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        03. WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+357 99 000 000"
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                      04. Description of Your Idea *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={ideaDescription}
                      onChange={(e) => setIdeaDescription(e.target.value)}
                      placeholder="Describe the business concept, service, automated retail unit, or custom software/AI platform you want to build..."
                      className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        05. Estimated Budget (Optional)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                      >
                        {BUDGET_TIERS.map((tier) => (
                          <option key={tier} value={tier}>
                            {tier}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        07. Desired Timeframe
                      </label>
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                      >
                        {TIMEFRAME_OPTIONS.map((tf) => (
                          <option key={tf} value={tf}>
                            {tf}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                      06. Goals & Expectations *
                    </label>
                    <input
                      type="text"
                      required
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      placeholder="e.g. Passive cashflow asset in Limassol, full turnkey build, or custom AI platform MVP..."
                      className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-[#A8B1BE]/30 pt-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-black" />
                      <span>
                        Includes free preliminary proposal, cost estimate &
                        next-step roadmap.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:bg-black transition-colors cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>
                        {submitting
                          ? "TRANSMITTING CONCEPT..."
                          : "REQUEST FREE PROPOSAL"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageIdeaQuickIntake;
