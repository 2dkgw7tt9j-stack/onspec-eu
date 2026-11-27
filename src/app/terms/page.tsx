import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | ONSPEC (onspec.eu)",
  description:
    "Terms of Use, commercial disclaimers, and service conditions governing Onspec turnkey business execution, AI automations, and legal referral network.",
};

export default function TermsOfUsePage() {
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
            <span className="text-white">Terms of Use</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Terms of Use &amp; Service Agreement
          </h1>
          <p className="text-sm font-mono text-white/60">
            Governed by the Laws of the Republic of Cyprus &amp; Applicable European Union Regulations
          </p>
          <p className="text-xs font-mono text-white/40">
            Last Updated &amp; Effective: November 2026 • Version 2026.1
          </p>
        </div>

        {/* Section 1: Acceptance */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            Welcome to <strong>onspec.eu</strong>. By accessing, browsing, or utilizing this website, or by submitting an enquiry, proposal request, or project specification to <strong>ONSPEC</strong> (&ldquo;Onspec&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;, operated by Vision Craft &amp; Ragi Group in the Republic of Cyprus), you explicitly acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Use and our <Link href="/privacy" className="text-white underline">Privacy Policy</Link>.
          </p>
          <p>
            If you do not agree with any provision set forth herein, you must immediately discontinue use of this platform and its associated services.
          </p>
        </section>

        {/* Section 2: Operational Scope */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            2. Scope of Capabilities &amp; Services
          </h2>
          <p>
            Onspec acts as an execution partner and technological systems builder. Our four operational pillars encompass:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>
              <strong>Pillar 01 &ndash; Ready to Launch Turnkey Businesses:</strong> Pre-fabricated commercial setups, autonomous retail systems, automated smart lockers, and physical vending operations tailored for Cyprus and the EU.
            </li>
            <li>
              <strong>Pillar 02 &ndash; AI &amp; Business Automation:</strong> Engineering autonomous workflows, CRM integrations, customer intake bots, WhatsApp Business API pipelines, and high-converting web applications.
            </li>
            <li>
              <strong>Pillar 03 &ndash; Innovate &amp; Custom Execution:</strong> Feasibility evaluations, technical architectural reviews, cost modeling, and free preliminary proposals for client-submitted concepts.
            </li>
            <li>
              <strong>Pillar 04 &ndash; Cyprus Legal &amp; Corporate Network:</strong> Facilitating professional introductions to vetted, independent licensed advocates and legal consultants in Cyprus.
            </li>
          </ul>
        </section>

        {/* Section 3: Crucial Financial & Commercial Disclaimer */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            3. Commercial Feasibility &amp; Financial Disclaimer
          </h2>
          <div className="p-5 rounded-xl bg-white/[0.04] border border-white/15 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold">
              Notice: No Guarantee of Financial Returns or Commercial Profit
            </h3>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              All architectural estimations, operational cost projections, deployment timelines, potential revenue scenarios, and margin simulations presented on this website or in preliminary proposal dossiers are provided strictly for illustrative, architectural, and comparative purposes.
            </p>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              They do not constitute financial advice, investment counsel, guaranteed revenue forecasts, or profit promises. Commercial success depends upon external factors outside our control, including client management, site footfall, prevailing economic conditions, municipal licensing, and consumer demand. Clients bear sole responsibility for conducting their own independent financial, tax, and commercial due diligence prior to committing capital.
            </p>
          </div>
        </section>

        {/* Section 4: Strict Legal Network Disclaimer */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            4. Independent Cyprus Legal Network Notice
          </h2>
          <div className="p-5 rounded-xl bg-white/[0.04] border border-white/15 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">
              Regulatory Clarification: Onspec is Not a Law Firm
            </h3>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              Onspec is a technology engineering and business launch company. Onspec is not a law firm, does not employ practicing advocates in a firm capacity, and does not provide formal legal advice, representation, or legal opinions.
            </p>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              Where legal, immigration, residency, or corporate legal structuring is requested, Onspec introduces clients to independent, fully licensed legal professionals registered with the Cyprus Bar Association. Any engagement, fee agreement, and advocate-client privilege is formed exclusively between the client and the independent legal professional. Onspec accepts zero liability for any advice, action, or omission by independent legal practitioners.
            </p>
          </div>
        </section>

        {/* Section 5: Proposals & Milestone Sprints */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            5. Proposals, Milestone Engagements &amp; Deliverables
          </h2>
          <p>
            Preliminary proposals delivered following initial intake are valid for thirty (30) calendar days unless otherwise stated in writing. Official project execution commences only upon mutual execution of a formal Master Services Agreement (MSA) or Statement of Work (SOW) outlining clear milestones, scope of work, technical specifications, and payment terms.
          </p>
          <p>
            All custom systems are engineered to agreed specifications. Scope modifications requested after milestone sign-off are handled via written change orders.
          </p>
        </section>

        {/* Section 6: Intellectual Property */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            6. Intellectual Property &amp; Code Ownership
          </h2>
          <p>
            <strong>Client Commissioned Deliverables:</strong> Upon receipt of full and final milestone compensation, the client receives one hundred percent (100%) intellectual property ownership of the custom code repositories, tailored automation configurations, brand assets, and technical documentation developed specifically for their project. We enforce zero proprietary vendor lock-in.
          </p>
          <p>
            <strong>Onspec Platform IP:</strong> The website <strong>onspec.eu</strong>, including its layout, typography, trademarks, brand identity, proprietary calculation engines, and software architecture, remains the exclusive property of Onspec and Vision Craft &amp; Ragi Group. Unauthorized scraping, reproduction, framing, or reverse engineering is strictly prohibited.
          </p>
        </section>

        {/* Section 7: Limitation of Liability */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            7. Limitation of Liability (Cyprus Contract Law Cap. 149)
          </h2>
          <p>
            To the maximum extent permitted under the laws of the Republic of Cyprus and European Union consumer legislation:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>
              In no event shall Onspec, Vision Craft, Ragi Group, or their respective directors, officers, employees, or contractors be liable for any indirect, incidental, punitive, special, or consequential damages whatsoever, including without limitation damages for loss of business profits, business interruption, loss of commercial opportunities, loss of data, or hardware downtime, even if advised of the possibility of such damages.
            </li>
            <li>
              Our total aggregate liability arising out of or related to your use of the website or our preliminary proposals shall in no event exceed the total amount actually paid by you to Onspec in the twelve (12) months preceding the claim, or one hundred euros (&euro;100), whichever is lower.
            </li>
          </ul>
        </section>

        {/* Section 8: Indemnification */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2">
            8. Client Warranties &amp; Indemnification
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless Onspec and its affiliates from and against any claims, liabilities, losses, damages, fines, and expenses (including legal fees) arising out of or related to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Your violation of these Terms of Use;</li>
            <li>Any infringement by your submitted concepts or trademarks of third-party intellectual property rights;</li>
            <li>Your failure to obtain mandatory municipal, tax, or operational licenses for your commercial physical installations.</li>
          </ul>
        </section>

        {/* Section 9: Governing Law & Jurisdiction */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed border-t border-white/10 pt-8">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            9. Governing Law &amp; Dispute Resolution
          </h2>
          <p>
            These Terms of Use, their interpretation, and any non-contractual obligations arising out of or in connection with them shall be governed exclusively by and construed in accordance with the <strong>laws of the Republic of Cyprus</strong>.
          </p>
          <p>
            Any dispute, controversy, or claim arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts of the <strong>Republic of Cyprus</strong>, without prejudice to any non-waivable statutory rights granted to consumers under European Union regulations.
          </p>
        </section>

        {/* Section 10: Contact Desk */}
        <section className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed border-t border-white/10 pt-8">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            10. Inquiries &amp; Legal Notices
          </h2>
          <p>
            Formal legal notices and inquiries regarding these Terms of Use must be dispatched in writing to:
          </p>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-white/80 space-y-1">
            <p className="font-semibold text-white">ONSPEC Legal Affairs &amp; Contracts</p>
            <p>Powered by Vision Craft &amp; Ragi Group</p>
            <p>Email: <a href="mailto:servicesauditflow@gmail.com" className="text-white underline">servicesauditflow@gmail.com</a></p>
            <p>Republic of Cyprus • European Union</p>
          </div>
        </section>
      </div>
    </main>
  );
}
