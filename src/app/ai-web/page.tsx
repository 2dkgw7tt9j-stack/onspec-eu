"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const AI_WEB_CAPABILITIES = [
  {
    code: "MODULE 01",
    tagline: "HIGH PERFORMANCE WEB",
    title: "Custom Websites & Client Portals",
    description:
      "Modern Next.js web applications, responsive customer facing platforms, and client portals built for maximum speed, SEO visibility, and conversion.",
    bullets: [
      "Subsecond page speeds using server side rendering and edge networks",
      "Tailored UI engineered to your brand specifications",
      "Integrated booking engines, calendars, and live form intake",
      "Stripe, Revolut Business, and European payment gateway integration",
      "SEO architecture with structured schemas and lightning fast Core Web Vitals",
    ],
    timeline: "2 to 4 Weeks to Live Deployment",
    investment: "From €2,500 turnkey",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "MODULE 02",
    tagline: "AUTONOMOUS CUSTOMER SUPPORT",
    title: "24/7 Multilingual AI Agents",
    description:
      "AI support agents that resolve 85%+ of inbound customer inquiries across WhatsApp, web chat, and email in under 4 seconds without hiring additional support staff.",
    bullets: [
      "Trained on your business documentation, pricing, FAQs, and inventory",
      "Multilingual fluency across English, Greek, Russian, and 90+ languages",
      "Instant response time under 4 seconds, 24 hours a day, 7 days a week",
      "Smart human escalation when an issue requires manual owner triage",
      "Reduces customer service administrative load by up to 78%",
    ],
    timeline: "1 to 2 Weeks to Live Integration",
    investment: "From €1,800 turnkey",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "MODULE 03",
    tagline: "CONVERSATIONAL COMMERCE",
    title: "Official WhatsApp Business API Automation",
    description:
      "Turn WhatsApp into an automated sales and support engine. Automated customer onboarding, catalog browsing, appointment scheduling, and order status tracking.",
    bullets: [
      "Official Meta WhatsApp Cloud API integration with verified sender profile",
      "Interactive button menus, catalog lookups, and rich media flows",
      "Automated appointment booking synced directly to Google Calendar or Outlook",
      "Automated WhatsApp payment links and invoice generation",
      "Broadcast notifications, order status updates, and reminder sequences",
    ],
    timeline: "1 to 3 Weeks to Setup",
    investment: "From €2,200 turnkey",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=85",
  },
  {
    code: "MODULE 04",
    tagline: "BACK OFFICE AUTOMATION",
    title: "CRM, Invoicing & Operations Pipelines",
    description:
      "Connect your disparate software tools into one automated pipeline. Inbound leads, customer databases, contracts, invoices, and accounting synchronize seamlessly.",
    bullets: [
      "Automated two way synchronization with HubSpot, Pipedrive, and Airtable",
      "OCR receipt and invoice data extraction routed to Xero or QuickBooks",
      "Automated contract generation and digital signature reminders",
      "Weekly automated executive performance reports delivered via Telegram or WhatsApp",
      "Eliminates manual double entry across sales, admin, and bookkeeping",
    ],
    timeline: "2 to 3 Weeks to Integration",
    investment: "From €2,800 turnkey",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function AiWebPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [projectType, setProjectType] = useState("Website & AI Agent Bundle");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-ready", "is-loaded");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "02_AUTOMATE",
      name: name.trim() || "AI & Web Lead",
      email: email.trim(),
      whatsapp: whatsapp.trim() || undefined,
      message: `[Project Type: ${projectType}] ${details}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <main className="bg-white text-black">
      {/* Editorial Header */}
      <section className="container pt-[16svh] md:pt-[22svh] pb-12 md:pb-16 text-center max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-black mb-4 font-semibold">
          [ DIGITAL PLATFORMS &amp; INTELLIGENT AUTOMATION ]
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-6 leading-tight">
          AI &amp; Websites.
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          High performance custom web applications, autonomous 24/7 AI customer agents, and official WhatsApp Business automation designed to eliminate manual overhead.
        </p>
      </section>

      {/* Capabilities List */}
      <section className="container pb-20 md:pb-28 max-w-5xl mx-auto">
        <div className="space-y-12 md:space-y-16">
          {AI_WEB_CAPABILITIES.map((cap) => (
            <div
              key={cap.code}
              className="bg-[#F7F8FA] border border-[#D5DBE3] rounded-2xl p-6 sm:p-8 md:p-10 transition-all hover:border-black/50 hover:shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-black/10 px-2.5 py-1 rounded">
                      {cap.code}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#A8B1BE]">
                      {cap.tagline}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-3">
                    {cap.title}
                  </h2>

                  <p className="text-sm text-neutral-600 mb-5 leading-relaxed">
                    {cap.description}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-neutral-900">
                    {cap.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-black font-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-[#D5DBE3] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block font-mono text-[11px] text-[#A8B1BE] uppercase">Timeline:</span>
                      <span className="font-mono text-xs font-bold text-black">{cap.timeline}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[11px] text-[#A8B1BE] uppercase">Investment:</span>
                      <span className="font-mono text-xs font-bold text-black">{cap.investment}</span>
                    </div>
                    <Link
                      href={`/contact?type=${encodeURIComponent(cap.title)}`}
                      className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-900 transition-colors"
                    >
                      Enquire for this system →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[260px] rounded-xl overflow-hidden relative border border-[#D5DBE3]">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-white/80 mb-2 font-semibold">
              [ GET STARTED ]
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Request Your AI &amp; Web Specification
            </h2>
            <p className="text-sm text-[#D5DBE3]">
              Tell us what systems your business needs. We prepare an exact technical scope, prototype demonstration, and quotation within 24 hours.
            </p>
          </div>

          {referenceId ? (
            <div className="bg-white/10 border border-white/20 p-8 rounded-2xl text-center">
              <p className="text-xl font-bold text-white mb-2">Request Received</p>
              <p className="text-xs text-[#D5DBE3] mb-4">
                Tracking Reference: <span className="font-mono text-white font-bold">{referenceId}</span>
              </p>
              <p className="text-sm text-[#D5DBE3]">
                Our systems engineering team is reviewing your requirements and will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8B1BE] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Georgiou"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8B1BE] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8B1BE] mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    placeholder="+357 99 000 000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8B1BE] mb-1">Primary Requirement</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/60"
                  >
                    <option value="Custom Website Platform">Custom Website Platform</option>
                    <option value="24/7 AI Customer Support Agent">24/7 AI Customer Support Agent</option>
                    <option value="WhatsApp Business API System">WhatsApp Business API System</option>
                    <option value="CRM & Accounting Automation">CRM &amp; Accounting Automation</option>
                    <option value="Full Digital Overhaul">Full Digital Overhaul (Web + AI + Automation)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A8B1BE] mb-1">Project Notes / Existing Tools</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current business, website, or manual tasks you want automated..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-black font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider hover:bg-[#F7F8FA] transition-colors cursor-pointer"
              >
                {submitting ? "Submitting..." : "Submit AI & Web Request →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
