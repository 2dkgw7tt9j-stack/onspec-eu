"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  timestamp: string;
  version: string;
}

const STORAGE_KEY = "onspec_cookie_consent_v1";
const CURRENT_VERSION = "2026.1";

export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Preference toggles inside modal
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [functionalConsent, setFunctionalConsent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getStoredCookiePreferences();
    if (!existing) {
      // Show banner after brief initial mount
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsConsent(existing.analytics);
      setFunctionalConsent(existing.functional);
    }

    // Allow reopening from footer or policy links via custom event
    const handleReopen = () => {
      const current = getStoredCookiePreferences();
      if (current) {
        setAnalyticsConsent(current.analytics);
        setFunctionalConsent(current.functional);
      }
      setShowPreferences(true);
      setVisible(true);
    };

    window.addEventListener("onspec:open-cookie-settings", handleReopen);
    return () => window.removeEventListener("onspec:open-cookie-settings", handleReopen);
  }, []);

  const savePreferences = (prefs: { analytics: boolean; functional: boolean }) => {
    const record: CookiePreferences = {
      necessary: true,
      analytics: prefs.analytics,
      functional: prefs.functional,
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore private browsing storage quota errors
    }

    // Dispatch global event for analytics integrations
    window.dispatchEvent(
      new CustomEvent("onspec:cookie-consent-updated", { detail: record })
    );

    setVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ analytics: true, functional: true });
  };

  const handleRejectAll = () => {
    savePreferences({ analytics: false, functional: false });
  };

  const handleSaveCustom = () => {
    savePreferences({
      analytics: analyticsConsent,
      functional: functionalConsent,
    });
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent Preferences"
      className="fixed bottom-0 inset-x-0 z-[99999] p-4 md:p-6 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto bg-black/95 text-white border border-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-8 pointer-events-auto">
        {!showPreferences ? (
          /* Main Consent Banner (Zero dark patterns: Accept and Reject have equal prominence) */
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1 pr-0 md:pr-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/60">
                  Cyprus &amp; EU Privacy Compliance (GDPR / Law 112(I)/2004)
                </span>
              </div>
              <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">
                Privacy &amp; Cookie Consent
              </h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                We use strictly necessary cookies to ensure system security, origin verification, and form intake reliability. With your consent, we also use privacy-first measurement cookies to understand platform performance. You can customize your preferences or decline non-essential cookies with zero restriction to site access.
              </p>
              <div className="flex items-center gap-4 text-xs pt-1">
                <Link
                  href="/cookies"
                  className="text-white/60 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>

            {/* Action Buttons: Accept All, Reject All, Customize with equal visual weight */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors text-center"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors text-center"
              >
                Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-white/90 font-semibold rounded-full transition-colors text-center shadow-md"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* Granular Preference Customization Drawer */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Cookie &amp; Measurement Preferences
                </h3>
                <p className="text-xs text-white/60 font-mono mt-0.5">
                  Regulated under Regulation (EU) 2016/679 (GDPR) &amp; Cyprus ePrivacy Directives
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-white/60 hover:text-white text-sm font-mono p-1"
                aria-label="Back to summary"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 divide-y divide-white/10">
              {/* Category 1: Strictly Necessary */}
              <div className="pt-2 flex items-start justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      Strictly Necessary (Security &amp; Routing)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Essential for cryptographic CSRF defense, rate-limiting tokens, session state, and secure form intake. These cannot be switched off under applicable EU law as the website cannot operate securely without them.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-4 w-4 rounded accent-white cursor-not-allowed opacity-60"
                  aria-label="Strictly Necessary Cookies (always required)"
                />
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="pt-4 flex items-start justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-medium text-white">
                    Performance &amp; Web Analytics
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Collects aggregated, privacy-preserving page load metrics and traffic flow diagnostics without identifying individual users. Helps our venture architects optimize site rendering.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Category 3: Functional & Experience */}
              <div className="pt-4 flex items-start justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-medium text-white">
                    Functional &amp; Interaction State
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Remembers interactive demo states (such as active console tabs and dismissed notification banners) so you do not have to reconfigure them on every page navigation.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={functionalConsent}
                    onChange={(e) => setFunctionalConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-5 py-2 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                Reject All Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-6 py-2 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-white/90 font-semibold rounded-full transition-colors shadow-md"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Reusable inline button allowing users to reopen cookie preferences from
 * the footer, legal pages, or anywhere on the website at any time.
 */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("onspec:open-cookie-settings"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer transition-colors ${className}`}
      aria-label="Reopen cookie and privacy settings"
    >
      Cookie Settings
    </button>
  );
}
