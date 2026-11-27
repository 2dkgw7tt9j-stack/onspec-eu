import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Execution & Venture Services Directory | ONSPEC",
  description:
    "Explore our complete directory of business capabilities: prefabricated commercial units, AI software pipelines, bespoke idea prototyping, and vetted Cyprus legal introductions.",
  keywords: [
    "Commercial services Cyprus",
    "Turnkey business solutions",
    "Business consulting Limassol",
    "Custom venture prototyping",
    "Cyprus company setup guidance",
    "AI automation services Europe",
    "Onspec services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Venture Services & Execution Directory | ONSPEC",
    description:
      "Full capability catalog: turnkey automated dispensaries, AI infrastructure, feasibility models, and independent legal network connections.",
    url: "https://onspec.eu/services",
    images: [
      {
        url: "/images/services-meeting.jpg",
        width: 1200,
        height: 630,
        alt: "ONSPEC Commercial Services Directory",
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
      name: "Services Directory",
      item: "https://onspec.eu/services",
    },
  ],
};

export default function ServicesLayout({
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
