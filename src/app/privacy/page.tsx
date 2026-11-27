import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "Privacy Policy | ONSPEC (onspec.eu)",
  description:
    "Comprehensive GDPR Privacy Policy under Regulation (EU) 2016/679 and Cyprus Law 125(I)/2018 for Onspec clients, enquiries, and partners.",
};

export default function PrivacyPolicyPage() {
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
            <span className="text-white">Privacy Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-sm font-mono text-white/60">
            Compliant with Regulation (EU) 2016/679 (GDPR) and Republic of Cyprus Law 125(I)/2018
          </p>
          <p className="text-xs font-mono text-white/40">
            Last Updated &amp; Effective: November 2026 • Version 2026.1
          </p>
        </div>

        {/* Section 1: Data Controller */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            1. Identity of the Data Controller
          </h2>
          <p>
            This Privacy Policy sets out the data processing practices carried out through the website <strong>onspec.eu</strong> by <strong>ONSPEC</strong> (&ldquo;Onspec&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operated under Vision Craft &amp; Ragi Group within the Republic of Cyprus and the European Union.
          </p>
          <p>
            If you have questions concerning this policy or wish to exercise any of your statutory rights, you may reach our designated compliance officer directly:
          </p>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-white/80 space-y-1">
            <p className="font-semibold text-white">Data Protection Officer / Legal Operations</p>
            <p>ONSPEC (Powered by Vision Craft &amp; Ragi Group)</p>
            <p>Republic of Cyprus • European Union</p>
            <p>Direct Email: <a href="mailto:servicesauditflow@gmail.com" className="text-white underline">servicesauditflow@gmail.com</a></p>
          </div>
        </section>

        {/* Section 2: Data We Collect */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            2. Categories of Personal Data We Collect
          </h2>
          <p>
            We adhere to the principle of <strong>data minimization</strong> under Article 5(1)(c) of the GDPR. We only collect information strictly required to evaluate commercial briefs, formulate preliminary proposals, and safeguard infrastructure:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>
              <strong>Identity &amp; Contact Information:</strong> Full name, corporate or personal email address, WhatsApp / direct telephone number, and company name.
            </li>
            <li>
              <strong>Project &amp; Specification Data:</strong> Business ideas submitted for preliminary architectural evaluation, automation workflows, requested turnkey business categories, target URLs, and custom requirements.
            </li>
            <li>
              <strong>Security &amp; Device Telemetry:</strong> Cryptographically hashed IP addresses (HMAC-SHA256 masked; never stored in raw readable format in logs), browser user-agent tokens, submission latency timestamps, and honeypot verification signals.
            </li>
            <li>
              <strong>Referral Coordination Data:</strong> When you specifically request connection with vetted Cyprus legal counsel, data necessary to coordinate that referral (service area, brief scope).
            </li>
          </ul>
        </section>

        {/* Section 3: Legal Basis for Processing */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            3. Legal Grounds for Processing (GDPR Article 6)
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-mono text-xs uppercase text-emerald-400 font-semibold">Article 6(1)(b) &ndash; Performance of a Contract / Pre-Contractual Steps</h3>
              <p className="text-xs text-white/70 mt-1">
                Processing your name, contact details, and project brief to prepare and deliver a free preliminary proposal, technical dossier, or turnkey business specification at your explicit request.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-mono text-xs uppercase text-emerald-400 font-semibold">Article 6(1)(f) &ndash; Legitimate Interests</h3>
              <p className="text-xs text-white/70 mt-1">
                Protecting our web systems against denial-of-service attacks, brute force abuse, spam bots, and security vulnerabilities via automated rate limiting, CSRF verification, and origin gatekeeping.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-mono text-xs uppercase text-emerald-400 font-semibold">Article 6(1)(a) &ndash; Explicit Consent</h3>
              <p className="text-xs text-white/70 mt-1">
                For optional performance telemetry and measurement cookies, activated only when you choose &ldquo;Accept All&rdquo; or enable them in Cookie Settings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-mono text-xs uppercase text-emerald-400 font-semibold">Article 6(1)(c) &ndash; Legal Obligations</h3>
              <p className="text-xs text-white/70 mt-1">
                Compliance with statutory tax, accounting, and anti-fraud record-keeping mandates under Cyprus and EU law.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Zero-Credential & Confidentiality Policy */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            4. Zero-Credential Policy &amp; Non-Disclosure
          </h2>
          <p>
            Onspec enforces a strict <strong>Zero-Credential Standard</strong>. We never request, collect, or store your private banking PINs, production database credentials, server root keys, or sensitive customer databases.
          </p>
          <p>
            All submitted concepts, proprietary ideas, and architectural briefs are treated as strictly confidential commercial information governed by our standard mutual non-disclosure covenants.
          </p>
        </section>

        {/* Section 5: Independent Cyprus Legal Network Notice */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            5. Independent Cyprus Legal Network Notice
          </h2>
          <p>
            Onspec is a business creation, physical turnkey execution, and AI automation company. <strong>Onspec is not a law firm and does not provide legal advice, legal representation, or formal legal services.</strong>
          </p>
          <p>
            When a client requests assistance with legal matters in Cyprus (such as corporate formation, immigration, residency, or commercial contracts), Onspec connects the client with independent, licensed advocates registered with the <strong>Cyprus Bar Association</strong>.
          </p>
          <p>
            Upon introduction, the independent law firm acts as an entirely independent Data Controller subject to advocate-client privilege and Cyprus legal regulations. Onspec does not receive, access, or store legal case files or privileged legal counsel documentation.
          </p>
        </section>

        {/* Section 6: Data Processors & Transfers */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            6. Service Providers &amp; International Data Transfers
          </h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We share data solely with trusted technical infrastructure processors under strict Data Processing Agreements (DPAs):
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li><strong>Cloud Hosting &amp; Edge Delivery:</strong> Vercel Inc. (EU Edge network, ISO 27001 certified).</li>
            <li><strong>Database &amp; Storage Infrastructure:</strong> Supabase / AWS Frankfurt (EU-central-1 region).</li>
            <li><strong>Email &amp; Communication Relay:</strong> Google Workspace / Resend (TLS 1.3 encrypted in transit).</li>
          </ul>
          <p>
            All international processing complies with Chapter V of the GDPR via European Commission Standard Contractual Clauses (SCCs).
          </p>
        </section>

        {/* Section 7: Data Retention */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            7. Data Retention &amp; Erasure Schedules
          </h2>
          <p>
            We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li><strong>Unrealized Enquiries &amp; Briefs:</strong> Retained for up to 18 months to enable follow-up consultations, after which they are permanently expunged.</li>
            <li><strong>Executed Project &amp; Contractual Records:</strong> Retained for the statutory period required by Cyprus commercial, tax, and limitation statutes (typically 6 years following contract conclusion).</li>
            <li><strong>Security Logs &amp; Audit Hashes:</strong> Automatically purged on rolling 90-day cycles.</li>
          </ul>
        </section>

        {/* Section 8: Your Rights under GDPR */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            8. Your Statutory Rights (GDPR Articles 15&ndash;22)
          </h2>
          <p>
            As a data subject within the European Union, you enjoy enforceable statutory rights:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold text-white text-xs uppercase font-mono">Right of Access (Art. 15)</h3>
              <p className="text-xs text-white/60 mt-1">Obtain confirmation and copies of your personal data processed by Onspec.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold text-white text-xs uppercase font-mono">Right to Rectification (Art. 16)</h3>
              <p className="text-xs text-white/60 mt-1">Request correction of inaccurate or incomplete personal records.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold text-white text-xs uppercase font-mono">Right to Erasure (Art. 17)</h3>
              <p className="text-xs text-white/60 mt-1">Request permanent deletion (&ldquo;Right to be Forgotten&rdquo;) where legal grounds permit.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold text-white text-xs uppercase font-mono">Right to Restriction (Art. 18)</h3>
              <p className="text-xs text-white/60 mt-1">Limit the processing of your data while an objection or correction is verified.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold text-white text-xs uppercase font-mono">Right to Data Portability (Art. 20)</h3>
              <p className="text-xs text-white/60 mt-1">Receive your personal data in a structured, machine-readable format.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold text-white text-xs uppercase font-mono">Right to Object (Art. 21)</h3>
              <p className="text-xs text-white/60 mt-1">Object at any time to processing based on legitimate interests.</p>
            </div>
          </div>
          <p className="pt-2">
            To exercise any of these rights, email us at <a href="mailto:servicesauditflow@gmail.com" className="text-white underline">servicesauditflow@gmail.com</a>. We respond to all verified requests within 30 days free of charge.
          </p>
        </section>

        {/* Section 9: Supervisory Authority */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed border-t border-white/10 pt-8">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            9. Right to Lodge a Complaint with the Supervisory Authority
          </h2>
          <p>
            If you consider that our processing of your personal data infringes the GDPR or Cyprus Law 125(I)/2018, you have the statutory right under GDPR Article 77 to lodge a formal complaint with the competent supervisory authority:
          </p>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-white/80 space-y-1">
            <p className="font-semibold text-white">Commissioner for Personal Data Protection (Cyprus)</p>
            <p>1 Iasonos Street, 1082 Nicosia, Republic of Cyprus</p>
            <p>P.O. Box 23378, 1682 Nicosia, Cyprus</p>
            <p>Website: <a href="http://www.dataprotection.gov.cy" target="_blank" rel="noopener noreferrer" className="text-white underline">www.dataprotection.gov.cy</a></p>
            <p>Email: commissioner@dataprotection.gov.cy</p>
          </div>
        </section>
      </div>
    </main>
  );
}
