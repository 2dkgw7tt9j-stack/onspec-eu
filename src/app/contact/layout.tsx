import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ONSPEC : Cyprus & EU Operations Desk",
  description:
    "Get in touch with the ONSPEC operations desk in Limassol, Cyprus. Request a free preliminary proposal for custom idea execution, turnkey businesses, or AI automation.",
  keywords: [
    "Contact Onspec",
    "Onspec Cyprus contact",
    "Limassol business operations desk",
    "Turnkey business inquiry Cyprus",
    "AI automation consultation Limassol",
    "Preliminary proposal request",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ONSPEC : Cyprus Operations Desk",
    description:
      "Direct channel to ONSPEC operations desk in Limassol, Cyprus. Request a free preliminary proposal within 48 business hours.",
    url: "https://onspec.eu/contact",
    images: [
      {
        url: "/images/contact-desk.jpg",
        width: 1200,
        height: 630,
        alt: "ONSPEC Cyprus Operations Desk",
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
      name: "Contact Operations",
      item: "https://onspec.eu/contact",
    },
  ],
};

export default function ContactLayout({
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
