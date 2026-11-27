"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CUSTOMER_JOURNEY_STEPS,
  ECOSYSTEM_STAGES,
  PREFAB_OPPORTUNITIES,
  PrefabOpportunity,
} from "@/data/onspec-data";
import { SpecDrawerModal } from "@/components/SpecDrawerModal";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

/**
 * Exact cubic-bezier(0.15, 0.61, 0, 1) solver used by Lightship's HeroHome (`Pn.ANIMATION.EASING`)
 */
function cubicBezierEase(p1x: number, p1y: number, p2x: number, p2y: number) {
  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const cx = 3 * p1x;
      const bx = 3 * (p2x - p1x) - cx;
      const ax = 1 - cx - bx;
      const currentX = ((ax * t + bx) * t + cx) * t - x;
      if (Math.abs(currentX) < 1e-6) break;
      const dx = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(dx) < 1e-6) break;
      t -= currentX / dx;
    }
    const cy = 3 * p1y;
    const by = 3 * (p2y - p1y) - cy;
    const ay = 1 - cy - by;
    return ((ay * t + by) * t + cy) * t;
  };
}

const lightshipHeroEase = cubicBezierEase(0.15, 0.61, 0, 1);

function clamp(min: number, max: number, v: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Exact Lightship `.c-split-text` character-level DOM generator
 */
function SplitText({
  text,
  className = "",
  extraDelay = "0s",
  dataLine = false,
}: {
  text: string;
  className?: string;
  extraDelay?: string;
  dataLine?: boolean;
}) {
  const words = text.split(" ");
  let charCounter = 0;
  return (
    <div
      aria-hidden="true"
      className={`c-split-text is-inview ${className}`}
      data-anim-text=""
      data-scroll=""
      {...(dataLine ? { "data-line": "" } : {})}
      style={
        {
          "--extra-delay": extraDelay,
          "--total-chars": text.length,
        } as React.CSSProperties
      }
    >
      {words.map((word, wIdx) => (
        <React.Fragment key={wIdx}>
          <span style={{ whiteSpace: "nowrap" }} data-word="">
            {word.split("").map((ch, cIdx) => {
              const idx = charCounter++;
              return (
                <span
                  key={cIdx}
                  style={{ "--char-index": idx } as React.CSSProperties}
                  data-char=""
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wIdx < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * 6 Surround Grid Cards revealed around the shrinking Hero Media mask
 */
interface SurroundHeroCard {
  index: string;
  title: string;
  subtitle: string;
  image: string;
  column: "left" | "right";
  small?: boolean;
  opportunityId?: string;
  href?: string;
}

const HERO_SURROUND_CARDS: SurroundHeroCard[] = [
  {
    index: "01",
    title: "Luxury Perfume Stations",
    subtitle: "24/7 Cashless Fragrance Dispensers",
    image: "/images/perfume-station.jpg",
    column: "left",
    small: false,
    opportunityId: "smart-perfume-dispenser",
    href: "/businesses#smart-perfume-dispenser",
  },
  {
    index: "02",
    title: "Hygiene & Period Stations",
    subtitle: "Essential Sanitary & Antiseptic Vending",
    image: "/images/hygiene-station.jpg",
    column: "left",
    small: true,
    opportunityId: "hygiene-sanitary-vending",
    href: "/businesses#hygiene-sanitary-vending",
  },
  {
    index: "03",
    title: "Hot Food Heating Stations",
    subtitle: "On-Demand Meals for Workplaces & Sites",
    image: "/images/hot-meal-station.jpg",
    column: "left",
    small: false,
    opportunityId: "hot-food-meal-station",
    href: "/businesses#hot-food-meal-station",
  },
  {
    index: "04",
    title: "High-Converting Web Platforms",
    subtitle: "Sub-Second Next.js & Stripe",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
    column: "right",
    small: true,
    href: "/ai-web#web-development",
  },
  {
    index: "05",
    title: "Autonomous AI Agents",
    subtitle: "24/7 Intelligent Multi-App Sync",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    column: "right",
    small: false,
    href: "/ai-web#ai-automations",
  },
  {
    index: "06",
    title: "Cyprus Legal Network",
    subtitle: "Independent Licensed Counsel",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
    column: "right",
    small: true,
    href: "/services#legal-network",
  },
];

/**
 * 4 Vertical Stacking Cards for Section 2 (`.c-stacking-cards`)
 */
const STACKING_PILLAR_CARDS = [
  {
    index: 0,
    pillarCode: "PILLAR 01 : LAUNCH",
    title: "Turnkey Automated Dispensers & Hot Meal Stations",
    subtitle:
      "Luxury Perfume Stations, Essential Hygiene Dispensers & On-Demand Hot Food Stations: Prime locations mapped, commercial equipment sourced, and Cyprus corporate structure ready for operation.",
    metric: "3 FLAGSHIP MODELS",
    image: "/images/perfume-station.jpg",
    href: "/businesses",
    cta: "Explore Ready Businesses",
  },
  {
    index: 1,
    pillarCode: "PILLAR 02 : AUTOMATE",
    title: "AI & Business Automation",
    subtitle:
      "24/7 Autonomous AI Customer Support Agents, Smart Booking Assistants, CRM Pipelines, Sub-Second Web Platforms, and Automated Invoice Workflows.",
    metric: "UP TO 78% LESS MANUAL WORK",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    href: "/ai-web",
    cta: "Explore AI & Websites",
  },
  {
    index: 2,
    pillarCode: "PILLAR 03 : INNOVATE",
    title: "Your Idea. Our Execution.",
    subtitle:
      "Have a business concept? Tell us what you are thinking. Receive a free preliminary proposal, technical feasibility study, transparent quotation and full execution roadmap.",
    metric: "FREE PRELIMINARY PROPOSAL",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    href: "/services",
    cta: "Explore All Services",
  },
  {
    index: 3,
    pillarCode: "PILLAR 04 : CONNECT",
    title: "Legal & Professional Services",
    subtitle:
      "Independent Cyprus Legal Network providing counsel across Corporate Formation, Commercial Licensing, Residency, Banking, and Regulatory Law.",
    metric: "CYPRUS & EU COUNSEL",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85",
    href: "/contact",
    cta: "Contact Our Team",
  },
];

/**
 * 4 Feature Slider Cards for Section 3 (`.c-carousel` / `.c-tile-feature`)
 * Each maps to a rich PrefabOpportunity specification so clicking `+` opens `SpecDrawerModal`.
 */
const FEATURE_CAROUSEL_SPECS: {
  label: string;
  headline: string;
  image: string;
  modalSpec: PrefabOpportunity;
}[] = [
  {
    label: "01. Luxury Perfume Dispensers",
    headline:
      "Automated luxury fragrance dispensers in Cyprus beach clubs, 5-star hotels & nightlife venues.",
    image: "/images/perfume-station.jpg",
    modalSpec: PREFAB_OPPORTUNITIES[0],
  },
  {
    label: "02. Hygiene & Period Wellness",
    headline:
      "Autonomous period care, antiseptic first-aid and sanitization vending in high-density corridors.",
    image: "/images/hygiene-station.jpg",
    modalSpec: PREFAB_OPPORTUNITIES[1],
  },
  {
    label: "03. Hot Food Heating Stations",
    headline:
      "24/7 refrigerated on-demand heated chef-quality meals for construction sites & workplaces.",
    image: "/images/hot-meal-station.jpg",
    modalSpec: PREFAB_OPPORTUNITIES[2],
  },
  {
    label: "04. Web Engineering & AI Studio",
    headline:
      "Sub-second Next.js web applications, 24/7 autonomous AI agents, and website diagnostics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    modalSpec: {
      id: "ai-web-studio-spec",
      specCode: "SPEC-A02 • Studio",
      title: "Digital Engineering Studio • Web Platforms & Autonomous AI",
      category: "Digital & Ecommerce",
      featured: true,
      tagline:
        "High-converting Next.js web platforms, 24/7 autonomous AI agents & senior website diagnostics.",
      shortDescription:
        "Sub-second digital platforms, autonomous customer concierges, and 48h website diagnostics.",
      fullDescription:
        "We architect sub-second Next.js web applications, deploy autonomous 24/7 AI agents and business workflow pipelines, and deliver professional senior-engineer website diagnostics with exact production code patches.",
      investmentTier: "Fixed-Scope Sprints & Transparent Scoping",
      estimatedCapital: "Custom Sprints on Request (Zero Retainer Lock-in)",
      timeline: "2-Week Rapid Sprint Turnaround",
      locationStrategy: "Edge Cloud Architecture : Cyprus, EU and Global",
      autonomyLevel: "Sub-1s Page Speeds & 24/7 Autonomous AI",
      weeklyOwnerHours: "Saves 25 to 35+ operational hrs / week",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
      whatsIncluded: [
        "Sub-second Next.js App Router web platform with guaranteed 95+ Core Web Vitals",
        "Omnichannel conversational AI concierge and automated assistant integration",
        "Automated inbound lead qualification, enrichment & CRM calendar routing",
        "Multi-app webhook pipelines syncing HubSpot, Airtable, Stripe, and Supabase",
        "Senior-engineer website diagnostics with ready-to-merge production code patches",
      ],
      executionStages: [
        {
          step: "STAGE 01",
          title: "Technical Discovery & Conversion Audit",
          detail: "Screen-by-screen breakdown of visitor hesitation points and system bottleneck mapping.",
        },
        {
          step: "STAGE 02",
          title: "High-Velocity Edge Development",
          detail: "Architecting sub-second Next.js components, Tailwind styling, and Stripe checkout.",
        },
        {
          step: "STAGE 03",
          title: "Autonomous Agent & Webhook Wiring",
          detail: "Connecting WhatsApp API, CRM synchronization, and deterministic fail-safe guardrails.",
        },
        {
          step: "STAGE 04",
          title: "Edge Deployment & Handover",
          detail: "Global Vercel Edge launch, Core Web Vitals verification, and full repository handover.",
        },
      ],
      technicalSpecs: [
        { label: "SPEC ID", value: "OSP-ENG-2026" },
        { label: "FRONTEND STACK", value: "Next.js App Router / Tailwind CSS" },
        { label: "LATENCY", value: "<1.0s First Contentful Paint (95+ Vitals)" },
        { label: "AI RUNTIME", value: "24/7 Autonomous AI Concierge (<3s)" },
        { label: "DIAGNOSTICS SLA", value: "48h Delivery with Exact Code Patches" },
        { label: "SECURITY", value: "100% NDA Standard • Zero Backend Passwords" },
      ],
      cyprusSetupNotes:
        "Engineered in studio partnership with AuditFlow (VISION CRAFT VC CY LTD).",
    },
  },
  {
    label: "05. Custom Venture Foundry",
    headline:
      "Your idea does not have to stay an idea. Free preliminary proposal and execution.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    modalSpec: {
      id: "custom-venture-foundry-spec",
      specCode: "SPEC-I03 • Foundry",
      title: "Custom Business Concept Evaluation & Turnkey Execution",
      category: "Semi-Automated",
      featured: true,
      tagline:
        "From raw business concept to structured feasibility blueprint, free preliminary quotation, and full market launch.",
      shortDescription:
        "Tell us what you are thinking, we evaluate feasibility, provide a free preliminary proposal, and build it end to end.",
      fullDescription:
        "Whether you want to bring a new physical service concept to Cyprus, build a custom automated retail network, or launch a digital platform, Onspec acts as your execution partner. You submit your idea, our specialists evaluate commercial and technical feasibility, and we deliver a free preliminary proposal before coordinating the entire build.",
      investmentTier: "Custom Project Quotation",
      estimatedCapital: "Free Preliminary Proposal & Transparent Scope",
      timeline: "48 to 72 Hours for Initial Feasibility Proposal",
      locationStrategy: "Cyprus & European Union Deployment",
      autonomyLevel: "Architected for Modern Automated Operations",
      weeklyOwnerHours: "Tailored to Founder Role",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      whatsIncluded: [
        "Confidential review of your business concept, budget, and timeline goals",
        "Free preliminary proposal & transparent execution cost quotation",
        "Location scouting, commercial hardware/software procurement & vendor coordination",
        "Brand, digital platform, and AI operational workflow integration",
        "Cyprus corporate formation & regulatory liaison via independent legal network",
      ],
      executionStages: [
        {
          step: "STAGE 01",
          title: "Confidential Idea Intake",
          detail:
            "Submit your concept description, target budget, and desired timeframe.",
        },
        {
          step: "STAGE 02",
          title: "Feasibility & Architecture Assessment",
          detail:
            "Our commercial and technical specialists evaluate suppliers, costs, and regulatory path.",
        },
        {
          step: "STAGE 03",
          title: "Free Preliminary Proposal & Quotation",
          detail:
            "You receive a clear execution roadmap, deliverable breakdown, and timeline.",
        },
        {
          step: "STAGE 04",
          title: "End to End Build & Handover",
          detail:
            "Onspec coordinates procurement, setup, automation, and launch readiness.",
        },
      ],
      technicalSpecs: [
        { label: "SPEC ID", value: "OSP-INV-301" },
        { label: "INITIAL PROPOSAL", value: "100% Free Preliminary Quotation" },
        { label: "TURNAROUND", value: "2 to 3 Business Days for Assessment" },
        { label: "SCOPE", value: "Physical, Digital or Hybrid Ventures" },
        { label: "LEGAL & CORP", value: "Coordinated via Cyprus Legal Network" },
        { label: "SUPPORT", value: "Post Launch Scaling & AI Optimization" },
      ],
      cyprusSetupNotes:
        "Designed for local and international founders seeking a trusted on-the-ground execution partner in Cyprus.",
    },
  },
  {
    label: "06. Cyprus Legal & Corporate",
    headline:
      "The right professionals. The right guidance. Without the hassle.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
    modalSpec: {
      id: "cyprus-legal-network-spec",
      specCode: "SPEC-C04 • Legal Network",
      title: "Cyprus Legal & Professional Services Network",
      category: "Physical Infrastructure",
      featured: true,
      tagline:
        "Direct connection to vetted independent legal professionals in Cyprus across corporate, residency, immigration, and commercial law.",
      shortDescription:
        "Save time and avoid uncertainty by connecting directly with independent licensed legal specialists in Cyprus.",
      fullDescription:
        "Launching a business, relocating, or resolving legal matters in Cyprus requires dependable professional counsel. Onspec connects clients directly with experienced independent legal professionals in Cyprus through its vetted network, covering company registration, commercial contracts, immigration Permits, residency, and criminal or regulatory matters.",
      investmentTier: "Direct Specialist Referral",
      estimatedCapital: "Transparent Engagement with Independent Counsel",
      timeline: "24 to 48 Hours to Specialist Introduction",
      locationStrategy: "Limassol, Nicosia, Larnaca & Paphos, Cyprus",
      autonomyLevel: "Coordinated Professional Introduction",
      weeklyOwnerHours: "Streamlined Documentation Intake",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
      whatsIncluded: [
        "Structured assessment of your corporate, residency, immigration, or legal need",
        "Direct referral to a vetted independent licensed lawyer in Cyprus",
        "Business related legal matters: company incorporation, shareholder agreements, commercial leases",
        "Immigration & Cyprus residency permit legal guidance",
        "Criminal law representation & dedicated 1 on 1 legal consultations",
      ],
      executionStages: [
        {
          step: "STAGE 01",
          title: "Confidential Matter Triage",
          detail:
            "Share the category and context of your legal or corporate requirement in Cyprus.",
        },
        {
          step: "STAGE 02",
          title: "Specialist Matching",
          detail:
            "We match your requirement with an independent legal professional specializing in that exact field.",
        },
        {
          step: "STAGE 03",
          title: "Direct Legal Consultation",
          detail:
            "Engage directly with independent licensed legal counsel for formal advice and representation.",
        },
        {
          step: "STAGE 04",
          title: "Integrated Business Coordination",
          detail:
            "Where relevant, Onspec aligns operational launch steps alongside your legal milestones.",
        },
      ],
      technicalSpecs: [
        { label: "SPEC ID", value: "OSP-CON-401" },
        { label: "JURISDICTION", value: "Republic of Cyprus & EU Framework" },
        { label: "PRACTICE AREAS", value: "Corporate, Immigration, Residency, Criminal" },
        { label: "COUNSEL STATUS", value: "Independent Licensed Legal Professionals" },
        { label: "CITIES COVERED", value: "Limassol, Nicosia, Larnaca, Paphos" },
        { label: "COMPLIANCE", value: "Onspec is not a law firm; referrals to vetted counsel" },
      ],
      cyprusSetupNotes:
        "Compliance Notice: Onspec connects clients with experienced independent legal professionals in Cyprus through its professional network and does not itself operate as a law firm.",
    },
  },
];

const BLUEPRINT_SHORT_CODES = [
  "01.PERFUME",
  "02.HYGIENE",
];

export default function HomePage() {
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<PrefabOpportunity | null>(null);

  // Refs for Section 1: `.c-hero-home` sticky 2400px inset-mask + 6-card grid reveal
  const heroRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const dummyVisualRef = useRef<HTMLDivElement | null>(null);
  const titleLineRef = useRef<HTMLDivElement | null>(null);
  const dummyLineRef = useRef<HTMLDivElement | null>(null);
  const surroundCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for Section 2: `.c-stacking-cards`
  const stackingContainerRef = useRef<HTMLDivElement | null>(null);
  const stackingHeadingRef = useRef<HTMLDivElement | null>(null);
  const stackingCardRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Refs & state for Section 3: Feature Carousel (`.c-carousel` 2-per-view)
  const featureCarouselRef = useRef<HTMLDivElement | null>(null);
  const [featureSlideIndex, setFeatureSlideIndex] = useState(0);
  const featureTotalPages = 3; // 4 items with 2 per view -> 3 pages (0, 1, 2)

  // Refs & state for Section 6: Blueprints Carousel (`.c-carousel` 2 cards)
  const blueprintCarouselRef = useRef<HTMLDivElement | null>(null);
  const [blueprintSlideIndex, setBlueprintSlideIndex] = useState(0);
  const blueprintTotalPages = 1;

  // State for Section 7: `.c-push-newsletter` ("Have an idea? Let's build it.")
  const [ideaName, setIdeaName] = useState("");
  const [ideaWhatsapp, setIdeaWhatsapp] = useState("");
  const [ideaEmail, setIdeaEmail] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [ideaSubmitting, setIdeaSubmitting] = useState(false);
  const [ideaResultRef, setIdeaResultRef] = useState<string | null>(null);

  /**
   * Synchronize Lightship CSS variables (`--vw`, `--svh`, `is-ready`, Hero clip-path,
   * 6 surround cards `--image-progress`, and Stacking Cards `--sticky-progress`)
   */
  const updateLightshipScrollChoreography = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const vh = window.innerHeight || 900;
    const vw = document.body.clientWidth || window.innerWidth || 1440;

    // Set root Lightship viewport units
    document.documentElement.style.setProperty("--vw", `${vw * 0.01}px`);
    document.documentElement.style.setProperty("--svh", `${vh * 0.01}px`);

    // 1. HERO HOME (`Pn` exact math from Lightship `app.js`)
    const heroEl = heroRef.current;
    const maskEl = maskRef.current;
    const innerEl = innerRef.current;
    const dummyEl = dummyVisualRef.current;

    const isMobile = vw < 1024;

    if (heroEl && maskEl && innerEl && dummyEl) {
      if (isMobile) {
        // On mobile: Keep hero full-bleed 100svh with zero long-scroll trap or thin-box deformation
        maskEl.style.clipPath = "none";
        innerEl.style.transform = "none";
        heroEl.style.setProperty("--hero-ui-opacity", "1");
      } else {
        const heroRect = heroEl.getBoundingClientRect();
        const heroHeight = heroEl.clientHeight || vh * 3;
        const scrollableDistance = Math.max(1, heroHeight - vh);
        const rawScroll = clamp(0, scrollableDistance, -heroRect.top);
        const overallProgress = clamp(0, 1, rawScroll / scrollableDistance);

        // UI opacity fades out from progress 0 -> 0.2
        const uiOpacity = 1 - clamp(0, 1, overallProgress / 0.2);
        heroEl.style.setProperty("--hero-ui-opacity", String(uiOpacity));

        // Compute clip target relative to `[data-dummy-visual]` center column
        const maskW = maskEl.clientWidth || vw;
        const maskH = maskEl.clientHeight || vh;
        const dummyRect = dummyEl.getBoundingClientRect();
        const dummyW = dummyRect.width || maskW * 0.31;
        const dummyH = dummyRect.height || maskH * 0.72;

        const clipTargetX = Math.max(0, (maskW - dummyW) / 2);
        const clipTargetY = Math.max(0, (maskH - dummyH) / 2);

        const initialRatio = maskW / Math.max(1, maskH);
        const finalRatio = dummyW / Math.max(1, dummyH);
        const scaleRatio =
          initialRatio > finalRatio
            ? 1 - dummyH / Math.max(1, maskH)
            : 1 - dummyW / Math.max(1, maskW);

        // Timeline of 7 items (index 0 = mask, index 1..6 = 6 surrounding cards)
        // Duration = 1, stagger = 0.1 -> total timeline duration = 1.6
        const totalItems = HERO_SURROUND_CARDS.length + 1; // 7
        const totalTimelineDuration = 1 + (totalItems - 1) * 0.1; // 1.6
        const timelineTime = overallProgress * totalTimelineDuration;

        const maskLocalProgress = clamp(0, 1, timelineTime / 1.0);
        const easedMask = lightshipHeroEase(maskLocalProgress);

        const ix = easedMask * clipTargetX;
        const iy = easedMask * clipTargetY;

        maskEl.style.clipPath = `inset(${iy.toFixed(1)}px ${ix.toFixed(1)}px ${iy.toFixed(1)}px ${ix.toFixed(1)}px round var(--radius-md))`;

        const scaleVal = 1 - easedMask * (0.75 * scaleRatio);
        innerEl.style.transform = `scale(${scaleVal.toFixed(4)})`;

        // Update each of the 6 surrounding cards `--image-progress`
        surroundCardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const itemStart = (idx + 1) * 0.1;
          const itemLocal = clamp(0, 1, (timelineTime - itemStart) / 1.0);
          const easedCard = lightshipHeroEase(itemLocal);
          cardEl.style.setProperty("--image-progress", easedCard.toFixed(4));
        });
      }
    }

    // 2. STACKING CARDS (Desktop & Laptop: smooth sticky scaling with 100% visible uncropped content)
    if (!isMobile) {
      const stackingEl = stackingContainerRef.current;
      const headingEl = stackingHeadingRef.current;
      const firstCard = stackingCardRefs.current[0];

      if (stackingEl && headingEl && firstCard) {
        const cardStickyThreshold = window.innerHeight * 0.08 + 48; // ~80px sticky top

        stackingCardRefs.current.forEach((cardEl) => {
          if (!cardEl) return;
          const rect = cardEl.getBoundingClientRect();
          const cardH = Math.max(1, rect.height);
          // Progress as card reaches sticky threshold and subsequent cards stack
          const progress = clamp(0, 1, (cardStickyThreshold - rect.top) / cardH);
          cardEl.style.setProperty("--sticky-progress", progress.toFixed(4));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.add(
      "is-ready",
      "is-loaded",
      "is-first-loaded"
    );
    document.documentElement.classList.remove("has-no-js");

    updateLightshipScrollChoreography();

    const handleScroll = () => {
      updateLightshipScrollChoreography();
    };
    const handleResize = () => {
      updateLightshipScrollChoreography();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateLightshipScrollChoreography]);

  // Carousel navigation helpers for Section 3 (Feature Carousel)
  const scrollFeatureCarouselTo = (index: number) => {
    const container = featureCarouselRef.current;
    if (!container) return;
    const clamped = clamp(0, featureTotalPages - 1, index);
    setFeatureSlideIndex(clamped);
    const firstItem = container.querySelector(
      "[data-item]"
    ) as HTMLElement | null;
    const itemW = firstItem ? firstItem.getBoundingClientRect().width + 16 : 600;
    container.scrollTo({
      left: clamped * itemW,
      behavior: "smooth",
    });
  };

  // Carousel navigation helpers for Section 6 (Blueprints Carousel : Infinite wrap-around support)
  const scrollBlueprintCarouselTo = (index: number) => {
    const container = blueprintCarouselRef.current;
    if (!container) return;
    const wrapped =
      ((index % blueprintTotalPages) + blueprintTotalPages) %
      blueprintTotalPages;
    setBlueprintSlideIndex(wrapped);
    const firstItem = container.querySelector(
      "[data-item]"
    ) as HTMLElement | null;
    const itemW = firstItem ? firstItem.getBoundingClientRect().width + 16 : 420;
    container.scrollTo({
      left: wrapped * itemW,
      behavior: "smooth",
    });
  };

  const handleIdeaFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaEmail || !ideaName) return;
    setIdeaSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "03_INNOVATE",
      name: ideaName,
      email: ideaEmail,
      whatsapp: ideaWhatsapp,
      ideaDescription:
        ideaDescription ||
        "Preliminary business idea submission from homepage intake.",
      message: ideaDescription,
    });
    setIdeaSubmitting(false);
    if (res.ok) {
      setIdeaResultRef(res.referenceId);
    }
  };

  const leftHeroCards = HERO_SURROUND_CARDS.filter((c) => c.column === "left");
  const rightHeroCards = HERO_SURROUND_CARDS.filter(
    (c) => c.column === "right"
  );

  return (
    <>
      {/* =====================================================================
          SECTION 1 : `.c-hero-home`
          2400px Sticky Scroll Inset-Mask & 6-Card Surround Grid Reveal Hero
         ===================================================================== */}
      <div
        ref={heroRef}
        className="c-hero-home min-h-[100svh] lg:min-h-[2400px]"
      >
        <div data-focus-area="" />
        <div className="c-hero-home_sticky">
          {/* Center Full-Bleed Mask that Shrinks & Rounds on Scroll */}
          <div ref={maskRef} className="c-hero-home_mask" data-mask="">
            <div ref={innerRef} className="c-hero-home_inner" data-inner="">
              <div className="c-hero-home_background">
                <div className="relative block w-full h-full c-hero-home_background">
                  <picture className="c-image_inner block w-full h-full">
                    <img
                      className="absolute inset-0 object-cover w-full h-full c-image_img is-loaded"
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                      alt="ONSPEC Architectural Execution Hero"
                      width={2000}
                      height={1200}
                      fetchPriority="high"
                    />
                  </picture>
                  {/* Deep black architectural tint for high-contrast Lightship typography */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Split Horizontal Headline Across Vertical Midpoint */}
              <h1
                className="c-hero-home_title text-heading-xl"
                id="page-heading"
              >
                <span className="sr-only">ONSPEC — Your Vision. Our Execution. Ready Businesses and AI Automation in Cyprus and Europe.</span>
                <SplitText
                  text="Your Vision."
                  className="c-hero-home_title_line"
                  extraDelay="0s"
                />

                <div ref={titleLineRef}>
                  <SplitText
                    text="Our Execution."
                    className="c-hero-home_title_line"
                    extraDelay="0.1s"
                    dataLine
                  />
                </div>
              </h1>

              {/* Hidden dummy measurement lines matching Lightship DOM */}
              <div
                className="c-hero-home_dummy text-heading-xl"
                aria-hidden="true"
              >
                <div className="c-hero-home_dummy_line">Your Vision.</div>
                <div
                  ref={dummyLineRef}
                  className="c-hero-home_dummy_line"
                  data-dummy-line=""
                >
                  Our Execution.
                </div>
              </div>

              {/* Bottom 1px Translucent White Hairline with ↓ and "Scroll to explore" */}
              <div className="c-hero-home_bottom">
                <div className="c-hero-home_bottom_inner">
                  <span className="c-icon">
                    <svg
                      className="svg-arrow-down"
                      viewBox="0 0 16 16"
                      focusable="false"
                      aria-hidden="true"
                      style={{ width: "1rem", height: "1rem" }}
                    >
                      <path
                        fill="currentColor"
                        d="M7.5 13.8c.1.1.3.2.4.2.2 0 .3-.1.4-.2l4-4-.4-.4-.4-.4-3 3V2H7.4v10l-3-3-.5.4-.4.4 4 4z"
                      />
                    </svg>
                  </span>
                  <span className="text-xs">Scroll to explore</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Surround Grid Reveal (3 Left Cards, Center Dummy Target, 3 Right Cards) */}
          <div className="c-hero-home_grid-container">
            <div
              className="c-hero-home_grid"
              style={{ maxHeight: "92svh", alignItems: "stretch" }}
            >
              {/* Left Column: 3 Staggered Cards */}
              <div
                className="c-hero-home_col"
                style={{ justifyContent: "space-between" }}
              >
                {leftHeroCards.map((card, i) => {
                  return (
                    <div
                      key={card.index}
                      ref={(el) => {
                        surroundCardRefs.current[i] = el;
                      }}
                      className={`c-hero-home_image-container ${
                        card.small ? "-small" : ""
                      }`}
                      data-image=""
                      style={
                        {
                          "--image-ratio": "16/9",
                          maxHeight: "26svh",
                        } as React.CSSProperties
                      }
                    >
                      <Link
                        href={card.href || "/businesses"}
                        className="c-image c-hero-home_image -rounded-md -cover is-loaded group cursor-pointer relative overflow-hidden block w-full h-full"
                        aria-label={`${card.index} ${card.title} - ${card.subtitle}`}
                      >
                        <picture className="c-image_inner">
                          <img
                            className="c-image_img is-loaded transition-transform duration-500 group-hover:scale-105"
                            alt={card.title}
                            width={780}
                            height={468}
                            src={card.image}
                          />
                        </picture>
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)",
                          }}
                        />
                        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between text-white">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/90 block">
                              {card.index} &bull; ONSPEC
                            </span>
                            <p className="text-xs md:text-sm font-semibold leading-tight group-hover:underline">
                              {card.title}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-white/75 hidden xl:inline">
                            {card.subtitle}
                          </span>
                        </div>
                        {/* Hover arrow badge */}
                        <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs border border-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                          <span className="text-xs font-mono font-bold leading-none">→</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Center Column: Dummy target box that defines shrunk center card geometry */}
              <div className="c-hero-home_col">
                <div
                  ref={dummyVisualRef}
                  className="c-hero-home_dummy-background"
                  data-dummy-visual=""
                />
              </div>

              {/* Right Column: 3 Staggered Cards */}
              <div
                className="c-hero-home_col"
                style={{ justifyContent: "space-between" }}
              >
                {rightHeroCards.map((card, i) => {
                  const globalIdx = i + 3;
                  return (
                    <div
                      key={card.index}
                      ref={(el) => {
                        surroundCardRefs.current[globalIdx] = el;
                      }}
                      className={`c-hero-home_image-container ${
                        card.small ? "-small" : ""
                      }`}
                      data-image=""
                      style={
                        {
                          "--image-ratio": "16/9",
                          maxHeight: "26svh",
                        } as React.CSSProperties
                      }
                    >
                      <Link
                        href={card.href || "/businesses"}
                        className="c-image c-hero-home_image -rounded-md -cover is-loaded group cursor-pointer relative overflow-hidden block w-full h-full"
                        aria-label={`${card.index} ${card.title} - ${card.subtitle}`}
                      >
                        <picture className="c-image_inner">
                          <img
                            className="c-image_img is-loaded transition-transform duration-500 group-hover:scale-105"
                            alt={card.title}
                            width={780}
                            height={468}
                            src={card.image}
                          />
                        </picture>
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)",
                          }}
                        />
                        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between text-white">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/90 block">
                              {card.index} &bull; ONSPEC
                            </span>
                            <p className="text-xs md:text-sm font-semibold leading-tight group-hover:underline">
                              {card.title}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-white/75 hidden xl:inline">
                            {card.subtitle}
                          </span>
                        </div>
                        {/* Hover arrow badge */}
                        <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs border border-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                          <span className="text-xs font-mono font-bold leading-none">→</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Lead Statement & Dual Pill CTAs below the Hero Grid Reveal */}
      <section className="container my-fluid-3xl scroll-reveal">
        <div className="flex flex-col gap-y-10 items-center text-center mx-auto max-w-3xl">
          <p
            className="text-lg text-neutral-600 max-w-xl is-inview"
            data-scroll=""
            data-anim-slide=""
            style={
              {
                "--extra-delay": "0.1s",
                "--anim-slide-enter-duration": "0.5s",
              } as React.CSSProperties
            }
          >
            From launching your own business to automating the one you already
            have, we make the complicated simple.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/businesses"
              className="c-button"
              style={
                {
                  "--button-background": "#000000",
                  "--button-color": "#FFFFFF",
                  "--button-hover-background": "#000000",
                  "--button-hover-color": "#FFFFFF",
                } as React.CSSProperties
              }
            >
              <span className="c-button_inner">
                <span
                  className="c-button_label-container font-semibold"
                  data-label="Start your business"
                >
                  <span className="c-button_label">Start your business</span>
                </span>
              </span>
            </Link>

            <Link
              href="/ai-web"
              className="c-button -blur-dark"
              style={
                {
                  "--button-background": "#000000",
                  "--button-color": "#F7F8FA",
                  "--button-hover-background": "#1A1A1A",
                  "--button-hover-color": "#F7F8FA",
                } as React.CSSProperties
              }
            >
              <span className="c-button_inner">
                <span
                  className="c-button_label-container"
                  data-label="Automate your business"
                >
                  <span className="c-button_label">Automate your business</span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 : `.c-stacking-cards`
          "This is ONSPEC" Sticky Giant Display Heading + 4 Overlapping Cards
         ===================================================================== */}
      <section className="my-fluid-xl md:my-fluid-3xl">
        <div ref={stackingContainerRef} className="c-stacking-cards">
          <div className="c-stacking-cards_sticky_container">
            {/* Giant Sticky Display Heading + Twin-Star Emblem */}
            <div
              ref={stackingHeadingRef}
              data-heading=""
              className="c-stacking-cards_heading container-xl"
            >
              <div className="c-stacking-cards_heading_icon text-black">
                <h2 className="sr-only">This is ONSPEC</h2>
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-black font-semibold">
                    [ 04 PILLARS ]
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
                    ONSPEC.EU &bull; 4 EXECUTION PILLARS
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1411 181"
                  className="w-full h-auto select-none"
                  aria-hidden="true"
                >
                  <text
                    x="50%"
                    y="148"
                    textAnchor="middle"
                    fill="currentColor"
                    fontFamily="var(--font-manrope), sans-serif"
                    fontWeight="800"
                    fontSize="168"
                    letterSpacing="-6"
                  >
                    This is ONSPEC
                  </text>
                </svg>
              </div>
            </div>

            <div className="c-stacking-cards_inner container">
              {/* Center Scrolling Stack: 4 Large Centered Rounded Vertical Cards */}
              <ul className="c-stacking-cards_list">
                {STACKING_PILLAR_CARDS.map((card, idx) => (
                  <li
                    key={card.pillarCode}
                    ref={(el) => {
                      stackingCardRefs.current[idx] = el;
                    }}
                    data-card=""
                    style={
                      {
                        "--index": idx,
                        "--sticky-progress": 0,
                      } as React.CSSProperties
                    }
                    className="c-stacking-cards_item -animated"
                    data-anim=""
                  >
                    <div className="c-image c-stacking-cards_card_image -cover is-loaded">
                      <picture className="c-image_inner">
                        <img
                          className="c-image_img is-loaded"
                          alt={card.title}
                          width={1200}
                          height={1300}
                          src={card.image}
                        />
                      </picture>
                    </div>

                    {/* Gradient Overlay for 100% text readability */}
                    <div
                      className="absolute inset-0 pointer-events-none z-1"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.94) 100%)",
                      }}
                    />

                    {/* Card Overlay Content (Identical structure across all 4 cards) */}
                    <div className="c-stacking-cards_card_content relative z-2 w-full h-full flex flex-col justify-between items-start text-left p-6 sm:p-8 md:p-10">
                      {/* Top Badges */}
                      <div className="w-full flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white border border-white/20 shrink-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          {card.pillarCode}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
                          {card.metric}
                        </span>
                      </div>

                      {/* Bottom Editorial Content */}
                      <div className="mt-auto w-full pt-6 sm:pt-8">
                        <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-extrabold text-white max-w-xl leading-tight">
                          {card.title}
                        </h3>
                        <p className="mt-2.5 text-xs sm:text-sm md:text-[15px] text-white/90 max-w-xl leading-relaxed font-normal">
                          {card.subtitle}
                        </p>
                        <div className="mt-4 sm:mt-5">
                          <Link
                            className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200 px-6 py-2.5 sm:py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md"
                            href={card.href}
                          >
                            {card.cta}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Left Editorial Column */}
              <div className="c-stacking-cards_column -left -align-top">
                <div
                  className="c-stacking-cards_block -animated"
                  style={{ "--progress": 0 } as React.CSSProperties}
                >
                  <p className="text-eyebrow max-w-[15rem] text-black font-semibold">
                    Business, Reimagined.
                  </p>
                  <p className="heading-2xs text-neutral-600 max-w-[15rem]">
                    Onspec bridges the gap between having an idea and turning it
                    into a functioning business. You don’t have to start from
                    scratch.
                  </p>
                </div>
              </div>

              {/* Right Editorial Column */}
              <div className="c-stacking-cards_column -right -align-center">
                <div
                  className="c-stacking-cards_block -animated"
                  style={{ "--progress": 0 } as React.CSSProperties}
                >
                  <p className="text-eyebrow max-w-[15rem] text-black font-semibold">
                    Four Pillars. One Execution Partner.
                  </p>
                  <p className="heading-2xs text-neutral-600 max-w-[15rem]">
                    With turnkey physical &amp; digital business launches, 24/7
                    AI automation workflows, custom concept execution, and
                    vetted Cyprus legal professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 : `.c-fullscreen-push`
          Full-Viewport Rounded Architectural Banner with Parallax
         ===================================================================== */}
      <div className="container-xl scroll-reveal">
        <div className="c-fullscreen-push">
          <div className="c-fullscreen-push_content">
            

            <h2 className="sr-only">You don’t have to start from scratch.</h2>
            <SplitText
              text="You don’t have to start from scratch."
              className="text-heading-lg"
            />

            <Link className="c-button -blur-dark -large hover-lift" href="/launch">
              <span className="c-button_inner">
                <span
                  className="c-button_label-container"
                  data-label="Discover Turnkey Opportunities"
                >
                  <span className="c-button_label">
                    Discover Turnkey Opportunities
                  </span>
                </span>
              </span>
            </Link>
          </div>

          <div className="c-image c-fullscreen-push_image -cover -overlay -rounded-md -parallax is-loaded">
            <div className="c-image_parallax">
              <picture className="c-image_inner">
                <img
                  className="c-image_img is-loaded"
                  alt="Onspec Turnkey Business Architecture"
                  width={1600}
                  height={900}
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 5 : `.c-editorial-block`
          "Built for Founders. Engineered for Growth."
          Asymmetric Split Headline + 2-Column Editorial Narrative & Journey
         ===================================================================== */}
      <section className="my-fluid-2xl scroll-reveal">
        <div className="container-xl text-center flex flex-col items-center">
          <p className="text-heading-2xl max-w-3xl text-black font-semibold tracking-tight mx-auto">
            Turnkey businesses built to operate.
          </p>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mt-4 font-normal">
            Turnkey engineered ventures, intelligent AI workflows, and professional Cyprus execution, ready on Day 1.
          </p>
        </div>
      </section>

      <section className="my-fluid-2xl scroll-reveal">
        <div className="c-editorial-block container-xl">
          <div className="c-editorial-block_content">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-black block">
                BUILT FOR FOUNDERS. ENGINEERED FOR GROWTH.
              </span>
              <p className="c-editorial-block_description text-neutral-600">
                We built Onspec around a clear conviction: launching a new
                venture or modernizing an existing business in Cyprus and Europe
                should not require months of fragmented vendor hunting. From our{" "}
                <strong>Six Step Customer Journey</strong> (
                {CUSTOMER_JOURNEY_STEPS.map((s) => s.title).join(" → ")}) to our{" "}
                <strong>7-Stage Long Term Business Ecosystem</strong> (
                {ECOSYSTEM_STAGES.map((e) => e.title).join(" → ")}), we act as
                your single execution partner.
              </p>
            </div>

            <Link className="c-button -color-grey" href="/about">
              <span className="c-button_inner">
                <span
                  className="c-button_label-container"
                  data-label="About Onspec"
                >
                  <span className="c-button_label">About Onspec</span>
                </span>
              </span>
            </Link>
          </div>

          <div className="c-editorial-block_image">
            <div className="c-image -cover -rounded-md -parallax is-loaded">
              <div className="c-image_parallax">
                <picture className="c-image_inner">
                  <img
                    className="c-image_img is-loaded"
                    alt="Onspec Execution & Engineering Studio"
                    width={1200}
                    height={800}
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7 : `.c-push-newsletter`
          "Have an idea? Let's build it." Crosshair `+` Pattern Card
         ===================================================================== */}
      <section className="c-push-newsletter pattern-background background-clip container">
        <div className="c-push-newsletter_content">
          <div className="c-push-newsletter_heading">
            <p className="text-eyebrow text-neutral-600">
              The Execution Starts Now
            </p>

            <h2 className="heading-sm text-black">
              Have an idea? Tell us what you’re thinking. We’ll provide a free
              preliminary proposal.
            </h2>
          </div>

          <div className="c-newsletter">
            {ideaResultRef ? (
              <div className="rounded-2xl bg-white p-6 border border-black/40 shadow-sm space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-black">
                  IDEA REGISTERED &bull; REFERENCE {ideaResultRef}
                </p>
                <p className="text-sm font-semibold text-black">
                  Thank you, {ideaName}. Our Venture Foundry team is preparing
                  your free preliminary proposal.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIdeaResultRef(null);
                    setIdeaName("");
                    setIdeaWhatsapp("");
                    setIdeaEmail("");
                    setIdeaDescription("");
                  }}
                  className="text-xs font-mono underline text-neutral-600 hover:text-black cursor-pointer"
                >
                  Submit another concept
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleIdeaFormSubmit}
                className="c-newsletter_form"
              >
                {/* Pill Input 1: Name */}
                <div className="c-input-text-container c-newsletter_zip-code -placeholder">
                  <label className="text-sm mb-3 sr-only" htmlFor="ideaName">
                    Full Name *
                  </label>
                  <div className="c-input-text">
                    <input
                      className="c-input-text_input text-sm"
                      type="text"
                      id="ideaName"
                      name="ideaName"
                      placeholder="Your name *"
                      required
                      value={ideaName}
                      onChange={(e) => setIdeaName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Pill Input 2: WhatsApp */}
                <div className="c-input-text-container c-newsletter_zip-code -placeholder">
                  <label
                    className="text-sm mb-3 sr-only"
                    htmlFor="ideaWhatsapp"
                  >
                    WhatsApp Number *
                  </label>
                  <div className="c-input-text">
                    <input
                      className="c-input-text_input text-sm"
                      type="tel"
                      id="ideaWhatsapp"
                      name="ideaWhatsapp"
                      placeholder="WhatsApp (+357...) *"
                      required
                      value={ideaWhatsapp}
                      onChange={(e) => setIdeaWhatsapp(e.target.value)}
                    />
                  </div>
                </div>

                {/* Pill Input 3: Idea Description */}
                <div
                  className="c-input-text-container -placeholder"
                  style={{ width: "100%" }}
                >
                  <label
                    className="text-sm mb-3 sr-only"
                    htmlFor="ideaDescription"
                  >
                    Describe your idea
                  </label>
                  <div className="c-input-text">
                    <input
                      className="c-input-text_input text-sm"
                      type="text"
                      id="ideaDescription"
                      name="ideaDescription"
                      placeholder="Describe your idea, budget or target timeline..."
                      required
                      value={ideaDescription}
                      onChange={(e) => setIdeaDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Combined Pill Email + Solid Submit Button */}
                <div className="c-newsletter_inner" style={{ width: "100%" }}>
                  <input
                    className="c-newsletter_input text-sm"
                    type="email"
                    placeholder="name@email.com *"
                    required
                    value={ideaEmail}
                    onChange={(e) => setIdeaEmail(e.target.value)}
                  />

                  <button
                    className="c-button primary -color-black"
                    type="submit"
                    disabled={ideaSubmitting}
                    style={
                      {
                        pointerEvents: "auto",
                        "--button-background": "#000000",
                        "--button-hover-background": "#000000",
                        "--button-color": "#F7F8FA",
                        "--button-hover-color": "#FFFFFF",
                      } as React.CSSProperties
                    }
                  >
                    <span className="c-button_inner">
                      <span
                        className="c-button_label-container"
                        data-label={
                          ideaSubmitting ? "Submitting..." : "Submit Your Idea"
                        }
                      >
                        <span className="c-button_label">
                          {ideaSubmitting ? "Submitting..." : "Submit Your Idea"}
                        </span>
                      </span>

                      <span className="c-icon c-button_icon">
                        <svg
                          className="svg-arrow-right"
                          viewBox="0 0 16 16"
                          focusable="false"
                          aria-hidden="true"
                          style={{ width: "1rem", height: "1rem" }}
                        >
                          <path
                            fill="currentColor"
                            d="M13.8 8.4c.1-.1.2-.3.2-.4 0-.2-.1-.3-.2-.4l-4-4-.4.4-.4.4 3 3H2v1.1h10l-3 3 .4.5.4.4 4-4z"
                          />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="c-push-newsletter_image_container">
          <div className="c-image c-push-newsletter_image -rounded-md -cover -parallax is-loaded">
            <div className="c-image_parallax">
              <picture className="c-image_inner">
                <img
                  className="c-image_img is-loaded"
                  alt="Onspec Venture Foundry & Execution Preview"
                  width={1320}
                  height={1700}
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Specification & Turnkey Quotation Modal */}
      <SpecDrawerModal
        opportunity={selectedOpportunity}
        isOpen={Boolean(selectedOpportunity)}
        onClose={() => setSelectedOpportunity(null)}
      />
    </>
  );
}
