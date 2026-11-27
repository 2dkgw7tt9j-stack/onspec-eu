"use client";

import React, { useEffect, useState } from "react";
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
  const open =
    isOpen !== undefined
      ? isOpen && Boolean(opportunity)
      : Boolean(opportunity);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("Limassol, Cyprus");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      setReferenceId(null);
      html.classList.add("has-modal-open");
    } else {
      html.classList.remove("has-modal-open");
    }
    return () => {
      html.classList.remove("has-modal-open");
    };
  }, [open, opportunity?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!opportunity) return;
    setSubmitting(true);
    const res = await submitOnspecEnquiry({
      pillar: "01_LAUNCH",
      name,
      email,
      whatsapp,
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      message: `Preferred Deployment Location: ${city}. Notes: ${notes}`,
    });
    setSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <div
      className={`c-modal-feature modal ${open && opportunity ? "is-active" : ""}`}
      data-modal-name="feature"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={opportunity?.title || "Specification Modal"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal_container"
        data-modal-feature-target
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circular Dark X Close Button in top-right */}
        <button
          type="button"
          className="c-button -icon -color-black modal_close cursor-pointer"
          aria-label="Close"
          data-modal-feature-toggler=""
          onClick={onClose}
        >
          <span className="c-button_inner">
            <span className="c-icon c-button_icon">
              <svg
                className="svg-close"
                viewBox="0 0 20 20"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="m10 9.2 6.5-6.3.3.4.3.4-6.5 6.3 6.5 6.3-.7.7-6.4-6.4-6.8 6.7-.7-.7L9.3 10 2.5 3.2l.3-.4.3-.4L10 9.2z"
                />
              </svg>
            </span>
          </span>
        </button>

        {opportunity && (
          <div className="modal_inner c-wysiwyg w-full" data-modal-feature-inner>
            {/* Top Navigation & Return Bar */}
            <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-black/10">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-black/70 hover:text-black hover:-translate-x-0.5 transition-all cursor-pointer font-semibold"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13L5 8l5-5" />
                </svg>
                <span>Back to Opportunities</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-black/70 hover:text-black bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
              >
                <span>Close</span>
                <span className="font-bold">✕</span>
              </button>
            </div>

            {/* Category micro-label */}
            <span className="text-eyebrow block text-black/50 mb-2 pr-12">
              {opportunity.category} : {opportunity.specCode}
            </span>

            {/* Giant h2 heading */}
            <h2 className="text-heading-lg mb-6 pr-12">{opportunity.title}</h2>

            <div className="flex flex-col gap-y-fluid-sm">
              {/* 1700x830 rounded architectural visual */}
              <div
                className="c-image -rounded-md -cover -lazy-load is-loaded overflow-hidden"
                style={{ aspectRatio: "1700 / 830" }}
              >
                <picture className="c-image_inner">
                  <img
                    className="c-image_img is-loaded"
                    alt={opportunity.title}
                    width={1700}
                    height={830}
                    src={opportunity.image}
                  />
                </picture>
              </div>

              {/* 4-Column Architectural Spec Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-y border-black/15">
                <div>
                  <div className="text-xs text-black/50 uppercase">
                    Estimated Capital
                  </div>
                  <div className="text-md font-bold mt-1">
                    {opportunity.estimatedCapital}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-black/50 uppercase">
                    Deployment Timeline
                  </div>
                  <div className="text-md font-bold mt-1">
                    {opportunity.timeline}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-black/50 uppercase">
                    Owner Autonomy
                  </div>
                  <div className="text-md font-bold mt-1">
                    {opportunity.weeklyOwnerHours}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-black/50 uppercase">
                    Investment Tier
                  </div>
                  <div className="text-md font-bold mt-1 text-black">
                    {opportunity.investmentTier}
                  </div>
                </div>
              </div>

              {/* .c-wysiwyg Two-Column Technical Breakdown */}
              <div className="c-wysiwyg">
                <p>{opportunity.fullDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* Left Column: Turnkey Deliverables & Execution Choreography */}
                  <div>
                    <h3 className="text-heading-xs mb-3">
                      Turnkey Deliverables Included
                    </h3>
                    <ul>
                      {opportunity.whatsIncluded.map((item) => (
                        <li key={item} className="text-md">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-heading-xs mt-8 mb-3">
                      Execution Choreography
                    </h3>
                    <div className="space-y-3">
                      {opportunity.executionStages.map((stage) => (
                        <div
                          key={stage.step}
                          className="p-4 rounded-[12px] bg-[#F7F8FA] border border-black/10"
                        >
                          <div className="text-xs font-bold text-black uppercase">
                            {stage.step} : {stage.title}
                          </div>
                          <div className="text-sm text-black/75 mt-1">
                            {stage.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Technical Spec Matrix & Cyprus Setup Notes */}
                  <div>
                    <h3 className="text-heading-xs mb-3">
                      Technical Specification Matrix
                    </h3>
                    <table className="!my-2">
                      <tbody>
                        {opportunity.technicalSpecs.map((spec) => (
                          <tr key={spec.label}>
                            <td className="text-black/60">{spec.label}</td>
                            <td className="font-bold">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="p-5 rounded-[12px] bg-black text-white mt-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/90 font-mono">
                        Cyprus &amp; EU Deployment Note
                      </div>
                      <p className="text-sm text-white/85 mt-2">
                        {opportunity.cyprusSetupNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Reserve / Specification Dossier Request Form */}
              <div className="p-6 md:p-8 rounded-[18px] bg-[#F7F8FA] border border-black/10 mt-4">
                {referenceId ? (
                  <div className="py-4 text-center space-y-3">
                    <div className="text-xs font-bold uppercase tracking-widest text-black">
                      Turnkey Specification Dossier Registered
                    </div>
                    <h3 className="text-heading-sm">
                      Reference Code: {referenceId}
                    </h3>
                    <p className="text-sm text-black/70 max-w-lg mx-auto">
                      Our Cyprus &amp; EU Launch Desk has logged your feasibility
                      and turnkey configuration request for{" "}
                      <strong>{opportunity.title}</strong> ({city}). We will
                      deliver your preliminary proposal via Email and WhatsApp.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="c-button primary -color-black cursor-pointer"
                      >
                        <span className="c-button_inner">
                          <span
                            className="c-button_label-container"
                            data-label="Close Specification"
                          >
                            <span className="c-button_label">
                              Close Specification
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-black">
                          Instant Reserve &amp; Feasibility Dossier //{" "}
                          {opportunity.specCode}
                        </span>
                        <h3 className="text-heading-xs mt-1">
                          Request Turnkey Proposal for {opportunity.title}
                        </h3>
                      </div>
                      <span className="text-xs text-black/50">
                        Free Preliminary Quotation • 24 to 48h Turnaround
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="c-input-text">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name *"
                          className="c-input-text_input text-sm"
                        />
                      </div>
                      <div className="c-input-text">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address *"
                          className="c-input-text_input text-sm"
                        />
                      </div>
                      <div className="c-input-text">
                        <input
                          type="text"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="WhatsApp / Phone (+357...) *"
                          className="c-input-text_input text-sm"
                        />
                      </div>
                      <div className="c-input-text">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="c-input-text_input text-sm bg-transparent"
                        >
                          <option value="Limassol, Cyprus">
                            Limassol, Cyprus
                          </option>
                          <option value="Nicosia, Cyprus">
                            Nicosia, Cyprus
                          </option>
                          <option value="Larnaca, Cyprus">
                            Larnaca, Cyprus
                          </option>
                          <option value="Paphos, Cyprus">Paphos, Cyprus</option>
                          <option value="Ayia Napa / Protaras, Cyprus">
                            Ayia Napa / Protaras, Cyprus
                          </option>
                          <option value="European Union (Multi-City)">
                            European Union (Multi-City)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="c-input-text">
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional: Target unit count, preferred location type, or timeline..."
                        className="c-input-text_input text-sm"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-black/50">
                        Includes Cyprus legal &amp; corporate registration
                        coordination via independent counsel.
                      </span>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="c-button primary -color-black cursor-pointer"
                      >
                        <span className="c-button_inner">
                          <span
                            className="c-button_label-container"
                            data-label={
                              submitting
                                ? "Submitting..."
                                : "Request Turnkey Dossier"
                            }
                          >
                            <span className="c-button_label">
                              {submitting
                                ? "Submitting..."
                                : "Request Turnkey Dossier"}
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
                )}

                {/* Bottom Quick Return Bar */}
                <div className="mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-black/20 text-xs font-mono uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all cursor-pointer font-semibold"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13L5 8l5-5" />
                    </svg>
                    <span>Back to All Ready Businesses</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-mono uppercase tracking-wider text-black/50 hover:text-black underline transition-colors cursor-pointer"
                  >
                    Close Specification (✕)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecDrawerModal;
