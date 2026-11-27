import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { IntroSplashScreen } from "@/components/IntroSplashScreen";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { FloatingNavPill } from "@/components/FloatingNavPill";
import { StructuredData } from "@/components/StructuredData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://onspec.eu"),
  title: {
    default: "ONSPEC — Official Website | Turnkey Businesses & AI Automation (Cyprus & EU)",
    template: "%s | ONSPEC",
  },
  description:
    "ONSPEC (onspec.eu) is the premier business creation & AI automation engineering firm in Cyprus & the EU. Ready-to-launch turnkey businesses, 24/7 autonomous AI agents, and custom venture engineering.",
  keywords: [
    "ONSPEC",
    "Onspec",
    "onspec.eu",
    "ONSPEC Cyprus",
    "ONSPEC Limassol",
    "ONSPEC EU",
    "ONSPEC Solutions",
    "Launch a business Cyprus",
    "Turnkey business Cyprus",
    "Vending machine business Cyprus",
    "Automated retail Cyprus",
    "AI automation Cyprus",
    "WhatsApp automation Cyprus",
    "Turnkey business Europe",
    "Cyprus legal network",
    "Business automation Limassol",
  ],
  authors: [{ name: "ONSPEC", url: "https://onspec.eu" }],
  creator: "ONSPEC",
  publisher: "ONSPEC",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://onspec.eu",
    siteName: "ONSPEC",
    title: "ONSPEC : Your Vision. Our Execution. | Business Solutions & AI Automation",
    description:
      "Turnkey businesses across Cyprus & the EU, 24/7 autonomous AI agents, and custom venture engineering. Engineered to operate.",
    images: [
      {
        url: "/onspec_logo_dark_bg.png",
        width: 1200,
        height: 630,
        alt: "ONSPEC — Engineered to Operate across Cyprus & the EU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONSPEC : Your Vision. Our Execution.",
    description:
      "Turnkey businesses in Cyprus & the EU, 24/7 autonomous AI agents, and custom venture engineering.",
    images: ["/onspec_logo_dark_bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="has-js is-loaded is-ready is-first-loaded w-full max-w-full overflow-x-clip"
      suppressHydrationWarning
    >
      <head>
        <StructuredData />
        <link rel="author" href="https://onspec.eu/about" />
        <link rel="alternate" type="text/plain" href="https://onspec.eu/llms.txt" title="LLM Agent Manifest" />
        <script dangerouslySetInnerHTML={{ __html: "window.__pageLoadTime = Date.now();" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/assets/fonts/F37Bolton-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/F37Bolton-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/lightship.css" media="all" />
      </head>
      <body className="font-sans antialiased bg-white text-black selection:bg-black selection:text-white w-full max-w-full overflow-x-clip relative">
        <IntroSplashScreen />
        <SmoothScrollProvider>
          <div id="swup" className="transition-default">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CookieConsentBanner />
            <FloatingNavPill />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
