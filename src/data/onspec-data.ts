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
  | "Automated Food & Hospitality"
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
  whatsappDisplay: "+357 95 604442",
  whatsappLink: "https://wa.me/35795604442",
  headquarters: "Limassol & Nicosia, Cyprus : EU Operations Desk",
  legalDisclaimer:
    "Onspec connects clients with experienced independent legal professionals in Cyprus through its professional network. Onspec is a business solutions company and does not itself practice law or operate as a law firm.",
};

export interface WhatsAppDeskConfig {
  id: "turnkey" | "ai" | "legal";
  title: string;
  subtitle: string;
  phoneDisplay: string;
  phoneNumber: string;
  badge: string;
  defaultMessage: string;
}

export const WHATSAPP_DESKS: WhatsAppDeskConfig[] = [
  {
    id: "turnkey",
    title: "Turnkey Commercial Models",
    subtitle: "Automated perfume kiosks, wellness stations & hot meal units",
    phoneDisplay: "+357 94 055553",
    phoneNumber: "35794055553",
    badge: "Pillar 01",
    defaultMessage:
      "Hello ONSPEC Turnkey Desk, I would like to inquire about deploying an automated commercial model in Cyprus / EU.",
  },
  {
    id: "ai",
    title: "AI & Software Automation",
    subtitle: "24/7 autonomous AI agents, WhatsApp API pipelines & web engineering",
    phoneDisplay: "+357 95 604442",
    phoneNumber: "35795604442",
    badge: "Pillar 02",
    defaultMessage:
      "Hello ONSPEC AI Desk, I would like to inquire about autonomous AI workflow automation or custom software engineering.",
  },
  {
    id: "legal",
    title: "Legal Network & Consultations",
    subtitle: "Cyprus Bar Association advocates, corporate structuring & residency",
    phoneDisplay: "+357 94 055552",
    phoneNumber: "35794055552",
    badge: "Pillar 04",
    defaultMessage:
      "Hello ONSPEC Legal Desk, I would like to request an introduction to an independent Cyprus Bar Association advocate.",
  },
];

export const HERO_TELEMETRY_ITEMS = [
  {
    index: "01",
    code: "LAUNCH &bull; AUTOMATED DISPENSERS",
    title: "Turnkey Automated Dispensers & Meal Stations",
    metric: "3 Flagship Models",
    href: "/businesses",
  },
  {
    index: "02",
    code: "AUTOMATE &bull; WEB & AI SYSTEMS",
    title: "Digital Engineering & Autonomous AI",
    metric: "Sub-1s & 24/7 Ops",
    href: "/ai-web",
  },
  {
    index: "03",
    code: "INNOVATE &bull; CUSTOM EXECUTION",
    title: "Submit Your Idea : Free Proposal",
    metric: "Concept to Reality",
    href: "/innovate",
  },
  {
    index: "04",
    code: "CONNECT &bull; CYPRUS LEGAL NETWORK",
    title: "Vetted Legal & Corporate Referrals",
    metric: "Independent Counsel",
    href: "/connect",
  },
];

export const MARQUEE_TICKER_ITEMS = [
  "01. LUXURY PERFUME AUTOMATED DISPENSERS &bull; LOCATIONS &amp; LEGAL READY",
  "02. HYGIENE, PERIOD WELLNESS &amp; ANTISEPTIC VENDING STATIONS",
  "03. ON-DEMAND HOT FOOD &amp; REFRIGERATED MEAL HEATING STATIONS",
  "04. HIGH-CONVERTING NEXT.JS WEB PLATFORMS &amp; PORTALS",
  "05. 24/7 AUTONOMOUS AI AGENTS &amp; WORKFLOW AUTOMATIONS",
  "06. SENIOR WEBSITE CRO DIAGNOSTICS &amp; CYPRUS LEGAL NETWORK",
];

export const PILLARS: PillarSpec[] = [
  {
    id: "launch",
    index: "01",
    code: "Pillar 01 — Launch",
    name: "Turnkey Automated Dispensers & Hot Meal Stations",
    shortTitle: "Ready Dispensers & Meal Stations",
    fullTitle: "Turnkey Automated Perfume, Hygiene & Hot Meal Stations",
    coreMessage: "You don’t have to start from scratch.",
    headline: "High-margin automated retail dispensers & hot meal stations engineered for rapid deployment.",
    description:
      "We engineer, import, and install high-margin, fully autonomous retail and hot meal machines across prime Cyprus locations: luxury automated perfume dispensers, essential period hygiene & antiseptic wellness stations, and refrigerated on-demand hot food heating stations for workplaces and construction sites. All host locations and legal structures are ready for immediate execution.",
    href: "/businesses",
    ctaLabel: "Explore Ready Businesses",
    deliverables: [
      "Prime location scouting & host agreements (Hotels, Clubs, Malls, Workplaces, Sites)",
      "CE-certified smart dispensing hardware with contactless payment & telemetry",
      "Direct wholesale fragrance, medical hygiene, and certified fresh food suppliers",
      "Cyprus company incorporation & VAT registration via vetted independent counsel",
      "Turnkey installation, inventory commissioning & live owner mobile dashboard",
    ],
    telemetryMetric: "TURNKEY ASSETS",
    telemetryValue: "3 Flagship Models",
  },
  {
    id: "automate",
    index: "02",
    code: "Pillar 02 — Automate",
    name: "AI & Web Platforms",
    shortTitle: "AI & Websites",
    fullTitle: "Digital Engineering Studio • Web Platforms, AI & Diagnostics",
    coreMessage: "Eliminate operational friction and maximize conversion.",
    headline: "Sub-second Next.js web applications, autonomous AI agents, and senior diagnostics.",
    description:
      "We architect sub-second Next.js web applications, deploy autonomous 24/7 AI agents and business automation pipelines, and deliver professional senior-engineer website diagnostics with exact production code patches.",
    href: "/ai-web",
    ctaLabel: "Explore AI & Websites",
    deliverables: [
      "Sub-second Next.js web applications with guaranteed 95+ Core Web Vitals",
      "24/7 intelligent conversational AI concierges and automated booking assistants",
      "Multi-app webhook pipelines syncing CRM (HubSpot), Airtable, and Stripe",
      "Senior-engineer website diagnostics with exact CSS & Next.js code patches in 48 hours",
      "Zero backend passwords needed • Governed by mutual non-disclosure standard",
    ],
    telemetryMetric: "SPEED & RUNTIME",
    telemetryValue: "Sub-1s & 24/7 Autonomous",
  },
  {
    id: "innovate",
    index: "03",
    code: "Pillar 03 — Innovate",
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
    code: "Pillar 04 — Connect",
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
    onspec: "Integrated AI support agents, automated workflows, connected CRM, and remote telemetry.",
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
    id: "smart-perfume-dispenser",
    specCode: "SPEC-L01 • Perfume Station",
    title: "Automated Luxury Perfume Dispenser Station",
    category: "Automated Retail",
    featured: true,
    flagship: true,
    tagline: "24/7 cashless micro-mists and pocket travel decants for luxury and niche fragrances.",
    shortDescription:
      "Turnkey luxury smart fragrance dispensing machines deployed in upscale beach clubs, 5-star hotel lobbies, nightlife venues, airport lounges, and high-end shopping malls.",
    fullDescription:
      "An ultra-high-margin automated retail asset engineered for modern luxury foot-traffic environments. Dispenses precision micro-mists and pocket travel decants of designer and niche fragrances. Features capacitive touchscreens, airtight anti-evaporation seals, pneumatic dosing, contactless Apple Pay / Google Pay, and cloud telemetry monitoring real-time fragrance levels, daily sales, and temperature regulation across Cyprus venues.",
    investmentTier: "Turnkey Asset (Locations & Legal Structure Ready)",
    estimatedCapital: "Scope on Request (Locations & Legal Structure Ready)",
    timeline: "3 to 5 Weeks to Live Operation",
    locationStrategy: "Luxury Beach Clubs, 5-Star Hotel Lobbies, Nightclubs, Marina Plazas & Premium Malls in Limassol, Nicosia, Paphos & Ayia Napa",
    autonomyLevel: "95% Autonomous (Cloud Telemetry + Rapid Cartridge Swap)",
    weeklyOwnerHours: "2 to 3 hrs / week",
    image: "/images/perfume-station.jpg",
    whatsIncluded: [
      "Prime venue scouting & placement agreement execution in luxury Cyprus venues",
      "Commercial smart fragrance dispenser hardware with capacitive touchscreen & LED display",
      "Airtight pneumatic micro-mist dosing mechanism with anti-clog & anti-evaporation seals",
      "Contactless EMV, Apple Pay, Google Pay & real-time cellular telemetry integration",
      "Direct wholesale supply lines for authentic designer & niche fragrance concentrates",
      "Cyprus company incorporation, tax/VAT registration & municipal compliance coordinated via legal network",
      "White-glove installation, site anchoring, telemetry commissioning & owner mobile app handover",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Prime Venue Sourcing", detail: "Matching high-spending nightlife, luxury beach clubs, 5-star hotel lobbies, and premium marina venues across Cyprus." },
      { step: "STAGE 02", title: "Host Location Agreements", detail: "Negotiating revenue-share or fixed monthly floor-space lease contracts with venue operators." },
      { step: "STAGE 03", title: "Hardware Procurement", detail: "Importing CE-certified precision pneumatic fragrance dispensers with tamper-resistant casing." },
      { step: "STAGE 04", title: "Wholesale Fragrance Supply Lines", detail: "Securing certified original fragrance stock and specialized decant refill cartridges." },
      { step: "STAGE 05", title: "Financial Modeling & Pricing", detail: "Configuring micro-spray and pocket decant margin optimization delivering high gross yields." },
      { step: "STAGE 06", title: "Cyprus Corporate Setup", detail: "Company formation, bank accounts, and VAT compliance via independent legal counsel." },
      { step: "STAGE 07", title: "Telemetry & Payment Configuration", detail: "Activating 4G SIM, Nayax cashless reader, and real-time smartphone revenue/volume dashboard." },
      { step: "STAGE 08", title: "Commissioning & Handover", detail: "On-site calibration, initial fragrance loading, test transactions, and full operational sign-off." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-PRF-2026" },
      { label: "NOZZLE TECH", value: "Precision Pneumatic Micro-Mist Dosing" },
      { label: "CANISTER CAPACITY", value: "4 to 8 Independent Fragrance Channels" },
      { label: "PAYMENT SYSTEM", value: "EMV Contactless / Apple Pay / Google Pay" },
      { label: "TELEMETRY", value: "4G Cloud Telemetry (Live Volume & Sales)" },
      { label: "FOOTPRINT", value: "0.45m² Compact Luxury Freestanding / Wall-Mount" },
      { label: "GROSS MARGIN", value: "High Yield / Turnkey Revenue" },
      { label: "JURISDICTION", value: "Cyprus & European Union Compliant" },
    ],
    cyprusSetupNotes:
      "Includes exclusive placement contracts in Limassol Marina, Ayia Napa beachfront resorts, Nicosia luxury boutique hotels, and Paphos waterfront venues.",
  },
  {
    id: "hygiene-sanitary-vending",
    specCode: "SPEC-L02 • Hygiene Station",
    title: "Automated Essential Hygiene & Period Wellness Vending Station",
    category: "Automated Retail",
    featured: true,
    flagship: true,
    tagline: "24/7 autonomous dispensary for feminine period care, antiseptic first-aid, sanitization, and travel hygiene kits.",
    shortDescription:
      "Discreet, cloud-connected self-service hygiene stations installed in corporate towers, universities, shopping malls, fitness clubs, beach clubs, and transit hubs.",
    fullDescription:
      "Essential, recession-proof automated retail addressing immediate personal care needs. Dispenses premium organic tampons, pads, menstrual cups, sanitary disposal kits, pocket antiseptic sprays, first-aid cleaning wipes, antibacterial hand kits, and emergency travel personal care. Engineered with antimicrobial steel, contactless EMV/NFC payment, optical drop sensors, and 24/7 cloud telemetry tracking inventory thresholds and restocking alerts.",
    investmentTier: "Turnkey Asset (Locations & Legal Structure Ready)",
    estimatedCapital: "Scope on Request (Locations & Legal Structure Ready)",
    timeline: "3 to 5 Weeks to Live Operation",
    locationStrategy: "Corporate Office Restrooms & Lobbies, Universities, Gym & Wellness Complexes, Shopping Malls, Beach Promenades & High-Traffic Public Venues in Cyprus",
    autonomyLevel: "94% Autonomous (Cloud Telemetry + Scheduled Monthly Restock)",
    weeklyOwnerHours: "2 to 4 hrs / week",
    image: "/images/hygiene-station.jpg",
    whatsIncluded: [
      "Demographic site analysis & exclusive placement contracts in corporate towers, gyms, and campuses",
      "CE-certified antimicrobial powder-coated steel vending station (wall-mounted or freestanding)",
      "Infrared optical drop sensors ensuring guaranteed product delivery and anti-theft security",
      "Contactless payment terminal supporting Visa, Mastercard, Apple Pay, Google Pay & contactless chips",
      "Direct wholesale supply lines for organic feminine care, antiseptic wipes, and hygiene kits",
      "Cyprus company incorporation, tax registration, and sanitary regulatory compliance coordination",
      "Turnkey installation, inventory loading, telemetry activation, and owner dashboard training",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Footfall & Restroom Corridor Mapping", detail: "Identifying high-density women's and unisex restrooms, campus hubs, fitness centers, and corporate parks." },
      { step: "STAGE 02", title: "Placement Agreement Negotiation", detail: "Securing multi-year host agreements with university boards, property managers, and facility executives." },
      { step: "STAGE 03", title: "Machine Fabrication & Delivery", detail: "Procuring slimline, vandal-resistant dispensers with antimicrobial touch surfaces." },
      { step: "STAGE 04", title: "Certified Supplier Sourcing", detail: "Establishing supply chains with certified organic period care brands, antiseptic manufacturers, and travel kit distributors." },
      { step: "STAGE 05", title: "Planogram & Yield Strategy", detail: "Optimizing slot layout for rapid-need items: emergency period care, antiseptic wipes, sanitizers, oral care." },
      { step: "STAGE 06", title: "Legal & Compliance Structuring", detail: "Cyprus business setup and health/sanitary trade registration managed via independent counsel." },
      { step: "STAGE 07", title: "Telemetry & Threshold Alert Setup", detail: "Cloud system sends automated SMS/email alerts when any SKU drops below 20% inventory." },
      { step: "STAGE 08", title: "Commissioning & Restock Route Handover", detail: "Initial loading, cashless payment validation, and restocking logistics playbook delivery." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-HYG-2026" },
      { label: "DISPENSING TECH", value: "High-Speed Optical Anti-Drop Sensor" },
      { label: "CAPACITY", value: "Up to 180 SKUs (Tampons, Pads, Antiseptics, Kits)" },
      { label: "PAYMENT SYSTEM", value: "Contactless EMV / Apple Pay / Google Pay" },
      { label: "HOUSING", value: "Heavy-Gauge Antimicrobial Powder-Coated Steel" },
      { label: "TELEMETRY", value: "4G Cloud Stock Monitoring & Restock Alerts" },
      { label: "POWER", value: "Low-Power 12V DC / Standard 230V or Battery Backup" },
      { label: "GROSS MARGIN", value: "High Yield / Turnkey Revenue" },
      { label: "JURISDICTION", value: "Cyprus & European Union Compliant" },
    ],
    cyprusSetupNotes:
      "Includes corporate restroom placement coordination across Limassol financial district, university facilities in Nicosia, fitness chains, and commercial airport/transit hubs.",
  },
  {
    id: "hot-food-meal-station",
    specCode: "SPEC-L03 • Hot Meal Station",
    title: "Automated Hot Food & On-Demand Meal Heating Station",
    category: "Automated Food & Hospitality",
    featured: true,
    flagship: true,
    tagline: "24/7 refrigerated on-demand heated chef-quality meals for construction sites, industrial zones & workplaces.",
    shortDescription:
      "Turnkey automated meal station that stores fresh, refrigerated prepared meals at <4°C and automatically heats them on-demand in seconds via rapid convection/induction chambers upon contactless order.",
    fullDescription:
      "An automated fresh food solution engineered for hungry shift workers, industrial workforces, and corporate teams where high quality hot meals are otherwise unavailable. It is not merely a microwave: the machine is an integrated commercial refrigeration and rapid heating system. It stores sealed, chef-prepared meals under strict digital temperature regulation (<4°C), and upon contactless payment, an internal robotic transfer delivers the meal into a high-speed convection/induction chamber, serving a piping-hot, gourmet meal in 45 to 90 seconds. Fully managed with cloud telemetry tracking shelf-life, HACCP safety compliance, real-time inventory, and automated restocking schedules across Cyprus locations.",
    investmentTier: "Turnkey Asset (Locations & Legal Structure Ready)",
    estimatedCapital: "Scope on Request (Locations & Legal Structure Ready)",
    timeline: "3 to 5 Weeks to Live Operation",
    locationStrategy: "Active Construction Sites, Industrial Logistics Hubs, Corporate Office Complexes & 24/7 Shift Work Centers in Cyprus (Limassol, Nicosia, Larnaca)",
    autonomyLevel: "94% Autonomous (Automated Food Safety Log + Scheduled Daily Restock)",
    weeklyOwnerHours: "3 to 5 hrs / week",
    image: "/images/hot-meal-station.jpg",
    whatsIncluded: [
      "Host venue placement agreements pre-mapped for active construction developments, business parks & industrial facilities",
      "Commercial smart hot meal dispensing station with integrated <4°C refrigeration and rapid heating chamber",
      "Automated internal robotic transfer mechanism serving hot meals in 45-90 seconds upon contactless order",
      "Contactless payment suite supporting Visa, Mastercard, Apple Pay, Google Pay & employee meal pass NFC",
      "Wholesale partnerships with certified commercial catering kitchens and meal prep suppliers in Cyprus",
      "Cyprus company incorporation, food safety / health compliance (HACCP) & municipal permits coordinated via legal network",
      "White-glove delivery, site electrical commissioning, IoT temperature monitoring & owner management portal handover",
    ],
    executionStages: [
      { step: "STAGE 01", title: "Site Demand & Footfall Mapping", detail: "Targeting large-scale construction sites, industrial parks, and corporate hubs lacking on-site hot food cafeterias." },
      { step: "STAGE 02", title: "Host Location Agreements", detail: "Securing turnkey placement agreements with general contractors, facility managers, and business park operators." },
      { step: "STAGE 03", title: "Station Hardware Procurement", detail: "Importing CE-certified dual-zone refrigerated and rapid-heat automated meal stations." },
      { step: "STAGE 04", title: "Certified Culinary Supply Lines", detail: "Partnering with licensed local commercial kitchens for daily delivery of fresh, balanced, ready-to-heat gourmet meals." },
      { step: "STAGE 05", title: "Menu Engineering & Shelf-Life Protocol", detail: "Optimizing hearty menu options (proteins, pastas, stews, vegetarian bowls) with tamper-evident sealed packaging." },
      { step: "STAGE 06", title: "Food Safety & Cyprus Corporate Setup", detail: "Cyprus entity incorporation, sanitary licensing, and HACCP digital logging handled via legal counsel." },
      { step: "STAGE 07", title: "IoT Cold-Chain & Cashless Setup", detail: "Connecting 4G IoT sensors for constant <4°C cold-chain verification, expiration date auto-lockout, and contactless telemetry." },
      { step: "STAGE 08", title: "Site Launch & Restock Operations", detail: "On-site electrical connection, test heating cycles, and onboarding daily delivery restock routing." },
    ],
    technicalSpecs: [
      { label: "SPEC ID", value: "OSP-MEAL-2026" },
      { label: "HEATING TECH", value: "Rapid Dual Convection / Induction Chamber (45-90s)" },
      { label: "STORAGE TEMP", value: "Continuous <4°C Active Commercial Refrigeration" },
      { label: "MEAL CAPACITY", value: "60 to 110 Fresh Prepared Meal Trays" },
      { label: "PAYMENT SYSTEM", value: "Contactless EMV / Apple Pay / Google Pay / RFID" },
      { label: "SAFETY PROTOCOL", value: "Automated Expiration Lockout & Digital HACCP Log" },
      { label: "TELEMETRY", value: "4G Cloud Monitoring (Live Stock, Temp & Sales)" },
      { label: "JURISDICTION", value: "Cyprus & European Union Food Safety Compliant" },
    ],
    cyprusSetupNotes:
      "Includes pre-negotiated placement agreements across high-growth construction developments in Limassol & Larnaca, port logistics zones, and suburban industrial work centers.",
  },
];

export const AUTOMATION_MODULES: AutomationModule[] = [
  {
    id: "high-converting-web-development",
    code: "Practice 01 — Web Engineering",
    title: "High-Converting Web Development",
    category: "Customer Facing",
    tagline: "Sub-second digital platforms and landing pages architected from scratch with Next.js App Router and conversion psychology.",
    description:
      "Most agency websites are pretty but slow and fail to convert. We architect sub-second, visually stunning digital platforms from scratch using Next.js App Router, Tailwind CSS, and behavioral conversion psychology with guaranteed 95+ Core Web Vitals.",
    capabilities: [
      "Sub-second First Contentful Paint (<1.0s) & 95+ Core Web Vitals",
      "Rapid 2-week sprint turnaround from wireframe to edge launch",
      "Stripe e-commerce, customer portals & Supabase integration",
      "Mobile ergonomics with verified 48x48px tap targets & zero CLS",
      "Schema.org JSON-LD structured data for Google & AI answer engines",
    ],
    connectedPlatforms: ["Next.js App Router", "Tailwind CSS", "Vercel Edge", "Stripe", "Supabase"],
    timeSavedHoursPerWeek: 25,
    efficiencyMetric: "<1.0s FCP & 95+ Core Web Vitals",
    sampleTrigger: "Visitor lands on campaign URL from Google or paid social",
    sampleAction: "Edge server renders dynamic page in <800ms with zero layout shift",
  },
  {
    id: "autonomous-ai-concierge",
    code: "Practice 02 — AI Concierge",
    title: "Autonomous Conversational AI Concierge",
    category: "Customer Facing",
    tagline: "Intelligent conversational agents connected to your product catalog, inventory, and scheduling APIs.",
    description:
      "We build bespoke, self-orchestrating AI agents and automated pipelines that run silently 24/7. Answers customer queries, qualifies leads, schedules appointments, and closes sales in fluent natural language.",
    capabilities: [
      "Omnichannel conversational messaging & automated assistant integration",
      "Connected directly to product catalog, pricing & real-time inventory",
      "Instant response time under 3 seconds, 24/7/365 runtime",
      "Multi-lingual fluency in English, Greek, Russian, and 20+ languages",
      "100% deterministic guardrails with smart human escalation",
    ],
    connectedPlatforms: ["Omnichannel API", "Telegram Bot API", "HubSpot", "Google Calendar", "Stripe"],
    timeSavedHoursPerWeek: 28,
    efficiencyMetric: "<3s Response & 24/7 Runtime",
    sampleTrigger: "Prospect asks for product quote and availability at 23:45",
    sampleAction: "AI validates stock, answers in customer language & delivers payment link",
  },
  {
    id: "website-diagnostics-cro",
    code: "Practice 03 — Diagnostics & CRO",
    title: "Professional Website Diagnostics & CRO Teardowns",
    category: "Infrastructure",
    tagline: "Senior-engineer manual and programmatic teardowns analyzing conversion leaks, mobile friction, and Core Web Vitals.",
    description:
      "Generic automated bot crawlers spit out generic warnings and leave you stranded. We deliver rigorous senior-engineer teardowns with exact production-ready CSS, Next.js, and HTML code patches delivered on request within 48 hours.",
    capabilities: [
      "Public-facing HTML & asset inspection (zero backend access needed)",
      "Ready-to-merge Next.js, CSS, and HTML production code patches",
      "Granular screen-by-screen conversion psychology teardown",
      "15-minute personalized senior engineer Loom video walkthrough",
      "1-on-1 strategy and implementation debrief call (30 minutes)",
    ],
    connectedPlatforms: ["Next.js Code Patches", "Core Web Vitals", "Loom Teardown", "Strategy Debrief"],
    timeSavedHoursPerWeek: 35,
    efficiencyMetric: "48-Hour Delivery SLA",
    sampleTrigger: "Client submits URL and target conversion objectives",
    sampleAction: "Senior engineer delivers code patch dossier and 15-min Loom walkthrough within 48 hours",
  },
  {
    id: "lead-qualification-routing",
    code: "Practice 04 — Lead Routing",
    title: "Inbound Lead Qualification & Auto-Routing",
    category: "Operations & CRM",
    tagline: "Instantly enrich incoming inquiries, analyze purchase intent using LLM reasoning, and route qualified buyers.",
    description:
      "Stop losing enterprise buyers to slow response times. Our automated lead engine enriches new inquiries, verifies purchase budget, and routes high-intent prospects straight to your executive calendar in under 60 seconds.",
    capabilities: [
      "Automated lead enrichment with company size, revenue & industry",
      "Advanced LLM intent scoring separating high-ticket buyers from tire-kickers",
      "Automated calendar booking link dispatch via WhatsApp and Email",
      "Real-time CRM contact and deal creation in HubSpot or Pipedrive",
    ],
    connectedPlatforms: ["Web Forms", "WhatsApp", "HubSpot", "Pipedrive", "Cal.com / Calendly"],
    timeSavedHoursPerWeek: 20,
    efficiencyMetric: "<60s Inbound Qualification",
    sampleTrigger: "Enterprise lead submits contact form or WhatsApp inquiry",
    sampleAction: "Scores lead, enriches profile, updates CRM & books discovery call",
  },
  {
    id: "multi-app-orchestration",
    code: "Practice 05 — Workflow Sync",
    title: "Multi-App Workflow Orchestration",
    category: "Operations & CRM",
    tagline: "Resilient, event-driven serverless webhooks syncing CRM, Airtable, Stripe, Supabase, and internal REST APIs.",
    description:
      "Replace disjointed software silos with deterministic event-driven pipelines. Data flows seamlessly across sales, billing, customer management, and internal operational dashboards with automated error handling.",
    capabilities: [
      "Zero data loss with automated retry mechanisms and dead-letter queues",
      "Bidirectional sync between CRM, Airtable, Notion, and databases",
      "Automated customer onboarding, contract generation, and signature pings",
      "Instant Slack / Telegram alert feeds for high-value sales events",
    ],
    connectedPlatforms: ["HubSpot", "Airtable", "Stripe", "Supabase", "Notion", "Slack"],
    timeSavedHoursPerWeek: 22,
    efficiencyMetric: "100% Deterministic Event Flow",
    sampleTrigger: "New client completes Stripe onboarding deposit",
    sampleAction: "Creates invoice in Xero, provisions portal account, alerts team on Slack",
  },
  {
    id: "document-intelligence-ocr",
    code: "Practice 06 — Document Intelligence",
    title: "Document Intelligence & OCR Extraction",
    category: "Finance & Admin",
    tagline: "Autonomous extraction of complex PDFs, supplier invoices, legal agreements, and receipts into clean typed JSON.",
    description:
      "Eliminate manual bookkeeping and invoice keying. Autonomous OCR pipelines parse incoming supplier bills, shipping manifests, and contracts, inserting structured data directly into your ERP and accounting systems.",
    capabilities: [
      "Multi-page PDF, image, and scanned document data extraction",
      "Autonomous line-item parsing, VAT calculation, and currency conversion",
      "Direct integration with Xero, QuickBooks, and internal databases",
      "Automated mismatch detection against approved purchase orders",
    ],
    connectedPlatforms: ["Email Inboxes", "AWS Textract / Vision LLMs", "Xero", "QuickBooks", "ERP"],
    timeSavedHoursPerWeek: 16,
    efficiencyMetric: "99.2% Extraction Accuracy",
    sampleTrigger: "Supplier emails multi-page PDF invoice to billing desk",
    sampleAction: "Extracts line items, validates totals, registers draft bill in Xero",
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
    code: "Step 01 — Discovery",
    title: "Discovery",
    subtitle: "Explore what is possible",
    description:
      "A visitor explores Onspec’s ready to launch business models, AI & automation systems, custom idea intake, or Cyprus legal referral network.",
    deliverable: "Clarity on the right pillar for your goals",
  },
  {
    number: "02",
    code: "Step 02 — Enquiry",
    title: "Enquiry",
    subtitle: "Share your objective or concept",
    description:
      "The client submits an enquiry for a turnkey business specification, requests an AI automation audit, or submits a custom business idea.",
    deliverable: "Instant reference ID & dedicated specialist review",
  },
  {
    number: "03",
    code: "Step 03 — Assessment",
    title: "Assessment",
    subtitle: "Feasibility, scope & requirements",
    description:
      "Onspec evaluates the operational requirements, location/market dynamics, technical stack, budget alignment, and regulatory prerequisites.",
    deliverable: "Structured feasibility & requirement matrix",
  },
  {
    number: "04",
    code: "Step 04 — Proposal",
    title: "Proposal",
    subtitle: "Transparent roadmap & quotation",
    description:
      "Onspec provides a preliminary proposal or quotation outlining concrete solutions, equipment/software architecture, estimated costs, and timelines.",
    deliverable: "Free preliminary proposal / turnkey quotation",
  },
  {
    number: "05",
    code: "Step 05 — Execution",
    title: "Execution",
    subtitle: "End-to-end build & coordination",
    description:
      "Onspec coordinates the setup, hardware procurement, supplier onboarding, AI system integration, or professional legal referrals in Cyprus.",
    deliverable: "Turnkey commissioned business or live AI system",
  },
  {
    number: "06",
    code: "Step 06 — Ongoing Support",
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
    description: "Start with a structured turnkey model (e.g., Luxury Perfume Stations, Essential Hygiene Dispensers, or On-Demand Hot Meal Stations).",
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
    description: "Deploy 24/7 AI support agents and business workflow automation to capture every customer inquiry.",
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
    code: "Category 01 — Immigration",
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
    code: "Category 02 — Residency",
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
    code: "Category 03 — Corporate & Commercial",
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
    code: "Category 04 — Defense & Representation",
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
    code: "Category 05 — Advisory Consultations",
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
      "Yes. Many clients start with 1 to 2 automated dispenser units or a hot meal station to validate cashflow and remote telemetry before expanding into a multi unit route across Limassol, Nicosia, Larnaca, or Paphos.",
  },
  {
    question: "What happens if I have my own custom business idea that isn't listed in the catalog?",
    answer:
      "Use our Pillar 03 (Submit Your Idea) channel on /services. We evaluate your concept and prepare a free preliminary proposal outlining how we can source, build, and execute it for you.",
  },
];

export const HOMEPAGE_FAQS = [
  {
    question: "What is ONSPEC and how does it work?",
    answer:
      "ONSPEC is a business venture creation and AI automation engineering firm based in Limassol, Cyprus. Engineered in strategic partnership with Vision Craft & Ragi Group, we bridge the gap between having an idea and operating a profitable commercial business across Cyprus and the European Union. We engineer ready-to-launch physical business setups, deploy 24/7 autonomous AI systems, evaluate bespoke ideas with free preliminary proposals, and coordinate vetted Cyprus Bar Association legal introductions.",
  },
  {
    question: "How fast can ONSPEC deploy a ready-to-launch turnkey business in Cyprus or the EU?",
    answer:
      "Our prefabricated automated business setups (including luxury fragrance dispensaries, wellness hygiene stations, and refrigerated smart hot meal stations) deploy end-to-end in 3 to 5 weeks. We coordinate hardware procurement, telemetry monitoring, supplier accounts, merchant payment terminals, prime host venue placement agreements, and corporate structure setup.",
  },
  {
    question: "What AI automation systems does ONSPEC build for businesses?",
    answer:
      "We build sub-second Next.js web applications, 24/7 autonomous AI customer concierges, WhatsApp Business API conversational sales pipelines, and multi-app webhook synchronizations. Our AI workflows typically eliminate 25 to 35+ operational drag hours per week for scaling businesses.",
  },
  {
    question: "Can I bring my own custom business concept to ONSPEC?",
    answer:
      "Yes. Under Pillar 03 (Custom Idea Execution), you can submit any physical or digital concept. Our engineering team conducts a commercial feasibility evaluation, unit economics modeling, and hardware/software blueprinting, delivering a structured Preliminary Proposal within 48 business hours at zero cost or obligation.",
  },
  {
    question: "Does ONSPEC provide direct legal representation in Cyprus?",
    answer:
      "ONSPEC is a technology and venture engineering firm, not a law firm. For immigration, residency permits, company incorporation, and corporate law, Onspec connects clients directly with independent licensed advocates registered with the Cyprus Bar Association.",
  },
  {
    question: "Where is ONSPEC based and what regions do you serve?",
    answer:
      "ONSPEC is headquartered in Limassol, Cyprus, and serves clients across the Republic of Cyprus (Limassol, Nicosia, Larnaca, Paphos) and the wider European Union. Direct inquiries can be submitted through our contact desk or sent directly to servicesauditflow@gmail.com.",
  },
];
