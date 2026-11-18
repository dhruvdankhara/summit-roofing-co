"use client";

import React, { useState } from "react";
import { siteConfig, WhopPlanConfig, ServiceItem } from "@/config/site";
import { trackWhopEvent } from "@/lib/tracking";
import { ShieldCheck, Wrench, Eye, Clock, Check, ChevronRight, Sparkles, AlertTriangle, Shield, CheckCircle } from "lucide-react";

interface ServicesSectionProps {
  onSelectPlan: (plan: WhopPlanConfig) => void;
}

export function ServicesSection({ onSelectPlan }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("replacement");

  const handleTabChange = (serviceId: string) => {
    setActiveTab(serviceId);
    const service = siteConfig.services.find((s) => s.id === serviceId);

    // Firing service_viewed per blueprint
    trackWhopEvent("service_viewed", {
      service_id: serviceId,
      service_title: service?.title,
      view_mode: "tab_switch",
    });
  };

  const handlePlanClick = (plan: WhopPlanConfig) => {
    trackWhopEvent("deposit_started", {
      plan_id: plan.id,
      plan_name: plan.name,
      price: plan.price,
      source: "services_plan_card",
    });
    onSelectPlan(plan);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-summit-500" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-summit-500" />;
      case "Eye":
        return <Eye className="w-5 h-5 text-summit-500" />;
      default:
        return <Shield className="w-5 h-5 text-summit-500" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-summit-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Colorado Extremes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Architectural Roofing Services & Whop Plans
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            High-specification roofing systems backed by 50-year manufacturer non-prorated warranties and seamless Whop checkout.
          </p>
        </div>

        {/* Service Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full">
            {siteConfig.services.map((service) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleTabChange(service.id)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                    isActive
                      ? "bg-summit-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {getServiceIcon(service.iconName)}
                  <span className="hidden sm:inline">{service.title}</span>
                  <span className="sm:hidden">{service.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Service Deep Dive Card */}
        {(() => {
          const currentService = siteConfig.services.find((s) => s.id === activeTab) || siteConfig.services[0];
          return (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-16 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-block text-xs font-mono font-bold text-summit-400 uppercase tracking-widest">
                    {currentService.tagline}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{currentService.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentService.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {currentService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Clock className="w-3.5 h-3.5 text-summit-500" />
                      <span>Turnaround: {currentService.turnaround}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentService.warranty}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                  <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                    Associated Whop Plan
                  </div>
                  <div className="text-xl font-bold text-white">
                    {currentService.id === "replacement" && "Full Project Deposit ($500)"}
                    {currentService.id === "repair" && "Emergency Tarping ($399)"}
                    {currentService.id === "inspection" && "Drone Inspection ($149)"}
                  </div>
                  <p className="text-xs text-slate-400">
                    {currentService.id === "replacement" && "Locks wholesale shingle pricing & schedule date. Setup Intent stores card for milestone completion."}
                    {currentService.id === "repair" && "Under 2-hour Front Range storm dispatch with commercial 10-mil poly tarping."}
                    {currentService.id === "inspection" && "4K aerial ortho imagery + FLIR thermal scan. 100% credited to full replacement."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentService.id === "replacement") handlePlanClick(siteConfig.plans.deposit);
                      else if (currentService.id === "repair") handlePlanClick(siteConfig.plans.flatRate);
                      else handlePlanClick(siteConfig.plans.inspection);
                    }}
                    className="w-full bg-summit-600 hover:bg-summit-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Whop Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 3 Required Whop Plans Grid (Mandatory Blueprint Requirement) */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The 3 Official Whop Plans
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select any plan to launch the official Whop Payment Elements modal with built-in Apple Pay, Google Pay, and BNPL financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan 1: $149 Inspection */}
            <div
              onClick={() => {
                trackWhopEvent("service_viewed", { plan: "inspection", price: 149 });
              }}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition relative"
            >
              <div>
                <span className="inline-block bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 mb-3">
                  {siteConfig.plans.inspection.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{siteConfig.plans.inspection.name}</h4>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-extrabold text-white">${siteConfig.plans.inspection.price}</span>
                  <span className="text-xs text-slate-400 font-mono">one-time fee</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{siteConfig.plans.inspection.description}</p>
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  {siteConfig.plans.inspection.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handlePlanClick(siteConfig.plans.inspection)}
                className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>{siteConfig.plans.inspection.ctaText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Plan 2: $500 Deposit (Featured) */}
            <div
              onClick={() => {
                trackWhopEvent("service_viewed", { plan: "deposit", price: 500 });
              }}
              className="bg-slate-900 border-2 border-summit-500 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-summit-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider font-mono">
                Card on File (Setup Intent)
              </div>
              <div>
                <span className="inline-block bg-summit-950 text-summit-400 text-[10px] font-mono px-2 py-0.5 rounded border border-summit-800 mb-3">
                  {siteConfig.plans.deposit.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{siteConfig.plans.deposit.name}</h4>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-extrabold text-white">${siteConfig.plans.deposit.price}</span>
                  <span className="text-xs text-slate-400 font-mono">project deposit</span>
                </div>
                <p className="text-xs text-slate-300 mb-4">{siteConfig.plans.deposit.description}</p>
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  {siteConfig.plans.deposit.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-summit-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handlePlanClick(siteConfig.plans.deposit)}
                className="mt-6 w-full bg-summit-600 hover:bg-summit-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                <span>{siteConfig.plans.deposit.ctaText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Plan 3: $399 Flat-Rate Tarping */}
            <div
              onClick={() => {
                trackWhopEvent("service_viewed", { plan: "flat_rate", price: 399 });
              }}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition relative"
            >
              <div>
                <span className="inline-block bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 mb-3">
                  {siteConfig.plans.flatRate.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{siteConfig.plans.flatRate.name}</h4>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-extrabold text-white">${siteConfig.plans.flatRate.price}</span>
                  <span className="text-xs text-slate-400 font-mono">flat rate</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{siteConfig.plans.flatRate.description}</p>
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  {siteConfig.plans.flatRate.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handlePlanClick(siteConfig.plans.flatRate)}
                className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>{siteConfig.plans.flatRate.ctaText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
