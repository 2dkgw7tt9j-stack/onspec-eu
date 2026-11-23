"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BRAND_INFO,
  LEGAL_NETWORK_CATEGORIES,
  LegalServiceCategory,
} from "@/data/onspec-data";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

export default function ConnectPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    LEGAL_NETWORK_CATEGORIES[0].title
  );
  const [activeMemberModal, setActiveMemberModal] =
    useState<LegalServiceCategory | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [urgency, setUrgency] = useState("Standard Consultation (24–48h)");
  const [matterSummary, setMatterSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "04_CONNECT",
      name,
      email,
      whatsapp,
      legalCategory: selectedCategory,
      message: `[Urgency: ${urgency}] ${matterSummary}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-[#F7F8FA] text-[#101D35]">
      <h1 className="sr-only">
        PILLAR 04 — CONNECT: Cyprus Legal &amp; Professional Services Network
      </h1>

      {/* Section 1: Lightship company.html Fade-In Editorial Lead + Rotating Twin-Star .c-symbol */}
      <section className="container pt-[24svh] md:pt-[32svh] mb-fluid-2xl" id="page-heading">
        <div className="max-w-[760px] m-auto text-center">
          <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest mb-6">
            PILLAR 04 // CONNECT — CYPRUS LEGAL &amp; PROFESSIONAL NETWORK
          </p>
          <div className="c-fadein-text text-heading-md">
            <div className="c-fadein-text_line is-active">
              <span
                className="c-fadein-text_line_inner"
                style={{ opacity: 1, transform: "translate(0)" }}
              >
                The right professionals. The right guidance.
              </span>
            </div>
            <div className="c-fadein-text_line is-active mt-2">
              <span
                className="c-fadein-text_line_inner"
                style={{ opacity: 1, transform: "translate(0)" }}
              >
                Without the hassle of finding them yourself.
              </span>
            </div>
            <div className="c-fadein-text_line is-active mt-4">
              <span
                className="c-fadein-text_line_inner text-[#253B5B] text-xl md:text-2xl font-normal"
                style={{ opacity: 1, transform: "translate(0)" }}
              >
                Through our vetted network in Cyprus, Onspec connects individuals, founders, and businesses directly with experienced independent legal professionals across immigration, residency, corporate, and criminal law.
              </span>
            </div>
          </div>
        </div>

        {/* Lightship Twin-Star .c-symbol */}
        <div className="my-fluid-2xl">
          <div
            className="c-symbol"
            style={{ "--smooth-progress": 1 } as React.CSSProperties}
          >
            <span className="c-icon c-symbol_icon text-[#101D35]">
              <svg aria-hidden="true" className="svg-symbol" focusable="false">
                <use href="/assets/svgs/sprite.svg#symbol" />
              </svg>
            </span>
            <span className="c-icon c-symbol_icon text-[#27B58A]">
              <svg aria-hidden="true" className="svg-symbol" focusable="false">
                <use href="/assets/svgs/sprite.svg#symbol" />
              </svg>
            </span>
          </div>
        </div>

        {/* Mandatory Compliance Disclaimer Banner */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-[#A8B1BE]/50 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#27B58A] font-semibold">
              INDEPENDENT PROFESSIONAL NETWORK NOTICE
            </span>
            <p className="text-xs text-[#253B5B] leading-relaxed">
              {BRAND_INFO.legalDisclaimer}
            </p>
          </div>
          <a
            href="#confidential-referral-form"
            className="c-button -color-black shrink-0"
          >
            <span className="c-button_inner">
              <span
                className="c-button_label-container"
                data-label="Request Referral"
              >
                <span className="c-button_label">Request Referral</span>
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* Section 2: Lightship company.html .c-bento-box 4-Cell Architectural Bento Grid */}
      <section className="mt-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-[#253B5B] uppercase tracking-widest">
              VETTED INDEPENDENT COUNSEL IN CYPRUS
            </p>
            <h2 className="sr-only">
              Trusted legal connections when clarity and speed matter most.
            </h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-[#101D35]"
            >
              Trusted legal connections when clarity and speed matter most.
            </div>
          </div>

          <div className="c-bento-box">
            {/* Bento Cell 1: Quote (Deep Navy / Emerald Statement) */}
            <div
              className="c-bento-box_quote c-bento-box_item"
              style={{ backgroundColor: "#101D35" }}
            >
              <div className="c-bento-box_quote_inner">
                <div className="c-bento-box_quote_header">
                  <span className="c-icon text-[#27B58A]">
                    <svg
                      aria-hidden="true"
                      className="svg-symbol-double"
                      focusable="false"
                    >
                      <use href="/assets/svgs/sprite.svg#symbol-double" />
                    </svg>
                  </span>
                  <p className="heading-xs text-white">
                    Whether you are relocating to Cyprus, incorporating a new turnkey venture, or requiring urgent legal representation, we connect you directly with vetted independent specialists.
                  </p>
                </div>
                <div className="c-bento-box_quote_footer">
                  <p className="text-md text-[#27B58A]">
                    Independent Cyprus Counsel
                  </p>
                  <p className="text-xs text-[#A8B1BE]">
                    Limassol • Nicosia • Larnaca • Paphos
                  </p>
                </div>
              </div>
            </div>

            {/* Bento Cell 2: Image */}
            <div className="c-bento-box_image c-bento-box_item">
              <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                <div className="c-image_parallax h-full w-full">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt="Cyprus Corporate & Legal District"
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={500}
                      width={780}
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=85"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Bento Cell 3: Rail */}
            <div className="c-bento-box_rail c-bento-box_item relative">
              <div className="c-bento-box_rail_image h-full w-full">
                <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                  <div className="c-image_parallax h-full w-full">
                    <picture className="c-image_inner h-full w-full block">
                      <img
                        alt="Cyprus Legal & Corporate Advisory"
                        className="c-image_img is-loaded h-full w-full object-cover"
                        height={1290}
                        width={1580}
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=85"
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D35]/90 via-[#101D35]/30 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 text-white heading-sm">
                  <span className="c-icon text-[#27B58A]">
                    <svg
                      aria-hidden="true"
                      className="svg-symbol"
                      focusable="false"
                    >
                      <use href="/assets/svgs/sprite.svg#symbol" />
                    </svg>
                  </span>
                  <span>Immigration • Residency • Corporate • Criminal Law</span>
                </div>
              </div>
            </div>

            {/* Bento Cell 4: Stats */}
            <div className="c-bento-box_stats c-bento-box_item">
              <div className="c-bento-box_stats_image">
                <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                  <div className="c-image_parallax h-full w-full">
                    <picture className="c-image_inner h-full w-full block">
                      <img
                        alt="Cyprus European Union Jurisdiction"
                        className="c-image_img is-loaded h-full w-full object-cover"
                        height={800}
                        width={1200}
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="c-bento-box_stats_inner bg-[#101D35]/80 backdrop-blur-md">
                <p className="text-heading-sm max-w-[440px] text-white">
                  Finding the right legal professional in Cyprus shouldn&apos;t mean cold-calling dozens of offices or guessing who specializes in your exact need.
                </p>
                <div className="c-bento-box_stats_bottom">
                  <p className="text-md max-w-[340px] text-[#F7F8FA]/85">
                    We assess your request confidentially and introduce you directly to an independent Cyprus legal professional experienced in your specific domain.
                  </p>
                  <ul className="c-bento-box_stats_list">
                    <li className="c-bento-box_stats_item">
                      <p className="text-heading-xl text-[#27B58A]">5</p>
                      <p className="text-xs max-w-[110px] opacity-80">
                        Core Cyprus Legal Practice Domains
                      </p>
                    </li>
                    <li className="c-bento-box_stats_item">
                      <p className="text-heading-xl text-white">24h</p>
                      <p className="text-xs max-w-[110px] opacity-80">
                        Direct Specialist Referral Turnaround
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Lightship company.html .c-accordion 5 Practice Area Drawers */}
      <section className="mt-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
              PRACTICE AREAS &amp; REFERRAL SPECIFICATIONS
            </p>
            <h2 className="sr-only">5 Cyprus Legal Practice Domains</h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-[#101D35]"
            >
              Cyprus Legal Practice Domains
            </div>
            <p className="text-md text-[#253B5B]">
              Click any practice domain below to inspect typical matters handled by independent legal professionals in our Cyprus network.
            </p>
          </div>

          <div className="md:grid md:grid-cols-12 gap-x-gutter">
            <div className="md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11">
              {LEGAL_NETWORK_CATEGORIES.map((cat, idx) => (
                <div key={cat.id} className="c-accordion">
                  <details
                    className="c-accordion_details"
                    open={idx === 0}
                  >
                    <summary className="c-accordion_summary text-md">
                      <span className="c-accordion_index text-lg font-mono text-[#27B58A]">
                        0{idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-[#101D35]">
                          {cat.title}
                        </p>
                        <p className="text-xs text-[#253B5B] mt-0.5">
                          {cat.subtitle}
                        </p>
                      </div>
                      <span className="c-icon c-accordion_icon">
                        <svg
                          aria-hidden="true"
                          className="svg-plus"
                          focusable="false"
                        >
                          <use href="/assets/svgs/sprite.svg#plus" />
                        </svg>
                      </span>
                    </summary>
                    <div>
                      <div className="pt-6 pb-8 space-y-6">
                        <div className="c-wysiwyg text-[#253B5B]">
                          <p>{cat.description}</p>
                        </div>

                        <div className="rounded-xl bg-white border border-[#A8B1BE]/40 p-5">
                          <p className="font-mono text-xs uppercase tracking-wider text-[#101D35] font-semibold mb-3">
                            TYPICAL MATTERS HANDLED BY INDEPENDENT COUNSEL:
                          </p>
                          <ul className="grid sm:grid-cols-2 gap-2.5">
                            {cat.typicalMatters.map((matter) => (
                              <li
                                key={matter}
                                className="flex items-start gap-2 text-xs text-[#253B5B]"
                              >
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#27B58A] shrink-0" />
                                <span>{matter}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <span className="font-mono text-xs text-[#253B5B]">
                            {cat.referralProcess}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveMemberModal(cat)}
                              className="c-button -color-grey cursor-pointer"
                            >
                              <span className="c-button_inner">
                                <span
                                  className="c-button_label-container"
                                  data-label="Inspect Referral Protocol"
                                >
                                  <span className="c-button_label">
                                    Inspect Referral Protocol
                                  </span>
                                </span>
                              </span>
                            </button>
                            <a
                              href="#confidential-referral-form"
                              onClick={() => setSelectedCategory(cat.title)}
                              className="c-button -color-black"
                            >
                              <span className="c-button_inner">
                                <span
                                  className="c-button_label-container"
                                  data-label={`Connect for ${cat.title}`}
                                >
                                  <span className="c-button_label">
                                    Connect for {cat.title}
                                  </span>
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Lightship company.html .c-push-image Split Block */}
      <section className="mt-fluid-2xl">
        <div className="c-push-image container">
          <div className="c-push-image_content">
            <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
              SEAMLESS CORPORATE &amp; LEGAL COORDINATION
            </p>
            <h3 className="sr-only">How Our Cyprus Legal Network Works</h3>
            <div
              aria-hidden="true"
              className="c-split-text heading-sm text-[#101D35]"
            >
              How Our Cyprus Legal Network Works
            </div>
            <p className="text-md text-[#253B5B]">
              1. Share your requirement confidentially via our referral desk or WhatsApp.
              <br />
              <br />
              2. Onspec identifies the independent licensed legal professional in Cyprus whose practice focuses specifically on your matter — whether corporate formation for a new turnkey business, residency permits, immigration, or criminal defense.
              <br />
              <br />
              3. You engage directly with the independent lawyer for formal legal advice and representation, with zero friction or wasted search time.
            </p>
          </div>
          <div className="c-push-image_visual">
            <div className="c-image -rounded-md -cover -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="Cyprus Legal Consultation & Corporate Setup"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1200}
                    width={1600}
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Confidential Cyprus Legal Referral Request Form (.c-push-newsletter pattern-background) */}
      <section id="confidential-referral-form" className="mt-fluid-2xl">
        <section className="c-push-newsletter pattern-background background-clip container rounded-[20px] border border-[#A8B1BE]/35">
          <div className="c-push-newsletter_content !max-w-xl !w-full">
            <div className="c-push-newsletter_heading">
              <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest">
                CONFIDENTIAL REFERRAL INTAKE // CYPRUS
              </p>
              <h2 className="heading-sm text-[#101D35]">
                Request an Introduction to an Independent Cyprus Legal Professional
              </h2>
              <p className="text-xs text-[#253B5B] mt-2">
                {BRAND_INFO.legalDisclaimer}
              </p>
            </div>

            {referenceId ? (
              <div className="rounded-2xl bg-white border border-[#27B58A] p-6 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                  CONFIDENTIAL REFERRAL LOGGED
                </p>
                <h3 className="heading-xs text-[#101D35]">
                  Reference ID: {referenceId}
                </h3>
                <p className="text-sm text-[#253B5B]">
                  Thank you, <strong>{name}</strong>. Your request for an introduction regarding{" "}
                  <strong>{selectedCategory}</strong> has been received. Our Cyprus coordination desk will match you with an independent legal specialist and contact you via{" "}
                  <strong>{email}</strong> / WhatsApp (
                  <strong>{whatsapp}</strong>).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReferenceId(null);
                    setMatterSummary("");
                  }}
                  className="c-button -color-black cursor-pointer"
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Submit Another Request"
                    >
                      <span className="c-button_label">
                        Submit Another Request
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs font-semibold text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  >
                    {LEGAL_NETWORK_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  >
                    <option value="Standard Consultation (24–48h)">
                      Standard Consultation (24–48h)
                    </option>
                    <option value="Priority / Urgent Matter (Same Day)">
                      Priority / Urgent Matter (Same Day)
                    </option>
                    <option value="Paired with New Business Launch">
                      Paired with New Business Launch
                    </option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com *"
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp (+357...) *"
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  value={matterSummary}
                  onChange={(e) => setMatterSummary(e.target.value)}
                  placeholder="Briefly describe the nature of your legal or corporate requirement in Cyprus (kept strictly confidential)..."
                  className="w-full rounded-2xl border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="c-button primary cursor-pointer"
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
                          ? "Connecting..."
                          : "Request Confidential Legal Introduction"
                      }
                    >
                      <span className="c-button_label font-semibold">
                        {submitting
                          ? "Connecting..."
                          : "Request Confidential Legal Introduction"}
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
              </form>
            )}
          </div>

          <div className="c-push-newsletter_image_container">
            <div className="c-image c-push-newsletter_image -rounded-md -cover -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="Independent Cyprus Legal Network"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1700}
                    width={1320}
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1320&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Section 6: Lightship company.html .c-tile-page Cross-Navigation Cards */}
      <section className="mt-fluid-2xl">
        <section className="container grid md:grid-cols-2 gap-x-gutter md:gap-y-fluid-2xl max-md:gap-y-gutter my-fluid-2xl">
          <article className="c-tile-page">
            <div className="c-image c-tile-page_image -cover -overlay -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="Launch a Ready-to-Run Business in Cyprus"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={750}
                    width={1200}
                    src="https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?auto=format&fit=crop&w=1200&q=85"
                  />
                </picture>
              </div>
            </div>
            <div className="c-tile-page_inner">
              <span className="c-icon">
                <svg
                  aria-hidden="true"
                  className="svg-symbol-double"
                  focusable="false"
                >
                  <use href="/assets/svgs/sprite.svg#symbol-double" />
                </svg>
              </span>
              <div className="c-tile-page_content">
                <h2 className="text-xl">
                  Launch a Turnkey Business in Cyprus
                </h2>
                <Link
                  className="absolute-link text-xl opacity-75"
                  href="/launch"
                >
                  Explore 7 Models →
                </Link>
              </div>
            </div>
          </article>

          <article className="c-tile-page">
            <div className="c-image c-tile-page_image -cover -overlay -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="AI & Business Automation"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={750}
                    width={1200}
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"
                  />
                </picture>
              </div>
            </div>
            <div className="c-tile-page_inner">
              <span className="c-icon">
                <svg
                  aria-hidden="true"
                  className="svg-symbol-double"
                  focusable="false"
                >
                  <use href="/assets/svgs/sprite.svg#symbol-double" />
                </svg>
              </span>
              <div className="c-tile-page_content">
                <h2 className="text-xl">
                  Automate Your Business with AI Systems
                </h2>
                <Link
                  className="absolute-link text-xl opacity-75"
                  href="/automate"
                >
                  Explore 10 AI Modules →
                </Link>
              </div>
            </div>
          </article>
        </section>
      </section>

      {/* Lightship .c-modal-member Practice Detail Modal (1:1 company.html) */}
      <div
        className={`c-modal-member modal ${
          activeMemberModal ? "is-active" : ""
        }`}
        aria-hidden={!activeMemberModal}
      >
        {activeMemberModal && (
          <div className="c-modal-member_container modal_container">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActiveMemberModal(null)}
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
            <div className="c-modal-member_inner modal_inner">
              <div className="flex flex-col gap-y-fluid-sm pt-2">
                <span className="c-icon text-[#27B58A]">
                  <svg
                    aria-hidden="true"
                    className="svg-symbol-double"
                    focusable="false"
                  >
                    <use href="/assets/svgs/sprite.svg#symbol-double" />
                  </svg>
                </span>
                <div className="max-w-[36rem]">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    {activeMemberModal.code}
                  </p>
                  <h2 className="heading-md mt-1">{activeMemberModal.title}</h2>
                  <p className="heading-xs opacity-50 mt-1">
                    {activeMemberModal.subtitle}
                  </p>
                </div>
              </div>
              <div className="c-modal-member_body">
                <div className="c-image c-modal-member_image -rounded-md -lazy-load is-loaded overflow-hidden">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt={activeMemberModal.title}
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={750}
                      width={600}
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=85"
                    />
                  </picture>
                </div>
                <div className="c-modal-member_content space-y-5">
                  <p className="text-md opacity-80 max-w-[28rem]">
                    {activeMemberModal.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#101D35] font-semibold">
                      REPRESENTATIVE MATTERS:
                    </p>
                    <ul className="space-y-1.5">
                      {activeMemberModal.typicalMatters.map((m) => (
                        <li key={m} className="text-xs text-[#253B5B]">
                          • {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#confidential-referral-form"
                    onClick={() => {
                      setSelectedCategory(activeMemberModal.title);
                      setActiveMemberModal(null);
                    }}
                    className="c-button -color-black"
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label="Request Referral in This Domain"
                      >
                        <span className="c-button_label">
                          Request Referral in This Domain
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
