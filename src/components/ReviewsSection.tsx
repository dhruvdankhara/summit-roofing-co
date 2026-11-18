"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Star, ShieldCheck, CheckCircle2, Award, Sparkles } from "lucide-react";

export function ReviewsSection() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="reviews" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-summit-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Front Range Craftsmanship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Before & After Transformations & Homeowner Reviews
          </h2>
          <p className="mt-3 text-slate-300 text-sm">
            See how Summit Roofing transforms severe Colorado hail damage into Class-4 impact-resistant architectural masterpieces.
          </p>
        </div>

        {/* Interactive Before / After Comparison Card */}
        <div className="mb-16 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-summit-400 font-bold">
                Interactive Project Comparison
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Hail-Punctured 3-Tab Shingles → Class-4 Impact Architectural System
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Drag the slider left and right to inspect the forensic transformation on Highlands Ranch Pkwy.
              </p>
            </div>

            {/* Slider visual simulation */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 select-none">
              {/* "After" Layer (Full width background) */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col justify-end p-6">
                <div className="absolute top-4 right-4 bg-emerald-950 text-emerald-400 border border-emerald-500/80 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono">
                  AFTER: Class-4 Hail Armor Installed
                </div>
                <div className="text-xs text-slate-300 bg-slate-950/80 backdrop-blur p-3 rounded-lg border border-slate-800 max-w-xs">
                  <div className="font-bold text-white text-sm">GAF Timberline HDZ® in Charcoal</div>
                  <div>Passed 130 mph wind test • 50-Yr Non-Prorated Warranty</div>
                </div>
              </div>

              {/* "Before" Layer (Clipped to slider percentage) */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-br from-amber-950/90 via-slate-900 to-slate-950 border-r-2 border-summit-500 overflow-hidden flex flex-col justify-end p-6"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="absolute top-4 left-4 bg-red-950 text-red-400 border border-red-800 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono">
                  BEFORE: Severe 2.0&quot; Hail Delamination
                </div>
                <div className="text-xs text-slate-300 bg-slate-950/80 backdrop-blur p-3 rounded-lg border border-slate-800 max-w-xs">
                  <div className="font-bold text-white text-sm">Severe Granule Loss & Rotted Decking</div>
                  <div>Underlayment compromised • Active ceiling leaks</div>
                </div>
              </div>

              {/* Slider Thumb Handle */}
              <div
                className="absolute top-0 bottom-0 -ml-3 w-6 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-summit-500 border-2 border-white shadow-lg flex items-center justify-center text-[10px] text-white font-bold">
                  ↔
                </div>
              </div>

              {/* Invisible Range Control */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              />
            </div>
          </div>
        </div>

        {/* Verified Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {siteConfig.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-summit-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-summit-500 text-summit-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
                </div>

                <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                  <span>{rev.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400 mb-3">{rev.city}</div>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10.5px] font-mono text-slate-400 flex items-center justify-between">
                <span>{rev.projectType}</span>
                {rev.financedWithWhop && (
                  <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    {rev.financingOption}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Manufacturer Warranty Badges */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-300">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">GAF Master Elite®</div>
            <div className="text-[11px] text-slate-400">Golden Pledge 50-Yr Non-Prorated Warranty</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">Owens Corning Platinum</div>
            <div className="text-[11px] text-slate-400">Total Protection Roofing System®</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">A+ BBB Accredited</div>
            <div className="text-[11px] text-slate-400">100% Five-Star Colorado Consumer Rating</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">$2M Insurance Coverage</div>
            <div className="text-[11px] text-slate-400">Full Commercial Liability & Workers&apos; Comp</div>
          </div>
        </div>
      </div>
    </section>
  );
}
