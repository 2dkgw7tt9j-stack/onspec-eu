import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ONSPEC : Engineering Business & AI Across Cyprus and the EU",
  description:
    "Learn how ONSPEC bridges the gap between vision and commercial execution. Engineered by Vision Craft & Ragi Group to deliver turnkey operations, autonomous AI, and licensed legal frameworks.",
  keywords: [
    "About Onspec",
    "Onspec Cyprus",
    "Vision Craft and Ragi Group",
    "Business execution firm Limassol",
    "Four pillars of Onspec",
    "Cyprus business engineering",
    "Autonomous venture building",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ONSPEC : The Four Pillars of Commercial Execution",
    description:
      "From idea to autonomous commercial reality in Cyprus and Europe. Engineered by Vision Craft & Ragi Group.",
    url: "https://onspec.eu/about",
    images: [
      {
        url: "/images/about-blueprint.jpg",
        width: 1200,
        height: 630,
        alt: "About ONSPEC — Engineered to Operate",
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
      name: "About ONSPEC",
      item: "https://onspec.eu/about",
    },
  ],
};

export default function AboutLayout({
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
