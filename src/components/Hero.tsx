"use client";

import React from "react";
import { siteConfig, WhopPlanConfig } from "@/config/site";
import { ShieldCheck, ArrowRight, Sparkles, Check, Phone, ChevronRight } from "lucide-react";
import { trackWhopEvent } from "@/lib/tracking";

interface HeroProps {
  onSelectDeposit: (plan: WhopPlanConfig) => void;
}

export function Hero({ onSelectDeposit }: HeroProps) {
  const handleDepositClick = () => {
    trackWhopEvent("deposit_started", {
      source: "hero_primary_cta",
      plan_id: siteConfig.plans.deposit.id,
      price: siteConfig.plans.deposit.price,
    });
    onSelectDeposit(siteConfig.plans.deposit);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-950 text-white overflow-hidden">
      {/* Background Architectural Mesh & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-summit-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-summit-400 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-summit-500 animate-pulse" />
              <span>Denver Metro & Front Range Storm Dispatch Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Built for the Peaks. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-summit-500 to-amber-300">
                Backed by Ironclad Warranties.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Front Range architectural roofing built to withstand 90+ mph downslope winds and golf-ball hail. Secure your installation date with our guaranteed <strong>$500 project deposit</strong>, backed by native Whop financing and card-on-file milestone billing.
            </p>

            {/* Dual CTAs required by Blueprint */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={handleDepositClick}
                className="w-full sm:w-auto bg-summit-600 hover:bg-summit-500 text-white font-extrabold py-3.5 px-8 rounded-xl shadow-xl transition flex items-center justify-center gap-2 text-sm"
              >
                <span>Lock In $500 Project Deposit</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#estimate"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold py-3.5 px-8 rounded-xl transition flex items-center justify-center gap-2 text-sm"
              >
                <span>Request Free Drone Estimate</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* 4 Trust Badges Required by Blueprint */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>GAF Master Elite® (Top 2% in US)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Owens Corning Platinum Preferred</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>A+ BBB Accredited Business</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>$2M Liability & Workers&apos; Comp</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="text-xs uppercase font-mono tracking-widest text-summit-400 font-bold mb-2">
              Next-Generation Contractor Checkout
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Whop 3-Tier Protected Contracting
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">21-Point Drone Inspection</div>
                  <div className="text-[11px] text-slate-400">Credited 100% to replacement</div>
                </div>
                <div className="font-mono font-bold text-emerald-400">$149</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-summit-600/50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-summit-400">Roof Replacement Deposit</div>
                  <div className="text-[11px] text-slate-300">Locks material cost + Card on File</div>
                </div>
                <div className="font-mono font-bold text-white">$500</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Emergency Storm Tarping</div>
                  <div className="text-[11px] text-slate-400">2-Hour Rapid Response Line</div>
                </div>
                <div className="font-mono font-bold text-emerald-400">$399</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Card-on-File via Setup Intent</span>
              <span className="font-mono text-emerald-400">0% APR Financing Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
