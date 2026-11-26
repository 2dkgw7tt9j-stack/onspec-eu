"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BRAND_INFO,
  CUSTOMER_JOURNEY_STEPS,
  ECOSYSTEM_STAGES,
  PILLARS,
  PillarSpec,
  SCRATCH_VS_ONSPEC_COMPARISON,
} from "@/data/onspec-data";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const PILLAR_IMAGES: Record<string, string> = {
  launch:
    "https://images.unsplash.com/photo-1787499670012-359385f575e8?auto=format&fit=crop&w=900&q=85",
  automate:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
  innovate:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
  connect:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
};

export default function AboutPage() {
  const [activeJourneyIdx, setActiveJourneyIdx] = useState(0);
  const [selectedPillarModal, setSelectedPillarModal] =
    useState<PillarSpec | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const activeStep =
    CUSTOMER_JOURNEY_STEPS[activeJourneyIdx] || CUSTOMER_JOURNEY_STEPS[0];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "GENERAL",
      name: "About Page Executive Dossier Request",
      email,
      whatsapp,
      message: "Requested ONSPEC Corporate Profile & Four Pillar Ecosystem Dossier",
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-[#F7F8FA] text-black">
      <h1 className="sr-only">
        About ONSPEC ({BRAND_INFO.domain}) : {BRAND_INFO.slogan}
      </h1>

      {/* Section 1: Giant Editorial Statement */}
      <section
        className="container px-4 sm:px-6 pt-[16svh] md:pt-[24svh] mb-fluid-2xl"
        id="page-heading"
      >
        <div className="max-w-[740px] m-auto text-center">
          <p className="font-mono text-xs text-black uppercase tracking-widest mb-6 font-semibold">
            About Onspec • {BRAND_INFO.domain.toUpperCase()}
          </p>
          <div className="c-fadein-text text-heading-md" style={{ marginTop: "1rem" }}>
            <div className="c-fadein-text_line is-active">
              <span
                className="c-fadein-text_line_inner"
                style={{ opacity: 1, transform: "translate(0)" }}
              >
                Your vision. Our execution.
              </span>
            </div>
            <div className="c-fadein-text_line is-active mt-2">
              <span
                className="c-fadein-text_line_inner"
                style={{ opacity: 1, transform: "translate(0)" }}
              >
                We believe you shouldn&apos;t have to start from scratch to build or modernize a business.
              </span>
            </div>
            <div className="c-fadein-text_line is-active mt-4">
              <span
                className="c-fadein-text_line_inner text-neutral-600"
                style={{ opacity: 1, transform: "translate(0)" }}
              >
                Onspec bridges the gap between having an idea and turning it into a functioning, automated commercial operation across Cyprus and the European Union.
              </span>
            </div>
          </div>
        </div>

        <div className="my-fluid-2xl">
          <div
            className="c-symbol"
            style={{ "--smooth-progress": 1 } as React.CSSProperties}
          >
            
            
          </div>
        </div>
      </section>

      {/* Section 2: Lightship .c-company-intro-images Staggered Photo Grid (1:1 company.html) */}
      <section className="mt-fluid-2xl">
        <section className="c-company-intro-images mt-fluid-2xl">
          <div className="c-company-intro-images_container">
            <div className="c-company-intro-images_block">
              <div className="c-company-intro-images_image1">
                <div className="c-image -cover -rounded-md rounded-[10px] h-full -lazy-load is-loaded">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt="Turnkey Automated Retail Infrastructure"
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={600}
                      width={900}
                      src="https://images.unsplash.com/photo-1787499670012-359385f575e8?auto=format&fit=crop&w=900&q=85"
                    />
                  </picture>
                </div>
              </div>
              <div className="c-company-intro-images_image2">
                <div className="c-image -cover -rounded-md rounded-[10px] h-full -lazy-load is-loaded">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt="AI & Business Process Automation Systems"
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={467}
                      width={700}
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=85"
                    />
                  </picture>
                </div>
              </div>
            </div>
            <div className="c-company-intro-images_block2">
              <div className="c-company-intro-images_image3">
                <div className="c-image -cover -rounded-md rounded-[10px] h-full -lazy-load is-loaded">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt="ONSPEC Cyprus & EU Venture Execution Desk"
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={1500}
                      width={2000}
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Section 3: Lightship company.html 4-Column Portrait Cards for the 4 Pillars */}
      <section className="mt-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-2xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-black uppercase tracking-widest">
              FOUR PILLARS. ONE EXECUTION PARTNER.
            </p>
            <h2 className="sr-only">The Four Pillars of ONSPEC</h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-black"
            >
              The Four Pillars of ONSPEC
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-fluid-md">
            {PILLARS.map((pillar) => (
              <li key={pillar.id}>
                <div className="relative flex flex-col gap-y-5 group">
                  <div className="c-image -rounded-md aspect-4/5 -cover -lazy-load is-loaded overflow-hidden relative">
                    <picture className="c-image_inner h-full w-full block">
                      <img
                        alt={pillar.fullTitle}
                        className="c-image_img is-loaded h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        height={750}
                        width={600}
                        src={PILLAR_IMAGES[pillar.id]}
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-between p-5 text-white">
                      <span className="font-mono text-xs uppercase tracking-widest text-black">
                        {pillar.code}
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-[#A8B1BE]">
                          {pillar.telemetryMetric}
                        </p>
                        <p className="text-sm font-bold text-white">
                          {pillar.telemetryValue}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="body-sm font-bold text-black">
                      {pillar.index}. {pillar.shortTitle}
                    </p>
                    <p className="body-sm text-neutral-600">
                      {pillar.coreMessage}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPillarModal(pillar)}
                    className="absolute-link cursor-pointer"
                  >
                    <span className="sr-only">
                      Inspect {pillar.shortTitle}
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4: Lightship company.html .c-bento-box Four Pillar & Color Philosophy Showcase */}
      <section className="mt-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <h2 className="sr-only">
              We set out to simplify business creation... And built a complete operational ecosystem.
            </h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-black"
            >
              We set out to simplify business creation... And built a complete operational ecosystem.
            </div>
          </div>

          <div className="c-bento-box">
            {/* Quote Cell */}
            <div
              className="c-bento-box_quote c-bento-box_item"
              style={{ backgroundColor: "#000000" }}
            >
              <div className="c-bento-box_quote_inner">
                <div className="c-bento-box_quote_header">
                  <span className="c-icon text-black">
                    
                  </span>
                  <p className="heading-xs text-white">
                    From launching your own turnkey business to automating the one you already have, we make the complicated simple.
                  </p>
                </div>
                <div className="c-bento-box_quote_footer">
                  <p className="text-md text-black">{BRAND_INFO.name}</p>
                  <p className="text-xs text-[#A8B1BE]">
                    {BRAND_INFO.descriptor}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Cell */}
            <div className="c-bento-box_image c-bento-box_item">
              <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                <div className="c-image_parallax h-full w-full">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt="ONSPEC Architectural Execution"
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={500}
                      width={780}
                      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Rail Cell */}
            <div className="c-bento-box_rail c-bento-box_item relative">
              <div className="c-bento-box_rail_image h-full w-full">
                <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                  <div className="c-image_parallax h-full w-full">
                    <picture className="c-image_inner h-full w-full block">
                      <img
                        alt="Launch, Automate, Innovate, Connect"
                        className="c-image_img is-loaded h-full w-full object-cover"
                        height={1290}
                        width={1580}
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1580&q=85"
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 text-white heading-sm">
                  <span className="c-icon text-white">
                    
                  </span>
                  <span>01 Launch • 02 Automate • 03 Innovate • 04 Connect</span>
                </div>
              </div>
            </div>

            {/* Stats & Brand Identity Cell */}
            <div className="c-bento-box_stats c-bento-box_item">
              <div className="c-bento-box_stats_image">
                <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                  <div className="c-image_parallax h-full w-full">
                    <picture className="c-image_inner h-full w-full block">
                      <img
                        alt="ONSPEC Architectural Precision"
                        className="c-image_img is-loaded h-full w-full object-cover"
                        height={800}
                        width={1200}
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="c-bento-box_stats_inner bg-black/85 backdrop-blur-md">
                <p className="text-heading-sm max-w-[440px] text-white">
                  Engineered for modern entrepreneurs, investors, and established operators in Cyprus &amp; Europe.
                </p>
                <div className="c-bento-box_stats_bottom">
                  <p className="text-md max-w-[340px] text-[#F7F8FA]/85">
                    Our visual &amp; operational architecture balances Clean White clarity (#F7F8FA), Pure Black precision (#000000), Architectural Monochrome depth, Pure Black precision (#000000), and Silver Grey precision (#A8B1BE).
                  </p>
                  <ul className="c-bento-box_stats_list">
                    <li className="c-bento-box_stats_item">
                      <p className="text-heading-xl text-white">7</p>
                      <p className="text-xs max-w-[100px] opacity-75">
                        Turnkey Prefab Business Models
                      </p>
                    </li>
                    <li className="c-bento-box_stats_item">
                      <p className="text-heading-xl text-white">10</p>
                      <p className="text-xs max-w-[100px] opacity-75">
                        AI &amp; Workflow Automation Modules
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Interactive Six Step Customer Journey (Discovery -> Enquiry -> Assessment -> Proposal -> Execution -> Ongoing Support) */}
      <section id="customer-journey" className="mt-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-black uppercase tracking-widest">
              THE 6-STEP CUSTOMER JOURNEY
            </p>
            <h2 className="sr-only">From Discovery to Ongoing Support</h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-black"
            >
              From Discovery to Ongoing Support
            </div>
            <p className="text-md text-neutral-600">
              Select any stage in the 6-step protocol below to inspect how Onspec guides your project from first contact to long term operation.
            </p>
          </div>

          {/* Interactive Six Step Switcher Bar + Active Detail Card */}
          <div className="rounded-[20px] bg-white border border-[#A8B1BE]/45 p-6 md:p-10 space-y-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {CUSTOMER_JOURNEY_STEPS.map((step, idx) => {
                const active = idx === activeJourneyIdx;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveJourneyIdx(idx)}
                    className={`rounded-xl p-4 text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      active
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-[#F7F8FA] text-black border-[#A8B1BE]/40 hover:border-neutral-500"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold ${
                        active ? "text-white" : "text-neutral-600"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{step.title}</p>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          active ? "text-[#A8B1BE]" : "text-neutral-500"
                        }`}
                      >
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-black text-[#F7F8FA] p-6 md:p-10 grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-black">
                  {activeStep.code}
                </span>
                <h3 className="heading-sm text-white">
                  {activeStep.number}. {activeStep.title} , {" "}
                  <span className="text-[#A8B1BE]">{activeStep.subtitle}</span>
                </h3>
                <p className="text-md text-[#F7F8FA]/85 max-w-2xl">
                  {activeStep.description}
                </p>
              </div>
              <div className="md:col-span-4 rounded-xl bg-neutral-900/70 border border-[#A8B1BE]/25 p-5 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-black">
                  STAGE DELIVERABLE
                </span>
                <p className="text-base font-bold text-white">
                  {activeStep.deliverable}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#A8B1BE]">
                  <span>Step {activeJourneyIdx + 1} of 6</span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveJourneyIdx(
                        (activeJourneyIdx + 1) % CUSTOMER_JOURNEY_STEPS.length
                      )
                    }
                    className="text-black font-mono uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 7-Stage Long Term Business Ecosystem .c-accordion (1:1 company.html Values Accordion) */}
      <section className="mt-fluid-2xl">
        <div className="container flex flex-col gap-y-fluid-xl">
          <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
            <p className="text-eyebrow text-black uppercase tracking-widest">
              LONG-TERM BUSINESS ECOSYSTEM
            </p>
            <h2 className="sr-only">7-Stage Business Ecosystem</h2>
            <div
              aria-hidden="true"
              className="c-split-text anim-text-balance heading-xl text-black"
            >
              7-Stage Business Ecosystem
            </div>
            <p className="text-md text-neutral-600">
              A customer can start with a single ready to launch business or AI workflow and expand through every layer of the Onspec ecosystem.
            </p>
          </div>

          <div className="md:grid md:grid-cols-12 gap-x-gutter">
            <div className="md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11">
              {ECOSYSTEM_STAGES.map((stage, idx) => (
                <div key={stage.step} className="c-accordion">
                  <details className="c-accordion_details" open={idx === 0}>
                    <summary className="c-accordion_summary text-md">
                      <span className="c-accordion_index text-lg font-mono text-black">
                        {stage.step}
                      </span>
                      <p className="text-lg font-semibold text-black flex-1">
                        {stage.title}
                      </p>
                      <span className="font-mono text-xs uppercase tracking-wider text-neutral-600 hidden sm:inline">
                        {stage.pillarRef}
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
                      <div className="pt-6 pb-6">
                        <div className="c-wysiwyg text-neutral-600">
                          <p>{stage.description}</p>
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

      {/* Section 7: Lightship .c-push-image Split Block + Starting from Scratch vs ONSPEC */}
      <section className="mt-fluid-2xl">
        <div className="c-push-image container">
          <div className="c-push-image_content">
            <p className="text-eyebrow text-black uppercase tracking-widest">
              WHY FOUNDERS CHOOSE ONSPEC
            </p>
            <h3 className="sr-only">Starting From Scratch vs. ONSPEC</h3>
            <div
              aria-hidden="true"
              className="c-split-text heading-sm text-black"
            >
              Starting From Scratch vs. ONSPEC
            </div>
            <div className="space-y-4 pt-2">
              {SCRATCH_VS_ONSPEC_COMPARISON.map((item) => (
                <div
                  key={item.dimension}
                  className="border-t border-[#A8B1BE]/45 pt-3"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-black font-bold">
                    {item.dimension}
                  </p>
                  <p className="text-xs text-neutral-500 line-through mt-0.5">
                    Scratch: {item.scratch}
                  </p>
                  <p className="text-xs text-black font-medium mt-0.5">
                    <span className="text-black font-bold">ONSPEC:</span>{" "}
                    {item.onspec}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="c-push-image_visual">
            <div className="c-image -rounded-md -cover -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="ONSPEC Turnkey Operations"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1200}
                    width={1600}
                    src="https://images.unsplash.com/photo-1711632308710-f2e5bf722778?auto=format&fit=crop&w=1600&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Lightship company.html .c-tile-page Cross-Navigation Cards */}
      <section className="mt-fluid-2xl">
        <section className="container grid md:grid-cols-2 gap-x-gutter md:gap-y-fluid-2xl max-md:gap-y-gutter my-fluid-2xl">
          <article className="c-tile-page">
            <div className="c-image c-tile-page_image -cover -overlay -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="Explore Ready Businesses"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={750}
                    width={1200}
                    src="https://images.unsplash.com/photo-1787499670012-359385f575e8?auto=format&fit=crop&w=1200&q=85"
                  />
                </picture>
              </div>
            </div>
            <div className="c-tile-page_inner">
              <span className="c-icon">
                
              </span>
              <div className="c-tile-page_content">
                <h2 className="text-xl">
                  Explore Ready Automated Business Models
                </h2>
                <Link className="absolute-link text-xl opacity-75" href="/launch">
                  Explore Launch →
                </Link>
              </div>
            </div>
          </article>

          <article className="c-tile-page">
            <div className="c-image c-tile-page_image -cover -overlay -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="Submit Your Custom Idea"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={750}
                    width={1200}
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
                  />
                </picture>
              </div>
            </div>
            <div className="c-tile-page_inner">
              <span className="c-icon">
                
              </span>
              <div className="c-tile-page_content">
                <h2 className="text-xl">
                  Have Your Own Idea? Get a Free Preliminary Proposal
                </h2>
                <Link
                  className="absolute-link text-xl opacity-75"
                  href="/innovate"
                >
                  Submit Your Idea →
                </Link>
              </div>
            </div>
          </article>
        </section>
      </section>

      {/* Section 9: Lightship company.html .c-push-newsletter Lead Capture Card */}
      <section className="mt-fluid-2xl">
        <section className="c-push-newsletter pattern-background background-clip container">
          <div className="c-push-newsletter_content">
            <div className="c-push-newsletter_heading">
              <p className="text-eyebrow text-neutral-600">
                Want the complete ONSPEC 2026 Opportunity &amp; Automation Dossier?
              </p>
              <h2 className="heading-sm text-black">
                Turnkey Cyprus business specifications, AI workflow benchmarks, and execution timelines : delivered directly to your inbox.
              </h2>
            </div>

            {referenceId ? (
              <div className="rounded-2xl bg-white border border-black p-5 space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-black">
                  DOSSIER DISPATCH REGISTERED • REFERENCE {referenceId}
                </p>
                <p className="text-xs text-neutral-600">
                  Our Cyprus operations desk has logged your request for{" "}
                  <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <div className="c-newsletter">
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="c-newsletter_form"
                >
                  <div className="c-input-text-container c-newsletter_zip-code -placeholder">
                    <label
                      className="text-sm mb-3 sr-only"
                      htmlFor="aboutWhatsapp"
                    >
                      WhatsApp / Phone *
                    </label>
                    <div className="c-input-text">
                      <input
                        className="c-input-text_input text-sm"
                        id="aboutWhatsapp"
                        name="whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp (+357...)"
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="c-newsletter_inner">
                    <input
                      className="c-newsletter_input text-sm"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                    />
                    <button
                      className="c-button primary -color-black cursor-pointer"
                      type="submit"
                      disabled={submitting}
                    >
                      <span className="c-button_inner">
                        <span
                          className="c-button_label-container"
                          data-label={submitting ? "Sending..." : "Request Dossier"}
                        >
                          <span className="c-button_label">
                            {submitting ? "Sending..." : "Request Dossier"}
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
              </div>
            )}
          </div>
          <div className="c-push-newsletter_image_container">
            <div className="c-image c-push-newsletter_image -rounded-md -cover -parallax -lazy-load is-loaded h-full w-full">
              <div className="c-image_parallax h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="ONSPEC Dossier Preview"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1700}
                    width={1320}
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1320&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Lightship .c-modal-member Pillar Specification Modal (1:1 company.html) */}
      <div
        className={`c-modal-member modal ${
          selectedPillarModal ? "is-active" : ""
        }`}
        aria-hidden={!selectedPillarModal}
      >
        {selectedPillarModal && (
          <div className="c-modal-member_container modal_container">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelectedPillarModal(null)}
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
                <span className="c-icon text-black">
                  
                </span>
                <div className="max-w-[32rem]">
                  <p className="font-mono text-xs uppercase tracking-widest text-black">
                    {selectedPillarModal.code}
                  </p>
                  <h2 className="heading-md mt-1">
                    {selectedPillarModal.fullTitle}
                  </h2>
                  <p className="heading-xs opacity-50 mt-1">
                    {selectedPillarModal.coreMessage}
                  </p>
                </div>
              </div>
              <div className="c-modal-member_body">
                <div className="c-image c-modal-member_image -rounded-md -lazy-load is-loaded overflow-hidden">
                  <picture className="c-image_inner h-full w-full block">
                    <img
                      alt={selectedPillarModal.fullTitle}
                      className="c-image_img is-loaded h-full w-full object-cover"
                      height={750}
                      width={600}
                      src={PILLAR_IMAGES[selectedPillarModal.id]}
                    />
                  </picture>
                </div>
                <div className="c-modal-member_content space-y-5">
                  <p className="text-md opacity-80 max-w-[26rem]">
                    {selectedPillarModal.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-black font-semibold">
                      KEY DELIVERABLES:
                    </p>
                    <ul className="space-y-1.5">
                      {selectedPillarModal.deliverables.map((d) => (
                        <li key={d} className="text-xs text-neutral-600">
                          • {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={selectedPillarModal.href}
                    className="c-button -color-black"
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label={selectedPillarModal.ctaLabel}
                      >
                        <span className="c-button_label">
                          {selectedPillarModal.ctaLabel}
                        </span>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
