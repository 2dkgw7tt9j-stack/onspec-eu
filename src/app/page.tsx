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
    title: "Vending Networks",
    subtitle: "24/7 Cashless Smart Retail",
    image:
      "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?auto=format&fit=crop&w=900&q=85",
    column: "left",
    small: false,
    opportunityId: "smart-vending-network",
  },
  {
    index: "02",
    title: "Automated Coffee Stations",
    subtitle: "Swiss Bean-to-Cup Kiosks",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85",
    column: "left",
    small: true,
    opportunityId: "automated-coffee-stations",
  },
  {
    index: "03",
    title: "AI Support Systems",
    subtitle: "24/7 WhatsApp & CRM Agents",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    column: "left",
    small: false,
    href: "/automate",
  },
  {
    index: "04",
    title: "Self-Service Kiosks",
    subtitle: "Unmanned Retail & Service Pods",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
    column: "right",
    small: true,
    opportunityId: "self-service-kiosks",
  },
  {
    index: "05",
    title: "Cyprus Legal Network",
    subtitle: "Independent Counsel & Setup",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85",
    column: "right",
    small: false,
    href: "/connect",
  },
  {
    index: "06",
    title: "Turnkey Laundromats",
    subtitle: "Automated Cashless Utility Hubs",
    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=900&q=85",
    column: "right",
    small: true,
    opportunityId: "automated-laundromats",
  },
];

/**
 * 4 Vertical Stacking Cards for Section 2 (`.c-stacking-cards`)
 */
const STACKING_PILLAR_CARDS = [
  {
    index: 0,
    pillarCode: "PILLAR 01 — LAUNCH",
    title: "Ready-to-Launch Businesses",
    subtitle:
      "Vending, Coffee, Kiosks, Laundromats & Car Washes — Location, equipment, suppliers & Cyprus registration coordinated end-to-end.",
    metric: "4–10 WEEKS TO LIVE",
    image:
      "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?auto=format&fit=crop&w=1400&q=85",
    href: "/launch",
    cta: "Explore Launch Models",
  },
  {
    index: 1,
    pillarCode: "PILLAR 02 — AUTOMATE",
    title: "AI & Business Automation",
    subtitle:
      "WhatsApp Business API, 24/7 AI Customer Support Agents, Booking Assistants, CRM Pipelines & Invoice Workflows.",
    metric: "UP TO 78% LESS MANUAL WORK",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    href: "/automate",
    cta: "Explore AI Systems",
  },
  {
    index: 2,
    pillarCode: "PILLAR 03 — INNOVATE",
    title: "Your Idea. Our Execution.",
    subtitle:
      "Have an idea? Tell us what you’re thinking. Receive a free preliminary proposal, quotation & full execution roadmap.",
    metric: "FREE PRELIMINARY PROPOSAL",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    href: "/innovate",
    cta: "Submit Your Idea",
  },
  {
    index: 3,
    pillarCode: "PILLAR 04 — CONNECT",
    title: "Legal & Professional Services",
    subtitle:
      "Independent Cyprus Legal Network across Immigration, Residency, Corporate Formation, Commercial & Criminal Law.",
    metric: "CYPRUS & EU COUNSEL",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    href: "/launch",
    cta: "Explore Ready-to-Launch Specs",
    isFinalCard: true,
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
    label: "01 // TURNKEY VENDING & RETAIL",
    headline:
      "Automated revenue. Locations, hardware, suppliers & Cyprus registration handled.",
    image:
      "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?auto=format&fit=crop&w=1200&q=85",
    modalSpec: PREFAB_OPPORTUNITIES[0],
  },
  {
    label: "02 // AI & WHATSAPP AUTOMATION",
    headline:
      "Your business doesn’t need more manual work. It needs smarter systems.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    modalSpec: {
      id: "ai-whatsapp-automation-suite",
      specCode: "SPEC-A02 // AI-SYSTEMS",
      title: "AI Customer Support & WhatsApp Business Automation Suite",
      category: "Digital & E-Commerce",
      featured: true,
      tagline:
        "24/7 multilingual AI agents, official WhatsApp pipelines, autonomous booking, and CRM synchronization.",
      shortDescription:
        "Production-grade AI and workflow automation engineered around how your business already works.",
      fullDescription:
        "Onspec designs and integrates intelligent automation architectures that eliminate repetitive manual tasks across WhatsApp, email, web chat, booking calendars, CRM pipelines, and accounting workflows—reducing response times to under 4 seconds and freeing up to 78% of administrative overhead.",
      investmentTier: "Custom Modular Architecture",
      estimatedCapital: "€2,500 – €14,500 (Tailored System Build)",
      timeline: "2 – 4 Weeks to Live Deployment",
      locationStrategy: "Cloud & On-Premise Integration — Cyprus, EU & Global",
      autonomyLevel: "95% Automated Triage & Execution",
      weeklyOwnerHours: "Saves 15 – 35+ staff hrs / week",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
      whatsIncluded: [
        "24/7 Multilingual AI Customer Support Agent trained on your exact business data",
        "Official WhatsApp Business API lead qualification, catalog & booking flows",
        "Automated Email Triage, attachment extraction & reply drafting",
        "AI Booking Assistant synchronized with Google/Outlook calendars & deposits",
        "CRM Pipeline synchronization (HubSpot, Pipedrive, Salesforce) & automated invoicing",
      ],
      executionStages: [
        {
          step: "STAGE 01",
          title: "Operational Bottleneck Audit",
          detail:
            "Mapping your current inbound enquiries, WhatsApp messages, emails, bookings, and manual admin tasks.",
        },
        {
          step: "STAGE 02",
          title: "AI Knowledge Base & Workflow Engineering",
          detail:
            "Training custom AI guardrails on your SOPs and connecting APIs across WhatsApp, CRM, and ERP.",
        },
        {
          step: "STAGE 03",
          title: "Sandbox Stress-Testing & Team Handoff Rules",
          detail:
            "Verifying multi-language accuracy, escalation triggers, and instant human takeover notifications.",
        },
        {
          step: "STAGE 04",
          title: "Production Go-Live & Telemetry Monitoring",
          detail:
            "Launching 24/7 autonomous operation with ongoing prompt and conversion optimization.",
        },
      ],
      technicalSpecs: [
        { label: "SPEC ID", value: "OSP-AUT-2026" },
        { label: "CHANNELS", value: "WhatsApp API / Web / Email / Instagram" },
        { label: "RESPONSE LATENCY", value: "< 3.8 Seconds (24/7/365)" },
        { label: "LANGUAGES", value: "English, Greek, Russian, German + 20 more" },
        { label: "INTEGRATIONS", value: "HubSpot, Pipedrive, Stripe, Xero, Calendars" },
        { label: "ROI METRIC", value: "Up to 78% Manual Workload Reduction" },
      ],
      cyprusSetupNotes:
        "Tailored for Cyprus & EU businesses where WhatsApp and instant multilingual response drive customer conversion.",
    },
  },
  {
    label: "03 // CUSTOM VENTURE FOUNDRY",
    headline:
      "Your idea doesn’t have to stay an idea. Free preliminary proposal & execution.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    modalSpec: {
      id: "custom-venture-foundry-spec",
      specCode: "SPEC-I03 // FOUNDRY",
      title: "Custom Business Concept Evaluation & Turnkey Execution",
      category: "Semi-Automated",
      featured: true,
      tagline:
        "From raw business concept to structured feasibility blueprint, free preliminary quotation, and full market launch.",
      shortDescription:
        "Tell us what you are thinking—we evaluate feasibility, provide a free preliminary proposal, and build it end-to-end.",
      fullDescription:
        "Whether you want to bring a new physical service concept to Cyprus, build a custom automated retail network, or launch a digital platform, Onspec acts as your execution partner. You submit your idea, our specialists evaluate commercial and technical feasibility, and we deliver a free preliminary proposal before coordinating the entire build.",
      investmentTier: "Custom Project Quotation",
      estimatedCapital: "Free Preliminary Proposal & Transparent Scope",
      timeline: "48–72 Hours for Initial Feasibility Proposal",
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
          title: "End-to-End Build & Handover",
          detail:
            "Onspec coordinates procurement, setup, automation, and launch readiness.",
        },
      ],
      technicalSpecs: [
        { label: "SPEC ID", value: "OSP-INV-301" },
        { label: "INITIAL PROPOSAL", value: "100% Free Preliminary Quotation" },
        { label: "TURNAROUND", value: "2–3 Business Days for Assessment" },
        { label: "SCOPE", value: "Physical, Digital or Hybrid Ventures" },
        { label: "LEGAL & CORP", value: "Coordinated via Cyprus Legal Network" },
        { label: "SUPPORT", value: "Post-Launch Scaling & AI Optimization" },
      ],
      cyprusSetupNotes:
        "Designed for local and international founders seeking a trusted on-the-ground execution partner in Cyprus.",
    },
  },
  {
    label: "04 // CYPRUS LEGAL & CORPORATE",
    headline:
      "The right professionals. The right guidance. Without the hassle.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    modalSpec: {
      id: "cyprus-legal-network-spec",
      specCode: "SPEC-C04 // LEGAL-NET",
      title: "Cyprus Legal & Professional Services Network",
      category: "Physical Infrastructure",
      featured: true,
      tagline:
        "Direct connection to vetted independent legal professionals in Cyprus across corporate, residency, immigration, and commercial law.",
      shortDescription:
        "Save time and avoid uncertainty by connecting directly with independent licensed legal specialists in Cyprus.",
      fullDescription:
        "Launching a business, relocating, or resolving legal matters in Cyprus requires dependable professional counsel. Onspec connects clients directly with experienced independent legal professionals in Cyprus through its vetted network—covering company registration, commercial contracts, immigration Permits, residency, and criminal or regulatory matters.",
      investmentTier: "Direct Specialist Referral",
      estimatedCapital: "Transparent Engagement with Independent Counsel",
      timeline: "24–48 Hours to Specialist Introduction",
      locationStrategy: "Limassol, Nicosia, Larnaca & Paphos, Cyprus",
      autonomyLevel: "Coordinated Professional Introduction",
      weeklyOwnerHours: "Streamlined Documentation Intake",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      whatsIncluded: [
        "Structured assessment of your corporate, residency, immigration, or legal need",
        "Direct referral to a vetted independent licensed lawyer in Cyprus",
        "Business-related legal matters: company incorporation, shareholder agreements, commercial leases",
        "Immigration & Cyprus residency permit legal guidance",
        "Criminal law representation & dedicated 1-on-1 legal consultations",
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
  "01.VENDING",
  "02.COFFEE",
  "03.KIOSKS",
  "04.LAUNDROMAT",
  "05.CARWASH",
  "06.ECOMMERCE",
  "07.SEMI-AUTO",
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

  // Refs & state for Section 6: Blueprints Carousel (`.c-carousel` 3-per-view, 7 cards)
  const blueprintCarouselRef = useRef<HTMLDivElement | null>(null);
  const [blueprintSlideIndex, setBlueprintSlideIndex] = useState(0);
  const blueprintTotalPages = 5; // 7 items with 3 per view -> 5 pages (0..4)

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

    if (heroEl && maskEl && innerEl && dummyEl) {
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

    // 2. STACKING CARDS (`Nc` exact math from Lightship `app.js`)
    const stackingEl = stackingContainerRef.current;
    const headingEl = stackingHeadingRef.current;
    const firstCard = stackingCardRefs.current[0];

    if (stackingEl && headingEl && firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height || 0;
      const headingStyle = window.getComputedStyle(headingEl);
      const marginBottom =
        parseFloat(headingStyle.getPropertyValue("margin-bottom")) || 0;
      const iconEl = headingEl.querySelector(
        ".c-stacking-cards_heading_icon"
      ) as HTMLElement | null;
      const rawHeadingHeight = iconEl
        ? iconEl.getBoundingClientRect().height
        : headingEl.getBoundingClientRect().height;
      const overlap = vw * 0.12;
      const effectiveHeadingH = rawHeadingHeight - overlap;
      const paddingOffset = Math.max(
        0,
        cardHeight - marginBottom - effectiveHeadingH
      );
      stackingEl.style.setProperty(
        "--padding-offset",
        `${paddingOffset.toFixed(1)}px`
      );

      const h = vw * 0.1 + vh * 0.1;
      stackingCardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        const rect = cardEl.getBoundingClientRect();
        const cardH = Math.max(1, rect.height);
        // Progress as card scrolls past sticky threshold `h`
        const progress = clamp(0, 1, (h - rect.top) / cardH);
        cardEl.style.setProperty("--sticky-progress", progress.toFixed(4));
      });
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

  // Carousel navigation helpers for Section 6 (Blueprints Carousel — Infinite wrap-around support)
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
          SECTION 1 — `.c-hero-home`
          2400px Sticky Scroll Inset-Mask & 6-Card Surround Grid Reveal Hero
         ===================================================================== */}
      <div
        ref={heroRef}
        className="c-hero-home"
        style={{ minHeight: "2400px" }}
      >
        <div data-focus-area="" />
        <div className="c-hero-home_sticky">
          {/* Center Full-Bleed Mask that Shrinks & Rounds on Scroll */}
          <div ref={maskRef} className="c-hero-home_mask" data-mask="">
            <div ref={innerRef} className="c-hero-home_inner" data-inner="">
              <div className="c-hero-home_background">
                <div className="relative block w-full h-full c-hero-home_background">
                  <video
                    className="absolute inset-0 object-cover w-full h-full"
                    loop
                    muted
                    autoPlay
                    playsInline
                    poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                  >
                    <source
                      src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
                      type="video/mp4"
                    />
                  </video>
                  {/* Deep Navy architectural tint for high-contrast Lightship typography */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(16,29,53,0.48) 0%, rgba(16,29,53,0.28) 50%, rgba(16,29,53,0.68) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Split Horizontal Headline Across Vertical Midpoint */}
              <h1
                className="c-hero-home_title text-heading-xl"
                id="page-heading"
              >
                <span className="sr-only">Your Vision.</span>
                <SplitText
                  text="Your Vision."
                  className="c-hero-home_title_line"
                  extraDelay="0s"
                />

                <span className="sr-only">Our Execution.</span>
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
                  const opp = card.opportunityId
                    ? PREFAB_OPPORTUNITIES.find(
                        (o) => o.id === card.opportunityId
                      )
                    : null;
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
                      <div
                        onClick={() => {
                          if (opp) setSelectedOpportunity(opp);
                        }}
                        className="c-image c-hero-home_image -rounded-md -cover is-loaded group cursor-pointer relative overflow-hidden"
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
                              "linear-gradient(180deg, rgba(16,29,53,0.1) 0%, rgba(16,29,53,0.72) 100%)",
                          }}
                        />
                        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between text-white">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#27B58A] block">
                              {card.index} // ONSPEC
                            </span>
                            <p className="text-xs md:text-sm font-semibold leading-tight">
                              {card.title}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-white/75 hidden xl:inline">
                            {card.subtitle}
                          </span>
                        </div>
                      </div>
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
                  const opp = card.opportunityId
                    ? PREFAB_OPPORTUNITIES.find(
                        (o) => o.id === card.opportunityId
                      )
                    : null;
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
                      <div
                        onClick={() => {
                          if (opp) setSelectedOpportunity(opp);
                        }}
                        className="c-image c-hero-home_image -rounded-md -cover is-loaded group cursor-pointer relative overflow-hidden"
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
                              "linear-gradient(180deg, rgba(16,29,53,0.1) 0%, rgba(16,29,53,0.72) 100%)",
                          }}
                        />
                        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between text-white">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#27B58A] block">
                              {card.index} // ONSPEC
                            </span>
                            <p className="text-xs md:text-sm font-semibold leading-tight">
                              {card.title}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-white/75 hidden xl:inline">
                            {card.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Lead Statement & Dual Pill CTAs below the Hero Grid Reveal */}
      <section className="container my-fluid-3xl">
        <div className="flex flex-col gap-y-10 items-center text-center mx-auto max-w-3xl">
          <p
            className="text-lg text-[#253B5B] max-w-xl is-inview"
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
              href="/launch"
              className="c-button"
              style={
                {
                  "--button-background": "#27B58A",
                  "--button-color": "#101D35",
                  "--button-hover-background": "#101D35",
                  "--button-hover-color": "#F7F8FA",
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
              href="/automate"
              className="c-button -blur-dark"
              style={
                {
                  "--button-background": "#101D35",
                  "--button-color": "#F7F8FA",
                  "--button-hover-background": "#253B5B",
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
          SECTION 2 — `.c-stacking-cards`
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
              <div className="c-stacking-cards_heading_icon text-[#101D35]">
                <h2 className="sr-only">This is ONSPEC</h2>
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="c-icon text-[#27B58A]">
                    <svg
                      className="svg-symbol-double"
                      viewBox="0 0 28 13"
                      focusable="false"
                      aria-hidden="true"
                      style={{ width: "2rem", height: "0.95rem" }}
                    >
                      <path
                        fill="currentColor"
                        d="m7.1.4.7 2.3c.4 1.2 1.3 2.2 2.5 2.5l2.3.9c.4.1.4.7 0 .8l-2.3.9c-1.1.4-2.1 1.3-2.5 2.5l-.7 2.3c-.1.4-.7.4-.8 0l-.8-2.3c-.3-1.2-1.3-2.1-2.4-2.5L.8 7c-.4-.1-.4-.7 0-.8l2.3-.8C4.2 4.9 5.2 4 5.5 2.7L6.2.4c.2-.4.8-.4.9 0zm14.6 0c-.1-.4-.7-.4-.8 0l-.7 2.3c-.4 1.2-1.3 2.2-2.5 2.5l-2.3.9c-.4.1-.4.7 0 .8l2.2.8c1.2.4 2.1 1.3 2.5 2.5l.7 2.3c.1.4.7.4.8 0l.7-2.3c.4-1.2 1.3-2.2 2.5-2.5l2.3-.7c.5-.1.5-.7.1-.8l-2.3-.8c-1.2-.4-2.1-1.3-2.5-2.5L21.7.4z"
                      />
                    </svg>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                    ONSPEC.EU // 4 EXECUTION PILLARS
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

                    {/* Card Overlay Content */}
                    <div
                      className="c-stacking-cards_card_content"
                      style={{
                        justifyContent: card.isFinalCard
                          ? "center"
                          : "space-between",
                        alignItems: card.isFinalCard ? "center" : "flex-start",
                        textAlign: card.isFinalCard ? "center" : "left",
                      }}
                    >
                      <div className="w-full flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#101D35]/80 backdrop-blur-md px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-[#27B58A] border border-white/15">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#27B58A]" />
                          {card.pillarCode}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-white/85 bg-black/35 backdrop-blur-md px-3 py-1 rounded-full">
                          {card.metric}
                        </span>
                      </div>

                      {card.isFinalCard ? (
                        <div className="my-auto flex flex-col items-center gap-4">
                          <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                            {card.title}
                          </p>
                          <p className="heading-md max-w-[18rem]">
                            Your business, turnkey.
                          </p>
                          <p className="text-sm text-white/85 max-w-[24rem]">
                            {card.subtitle}
                          </p>
                          <Link
                            className="c-button -blur-dark mt-2"
                            href="/launch"
                          >
                            <span className="c-button_inner">
                              <span
                                className="c-button_label-container"
                                data-label="Explore Ready-to-Launch Specs"
                              >
                                <span className="c-button_label">
                                  Explore Ready-to-Launch Specs
                                </span>
                              </span>
                            </span>
                          </Link>
                        </div>
                      ) : (
                        <div className="mt-auto w-full pt-8">
                          <h3 className="heading-sm text-white max-w-md">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/85 max-w-md leading-relaxed">
                            {card.subtitle}
                          </p>
                          <div className="mt-5">
                            <Link
                              className="c-button -blur-dark"
                              href={card.href}
                            >
                              <span className="c-button_inner">
                                <span
                                  className="c-button_label-container"
                                  data-label={card.cta}
                                >
                                  <span className="c-button_label">
                                    {card.cta}
                                  </span>
                                </span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}
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
                  <p className="text-eyebrow max-w-[15rem] text-[#101D35] font-semibold">
                    Business, Reimagined.
                  </p>
                  <p className="heading-2xs text-[#253B5B]/80 max-w-[15rem]">
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
                  <p className="text-eyebrow max-w-[15rem] text-[#101D35] font-semibold">
                    Four Pillars. One Execution Partner.
                  </p>
                  <p className="heading-2xs text-[#253B5B]/80 max-w-[15rem]">
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
          SECTION 3 — `.c-carousel` ("Smart Systems. Smooth Execution.")
          Horizontal Feature Slider with `+` Modal Triggers
         ===================================================================== */}
      <section className="my-fluid-2xl">
        <section className="flex flex-col gap-y-fluid-xl overflow-hidden">
          <div className="container">
            <div className="flex flex-col gap-y-10 items-center text-center mx-auto max-w-3xl">
              <h2 className="sr-only">Smart Systems. Smooth Execution.</h2>
              <SplitText
                text="Smart Systems. Smooth Execution."
                className="anim-text-balance heading-xl text-[#101D35]"
              />

              <Link className="c-button -color-grey" href="/automate">
                <span className="c-button_inner">
                  <span
                    className="c-button_label-container"
                    data-label="AI & Automation"
                  >
                    <span className="c-button_label">AI &amp; Automation</span>
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div
            className="c-carousel is-inview"
            data-items-per-view="2"
            data-anim-parent=""
            data-scroll=""
          >
            <div
              ref={featureCarouselRef}
              className="c-carousel_container"
              data-container=""
              blossom-carousel="true"
              has-overflow="true"
            >
              {FEATURE_CAROUSEL_SPECS.map((item, idx) => (
                <div
                  key={item.label}
                  className="c-carousel_item @container is-inview"
                  data-item=""
                  data-anim-slide=""
                  style={{ "--index": idx } as React.CSSProperties}
                >
                  <article
                    className="c-tile-feature cursor-pointer group"
                    onClick={() => setSelectedOpportunity(item.modalSpec)}
                  >
                    <div className="c-image c-tile-feature_image -cover -rounded-md -overlay is-loaded">
                      <picture className="c-image_inner">
                        <img
                          className="c-image_img is-loaded transition-transform duration-700 group-hover:scale-105"
                          alt={item.headline}
                          width={1184}
                          height={740}
                          src={item.image}
                        />
                      </picture>
                    </div>

                    <div className="c-tile-feature_inner">
                      <div className="c-tile-feature_content">
                        <p className="c-tile-feature_label text-eyebrow text-[#27B58A] font-mono">
                          {item.label}
                        </p>

                        <h3 className="c-tile-feature_title heading-xs">
                          {item.headline}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOpportunity(item.modalSpec);
                        }}
                        aria-label={`Open specification for ${item.label}`}
                        className="c-button -icon -blur-dark c-tile-feature_button"
                        style={{ pointerEvents: "auto" }}
                      >
                        <span className="c-button_inner">
                          <span className="c-icon c-button_icon">
                            <svg
                              className="svg-plus"
                              viewBox="0 0 16 16"
                              focusable="false"
                              aria-hidden="true"
                              style={{ width: "1rem", height: "1rem" }}
                            >
                              <path
                                fill="currentColor"
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

            {/* Carousel Controls: Circular ← / → Buttons + Pagination Dots */}
            <div className="c-carousel_controls container">
              <nav className="c-carousel_nav">
                <button
                  type="button"
                  onClick={() =>
                    scrollFeatureCarouselTo(featureSlideIndex - 1)
                  }
                  disabled={featureSlideIndex === 0}
                  className="c-button -icon -color-grey"
                  style={{ pointerEvents: "auto" }}
                  aria-label="Previous feature slide"
                >
                  <span className="c-button_inner">
                    <span className="c-icon c-button_icon">
                      <svg
                        className="svg-arrow-left"
                        viewBox="0 0 16 16"
                        focusable="false"
                        aria-hidden="true"
                        style={{ width: "1rem", height: "1rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M2.1 7.6c-.1.1-.2.2-.2.4s.1.3.2.4l4 4 .4-.4.4-.4-3-3h10V7.4h-10l3-3-.4-.4-.4-.4-4 4z"
                        />
                      </svg>
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollFeatureCarouselTo(featureSlideIndex + 1)
                  }
                  disabled={featureSlideIndex >= featureTotalPages - 1}
                  className="c-button -icon -color-grey"
                  style={{ pointerEvents: "auto" }}
                  aria-label="Next feature slide"
                >
                  <span className="c-button_inner">
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
              </nav>

              <ul className="c-carousel_pagination">
                {Array.from({ length: featureTotalPages }).map((_, pIdx) => (
                  <li key={pIdx} className="c-carousel_page">
                    <button
                      type="button"
                      onClick={() => scrollFeatureCarouselTo(pIdx)}
                      aria-label={`Go to slide ${pIdx + 1}`}
                      className={`c-carousel_page_button ${
                        featureSlideIndex === pIdx ? "is-active" : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>

      {/* =====================================================================
          SECTION 4 — `.c-fullscreen-push`
          Full-Viewport Rounded Architectural Banner with Parallax
         ===================================================================== */}
      <div className="container-xl">
        <div className="c-fullscreen-push">
          <div className="c-fullscreen-push_content">
            <span className="c-icon c-fullscreen-push_icon text-[#27B58A]">
              <svg
                className="svg-symbol-double"
                viewBox="0 0 28 13"
                focusable="false"
                aria-hidden="true"
                style={{ width: "1.75rem", height: "0.85rem" }}
              >
                <path
                  fill="currentColor"
                  d="m7.1.4.7 2.3c.4 1.2 1.3 2.2 2.5 2.5l2.3.9c.4.1.4.7 0 .8l-2.3.9c-1.1.4-2.1 1.3-2.5 2.5l-.7 2.3c-.1.4-.7.4-.8 0l-.8-2.3c-.3-1.2-1.3-2.1-2.4-2.5L.8 7c-.4-.1-.4-.7 0-.8l2.3-.8C4.2 4.9 5.2 4 5.5 2.7L6.2.4c.2-.4.8-.4.9 0zm14.6 0c-.1-.4-.7-.4-.8 0l-.7 2.3c-.4 1.2-1.3 2.2-2.5 2.5l-2.3.9c-.4.1-.4.7 0 .8l2.2.8c1.2.4 2.1 1.3 2.5 2.5l.7 2.3c.1.4.7.4.8 0l.7-2.3c.4-1.2 1.3-2.2 2.5-2.5l2.3-.7c.5-.1.5-.7.1-.8l-2.3-.8c-1.2-.4-2.1-1.3-2.5-2.5L21.7.4z"
                />
              </svg>
            </span>

            <h2 className="sr-only">You don’t have to start from scratch.</h2>
            <SplitText
              text="You don’t have to start from scratch."
              className="text-heading-lg"
            />

            <Link className="c-button -blur-dark -large" href="/launch">
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
          SECTION 5 — `.c-editorial-block`
          "Built for Founders. Engineered for Growth."
          Asymmetric Split Headline + 2-Column Editorial Narrative & Journey
         ===================================================================== */}
      <section className="mb-fluid-2xl mt-4">
        <div className="container-xl">
          <p className="text-heading-2xl max-w-[1000px] text-[#101D35]">
            Discover a simpler way to launch, automate and scale—where turnkey
            businesses deploy in weeks, intelligent AI handles daily operations,
            and vetted Cyprus professionals support every milestone.
          </p>
        </div>
      </section>

      <section className="my-fluid-2xl">
        <div className="c-editorial-block container-xl">
          <div className="c-editorial-block_content">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A] block">
                BUILT FOR FOUNDERS. ENGINEERED FOR GROWTH.
              </span>
              <p className="c-editorial-block_description text-[#253B5B]">
                We built Onspec around a clear conviction: launching a new
                venture or modernizing an existing business in Cyprus and Europe
                should not require months of fragmented vendor hunting. From our{" "}
                <strong>6-Step Customer Journey</strong> (
                {CUSTOMER_JOURNEY_STEPS.map((s) => s.title).join(" → ")}) to our{" "}
                <strong>7-Stage Long-Term Business Ecosystem</strong> (
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
          SECTION 6 — `.c-carousel` Opportunity Blueprints Horizontal Carousel
          7 Ready-to-Launch Business Blueprints (`.c-tile-article`)
         ===================================================================== */}
      <section className="my-fluid-2xl">
        <section className="flex flex-col gap-y-fluid-xl overflow-hidden">
          <div className="container">
            <div className="flex flex-col gap-y-10 items-center text-center mx-auto max-w-3xl">
              <h2 className="sr-only">Ready-to-Launch Blueprints</h2>
              <SplitText
                text="Ready-to-Launch Blueprints"
                className="anim-text-balance heading-xl text-[#101D35]"
              />
            </div>
          </div>

          <div
            className="c-carousel is-inview"
            data-items-per-view="3"
            data-anim-parent=""
            data-scroll=""
          >
            <div
              ref={blueprintCarouselRef}
              className="c-carousel_container"
              data-container=""
              blossom-carousel="true"
              has-overflow="true"
            >
              {PREFAB_OPPORTUNITIES.map((opp, idx) => {
                const blueprintCode =
                  BLUEPRINT_SHORT_CODES[idx] || `0${idx + 1}.SPEC`;
                return (
                  <div
                    key={opp.id}
                    className="c-carousel_item @container is-inview"
                    data-item=""
                    data-anim-slide=""
                    style={{ "--index": idx } as React.CSSProperties}
                  >
                    <article
                      className="c-tile-article -default cursor-pointer group"
                      data-anim=""
                      onClick={() => setSelectedOpportunity(opp)}
                    >
                      <div className="c-image hover-scale c-tile-article_image -rounded-md -cover is-loaded relative">
                        <picture className="c-image_inner">
                          <img
                            className="c-image_img is-loaded"
                            alt={opp.title}
                            width={700}
                            height={555}
                            src={opp.image}
                          />
                        </picture>
                        <span className="absolute top-3 left-3 z-10 rounded-full bg-[#101D35]/85 backdrop-blur-md px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#27B58A]">
                          {blueprintCode}
                        </span>
                      </div>

                      <div className="c-tile-article_content">
                        <h3>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOpportunity(opp);
                            }}
                            className="heading-xs hover:underline text-left text-[#101D35] cursor-pointer"
                          >
                            {opp.title}
                          </button>
                        </h3>

                        <p className="text-sm text-[#253B5B]/80 font-mono">
                          {blueprintCode} • {opp.estimatedCapital} •{" "}
                          {opp.timeline}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls: ← / → Buttons (Infinite Loop) + Pagination Dots */}
            <div className="c-carousel_controls container">
              <nav className="c-carousel_nav">
                <button
                  type="button"
                  onClick={() =>
                    scrollBlueprintCarouselTo(blueprintSlideIndex - 1)
                  }
                  className="c-button -icon -color-grey"
                  style={{ pointerEvents: "auto" }}
                  aria-label="Previous blueprint slide"
                >
                  <span className="c-button_inner">
                    <span className="c-icon c-button_icon">
                      <svg
                        className="svg-arrow-left"
                        viewBox="0 0 16 16"
                        focusable="false"
                        aria-hidden="true"
                        style={{ width: "1rem", height: "1rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M2.1 7.6c-.1.1-.2.2-.2.4s.1.3.2.4l4 4 .4-.4.4-.4-3-3h10V7.4h-10l3-3-.4-.4-.4-.4-4 4z"
                        />
                      </svg>
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollBlueprintCarouselTo(blueprintSlideIndex + 1)
                  }
                  className="c-button -icon -color-grey"
                  style={{ pointerEvents: "auto" }}
                  aria-label="Next blueprint slide"
                >
                  <span className="c-button_inner">
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
              </nav>

              <ul className="c-carousel_pagination">
                {Array.from({ length: blueprintTotalPages }).map((_, pIdx) => (
                  <li key={pIdx} className="c-carousel_page">
                    <button
                      type="button"
                      onClick={() => scrollBlueprintCarouselTo(pIdx)}
                      aria-label={`Go to blueprint page ${pIdx + 1}`}
                      className={`c-carousel_page_button ${
                        blueprintSlideIndex === pIdx ? "is-active" : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>

      {/* =====================================================================
          SECTION 7 — `.c-push-newsletter`
          "Have an idea? Let's build it." Crosshair `+` Pattern Card
         ===================================================================== */}
      <section className="c-push-newsletter pattern-background background-clip container">
        <div className="c-push-newsletter_content">
          <div className="c-push-newsletter_heading">
            <p className="text-eyebrow text-[#253B5B]">
              The Execution Starts Now
            </p>

            <h2 className="heading-sm text-[#101D35]">
              Have an idea? Tell us what you’re thinking. We’ll provide a free
              preliminary proposal.
            </h2>
          </div>

          <div className="c-newsletter">
            {ideaResultRef ? (
              <div className="rounded-2xl bg-white p-6 border border-[#27B58A]/40 shadow-sm space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                  IDEA REGISTERED // REF {ideaResultRef}
                </p>
                <p className="text-sm font-semibold text-[#101D35]">
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
                  className="text-xs font-mono underline text-[#253B5B] hover:text-[#101D35] cursor-pointer"
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
                        "--button-background": "#101D35",
                        "--button-hover-background": "#27B58A",
                        "--button-color": "#F7F8FA",
                        "--button-hover-color": "#101D35",
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
