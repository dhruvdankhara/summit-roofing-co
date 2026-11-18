"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Shield, Menu, X, Phone, Terminal, ChevronRight, Calculator } from "lucide-react";

interface NavbarProps {
  onOpenDeposit: () => void;
}

export function Navbar({ onOpenDeposit }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-summit-500 to-amber-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-none">
                {siteConfig.company.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                whop.site/summit-roofing-co
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#services" className="hover:text-summit-400 transition">
              Services
            </a>
            <a href="#calculator" className="hover:text-summit-400 transition flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-summit-500" />
              <span>Roof Calculator</span>
            </a>
            <a href="#service-area" className="hover:text-summit-400 transition">
              Service Area
            </a>
            <a href="#financing" className="hover:text-summit-400 transition">
              Financing
            </a>
            <a href="#reviews" className="hover:text-summit-400 transition">
              Reviews
            </a>
            <a href="#estimate" className="hover:text-summit-400 transition">
              Contact
            </a>
            <a
              href="#contractor-portal"
              className="bg-slate-900 border border-slate-700 hover:border-summit-500 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1.5 text-[11px] font-mono"
            >
              <Terminal className="w-3 h-3 text-summit-500" />
              <span>Contractor Invoice Demo</span>
            </a>
          </nav>

          {/* CTA & Phone */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.company.phone.replace(/\D/g, "")}`}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-summit-500" />
              <span>{siteConfig.company.phone}</span>
            </a>

            <button
              type="button"
              onClick={onOpenDeposit}
              className="bg-summit-600 hover:bg-summit-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-md flex items-center gap-1"
            >
              <span>$500 Deposit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3 text-xs">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white"
          >
            Services & 3 Whop Plans
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white"
          >
            Interactive Roof Calculator
          </a>
          <a
            href="#service-area"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white"
          >
            Service Area & Hail Radar
          </a>
          <a
            href="#financing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white"
          >
            Whop BNPL Financing
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white"
          >
            Before & After Reviews
          </a>
          <a
            href="#contractor-portal"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-summit-400 font-mono font-bold"
          >
            Contractor Invoices Demo
          </a>
          <a
            href="#estimate"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white"
          >
            Request Free Estimate
          </a>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeposit();
              }}
              className="w-full bg-summit-600 hover:bg-summit-500 text-white font-bold py-2.5 rounded-xl text-xs text-center"
            >
              Lock In $500 Project Deposit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
