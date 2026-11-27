import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ready Businesses in Cyprus & EU : Prefabricated Commercial Models",
  description:
    "Launch an autonomous turnkey business in Cyprus in 3 to 5 weeks. Automated luxury perfume dispensers, wellness hygiene stations, and refrigerated hot meal stations with host locations and independent legal structures ready.",
  keywords: [
    "Turnkey business Cyprus",
    "Ready business Cyprus",
    "Vending machine business Cyprus",
    "Perfume vending station Cyprus",
    "Automated retail Europe",
    "Prefabricated commercial setups",
    "Passive income business Cyprus",
    "Limassol turnkey business",
  ],
  alternates: {
    canonical: "/businesses",
  },
  openGraph: {
    title: "Ready Businesses in Cyprus & EU | ONSPEC",
    description:
      "Turnkey automated dispensary & hot meal heating stations engineered to deploy across Cyprus and the EU in 3 to 5 weeks. Host venues mapped and legal structures ready.",
    url: "https://onspec.eu/businesses",
    images: [
      {
        url: "/images/perfume-station.jpg",
        width: 1200,
        height: 630,
        alt: "ONSPEC Ready Businesses — Automated Commercial Models in Cyprus",
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
      name: "Ready Businesses",
      item: "https://onspec.eu/businesses",
    },
  ],
};

export default function BusinessesLayout({
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
