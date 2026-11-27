import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "Legal & Compliance Hub | ONSPEC (onspec.eu)",
  description:
    "Legal transparency, regulatory compliance, GDPR data protection, cookie policy, and terms of use for Onspec.",
};

export default function LegalHubPage() {
  const documents = [
    {
      title: "Privacy Policy",
      href: "/privacy",
      tag: "GDPR (EU 2016/679) & Law 125(I)/2018",
      description:
        "How we process, protect, and respect your personal data. Transparent legal bases, zero-credential standards, retention schedules, and your statutory rights under European law.",
    },
    {
      title: "Terms of Use",
      href: "/terms",
      tag: "Cyprus Contract Law (Cap. 149)",
      description:
        "Service conditions governing our turnkey business setups, AI automation engineering, custom proposals, IP ownership upon delivery, and liability protections.",
    },
    {
      title: "Cookie Policy",
      href: "/cookies",
      tag: "Cyprus Law 112(I)/2004 & ePrivacy",
      description:
        "Comprehensive inventory of cookies and local storage technologies. Details our zero-tracker stance, strictly necessary security tokens, and consent controls.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Onspec
            </Link>
            <span>/</span>
            <span className="text-white">Legal &amp; Compliance Hub</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Legal, Privacy &amp; Regulatory Transparency
          </h1>
          <p className="text-sm font-mono text-white/60">
            Institutional Standards • European Union &amp; Republic of Cyprus
          </p>
        </div>

        {/* Legal Document Cards */}
        <div className="grid grid-cols-1 gap-6">
          {documents.map((doc) => (
            <Link
              key={doc.title}
              href={doc.href}
              className="group block p-6 md:p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">
                  {doc.title} &rarr;
                </h2>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 w-fit">
                  {doc.tag}
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-2xl">
                {doc.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Consent Control Callout */}
        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">
              Cookie &amp; Measurement Settings
            </h3>
            <p className="text-xs md:text-sm text-white/60">
              Manage your consent preferences for performance and experience telemetry anytime.
            </p>
          </div>
          <CookieSettingsButton className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-white/90 rounded-full font-semibold transition-colors shrink-0" />
        </div>

        {/* Regulatory Disclaimers Summary */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
              Mandatory Regulatory Notice
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              <strong>Independent Legal Network:</strong> Onspec is an independent business execution and technological automation solutions firm operating under Vision Craft &amp; Ragi Group. Onspec does not practice law and is not a law firm. Inquiries concerning legal representation, immigration, residency, or corporate litigation are referred directly to vetted, independent licensed advocates registered with the Cyprus Bar Association.
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              <strong>Commercial Projections:</strong> Turnover estimates, margin benchmarks, and operational timelines are architectural estimates and do not constitute financial guarantees or prospectus representations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
