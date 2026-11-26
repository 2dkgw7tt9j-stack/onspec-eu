"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LAUNCH_FAQS,
  PREFAB_OPPORTUNITIES,
  PrefabOpportunity,
  VENDING_FLAGSHIP_BLUEPRINT,
} from "@/data/onspec-data";
import { SpecDrawerModal } from "@/components/SpecDrawerModal";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

interface TurnkeyHotspot {
  id: string;
  code: string;
  label: string;
  title: string;
  description: string;
  xPercent: number;
  yPercent: number;
  image: string;
}

const TURNKEY_HOTSPOTS: TurnkeyHotspot[] = [
  {
    id: "hs-location",
    code: "01 // LOCATION",
    label: "Location Scouting & Securing",
    title: "Finding & Securing Prime Cyprus Locations",
    description:
      "Onspec conducts physical site assessments, footfall verification, power/connectivity checks, and coordinates placement or lease agreements across Limassol, Nicosia, Larnaca, Paphos, and Ayia Napa.",
    xPercent: 24,
    yPercent: 34,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=960&q=85",
  },
  {
    id: "hs-equipment",
    code: "02 // HARDWARE",
    label: "Equipment Sourcing",
    title: "Commercial Hardware & Contactless Terminals",
    description:
      "Direct procurement of commercial-grade machines, kiosks, or wash/laundry systems equipped with EMV contactless card readers, Apple Pay, Google Pay, and remote telemetry sensors.",
    xPercent: 52,
    yPercent: 28,
    image: "/images/perfume-station.jpg",
  },
  {
    id: "hs-suppliers",
    code: "03 // SUPPLIERS",
    label: "Wholesale Suppliers",
    title: "Coordinating Direct Wholesale Suppliers",
    description:
      "We establish your supply chain with vetted Cyprus and EU distributors, from high margin beverages and smart vending consumables to EV infrastructure parts, automated dosing detergents or 3PL fulfillment.",
    xPercent: 74,
    yPercent: 40,
    image:
      "https://images.unsplash.com/photo-1581068106019-5aa70c6ab424?auto=format&fit=crop&w=960&q=85",
  },
  {
    id: "hs-cyprus-reg",
    code: "04 // CYPRUS CORP",
    label: "Cyprus Company Registration",
    title: "Company Registration via Independent Legal Professionals",
    description:
      "Coordinated introduction to independent licensed legal and accounting professionals in Cyprus to handle company incorporation, tax/VAT registration, and municipal permits.",
    xPercent: 33,
    yPercent: 66,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=960&q=85",
  },
  {
    id: "hs-telemetry",
    code: "05 // TELEMETRY",
    label: "Operational & Cloud Setup",
    title: "Real-Time Telemetry & Operational Setup",
    description:
      "Physical installation, 4G telemetry SIM activation, remote stock-level alert dashboards, and automated daily sales reconciliation.",
    xPercent: 58,
    yPercent: 62,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=960&q=85",
  },
  {
    id: "hs-launch",
    code: "06 // HANDOVER",
    label: "Launch Preparation",
    title: "Commissioning, Testing & Owner Handover",
    description:
      "Initial product merchandising, live payment stress-testing, owner dashboard onboarding, and ongoing scaling support as you expand to multiple units.",
    xPercent: 78,
    yPercent: 70,
    image:
      "https://images.unsplash.com/photo-1711632308710-f2e5bf722778?auto=format&fit=crop&w=960&q=85",
  },
];

export default function LaunchPage() {
  const [activeOppIndex, setActiveOppIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [drawerOpportunity, setDrawerOpportunity] =
    useState<PrefabOpportunity | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Limassol, Cyprus");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const currentOpportunity =
    PREFAB_OPPORTUNITIES[activeOppIndex] || PREFAB_OPPORTUNITIES[0];
  const activeHotspot =
    TURNKEY_HOTSPOTS.find((h) => h.id === activeHotspotId) || null;

  const handleDossierRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "01_LAUNCH",
      name: "Turnkey Launch Dossier Request",
      email,
      whatsapp,
      opportunityId: currentOpportunity.id,
      opportunityTitle: currentOpportunity.title,
      message: `Requested Turnkey Launch Dossier for ${currentOpportunity.title} in ${city}.`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-[#F7F8FA] text-black">
      {/* Floating Sticky Sub-Navigation Pill Bar (.c-sticky-nav / .c-widget-bar from ae-1.html) */}
      <div className="c-sticky-nav -full-width is-inview">
        <div className="c-sticky-nav_inner">
          <div
            className="c-sticky-nav_bar"
            style={{ "--sticky-bar-width": "72rem" } as React.CSSProperties}
          >
            <div className="c-widget-bar flex-wrap gap-y-2">
              <div className="c-widget-bar_content">
                <span className="text-md font-bold text-white shrink-0">
                  01 // {currentOpportunity.title}
                </span>
                <span className="text-eyebrow text-black shrink-1">
                  {currentOpportunity.estimatedCapital} •{" "}
                  {currentOpportunity.timeline}
                </span>
              </div>

              {/* Sticky Sub-Nav Section Anchors */}
              <nav className="hidden lg:flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-white/80">
                <a
                  href="#overview"
                  className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Overview
                </a>
                <a
                  href="#turntable-showcase"
                  className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  3 Opportunities
                </a>
                <a
                  href="#vending-blueprint"
                  className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Vending Blueprint
                </a>
                <a
                  href="#setup-process"
                  className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Setup Process
                </a>
              </nav>

              <div className="c-widget-bar_extras">
                <button
                  type="button"
                  onClick={() => setDrawerOpportunity(currentOpportunity)}
                  className="c-button -secondary shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Reserve Spec"
                    >
                      <span className="c-button_label font-semibold">
                        Reserve Spec
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Full-Bleed .c-hero-visual -full-width Rounded Hero (1:1 ae-1.html) */}
        <div id="overview" className="c-hero-visual -full-width">
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
                    alt="PILLAR 01 : LAUNCH: Ready Businesses Prefab Businesses"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1400}
                    width={2000}
                    src="/images/perfume-station.jpg"
                  />
                </picture>
              </div>
            </div>

            <h1
              className="c-hero-visual_title text-heading-xl"
              id="page-heading"
            >
              <span className="sr-only">
                You Don&apos;t Have to Start From Scratch
              </span>
              <div
                aria-hidden="true"
                className="c-split-text -full-width c-hero-visual_title_line"
              >
                You Don&apos;t Have to
              </div>
              <div
                aria-hidden="true"
                className="c-split-text -full-width c-hero-visual_title_line"
              >
                Start From Scratch
              </div>
            </h1>

            <div className="c-hero-visual_bottom flex items-end justify-between text-xs font-mono uppercase tracking-widest text-white/85 z-10">
              <span>PILLAR 01 // READY-TO-LAUNCH BUSINESSES</span>
              <span>3 FLAGSHIP MODELS • LOCATIONS &amp; LEGAL READY</span>
            </div>
          </div>
        </div>

        {/* Section 2: Lead Editorial Paragraph (1:1 ae-1.html lines 68-74) */}
        <section className="my-fluid-2xl">
          <div className="flex flex-col gap-y-8 items-center text-center mx-auto max-w-3xl px-4">
            <p className="text-eyebrow text-black uppercase tracking-widest">
              TURNKEY PREFABRICATED BUSINESS CREATION
            </p>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Built around proven unit economics and remote cloud telemetry, Onspec’s ready businesses business models remove the guesswork of starting a company. We coordinate prime location scouting, commercial hardware, wholesale suppliers, Cyprus corporate registration via independent legal professionals, and complete operational commissioning.
            </p>
          </div>
        </section>

        {/* Section 3: .c-tile-feature Horizontal Carousel with + Buttons Opening SpecDrawerModal (1:1 ae-1.html lines 75-211) */}
        <section className="my-fluid-2xl">
          <section className="flex flex-col gap-y-fluid-xl overflow-hidden">
            <div className="container">
              <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
                <p className="text-eyebrow text-neutral-600">
                  FEATURED TURNKEY SPECIFICATIONS
                </p>
                <h2 className="sr-only">Discover the ONSPEC Launch Difference</h2>
                <div
                  aria-hidden="true"
                  className="c-split-text anim-text-balance heading-xl text-black"
                >
                  Discover the ONSPEC Launch Difference
                </div>
              </div>
            </div>

            <div className="c-carousel" data-items-per-view="2">
              <div className="c-carousel_container flex gap-4 px-[var(--grid-margin)] overflow-x-auto pb-4">
                {PREFAB_OPPORTUNITIES.slice(0, 4).map((opp) => (
                  <div
                    key={opp.id}
                    className="c-carousel_item @container shrink-0 w-[85vw] md:w-[46vw]"
                  >
                    <article className="c-tile-feature">
                      <div className="c-image c-tile-feature_image -cover -rounded-md -overlay -lazy-load is-loaded h-full w-full">
                        <picture className="c-image_inner h-full w-full block">
                          <img
                            alt={opp.title}
                            className="c-image_img is-loaded h-full w-full object-cover"
                            height={740}
                            width={1184}
                            src={opp.image}
                          />
                        </picture>
                      </div>
                      <div className="c-tile-feature_inner">
                        <div className="c-tile-feature_content">
                          <p className="c-tile-feature_label text-eyebrow text-black">
                            {opp.specCode} • {opp.estimatedCapital}
                          </p>
                          <h3 className="c-tile-feature_title heading-xs">
                            {opp.title} : {opp.tagline}
                          </h3>
                        </div>
                        <button
                          type="button"
                          aria-label={`Open specification for ${opp.title}`}
                          onClick={() => setDrawerOpportunity(opp)}
                          className="c-button -icon -blur-dark c-tile-feature_button ml-auto shrink-0 text-white cursor-pointer"
                          style={
                            {
                              "--button-color": "#ffffff",
                              color: "#ffffff",
                            } as React.CSSProperties
                          }
                        >
                          <span className="c-button_inner text-white">
                            <span className="c-icon c-button_icon text-white">
                              <svg
                                aria-hidden="true"
                                className="svg-plus"
                                viewBox="0 0 16 16"
                                focusable="false"
                                style={{
                                  width: "1rem",
                                  height: "1rem",
                                  fill: "#ffffff",
                                  color: "#ffffff",
                                }}
                              >
                                <path
                                  fill="#ffffff"
                                  d="M8.755 2v5.245H14v1.5H8.755V14h-1.5V8.745H2v-1.5h5.255V2h1.5Z"
                                />
                              </svg>
                            </span>
                          </span>
                        </button>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        {/* Section 4: Interactive .c-turntable / .c-tabs / .c-switcher Showcase with .c-markers Hotspots for all 7 Business Models (1:1 ae-1.html lines 212-645) */}
        <section id="turntable-showcase" className="my-fluid-xl">
          <div className="c-turntable !h-auto">
            <div
              className="c-tabs c-turntable_tabs !bg-black text-white p-6 md:p-10"
              style={{ clipPath: "inset(0 round var(--radius-md))" }}
            >
              {/* Top Sticky Switcher Nav for all 7 Ready Business Models */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-black">
                  INTERACTIVE TURNTABLE &amp; EXECUTION HOTSPOT INSPECTOR
                </span>
                <nav
                  className="c-tabs_nav flex justify-center w-full overflow-x-auto pb-2"
                  aria-label="3 Ready Business Models"
                >
                  <div className="c-switcher -background-light !pointer-events-auto">
                    <ul className="c-switcher_inner flex-wrap justify-center gap-1">
                      {PREFAB_OPPORTUNITIES.map((opp, idx) => {
                        const active = idx === activeOppIndex;
                        const shortLabels = [
                          "01 Luxury Perfume Stations",
                          "02 Hygiene & Period Wellness",
                          "03 Hot Food & Meal Heating",
                        ];
                        return (
                          <li key={opp.id} className="c-switcher_item">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveOppIndex(idx);
                                setActiveHotspotId(null);
                              }}
                              className={`rounded-full px-4 py-2.5 text-xs font-mono transition-all cursor-pointer ${
                                active
                                  ? "bg-white text-black font-bold shadow-md"
                                  : "text-white/85 hover:bg-white/10"
                              }`}
                            >
                              {shortLabels[idx] || opp.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Active Business Model Interactive Hotspot Canvas (.c-markers) */}
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative rounded-[18px] overflow-hidden border border-[#A8B1BE]/25 aspect-[16/11] bg-neutral-900">
                  <img
                    src={currentOpportunity.image}
                    alt={currentOpportunity.title}
                    className="h-full w-full object-cover opacity-85 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                  {/* Top-left Telemetry Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-black/85 backdrop-blur-md border border-[#A8B1BE]/30 px-3.5 py-1.5 font-mono text-xs text-black">
                      {currentOpportunity.specCode}
                    </span>
                    <span className="rounded-full bg-black/85 backdrop-blur-md border border-[#A8B1BE]/30 px-3.5 py-1.5 font-mono text-xs text-white">
                      Click any + hotspot marker to inspect setup layer
                    </span>
                  </div>

                  {/* Interactive Lightship .c-markers_item Hotspots */}
                  <div className="c-markers absolute inset-0">
                    {TURNKEY_HOTSPOTS.map((hs) => {
                      const isSelected = activeHotspotId === hs.id;
                      return (
                        <button
                          key={hs.id}
                          type="button"
                          onClick={() =>
                            setActiveHotspotId(isSelected ? null : hs.id)
                          }
                          style={{
                            left: `${hs.xPercent}%`,
                            top: `${hs.yPercent}%`,
                          }}
                          className="c-markers_item group cursor-pointer z-20 flex items-center justify-center"
                          aria-label={hs.label}
                        >
                          <span
                            className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                              isSelected
                                ? "bg-white text-black scale-125 ring-4 ring-white/50"
                                : "bg-black text-white border border-white/40 hover:scale-110"
                            }`}
                          >
                            +
                          </span>
                          <span
                            className="c-markers_label text-xs whitespace-nowrap"
                            style={{
                              opacity: isSelected ? 1 : undefined,
                              backgroundColor: "#000000",
                              color: "#F7F8FA",
                              border: "1px solid rgba(255,255,255,0.3)",
                            }}
                          >
                            {hs.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Hotspot Lightship .c-tile-marker Overlay Card */}
                  {activeHotspot && (
                    <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl bg-white text-black p-5 shadow-2xl border border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1 max-w-xl">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                          {activeHotspot.code} // TURNKEY EXECUTION LAYER
                        </span>
                        <h4 className="text-base font-bold text-black">
                          {activeHotspot.title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {activeHotspot.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const idx = TURNKEY_HOTSPOTS.findIndex(
                              (h) => h.id === activeHotspot.id
                            );
                            const next =
                              TURNKEY_HOTSPOTS[
                                (idx + 1) % TURNKEY_HOTSPOTS.length
                              ];
                            setActiveHotspotId(next.id);
                          }}
                          className="rounded-full bg-black text-white px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-neutral-900 cursor-pointer"
                        >
                          Next Layer →
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveHotspotId(null)}
                          className="rounded-full border border-[#A8B1BE] px-3 py-2 text-xs font-mono text-black hover:border-black cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column of Turntable: Selected Opportunity Spec & 6 Hotspot Layer Buttons */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white">
                        {currentOpportunity.category}
                      </span>
                      {currentOpportunity.flagship && (
                        <span className="rounded-full bg-white px-3 py-1 font-mono text-xs font-bold text-black">
                          FLAGSHIP MODEL
                        </span>
                      )}
                    </div>
                    <h2 className="heading-sm text-white mt-3">
                      {currentOpportunity.title}
                    </h2>
                    <p className="text-sm text-[#A8B1BE] mt-2 leading-relaxed">
                      {currentOpportunity.fullDescription}
                    </p>
                  </div>

                  {/* Quick Spec Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentOpportunity.technicalSpecs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-xl bg-neutral-900/60 border border-[#A8B1BE]/20 p-3"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8B1BE] block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-bold text-white mt-0.5 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hotspot Quick-Trigger Pills */}
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/70">
                      6 COORDINATED TURNKEY LAYERS (CLICK TO INSPECT):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {TURNKEY_HOTSPOTS.map((hs) => {
                        const active = activeHotspotId === hs.id;
                        return (
                          <button
                            key={hs.id}
                            type="button"
                            onClick={() =>
                              setActiveHotspotId(active ? null : hs.id)
                            }
                            className={`rounded-full px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                              active
                                ? "bg-white text-black border-white font-bold"
                                : "bg-neutral-900/50 text-white border-[#A8B1BE]/30 hover:border-white"
                            }`}
                          >
                            {hs.code}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDrawerOpportunity(currentOpportunity)}
                      className="c-button cursor-pointer"
                      style={{
                        backgroundColor: "#000000",
                        color: "#FFFFFF",
                      }}
                    >
                      <span className="c-button_inner">
                        <span
                          className="c-button_label-container"
                          data-label="Open Full Specification & Quote"
                        >
                          <span className="c-button_label font-semibold">
                            Open Full Specification &amp; Quote
                          </span>
                        </span>
                      </span>
                    </button>
                    <Link href="/innovate" className="c-button -blur-light">
                      <span className="c-button_inner">
                        <span
                          className="c-button_label-container"
                          data-label="Have a Custom Idea?"
                        >
                          <span className="c-button_label">
                            Have a Custom Idea?
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Flagship Vending Machine Business 8-Stage Execution Blueprint (.c-push-image + 8-stage grid) */}
        <section id="vending-blueprint" className="my-fluid-2xl">
          <div className="c-push-image container -full-width">
            <div className="c-push-image_content">
              <p className="text-eyebrow text-black uppercase tracking-widest">
                FLAGSHIP CASE STUDY // SPEC-L01
              </p>
              <h3 className="sr-only">
                The Turnkey Smart Vending Machine Business Blueprint
              </h3>
              <div
                aria-hidden="true"
                className="c-split-text -full-width heading-sm text-black"
              >
                The Turnkey Smart Vending Machine Business Blueprint
              </div>
              <p className="text-md text-neutral-600">
                Our flagship entry-level and multi unit scalable asset in Cyprus. We handle every step from demographic opportunity analysis and prime site agreements to contactless touchscreen hardware, wholesale FMCG suppliers, Cyprus company formation via independent legal professionals, and live cloud telemetry.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setDrawerOpportunity(PREFAB_OPPORTUNITIES[0])}
                  className="c-button -color-black cursor-pointer"
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Inspect Flagship Vending Spec Sheet"
                    >
                      <span className="c-button_label">
                        Inspect Flagship Vending Spec Sheet
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div className="c-push-image_visual">
              <div className="c-image -cover -parallax -lazy-load is-loaded h-full w-full">
                <picture className="c-image_inner h-full w-full block">
                  <img
                    alt="Smart Vending Machine Business Cyprus"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1000}
                    width={1600}
                    src={PREFAB_OPPORTUNITIES[0].image}
                  />
                </picture>
              </div>
            </div>
          </div>

          {/* 8-Stage Execution Matrix */}
          <div
            id="setup-process"
            className="container mt-fluid-xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {VENDING_FLAGSHIP_BLUEPRINT.map((stage) => (
              <div
                key={stage.step}
                className="rounded-2xl bg-white border border-[#A8B1BE]/45 p-6 flex flex-col justify-between gap-4 hover:border-black transition-colors"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-black font-bold">
                    {stage.step}
                  </span>
                  <h4 className="heading-2xs text-black mt-2">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-black/60">
                  COORDINATED BY ONSPEC
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: All 7 Ready Businesses Models .c-tile-card Carousel with + Modal Triggers (1:1 ae-1.html lines 1700-1945) */}
        <section className="my-[var(--grid-margin-xl)] pb-fluid-md pt-fluid-xl md:py-fluid-2xl pattern-background background-clip">
          <section className="flex flex-col gap-y-fluid-xl overflow-hidden">
            <div className="container">
              <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
                <p className="text-eyebrow text-black">
                  COMPLETE PREFAB VENTURE CATALOG
                </p>
                <h2 className="sr-only">3 Flagship Ready Business Models</h2>
                <div
                  aria-hidden="true"
                  className="c-split-text anim-text-balance heading-xl text-black"
                >
                  3 Flagship Ready Business Models
                </div>
              </div>
            </div>

            <div className="c-carousel" data-items-per-view="3">
              <div className="c-carousel_container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container max-w-7xl mx-auto">
                {PREFAB_OPPORTUNITIES.map((opp) => (
                  <div key={opp.id} className="c-carousel_item @container">
                    <article className="c-tile-card -default h-full">
                      <div className="c-tile-card_inner">
                        <div className="flex items-center justify-between">
                          <h3 className="text-eyebrow text-black">
                            {opp.specCode}
                          </h3>
                          <span className="font-mono text-xs text-neutral-600">
                            {opp.timeline}
                          </span>
                        </div>
                        <p className="heading-2xs text-black">
                          {opp.title}
                        </p>
                        <p className="text-xs text-neutral-600">
                          {opp.shortDescription}
                        </p>
                        <p className="font-mono text-xs font-bold text-black">
                          {opp.estimatedCapital}
                        </p>
                      </div>
                      <div className="c-tile-card_image aspect-[16/10]">
                        <div className="c-image -cover -rounded-sm -lazy-load is-loaded h-full w-full">
                          <picture className="c-image_inner h-full w-full block">
                            <img
                              alt={opp.title}
                              className="c-image_img is-loaded h-full w-full object-cover"
                              height={400}
                              width={600}
                              src={opp.image}
                            />
                          </picture>
                        </div>
                      </div>
                      <div className="c-tile-card_button">
                        <button
                          type="button"
                          aria-label={`Inspect ${opp.title}`}
                          onClick={() => setDrawerOpportunity(opp)}
                          className="c-button -icon -blur-dark absolute-link cursor-pointer text-white"
                          style={
                            {
                              "--button-color": "#ffffff",
                              color: "#ffffff",
                            } as React.CSSProperties
                          }
                        >
                          <span className="c-button_inner text-white">
                            <span className="c-icon c-button_icon text-white">
                              <svg
                                aria-hidden="true"
                                className="svg-plus"
                                viewBox="0 0 16 16"
                                focusable="false"
                                style={{
                                  width: "1rem",
                                  height: "1rem",
                                  fill: "#ffffff",
                                  color: "#ffffff",
                                }}
                              >
                                <path
                                  fill="#ffffff"
                                  d="M8.755 2v5.245H14v1.5H8.755V14h-1.5V8.745H2v-1.5h5.255V2h1.5Z"
                                />
                              </svg>
                            </span>
                          </span>
                        </button>
                      </div>
                    </article>
                  </div>
                ))}

                {/* 8th Card: Custom Build Configurator Card (1:1 ae-1.html -image-cover "Start Building" card) */}
                <div className="c-carousel_item @container">
                  <article className="c-tile-card -image-cover min-h-[380px]">
                    <div className="c-tile-card_inner z-10">
                      <h3 className="text-eyebrow text-black">
                        PILLAR 03 // INNOVATE
                      </h3>
                      <p className="heading-xs text-white">
                        Have Your Own Business Idea?
                      </p>
                      <p className="text-sm text-white/85">
                        Use our custom proposal configurator to get a free preliminary proposal and turnkey quotation.
                      </p>
                    </div>
                    <div className="c-tile-card_image">
                      <div className="c-image -cover -rounded-sm -lazy-load is-loaded h-full w-full">
                        <picture className="c-image_inner h-full w-full block">
                          <img
                            alt="Submit Your Custom Business Idea"
                            className="c-image_img is-loaded h-full w-full object-cover"
                            height={800}
                            width={600}
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85"
                          />
                        </picture>
                      </div>
                    </div>
                    <div className="c-tile-card_button z-10">
                      <Link
                        className="c-button -fullwidth absolute-link"
                        href="/innovate"
                        style={{
                          backgroundColor: "#000000",
                          color: "#FFFFFF",
                        }}
                      >
                        <span className="c-button_inner">
                          <span
                            className="c-button_label-container"
                            data-label="Submit Your Idea →"
                          >
                            <span className="c-button_label font-semibold">
                              Submit Your Idea →
                            </span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Section 7: Lightship .c-push-specs Dark Deep Navy Specification Summary Banner (1:1 ae-1.html lines 2275-2302) */}
        <section className="my-[var(--grid-margin-xl)]">
          <div
            className="c-push-specs container-xl background-clip rounded-[20px] !bg-black text-white py-fluid-2xl px-6"
          >
            <div className="flex flex-col gap-y-8 items-center text-center mx-auto max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-black">
                COMPLETE TECHNICAL &amp; FINANCIAL SPECIFICATIONS
              </span>
              <h2 className="sr-only">
                See every measurement, supplier layer, and Cyprus setup spec.
              </h2>
              <div
                aria-hidden="true"
                className="c-split-text anim-text-balance heading-xl text-white"
              >
                See every measurement, supplier layer, and Cyprus setup spec.
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpportunity(currentOpportunity)}
                  className="c-button -color-white cursor-pointer"
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Open Full Spec Drawer"
                    >
                      <span className="c-button_label">
                        Open Full Spec Drawer
                      </span>
                    </span>
                  </span>
                </button>
                <Link
                  className="c-button"
                  href="/innovate"
                  style={{
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label="Custom Proposal Configurator"
                    >
                      <span className="c-button_label font-semibold">
                        Custom Proposal Configurator
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: FAQ .c-accordion Section */}
        <section className="my-fluid-2xl">
          <div className="container flex flex-col gap-y-fluid-xl">
            <div className="flex flex-col gap-y-6 items-center text-center mx-auto max-w-3xl">
              <p className="text-eyebrow text-black">
                FREQUENTLY ASKED QUESTIONS
              </p>
              <h2 className="sr-only">Turnkey Business Launch FAQ</h2>
              <div
                aria-hidden="true"
                className="c-split-text anim-text-balance heading-xl text-black"
              >
                Turnkey Business Launch FAQ
              </div>
            </div>

            <div className="md:grid md:grid-cols-12 gap-x-gutter">
              <div className="md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11">
                {LAUNCH_FAQS.map((faq, idx) => (
                  <div key={faq.question} className="c-accordion">
                    <details className="c-accordion_details" open={idx === 0}>
                      <summary className="c-accordion_summary text-md">
                        <span className="c-accordion_index text-lg font-mono text-black">
                          0{idx + 1}
                        </span>
                        <p className="text-lg font-semibold text-black flex-1">
                          {faq.question}
                        </p>
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
                            <p>{faq.answer}</p>
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

        {/* Section 9: Lightship .c-push-newsletter Dossier Request Card (1:1 ae-1.html lines 680-691) */}
        <section className="c-push-newsletter pattern-background background-clip container -full-width">
          <div className="c-push-newsletter_content">
            <div className="c-push-newsletter_heading">
              <p className="text-eyebrow text-black">
                REQUEST TURNKEY LAUNCH DOSSIER
              </p>
              <h2 className="heading-sm text-black">
                Receive hardware specs, available Cyprus footfall slots, and a free preliminary launch proposal.
              </h2>
            </div>

            {referenceId ? (
              <div className="rounded-2xl bg-white border border-black p-5 space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-black">
                  LAUNCH DOSSIER REGISTERED // {referenceId}
                </p>
                <p className="text-xs text-neutral-600">
                  We have logged your request for{" "}
                  <strong>{currentOpportunity.title}</strong> ({city}) and will send the prospectus to{" "}
                  <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <div className="c-newsletter">
                <form
                  onSubmit={handleDossierRequest}
                  className="c-newsletter_form space-y-3"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="c-input-text">
                      <input
                        className="c-input-text_input text-sm"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp (+357...)"
                        required
                        type="tel"
                      />
                    </div>
                    <div className="c-input-text">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="c-input-text_input text-sm"
                      >
                        <option value="Limassol, Cyprus">Limassol, Cyprus</option>
                        <option value="Nicosia, Cyprus">Nicosia, Cyprus</option>
                        <option value="Larnaca, Cyprus">Larnaca, Cyprus</option>
                        <option value="Paphos, Cyprus">Paphos, Cyprus</option>
                        <option value="All Cyprus">All Cyprus</option>
                      </select>
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
                          data-label={submitting ? "Sending..." : "Get Dossier"}
                        >
                          <span className="c-button_label">
                            {submitting ? "Sending..." : "Get Dossier"}
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
                    alt="Turnkey Launch Dossier"
                    className="c-image_img is-loaded h-full w-full object-cover"
                    height={1700}
                    width={1320}
                    src={currentOpportunity.image}
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Shared Lightship .c-modal-feature Specification Drawer Modal */}
      <SpecDrawerModal
        opportunity={drawerOpportunity}
        isOpen={Boolean(drawerOpportunity)}
        onClose={() => setDrawerOpportunity(null)}
      />
    </main>
  );
}
