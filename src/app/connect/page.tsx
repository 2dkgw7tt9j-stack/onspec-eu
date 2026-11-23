"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ShieldAlert,
  Building2,
  Globe2,
  FileCheck2,
  Gavel,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Lock,
  Send,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import {
  BRAND_INFO,
  LEGAL_NETWORK_CATEGORIES,
  PILLARS,
  type LegalServiceCategory,
} from "@/data/onspec-data";
import {
  submitOnspecEnquiry,
  type SubmissionResult,
} from "@/lib/integrations-placeholder";

const URGENCY_LEVELS = [
  "Standard Consultation (Within 48h)",
  "Priority Business / Residency Matter (Within 24h)",
  "Urgent Legal Representation (Immediate Dispatch)",
  "Exploratory / Pre-Relocation Planning",
];

const JURISDICTION_CITIES = [
  "Limassol",
  "Nicosia",
  "Larnaca",
  "Paphos",
  "Famagusta / Protaras",
  "International / Remote Client",
];

function getCategoryIcon(id: string) {
  switch (id) {
    case "immigration-matters":
      return Globe2;
    case "residency-matters":
      return Building2;
    case "business-legal-matters":
      return Briefcase;
    case "criminal-law":
      return Gavel;
    default:
      return FileCheck2;
  }
}

export default function ConnectPage() {
  const pillar = PILLARS.find((p) => p.id === "connect") || PILLARS[3];

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    LEGAL_NETWORK_CATEGORIES[0].id
  );

  // Confidential Legal Referral Request Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedLegalCategory, setSelectedLegalCategory] = useState<string>(
    LEGAL_NETWORK_CATEGORIES[0].title
  );
  const [city, setCity] = useState<string>("Limassol");
  const [urgency, setUrgency] = useState<string>(URGENCY_LEVELS[0]);
  const [matterSummary, setMatterSummary] = useState("");
  const [acknowledgedDisclaimer, setAcknowledgedDisclaimer] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleSelectCategoryForReferral = (cat: LegalServiceCategory) => {
    setActiveCategoryId(cat.id);
    setSelectedLegalCategory(cat.title);
    const formEl = document.getElementById("legal-referral-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !matterSummary.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await submitOnspecEnquiry({
        pillar: "04_CONNECT",
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        legalCategory: selectedLegalCategory,
        timeframe: urgency,
        message: matterSummary.trim(),
        metadata: {
          district: city,
          urgency,
          complianceNoticeAccepted: acknowledgedDisclaimer,
          sourceRoute: "/connect",
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
    setMatterSummary("");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* SECTION 01: CORPORATE AUTHORITY HERO */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/35 linear-navy-surface tech-grid-dark pt-12 pb-20 text-[#F7F8FA] lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Top Specification Telemetry Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#A8B1BE]/20 pb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#A8B1BE]/30 bg-[#253B5B]/50 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#F7F8FA]">
                {pillar.code} // CYPRUS LEGAL &amp; PROFESSIONAL NETWORK
              </span>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs text-[#A8B1BE]">
              <span>JURISDICTION: REPUBLIC OF CYPRUS (EU)</span>
              <span className="hidden sm:inline text-[#A8B1BE]/40">|</span>
              <span className="hidden sm:inline text-[#27B58A]">
                VETTED INDEPENDENT COUNSEL
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                CORPORATE, RESIDENCY, IMMIGRATION &amp; DEFENSE REFERRALS
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]">
                The right professionals. The right guidance. Without the hassle
                of finding them yourself.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#A8B1BE] sm:text-lg">
                Whether you are relocating to Cyprus, registering a new company,
                structuring commercial contracts, applying for permanent
                residency, or requiring dedicated legal representation, Onspec
                connects you directly with vetted, experienced independent legal
                professionals across Cyprus.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#legal-referral-form"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-bold text-[#101D35] shadow-sm transition-all hover:bg-[#1F9470] hover:text-white"
                >
                  <Scale className="h-4 w-4" />
                  <span>REQUEST CONFIDENTIAL LEGAL REFERRAL</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#practice-areas"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#A8B1BE]/35 bg-[#101D35]/60 px-5 py-3.5 text-sm font-semibold text-[#F7F8FA] transition-colors hover:border-white"
                >
                  <span>Explore 5 Legal Practice Areas</span>
                </a>
              </div>
            </div>

            {/* Right Column: Prominent Compliance & Governance Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#A8B1BE]/30 bg-[#101D35]/90 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2.5 border-b border-[#A8B1BE]/20 pb-3.5">
                  <ShieldAlert className="h-5 w-5 text-[#27B58A]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    REGULATORY &amp; COMPLIANCE NOTICE
                  </span>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#F7F8FA]/90">
                  “{BRAND_INFO.legalDisclaimer}”
                </p>
                <div className="mt-5 space-y-2 border-t border-[#A8B1BE]/20 pt-4 font-mono text-[11px] text-[#A8B1BE]">
                  <div className="flex items-center justify-between">
                    <span>COUNSEL STATUS:</span>
                    <span className="text-[#27B58A]">
                      INDEPENDENT ADVOCATES
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>COVERAGE:</span>
                    <span className="text-white">
                      LIMASSOL • NICOSIA • LARNACA • PAPHOS
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>INTAKE HANDLING:</span>
                    <span className="text-white">STRICT CONFIDENTIALITY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: PROMINENT COMPLIANCE BANNER STRIP */}
      <section className="border-b border-[#A8B1BE]/35 bg-white py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="rounded bg-[#101D35] px-2.5 py-1 font-mono text-[11px] font-bold text-[#27B58A]">
              COMPLIANCE FRAMEWORK
            </span>
            <p className="text-xs font-medium text-[#101D35]">
              Onspec connects clients with experienced independent legal
              professionals in Cyprus through its professional network. Onspec
              is a business solutions company and does not itself practice law
              or operate as a law firm.
            </p>
          </div>
          <span className="shrink-0 font-mono text-[11px] font-semibold text-[#253B5B]">
            CYPRUS &amp; EU PROFESSIONAL NETWORK
          </span>
        </div>
      </section>

      {/* SECTION 03: DEDICATED STRUCTURED SECTIONS FOR ALL 5 LEGAL PRACTICE AREAS */}
      <section
        id="practice-areas"
        className="border-b border-[#A8B1BE]/35 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[#A8B1BE]/35 pb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#253B5B]">
                01 // DEDICATED CYPRUS PRACTICE AREAS
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                Structured Legal &amp; Professional Categories
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#253B5B]">
                Finding reliable legal representation in a new jurisdiction or
                specialized commercial sector takes time and carries risk. We
                streamline the introduction to experienced independent lawyers in
                Cyprus across five core areas.
              </p>
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {LEGAL_NETWORK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`rounded-lg border px-3 py-2 font-mono text-xs font-semibold transition-all cursor-pointer ${
                    activeCategoryId === cat.id
                      ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA]"
                      : "border-[#A8B1BE]/45 bg-white text-[#101D35] hover:border-[#253B5B]"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* All 5 Dedicated Structured Sections */}
          <div className="mt-12 space-y-8">
            {LEGAL_NETWORK_CATEGORIES.map((category, idx) => {
              const IconComponent = getCategoryIcon(category.id);
              const isHighlighted = activeCategoryId === category.id;

              return (
                <div
                  key={category.id}
                  id={category.id}
                  className={`rounded-2xl border bg-white p-6 transition-all sm:p-10 ${
                    isHighlighted
                      ? "border-[#101D35] shadow-lg ring-1 ring-[#101D35]/10"
                      : "border-[#A8B1BE]/40 shadow-xs hover:border-[#253B5B]"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Practice Area Header & Description */}
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101D35] text-[#27B58A]">
                          <IconComponent className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="font-mono text-xs font-bold text-[#253B5B]">
                            0{idx + 1} // {category.code}
                          </span>
                          <h3 className="text-2xl font-extrabold text-[#101D35]">
                            {category.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#253B5B]">
                        {category.subtitle}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[#253B5B]">
                        {category.description}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#A8B1BE]/30 bg-[#F7F8FA] px-4 py-3">
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase text-[#253B5B]">
                            REFERRAL PROTOCOL
                          </span>
                          <div className="text-xs font-semibold text-[#101D35]">
                            {category.referralProcess}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectCategoryForReferral(category)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#101D35] px-4 py-2 text-xs font-bold text-[#F7F8FA] transition-colors hover:bg-[#27B58A] hover:text-[#101D35] cursor-pointer"
                        >
                          <span>Request {category.title} Referral</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Typical Matters & Scope Checklist */}
                    <div className="lg:col-span-5">
                      <div className="h-full rounded-xl border border-[#A8B1BE]/35 bg-[#F7F8FA] p-5 sm:p-6">
                        <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#101D35]">
                          TYPICAL MATTERS HANDLED BY NETWORK COUNSEL
                        </div>
                        <ul className="mt-4 space-y-3">
                          {category.typicalMatters.map((matter) => (
                            <li
                              key={matter}
                              className="flex items-start gap-2.5 text-xs font-medium text-[#101D35]"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#27B58A]" />
                              <span>{matter}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 04: WHY USE ONSPEC'S VETTED NETWORK (MCKINSEY / ACCENTURE AUTHORITY GRID) */}
      <section className="border-b border-[#A8B1BE]/35 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
              02 // NETWORK ADVANTAGE
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#101D35]">
              How Our Professional Network Operates
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#A8B1BE]/40 bg-[#F7F8FA] p-6">
              <span className="font-mono text-xs font-bold text-[#253B5B]">
                STEP 01 // CONFIDENTIAL BRIEFING
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#101D35]">
                Single Point of Intake
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                Instead of cold-calling multiple offices across Limassol or
                Nicosia, share your situation once through our confidential
                desk. We clarify your commercial or personal requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-[#A8B1BE]/40 bg-[#F7F8FA] p-6">
              <span className="font-mono text-xs font-bold text-[#253B5B]">
                STEP 02 // SPECIALIST MATCHING
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#101D35]">
                Matched by Domain &amp; District
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                An immigration permit, a commercial vending lease, and a
                criminal defense matter require completely different legal
                specialists. We connect you with the right independent
                practitioner.
              </p>
            </div>

            <div className="rounded-2xl border border-[#A8B1BE]/40 bg-[#F7F8FA] p-6">
              <span className="font-mono text-xs font-bold text-[#253B5B]">
                STEP 03 // INTEGRATED ECOSYSTEM
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#101D35]">
                Aligned With Your Business Execution
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#253B5B]">
                If you are also launching a turnkey business or implementing AI
                systems with Onspec, your corporate setup and commercial
                agreements move forward in lockstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: CONFIDENTIAL LEGAL REFERRAL REQUEST FORM */}
      <section
        id="legal-referral-form"
        className="py-20 lg:py-28 stripe-mesh-light"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                03 // CONFIDENTIAL REFERRAL DESK
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35]">
                Request a Cyprus Legal Referral
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#253B5B]">
                Complete this confidential request to be connected with an
                experienced independent legal professional in Cyprus suited to
                your matter.
              </p>

              <div className="mt-6 rounded-2xl border border-[#A8B1BE]/45 bg-white p-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#101D35]">
                  <Lock className="h-4 w-4 text-[#27B58A]" />
                  <span>CONFIDENTIALITY &amp; COMPLIANCE PROTOCOL</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#253B5B]">
                  {BRAND_INFO.legalDisclaimer}
                </p>
                <div className="mt-4 border-t border-[#A8B1BE]/30 pt-4 text-xs text-[#101D35]">
                  <div className="font-bold">Direct Coordination Desk:</div>
                  <div className="mt-1 text-[#253B5B]">
                    Email: {BRAND_INFO.emailPrimary} • {BRAND_INFO.headquarters}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-lg sm:p-10">
                {submissionResult ? (
                  <div className="py-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#27B58A]/15 px-3.5 py-1.5 text-xs font-bold text-[#101D35]">
                      <CheckCircle2 className="h-4 w-4 text-[#27B58A]" />
                      <span>REFERRAL REQUEST LOGGED // CONFIDENTIAL</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-extrabold text-[#101D35]">
                      Your legal referral request is registered.
                    </h3>
                    <p className="mt-2 text-sm text-[#253B5B]">
                      Thank you, <strong className="text-[#101D35]">{name}</strong>.
                      We have logged your request for{" "}
                      <strong className="text-[#101D35]">
                        {selectedLegalCategory}
                      </strong>{" "}
                      ({city}) and will coordinate your introduction to an
                      appropriate independent legal professional in Cyprus.
                    </p>

                    <div className="mt-6 rounded-xl border border-[#101D35]/15 bg-[#F7F8FA] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="font-mono text-[11px] uppercase text-[#253B5B]">
                            REFERRAL REFERENCE ID
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
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={`${BRAND_INFO.whatsappLink}?text=${encodeURIComponent(
                          `Hello Onspec, I submitted a Cyprus legal referral request (Ref: ${submissionResult.referenceId}) regarding ${selectedLegalCategory}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-3 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Priority Escalation via WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-lg border border-[#101D35]/20 px-4 py-3 text-xs font-semibold text-[#101D35] hover:border-[#101D35] cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-[#A8B1BE]/30 pb-4">
                      <span className="font-mono text-xs font-bold text-[#253B5B]">
                        INTAKE FORM // PILLAR 04 CONNECT
                      </span>
                      <h3 className="text-xl font-extrabold text-[#101D35]">
                        Confidential Legal Referral Request
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="connect-name"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Full Name <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="connect-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Full Name"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="connect-email"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Email Address <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="connect-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="connect-whatsapp"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Phone / WhatsApp Number{" "}
                          <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="connect-whatsapp"
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="+357 99 000 000"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="connect-city"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Preferred Cyprus District
                        </label>
                        <select
                          id="connect-city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        >
                          {JURISDICTION_CITIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Legal Category Selector */}
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#101D35]">
                        Area of Legal Assistance Needed{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {LEGAL_NETWORK_CATEGORIES.map((cat) => {
                          const active = selectedLegalCategory === cat.title;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setSelectedLegalCategory(cat.title)}
                              className={`rounded-lg border px-3.5 py-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                                active
                                  ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA]"
                                  : "border-[#A8B1BE]/50 bg-[#F7F8FA] text-[#101D35] hover:border-[#253B5B]"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{cat.title}</span>
                                {active && (
                                  <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Urgency Selector */}
                    <div>
                      <label
                        htmlFor="connect-urgency"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        Urgency / Timeline
                      </label>
                      <select
                        id="connect-urgency"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      >
                        {URGENCY_LEVELS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Brief Summary of Matter */}
                    <div>
                      <label
                        htmlFor="connect-summary"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        Brief Overview of Your Matter{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <textarea
                        id="connect-summary"
                        required
                        rows={4}
                        value={matterSummary}
                        onChange={(e) => setMatterSummary(e.target.value)}
                        placeholder="Provide a brief high-level description so we can match you with the appropriate independent legal professional in Cyprus..."
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Compliance Checkbox */}
                    <label className="flex items-start gap-3 rounded-xl border border-[#A8B1BE]/35 bg-[#F7F8FA] p-3.5 text-xs text-[#253B5B] cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={acknowledgedDisclaimer}
                        onChange={(e) =>
                          setAcknowledgedDisclaimer(e.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 accent-[#101D35]"
                      />
                      <span>
                        I understand that Onspec connects clients with
                        experienced independent legal professionals in Cyprus
                        and does not itself practice law or operate as a law
                        firm.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#27B58A] px-6 py-4 text-sm font-extrabold text-[#101D35] shadow-md transition-all hover:bg-[#1F9470] hover:text-white disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting
                          ? "LOGGING CONFIDENTIAL REFERRAL..."
                          : "REQUEST INDEPENDENT LEGAL REFERRAL"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: BOTTOM ECOSYSTEM LINK */}
      <section className="border-t border-[#A8B1BE]/35 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <span className="font-mono text-xs font-semibold text-[#253B5B]">
              LAUNCHING A NEW COMPANY IN CYPRUS?
            </span>
            <h3 className="mt-1 text-xl font-bold text-[#101D35]">
              Pair corporate formation with our Ready-to-Launch Businesses
            </h3>
          </div>
          <Link
            href="/launch"
            className="inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-3 text-xs font-bold text-[#F7F8FA] hover:bg-[#253B5B] transition-colors"
          >
            <span>Explore Ready-to-Launch Models</span>
            <ArrowUpRight className="h-4 w-4 text-[#27B58A]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
