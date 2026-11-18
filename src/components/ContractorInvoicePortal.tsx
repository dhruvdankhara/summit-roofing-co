"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { CheckCircle2, CreditCard, Send, ShieldCheck, Terminal, ArrowRight, RefreshCw, FileText, Check, AlertCircle } from "lucide-react";

export function ContractorInvoicePortal() {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [balanceAmount, setBalanceAmount] = useState<number>(11500);
  const [customerName, setCustomerName] = useState("Marcus Sterling");
  const [customerEmail, setCustomerEmail] = useState("m.sterling@example.com");
  const [setupIntentId, setSetupIntentId] = useState("seti_summit_deposit_500_vault");
  const [paymentMethodId, setPaymentMethodId] = useState("pm_summit_vaulted_4242");

  const [loadingMode, setLoadingMode] = useState<"auto_charge" | "send_invoice" | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleTriggerInvoice = async (mode: "auto_charge" | "send_invoice") => {
    setLoadingMode(mode);
    setApiResponse(null);

    try {
      const res = await fetch("/api/invoices/final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          amount: balanceAmount,
          customerName,
          customerEmail,
          paymentMethodId,
          setupIntentId,
          jobDescription: `Final Balance: Full Roof Replacement (Class-4 Impact Architectural Shingles, 3,100 sq ft) following passed Douglas County municipal inspection sign-off.`,
          projectAddress: "8422 Highlands Ranch Pkwy, Highlands Ranch, CO 80126",
        }),
      });

      const data = await res.json();
      setApiResponse(data);
    } catch (err: any) {
      setApiResponse({ error: err.message || "Failed to trigger invoice" });
    } finally {
      setLoadingMode(null);
    }
  };

  return (
    <section id="contractor-portal" className="py-20 bg-slate-950 text-white border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-summit-950 border border-summit-600/50 text-summit-400 text-xs font-semibold mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>High-Ticket Contractor Commerce Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Interactive Whop Contractor Lifecycle Console
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Demonstrating the complete US roofing financial pipeline: Deposit Capture with Card-on-File (Setup Intent) → Job Sign-Off → Milestone Final Balance Billing via Whop Invoices API.
          </p>
        </div>

        {/* 3-Step Pipeline Visual Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Step 1 Card */}
          <div className="p-5 rounded-xl border bg-slate-900/90 border-emerald-500/60 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-emerald-400 font-bold">STEP 01</span>
              <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-800 font-mono">
                COMPLETED
              </span>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              $500 Deposit Paid
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Customer locks installation crew and wholesale materials with Whop Payment Elements.
            </p>
            <div className="mt-3 p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[10px] text-slate-300 space-y-0.5">
              <div className="text-emerald-400">Card Vaulted via Setup Intent</div>
              <div>ID: {setupIntentId}</div>
              <div>Vault: Visa •••• 4242 (Off-Session)</div>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="p-5 rounded-xl border bg-slate-900/90 border-emerald-500/60 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-emerald-400 font-bold">STEP 02</span>
              <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-800 font-mono">
                COMPLETED
              </span>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Roof Installed & Inspected
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Complete tear-off, GAF Class-4 install, and municipal building department inspection signed off.
            </p>
            <div className="mt-3 p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[10px] text-slate-300 space-y-0.5">
              <div className="text-emerald-400">Douglas County Permit #R-88412</div>
              <div>Status: Final Inspection PASSED</div>
              <div>Warranties: 50-Year Non-Prorated Active</div>
            </div>
          </div>

          {/* Step 3 Card (Active Interactive Step) */}
          <div className="p-5 rounded-xl border bg-summit-950/40 border-summit-500 shadow-xl relative overflow-hidden ring-1 ring-summit-500">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-summit-400 font-bold">STEP 03 — ACTIVE</span>
              <span className="bg-summit-900 text-summit-300 text-[10px] px-2 py-0.5 rounded border border-summit-700 font-mono animate-pulse">
                READY TO BILL
              </span>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-summit-400" />
              Bill Final Balance ($11,500)
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Trigger Whop Invoices API: Auto-charge the stored card on file OR email a Whop invoice with BNPL.
            </p>
            <div className="mt-3 p-2 bg-slate-950 rounded border border-summit-800/80 font-mono text-[10px] text-summit-300 space-y-0.5">
              <div>Contract Balance: ${balanceAmount.toLocaleString()}.00</div>
              <div>Customer: {customerName}</div>
              <div>Target: Whop Invoices API (v5)</div>
            </div>
          </div>
        </div>

        {/* Live Simulator Controls & JSON Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800">
          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-summit-500" />
              Contractor Billing Dispatch
            </h3>
            <p className="text-xs text-slate-400">
              Select which Whop billing mode to execute for this completed project:
            </p>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Balance Due ($)</label>
                  <input
                    type="number"
                    value={balanceAmount}
                    onChange={(e) => setBalanceAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Vaulted Payment Method</label>
                <input
                  type="text"
                  disabled
                  value="Visa •••• 4242 (Vaulted via Setup Intent)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 font-mono"
                />
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  disabled={loadingMode !== null}
                  onClick={() => handleTriggerInvoice("auto_charge")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loadingMode === "auto_charge" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                  <span>Mode 1: Auto-Charge Stored Card on File (${balanceAmount.toLocaleString()})</span>
                </button>

                <button
                  type="button"
                  disabled={loadingMode !== null}
                  onClick={() => handleTriggerInvoice("send_invoice")}
                  className="w-full bg-summit-600 hover:bg-summit-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loadingMode === "send_invoice" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Mode 2: Send Whop Invoice for Manual / BNPL Payment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Live JSON API Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-2 text-slate-300 font-bold">
                <Terminal className="w-3.5 h-3.5 text-summit-500" />
                Live Response: POST /api/invoices/final
              </span>
              <span className="text-emerald-400">Whop Invoices API v5</span>
            </div>

            {apiResponse ? (
              <pre className="text-emerald-400 whitespace-pre-wrap break-all leading-relaxed max-h-72 overflow-y-auto text-[11px] p-2 bg-slate-900/60 rounded">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <AlertCircle className="w-6 h-6 mx-auto text-slate-600" />
                <p>Click either button on the left to fire the live Whop Invoices API endpoint.</p>
                <p className="text-[10px] text-slate-600">
                  Shows the exact JSON returned to the contractor ERP / CRM.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
