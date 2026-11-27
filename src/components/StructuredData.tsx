import React from "react";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://onspec.eu/#organization",
    name: "ONSPEC",
    alternateName: ["Onspec EU", "Onspec Solutions"],
    legalName: "ONSPEC (Vision Craft & Ragi Group)",
    url: "https://onspec.eu",
    logo: "https://onspec.eu/onspec_logo_transparent.png",
    image: "https://onspec.eu/onspec_logo_dark_bg.png",
    description:
      "Onspec is a business creation and AI automation engineering firm based in Cyprus. We engineer ready to launch turnkey businesses, autonomous AI agents, and corporate legal networks across the European Union.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Limassol",
      addressRegion: "Limassol District",
      addressCountry: "CY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.6841",
      longitude: "33.0379",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Cyprus",
      },
      {
        "@type": "Country",
        name: "European Union",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "servicesauditflow@gmail.com",
        availableLanguage: ["English", "Greek"],
      },
    ],
    knowsAbout: [
      "Turnkey Business Creation",
      "Automated Retail & Dispensaries",
      "Autonomous AI Agents",
      "Next.js High Performance Web Engineering",
      "WhatsApp Business API Pipelines",
      "Cyprus Corporate Structuring & Legal Introductions",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://onspec.eu/#website",
    url: "https://onspec.eu",
    name: "ONSPEC",
    description: "Your Vision. Our Execution. Engineered to Operate.",
    publisher: {
      "@id": "https://onspec.eu/#organization",
    },
    inLanguage: "en-US",
  };

  const servicesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Pillar 01 — Ready to Launch Turnkey Businesses",
          description:
            "Turnkey automated luxury perfume dispensary, wellness hygiene, and hot meal heating stations deployed across Cyprus and the EU in 3 to 5 weeks.",
          url: "https://onspec.eu/businesses",
          provider: {
            "@id": "https://onspec.eu/#organization",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Pillar 02 — Autonomous AI & Business Automations",
          description:
            "Sub-second Next.js web applications, 24/7 autonomous AI agents, WhatsApp Business API pipelines, and senior-engineer website diagnostics.",
          url: "https://onspec.eu/ai-web",
          provider: {
            "@id": "https://onspec.eu/#organization",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Pillar 03 — Custom Idea Execution & Free Preliminary Proposal",
          description:
            "Commercial feasibility evaluations, cost modeling, and structured technical blueprints for bespoke physical and digital concepts.",
          url: "https://onspec.eu/services",
          provider: {
            "@id": "https://onspec.eu/#organization",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Pillar 04 — Independent Cyprus Legal & Professional Network",
          description:
            "Coordination with vetted, independent licensed advocates registered with the Cyprus Bar Association for corporate, residency, and immigration matters.",
          url: "https://onspec.eu/services",
          provider: {
            "@id": "https://onspec.eu/#organization",
          },
        },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Onspec do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Onspec bridges the gap between having an idea and turning it into a functioning, automated commercial operation across Cyprus and the European Union. We engineer ready-to-launch physical business setups, autonomous AI software systems, and provide vetted Cyprus legal introductions.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can a turnkey business be deployed in Cyprus?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Onspec's prefabricated automated units (such as luxury fragrance stations, wellness hygiene dispensers, and on-demand hot meal stations) deploy in 3 to 5 weeks end to end, with prime venues mapped and legal structures ready for execution.",
        },
      },
      {
        "@type": "Question",
        name: "What AI automation systems does Onspec build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We architect sub-second Next.js web platforms, deploy 24/7 autonomous AI customer concierges, WhatsApp Business API pipelines, and multi-app webhook synchronizations that save businesses 25 to 35+ operational hours per week.",
        },
      },
      {
        "@type": "Question",
        name: "Does Onspec provide legal representation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Onspec is a technology and business creation firm, not a law firm. For immigration, residency, and corporate law, Onspec connects clients directly with independent licensed advocates registered with the Cyprus Bar Association.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
