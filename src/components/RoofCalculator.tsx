"use client";

import React, { useState, useMemo } from "react";
import { siteConfig, MaterialTier, PitchMultiplier } from "@/config/site";
import { Calculator, Shield, Sparkles, Check, ChevronRight, Lock, DollarSign } from "lucide-react";
import { trackWhopEvent } from "@/lib/tracking";

interface RoofCalculatorProps {
  onSelectDeposit: (totalEstimate: number, metadata: Record<string, any>) => void;
}

export function RoofCalculator({ onSelectDeposit }: RoofCalculatorProps) {
  const { calculator } = siteConfig;

  const [sqFt, setSqFt] = useState(calculator.defaultSqFt);
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    calculator.materials.find((m) => m.popular)?.id || calculator.materials[0].id
  );
  const [selectedPitchId, setSelectedPitchId] = useState(calculator.pitches[1].id);
  const [financingMonths, setFinancingMonths] = useState(36);

  const selectedMaterial = useMemo(
    () => calculator.materials.find((m) => m.id === selectedMaterialId) || calculator.materials[0],
    [selectedMaterialId, calculator.materials]
  );

  const selectedPitch = useMemo(
    () => calculator.pitches.find((p) => p.id === selectedPitchId) || calculator.pitches[0],
    [selectedPitchId, calculator.pitches]
  );

  // Dynamic cost calculations
  const totalCost = useMemo(() => {
    const rawCost = sqFt * selectedMaterial.pricePerSqFt * selectedPitch.multiplier;
    return Math.round(rawCost / 50) * 50; // round to nearest $50
  }, [sqFt, selectedMaterial, selectedPitch]);

  const depositDueToday = calculator.depositAmount; // $500
  const remainingBalance = totalCost - depositDueToday;

  // Monthly financing estimation
  const monthlyPayment = useMemo(() => {
    const plan = calculator.financingPlans.find((p) => p.months === financingMonths);
    if (!plan) return Math.round(totalCost / financingMonths);

    if (plan.apr === 0) {
      return Math.round(totalCost / plan.months);
    }
    const r = plan.apr / 100 / 12;
    const n = plan.months;
    const m = (totalCost * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(m);
  }, [totalCost, financingMonths, calculator.financingPlans]);

  const handleDepositClick = () => {
    const metadata = {
      sq_ft: sqFt,
      material: selectedMaterial.name,
      pitch: selectedPitch.label,
      total_estimate: totalCost,
      monthly_financing_option: `${financingMonths} months (~$${monthlyPayment}/mo)`,
      deposit: depositDueToday,
      remaining_balance: remainingBalance,
    };

    trackWhopEvent("deposit_started", {
      source: "roof_calculator",
      ...metadata,
    });

    onSelectDeposit(totalCost, metadata);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-summit-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-summit-400 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Whop Pricing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Instant Roof Replacement & Financing Calculator
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Customize your square footage, architectural slope, and impact-resistant materials to calculate turnkey costs and monthly Whop BNPL financing options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-8 shadow-xl">
            {/* 1. Square Footage Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span>1. Roof Area (Square Feet)</span>
                </label>
                <div className="bg-slate-900 px-3.5 py-1 rounded-lg border border-slate-700 text-summit-400 font-mono font-bold text-base">
                  {sqFt.toLocaleString()} sq ft
                </div>
              </div>
              <input
                type="range"
                min={calculator.minSqFt}
                max={calculator.maxSqFt}
                step={50}
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-summit-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
                <span>{calculator.minSqFt.toLocaleString()} sq ft (Ranch)</span>
                <span>3,200 sq ft (Typical 2-Story)</span>
                <span>{calculator.maxSqFt.toLocaleString()} sq ft (Estate)</span>
              </div>
            </div>

            {/* 2. Pitch Multiplier */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                2. Roof Pitch & Slope
              </label>
              <div className="grid grid-cols-3 gap-3">
                {calculator.pitches.map((p) => {
                  const isSelected = p.id === selectedPitchId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPitchId(p.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "bg-summit-600/15 border-summit-500 text-white shadow-md ring-1 ring-summit-500"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{p.label}</div>
                      <div className="font-mono text-[11px] text-summit-400 mt-0.5">{p.slope}</div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{p.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Material Selection Cards */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                3. High-Performance Material Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {calculator.materials.map((m) => {
                  const isSelected = m.id === selectedMaterialId;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMaterialId(m.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                        isSelected
                          ? "bg-slate-900 border-summit-500 shadow-md ring-1 ring-summit-500"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {m.popular && (
                        <span className="absolute -top-2.5 right-3 bg-summit-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Most Popular in CO
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-white">{m.name}</div>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          ${m.pricePerSqFt.toFixed(2)}/sq ft
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{m.description}</p>
                      <div className="mt-2.5 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Shield className="w-3 h-3 text-summit-500" />
                          {m.impactRating}
                        </span>
                        <span>•</span>
                        <span>{m.lifespanYears} Yr Lifespan</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Financing Term Selector */}
            <div>
              <label className="block text-sm font-bold text-white mb-2.5">
                4. Preferred Whop BNPL Financing Term
              </label>
              <div className="grid grid-cols-3 gap-2">
                {calculator.financingPlans.map((fp) => (
                  <button
                    key={fp.months}
                    type="button"
                    onClick={() => setFinancingMonths(fp.months)}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition ${
                      financingMonths === fp.months
                        ? "bg-emerald-950/70 border-emerald-500 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {fp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Live Quote Breakdown Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  Custom Estimate Summary
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Turnkey Contract Price
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  ${totalCost.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">Includes Labor, Permitting & Cleanup</div>
              </div>
            </div>

            {/* Monthly BNPL Highlight */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 p-4 rounded-xl border border-emerald-800/60 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Estimated Whop Financing
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Klarna • Splitit • Affirm (Instant Approval)
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xl font-bold text-emerald-400">
                  ~${monthlyPayment}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-[10px] text-slate-400">{financingMonths} Month Term</div>
              </div>
            </div>

            {/* High-Ticket Roofing Milestone Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Payment Schedule & Milestone Plan
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-summit-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Due Today (Project Deposit)
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Locks crew date, material pricing & permits
                  </div>
                </div>
                <div className="font-mono font-bold text-white text-base">
                  ${depositDueToday}.00
                </div>
              </div>

              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-slate-400" />
                    Remaining Final Balance
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Billed via Invoices API after final inspection passed
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-300 text-sm">
                  ${remainingBalance.toLocaleString()}.00
                </div>
              </div>
            </div>

            {/* Direct CTA Wiring to Modal & Setup Intent */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleDepositClick}
                className="w-full bg-summit-600 hover:bg-summit-500 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <span>Pay ${depositDueToday} Deposit for This Estimate</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Depositing saves your card securely on file (Setup Intent). You are never charged the final balance until your roof passes complete municipal inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
