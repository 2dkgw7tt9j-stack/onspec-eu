import React from "react";
import { HOMEPAGE_FAQS } from "@/data/onspec-data";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://onspec.eu/#organization",
    name: "ONSPEC",
    alternateName: [
      "Onspec",
      "onspec.eu",
      "ONSPEC EU",
      "ONSPEC Cyprus",
      "ONSPEC Solutions",
      "Vision Craft & Ragi Group ONSPEC",
    ],
    legalName: "ONSPEC (Vision Craft & Ragi Group)",
    url: "https://onspec.eu",
    logo: "https://onspec.eu/onspec_logo_transparent.png",
    image: "https://onspec.eu/onspec_logo_dark_bg.png",
    description:
      "ONSPEC is a business venture creation and AI automation engineering firm based in Limassol, Cyprus. Engineered by Vision Craft & Ragi Group, we deliver ready-to-launch turnkey businesses, 24/7 autonomous AI agents, and corporate legal network introductions across Cyprus and the European Union.",
    parentOrganization: {
      "@type": "Organization",
      name: "Vision Craft & Ragi Group",
    },
    brand: {
      "@type": "Brand",
      name: "ONSPEC",
      slogan: "Your Vision. Our Execution. Engineered to Operate.",
      logo: "https://onspec.eu/onspec_logo_transparent.png",
    },
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
        telephone: "+35795604442",
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
    alternateName: ["Onspec", "ONSPEC EU", "onspec.eu", "ONSPEC Cyprus"],
    description: "Your Vision. Our Execution. Engineered to Operate across Cyprus & the EU.",
    publisher: {
      "@id": "https://onspec.eu/#organization",
    },
    inLanguage: "en-US",
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://onspec.eu/#navigation",
    name: "ONSPEC Primary Navigation",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Ready Businesses",
        description: "Turnkey prefabricated commercial business models in Cyprus & EU",
        url: "https://onspec.eu/businesses",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "AI & Websites",
        description: "Autonomous AI agents, WhatsApp pipelines & sub-second web apps",
        url: "https://onspec.eu/ai-web",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Services Directory",
        description: "Complete venture capability catalog & custom execution",
        url: "https://onspec.eu/services",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "About Onspec",
        description: "The Four Pillars of Onspec & Vision Craft partnership",
        url: "https://onspec.eu/about",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Contact Desk",
        description: "Direct Limassol operations desk & preliminary proposals",
        url: "https://onspec.eu/contact",
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Executive Briefings",
        description: "Institutional intel, turnkey retail analysis & venture blueprints",
        url: "https://onspec.eu/briefings",
      },
    ],
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
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
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
