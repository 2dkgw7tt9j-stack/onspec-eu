"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

const FOOTER_PRIMARY_NAV = [
  { label: "Launch", href: "/launch" },
  { label: "Automate", href: "/automate" },
  { label: "Innovate", href: "/innovate" },
  { label: "Connect", href: "/connect" },
];

// 2-column grid in .c-footer_subnav (Col 1: About, Launch Specs, Contact, Legal Network | Col 2: AI Systems, Vending Blueprint, Cyprus Setup, FAQ)
const FOOTER_SUBNAV = [
  { label: "About", href: "/about" },
  { label: "AI Systems", href: "/automate" },
  { label: "Launch Specs", href: "/launch" },
  { label: "Vending Blueprint", href: "/launch#vending-blueprint" },
  { label: "Contact", href: "/contact" },
  { label: "Cyprus Setup", href: "/connect" },
  { label: "Legal Network", href: "/connect" },
  { label: "FAQ", href: "/about#faq" },
];

export function Footer() {
  const symbolRef = useRef<HTMLDivElement>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    const updateSymbolProgress = () => {
      const el = symbolRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Progress 0 when entering bottom of viewport, 1 when reaching 65% up viewport
      const raw = (vh - rect.top) / (vh * 0.45);
      const clamped = Math.min(Math.max(raw, 0), 1);
      // power3Out easing matching Lightship's data-easing="power3Out"
      const eased = 1 - Math.pow(1 - clamped, 3);
      setSmoothProgress(Number(eased.toFixed(4)));
    };

    updateSymbolProgress();
    window.addEventListener("scroll", updateSymbolProgress, { passive: true });
    window.addEventListener("resize", updateSymbolProgress);
    return () => {
      window.removeEventListener("scroll", updateSymbolProgress);
      window.removeEventListener("resize", updateSymbolProgress);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "GENERAL",
      name: email.split("@")[0] || "Footer Briefing Lead",
      email: email.trim(),
      whatsapp: whatsapp.trim() || undefined,
      message: "Footer direct briefing & specification dossier request",
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
      setWhatsapp("");
      setEmail("");
    }
  };

  return (
    <footer className="c-footer container">
      {/* Scroll-linked rotating twin-star symbol (.c-symbol) */}
      <div
        ref={symbolRef}
        className="c-symbol"
        style={{ "--smooth-progress": smoothProgress } as React.CSSProperties}
      >
        <span className="c-icon c-symbol_icon">
          <svg
            className="svg-symbol"
            viewBox="0 0 23 23"
            focusable="false"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12.1 1.4c-.2-.7-1.2-.7-1.5 0L9.3 5.3c-.6 2-2.2 3.6-4.3 4.2l-4 1.3c-.7.2-.7 1.2 0 1.4l4 1.3c2 .7 3.7 2.2 4.4 4.3l1.4 3.9c.2.7 1.2.7 1.5 0l1.4-3.9c.7-2 2.3-3.6 4.4-4.3l4-1.3c.7-.2.7-1.2 0-1.4l-4-1.3c-2-.7-3.7-2.2-4.4-4.3l-1.6-3.8z"
            />
          </svg>
        </span>
        <span className="c-icon c-symbol_icon">
          <svg
            className="svg-symbol"
            viewBox="0 0 23 23"
            focusable="false"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12.1 1.4c-.2-.7-1.2-.7-1.5 0L9.3 5.3c-.6 2-2.2 3.6-4.3 4.2l-4 1.3c-.7.2-.7 1.2 0 1.4l4 1.3c2 .7 3.7 2.2 4.4 4.3l1.4 3.9c.2.7 1.2.7 1.5 0l1.4-3.9c.7-2 2.3-3.6 4.4-4.3l4-1.3c.7-.2.7-1.2 0-1.4l-4-1.3c-2-.7-3.7-2.2-4.4-4.3l-1.6-3.8z"
            />
          </svg>
        </span>
      </div>

      {/* Top row: Left slogan + summary, Right 4 hairline-divided oversized primary links */}
      <div className="c-footer_intro">
        <div className="c-footer_description">
          <p className="text-lg">Your vision. Our execution.</p>
          <p className="text-black/40 text-lg max-w-md">
            Onspec engineers ready-to-launch turnkey businesses and production
            AI automation systems across Cyprus and the European Union. Powered
            by structured execution, we make the complicated simple.
          </p>
        </div>

        <nav className="c-footer_nav" aria-label="Footer pillars">
          <ul className="c-footer_nav_list">
            {FOOTER_PRIMARY_NAV.map((item) => (
              <li key={item.label} className="c-footer_nav_item">
                <Link
                  href={item.href}
                  className="text-sm md:text-lg hover-underline block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Middle row: Lightship stacked pill inputs + 2-column secondary links + social icons */}
      <div className="c-footer_actions">
        <div className="c-footer_newsletter flex flex-col gap-y-2">
          <p className="text-md">Request Onspec Briefing</p>

          <div className="c-newsletter">
            <form onSubmit={handleSubmit} className="c-newsletter_form">
              <div className="c-input-text-container c-newsletter_zip-code -placeholder">
                <label className="text-sm mb-3 sr-only" htmlFor="footerWhatsapp">
                  WhatsApp / Phone *
                </label>
                <div className="c-input-text">
                  <input
                    id="footerWhatsapp"
                    name="whatsapp"
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp / Phone"
                    className="c-input-text_input text-sm"
                    required
                  />
                </div>
              </div>

              <div className="c-newsletter_inner">
                <input
                  className="c-newsletter_input text-sm"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                />
                <button
                  className="c-button primary -color-black cursor-pointer"
                  type="submit"
                  disabled={submitting}
                >
                  <span className="c-button_inner">
                    <span
                      className="c-button_label-container"
                      data-label={submitting ? "Sending..." : "Submit"}
                    >
                      <span className="c-button_label">
                        {submitting ? "Sending..." : "Submit"}
                      </span>
                    </span>
                    <span className="c-icon c-button_icon">
                      <svg
                        className="svg-arrow-right"
                        viewBox="0 0 16 16"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M13.8 8.4c.1-.1.2-.3.2-.4 0-.2-.1-.3-.2-.4l-4-4-.4.4-.4.4 3 3H2v1.1h10l-3 3 .4.5.4.4 4-4z"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </form>

            {referenceId && (
              <p className="text-xs mt-2 text-[#27B58A]" data-feedback>
                Dossier request registered — Ref: {referenceId}
              </p>
            )}
          </div>
        </div>

        <div className="c-footer_links">
          <ul className="c-footer_subnav">
            {FOOTER_SUBNAV.map((link) => (
              <li key={link.label} className="c-footer_subnav_item text-md">
                <Link className="hover-underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="c-footer_socials">
            <li className="c-footer_socials_item">
              <a
                className="c-footer_socials_link"
                target="_blank"
                rel="noreferrer"
                href="https://instagram.com"
                aria-label="Instagram"
              >
                <span className="c-icon">
                  <svg
                    className="svg-instagram"
                    viewBox="0 0 20 20"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M10 6.4c2 0 3.6 1.6 3.6 3.6S12 13.6 10 13.6 6.4 12 6.4 10 8 6.4 10 6.4zm0 5.9c1.3 0 2.3-1 2.3-2.3 0-1.3-1-2.3-2.3-2.3-1.3 0-2.3 1-2.3 2.3 0 1.3 1 2.3 2.3 2.3zm4.6-6c0-.5-.4-.8-.8-.8-.5 0-.8.4-.8.8 0 .5.4.8.8.8s.8-.3.8-.8zm2.3.8c.1 1.2.1 4.6 0 5.8-.1 1.1-.3 2.1-1.1 2.9-.8.9-1.8 1.1-2.9 1.2H7.1c-1.1-.1-2.1-.3-2.9-1.2C3.3 15 3.1 14 3 12.9V7.1C3.1 6 3.3 5 4.2 4.2 5 3.4 6 3.1 7.1 3.1c1.2-.1 4.6-.1 5.8 0 1.1 0 2.1.3 2.9 1.1.8.8 1.1 1.8 1.1 2.9zm-1.5 7c.4-.9.3-3.1.3-4.1 0-1 .1-3.2-.3-4.1-.2-.6-.7-1.1-1.3-1.3-.9-.4-3.1-.3-4.1-.3-1 0-3.2-.1-4.1.3-.6.2-1.1.7-1.4 1.3-.3.9-.3 3.1-.3 4.1 0 1-.1 3.2.3 4.1.2.6.7 1.1 1.3 1.3.9.4 3.1.3 4.1.3 1 0 3.2.1 4.1-.3.7-.2 1.2-.6 1.4-1.3z"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li className="c-footer_socials_item">
              <a
                className="c-footer_socials_link"
                target="_blank"
                rel="noreferrer"
                href="https://facebook.com"
                aria-label="Facebook"
              >
                <span className="c-icon">
                  <svg
                    className="svg-facebook"
                    viewBox="0 0 20 20"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M13.7 11h-2.3v7H8.3v-7H5.7V8.1h2.6V5.9C8.3 3.4 9.8 2 12 2c1.1 0 2.2.2 2.2.2v2.5H13c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.5 2.8z"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li className="c-footer_socials_item">
              <a
                className="c-footer_socials_link"
                target="_blank"
                rel="noreferrer"
                href="https://linkedin.com"
                aria-label="LinkedIn"
              >
                <span className="c-icon">
                  <svg
                    className="svg-linkedin"
                    viewBox="0 0 20 20"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M16 3c.5 0 1 .5 1 1v12c0 .6-.5 1-1 1H4c-.5 0-1-.4-1-1V4c0-.6.4-1 1-1h12zM7.2 15V8.3h-2V15h2zm-1-7.6c.7 0 1.2-.5 1.2-1.2 0-.6-.6-1.2-1.2-1.2C5.5 5 5 5.5 5 6.2s.5 1.2 1.2 1.2zM15 15v-3.7c0-1.8-.4-3.2-2.5-3.2-1 0-1.7.6-2 1.1v-.9h-2V15h2.1v-3.3c0-.9.2-1.7 1.2-1.7 1.1 0 1.1 1 1.1 1.8V15H15z"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li className="c-footer_socials_item">
              <a
                className="c-footer_socials_link"
                target="_blank"
                rel="noreferrer"
                href="https://youtube.com"
                aria-label="YouTube"
              >
                <span className="c-icon">
                  <svg
                    className="svg-youtube"
                    viewBox="0 0 20 20"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M18.2,5.9c0.4,1.3,0.4,4.1,0.4,4.1s0,2.8-0.4,4.1c-0.2,0.7-0.8,1.3-1.5,1.5C15.4,16,10.1,16,10.1,16s-5.3,0-6.7-0.3 c-0.7-0.2-1.3-0.8-1.5-1.5C1.5,12.8,1.5,10,1.5,10s0-2.8,0.4-4.1c0.2-0.7,0.8-1.3,1.5-1.5C4.7,4,10.1,4,10.1,4s5.3,0,6.7,0.4 C17.5,4.6,18,5.2,18.2,5.9z M8.3,12.6l4.4-2.5L8.3,7.5V12.6L8.3,12.6z"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li className="c-footer_socials_item">
              <a
                className="c-footer_socials_link"
                target="_blank"
                rel="noreferrer"
                href="https://x.com"
                aria-label="X"
              >
                <span className="c-icon">
                  <svg
                    className="svg-twitter"
                    viewBox="0 0 20 20"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="m3.1 3 5.3 7.7L2.8 17H4l4.9-5.6 3.9 5.6h3.7L11 9l5.2-6H15l-4.5 5.3L6.8 3H3.1z"
                    />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom row: Cyprus independent legal network footnote (1) + hairline legal bar */}
      <div className="c-footer_bottom">
        <p className="text-xs opacity-60">
          (1) Independent Legal Network Compliance Notice: Onspec connects
          clients with experienced independent licensed legal professionals in
          Cyprus through its professional network across Immigration Matters,
          Residency Matters, Criminal Law, Business-Related Legal Matters, and
          Legal Consultations. Onspec is a business creation and AI automation
          solutions company and does not itself practice law or operate as a law
          firm. Turnkey capital ranges and deployment timelines are preliminary
          architectural estimates subject to final site assessment, supplier
          configuration, and independent legal/regulatory review.
        </p>

        <div className="c-footer_legal">
          <div className="c-footer_legal_copyright">
            <p className="text-xs text-black/40">
              Copyright 2026, ONSPEC (onspec.eu).
            </p>
          </div>
          <div className="c-footer_legal_links">
            <div className="c-footer_legal_terms">
              <Link
                className="text-xs text-black/40 hover-underline"
                href="/contact"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-xs text-black/40 hover-underline"
                href="/contact"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
