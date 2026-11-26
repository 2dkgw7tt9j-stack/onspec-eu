export interface PillarSpec {
  id: string;
  index: string;
  code: string;
  name: string;
  shortTitle: string;
  fullTitle: string;
  coreMessage: string;
  headline: string;
  description: string;
  href: string;
  ctaLabel: string;
  deliverables: string[];
  telemetryMetric: string;
  telemetryValue: string;
}

export type OpportunityCategory =
  | "Automated Retail"
  | "Physical Infrastructure"
  | "Digital & Ecommerce"
  | "Semi-Automated";

export interface ExecutionStage {
  step: string;
  title: string;
  detail: string;
}

export interface PrefabOpportunity {
  id: string;
  specCode: string;
  title: string;
  category: OpportunityCategory;
  featured?: boolean;
  flagship?: boolean;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  investmentTier: string;
  estimatedCapital: string;
  timeline: string;
  locationStrategy: string;
  autonomyLevel: string;
  weeklyOwnerHours: string;
  image: string;
  whatsIncluded: string[];
  executionStages: ExecutionStage[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  cyprusSetupNotes: string;
}

export interface AutomationModule {
  id: string;
  code: string;
  title: string;
  category: "Customer Facing" | "Operations & CRM" | "Finance & Admin" | "Infrastructure";
  tagline: string;
  description: string;
  capabilities: string[];
  connectedPlatforms: string[];
  timeSavedHoursPerWeek: number;
  efficiencyMetric: string;
  sampleTrigger: string;
  sampleAction: string;
}

export interface CustomerJourneyStep {
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

export interface EcosystemStage {
  step: string;
  title: string;
  description: string;
  pillarRef: string;
}

export interface LegalServiceCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  typicalMatters: string[];
  referralProcess: string;
}

export const BRAND_INFO = {
  name: "ONSPEC",
  domain: "onspec.eu",
  slogan: "Your vision. Our execution.",
  descriptor: "Business Solutions • Business Creation • AI & Automation",
  region: "Cyprus & European Union",
  emailPrimary: "info@onspec.eu",
  emailSecondary: "hello@onspec.eu",
  whatsappDisplay: "+357 99 000 000",
  whatsappLink: "https://wa.me/35799000000",
  headquarters: "Limassol & Nicosia, Cyprus : EU Operations Desk",
  legalDisclaimer:
    "Onspec connects clients with experienced independent legal professionals in Cyprus through its professional network. Onspec is a business solutions company and does not itself practice law or operate as a law firm.",
};

export const HERO_TELEMETRY_ITEMS = [
  {
    index: "01",
    code: "LAUNCH // TURNKEY VENTURES",
    title: "Ready to Launch Prefab Businesses",
    metric: "7 Proven Models",
    href: "/launch",
  },
  {
    index: "02",
    code: "AUTOMATE // AI SYSTEMS",
    title: "Intelligent Business Automation",
    metric: "24/7 Autonomous Ops",
    href: "/automate",
  },
  {
    index: "03",
    code: "INNOVATE // CUSTOM EXECUTION",
    title: "Submit Your Idea : Free Proposal",
    metric: "Concept to Reality",
    href: "/innovate",
  },
  {
    index: "04",
    code: "CONNECT // CYPRUS LEGAL NETWORK",
    title: "Vetted Legal & Corporate Referrals",
    metric: "Independent Counsel",
    href: "/connect",
  },
];

export const MARQUEE_TICKER_ITEMS = [
  "01 // SMART VENDING NETWORKS : CYPRUS & EU",
  "02 // AI CUSTOMER SUPPORT AGENTS : 24/7 MULTILINGUAL",
  "03 // AUTOMATED BARISTA COFFEE STATIONS",
  "04 // WHATSAPP & OMNI-CHANNEL CRM AUTOMATION",
  "05 // SELF-SERVICE RETAIL & TICKETING KIOSKS",
  "06 //AUTOMATED LAUNDROMAT INFRASTRUCTURE",
  "07 // EXPRESS TOUCHLESS CAR WASH SYSTEMS",
  "08 // AI BOOKING & INVOICE WORKFLOWS",
  "09 // TURNKEY E-COMMERCE & FULFILLMENT SYSTEMS",
  "10 // CYPRUS CORPORATE & LEGAL PROFESSIONAL NETWORK",
];

export const PILLARS: PillarSpec[] = [
  {
    id: "launch",
    index: "01",
    code: "PILLAR 01 // LAUNCH",
    name: "LAUNCH",
    shortTitle: "Launch a Business",
    fullTitle: "Ready to Launch Prefabricated Business Models",
    coreMessage: "You don’t have to start from scratch.",
    headline: "Turnkey commercial ventures engineered for rapid deployment.",
    description:
      "We take proven, high demand physical and digital business models and coordinate every operational layer, from location scouting and hardware sourcing to supplier contracts, Cyprus company formation via independent professionals, and launch readiness.",
    href: "/launch",
    ctaLabel: "Explore Ready to Launch Businesses",
    deliverables: [
      "Opportunity Feasibility & Location Scouting",
      "Commercial Hardware & Equipment Sourcing",
      "Wholesale Supplier & Telemetry Integration",
      "Cyprus Company Formation via Legal Network",
      "Turnkey Operational Setup & Handover",
    ],
    telemetryMetric: "DEPLOYMENT READINESS",
    telemetryValue: "4 to 10 WEEKS",
  },
  {
    id: "automate",
    index: "02",
    code: "PILLAR 02 // AUTOMATE",
    name: "AUTOMATE",
    shortTitle: "AI & Automation",
    fullTitle: "Intelligent Systems & Business Process Automation",
    coreMessage: "Your business doesn’t need more manual work. It needs smarter systems.",
    headline: "Eliminate repetitive bottlenecks with production grade AI.",
    description:
      "We architect and integrate intelligent AI agents, WhatsApp automation, autonomous booking engines, CRM pipelines, and invoice workflows directly into your existing operations so your team focuses on growth.",
    href: "/automate",
    ctaLabel: "Explore AI & Automation Systems",
    deliverables: [
      "24/7 AI Customer Support & Sales Agents",
      "WhatsApp Business & Email Triage Automation",
      "Automated Appointment & Booking Assistants",
      "CRM Pipeline & Lead Capture Synchronization",
      "Invoice, Bookkeeping & Admin Workflow Automation",
    ],
    telemetryMetric: "MANUAL TASK REDUCTION",
    telemetryValue: "UP TO 78%",
  },
  {
    id: "innovate",
    index: "03",
    code: "PILLAR 03 // INNOVATE",
    name: "INNOVATE",
    shortTitle: "Submit Your Idea",
    fullTitle: "Custom Concept Evaluation & End to End Execution",
    coreMessage: "Your idea doesn’t have to stay an idea.",
    headline: "Have an idea? Let’s build it with a structured execution roadmap.",
    description:
      "Tell us what you are thinking, whether it is a new physical venture, a digital platform, or a hybrid concept. Onspec evaluates feasibility, structures the operational plan, and delivers a free preliminary proposal or quotation.",
    href: "/innovate",
    ctaLabel: "Submit Your Idea for Free Proposal",
    deliverables: [
      "Confidential Concept & Feasibility Review",
      "Technical & Operational Architecture Blueprint",
      "Transparent Cost & Timeline Quotation",
      "Hardware, Software & Vendor Procurement",
      "Full Project Management to Market Launch",
    ],
    telemetryMetric: "INITIAL PROPOSAL",
    telemetryValue: "FREE QUOTATION",
  },
  {
    id: "connect",
    index: "04",
    code: "PILLAR 04 // CONNECT",
    name: "CONNECT",
    shortTitle: "Legal & Professional Network",
    fullTitle: "Cyprus Legal & Professional Services Network",
    coreMessage: "The right professionals. The right guidance. Without the hassle of finding them yourself.",
    headline: "Direct connection to vetted independent legal counsel in Cyprus.",
    description:
      "Navigating corporate, residency, immigration, or commercial matters in Cyprus requires trusted counsel. Through our vetted network of independent legal professionals, we connect you directly with the right specialist.",
    href: "/connect",
    ctaLabel: "Access Cyprus Legal Network",
    deliverables: [
      "Immigration & Work Permit Legal Referrals",
      "Cyprus Residency & Relocation Counsel",
      "Corporate Formation & Commercial Contracts",
      "Criminal Law & Regulatory Defense Referrals",
      "Dedicated Legal Consultations in Cyprus",
    ],
    telemetryMetric: "JURISDICTION FOCUS",
    telemetryValue: "CYPRUS & EU",
  },
];

export const SCRATCH_VS_ONSPEC_COMPARISON = [
  {
    dimension: "Location & Commercial Lease",
    scratch: "Months of cold-calling landlords, uncertain footfall data, and unvetted site terms.",
    onspec: "Pre vetted high footfall locations in Cyprus & EU with structured lease negotiation support.",
  },
  {
    dimension: "Equipment & Supplier Sourcing",
    scratch: "Fragmented overseas vendors, retail markups, incompatible payment telemetry.",
    onspec: "Commercial grade hardware, EMV/contactless telemetry, and vetted wholesale product suppliers.",
  },
  {
    dimension: "Corporate & Regulatory Setup",
    scratch: "Navigating Cyprus registrar requirements, permits, and legal paperwork alone.",
    onspec: "Seamless coordination with independent legal and accounting professionals in Cyprus.",
  },
  {
    dimension: "Operations & Customer Handling",
    scratch: "Manual customer messages, missed bookings, spreadsheet chaos, high staff overhead.",
    onspec: "Integrated AI support agents, WhatsApp workflows, automated CRM, and remote telemetry.",
  },
  {
    dimension: "Time to Revenue",
    scratch: "6 to 14 months of costly trial and error.",
    onspec: "Structured 4 to 10 week turnkey deployment specification.",
  },
];

export const VENDING_FLAGSHIP_BLUEPRINT: ExecutionStage[] = [
  {
    step: "STAGE 01",
    title: "Identifying High Yield Opportunities",
    detail:
      "Demographic and commercial analysis across Cyprus business districts, universities, marinas, gyms, healthcare hubs, and transit corridors to match the exact machine specification to daily demand.",
  },
  {
    step: "STAGE 02",
    title: "Finding & Securing Prime Locations",
    detail:
      "Onspec conducts physical site assessments, footfall verification, power/connectivity checks, and coordinates placement agreements with property owners and facility operators.",
  },
  {
    step: "STAGE 03",
    title: "Sourcing Commercial Equipment",
    detail:
      "Procurement of smart touchscreen, refrigerated, or specialty vending units equipped with Nayax/EMV contactless payment terminals, Apple Pay/Google Pay, and real time cloud inventory telemetry.",
  },
  {
    step: "STAGE 04",
    title: "Coordinating Wholesale Suppliers",
    detail:
      "Establishing direct supply lines with local Cyprus and EU FMCG distributors for beverages, healthy snacks, specialty items, or high margin convenience goods.",
  },
  {
    step: "STAGE 05",
    title: "Structured Business Planning",
    detail:
      "Unit economics modeling, SKU planogram optimization, pricing strategy, restocking route scheduling, and break even cashflow projections.",
  },
  {
    step: "STAGE 06",
    title: "Company Registration in Cyprus",
    detail:
      "Coordinated introduction to independent legal and corporate professionals in Cyprus to handle company incorporation, tax/VAT registration, and municipal compliance.",
  },
  {
    step: "STAGE 07",
    title: "Operational & Telemetry Setup",
    detail:
      "Physical delivery, anchoring, telemetry SIM activation, remote stock alert dashboard configuration, and automated daily sales reporting.",
  },
  {
    step: "STAGE 08",
    title: "Launch Preparation & Handover",
    detail:
      "Initial product stocking, live payment stress testing, owner dashboard training, and ongoing operational scaling support.",
  },
];

export const PREFAB_OPPORTUNITIES: PrefabOpportunity[] = [
  {
    id: "smart-vending-network",
    specCode: "SPEC-L01 // FLAGSHIP",
    title: "Smart Vending Machine Business",
    category: "Automated Retail",
    featured: true,
    flagship: true,
    tagline: "24/7 autonomous cashless retail units in prime Cyprus footfall zones.",
    shortDescription:
      "Complete turnkey vending business including location scouting, smart contactless machines, wholesale supplier setup, Cyprus corporate coordination, and cloud inventory telemetry.",
    fullDescription:
      "Our flagship ready to launch business model. Designed for investors, professionals, and first time entrepreneurs seeking a low overhead, scalable physical asset business in Cyprus. Onspec coordinates every stage from securing high traffic locations to installing cloud connected smart vending hardware and connecting wholesale FMCG suppliers.",
    investmentTier: "Tier 1 : Accessible Entry & Multi Unit Scalable",
    estimatedCapital: "€12,500 to €45,000 (1 to 4 Smart Units Turnkey)",
    timeline: "4 to 6 Weeks to Live Operation",
    locationStrategy: "Offices, Gyms, Universities, Hospitals, Marinas & Aparthotels in Cyprus",
    autonomyLevel: "92% Autonomous (Cloud Telemetry + Scheduled Restock)",
    weeklyOwnerHours: "3 to 6 hrs / week",
    image:
      "https://images.unsplash.com/photo-1787499670012-359385f575e8?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Opportunity analysis & prime location scouting/securing in Cyprus",
      "Commercial smart vending hardware with touchscreen & lift/spiral delivery",
      "Contactless EMV, Apple Pay, Google Pay & live mobile telemetry system",
      "Direct wholesale supplier introductions & SKU margin planogram",
      "Company registration in Cyprus coordinated via vetted legal professionals",
      "Full delivery, installation, commissioning & owner telemetry onboarding",
    ],
    executionStages: VENDING_FLAGSHIP_BLUEPRINT,
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-VND-2026" },
      { label: "PAYMENT SYSTEM", value: "EMV Contactless / NFC / QR" },
      { label: "TELEMETRY", value: "4G Cloud Inventory & Live Alerts" },
      { label: "POWER / FOOTPRINT", value: "230V Standard / 1.2m² per unit" },
      { label: "TARGET ROI WINDOW", value: "12 to 18 Months (Location Dependent)" },
      { label: "JURISDICTION", value: "Cyprus & EU Ready" },
    ],
    cyprusSetupNotes:
      "Includes location placement agreement coordination in Limassol, Nicosia, Larnaca, or Paphos and corporate registration support via independent legal professionals.",
  },
  {
    id: "automated-coffee-stations",
    specCode: "SPEC-L02 // BARISTA-AI",
    title: "Automated Specialty Coffee Stations",
    category: "Automated Retail",
    featured: true,
    tagline: "Fresh bean Swiss engineered espresso kiosks operating 24/7 without barista payroll.",
    shortDescription:
      "Self contained commercial barista corners delivering specialty espresso, iced coffee, and matcha with cashless ordering and automated CIP cleaning cycles.",
    fullDescription:
      "Coffee consumption in Cyprus and southern Europe is among the highest per capita in the region. Automated Specialty Coffee Stations capture daily commuter, corporate, and campus traffic with zero barista staffing costs, consistent extraction quality, and automated telemetry notifications.",
    investmentTier: "Tier 2 : High Margin Daily Frequency",
    estimatedCapital: "€18,000 to €38,000 per Station",
    timeline: "5 to 7 Weeks to Live Operation",
    locationStrategy: "Corporate Plazas, Co-Working Hubs, Transit Terminals, Medical Centers",
    autonomyLevel: "90% Autonomous (Automated Rinsing + Telemetry Alerts)",
    weeklyOwnerHours: "4 to 7 hrs / week",
    image:
      "https://images.unsplash.com/photo-1581068106019-5aa70c6ab424?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Commercial dual-grinder fresh-bean automated espresso kiosk",
      "Integrated cup dispenser, ice-module option & architectural cabinet",
      "Contactless terminal + loyalty QR repeat-customer module",
      "Specialty coffee roaster & dairy/consumables supplier coordination",
      "Site lease negotiation & water/filtration plumbing specification",
      "Cyprus corporate & health compliance coordination via professionals",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Footfall & Commuter Flow Audit", detail: "Selecting locations with 350+ daily captive visitors." },
      { step: "STAGE 02", title: "Hardware & Cabinetry Engineering", detail: "Custom-branded architectural coffee module procurement." },
      { step: "STAGE 03", title: "Roaster & Consumable Supply Chain", detail: "Wholesale bean, cup, and milk pipeline establishment." },
      { step: "STAGE 04", title: "Installation, Calibration & Launch", detail: "Water filtration, recipe calibration, and telemetry handover." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-COF-204" },
      { label: "CAPACITY", value: "250+ Cups Before Refill" },
      { label: "EXTRACTION", value: "Whole Bean Commercial Swiss Group" },
      { label: "FOOTPRINT", value: "1.5m² to 2.2m² Architectural Unit" },
      { label: "TELEMETRY", value: "Real Time Bean, Milk & Cup Sensors" },
      { label: "OPERATING HOURS", value: "24/7 Unattended" },
    ],
    cyprusSetupNotes:
      "Engineered for both hot espresso and signature Cyprus iced coffee formats (Freddo Espresso / Iced Latte modules available).",
  },
  {
    id: "self service-kiosks",
    specCode: "SPEC-L03 // KIOSK-OS",
    title: "Self Service Micro Retail & Service Kiosks",
    category: "Automated Retail",
    featured: true,
    tagline: "Compact unmanned retail pods for electronics accessories, travel essentials, and pharmacy items.",
    shortDescription:
      "High margin unattended micro stores positioned in tourist zones, hotels, malls, and coastal promenades with automated security and inventory tracking.",
    fullDescription:
      "Self Service Kiosks unlock high value retail square footage without full shop lease commitments or retail shift wages. Ideal for sun care, travel electronics, power banks, gourmet grab and go, or automated key/locker services across Cyprus hospitality hubs.",
    investmentTier: "Tier 2 : Hospitality & Tourism Retail",
    estimatedCapital: "€16,000 to €42,000",
    timeline: "5 to 8 Weeks to Live Operation",
    locationStrategy: "Hotel Lobbies, Beachfront Promenades, Shopping Malls, Tourist Districts",
    autonomyLevel: "94% Autonomous",
    weeklyOwnerHours: "3 to 5 hrs / week",
    image:
      "https://images.unsplash.com/photo-1711632308710-f2e5bf722778?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Weather-rated or indoor interactive touchscreen kiosk unit",
      "Robotic elevator product delivery for fragile high ticket items",
      "Multi-language UI (English, Greek, Russian, German, French)",
      "Curated high margin SKU supplier onboarding",
      "Location concession agreement & insurance coordination",
      "Cloud sales analytics & dynamic pricing software",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Niche & SKU Margin Selection", detail: "Pairing tourist or urban location with 55%+ gross margin items." },
      { step: "STAGE 02", title: "Concession & Site Placement", detail: "Securing hotel, mall, or municipal promenade footprint." },
      { step: "STAGE 03", title: "Hardware Customization & UI", detail: "Branding wrap and multilingual touchscreen configuration." },
      { step: "STAGE 04", title: "Go-Live & Supplier Sync", detail: "Initial merchandising and automated reorder alerts." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-KSK-310" },
      { label: "INTERFACE", value: "32\" 4K Capacitive Touchscreen" },
      { label: "SECURITY", value: "Anti Vandal Steel + Cloud CCTV" },
      { label: "PAYMENT", value: "Multi Currency Card & Mobile Wallet" },
      { label: "FOOTPRINT", value: "1.8m² Modular Pod" },
      { label: "UPTIME SLA", value: "99.4% Remote Monitored" },
    ],
    cyprusSetupNotes:
      "High seasonal and year round yield potential in Limassol, Ayia Napa, Protaras, Paphos, and Larnaca hospitality corridors.",
  },
  {
    id: "automated-laundromats",
    specCode: "SPEC-L04 // INFRA-LAUNDRY",
    title: "24/7 Self Service Smart Laundromat",
    category: "Physical Infrastructure",
    featured: true,
    tagline: "Recession resilient neighborhood utility infrastructure with cashless central payment and auto dosing.",
    shortDescription:
      "Staffless commercial laundry hubs featuring industrial washer-extractors, high efficiency dryers, automatic detergent dosing, and remote door/payment control.",
    fullDescription:
      "Self-service smart laundromats are one of the highest retention physical asset businesses worldwide. By eliminating on-site cash handling and manual detergent sales through automatic dosing pumps and central touchscreen payment terminals, owners operate a clean, predictable utility business.",
    investmentTier: "Tier 3 : Anchor Physical Infrastructure",
    estimatedCapital: "€48,000 to €95,000",
    timeline: "8 to 12 Weeks to Live Operation",
    locationStrategy: "High-Density Residential Zones, Student Districts, Expat & Aparthotel Hubs",
    autonomyLevel: "88% Autonomous (Remote Lock, CCTV & Telemetry)",
    weeklyOwnerHours: "4 to 8 hrs / week",
    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Commercial high-spin washer-extractors & stackable rapid dryers",
      "Central cashless payment kiosk + mobile status web app for customers",
      "Automated ecological detergent & softener dosing system",
      "Shopfit design, plumbing/electrical MEP specification & signage",
      "Automated time-lock entrance doors & cloud security camera setup",
      "Full Cyprus corporate & municipal licensing coordination via professionals",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Catchment & Shopfront Sourcing", detail: "Identifying 35m² to 60m² ground-floor units with high residential density." },
      { step: "STAGE 02", title: "MEP & Commercial Fit-Out", detail: "Water drainage, 3-phase power, ventilation, and durable architectural interior." },
      { step: "STAGE 03", title: "Industrial Equipment Installation", detail: "Mounting commercial drums, auto dosing reservoirs, and central kiosk." },
      { step: "STAGE 04", title: "Automation & Launch Marketing", detail: "Google Maps local SEO, automated door locks, and grand opening." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-LND-402" },
      { label: "FLEET", value: "4 to 8 Industrial Washers + 4 to 6 Dryers" },
      { label: "DOSING", value: "Integrated Peristaltic Auto-Dosing" },
      { label: "SPACE REQ", value: "35m² to 65m² Commercial Unit" },
      { label: "MANAGEMENT", value: "Remote Cycle Trigger & Refund Console" },
      { label: "ASSET LIFESPAN", value: "10 to 15+ Years Industrial Rating" },
    ],
    cyprusSetupNotes:
      "Strong underserved demand in university neighborhoods (Nicosia/Limassol) and dense coastal tourist/expat apartments.",
  },
  {
    id: "express-car-wash",
    specCode: "SPEC-L05 // INFRA-WASH",
    title: "Express Self Service & Touchless Car Wash Bays",
    category: "Physical Infrastructure",
    featured: true,
    tagline: "High-throughput 24/7 cashless vehicle wash bays engineered for Cyprus’s year round sun & dust climate.",
    shortDescription:
      "Multi bay self service jet wash or automated touchless laser wash systems with water recycling, contactless fleet cards, and remote chemical telemetry.",
    fullDescription:
      "With high vehicle ownership per capita and frequent Saharan dust events in Cyprus, automated car wash stations generate consistent year round transaction volume. Onspec coordinates site feasibility, European wash bay engineering, water filtration, and cashless payment terminals.",
    investmentTier: "Tier 3 : Commercial Roadside Asset",
    estimatedCapital: "€65,000 to €160,000",
    timeline: "10 to 16 Weeks to Live Operation",
    locationStrategy: "Arterial Roads, Petrol Station Adjacencies, Retail Parks & Industrial Entrances",
    autonomyLevel: "85% Autonomous",
    weeklyOwnerHours: "5 to 8 hrs / week",
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Modular stainless-steel self service bays or touchless rollover portal",
      "Osmosis spot-free rinse & water reclamation filtration system",
      "Contactless pay-per-minute terminals + prepaid fleet subscription cards",
      "High-suction commercial vacuum & mat-cleaner island",
      "Plot feasibility, civil works planning & environmental compliance liaison",
      "Remote chemical tank telemetry & daily revenue dashboard",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Plot & Traffic Verification", detail: "Assessing road visibility, ingress/egress, and utility connections." },
      { step: "STAGE 02", title: "Permitting & Civil Works Blueprint", detail: "Coordinating drainage, oil separators, and concrete pad specs." },
      { step: "STAGE 03", title: "Bay Assembly & Plant Room", detail: "High-pressure pumps, osmosis plant, and canopy erection." },
      { step: "STAGE 04", title: "Telemetry & Fleet Program Launch", detail: "Activating cashless bays and B2B corporate fleet cards." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-WSH-508" },
      { label: "CONFIGURATION", value: "2 to 4 Self-Serve Bays + Touchless Option" },
      { label: "WATER TECH", value: "Reverse Osmosis Spot-Free Finish" },
      { label: "PAYMENT", value: "NFC Card, Apple Pay & Fleet RFID" },
      { label: "PLOT SIZE", value: "250m² to 600m²" },
      { label: "TELEMETRY", value: "Chemical Level & Pump Pressure Cloud HUD" },
    ],
    cyprusSetupNotes:
      "Ideal for Cyprus climate where frequent dust spikes create immediate multi-day wash queues.",
  },
  {
    id: "turnkey-ecommerce-systems",
    specCode: "SPEC-L06 // DIGITAL-COM",
    title: "Turnkey Automated Ecommerce & Fulfillment Venture",
    category: "Digital & Ecommerce",
    featured: true,
    tagline: "Fully architected digital commerce brand with AI customer operations, supplier sync, and EU logistics.",
    shortDescription:
      "Launch a production-ready online retail business complete with conversion architecture, supplier inventory feeds, automated order routing, and AI customer support.",
    fullDescription:
      "For entrepreneurs who prefer a location-independent digital asset over physical hardware. Onspec builds the complete commercial infrastructure: brand identity, high-conversion storefront, wholesale or 3PL supplier integration, automated invoicing, and 24/7 AI customer service.",
    investmentTier: "Tier 1 : Digital & Location-Independent",
    estimatedCapital: "€8,500 to €24,000",
    timeline: "3 to 5 Weeks to Live Operation",
    locationStrategy: "Cyprus Corporate Base Serving Local & Pan-European Markets",
    autonomyLevel: "90% Autonomous (AI Support + Automated Order Routing)",
    weeklyOwnerHours: "5 to 10 hrs / week",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Complete brand architecture & high-speed headless/modern storefront",
      "Vetted wholesale supplier or 3PL warehouse API integration",
      "European payment gateway & automated VAT invoice workflows",
      "Integrated 24/7 AI live chat, WhatsApp order tracking & email flows",
      "Cyprus company formation & merchant readiness via professional network",
      "Launch marketing playbook & analytics dashboard handover",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Category & Supplier Vetting", detail: "Selecting resilient product verticals with verified EU fulfillment." },
      { step: "STAGE 02", title: "Storefront & Payment Architecture", detail: "Building the platform, checkout, and automated tax rules." },
      { step: "STAGE 03", title: "AI Support & CRM Integration", detail: "Embedding autonomous order look-up, returns, and WhatsApp alerts." },
      { step: "STAGE 04", title: "Merchant Go-Live & Handover", detail: "End-to-end transaction testing and growth operations guide." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-ECM-601" },
      { label: "STACK", value: "Modern Commerce + AI Support Engine" },
      { label: "FULFILLMENT", value: "Automated 3PL / Wholesale EDI Sync" },
      { label: "PAYMENTS", value: "Stripe / EU Acquiring / Apple Pay" },
      { label: "AUTOMATION", value: "Order Routing, Invoicing & WhatsApp CS" },
      { label: "MARKET SCOPE", value: "Cyprus & 27 EU Member States" },
    ],
    cyprusSetupNotes:
      "Leverages Cyprus’s competitive EU corporate framework (12.5% standard corporate tax rate subject to independent tax counsel advice).",
  },
  {
    id: "semi-automated-service-models",
    specCode: "SPEC-L07 // HYBRID-OPS",
    title: "Semi-Automated Service & Rental Businesses",
    category: "Semi-Automated",
    featured: true,
    tagline: "Smart locker networks, automated padel/studio court bookings, and equipment rental pods.",
    shortDescription:
      "Hybrid physical-digital businesses where booking, smart-lock access, payment, and customer support are 100% automated while maintenance is lightly managed.",
    fullDescription:
      "Combine physical assets with software automation. From unmanned luggage storage lockers for tourists having late flights, to automated sports/studio booking access and smart equipment rentals, Onspec structures the hardware, access-control software, and AI customer assistant.",
    investmentTier: "Tier 1 to 2 : Smart Access & Rental Yield",
    estimatedCapital: "€15,000 to €55,000",
    timeline: "4 to 8 Weeks to Live Operation",
    locationStrategy: "Old Town Centers, Transit Hubs, Coastal Resorts & Commercial Districts",
    autonomyLevel: "88% Autonomous (PIN/QR Smart Locks + AI WhatsApp Support)",
    weeklyOwnerHours: "4 to 7 hrs / week",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=85",
    whatsIncluded: [
      "Commercial smart lockers or IoT access-control hardware",
      "Online booking engine with instant QR/PIN code generation via WhatsApp & Email",
      "24/7 AI multilingual support assistant for guest access questions",
      "Site lease scouting, CCTV remote monitoring & insurance liaison",
      "Cyprus company registration & legal terms via professional network",
      "Turnkey operational playbook & remote operator console",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Asset & Location Pairing", detail: "Matching luggage lockers or rental pods to high-density tourist flow." },
      { step: "STAGE 02", title: "IoT Hardware & Smart-Lock Sync", detail: "Connecting physical access control to instant checkout webhooks." },
      { step: "STAGE 03", title: "AI Guest Concierge Deployment", detail: "Automating 95% of guest entry and extension inquiries via WhatsApp." },
      { step: "STAGE 04", title: "Commissioning & Partner Network", detail: "Connecting with local Airbnb hosts, hotels, and travel guides." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-HYB-709" },
      { label: "ACCESS TECH", value: "Dynamic PIN / QR IoT Smart Locks" },
      { label: "BOOKING ENGINE", value: "Instant Web + WhatsApp Checkout" },
      { label: "SUPPORT LAYER", value: "24/7 AI Concierge in 12+ Languages" },
      { label: "STAFF ON-SITE", value: "Zero (Remote Managed)" },
      { label: "SCALABILITY", value: "Multi-Site Dashboard Ready" },
    ],
    cyprusSetupNotes:
      "Particularly effective in Larnaca, Paphos, and Limassol for short-stay tourist luggage storage and automated leisure rentals.",
  },
];

export const AUTOMATION_MODULES: AutomationModule[] = [
  {
    id: "ai-customer-support",
    code: "MOD-01 // AI-AGENT",
    title: "AI Customer Support Agents",
    category: "Customer Facing",
    tagline: "24/7 multilingual resolution trained on your exact business policies, catalog, and pricing.",
    description:
      "Deploy intelligent conversational agents across your website, social channels, and messaging apps that resolve inquiries instantly in English, Greek, and 20+ languages, escalating to human staff only when high value judgment is required.",
    capabilities: [
      "Trained on your company docs, services, pricing & SOPs",
      "Instant accurate answers with zero hallucination guardrails",
      "Seamless human handoff with full conversation transcript",
      "Multilingual native fluency (EN, EL, RU, DE, FR, AR)",
    ],
    connectedPlatforms: ["Website Widget", "WhatsApp", "Instagram DM", "Zendesk / Intercom", "CRM"],
    timeSavedHoursPerWeek: 18,
    efficiencyMetric: "84% Instant Resolution Rate",
    sampleTrigger: "Inbound customer question on pricing & availability at 23:40",
    sampleAction: "AI verifies live catalog, answers in customer's language & books slot",
  },
  {
    id: "whatsapp-automation",
    code: "MOD-02 // WHATSAPP-OS",
    title: "WhatsApp Business Automation",
    category: "Customer Facing",
    tagline: "Turn Cyprus’s #1 communication channel into an automated sales, booking, and support pipeline.",
    description:
      "In Cyprus and across Europe, customers expect immediate WhatsApp responses. We engineer official WhatsApp Business API workflows that qualify leads, send interactive catalogs, confirm bookings, and issue payment links automatically.",
    capabilities: [
      "Official WhatsApp Business API integration & green-tick readiness",
      "Automated lead qualification & interactive button flows",
      "Instant brochure, quotation & payment link delivery",
      "Automated appointment reminders & follow-up sequences",
    ],
    connectedPlatforms: ["WhatsApp Business API", "HubSpot / Pipedrive", "Stripe", "Google Calendar"],
    timeSavedHoursPerWeek: 14,
    efficiencyMetric: "< 4 Second Response Time",
    sampleTrigger: "Prospect sends WhatsApp message asking for service quote",
    sampleAction: "Captures requirements in 3 prompts, logs CRM deal & sends PDF summary",
  },
  {
    id: "email-management",
    code: "MOD-03 // MAIL-TRIAGE",
    title: "Email Management & Triage Automation",
    category: "Customer Facing",
    tagline: "Intelligent inbox classification, context-aware drafting, and automated vendor/client routing.",
    description:
      "Stop drowning in disorganized inboxes. Our email automation engine categorizes incoming emails by intent (new lead, invoice, urgent support, supplier update), drafts accurate responses, extracts attachments, and updates your workspace.",
    capabilities: [
      "AI intent classification & priority tagging",
      "Automated context-aware reply drafting in your brand tone",
      "Attachment extraction (invoices/receipts) directly to accounting folders",
      "SLA escalation alerts for high-priority client threads",
    ],
    connectedPlatforms: ["Google Workspace / Gmail", "Microsoft 365 / Outlook", "CRM", "Slack / Teams"],
    timeSavedHoursPerWeek: 10,
    efficiencyMetric: "70% Inbox Zero Acceleration",
    sampleTrigger: "New client inquiry + PDF specification arrives in info@ inbox",
    sampleAction: "Parses PDF, creates CRM record, assigns owner & prepares draft reply",
  },
  {
    id: "ai-booking-assistants",
    code: "MOD-04 // BOOKING-AI",
    title: "AI Booking & Scheduling Assistants",
    category: "Customer Facing",
    tagline: "Zero back-and-forth calendar coordination across clinics, consultancies, hospitality, and services.",
    description:
      "Your AI Booking Assistant negotiates times directly in natural chat or voice, checks real time staff/resource availability, collects deposits if required, handles rescheduling, and eliminates no-shows with smart WhatsApp/SMS reminders.",
    capabilities: [
      "Real-time multi-staff & multi-location calendar synchronization",
      "Natural-language booking via WhatsApp, Web Chat, or Social DM",
      "Automated deposit collection & cancellation policy enforcement",
      "Smart reminder sequences that cut no-shows by up to 65%",
    ],
    connectedPlatforms: ["Calendly / Cal.com", "Google & Outlook Calendar", "WhatsApp", "Stripe"],
    timeSavedHoursPerWeek: 12,
    efficiencyMetric: "-65% No-Show Reduction",
    sampleTrigger: "Client requests to reschedule Thursday consultation via WhatsApp",
    sampleAction: "Checks live calendar, offers 3 slots, updates booking & notifies consultant",
  },
  {
    id: "customer-enquiry-handling",
    code: "MOD-05 // INTAKE-ENGINE",
    title: "Automated Customer Enquiry Handling",
    category: "Operations & CRM",
    tagline: "Capture, enrich, score, and route every inbound enquiry across every channel in milliseconds.",
    description:
      "Most businesses lose leads simply because nobody responded within the first 15 minutes. Onspec builds unified intake funnels that capture web forms, calls, and messages, enrich the prospect profile, and deliver an immediate tailored response.",
    capabilities: [
      "Sub-minute omni channel lead acknowledgement",
      "Automated budget, timeline & service-need scoring",
      "Instant preliminary estimate or info-pack dispatch",
      "Round-robin or specialist routing to your sales team",
    ],
    connectedPlatforms: ["Web Forms", "Meta / Google Lead Ads", "WhatsApp", "CRM Platforms"],
    timeSavedHoursPerWeek: 9,
    efficiencyMetric: "3.2x Lead-to-Meeting Conversion",
    sampleTrigger: "High-intent enquiry submitted on website contact form",
    sampleAction: "Scores lead, sends tailored WhatsApp + Email dossier & books discovery call",
  },
  {
    id: "crm-automation",
    code: "MOD-06 // CRM-SYNC",
    title: "CRM Pipeline & Lifecycle Automation",
    category: "Operations & CRM",
    tagline: "A self updating CRM where deals advance, tasks trigger, and follow-ups never slip through the cracks.",
    description:
      "Sales teams should sell, not manually type notes into CRM fields. We automate contact creation, meeting summary logging, pipeline stage progression, contract generation, and dormant lead reactivation sequences.",
    capabilities: [
      "Zero manual entry contact & deal capture from Email and WhatsApp",
      "Automated proposal & contract generation from CRM deal data",
      "Stale deal alerts and automated multi touch follow-up sequences",
      "Executive real time revenue and conversion dashboards",
    ],
    connectedPlatforms: ["HubSpot", "Pipedrive", "Salesforce", "Notion / Airtable", "DocuSign"],
    timeSavedHoursPerWeek: 11,
    efficiencyMetric: "100% Pipeline Visibility",
    sampleTrigger: "Discovery call marked completed",
    sampleAction: "Generates AI call summary, moves deal to Proposal stage & drafts quote",
  },
  {
    id: "administrative-workflows",
    code: "MOD-07 // ADMIN-FLOW",
    title: "Administrative & Back Office Workflows",
    category: "Finance & Admin",
    tagline: "Automate client onboarding, document collection, compliance checklists, and internal reporting.",
    description:
      "Replace manual checklists, chasing clients for KYC/onboarding files, and copy-pasting between spreadsheets with deterministic workflow automation that keeps operations compliant and effortless.",
    capabilities: [
      "Automated client onboarding portals & KYC document checklists",
      "Smart reminders for missing signatures or expiring permits",
      "Automated weekly executive operational digest reports",
      "SOP task generation for internal staff and contractors",
    ],
    connectedPlatforms: ["Google Drive / SharePoint", "Slack / Teams", "Asana / ClickUp / Linear", "CRM"],
    timeSavedHoursPerWeek: 15,
    efficiencyMetric: "4x Faster Client Onboarding",
    sampleTrigger: "Client signs engagement agreement",
    sampleAction: "Creates secure client folder, sends document checklist & provisions project board",
  },
  {
    id: "invoice-bookkeeping-workflows",
    code: "MOD-08 // FIN-OPS",
    title: "Invoice & Bookkeeping Workflow Assistance",
    category: "Finance & Admin",
    tagline: "Automated invoice generation, OCR receipt extraction, payment reconciliation, and accountant ready exports.",
    description:
      "Eliminate end of month accounting stress. Our financial workflow automations generate invoices upon milestone completion, extract data from supplier bills via AI OCR, match bank payments, and prepare structured packages for your Cyprus/EU auditors.",
    capabilities: [
      "Automated invoice issuance & polite overdue payment chasers",
      "AI OCR extraction of supplier bills, receipts & VAT numbers",
      "Automated categorization & reconciliation preparation",
      "Clean monthly export packs ready for your external accountant/auditor",
    ],
    connectedPlatforms: ["Xero", "QuickBooks", "Stripe", "Revolut Business / SEPA", "Google Drive"],
    timeSavedHoursPerWeek: 8,
    efficiencyMetric: "90% Less Month End Admin",
    sampleTrigger: "Supplier sends PDF invoice to accounts@onspec-client.eu",
    sampleAction: "Extracts line items & VAT, logs draft bill in Xero & archives receipt",
  },
  {
    id: "business-process-automation",
    code: "MOD-09 // BPA-CORE",
    title: "End to End Business Process Automation",
    category: "Infrastructure",
    tagline: "Custom multi step operational pipelines tailored to your industry’s exact operational rules.",
    description:
      "Every established business has unique operational glue, dispatching technicians, coordinating inventory restocks, updating property listings, or managing partner referrals. We map your process and encode it into reliable automated infrastructure.",
    capabilities: [
      "Custom webhook & API orchestration across legacy and modern tools",
      "Automated inventory restock & supplier purchase order triggers",
      "Field-team dispatch & status notification workflows",
      "Error monitored execution with audit logs and fallback alerts",
    ],
    connectedPlatforms: ["n8n / Make Enterprise", "Custom REST/GraphQL APIs", "ERP Systems", "Supabase"],
    timeSavedHoursPerWeek: 16,
    efficiencyMetric: "99.9% Execution Reliability",
    sampleTrigger: "Vending or warehouse stock drops below 20% threshold",
    sampleAction: "Generates supplier PO, schedules restock route & notifies operations lead",
  },
  {
    id: "platform-integrations",
    code: "MOD-10 // INTEGRATION-BUS",
    title: "Cross Platform System Integrations",
    category: "Infrastructure",
    tagline: "Unify WhatsApp, Email, Websites, CRM, Booking Platforms, and ERPs into one synchronized nervous system.",
    description:
      "Disconnected software creates data silos and double entry. Onspec bridges all your platforms with secure bi directional data sync so a change in one system reflects everywhere immediately.",
    capabilities: [
      "Bi directional sync between Website, CRM, Booking, and Accounting",
      "Unified customer profile across WhatsApp, Email, and Purchases",
      "Cloudflare protected webhook endpoints & encrypted data transit",
      "Real-time executive telemetry dashboard across all connected tools",
    ],
    connectedPlatforms: ["WhatsApp", "Email", "Websites", "CRM Platforms", "Booking Platforms", "ERP / BMS"],
    timeSavedHoursPerWeek: 12,
    efficiencyMetric: "Zero Double Data Entry",
    sampleTrigger: "Customer updates booking or pays invoice in any channel",
    sampleAction: "Synchronizes CRM, Calendar, Accounting & WhatsApp status in < 800ms",
  },
];

export const CONNECTED_PLATFORMS_MATRIX = [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    code: "NODE-01",
    role: "Instant Conversational Sales, Support & Booking Alerts",
    latency: "120ms",
  },
  {
    id: "email",
    name: "Email Systems (Workspace / M365)",
    code: "NODE-02",
    role: "AI Inbox Triage, Smart Drafting & Attachment Extraction",
    latency: "240ms",
  },
  {
    id: "websites",
    name: "Websites & Client Portals",
    code: "NODE-03",
    role: "24/7 AI Agents, Lead Intake Engines & Instant Quotations",
    latency: "90ms",
  },
  {
    id: "crm",
    name: "CRM Platforms (HubSpot / Pipedrive / Custom)",
    code: "NODE-04",
    role: "Automated Pipeline Progression, Scoring & Deal Sync",
    latency: "180ms",
  },
  {
    id: "booking",
    name: "Booking & Scheduling Platforms",
    code: "NODE-05",
    role: "Autonomous Calendar Negotiation, Deposits & Reminders",
    latency: "150ms",
  },
  {
    id: "bms",
    name: "Business Management & Accounting (ERP / Xero)",
    code: "NODE-06",
    role: "Invoice Automation, OCR Bookkeeping & Inventory Telemetry",
    latency: "210ms",
  },
];

export const CUSTOMER_JOURNEY_STEPS: CustomerJourneyStep[] = [
  {
    number: "01",
    code: "STEP 01 // DISCOVERY",
    title: "Discovery",
    subtitle: "Explore what is possible",
    description:
      "A visitor explores Onspec’s ready to launch business models, AI & automation systems, custom idea intake, or Cyprus legal referral network.",
    deliverable: "Clarity on the right pillar for your goals",
  },
  {
    number: "02",
    code: "STEP 02 // ENQUIRY",
    title: "Enquiry",
    subtitle: "Share your objective or concept",
    description:
      "The client submits an enquiry for a turnkey business specification, requests an AI automation audit, or submits a custom business idea.",
    deliverable: "Instant reference ID & dedicated specialist review",
  },
  {
    number: "03",
    code: "STEP 03 // ASSESSMENT",
    title: "Assessment",
    subtitle: "Feasibility, scope & requirements",
    description:
      "Onspec evaluates the operational requirements, location/market dynamics, technical stack, budget alignment, and regulatory prerequisites.",
    deliverable: "Structured feasibility & requirement matrix",
  },
  {
    number: "04",
    code: "STEP 04 // PROPOSAL",
    title: "Proposal",
    subtitle: "Transparent roadmap & quotation",
    description:
      "Onspec provides a preliminary proposal or quotation outlining concrete solutions, equipment/software architecture, estimated costs, and timelines.",
    deliverable: "Free preliminary proposal / turnkey quotation",
  },
  {
    number: "05",
    code: "STEP 05 // EXECUTION",
    title: "Execution",
    subtitle: "End-to-end build & coordination",
    description:
      "Onspec coordinates the setup, hardware procurement, supplier onboarding, AI system integration, or professional legal referrals in Cyprus.",
    deliverable: "Turnkey commissioned business or live AI system",
  },
  {
    number: "06",
    code: "STEP 06 // ONGOING SUPPORT",
    title: "Ongoing Support",
    subtitle: "Scale, optimize & automate further",
    description:
      "Onspec continues to support the business with additional automation upgrades, operational expansion, new locations, and trusted professional connections.",
    deliverable: "Long-term ecosystem partnership",
  },
];

export const ECOSYSTEM_STAGES: EcosystemStage[] = [
  {
    step: "01",
    title: "Launch a Ready to Run Business",
    description: "Start with a structured turnkey model (e.g., Smart Vending, Coffee Station, Kiosk, or Ecommerce).",
    pillarRef: "01 LAUNCH",
  },
  {
    step: "02",
    title: "Structure Legal & Corporate Foundations",
    description: "Connect with independent legal professionals in Cyprus for company registration, permits, and residency.",
    pillarRef: "04 CONNECT",
  },
  {
    step: "03",
    title: "Implement AI Customer & Sales Channels",
    description: "Deploy 24/7 AI support agents and WhatsApp Business automation to capture every customer inquiry.",
    pillarRef: "02 AUTOMATE",
  },
  {
    step: "04",
    title: "Automate Bookings, CRM & Back Office",
    description: "Connect scheduling, CRM pipelines, and automated invoice/bookkeeping workflows to minimize admin.",
    pillarRef: "02 AUTOMATE",
  },
  {
    step: "05",
    title: "Monitor Real Time Telemetry & Cashflow",
    description: "Manage operations remotely through unified inventory, sales, and performance dashboards.",
    pillarRef: "01 + 02",
  },
  {
    step: "06",
    title: "Build Custom Proprietary Extensions",
    description: "Turn new growth ideas into custom software, hardware pods, or bespoke commercial offerings.",
    pillarRef: "03 INNOVATE",
  },
  {
    step: "07",
    title: "Multi Unit Expansion & Portfolio Scaling",
    description: "Replicate proven units across new Cyprus and EU locations with an established execution partner.",
    pillarRef: "ECOSYSTEM LOOP",
  },
];

export const LEGAL_NETWORK_CATEGORIES: LegalServiceCategory[] = [
  {
    id: "immigration-matters",
    code: "LEG-01 // IMMIGRATION",
    title: "Immigration Matters",
    subtitle: "Relocation, Employment Permits & International Mobility in Cyprus",
    description:
      "We connect individuals, founders, and international companies with experienced independent immigration lawyers in Cyprus who handle entry permits, BCS/foreign interest company employment registrations, and family reunification.",
    typicalMatters: [
      "Business & Entrepreneur Relocation Permits",
      "Foreign Interest Company Staff Employment Visas",
      "EU & Third Country National Registration (MEU1 / MEU3)",
      "Digital Nomad Visa & Temporary Entry Authorizations",
      "Family Reunification & Dependent Visas",
    ],
    referralProcess: "Confidential intake -> Matched with vetted Cyprus immigration counsel within 24h.",
  },
  {
    id: "residency-matters",
    code: "LEG-02 // RESIDENCY",
    title: "Residency Matters",
    subtitle: "Permanent Residency, Investment Residency & Tax Domicile Coordination",
    description:
      "Navigate Cyprus residency pathways with clarity. Our network of independent legal professionals advises on Category 6(2) fast track permanent residency, long term residency applications, and property linked residency compliance.",
    typicalMatters: [
      "Cyprus Permanent Residency (Regulation 6(2) Fast Track & Category F)",
      "Temporary & Long Term Residency Renewals",
      "Real Estate Acquisition Legal Due Diligence for Residency",
      "Non Domicile Status & Tax Residency Coordination (via qualified advisors)",
    ],
    referralProcess: "Confidential intake -> Direct consultation with specialist residency lawyer in Cyprus.",
  },
  {
    id: "business-legal-matters",
    code: "LEG-03 // CORPORATE & COMMERCIAL",
    title: "Business Related Legal Matters",
    subtitle: "Cyprus Company Formation, Commercial Contracts & Corporate Governance",
    description:
      "Whether launching an Onspec turnkey business or structuring a holding/operating entity in Cyprus, we connect you with independent corporate lawyers who draft shareholders’ agreements, commercial leases, and regulatory filings.",
    typicalMatters: [
      "Cyprus Limited Company Incorporation & Registrar Filings",
      "Commercial Lease Review & Placement Concession Agreements",
      "Shareholders’ Agreements, Joint Ventures & M&A Structuring",
      "Supplier Contracts, Terms of Service & GDPR Compliance",
      "Corporate Governance & Annual Secretarial Coordination",
    ],
    referralProcess: "Coordinated directly alongside your business launch or as a standalone corporate referral.",
  },
  {
    id: "criminal-law",
    code: "LEG-04 // DEFENSE & REPRESENTATION",
    title: "Criminal Law",
    subtitle: "Independent Defense Counsel, Regulatory Investigations & Court Representation",
    description:
      "When urgent criminal defense, regulatory compliance investigations, or court representation is required in Cyprus, Onspec provides discreet, immediate referrals to seasoned independent criminal defense advocates.",
    typicalMatters: [
      "Urgent Legal Representation & Police/Authority Inquiries",
      "Financial, Corporate & Regulatory Defense Matters",
      "Traffic, Maritime & Municipal Offence Representation",
      "Litigation Defense & Court Advocacy across Cyprus District Courts",
    ],
    referralProcess: "Priority confidential dispatch to independent criminal law counsel.",
  },
  {
    id: "legal-consultations",
    code: "LEG-05 // ADVISORY CONSULTATIONS",
    title: "Legal Consultations & Professional Guidance",
    subtitle: "Structured Legal Opinions, Pre Contract Reviews & Dispute Assessment",
    description:
      "Not sure which legal pathway applies to your situation? Request a structured consultation referral to speak directly with an independent lawyer in Cyprus suited to your specific personal or commercial matter.",
    typicalMatters: [
      "Pre Investment & Business Feasibility Legal Consultations",
      "Contract & Commercial Agreement Review Sessions",
      "Property, Landlord Tenant & Commercial Dispute Assessments",
      "Cross Border EU & Cyprus Regulatory Orientation",
    ],
    referralProcess: "Tell us your topic -> We connect you with the appropriate independent legal professional.",
  },
];

export const LAUNCH_FAQS = [
  {
    question: "Do I need prior experience in vending, kiosks, or automated retail to launch?",
    answer:
      "No. Onspec’s ready to launch models are specifically engineered so you do not start from scratch. We coordinate the location, equipment procurement, wholesale suppliers, payment telemetry, and operational training so you receive a structured, functioning business.",
  },
  {
    question: "How is company registration in Cyprus handled?",
    answer:
      "When your business requires a new Cyprus corporate entity or specific legal permits, Onspec coordinates your company registration through vetted independent legal and accounting professionals in our Cyprus network.",
  },
  {
    question: "Can I start with a single machine or kiosk and scale later?",
    answer:
      "Yes. Many clients start with 1 to 2 smart vending units or a single automated coffee station to validate cashflow and remote telemetry before expanding into a multi unit route across Limassol, Nicosia, Larnaca, or Paphos.",
  },
  {
    question: "What happens if I have my own custom business idea that isn't listed in the catalog?",
    answer:
      "Use our Pillar 03 (Submit Your Idea) channel on /innovate. We evaluate your concept and prepare a free preliminary proposal or quotation outlining how we can source, build, and execute it for you.",
  },
];
