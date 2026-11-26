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
    code: "01 // LAUNCH",
    label: "Ready Businesses Business",
    desc: "Smart Vending, Coffee Stations, Kiosks, Laundromats, Car Wash, Ecommerce",
  },
  {
    value: "02_AUTOMATE",
    code: "02 // AUTOMATE",
    label: "AI & Business Automation",
    desc: "AI Support Agents, WhatsApp API, Booking, CRM, Invoicing & Integrations",
  },
  {
    value: "03_INNOVATE",
    code: "03 // INNOVATE",
    label: "Submit Your Idea (Free Proposal)",
    desc: "Custom business concept feasibility & free preliminary quotation",
  },
  {
    value: "04_CONNECT",
    code: "04 // CONNECT",
    label: "Cyprus Legal & Professional Network",
    desc: "Independent counsel for Immigration, Residency, Corporate & Criminal Law",
  },
  {
    value: "GENERAL",
    code: "00 // GENERAL",
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
    <main className="bg-[#F7F8FA] text-[#101D35]">
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
            {/* Dark Deep Navy Architectural Overlay with Direct Desk Triggers */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/45 to-[#101D35]/20 flex flex-col justify-between p-8 text-[#F7F8FA]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#101D35]/80 backdrop-blur-md border border-[#A8B1BE]/30 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#F7F8FA]">
                  <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                  CYPRUS &amp; EU OPERATIONS DESK
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#A8B1BE]">
                  {BRAND_INFO.domain}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
                    {BRAND_INFO.descriptor}
                  </p>
                  <h2 className="heading-sm mt-2 text-white">
                    {BRAND_INFO.slogan}
                  </h2>
                  <p className="text-sm text-[#A8B1BE] mt-2 max-w-md">
                    From launching a turnkey physical or digital business in Cyprus to deploying 24/7 AI automation systems or connecting with independent legal counsel.
                  </p>
                </div>

                {/* Direct Trigger Cards inside Left Sticky Visual */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={`mailto:${BRAND_INFO.emailPrimary}`}
                    className="rounded-xl bg-[#101D35]/85 backdrop-blur-md border border-[#A8B1BE]/30 p-4 hover:border-[#27B58A] transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#A8B1BE]">
                      DIRECT EMAIL DESK
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {BRAND_INFO.emailPrimary}
                    </p>
                    <p className="mt-0.5 text-xs text-[#27B58A]">
                      {BRAND_INFO.emailSecondary} →
                    </p>
                  </a>
                  <a
                    href={BRAND_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#101D35]/85 backdrop-blur-md border border-[#A8B1BE]/30 p-4 hover:border-[#27B58A] transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#A8B1BE]">
                      DIRECT WHATSAPP
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {BRAND_INFO.whatsappDisplay}
                    </p>
                    <p className="mt-0.5 text-xs text-[#27B58A]">
                      Instant Executive Chat →
                    </p>
                  </a>
                </div>

                <div className="border-t border-[#A8B1BE]/25 pt-4 flex items-center justify-between text-xs text-[#A8B1BE]">
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
                <span className="text-[#101D35]/45">We&apos;re here to help.</span>
                <br />
                <span className="text-[#101D35]">Every step of the way.</span>
                <br />
              </h1>
              <p className="text-md pt-5 text-[#253B5B]">
                Questions, curiosities, or ready to execute? Whether you want to launch a turnkey business, automate your existing operations, submit a new concept for a free preliminary proposal, or connect with vetted Cyprus legal professionals, our team is ready.
              </p>

              {/* Direct Call / WhatsApp / Email Quick Triggers matching Lightship .c-button */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(true)}
                  className="c-button cursor-pointer"
                  style={{
                    backgroundColor: "#27B58A",
                    color: "#101D35",
                  }}
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Schedule Discovery Call"
                    >
                      <span className="c-button_label font-semibold">
                        Schedule Discovery Call
                      </span>
                    </span>
                  </span>
                </button>

                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-button -color-black"
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="WhatsApp Desk"
                    >
                      <span className="c-button_label">WhatsApp Desk</span>
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${BRAND_INFO.emailPrimary}`}
                  className="c-button -color-grey"
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="info@onspec.eu"
                    >
                      <span className="c-button_label">
                        {BRAND_INFO.emailPrimary}
                      </span>
                    </span>
                  </span>
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
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#27B58A]/15 text-[#27B58A]">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 16 16">
                    <use href="/assets/svgs/sprite.svg#checkmark" />
                  </svg>
                </div>
                <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
                  ENQUIRY REGISTERED // ONSPEC DESK
                </p>
                <h2 className="heading-sm text-[#101D35]">
                  Reference ID: {referenceId}
                </h2>
                <p className="text-md text-[#253B5B] max-w-md mx-auto">
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
                  <p className="text-eyebrow text-[#253B5B] uppercase tracking-widest">
                    DIRECT SPECIFICATION &amp; ADVISORY INTAKE
                  </p>
                  <h2 className="heading-xs mt-1 text-[#101D35]">
                    Select Your Pillar &amp; Share Your Objectives
                  </h2>
                </div>

                {/* Pillar Selector Pills */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B]">
                    01 // Select Execution Pillar *
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {PILLAR_OPTIONS.map((opt) => {
                      const active = pillar === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPillar(opt.value)}
                          className={`text-left rounded-2xl border px-4 py-3 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            active
                              ? "border-[#27B58A] bg-[#101D35] text-[#F7F8FA]"
                              : "border-[#A8B1BE]/45 bg-[#F7F8FA] text-[#101D35] hover:border-[#253B5B]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-mono text-[11px] uppercase tracking-wider ${
                                  active ? "text-[#27B58A]" : "text-[#253B5B]"
                                }`}
                              >
                                {opt.code}
                              </span>
                              <span className="text-sm font-semibold">
                                {opt.label}
                              </span>
                            </div>
                            <p
                              className={`text-xs mt-0.5 ${
                                active ? "text-[#A8B1BE]" : "text-[#253B5B]/80"
                              }`}
                            >
                              {opt.desc}
                            </p>
                          </div>
                          <span
                            className={`h-4 w-4 shrink-0 rounded-full border flex items-center justify-center ${
                              active
                                ? "border-[#27B58A] bg-[#27B58A]"
                                : "border-[#A8B1BE]"
                            }`}
                          >
                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#101D35]" />
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
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B] mb-2">
                      Full Name *
                    </label>
                    <div className="c-input-text">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Andreas Georgiou"
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B] mb-2">
                      Email Address *
                    </label>
                    <div className="c-input-text">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.eu"
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B] mb-2">
                      WhatsApp / Phone *
                    </label>
                    <div className="c-input-text">
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+357 99 000 000"
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="c-input-text-container">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B] mb-2">
                      Target City / Jurisdiction
                    </label>
                    <div className="c-input-text">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-[#101D35] focus:border-[#27B58A] focus:outline-none"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B] mb-2">
                    Company Name (Optional)
                  </label>
                  <div className="c-input-text">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Existing business or new venture entity"
                      className="c-input-text_input text-sm w-full rounded-full border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="c-input-text-container">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#253B5B] mb-2">
                    How can ONSPEC execute for you? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us which turnkey business model, AI automation workflow, custom idea, or Cyprus legal referral you would like to discuss..."
                    className="text-sm w-full rounded-2xl border border-[#A8B1BE]/60 bg-[#F7F8FA] px-5 py-3.5 text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#253B5B]">
                    Direct response from our Cyprus executive desk within 24h.
                  </p>
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
                  className="rounded-2xl bg-white border border-[#A8B1BE]/40 p-5 hover:border-[#27B58A] transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#27B58A]">
                      {p.code}
                    </p>
                    <h3 className="text-base font-bold text-[#101D35] mt-1">
                      {p.shortTitle}
                    </h3>
                    <p className="text-xs text-[#253B5B] mt-1">
                      {p.coreMessage}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#101D35] font-semibold">
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
            <div className="max-w-xl mx-auto space-y-6 text-[#101D35]">
              <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
                ONSPEC EXECUTIVE BRIEFING // 15 MINUTE CALL
              </p>
              <h2 className="heading-md">
                Book a Direct Discovery Call with Our Cyprus Desk
              </h2>
              <p className="text-md text-[#253B5B]">
                Choose your preferred communication channel for an immediate 15 minute consultation on turnkey business launches, AI automation systems, custom venture buildouts, or Cyprus legal introductions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#101D35] text-white p-6 hover:bg-[#253B5B] transition-colors flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                      INSTANT CHANNEL
                    </span>
                    <h3 className="heading-2xs mt-2 text-white">
                      WhatsApp Video / Voice Briefing
                    </h3>
                    <p className="text-xs text-[#A8B1BE] mt-1">
                      {BRAND_INFO.whatsappDisplay}
                    </p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#27B58A]">
                    Launch WhatsApp Now →
                  </span>
                </a>
                <a
                  href={`mailto:${BRAND_INFO.emailPrimary}?subject=Discovery%20Call%20Request%20ONSPEC`}
                  className="rounded-2xl bg-[#F7F8FA] border border-[#A8B1BE]/50 text-[#101D35] p-6 hover:border-[#27B58A] transition-colors flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                      CALENDAR INVITE
                    </span>
                    <h3 className="heading-2xs mt-2 text-[#101D35]">
                      Request Google Meet / Zoom Slot
                    </h3>
                    <p className="text-xs text-[#253B5B] mt-1">
                      {BRAND_INFO.emailPrimary}
                    </p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#101D35] font-semibold">
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
