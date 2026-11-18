"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Shield, Phone, Mail, MapPin, ChevronRight, Lock } from "lucide-react";

interface FooterProps {
  onOpenDeposit: () => void;
}

export function Footer({ onOpenDeposit }: FooterProps) {
  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-800 text-white pt-16 pb-24 lg:pb-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-summit-600 flex items-center justify-center text-white">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-white">
                  {siteConfig.company.name}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {siteConfig.company.tagline} Colorado&apos;s premier GAF Master Elite® contractor for extreme weather architectural roofing and rapid storm restoration.
              </p>
              <div className="text-[11px] font-mono text-slate-500">
                CO License #{siteConfig.company.licenseNumber}
              </div>
            </div>

            {/* Col 2: Rapid Service Navigation */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Roofing Services
              </div>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><a href="#services" className="hover:text-summit-400 transition">Complete Roof Replacement</a></li>
                <li><a href="#services" className="hover:text-summit-400 transition">21-Point Drone & Thermal Inspection ($149)</a></li>
                <li><a href="#services" className="hover:text-summit-400 transition">Emergency 2-Hour Storm Tarping ($399)</a></li>
                <li><a href="#calculator" className="hover:text-summit-400 transition">Interactive Roof & Financing Calculator</a></li>
                <li><a href="#contractor-portal" className="hover:text-summit-400 transition">Whop Invoices API Demo Console</a></li>
              </ul>
            </div>

            {/* Col 3: Service Areas */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Colorado Service Area
              </div>
              <p className="text-slate-400 text-xs">
                Denver Metro, Highlands Ranch, Boulder, Cherry Creek, Littleton, Aurora, Golden, Broomfield, Parker, and Longmont.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Storm restoration crews active daily</span>
              </div>
            </div>

            {/* Col 4: Payments & Guarantee */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Whop Commerce Protected
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                All transactions protected by Whop PCI Level 1 checkout with Setup Intent card vaulting for balance milestones.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Apple Pay</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Google Pay</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Klarna</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Splitit</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Affirm</span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
            <div>
              © 2026 {siteConfig.company.legalName}. All rights reserved. Deployed to {siteConfig.company.liveSiteUrl}.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                256-bit TLS Encrypted
              </span>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom CTA Bar (Required by Blueprint) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.company.phone.replace(/\D/g, "")}`}
            className="flex-1 bg-slate-900 border border-slate-700 text-white font-bold py-2.5 rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-summit-500" />
            <span>Call 24/7</span>
          </a>

          <button
            type="button"
            onClick={onOpenDeposit}
            className="flex-1 bg-summit-600 hover:bg-summit-500 text-white font-extrabold py-2.5 rounded-xl text-center text-xs flex items-center justify-center gap-1 shadow-md"
          >
            <span>$500 Deposit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
