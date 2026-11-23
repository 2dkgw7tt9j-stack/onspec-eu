"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AUTOMATION_MODULES,
  AutomationModule,
  CONNECTED_PLATFORMS_MATRIX,
} from "@/data/onspec-data";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const MODULE_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
];

export default function AutomatePage() {
  const [activePlatformId, setActivePlatformId] = useState(
    CONNECTED_PLATFORMS_MATRIX[0].id
  );
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [modalModule, setModalModule] = useState<AutomationModule | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    AUTOMATION_MODULES[0].title,
    AUTOMATION_MODULES[1].title,
  ]);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const activePlatform =
    CONNECTED_PLATFORMS_MATRIX.find((p) => p.id === activePlatformId) ||
    CONNECTED_PLATFORMS_MATRIX[0];

  const toggleModuleSelection = (title: string) => {
    setSelectedModules((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "02_AUTOMATE",
      name: name || "Automation Audit Request",
      email,
      whatsapp,
      automationModules: selectedModules,
      message: `Requested AI & Business Automation Audit for modules: ${selectedModules.join(", ")}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  // Top 3 modules for the .c-tile-feature carousel
  const carouselModules = AUTOMATION_MODULES.slice(0, 4);
  // Next 3 modules for the .c-timeline (CampQuiet equivalent)
  const timelineModules = AUTOMATION_MODULES.slice(0, 3);
  // Next 3 modules for the 3-column .c-tile-info grid (Atlas App equivalent)
  const gridInfoModules = AUTOMATION_MODULES.slice(3, 6);
  // Final 4 modules for the .c-tile-info -horizontal list (AeroHub equivalent)
  const horizontalInfoModules = AUTOMATION_MODULES.slice(6, 10);

  return (
    <main className="bg-[#F7F8FA] text-[#101D35]">
      {/* Section 1: Full-Bleed .c-hero-visual Hero (1:1 technology.html) */}
      <div className="c-hero-visual">
        <div
          className="c-hero-visual_inner"
          style={{
            opacity: 1,
            clipPath: "inset(0 round var(--radius-md))",
          }}
        >
          <div className="c-hero-visual_background">
            <div className="c-image c-hero-visual_image -cover -overlay -lazy-load is-loaded h-full w-full">
              <picture className="c-image_inner h-full w-full block">
                <img
                  alt="PILLAR 02 — AUTOMATE: AI & Business Automation Systems"
                  className="c-image_img is-loaded h-full w-full object-cover"
                  height={1400}
                  width={2000}
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85"
                />
              </picture>
            </div>
          </div>

          <h1
            className="c-hero-visual_title text-heading-xl"
            id="page-heading"
          >
            <span className="sr-only">
              Smarter Systems. Zero Manual Bottlenecks.
            </span>
            <div
              aria-hidden="true"
              className="c-split-text c-hero-visual_title_line"
            >
              Smarter Systems
            </div>
            <div
              aria-hidden="true"
              className="c-split-text c-hero-visual_title_line"
            >
              for What&apos;s Ahead
            </div>
          </h1>

          <div className="c-hero-visual_bottom flex items-end justify-between text-xs font-mono uppercase tracking-widest text-white/85 z-10">
            <span>PILLAR 02 // AI &amp; BUSINESS AUTOMATION</span>
            <span>10 PRODUCTION AI MODULES • 24/7 AUTONOMOUS OPS</span>
          </div>
        </div>
      </div>

      {/* Section 2: Lead Editorial Statement (1:1 technology.html) */}
      <section className="container-xl mb-fluid-xl mt-fluid-xl">
        <div className="container-xl">
          <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest mb-4">
            CORE MESSAGE // PILLAR 02 — AUTOMATE
          </p>
          <p className="text-heading-2xl max-w-[1040px] text-[#101D35]">
            &ldquo;Your business doesn&apos;t need more manual work. It needs smarter systems.&rdquo; From 24/7 multilingual AI customer support and official WhatsApp Business automation to autonomous booking assistants, CRM pipelines, and OCR invoice workflows — we engineer systems that save hours every single day.
          </p>
        </div>
      </section>

      {/* Section 3: Rotating .c-symbol Twin-Star Intro (1:1 technology.html) */}
      <div className="my-fluid-3xl">
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

      {/* Section 4: .c-push-image Interactive Workflow Showcase (WhatsApp, Email, Websites, CRM, Booking, ERP) */}
      <section className="my-fluid-2xl">
        <div className="container">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-[#253B5B]">
              CONNECTED NERVOUS SYSTEM
            </p>
            <h2 className="sr-only">
              Built to Synchronize. Designed to Scale.
            </h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-[#101D35]"
            >
              Built to Synchronize. Designed to Scale.
            </div>
          </div>
        </div>

        <div className="mt-fluid-3xl flex flex-col gap-y-fluid-xl">
          {/* First .c-push-image: Interactive 6-Platform Synchronization Hub */}
          <div className="c-push-image container">
            <div className="c-push-image_content">
              <p className="text-eyebrow text-[#27B58A]">
                CROSS-PLATFORM ORCHESTRATION
              </p>
              <h3 className="sr-only">
                WhatsApp, Email, Websites, CRM, Booking &amp; ERP in One Loop.
              </h3>
              <div
                aria-hidden="true"
                className="c-split-text heading-sm text-[#101D35]"
              >
                WhatsApp, Email, Websites, CRM, Booking &amp; ERP in One Loop.
              </div>
              <p className="text-md text-[#253B5B]">
                Select any platform node to inspect how Onspec bridges your customer channels and back-office tools with sub-second bi-directional data sync.
              </p>

              {/* Interactive Node Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {CONNECTED_PLATFORMS_MATRIX.map((node) => {
                  const active = node.id === activePlatformId;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActivePlatformId(node.id)}
                      className={`rounded-full px-3.5 py-2 text-xs font-mono transition-all cursor-pointer border ${
                        active
                          ? "bg-[#101D35] text-[#27B58A] border-[#101D35] font-semibold"
                          : "bg-white text-[#101D35] border-[#A8B1BE]/50 hover:border-[#101D35]"
                      }`}
                    >
                      {node.code} // {node.name.split(" (")[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="c-push-image_visual">
              <div className="h-full w-full rounded-[16px] bg-[#101D35] text-[#F7F8FA] p-6 md:p-10 flex flex-col justify-between border border-[#253B5B]">
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/20 pb-4">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    <span className="h-2 w-2 rounded-full bg-[#27B58A] animate-pulse" />
                    ACTIVE NODE // {activePlatform.code}
                  </span>
                  <span className="font-mono text-xs text-[#A8B1BE]">
                    LATENCY: {activePlatform.latency}
                  </span>
                </div>

                <div className="my-6 space-y-4">
                  <h4 className="heading-xs text-white">
                    {activePlatform.name}
                  </h4>
                  <p className="text-md text-[#A8B1BE]">
                    {activePlatform.role}
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="rounded-xl bg-[#253B5B]/50 border border-[#A8B1BE]/20 p-3.5">
                      <span className="font-mono text-[10px] uppercase text-[#27B58A]">
                        01 // INBOUND TRIGGER
                      </span>
                      <p className="text-xs text-white mt-1">
                        Webhook event captured &amp; classified by AI intent router
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#253B5B]/50 border border-[#A8B1BE]/20 p-3.5">
                      <span className="font-mono text-[10px] uppercase text-[#27B58A]">
                        02 // AI PROCESSING
                      </span>
                      <p className="text-xs text-white mt-1">
                        Verifies business rules, live availability &amp; customer record
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#253B5B]/50 border border-[#A8B1BE]/20 p-3.5">
                      <span className="font-mono text-[10px] uppercase text-[#27B58A]">
                        03 // MULTI-SYSTEM SYNC
                      </span>
                      <p className="text-xs text-white mt-1">
                        Updates CRM, calendar, invoice &amp; customer thread
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#A8B1BE]/20 pt-4 flex items-center justify-between text-xs text-[#A8B1BE]">
                  <span>Connected across all 6 business layers</span>
                  <a
                    href="#automation-audit-form"
                    className="text-[#27B58A] font-mono uppercase tracking-wider hover:underline"
                  >
                    Request Integration Blueprint →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second .c-push-image: 24/7 Conversational AI & WhatsApp Pipeline */}
          <div className="c-push-image container">
            <div className="c-push-image_content">
              <p className="text-eyebrow text-[#27B58A]">
                ALWAYS-ON CUSTOMER OPERATIONS
              </p>
              <h3 className="sr-only">
                Respond in 4 Seconds. Qualify &amp; Book While You Sleep.
              </h3>
              <div
                aria-hidden="true"
                className="c-split-text heading-sm text-[#101D35]"
              >
                Respond in 4 Seconds. Qualify &amp; Book While You Sleep.
              </div>
              <p className="text-md text-[#253B5B]">
                Most businesses lose high-intent enquiries because nobody replied within 15 minutes. Our AI agents and WhatsApp Business workflows answer questions in English, Greek, Russian, German, and 20+ languages, send brochures, and lock in calendar bookings 24/7.
              </p>
            </div>
            <div className="c-push-image_visual">
              <div className="c-image -rounded-md -cover -parallax -lazy-load is-loaded h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="WhatsApp & AI Customer Support Automation"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1000}
                    width={1600}
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Lightship .c-carousel (.c-tile-feature Cards with + Modal Triggers, 1:1 technology.html) */}
      <section className="my-fluid-2xl">
        <section className="flex flex-col gap-y-fluid-xl overflow-hidden">
          <div className="container">
            <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
              <p className="text-eyebrow text-[#27B58A]">
                CUSTOMER-FACING AI ENGINE
              </p>
              <h2 className="sr-only">
                Convert Every Conversation Automatically
              </h2>
              <div
                aria-hidden="true"
                className="c-split-text anim-text-balance heading-xl text-[#101D35]"
              >
                Convert Every Conversation Automatically
              </div>
            </div>
          </div>

          <div className="c-carousel" data-items-per-view="2">
            <div
              className="c-carousel_container flex gap-4 px-[var(--grid-margin)] overflow-x-auto pb-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {carouselModules.map((mod, idx) => (
                <div
                  key={mod.id}
                  className="c-carousel_item @container shrink-0 w-[85vw] md:w-[46vw]"
                >
                  <article className="c-tile-feature">
                    <div className="c-image c-tile-feature_image -cover -rounded-md -overlay -lazy-load is-loaded h-full w-full">
                      <picture className="c-image_inner h-full w-full block">
                        <img
                          alt={mod.title}
                          className="c-image_img is-loaded h-full w-full object-cover"
                          height={740}
                          width={1184}
                          src={MODULE_IMAGES[idx]}
                        />
                      </picture>
                    </div>
                    <div className="c-tile-feature_inner">
                      <div className="c-tile-feature_content">
                        <p className="c-tile-feature_label text-eyebrow text-[#27B58A]">
                          {mod.code} • {mod.efficiencyMetric}
                        </p>
                        <h3 className="c-tile-feature_title heading-xs">
                          {mod.title} — {mod.tagline}
                        </h3>
                      </div>
                      <button
                        type="button"
                        aria-label={`Inspect ${mod.title}`}
                        onClick={() => setModalModule(mod)}
                        className="c-button -icon -blur-dark c-tile-feature_button cursor-pointer"
                      >
                        <span className="c-button_inner">
                          <span className="c-icon c-button_icon">
                            <svg
                              aria-hidden="true"
                              className="svg-plus"
                              focusable="false"
                            >
                              <use href="/assets/svgs/sprite.svg#plus" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div className="c-carousel_controls container">
              <nav className="c-carousel_nav">
                <button
                  type="button"
                  onClick={() =>
                    setCarouselIdx(
                      (carouselIdx - 1 + carouselModules.length) %
                        carouselModules.length
                    )
                  }
                  className="c-button -icon -color-grey cursor-pointer"
                >
                  <span className="c-button_inner">
                    <span className="c-icon c-button_icon">
                      <svg
                        aria-hidden="true"
                        className="svg-arrow-left"
                        focusable="false"
                      >
                        <use href="/assets/svgs/sprite.svg#arrow-left" />
                      </svg>
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCarouselIdx((carouselIdx + 1) % carouselModules.length)
                  }
                  className="c-button -icon -color-grey cursor-pointer"
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
                </button>
              </nav>
            </div>
          </div>
        </section>
      </section>

      {/* Section 6: Lightship .c-timeline + .c-tile-card + 10-Module Breakdown (1:1 technology.html CampQuiet section) */}
      <section className="my-fluid-2xl">
        <div className="relative pattern-background pb-fluid-md md:pb-fluid-2xl pt-fluid-2xl background-clip container rounded-[20px] border border-[#A8B1BE]/30">
          <div className="flex flex-col gap-y-fluid-2xl">
            <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
              <p className="text-eyebrow text-[#27B58A]">
                AUTONOMOUS WORKFLOW PIPELINE
              </p>
              <h2 className="sr-only">Efficiency Comes Standard</h2>
              <div
                aria-hidden="true"
                className="c-split-text anim-text-balance heading-xl text-[#101D35]"
              >
                Efficiency Comes Standard
              </div>
            </div>

            {/* Lightship .c-timeline with pulsing rings and .c-tile-card tiles */}
            <ul className="c-timeline">
              {timelineModules.map((mod, idx) => {
                const iconId =
                  idx === 0 ? "sun" : idx === 1 ? "power" : "appliances";
                return (
                  <li key={mod.id} className="c-timeline_item is-inview">
                    <div className="c-timeline_visual">
                      <div className="c-timeline_visual_inner">
                        <div className="c-timeline_icon">
                          <div className="c-timeline_pulse">
                            <i
                              style={{ "--index": 1 } as React.CSSProperties}
                            />
                            <i
                              style={{ "--index": 2 } as React.CSSProperties}
                            />
                            <i
                              style={{ "--index": 3 } as React.CSSProperties}
                            />
                            <i
                              style={{ "--index": 4 } as React.CSSProperties}
                            />
                          </div>
                          <span className="c-icon">
                            <svg
                              aria-hidden="true"
                              className={`svg-${iconId}`}
                              focusable="false"
                            >
                              <use href={`/assets/svgs/sprite.svg#${iconId}`} />
                            </svg>
                          </span>
                        </div>
                        <div className="c-timeline_connection">
                          <span className="c-icon -base c-timeline_svg">
                            <svg
                              aria-hidden="true"
                              className="svg-timeline-connection"
                              focusable="false"
                            >
                              <use href="/assets/svgs/sprite.svg#timeline-connection" />
                            </svg>
                          </span>
                          <span className="c-icon -animated c-timeline_svg">
                            <svg
                              aria-hidden="true"
                              className="svg-timeline-connection"
                              focusable="false"
                            >
                              <use href="/assets/svgs/sprite.svg#timeline-connection" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="c-timeline_inner">
                      <article className="c-tile-card -default c-timeline_tile">
                        <div className="c-tile-card_inner">
                          <h3 className="text-eyebrow text-[#27B58A]">
                            {mod.code} — {mod.title}
                          </h3>
                          <p className="text-heading-2xs text-[#101D35]">
                            {mod.tagline}
                          </p>
                          <p className="text-xs text-[#253B5B]">
                            <strong>Trigger:</strong> {mod.sampleTrigger} →{" "}
                            <strong>Action:</strong> {mod.sampleAction}
                          </p>
                        </div>
                        <div className="c-tile-card_image">
                          <div className="c-image -cover -rounded-sm -lazy-load is-loaded h-full w-full">
                            <picture className="c-image_inner h-full w-full block">
                              <img
                                alt={mod.title}
                                className="c-image_img is-loaded h-full w-full object-cover"
                                height={400}
                                width={600}
                                src={MODULE_IMAGES[idx]}
                              />
                            </picture>
                          </div>
                        </div>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 2-Column Hairline List of All 10 AI & Business Automation Services (1:1 technology.html lines 544-603) */}
            <div className="grid lg:grid-cols-2 gap-x-gutter gap-y-fluid-lg pt-8">
              <div>
                <p className="text-eyebrow text-[#27B58A] uppercase tracking-widest mb-3">
                  COMPLETE 10-MODULE CATALOG
                </p>
                <h3 className="sr-only">
                  The Engineered Ease of ONSPEC Automation
                </h3>
                <div
                  aria-hidden="true"
                  className="c-split-text text-heading-md max-w-[420px] anim-text-balance text-[#101D35]"
                >
                  The Engineered Ease of ONSPEC Automation
                </div>
                <p className="text-md text-[#253B5B] mt-4 max-w-md">
                  Every module is custom-configured to your existing software stack and business rules. Click any module to inspect its capabilities or add it to your free automation audit.
                </p>
              </div>
              <ul className="flex flex-col gap-y-4">
                {AUTOMATION_MODULES.map((mod) => (
                  <li
                    key={mod.id}
                    className="border-t border-[#A8B1BE]/50 grid xs:grid-cols-2 gap-y-3 gap-x-gutter py-4 items-start"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#27B58A] block">
                        {mod.code}
                      </span>
                      <h4 className="text-eyebrow text-[#101D35] font-bold mt-0.5">
                        {mod.title}
                      </h4>
                      <span className="inline-block mt-1.5 rounded-full bg-[#101D35] px-2.5 py-0.5 font-mono text-[10px] text-[#27B58A]">
                        Saves ~{mod.timeSavedHoursPerWeek}h/wk •{" "}
                        {mod.efficiencyMetric}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-[#253B5B]">
                        {mod.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => setModalModule(mod)}
                        className="font-mono text-xs uppercase tracking-wider text-[#101D35] font-semibold hover:text-[#27B58A] cursor-pointer"
                      >
                        Inspect Technical Spec +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Lightship 3-Column .c-tile-info Grid (1:1 technology.html Atlas App section) */}
      <section className="my-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-[#253B5B]">
              CRM, BOOKING &amp; INTAKE PIPELINES
            </p>
            <h2 className="sr-only">All Operations, at Your Fingertips</h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-[#101D35]"
            >
              All Operations, at Your Fingertips
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <ul className="grid md:grid-cols-3 gap-x-4 gap-y-12">
              {gridInfoModules.map((mod, idx) => (
                <li key={mod.id} className="@container">
                  <article className="c-tile-info">
                    <div className="c-tile-info_visual">
                      <div className="c-image c-tile-info_image -cover -rounded-md -lazy-load is-loaded h-full w-full">
                        <picture className="c-image_inner h-full w-full block">
                          <img
                            alt={mod.title}
                            className="c-image_img is-loaded h-full w-full object-cover"
                            height={400}
                            width={600}
                            src={MODULE_IMAGES[idx + 3]}
                          />
                        </picture>
                      </div>
                    </div>
                    <div className="c-tile-info_inner">
                      <h3 className="text-eyebrow text-[#27B58A]">
                        {mod.code} // {mod.title}
                      </h3>
                      <p className="text-heading-xs text-[#101D35] mt-1">
                        {mod.tagline}
                      </p>
                      <p className="text-xs text-[#253B5B] mt-2">
                        Connected: {mod.connectedPlatforms.join(" • ")}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: Lightship .c-tile-info -horizontal Split Section (1:1 technology.html AeroHub section) */}
      <section className="my-fluid-2xl">
        <div className="container grid md:grid-cols-12 gap-x-gutter gap-y-fluid-md">
          <div className="col-start-1 md:col-end-6 flex flex-col gap-y-6 max-w-[360px]">
            <p className="text-eyebrow text-[#27B58A]">
              FINANCE, ADMIN &amp; INFRASTRUCTURE
            </p>
            <h2 className="sr-only">Where AI Meets Back-Office Precision.</h2>
            <div
              aria-hidden="true"
              className="c-split-text text-heading-sm text-[#101D35]"
            >
              Where AI Meets Back-Office Precision.
            </div>
            <p className="text-md mt-2 text-[#253B5B]">
              Beyond customer chat and bookings, Onspec automates the internal backbone of your company: onboarding checklists, OCR invoice extraction, supplier purchase orders, and custom API integrations.
            </p>
          </div>

          <div className="md:col-start-6 md:col-end-13">
            <ul className="flex flex-col gap-y-5">
              {horizontalInfoModules.map((mod, idx) => (
                <li key={mod.id} className="@container">
                  <article className="c-tile-info -horizontal">
                    <div className="c-tile-info_visual">
                      <div className="c-image c-tile-info_image -cover -rounded-sm -lazy-load is-loaded h-full w-full">
                        <picture className="c-image_inner h-full w-full block">
                          <img
                            alt={mod.title}
                            className="c-image_img is-loaded h-full w-full object-cover"
                            height={400}
                            width={600}
                            src={MODULE_IMAGES[idx + 6]}
                          />
                        </picture>
                      </div>
                    </div>
                    <div className="c-tile-info_inner">
                      <h3 className="text-eyebrow text-[#27B58A]">
                        {mod.code} — {mod.title}
                      </h3>
                      <p className="text-heading-xs text-[#101D35]">
                        {mod.tagline}
                      </p>
                      <p className="text-xs text-[#253B5B] mt-1">
                        {mod.efficiencyMetric} • Saves ~
                        {mod.timeSavedHoursPerWeek} hrs/week
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 9: Lightship .c-stacking-cards Section (1:1 technology.html lines 768-852) */}
      <section className="my-fluid-lg md:my-fluid-3xl">
        <div className="c-stacking-cards">
          <div className="c-stacking-cards_sticky_container">
            <div className="c-stacking-cards_heading container-xl">
              <div className="c-stacking-cards_heading_icon text-center">
                <h2 className="sr-only">AUTOMATE</h2>
                <div className="font-bold tracking-tighter text-[#101D35] leading-none select-none text-[16vw]">
                  AUTOMATE
                </div>
              </div>
            </div>
            <div className="c-stacking-cards_inner container">
              <ul className="c-stacking-cards_list">
                {AUTOMATION_MODULES.slice(0, 4).map((mod, idx) => (
                  <li
                    key={mod.id}
                    className="c-stacking-cards_item"
                    style={{ "--index": idx } as React.CSSProperties}
                  >
                    <div className="c-image c-stacking-cards_card_image -cover -lazy-load is-loaded h-full w-full relative">
                      <picture className="c-image_inner h-full w-full block">
                        <img
                          alt={mod.title}
                          className="c-image_img is-loaded h-full w-full object-cover"
                          height={1000}
                          width={1200}
                          src={MODULE_IMAGES[idx]}
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101D35]/90 via-[#101D35]/30 to-transparent" />
                    </div>
                    <div className="c-stacking-cards_card_content z-10 text-white">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                        {mod.code}
                      </span>
                      <p className="heading-md max-w-[20rem] text-white">
                        {mod.title}
                      </p>
                      <p className="text-md max-w-[24rem] text-[#F7F8FA]/85">
                        {mod.tagline}
                      </p>
                      <a
                        className="c-button -blur-dark"
                        href="#automation-audit-form"
                      >
                        <span className="c-button_inner">
                          <span
                            className="c-button_label-container"
                            data-label="Deploy This System"
                          >
                            <span className="c-button_label">
                              Deploy This System
                            </span>
                          </span>
                        </span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="c-stacking-cards_column -left -align-top">
                <div className="c-stacking-cards_block">
                  <p className="text-eyebrow max-w-[15rem] text-[#101D35]">
                    Operations, Reimagined.
                  </p>
                  <p className="heading-2xs text-[#253B5B] max-w-[15rem] mt-2">
                    Replace repetitive admin, manual inbox sorting, and missed WhatsApp leads with deterministic AI pipelines.
                  </p>
                </div>
              </div>
              <div className="c-stacking-cards_column -right -align-center">
                <div className="c-stacking-cards_block">
                  <p className="text-eyebrow max-w-[15rem] text-[#101D35]">
                    Up to 78% Less Manual Work.
                  </p>
                  <p className="heading-2xs text-[#253B5B] max-w-[15rem] mt-2">
                    Integrated directly with your Website, WhatsApp Business API, CRM, Calendar, and Accounting systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Lightship .c-accordion Technical Specification Drawers for All 10 Services */}
      <section className="my-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-[#27B58A]">
              TECHNICAL SPECIFICATION DRAWERS
            </p>
            <h2 className="sr-only">
              10 AI &amp; Automation Module Specifications
            </h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-[#101D35]"
            >
              10 AI &amp; Automation Specifications
            </div>
          </div>

          <div className="md:grid md:grid-cols-12 gap-x-gutter">
            <div className="md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11">
              {AUTOMATION_MODULES.map((mod, idx) => (
                <div key={mod.id} className="c-accordion">
                  <details className="c-accordion_details" open={idx === 0}>
                    <summary className="c-accordion_summary text-md">
                      <span className="c-accordion_index text-lg font-mono text-[#27B58A]">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <p className="text-lg font-bold text-[#101D35] flex-1">
                        {mod.title}
                      </p>
                      <span className="font-mono text-xs text-[#253B5B] hidden sm:inline">
                        {mod.efficiencyMetric}
                      </span>
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
                      <div className="pt-6 pb-8 space-y-4">
                        <div className="c-wysiwyg text-[#253B5B]">
                          <p>{mod.description}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 rounded-xl bg-white p-5 border border-[#A8B1BE]/40">
                          <div>
                            <p className="font-mono text-xs uppercase tracking-wider text-[#101D35] font-semibold mb-2">
                              CAPABILITIES INCLUDED:
                            </p>
                            <ul className="space-y-1.5">
                              {mod.capabilities.map((cap) => (
                                <li
                                  key={cap}
                                  className="text-xs text-[#253B5B] flex items-start gap-2"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#27B58A] shrink-0" />
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="font-mono text-xs uppercase tracking-wider text-[#101D35] font-semibold">
                                CONNECTED PLATFORMS:
                              </p>
                              <p className="text-xs text-[#253B5B] mt-1">
                                {mod.connectedPlatforms.join(" • ")}
                              </p>
                            </div>
                            <div className="rounded-lg bg-[#F7F8FA] p-3 border border-[#A8B1BE]/30 text-xs">
                              <p className="text-[#253B5B]">
                                <strong>Sample Trigger:</strong>{" "}
                                {mod.sampleTrigger}
                              </p>
                              <p className="text-[#101D35] mt-1">
                                <strong>Autonomous Action:</strong>{" "}
                                {mod.sampleAction}
                              </p>
                            </div>
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

      {/* Section 11: Lightship .c-push-newsletter Consultation & Automation Audit Request Card */}
      <section id="automation-audit-form" className="my-fluid-2xl">
        <section className="c-push-newsletter pattern-background background-clip container rounded-[20px] border border-[#A8B1BE]/35">
          <div className="c-push-newsletter_content !max-w-xl !w-full">
            <div className="c-push-newsletter_heading">
              <p className="text-eyebrow text-[#27B58A]">
                FREE AI &amp; WORKFLOW AUTOMATION AUDIT
              </p>
              <h2 className="heading-sm text-[#101D35]">
                Select the workflows you want to automate and receive a tailored system architecture &amp; quotation.
              </h2>
            </div>

            {referenceId ? (
              <div className="rounded-2xl bg-white border border-[#27B58A] p-6 space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                  AUTOMATION AUDIT REGISTERED // {referenceId}
                </p>
                <p className="text-sm text-[#253B5B]">
                  Our AI Systems Architects have logged your selected modules (
                  <strong>{selectedModules.join(", ")}</strong>) and will reach out to{" "}
                  <strong>{email}</strong> / WhatsApp (
                  <strong>{whatsapp}</strong>).
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {AUTOMATION_MODULES.map((m) => {
                    const active = selectedModules.includes(m.title);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleModuleSelection(m.title)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-mono transition-colors cursor-pointer border ${
                          active
                            ? "bg-[#101D35] text-[#27B58A] border-[#101D35] font-semibold"
                            : "bg-white text-[#101D35] border-[#A8B1BE]/50 hover:border-[#101D35]"
                        }`}
                      >
                        {active ? "✓ " : "+ "}
                        {m.title}
                      </button>
                    );
                  })}
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
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp (+357...) *"
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.eu *"
                    className="w-full rounded-full border border-[#A8B1BE]/60 bg-white px-4 py-3 text-xs text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                  />
                </div>

                <button
                  className="c-button primary cursor-pointer"
                  type="submit"
                  disabled={submitting}
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
                          ? "Registering..."
                          : "Request AI Automation Proposal"
                      }
                    >
                      <span className="c-button_label font-semibold">
                        {submitting
                          ? "Registering..."
                          : "Request AI Automation Proposal"}
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
                    alt="ONSPEC AI Automation Systems"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1700}
                    width={1320}
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1320&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Lightship Feature Modal for Automation Modules */}
      <div
        className={`modal c-modal-feature ${modalModule ? "is-active" : ""}`}
        aria-hidden={!modalModule}
      >
        {modalModule && (
          <div className="modal_container">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setModalModule(null)}
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
            <div className="modal_inner c-wysiwyg p-8 md:p-14">
              <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                {modalModule.code} // {modalModule.category}
              </span>
              <h2 className="heading-lg mt-2">{modalModule.title}</h2>
              <p className="text-lg text-[#253B5B] mt-3">
                {modalModule.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="rounded-2xl bg-[#F7F8FA] p-6 border border-[#A8B1BE]/40">
                  <h3 className="heading-2xs text-[#101D35] mb-3">
                    Production Capabilities
                  </h3>
                  <ul className="space-y-2">
                    {modalModule.capabilities.map((c) => (
                      <li key={c} className="text-sm text-[#253B5B]">
                        • {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-[#101D35] text-white p-6 space-y-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    BENCHMARK PERFORMANCE
                  </p>
                  <p className="heading-sm text-white">
                    {modalModule.efficiencyMetric}
                  </p>
                  <p className="text-xs text-[#A8B1BE]">
                    Average Time Saved: ~{modalModule.timeSavedHoursPerWeek}{" "}
                    hours / week
                  </p>
                  <a
                    href="#automation-audit-form"
                    onClick={() => setModalModule(null)}
                    className="c-button -color-white inline-flex"
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label="Request Integration Quote"
                      >
                        <span className="c-button_label">
                          Request Integration Quote
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
