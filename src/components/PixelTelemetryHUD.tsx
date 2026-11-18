"use client";

import React, { useState, useEffect } from "react";
import { Activity, ChevronDown, ChevronUp, Terminal, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PixelEventDetail } from "@/lib/tracking";

export function PixelTelemetryHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<PixelEventDetail[]>([]);
  const [status, setStatus] = useState({
    service_viewed: false,
    estimate_requested: false,
    deposit_started: false,
  });

  useEffect(() => {
    const handlePixelEvent = (e: Event) => {
      const customEvt = e as CustomEvent<PixelEventDetail>;
      if (!customEvt.detail) return;

      const { event, payload, timestamp } = customEvt.detail;

      setEvents((prev) => [
        {
          event,
          payload,
          timestamp,
        },
        ...prev.slice(0, 49), // retain last 50 events
      ]);

      setStatus((prev) => ({
        ...prev,
        [event]: true,
      }));
    };

    window.addEventListener("whop-pixel-fired", handlePixelEvent);
    return () => window.removeEventListener("whop-pixel-fired", handlePixelEvent);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm sm:max-w-md w-full font-mono text-xs shadow-2xl transition-all">
      {/* HUD Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-t-lg cursor-pointer hover:bg-slate-800 transition select-none text-white"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="w-3.5 h-3.5 text-summit-500" />
          <span className="font-semibold tracking-wide text-[11px] uppercase">
            Whop Pixel & API Telemetry (Live)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] border border-slate-700">
            {events.length} fired
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
        </div>
      </div>

      {/* Pill Status Grid (Always visible above expanded body) */}
      <div className="bg-slate-950/95 border-x border-slate-700/80 px-3.5 py-2 flex flex-wrap items-center gap-1.5 text-[10px]">
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
            status.service_viewed
              ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-300"
              : "bg-slate-900 border-slate-800 text-slate-500"
          }`}
        >
          {status.service_viewed ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> : <span className="w-2 h-2 rounded-full bg-slate-700" />}
          <span>service_viewed</span>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
            status.estimate_requested
              ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-300"
              : "bg-slate-900 border-slate-800 text-slate-500"
          }`}
        >
          {status.estimate_requested ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> : <span className="w-2 h-2 rounded-full bg-slate-700" />}
          <span>estimate_requested</span>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
            status.deposit_started
              ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-300"
              : "bg-slate-900 border-slate-800 text-slate-500"
          }`}
        >
          {status.deposit_started ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> : <span className="w-2 h-2 rounded-full bg-slate-700" />}
          <span>deposit_started</span>
        </div>
      </div>

      {/* Expanded Telemetry Stream */}
      {isOpen && (
        <div className="bg-slate-950 border border-slate-700/80 rounded-b-lg p-3 max-h-64 overflow-y-auto space-y-2 text-slate-300">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-slate-500" />
              Real-time window.whop.track inspector
            </span>
            <button
              onClick={() => setEvents([])}
              className="text-slate-500 hover:text-slate-300 transition"
            >
              Clear Log
            </button>
          </div>

          {events.length === 0 ? (
            <div className="py-4 text-center text-slate-500 text-[11px] italic">
              Awaiting user interactions... Click any service, request an estimate, or launch checkout to see verifiable Whop pixel telemetry.
            </div>
          ) : (
            events.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded p-2 border border-slate-800 text-[10.5px]">
                <div className="flex items-center justify-between text-slate-400 text-[9.5px] pb-1 mb-1 border-b border-slate-800/80">
                  <span className="font-bold text-summit-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    whop.track('{item.event}')
                  </span>
                  <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                </div>
                <pre className="text-emerald-400/90 whitespace-pre-wrap break-all leading-relaxed text-[10px] overflow-x-auto">
                  {JSON.stringify(item.payload, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
