"use client";

import React from "react";
import { Sparkles, CreditCard, ShieldCheck, Check, ArrowRight } from "lucide-react";

export function FinancingBanner() {
  return (
    <section id="financing" className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-y border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-summit-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-summit-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flexible Home Improvement Financing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                High-Ticket Roofing Financing Powered by Whop Commerce
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Protect your home now without depleting your emergency savings. Through our native Whop Checkout integration, homeowners unlock instant soft credit approvals for <strong>0% APR Same-as-Cash</strong> or low fixed monthly rates up to 60 months.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs">Klarna & Afterpay</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Pay-in-4 or low monthly interest on roof repairs & inspections.</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs">Splitit 0% APR</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Split full replacements over existing credit cards with zero interest.</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs">Affirm Long-Term</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Project loans up to $25,000 with predictable fixed monthly payments.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-center">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Instant Checkout Approval
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                $0 Upfront
              </div>
              <p className="text-xs text-slate-400">
                Lock your project date with the $500 deposit or apply for full financing directly inside the Whop checkout modal.
              </p>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-1.5 w-full bg-summit-600 hover:bg-summit-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition"
              >
                <span>Calculate Your Monthly Rate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
