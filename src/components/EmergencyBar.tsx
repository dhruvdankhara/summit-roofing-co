"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { AlertTriangle, Phone, ShieldCheck } from "lucide-react";

export function EmergencyBar() {
  return (
    <div className="bg-summit-600 text-white text-xs py-2 px-4 select-none relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-amber-200" />
          <span>
            <strong>Front Range Severe Weather Alert:</strong> Rapid crew dispatch active for recent hail damage in Denver, Boulder & Highlands Ranch.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="hidden md:inline text-amber-100">
            License #{siteConfig.company.licenseNumber}
          </span>
          <a
            href={`tel:${siteConfig.company.emergencyPhone.replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 font-bold hover:underline bg-summit-700 px-2.5 py-0.5 rounded-full"
          >
            <Phone className="w-3 h-3" />
            <span>24/7 Storm Hotline: {siteConfig.company.emergencyPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
