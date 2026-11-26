"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND_INFO, PILLARS } from "@/data/onspec-data";
import {
  EnquiryPillar,
  submitOnspecEnquiry,
} from "@/lib/integrations-placeholder";

const PILLAR_OPTIONS: { value: EnquiryPillar; label: string; code: string; desc: string }[] = [
  {
    value: "01_LAUNCH",
    code: "Pillar 01 — Launch",
    label: "Turnkey Automated Dispensers & Hot Meal Stations",
    desc: "Luxury Perfume Stations, Essential Hygiene Dispensers & On-Demand Hot Food Stations (Locations & Legal Ready)",
  },
  {
    value: "02_AUTOMATE",
    code: "Pillar 02 — Automate",
    label: "Web Platforms & AI Automations",
    desc: "Sub-Second Next.js Platforms, 24/7 Autonomous AI Agents & Senior Diagnostics",
  },
  {
    value: "03_INNOVATE",
    code: "Pillar 03 — Innovate",
    label: "Submit Your Idea (Free Proposal)",
    desc: "Custom business concept feasibility & free preliminary quotation",
  },
  {
    value: "04_CONNECT",
    code: "Pillar 04 — Connect",
    label: "Cyprus Legal & Professional Network",
    desc: "Independent counsel for Immigration, Residency, Corporate & Criminal Law",
  },
  {
    value: "GENERAL",
    code: "General Inquiry",
    label: "General Partnership & Advisory",
    desc: "Executive inquiry, multi unit venture portfolio, or general consultation",
  },
];

export default function ContactPage() {
  const [pillar, setPillar] = useState<EnquiryPillar>("01_LAUNCH");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("Limassol, Cyprus");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar,
      name,
      email,
      whatsapp,
      companyName,
      message: `[Region: ${location}] ${message}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-white text-black">
      <div className="container-xl md:grid md:grid-cols-2 pt-[var(--header-area)] md:gap-x-3 pb-fluid-2xl">
        {/* Left Sticky Architectural Visual & Cyprus Operations Desk Telemetry (1:1 Lightship contact.html) */}
        <div className="hidden md:block md:sticky md:top-[var(--header-area)] h-[calc(100svh-var(--header-area)-var(--grid-margin-xl))]">
          <div className="c-image -rounded-md -cover -lazy-load is-loaded relative h-full w-full overflow-hidden">
            <picture className="c-image_inner h-full w-full block">
              <img
                alt="ONSPEC Cyprus & EU Operations Desk"
                className="c-image_img is-loaded h-full w-full object-cover"
                height={1251}
                width={1200}
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85"
              />
            </picture>
            {/* Pure Black & Charcoal Architectural Overlay with Direct Desk Triggers */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-between p-8 text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  CYPRUS &amp; EU OPERATIONS DESK
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  {BRAND_INFO.domain}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-eyebrow text-white/80 uppercase tracking-widest font-mono">
                    {BRAND_INFO.descriptor}
                  </p>
                  <h2 className="heading-sm mt-2 text-white">
                    {BRAND_INFO.slogan}
                  </h2>
                  <p className="text-sm text-white/75 mt-2 max-w-md">
                    From launching a turnkey physical or digital business in Cyprus to deploying 24/7 AI automation systems or connecting with independent legal counsel.
                  </p>
                </div>

                {/* Direct Trigger Cards inside Left Sticky Visual */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={`mailto:${BRAND_INFO.emailPrimary}`}
                    className="rounded-xl bg-black/80 backdrop-blur-md border border-white/20 p-4 hover:border-white transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      DIRECT EMAIL DESK
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {BRAND_INFO.emailPrimary}
                    </p>
                    <p className="mt-0.5 text-xs text-white/70">
                      {BRAND_INFO.emailSecondary} →
                    </p>
                  </a>
                  <a
                    href={BRAND_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-black/80 backdrop-blur-md border border-white/20 p-4 hover:border-white transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      DIRECT WHATSAPP
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {BRAND_INFO.whatsappDisplay}
                    </p>
                    <p className="mt-0.5 text-xs text-white/70">
                      Instant Executive Chat →
                    </p>
                  </a>
                </div>

                <div className="border-t border-white/20 pt-4 flex items-center justify-between text-xs text-white/60">
                  <span>{BRAND_INFO.headquarters}</span>
                  <span>Mon to Sat • 08:30 to 19:30 EET</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lightship Split Editorial Heading + Pill Intake Form */}
        <div>
          <div className="flex flex-col">
            <div className="text-center px-6 md:px-10 mt-fluid-2xl md:my-fluid-xl max-w-[600px] self-center">
              <h1 className="heading-md" id="page-heading">
                <span className="text-black/40">We&apos;re here to help.</span>
                <br />
                <span className="text-black font-extrabold">Every step of the way.</span>
                <br />
              </h1>
              <p className="text-md pt-5 text-neutral-600">
                Questions, curiosities, or ready to execute? Whether you want to launch a turnkey business, automate your existing operations, submit a new concept for a free preliminary proposal, or connect with vetted Cyprus legal professionals, our team is ready.
              </p>

              {/* Direct Call / WhatsApp / Email Quick Triggers */}
              <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
                >
                  Schedule Discovery Call
                </button>

                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Instant Advisory Desk
                </a>

                <a
                  href={`mailto:${BRAND_INFO.emailPrimary}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition-colors"
                >
                  {BRAND_INFO.emailPrimary}
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Visual Banner (1:1 Lightship contact.html) */}
          <div className="w-full aspect-video mt-fluid-lg mb-4 md:hidden">
            <div className="c-image -rounded-md -cover -lazy-load is-loaded h-full w-full overflow-hidden">
              <picture className="c-image_inner h-full w-full block">
                <img
                  alt="ONSPEC Cyprus Operations Desk"
                  className="c-image_img is-loaded h-full w-full object-cover"
                  height={1251}
                  width={1200}
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
                />
              </picture>
            </div>
          </div>

          {/* Lightship Contact Form Container (#hubspot-contact-form-container) */}
          <div
            id="hubspot-contact-form-container"
            className="px-4 md:px-10 pb-fluid-xl max-w-[640px] mx-auto"
          >
            {referenceId ? (
              <div className="rounded-[20px] bg-white border border-[#A8B1BE]/45 p-8 md:p-10 text-center space-y-5 shadow-sm">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-black">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 16 16">
                    <use href="/assets/svgs/sprite.svg#checkmark" />
                  </svg>
                </div>
                <p className="text-eyebrow text-black uppercase tracking-widest">
                  ENQUIRY REGISTERED &bull; ONSPEC OPERATIONS
                </p>
                <h2 className="heading-sm text-black">
                  Reference ID: {referenceId}
                </h2>
                <p className="text-md text-neutral-600 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Our Cyprus &amp; EU operations desk has logged your specification enquiry under{" "}
                  <strong>{pillar}</strong> and will respond via email ({email}) or WhatsApp within 1 business day.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setReferenceId(null);
                      setMessage("");
                    }}
                    className="c-button -color-black cursor-pointer"
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label="Send Another Enquiry"
                      >
                        <span className="c-button_label">
                          Send Another Enquiry
                        </span>
                      </span>
                    </span>
                  </button>
                  <Link href="/launch" className="c-button -color-grey">
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label="Explore Turnkey Catalog"
                      >
                        <span className="c-button_label">
                          Explore Turnkey Catalog
                        </span>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[20px] bg-white border border-[#A8B1BE]/40 p-6 md:p-9 space-y-6 shadow-sm"
              >
                <div className="border-b border-[#A8B1BE]/35 pb-5">
                  <p className="text-eyebrow text-neutral-600 uppercase tracking-widest">
                    DIRECT SPECIFICATION &amp; ADVISORY INTAKE
                  </p>
                  <h2 className="heading-xs mt-1 text-black">
                    Select Your Pillar &amp; Share Your Objectives
                  </h2>
                </div>

                {/* Pillar Selector Cards (Zero Blue Box - Clean Black and White) */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold">
                    1. Select Execution Pillar *
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {PILLAR_OPTIONS.map((opt) => {
                      const active = pillar === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPillar(opt.value)}
                          className={`text-left rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            active
                              ? "border-2 border-black bg-white shadow-xs"
                              : "border border-neutral-200 bg-white hover:border-black/50"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-mono text-[11px] uppercase tracking-wider ${
                                  active ? "text-black font-bold" : "text-neutral-500"
                                }`}
                              >
                                {opt.code}
                              </span>
                              <span className="text-sm font-bold text-black">
                                {opt.label}
                              </span>
                            </div>
                            <p className="text-xs mt-1 text-neutral-600">
                              {opt.desc}
                            </p>
                          </div>
                          <span
                            className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                              active
                                ? "border-black bg-white"
                                : "border-neutral-300 bg-white"
                            }`}
                          >
                            {active && (
                              <span className="h-2.5 w-2.5 rounded-full bg-black" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lightship Pill Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Full Name *
                    </label>
                    <div className="c-input-text">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Andreas Georgiou"
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-black focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Email Address *
                    </label>
                    <div className="c-input-text">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.eu"
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-black focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      WhatsApp / Phone *
                    </label>
                    <div className="c-input-text">
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+357 99 000 000"
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-black focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Target City / Jurisdiction
                    </label>
                    <div className="c-input-text">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-black focus:border-black focus:outline-none"
                      >
                        <option value="Limassol, Cyprus">Limassol, Cyprus</option>
                        <option value="Nicosia, Cyprus">Nicosia, Cyprus</option>
                        <option value="Larnaca, Cyprus">Larnaca, Cyprus</option>
                        <option value="Paphos, Cyprus">Paphos, Cyprus</option>
                        <option value="Ayia Napa / Protaras, Cyprus">
                          Ayia Napa / Protaras, Cyprus
                        </option>
                        <option value="All Cyprus / Multi Location">
                          All Cyprus / Multi Location
                        </option>
                        <option value="European Union / International">
                          European Union / International
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="c-input-text-container">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                    Company Name (Optional)
                  </label>
                  <div className="c-input-text">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Existing business or new venture entity"
                      className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-black focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="c-input-text-container">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                    How can ONSPEC execute for you? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us which turnkey business model, AI automation workflow, custom idea, or Cyprus legal referral you would like to discuss..."
                    className="text-sm w-full rounded-2xl border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-black focus:border-black focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-neutral-600">
                    Direct response from our Cyprus executive desk within 24h.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="c-button primary -color-black cursor-pointer w-full sm:w-auto"
                    style={{
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                    }}
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label={
                          submitting
                            ? "Transmitting..."
                            : "Submit Specification Enquiry"
                        }
                      >
                        <span className="c-button_label font-semibold">
                          {submitting
                            ? "Transmitting..."
                            : "Submit Specification Enquiry"}
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
              </form>
            )}

            {/* Four Pillar Quick Directory Cards below Contact Form */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PILLARS.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="rounded-2xl bg-white border border-[#A8B1BE]/40 p-5 hover:border-black transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-black">
                      {p.code}
                    </p>
                    <h3 className="text-base font-bold text-black mt-1">
                      {p.shortTitle}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1">
                      {p.coreMessage}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-black font-semibold">
                    {p.telemetryValue} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightship .c-modal-meeting Modal Overlay (1:1 contact.html) */}
      <div
        className={`modal c-modal-meeting ${
          meetingModalOpen ? "is-active" : ""
        }`}
        aria-hidden={!meetingModalOpen}
      >
        <div className="modal_container">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setMeetingModalOpen(false)}
            className="c-button -icon -color-black modal_close cursor-pointer"
          >
            <span className="c-button_inner">
              <span className="c-icon c-button_icon">
                <svg
                  aria-hidden="true"
                  className="svg-close"
                  focusable="false"
                >
                  <use href="/assets/svgs/sprite.svg#close" />
                </svg>
              </span>
            </span>
          </button>
          <div className="modal_inner p-8 md:p-12">
            <div className="max-w-xl mx-auto space-y-6 text-black">
              <p className="text-eyebrow text-black uppercase tracking-widest">
                ONSPEC EXECUTIVE BRIEFING &bull; 15 MINUTE CALL
              </p>
              <h2 className="heading-md">
                Book a Direct Discovery Call with Our Cyprus Desk
              </h2>
              <p className="text-md text-neutral-600">
                Choose your preferred communication channel for an immediate 15 minute consultation on turnkey business launches, AI automation systems, custom venture buildouts, or Cyprus legal introductions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-black text-white p-6 hover:bg-neutral-800 transition-colors flex flex-col justify-between gap-4 shadow-sm"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                      INSTANT CHANNEL
                    </span>
                    <h3 className="heading-2xs mt-2 text-white font-bold">
                      WhatsApp Video / Voice Briefing
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      {BRAND_INFO.whatsappDisplay}
                    </p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                    Launch WhatsApp Now →
                  </span>
                </a>
                <a
                  href={`mailto:${BRAND_INFO.emailPrimary}?subject=Discovery%20Call%20Request%20ONSPEC`}
                  className="rounded-2xl bg-white border border-neutral-300 text-black p-6 hover:border-black transition-colors flex flex-col justify-between gap-4 shadow-xs"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                      CALENDAR INVITE
                    </span>
                    <h3 className="heading-2xs mt-2 text-black font-bold">
                      Request Google Meet / Zoom Slot
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1">
                      {BRAND_INFO.emailPrimary}
                    </p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-black font-semibold">
                    Send Calendar Request →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
