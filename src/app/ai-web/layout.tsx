import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autonomous AI & High-Speed Web Engineering in Cyprus | ONSPEC",
  description:
    "Deploy 24/7 autonomous AI agents, sub-second Next.js web applications, and automated WhatsApp Business workflows. Built for European enterprises and scaling Cyprus ventures.",
  keywords: [
    "AI automation Cyprus",
    "Autonomous AI agents Cyprus",
    "Next.js web development Cyprus",
    "WhatsApp automation Cyprus",
    "Business workflow automation",
    "Web engineering Limassol",
    "Custom AI chatbots Cyprus",
    "High performance website Europe",
  ],
  alternates: {
    canonical: "/ai-web",
  },
  openGraph: {
    title: "Autonomous AI & High-Speed Web Engineering | ONSPEC",
    description:
      "24/7 AI agents, WhatsApp Business automation, and sub-second Next.js architecture built to eliminate operational drag.",
    url: "https://onspec.eu/ai-web",
    images: [
      {
        url: "/images/code-screen.jpg",
        width: 1200,
        height: 630,
        alt: "ONSPEC AI & Web Engineering",
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
      name: "AI & Web Engineering",
      item: "https://onspec.eu/ai-web",
    },
  ],
};

export default function AIWebLayout({
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
