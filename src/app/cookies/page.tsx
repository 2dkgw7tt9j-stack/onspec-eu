import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "Cookie Policy | ONSPEC (onspec.eu)",
  description:
    "Cookie policy and tracking transparency under Cyprus Law 112(I)/2004, EU ePrivacy Directive, and GDPR (Regulation (EU) 2016/679).",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Onspec
            </Link>
            <span>/</span>
            <Link href="/legal" className="hover:text-white transition-colors">
              Legal
            </Link>
            <span>/</span>
            <span className="text-white">Cookie Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Cookie &amp; Measurement Policy
          </h1>
          <p className="text-sm font-mono text-white/60">
            Governed under Cyprus Law 112(I)/2004, EU ePrivacy Directive 2002/58/EC &amp; GDPR (EU 2016/679)
          </p>
          <p className="text-xs font-mono text-white/40">
            Last Updated &amp; Effective: November 2026 • Version 2026.1
          </p>
        </div>

        {/* Interactive Consent Control Block */}
        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-wide uppercase font-mono text-white">
              Your Current Cookie Preferences
            </h2>
            <p className="text-xs text-white/60">
              You can inspect, alter, or withdraw your cookie consent at any time without impacting site access.
            </p>
          </div>
          <CookieSettingsButton className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-white/90 rounded-full font-semibold transition-colors shrink-0" />
        </div>

        {/* Section 1: Regulatory Framework */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            1. Legal Framework &amp; Scope
          </h2>
          <p>
            This Cookie Policy explains how <strong>ONSPEC</strong> (&ldquo;Onspec&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, operating under Vision Craft &amp; Ragi Group) uses cookies, local storage objects, and similar browser technologies on <strong>onspec.eu</strong>.
          </p>
          <p>
            Our website is hosted in the European Union and is designed to adhere strictly to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>
              <strong>Cyprus Law 112(I)/2004</strong> on Electronic Communications and Postal Services, which transposes the EU ePrivacy Directive (Directive 2002/58/EC as amended by Directive 2009/136/EC).
            </li>
            <li>
              <strong>Regulation (EU) 2016/679</strong> of the European Parliament and of the Council (General Data Protection Regulation &ndash; &ldquo;GDPR&rdquo;).
            </li>
            <li>
              Directives and enforcement guidelines published by the <strong>Cyprus Commissioner for Personal Data Protection</strong> and the European Data Protection Board (EDPB).
            </li>
          </ul>
        </section>

        {/* Section 2: What Are Cookies */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            2. What Are Cookies and Local Storage?
          </h2>
          <p>
            Cookies are small text files placed on your computer or mobile device by websites that you visit. Local storage is an industry-standard browser storage mechanism that allows web applications to store structured data locally in your browser with zero remote transmission until explicitly sent.
          </p>
          <p>
            Onspec strictly distinguishes between <strong>Strictly Necessary</strong> technologies (required for site stability, cryptographic CSRF mitigation, and edge load balancing) and <strong>Optional Measurement</strong> technologies.
          </p>
        </section>

        {/* Section 3: Exact Cookies & Storage Items */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            3. Inventory of Technologies Used
          </h2>
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-white/5 font-mono uppercase text-[11px] text-white/60 border-b border-white/10">
                <tr>
                  <th className="p-3 md:p-4">Key / Identifier</th>
                  <th className="p-3 md:p-4">Category</th>
                  <th className="p-3 md:p-4">Purpose</th>
                  <th className="p-3 md:p-4">Duration</th>
                  <th className="p-3 md:p-4">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/70 font-mono text-xs">
                <tr>
                  <td className="p-3 md:p-4 text-white font-semibold">onspec_cookie_consent_v1</td>
                  <td className="p-3 md:p-4 text-emerald-400">Strictly Necessary</td>
                  <td className="p-3 md:p-4 font-sans">Stores your selected cookie consent preferences so you are not re-prompted on every page navigation.</td>
                  <td className="p-3 md:p-4">12 Months</td>
                  <td className="p-3 md:p-4 font-sans">Legitimate Interest (Art. 6(1)(f) GDPR / CY ePrivacy Exemption)</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4 text-white font-semibold">onspec_eu_submissions_v1</td>
                  <td className="p-3 md:p-4 text-emerald-400">Strictly Necessary</td>
                  <td className="p-3 md:p-4 font-sans">Retains enquiry reference numbers locally in your browser so you can reference previous project submissions.</td>
                  <td className="p-3 md:p-4">Persistent (Client)</td>
                  <td className="p-3 md:p-4 font-sans">Legitimate Interest (Art. 6(1)(f) GDPR)</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4 text-white font-semibold">_hp_ts &amp; _hp_trap</td>
                  <td className="p-3 md:p-4 text-emerald-400">Strictly Necessary</td>
                  <td className="p-3 md:p-4 font-sans">Cryptographic timing token and anti-bot honeypot preventing denial-of-service and automated form spam.</td>
                  <td className="p-3 md:p-4">Session</td>
                  <td className="p-3 md:p-4 font-sans">Legitimate Interest (Security / Abuse Defense)</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4 text-white font-semibold">onspec_perf_telemetry</td>
                  <td className="p-3 md:p-4 text-blue-400">Performance (Optional)</td>
                  <td className="p-3 md:p-4 font-sans">Measures anonymous aggregated page transition latencies and Core Web Vitals to optimize UX across EU regions.</td>
                  <td className="p-3 md:p-4">Session</td>
                  <td className="p-3 md:p-4 font-sans">Explicit Consent (Art. 6(1)(a) GDPR)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Third-Party & Embedded Assets */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            4. Third-Party Infrastructure &amp; Data Transfers
          </h2>
          <p>
            Onspec utilizes carefully vetted infrastructure providers to ensure speed, uptime, and security across Cyprus and the European Union:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>
              <strong>Hosting &amp; Edge Delivery:</strong> Vercel Inc. (Edge locations within EU). Compliant with Standard Contractual Clauses (SCCs) and GDPR Article 46 safeguards.
            </li>
            <li>
              <strong>Typography Delivery:</strong> Google Fonts (loaded with strict privacy headers; fonts are preloaded and served without tracking cookies).
            </li>
            <li>
              <strong>Zero Advertising Trackers:</strong> Onspec does not employ cross-site tracking cookies, behavioral retargeting pixels, Meta pixels, or third-party advertising data brokers.
            </li>
          </ul>
        </section>

        {/* Section 5: How to Manage Consent */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            5. Managing &amp; Withdrawing Consent
          </h2>
          <p>
            Under Cyprus and EU law, consent must be as easy to withdraw as it was to grant. You can reconfigure or revoke your choices at any moment by clicking the button below:
          </p>
          <div className="pt-2">
            <CookieSettingsButton className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-white/90 rounded-full font-semibold transition-colors" />
          </div>
          <p className="pt-2">
            Additionally, all modern browsers permit you to delete or block cookies through your browser settings. Consult your browser&rsquo;s help menu (Chrome, Safari, Firefox, Edge) to clear existing cookies.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed border-t border-white/10 pt-8">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            6. Inquiries &amp; Data Protection Officer
          </h2>
          <p>
            For questions regarding this Cookie Policy or our data handling practices, please contact our compliance desk:
          </p>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-white/80 space-y-1">
            <p className="font-semibold text-white">ONSPEC Compliance &amp; Legal Desk</p>
            <p>Powered by Vision Craft &amp; Ragi Group</p>
            <p>Email: <a href="mailto:servicesauditflow@gmail.com" className="text-white underline">servicesauditflow@gmail.com</a></p>
            <p>Jurisdiction: Republic of Cyprus / European Union</p>
          </div>
        </section>
      </div>
    </main>
  );
}
