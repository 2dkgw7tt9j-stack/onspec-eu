import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRIEFINGS } from "@/data/briefings-data";

export async function generateStaticParams() {
  return BRIEFINGS.map((briefing) => ({
    slug: briefing.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const briefing = BRIEFINGS.find((b) => b.slug === slug);
  if (!briefing) return {};

  return {
    title: `${briefing.title} | ONSPEC Briefings`,
    description: briefing.summary,
    alternates: {
      canonical: `/briefings/${briefing.slug}`,
    },
    openGraph: {
      title: `${briefing.title} | ONSPEC`,
      description: briefing.summary,
      url: `https://onspec.eu/briefings/${briefing.slug}`,
      type: "article",
      images: [
        {
          url: "/onspec_cover_banner.png",
          width: 1200,
          height: 675,
          alt: briefing.title,
        },
      ],
    },
  };
}

export default async function BriefingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const briefing = BRIEFINGS.find((b) => b.slug === slug);

  if (!briefing) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: briefing.title,
    description: briefing.summary,
    author: {
      "@type": "Organization",
      name: "ONSPEC",
      url: "https://onspec.eu",
    },
    publisher: {
      "@type": "Organization",
      name: "ONSPEC",
      logo: {
        "@type": "ImageObject",
        url: "https://onspec.eu/onspec_logo_transparent.png",
      },
    },
    mainEntityOfPage: `https://onspec.eu/briefings/${briefing.slug}`,
    datePublished: "2026-11-20T08:00:00+02:00",
    dateModified: "2026-11-27T18:00:00+02:00",
  };

  const whatsappInquiryUrl = `https://wa.me/35795604442?text=${encodeURIComponent(
    `Hello ONSPEC Desk, I read the executive briefing "${briefing.title}" and would like to discuss next steps for my venture.`
  )}`;

  return (
    <main className="min-h-screen bg-white text-black pt-[14svh] md:pt-[18svh] pb-24 px-4 sm:px-6 selection:bg-black selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/briefings" className="hover:text-black">
            Executive Briefings
          </Link>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-[200px]">
            {briefing.slug}
          </span>
        </div>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-8">
          <span className="px-3.5 py-1 rounded-full bg-neutral-100 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold">
            {briefing.category}
          </span>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>{briefing.date}</span>
            <span>•</span>
            <span>{briefing.readTime}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <header className="space-y-4 mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
            {briefing.title}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed">
            {briefing.subtitle}
          </p>
        </header>

        {/* Executive Summary Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2 font-semibold">
            EXECUTIVE ABSTRACT
          </span>
          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
            {briefing.summary}
          </p>
        </div>

        {/* Body Content Sections */}
        <div className="space-y-10 sm:space-y-12">
          {briefing.sections.map((section, idx) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black pt-2">
                {idx + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-neutral-700 text-base sm:text-lg leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Related Pillar Link */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-100 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block">
              Operational Implementation
            </span>
            <p className="text-sm font-semibold text-black">
              Explore capabilities under {briefing.relatedPillar.name}
            </p>
          </div>
          <Link
            href={briefing.relatedPillar.href}
            className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors shrink-0"
          >
            View Pillar →
          </Link>
        </div>

        {/* Author / Foundry Signature */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              Published by ONSPEC Intelligence
            </p>
            <p className="text-sm font-semibold text-black">
              Engineered with Vision Craft & Ragi Group • Limassol, Cyprus
            </p>
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-black text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all hover:-translate-y-0.5 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Inquire on WhatsApp (+357 95 604442)</span>
          </a>
        </div>
      </article>
    </main>
  );
}
