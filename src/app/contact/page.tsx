"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  BRAND_INFO,
  PREFAB_OPPORTUNITIES,
  LEGAL_NETWORK_CATEGORIES,
} from "@/data/onspec-data";
import {
  submitOnspecEnquiry,
  type EnquiryPillar,
  type SubmissionResult,
} from "@/lib/integrations-placeholder";

interface PillarOption {
  value: EnquiryPillar;
  code: string;
  label: string;
  subtitle: string;
}

const PILLAR_OPTIONS: PillarOption[] = [
  {
    value: "01_LAUNCH",
    code: "01 // LAUNCH",
    label: "01 Launch a Business",
    subtitle: "Ready-to-Launch Vending, Coffee, Kiosks, Laundromats & Car Wash",
  },
  {
    value: "02_AUTOMATE",
    code: "02 // AUTOMATE",
    label: "02 AI & Automation",
    subtitle: "AI Agents, WhatsApp Automation, Booking, CRM & Workflows",
  },
  {
    value: "03_INNOVATE",
    code: "03 // INNOVATE",
    label: "03 Submit an Idea",
    subtitle: "Custom Business Concept & Free Preliminary Proposal",
  },
  {
    value: "04_CONNECT",
    code: "04 // CONNECT",
    label: "04 Legal & Professional Network",
    subtitle: "Cyprus Immigration, Residency, Corporate & Legal Referrals",
  },
  {
    value: "GENERAL",
    code: "05 // GENERAL",
    label: "General Enquiry",
    subtitle: "Partnerships, Supplier Onboarding & Executive Consultation",
  },
];

const SOCIAL_CHANNELS = [
  {
    name: "LinkedIn",
    handle: "ONSPEC Europe (onspec.eu)",
    href: "https://linkedin.com",
  },
  {
    name: "Instagram",
    handle: "@onspec.eu",
    href: "https://instagram.com",
  },
  {
    name: "WhatsApp Channel",
    handle: "Direct Consultation Desk",
    href: BRAND_INFO.whatsappLink,
  },
  {
    name: "X / Corporate Updates",
    handle: "@onspec_eu",
    href: "https://x.com",
  },
];

export default function ContactPage() {
  const [selectedPillar, setSelectedPillar] =
    useState<EnquiryPillar>("01_LAUNCH");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>(
    PREFAB_OPPORTUNITIES[0].title
  );
  const [selectedLegalTopic, setSelectedLegalTopic] = useState<string>(
    LEGAL_NETWORK_CATEGORIES[0].title
  );
  const [budget, setBudget] = useState("Flexible / Need Quotation");
  const [timeframe, setTimeframe] = useState("1 – 3 Months");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const activePillarInfo =
    PILLAR_OPTIONS.find((p) => p.value === selectedPillar) || PILLAR_OPTIONS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await submitOnspecEnquiry({
        pillar: selectedPillar,
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        companyName: companyName.trim() || undefined,
        opportunityTitle:
          selectedPillar === "01_LAUNCH" ? selectedOpportunity : undefined,
        legalCategory:
          selectedPillar === "04_CONNECT" ? selectedLegalTopic : undefined,
        budget,
        timeframe,
        message: message.trim(),
        metadata: {
          pillarLabel: activePillarInfo.label,
          sourceRoute: "/contact",
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
    setCompanyName("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* SECTION 01: ARCHITECTURAL CONTACT HERO */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/35 stripe-mesh-light tech-grid-bg pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#A8B1BE]/35 pb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#101D35]/15 bg-white px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#101D35]">
                CONTACT ONSPEC // CYPRUS &amp; EU CONSULTATION DESK
              </span>
            </div>
            <div className="font-mono text-xs text-[#253B5B]">
              RESPONSE SLA: &lt; 24 BUSINESS HOURS
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
              READY TO TAKE THE NEXT STEP?
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#101D35] sm:text-5xl lg:text-6xl leading-[1.06]">
              Let’s turn your plans into something real.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#253B5B]">
              Whether you want to launch a ready-to-run business, implement AI
              and automation systems, submit a custom business idea for a free
              preliminary proposal, or connect with independent legal
              professionals in Cyprus—our team is ready to assist.
            </p>
          </div>

          {/* 4 DIRECT CONTACT CARDS */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Direct Email Desk */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xs transition-all hover:border-[#101D35]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#253B5B]">
                    01 // EMAIL DESK
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101D35] text-[#27B58A]">
                    <Mail className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-[#101D35]">
                  Direct Email Enquiries
                </h2>
                <p className="mt-1 text-xs text-[#253B5B]">
                  Send specifications, proposals, or consultation requests:
                </p>
                <div className="mt-4 space-y-1.5 font-mono text-xs font-bold text-[#101D35]">
                  <div>
                    <a
                      href={`mailto:${BRAND_INFO.emailPrimary}`}
                      className="hover:text-[#27B58A] underline"
                    >
                      {BRAND_INFO.emailPrimary}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:${BRAND_INFO.emailSecondary}`}
                      className="text-[#253B5B] hover:text-[#27B58A] underline"
                    >
                      {BRAND_INFO.emailSecondary}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-[#A8B1BE]/25 pt-3 font-mono text-[11px] text-[#27B58A]">
                24/7 INTAKE MONITORED
              </div>
            </div>

            {/* Card 2: WhatsApp Direct Consultation */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xs transition-all hover:border-[#101D35]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#253B5B]">
                    02 // WHATSAPP DIRECT
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#27B58A] text-[#101D35]">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-[#101D35]">
                  WhatsApp Consultation
                </h2>
                <p className="mt-1 text-xs text-[#253B5B]">
                  Immediate messaging with our Cyprus &amp; EU operations line:
                </p>
                <div className="mt-4 font-mono text-sm font-extrabold text-[#101D35]">
                  {BRAND_INFO.whatsappDisplay}
                </div>
              </div>
              <div className="mt-6 border-t border-[#A8B1BE]/25 pt-3">
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#101D35] hover:text-[#27B58A]"
                >
                  <span>LAUNCH WHATSAPP CHAT</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Card 3: Cyprus & EU Operations Desk */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xs transition-all hover:border-[#101D35]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#253B5B]">
                    03 // OPERATIONS DESK
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101D35] text-[#27B58A]">
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-[#101D35]">
                  Cyprus &amp; EU Presence
                </h2>
                <p className="mt-1 text-xs text-[#253B5B]">
                  {BRAND_INFO.headquarters}
                </p>
                <p className="mt-3 text-xs text-[#101D35] font-medium">
                  Coverage: Limassol • Nicosia • Larnaca • Paphos • EU Member
                  States
                </p>
              </div>
              <div className="mt-6 border-t border-[#A8B1BE]/25 pt-3 font-mono text-[11px] text-[#253B5B]">
                EET / CET BUSINESS HOURS
              </div>
            </div>

            {/* Card 4: Social & Digital Channels */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-xs transition-all hover:border-[#101D35]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#253B5B]">
                    04 // SOCIAL CHANNELS
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101D35] text-[#27B58A]">
                    <Globe className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-[#101D35]">
                  Connect Online
                </h2>
                <ul className="mt-3 space-y-2">
                  {SOCIAL_CHANNELS.map((soc) => (
                    <li
                      key={soc.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-[#101D35]">
                        {soc.name}
                      </span>
                      <a
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-[#253B5B] hover:text-[#27B58A] inline-flex items-center gap-0.5"
                      >
                        <span>{soc.handle}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-[#A8B1BE]/25 pt-3 font-mono text-[11px] text-[#253B5B]">
                DOMAIN: ONSPEC.EU
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: COMPREHENSIVE CONSULTATION ENQUIRY FORM */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Pillar Selection Guide & Consultation SLA */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27B58A]">
                    CONSULTATION INTAKE
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35]">
                    Select Your Pillar of Interest
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#253B5B]">
                    Choose the business pillar that matches your objective so
                    our system routes your enquiry directly to the appropriate
                    Onspec specialist.
                  </p>
                </div>

                {/* Interactive Pillar Selector Cards on the Left */}
                <div className="space-y-2.5">
                  {PILLAR_OPTIONS.map((option) => {
                    const isSelected = selectedPillar === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedPillar(option.value)}
                        className={`w-full rounded-xl border p-4 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#101D35] bg-[#101D35] text-[#F7F8FA] shadow-md"
                            : "border-[#A8B1BE]/45 bg-white text-[#101D35] hover:border-[#253B5B]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-[11px] font-bold ${
                              isSelected ? "text-[#27B58A]" : "text-[#253B5B]"
                            }`}
                          >
                            {option.code}
                          </span>
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isSelected ? "bg-[#27B58A]" : "bg-[#A8B1BE]/40"
                            }`}
                          />
                        </div>
                        <div className="mt-1 text-sm font-extrabold">
                          {option.label}
                        </div>
                        <div
                          className={`mt-0.5 text-xs ${
                            isSelected ? "text-[#A8B1BE]" : "text-[#253B5B]"
                          }`}
                        >
                          {option.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* SLA Box */}
                <div className="rounded-2xl border border-[#A8B1BE]/45 bg-white p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#101D35]">
                    <Clock className="h-4 w-4 text-[#27B58A]" />
                    <span>WHAT HAPPENS AFTER YOU SUBMIT?</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-[#253B5B]">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                      <span>
                        Instant reference ID generated for tracking your dossier.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                      <span>
                        Initial assessment by our Cyprus &amp; EU solutions desk.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                      <span>
                        Follow-up via Email or WhatsApp with concrete next steps.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Comprehensive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#A8B1BE]/45 bg-white p-6 shadow-lg sm:p-10">
                {submissionResult ? (
                  <div className="py-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#27B58A]/15 px-3.5 py-1.5 text-xs font-bold text-[#101D35]">
                      <CheckCircle2 className="h-4 w-4 text-[#27B58A]" />
                      <span>CONSULTATION ENQUIRY REGISTERED</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-extrabold text-[#101D35] sm:text-3xl">
                      We’ve received your enquiry.
                    </h3>
                    <p className="mt-2 text-sm text-[#253B5B]">
                      Thank you, <strong className="text-[#101D35]">{name}</strong>.
                      Your consultation request under{" "}
                      <strong className="text-[#101D35]">
                        {activePillarInfo.label}
                      </strong>{" "}
                      has been logged.
                    </p>

                    <div className="mt-6 rounded-xl border border-[#101D35]/15 bg-[#F7F8FA] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="font-mono text-[11px] uppercase text-[#253B5B]">
                            ENQUIRY REFERENCE ID
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
                          `Hello Onspec, I just submitted a consultation enquiry (Ref: ${submissionResult.referenceId}) for ${activePillarInfo.label}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-3 text-xs font-bold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Connect Immediately via WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-lg border border-[#101D35]/20 px-4 py-3 text-xs font-semibold text-[#101D35] hover:border-[#101D35] cursor-pointer"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A8B1BE]/30 pb-4">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#253B5B]">
                          ACTIVE PILLAR // {activePillarInfo.code}
                        </span>
                        <h3 className="text-xl font-extrabold text-[#101D35]">
                          Comprehensive Consultation Enquiry
                        </h3>
                      </div>
                      <span className="rounded bg-[#101D35] px-2.5 py-1 font-mono text-[11px] font-bold text-[#27B58A]">
                        {activePillarInfo.label}
                      </span>
                    </div>

                    {/* Pillar Dropdown Selector (Synchronized with left cards) */}
                    <div>
                      <label
                        htmlFor="contact-pillar"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        Pillar of Interest{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <select
                        id="contact-pillar"
                        value={selectedPillar}
                        onChange={(e) =>
                          setSelectedPillar(e.target.value as EnquiryPillar)
                        }
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm font-semibold text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      >
                        {PILLAR_OPTIONS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label} — {p.subtitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Full Name <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="contact-name"
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
                          htmlFor="contact-email"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Email Address <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.eu"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* WhatsApp & Company */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-whatsapp"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          WhatsApp / Phone Number{" "}
                          <span className="text-[#27B58A]">*</span>
                        </label>
                        <input
                          id="contact-whatsapp"
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
                          htmlFor="contact-company"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Company / Organization{" "}
                          <span className="font-normal text-[#253B5B]">
                            (Optional)
                          </span>
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Existing Business or Individual"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Dynamic Contextual Selector based on Pillar */}
                    {selectedPillar === "01_LAUNCH" && (
                      <div>
                        <label
                          htmlFor="contact-opportunity"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Preferred Ready-to-Launch Business Model
                        </label>
                        <select
                          id="contact-opportunity"
                          value={selectedOpportunity}
                          onChange={(e) =>
                            setSelectedOpportunity(e.target.value)
                          }
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        >
                          {PREFAB_OPPORTUNITIES.map((opp) => (
                            <option key={opp.id} value={opp.title}>
                              {opp.title} ({opp.estimatedCapital})
                            </option>
                          ))}
                          <option value="Multiple / Undecided Turnkey Models">
                            Multiple / Undecided — Need Advisory
                          </option>
                        </select>
                      </div>
                    )}

                    {selectedPillar === "04_CONNECT" && (
                      <div>
                        <label
                          htmlFor="contact-legal-cat"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Cyprus Legal Area Needed
                        </label>
                        <select
                          id="contact-legal-cat"
                          value={selectedLegalTopic}
                          onChange={(e) =>
                            setSelectedLegalTopic(e.target.value)
                          }
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        >
                          {LEGAL_NETWORK_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.title}>
                              {cat.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Budget & Timeframe */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-budget"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Estimated Budget Range{" "}
                          <span className="font-normal text-[#253B5B]">
                            (Optional)
                          </span>
                        </label>
                        <select
                          id="contact-budget"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        >
                          <option value="Flexible / Need Quotation">
                            Flexible / Need Preliminary Quotation
                          </option>
                          <option value="< €10k">&lt; €10,000</option>
                          <option value="€10k – €25k">€10,000 – €25,000</option>
                          <option value="€25k – €50k">€25,000 – €50,000</option>
                          <option value="€50k – €100k+">
                            €50,000 – €100,000+
                          </option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="contact-timeframe"
                          className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                        >
                          Desired Timeframe
                        </label>
                        <select
                          id="contact-timeframe"
                          value={timeframe}
                          onChange={(e) => setTimeframe(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                        >
                          <option value="Immediate / < 30 days">
                            Immediate / &lt; 30 days
                          </option>
                          <option value="1 – 3 Months">1 – 3 Months</option>
                          <option value="3 – 6 Months">3 – 6 Months</option>
                          <option value="Exploratory">Exploratory</option>
                        </select>
                      </div>
                    </div>

                    {/* Message / Details */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-xs font-bold uppercase text-[#101D35]"
                      >
                        Your Message, Goals or Concept Details{" "}
                        <span className="text-[#27B58A]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how Onspec can help you launch, automate, innovate, or connect in Cyprus & the EU..."
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-4 py-3 text-sm text-[#101D35] focus:border-[#101D35] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#27B58A] px-6 py-4 text-sm font-extrabold text-[#101D35] shadow-md transition-all hover:bg-[#1F9470] hover:text-white disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting
                          ? "TRANSMITTING ENQUIRY..."
                          : "SEND CONSULTATION ENQUIRY"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: DEDICATED IDEA INTAKE CROSS-LINK */}
      <section className="border-t border-[#A8B1BE]/35 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <span className="font-mono text-xs font-semibold text-[#27B58A]">
              HAVE A CUSTOM BUSINESS IDEA?
            </span>
            <h3 className="mt-1 text-xl font-bold text-[#101D35]">
              Use our dedicated Pillar 03 Idea Intake Engine for a free
              preliminary proposal.
            </h3>
          </div>
          <Link
            href="/innovate"
            className="inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-3 text-xs font-bold text-[#F7F8FA] hover:bg-[#253B5B] transition-colors"
          >
            <Sparkles className="h-4 w-4 text-[#27B58A]" />
            <span>Go to /innovate Idea Engine</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
