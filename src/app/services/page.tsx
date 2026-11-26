"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const SERVICES_LIST = [
  {
    code: "SERVICE 01",
    pillar: "TURNKEY VENTURES",
    title: "Ready Business Units",
    subtitle: "Complete turnkey engineered businesses ready to operate on Day 1 in Cyprus and the EU.",
    description:
      "We source prime physical locations, negotiate commercial placement agreements, procure commercial hardware, install contactless payment telemetry, and coordinate Cyprus legal registration. You receive a fully operational venture ready to generate revenue in 4 to 10 weeks.",
    features: [
      "Physical site scouting and footfall verification",
      "EMV contactless payment and telemetry integration",
      "Supplier and inventory supply chain establishment",
      "Cyprus company incorporation and VAT registration",
      "Ongoing remote telemetry monitoring and owner dashboard",
    ],
    timeline: "4 to 10 Weeks to Live Operation",
    investment: "From €12,500 turnkey",
    href: "/businesses",
    cta: "Explore Ready Businesses",
    image:
      "https://images.unsplash.com/photo-1787499670012-359385f575e8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "SERVICE 02",
    pillar: "DIGITAL & WEB",
    title: "Custom Websites & Software Platforms",
    subtitle: "High performance web applications, customer portals, and conversion engineered sites.",
    description:
      "Every modern business needs digital infrastructure that matches its physical operation. We design and build ultra fast Next.js websites, online booking systems, client management portals, and ecommerce solutions built for speed, SEO authority, and customer conversion.",
    features: [
      "Next.js and React architecture with subsecond page loads",
      "Automated online booking and reservation engines",
      "Secure client dashboards and account portals",
      "Stripe and European payment gateway integration",
      "Fully responsive mobile first UI tailored to your brand",
    ],
    timeline: "2 to 4 Weeks to Deployment",
    investment: "From €2,500 tailored",
    href: "/ai-web",
    cta: "Explore Web & AI",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "SERVICE 03",
    pillar: "AUTOMATION",
    title: "AI Systems & Workflow Automation",
    subtitle: "Intelligent AI support agents, WhatsApp Business API, and automated back office pipelines.",
    description:
      "Eliminate repetitive manual administration. We engineer autonomous multilingual AI customer support agents, automated WhatsApp communication funnels, smart booking triage, CRM synchronization, and OCR invoice processing that save 15 to 35 hours of manual work every week.",
    features: [
      "24/7 Multilingual AI agents responding in under 4 seconds",
      "Official Meta WhatsApp Business API integration",
      "Automated lead capture, qualification, and CRM syncing",
      "Automated calendar booking and appointment reminders",
      "OCR receipt scanning and accounting workflow routing",
    ],
    timeline: "1 to 3 Weeks to Integration",
    investment: "From €1,800 modular",
    href: "/ai-web",
    cta: "Explore AI Workflows",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "SERVICE 04",
    pillar: "CUSTOM EXECUTION",
    title: "Custom Business Idea Execution",
    subtitle: "Submit any business concept to receive a free feasibility study, transparent quotation, and roadmap.",
    description:
      "If you have an idea for a physical, digital, or hybrid venture in Cyprus or across Europe, Onspec acts as your full cycle execution partner. You pitch the concept, our engineers evaluate technical and commercial viability, deliver a transparent proposal, and build it end to end.",
    features: [
      "Free initial feasibility assessment within 48 to 72 hours",
      "Comprehensive transparent quotation and itemized budget",
      "Full hardware, software, and physical execution roadmap",
      "Dedicated Onspec project manager coordinating every milestone",
      "Turnkey handover with full documentation and training",
    ],
    timeline: "48 to 72 Hours for Free Preliminary Proposal",
    investment: "Custom Scope & Milestone Pricing",
    href: "/contact?service=idea",
    cta: "Submit Your Idea",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "SERVICE 05",
    pillar: "LEGAL & CORPORATE",
    title: "Cyprus Legal & Professional Advisory Network",
    subtitle: "Direct access to vetted independent Cyprus advocates, corporate advisors, and tax specialists.",
    description:
      "Navigating European compliance, banking, and company formation requires trusted counsel. Onspec maintains an independent network of vetted Cyprus legal and accounting professionals providing rapid consultations across corporate law, residency, banking, and commercial licensing.",
    features: [
      "Cyprus private company incorporation within 5 to 7 business days",
      "Corporate bank account opening and EMI payment solutions",
      "Residency, immigration, and digital nomad legal support",
      "Commercial contract drafting and IP protection",
      "Local Cyprus VAT, corporate tax, and audit compliance coordination",
    ],
    timeline: "24 to 48 Hours for Initial Legal Counsel",
    investment: "Direct Advocate Retainer or Hourly",
    href: "/contact?service=legal",
    cta: "Request Legal Consultation",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function ServicesPage() {
  const [selectedPillar, setSelectedPillar] = useState<string>("ALL");
  const [quickName, setQuickName] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickService, setQuickService] = useState("SERVICE 01 : Ready Businesses");
  const [quickMessage, setQuickMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail.trim()) return;
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "GENERAL",
      name: quickName.trim() || "Services Inquiry Lead",
      email: quickEmail.trim(),
      message: `[Selected Service: ${quickService}] ${quickMessage}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-white text-black">
      {/* Editorial Hero Header */}
      <section className="container px-4 sm:px-6 pt-[16svh] md:pt-[22svh] pb-12 md:pb-16 text-center max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-black mb-4 font-semibold">
          [ ONSPEC SERVICES DIRECTORY ]
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-6 leading-tight">
          Services Engineered to Operate.
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          From turnkey physical ventures deployed across Cyprus to custom software, autonomous AI workflows, and corporate legal networks, we execute every layer of your business.
        </p>
      </section>

      {/* Services Grid Section */}
      <section className="container px-4 sm:px-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 gap-12 md:gap-16 max-w-5xl mx-auto">
          {SERVICES_LIST.map((srv, idx) => (
            <article
              key={srv.code}
              id={srv.code === "SERVICE 05" ? "legal-network" : srv.code.toLowerCase().replace(/\s+/g, "-")}
              className="bg-[#F7F8FA] rounded-2xl p-6 sm:p-8 md:p-10 border border-[#D5DBE3] transition-all hover:border-black/50 hover:shadow-lg scroll-mt-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Details */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-black/10 px-2.5 py-1 rounded">
                        {srv.code}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#A8B1BE]">
                        {srv.pillar}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-3">
                      {srv.title}
                    </h2>

                    <p className="text-sm sm:text-base font-medium text-neutral-600 mb-4 leading-normal">
                      {srv.subtitle}
                    </p>

                    <p className="text-sm text-neutral-800 leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <p className="font-mono text-xs font-semibold text-black uppercase tracking-wider">
                        Key Deliverables:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                        {srv.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-black font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#D5DBE3] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block font-mono text-[11px] text-[#A8B1BE] uppercase">
                        Timeline
                      </span>
                      <span className="font-mono text-xs font-bold text-black">
                        {srv.timeline}
                      </span>
                    </div>

                    <div>
                      <span className="block font-mono text-[11px] text-[#A8B1BE] uppercase">
                        Investment
                      </span>
                      <span className="font-mono text-xs font-bold text-black">
                        {srv.investment}
                      </span>
                    </div>

                    <Link
                      href={srv.href}
                      className="inline-flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-900 transition-colors"
                    >
                      {srv.cta} →
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual */}
                <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[260px] rounded-xl overflow-hidden relative border border-[#D5DBE3]">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                      ONSPEC.EU // {srv.pillar}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Inquiry CTA Block */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/80 mb-3 font-semibold">
            [ DIRECT SERVICE INTAKE ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Need a tailored solution for your business?
          </h2>
          <p className="text-sm sm:text-base text-[#D5DBE3] max-w-xl mx-auto mb-8">
            Tell us which service you require or describe what you want to achieve. We provide an exact roadmap and proposal within 24 hours.
          </p>

          {referenceId ? (
            <div className="bg-white/10 border border-white/25 p-6 rounded-xl max-w-md mx-auto text-center">
              <p className="text-lg font-bold text-white mb-2">Inquiry Confirmed</p>
              <p className="text-xs text-[#D5DBE3] mb-3">
                Reference ID: <span className="font-mono text-white font-bold">{referenceId}</span>
              </p>
              <p className="text-xs text-[#D5DBE3]">
                An Onspec specialist will contact you on WhatsApp or email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="max-w-xl mx-auto space-y-3 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                />
              </div>

              <select
                value={quickService}
                onChange={(e) => setQuickService(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/60"
              >
                <option value="SERVICE 01 : Ready Businesses">SERVICE 01 : Ready Business Units</option>
                <option value="SERVICE 02 : Web & Software">SERVICE 02 : Custom Websites & Software Platforms</option>
                <option value="SERVICE 03 : AI Automation">SERVICE 03 : AI Systems & Workflow Automation</option>
                <option value="SERVICE 04 : Custom Idea">SERVICE 04 : Custom Business Idea Execution</option>
                <option value="SERVICE 05 : Legal & Advisory">SERVICE 05 : Cyprus Legal & Professional Advisory</option>
              </select>

              <textarea
                rows={3}
                placeholder="Briefly describe what you are looking for..."
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-black font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider hover:bg-[#F7F8FA] transition-colors cursor-pointer"
              >
                {submitting ? "Submitting..." : "Send Service Inquiry →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
