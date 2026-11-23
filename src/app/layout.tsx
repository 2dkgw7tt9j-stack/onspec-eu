import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONSPEC (onspec.eu) — Your Vision. Our Execution. | Business Solutions & AI Automation",
  description:
    "From launching a turnkey business in Cyprus & the EU to automating the one you already have, Onspec makes the complicated simple. Ready-to-launch businesses, AI & automation systems, custom idea execution, and Cyprus legal network.",
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
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#101D35] antialiased selection:bg-[#27B58A] selection:text-[#101D35]">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
