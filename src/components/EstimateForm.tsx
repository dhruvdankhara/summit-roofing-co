"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { trackWhopEvent } from "@/lib/tracking";
import { CheckCircle2, Send, ShieldCheck, Sparkles, AlertCircle, Phone, Mail, MapPin } from "lucide-react";

export function EstimateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "80202",
    serviceNeeded: "Full Roof Replacement",
    estimatedSqFt: 2400,
    preferredFinancing: "Whop Splitit (0% APR)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to submit estimate request.");
      }

      setSubmittedLead(data.lead);

      // Firing Pixel Event Required by Blueprint:
      // whop.track('estimate_requested', { service_type, zip_code, estimated_sqft, lead_id })
      trackWhopEvent("estimate_requested", {
        service_type: formData.serviceNeeded,
        zip_code: formData.zipCode,
        estimated_sqft: Number(formData.estimatedSqFt),
        lead_id: data.lead.id,
        source: "website_estimate_form",
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-summit-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Whop Leads API Integration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Request Your Free Drone & Thermal Estimate
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Submit your property details for a 24-hour forensic roof inspection quote. Quote requests are ingested directly into the Summit Roofing Co. Whop CRM Leads pipeline.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="p-2.5 bg-slate-800 text-summit-500 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Emergency Hotline & Dispatch</div>
                  <div className="text-xs text-slate-400">{siteConfig.company.phone} (24/7 Response)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="p-2.5 bg-slate-800 text-summit-500 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Estimating Department</div>
                  <div className="text-xs text-slate-400">{siteConfig.company.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="p-2.5 bg-slate-800 text-summit-500 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Headquarters & Fabrication Facility</div>
                  <div className="text-xs text-slate-400">{siteConfig.company.headquarters}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Privacy & Data Security
              </div>
              <p>Your address and phone are only shared with licensed Summit project managers. Zero third-party marketing brokers.</p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
            {submittedLead ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-950 text-emerald-400 border border-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Estimate Request Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your estimate request has been ingested into our Whop CRM. An estimator will fly an automated drone grid or review your satellite topo within 24 hours.
                </p>

                {/* Verified Whop Lead ID Display Required by Blueprint */}
                <div className="bg-slate-900 p-4 rounded-xl border border-emerald-800/80 max-w-md mx-auto text-left font-mono text-xs space-y-1 text-slate-300">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Whop CRM Lead Record
                  </div>
                  <div>Lead ID: <span className="text-white font-bold">{submittedLead.id}</span></div>
                  <div>Status: <span className="text-emerald-300">{submittedLead.status}</span></div>
                  <div>Service: {formData.serviceNeeded}</div>
                  <div>ZIP Code: {formData.zipCode}</div>
                  <div>Estimated Roof Area: {formData.estimatedSqFt} sq ft</div>
                  <div>Financing Preference: {formData.preferredFinancing}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedLead(null)}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-lg text-xs transition"
                >
                  Submit Another Estimate Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-summit-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-summit-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (303) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-summit-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="e.g. 80202"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-summit-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Property Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8422 Highlands Ranch Pkwy"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-summit-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Service Needed
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-summit-500"
                    >
                      <option value="Full Roof Replacement">Full Roof Replacement</option>
                      <option value="Precision Leak Repair">Precision Leak Repair</option>
                      <option value="21-Point Drone Inspection ($149)">21-Point Drone Inspection ($149)</option>
                      <option value="Storm / Hail Insurance Claim Restoration">Storm / Hail Claim Restoration</option>
                      <option value="Emergency Storm Tarping ($399)">Emergency Storm Tarping ($399)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Estimated Roof Size (Sq Ft)
                    </label>
                    <input
                      type="number"
                      step={100}
                      value={formData.estimatedSqFt}
                      onChange={(e) => setFormData({ ...formData, estimatedSqFt: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-summit-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Preferred Financing Option
                  </label>
                  <select
                    value={formData.preferredFinancing}
                    onChange={(e) => setFormData({ ...formData, preferredFinancing: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-summit-500"
                  >
                    <option value="Whop Splitit (0% APR Installments)">Whop Splitit (0% APR Installments)</option>
                    <option value="Whop Klarna (Pay-in-4 or Low APR)">Whop Klarna (Pay-in-4 or Low APR)</option>
                    <option value="Affirm Long-Term Fixed Loan">Affirm Long-Term Fixed Loan</option>
                    <option value="Insurance Claim Coverage (Zero Out-of-Pocket Deductible Plan)">Insurance Claim Deductible Plan</option>
                    <option value="Cash / Certified Bank Check">Cash / Certified Bank Check</option>
                  </select>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-summit-600 hover:bg-summit-500 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Submitting to Whop Leads API...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Send className="w-4 h-4" />
                      <span>Send Request to Whop Leads API</span>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
