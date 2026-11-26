import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { IntroSplashScreen } from "@/components/IntroSplashScreen";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title:
    "ONSPEC (onspec.eu) : Your Vision. Our Execution. | Business Solutions & AI Automation",
  description:
    "From launching a turnkey business in Cyprus & the EU to automating the one you already have, Onspec makes the complicated simple. Ready to launch businesses, AI & automation systems, custom idea execution, and Cyprus legal network.",
  keywords: [
    "Onspec",
    "onspec.eu",
    "Launch a business Cyprus",
    "Vending machine business Cyprus",
    "AI automation Cyprus",
    "WhatsApp automation",
    "Turnkey business Europe",
    "Cyprus legal network",
  ],
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
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
