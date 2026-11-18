"use client";

import React, { useState } from "react";
import { siteConfig, ZipCodeRecord } from "@/config/site";
import { MapPin, Search, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Navigation } from "lucide-react";

export function ServiceAreaSection() {
  const [zipInput, setZipInput] = useState("");
  const [searchedRecord, setSearchedRecord] = useState<ZipCodeRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    const match = siteConfig.serviceAreaZipCodes.find((z) => z.zip === cleanZip);
    setSearchedRecord(match || null);
    setHasSearched(true);
  };

  return (
    <section id="service-area" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-summit-400 text-xs font-semibold mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Colorado Front Range & Denver Metro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Active Service Areas & NOAA Storm Hail Validator
          </h2>
          <p className="mt-3 text-slate-300 text-sm">
            Enter your Colorado ZIP code to check immediate crew dispatch availability and verify recent NOAA hail radar readings for zero-deductible insurance restoration claims.
          </p>
        </div>

        {/* Interactive ZIP Search Tool */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-xl">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                maxLength={5}
                placeholder="Enter 5-digit ZIP (e.g. 80126, 80202, 80301)..."
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-summit-600 hover:bg-summit-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Validate ZIP</span>
            </button>
          </form>

          {/* Search Result Card */}
          {hasSearched && (
            <div className="mt-4 animate-in fade-in duration-200">
              {searchedRecord ? (
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/80 shadow-lg text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Active Dispatch: {searchedRecord.city}, {searchedRecord.state} ({searchedRecord.zip})
                    </span>
                    <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 text-[10px] font-mono">
                      Crews On-Site Today
                    </span>
                  </div>

                  {searchedRecord.stormRestorationQualified ? (
                    <div className="p-3 bg-summit-950/40 rounded-lg border border-summit-800/80 text-[11px] text-summit-300 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-summit-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>NOAA Storm Alert Detected:</strong> On {searchedRecord.recentStormDate}, radar confirmed {searchedRecord.hailSizeInches}&quot; hail in {searchedRecord.city}. Properties in this ZIP are pre-qualified for full insurance roof replacement.
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-[11px]">
                      Summit Roofing crews service {searchedRecord.city} weekly for regular maintenance, roof replacements, and $149 drone inspections.
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span>ZIP code not in primary automated grid, but we dispatch custom teams across Colorado.</span>
                  </div>
                  <a
                    href="tel:3035557663"
                    className="text-summit-400 font-bold hover:underline text-[11px]"
                  >
                    Call Dispatch
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Regional Coverage Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {siteConfig.serviceAreaZipCodes.map((item) => (
            <div
              key={item.zip}
              className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-summit-400 font-bold mb-1">
                <span>{item.zip}</span>
                {item.stormRestorationQualified && (
                  <span className="w-2 h-2 rounded-full bg-summit-500 animate-ping" />
                )}
              </div>
              <div className="font-semibold text-xs text-white">{item.city}</div>
              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                <span>Crew Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
