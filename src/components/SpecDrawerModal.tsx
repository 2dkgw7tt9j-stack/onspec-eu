"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  MapPin,
  Cpu,
  ShieldCheck,
  Send,
  Layers,
} from "lucide-react";
import { PrefabOpportunity } from "@/data/onspec-data";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

export interface SpecDrawerModalProps {
  opportunity: PrefabOpportunity | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function SpecDrawerModal({
  opportunity,
  isOpen,
  onClose,
}: SpecDrawerModalProps) {
  const open = isOpen !== undefined ? isOpen && Boolean(opportunity) : Boolean(opportunity);

  const [activeTab, setActiveTab] = useState<"specs" | "enquire">("specs");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("Limassol, Cyprus");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setActiveTab("specs");
      setReferenceId(null);
    }
  }, [open, opportunity?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !opportunity) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "01_LAUNCH",
      name,
      email,
      whatsapp,
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      message: `Preferred Location: ${city}. Notes: ${notes}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#101D35]/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={opportunity.title}
    >
      <div
        className="relative flex h-full w-full max-w-2xl flex-col bg-[#F7F8FA] text-[#101D35] shadow-2xl border-l border-[#A8B1BE]/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Lightship Technical Telemetry Header */}
        <div className="flex items-center justify-between border-b border-[#A8B1BE]/35 bg-[#101D35] px-6 py-4 text-[#F7F8FA]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#27B58A]" />
            <span className="font-mono text-xs tracking-widest uppercase text-[#A8B1BE]">
              {opportunity.specCode}
            </span>
            <span className="rounded bg-[#253B5B] px-2 py-0.5 font-mono text-[11px] text-[#27B58A]">
              {opportunity.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded border border-[#A8B1BE]/30 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-[#F7F8FA]/80 hover:border-[#27B58A] hover:text-[#27B58A] transition-colors cursor-pointer"
          >
            <span>ESC</span>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mode Switcher Bar */}
        <div className="flex border-b border-[#A8B1BE]/35 bg-white px-6">
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`py-3.5 pr-6 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === "specs"
                ? "border-[#27B58A] text-[#101D35] font-semibold"
                : "border-transparent text-[#253B5B]/70 hover:text-[#101D35]"
            }`}
          >
            01 // Technical Specification & Blueprint
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("enquire")}
            className={`py-3.5 px-6 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === "enquire"
                ? "border-[#27B58A] text-[#101D35] font-semibold"
                : "border-transparent text-[#253B5B]/70 hover:text-[#101D35]"
            }`}
          >
            02 // Request Dossier & Feasibility Quote
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "specs" ? (
            <>
              {/* Hero Banner */}
              <div className="relative h-52 w-full overflow-hidden rounded-lg border border-[#A8B1BE]/40 bg-[#101D35]">
                <img
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="h-full w-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#F7F8FA]">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    TURNKEY BUSINESS SPECIFICATION
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    {opportunity.title}
                  </h2>
                </div>
              </div>

              {/* Overview & Core Metrics */}
              <p className="text-sm leading-relaxed text-[#253B5B]">
                {opportunity.fullDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#A8B1BE]/40 bg-white p-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#253B5B]/75">
                    <Layers className="h-3.5 w-3.5 text-[#27B58A]" />
                    <span>EST. CAPITAL</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#101D35]">
                    {opportunity.estimatedCapital}
                  </p>
                </div>
                <div className="rounded-lg border border-[#A8B1BE]/40 bg-white p-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#253B5B]/75">
                    <Clock className="h-3.5 w-3.5 text-[#27B58A]" />
                    <span>DEPLOYMENT</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#101D35]">
                    {opportunity.timeline}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-lg border border-[#A8B1BE]/40 bg-white p-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#253B5B]/75">
                    <Cpu className="h-3.5 w-3.5 text-[#27B58A]" />
                    <span>AUTONOMY</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#101D35]">
                    {opportunity.weeklyOwnerHours}
                  </p>
                </div>
              </div>

              {/* Technical Spec Table */}
              <div className="rounded-lg border border-[#A8B1BE]/40 bg-white overflow-hidden">
                <div className="border-b border-[#A8B1BE]/30 bg-[#101D35]/5 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[#101D35] font-semibold">
                  HARDWARE & OPERATIONAL TELEMETRY MATRIX
                </div>
                <div className="divide-y divide-[#A8B1BE]/25">
                  {opportunity.technicalSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between px-4 py-2.5 text-xs"
                    >
                      <span className="font-mono text-[#253B5B]/80">
                        {spec.label}
                      </span>
                      <span className="font-semibold text-[#101D35]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="rounded-lg border border-[#A8B1BE]/40 bg-white p-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#253B5B] font-semibold">
                  TURNKEY DELIVERABLES INCLUDED BY ONSPEC
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {opportunity.whatsIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#101D35]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#27B58A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coordinated Execution Stages */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#253B5B] font-semibold">
                  END-TO-END EXECUTION CHOREOGRAPHY
                </h3>
                <div className="space-y-2">
                  {opportunity.executionStages.map((st) => (
                    <div
                      key={st.step}
                      className="rounded-lg border border-[#A8B1BE]/35 bg-white p-3.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[#27B58A]">
                          {st.step}
                        </span>
                        <span className="text-sm font-bold text-[#101D35]">
                          {st.title}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#253B5B]">
                        {st.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cyprus Setup Note */}
              <div className="rounded-lg border border-[#253B5B]/25 bg-[#101D35] p-4 text-xs text-[#F7F8FA]/90">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#27B58A]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>CYPRUS & EU DEPLOYMENT NOTE</span>
                </div>
                <p className="mt-1.5 leading-relaxed">
                  {opportunity.cyprusSetupNotes}
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-[#A8B1BE]/40 bg-white p-6">
              {referenceId ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#27B58A]/15 text-[#27B58A]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    SPECIFICATION DOSSIER REQUEST LOGGED
                  </p>
                  <h3 className="text-xl font-bold text-[#101D35]">
                    Reference ID: {referenceId}
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-[#253B5B]">
                    Our Business Launch desk has registered your enquiry for{" "}
                    <strong>{opportunity.title}</strong>. We will prepare a
                    preliminary feasibility and turnkey setup quotation for{" "}
                    <strong>{city}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#253B5B] transition-colors cursor-pointer"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                      TURNKEY INTAKE // {opportunity.specCode}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#101D35]">
                      Request Full Dossier & Turnkey Quotation
                    </h3>
                    <p className="mt-1 text-xs text-[#253B5B]">
                      Receive equipment breakdowns, available Cyprus location
                      slots, and a free preliminary launch proposal.
                    </p>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Andreas Georgiou"
                      className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.eu"
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+357 99 000 000"
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                      Target City / Deployment Region
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    >
                      <option value="Limassol, Cyprus">Limassol, Cyprus</option>
                      <option value="Nicosia, Cyprus">Nicosia, Cyprus</option>
                      <option value="Larnaca, Cyprus">Larnaca, Cyprus</option>
                      <option value="Paphos, Cyprus">Paphos, Cyprus</option>
                      <option value="Ayia Napa / Protaras, Cyprus">
                        Ayia Napa / Protaras, Cyprus
                      </option>
                      <option value="Multi-City Cyprus Route">
                        Multi-City Cyprus Route
                      </option>
                      <option value="European Union (Other)">
                        European Union (Other)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                      Questions, Unit Count or Timeline Goals
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Looking to start with 2 units in Limassol within 60 days, need location scouting and company setup..."
                      className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#27B58A] px-5 py-3 text-sm font-semibold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {submitting
                        ? "Registering Specification Request..."
                        : "Request Turnkey Spec & Free Proposal"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="flex items-center justify-between border-t border-[#A8B1BE]/35 bg-white px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/75">
              ESTIMATED TURNKEY CAPITAL
            </p>
            <p className="text-sm font-bold text-[#101D35]">
              {opportunity.estimatedCapital}
            </p>
          </div>
          {activeTab === "specs" ? (
            <button
              type="button"
              onClick={() => setActiveTab("enquire")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#27B58A] px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors cursor-pointer"
            >
              <span>Request Info & Quotation</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className="inline-flex items-center gap-2 rounded-lg border border-[#A8B1BE]/50 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#101D35] hover:border-[#101D35] transition-colors cursor-pointer"
            >
              Back to Technical Specs
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecDrawerModal;
