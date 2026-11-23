import React from "react";
import Link from "next/link";
import { ArrowUpRight, Shield, Mail, MessageSquare, MapPin } from "lucide-react";
import { BRAND_INFO, PILLARS } from "@/data/onspec-data";

export function Footer() {
  return (
    <footer className="border-t border-[#A8B1BE]/25 bg-[#101D35] text-[#F7F8FA]">
      {/* Top Architecture Telemetry Bar */}
      <div className="border-b border-[#A8B1BE]/15 bg-[#253B5B]/35">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
              ONSPEC // EXECUTION ARCHITECTURE
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
              Ready to launch a turnkey business or automate your operations?
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/launch"
              className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
            >
              <span>01 // Start Your Business</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/innovate"
              className="inline-flex items-center gap-2 rounded-lg border border-[#A8B1BE]/35 bg-[#101D35] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#F7F8FA] hover:border-[#27B58A] transition-colors"
            >
              <span>03 // Submit Your Idea</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Executive Grid */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-[#253B5B] border border-[#27B58A]/40">
                <span className="font-mono text-xs font-bold text-[#27B58A]">
                  OS
                </span>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  ONSPEC
                </span>
                <span className="ml-2 font-mono text-xs text-[#A8B1BE]">
                  onspec.eu
                </span>
              </div>
            </div>

            <p className="text-base font-semibold text-[#27B58A]">
              “{BRAND_INFO.slogan}”
            </p>
            <p className="text-sm leading-relaxed text-[#A8B1BE]">
              Onspec is a modern business solutions and technology execution
              company in Cyprus & the EU—helping entrepreneurs launch turnkey
              businesses, implement intelligent AI automation, execute custom
              ideas, and connect with vetted legal professionals.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#A8B1BE]">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#27B58A]" />
                <span>{BRAND_INFO.emailPrimary}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-[#27B58A]" />
                <span>WhatsApp Desk: {BRAND_INFO.whatsappDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#27B58A]" />
                <span>{BRAND_INFO.headquarters}</span>
              </div>
            </div>
          </div>

          {/* Column 2: The 4 Business Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                THE FOUR PILLARS
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                {PILLARS.map((pillar) => (
                  <li key={pillar.id}>
                    <Link
                      href={pillar.href}
                      className="group flex items-start gap-2 text-[#F7F8FA]/85 hover:text-[#27B58A] transition-colors"
                    >
                      <span className="font-mono text-xs text-[#A8B1BE]">
                        {pillar.index}
                      </span>
                      <span>
                        <strong className="font-semibold text-white group-hover:text-[#27B58A]">
                          {pillar.name}
                        </strong>{" "}
                        — {pillar.shortTitle}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                SOLUTIONS & COMPANY
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-[#A8B1BE]">
                <li>
                  <Link href="/launch" className="hover:text-white transition-colors">
                    Smart Vending Networks Cyprus
                  </Link>
                </li>
                <li>
                  <Link href="/launch" className="hover:text-white transition-colors">
                    Automated Coffee & Retail Kiosks
                  </Link>
                </li>
                <li>
                  <Link href="/automate" className="hover:text-white transition-colors">
                    AI Customer Support & WhatsApp
                  </Link>
                </li>
                <li>
                  <Link href="/automate" className="hover:text-white transition-colors">
                    CRM, Booking & Invoice Workflows
                  </Link>
                </li>
                <li>
                  <Link href="/innovate" className="hover:text-white transition-colors">
                    Submit Your Idea (Free Proposal)
                  </Link>
                </li>
                <li>
                  <Link href="/connect" className="hover:text-white transition-colors">
                    Cyprus Legal & Residency Network
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Onspec & 6-Step Journey
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact & Consultation Desk
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Legal Network & Phase 2 Architecture Box */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-xl border border-[#A8B1BE]/20 bg-[#253B5B]/30 p-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#27B58A]">
                <Shield className="h-4 w-4" />
                <span>PROFESSIONAL NETWORK NOTICE</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#A8B1BE]">
                {BRAND_INFO.legalDisclaimer}
              </p>
            </div>

            <div className="rounded-xl border border-[#A8B1BE]/15 bg-[#101D35] p-4 font-mono text-[11px] text-[#A8B1BE]">
              <div className="flex items-center justify-between text-[#F7F8FA]">
                <span>INFRASTRUCTURE</span>
                <span className="text-[#27B58A]">PHASE 1 // READY</span>
              </div>
              <p className="mt-1.5 text-[10px] leading-normal text-[#A8B1BE]/80">
                Cloudflare Edge & Supabase Lead Engine adapters pre-configured
                for seamless Phase 2 activation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#A8B1BE]/15 pt-6 text-xs text-[#A8B1BE] sm:flex-row">
          <p>
            © {new Date().getFullYear()} ONSPEC ({BRAND_INFO.domain}). All rights
            reserved. Your vision. Our execution.
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <Link href="/about" className="hover:text-white">
              MISSION & ECOSYSTEM
            </Link>
            <Link href="/connect" className="hover:text-white">
              LEGAL NETWORK DISCLAIMER
            </Link>
            <Link href="/contact" className="hover:text-white">
              CYPRUS & EU DESK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
