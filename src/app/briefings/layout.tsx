import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Briefings & Operational Intel | ONSPEC",
  description:
    "Institutional research, technical blueprints, and operational analysis on turnkey automated retail, enterprise AI pipelines, and Cyprus corporate structuring.",
  keywords: [
    "Cyprus business insights",
    "Turnkey retail analysis Cyprus",
    "Autonomous AI briefings",
    "Cyprus company formation guide",
    "IoT telemetry commercial vending",
    "Onspec briefings",
  ],
  alternates: {
    canonical: "/briefings",
  },
  openGraph: {
    title: "Executive Briefings & Operational Intel | ONSPEC",
    description:
      "Institutional analysis on automated business engineering, AI workflows, and corporate structuring across Cyprus and the EU.",
    url: "https://onspec.eu/briefings",
    images: [
      {
        url: "/onspec_cover_banner.png",
        width: 1200,
        height: 675,
        alt: "ONSPEC Executive Briefings & Operational Intel",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://onspec.eu",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Executive Briefings",
      item: "https://onspec.eu/briefings",
    },
  ],
};

export default function BriefingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
