"use client";

import React, { useState } from "react";
import { siteConfig, WhopPlanConfig } from "@/config/site";
import { EmergencyBar } from "@/components/EmergencyBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { RoofCalculator } from "@/components/RoofCalculator";
import { FinancingBanner } from "@/components/FinancingBanner";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { EstimateForm } from "@/components/EstimateForm";
import { ContractorInvoicePortal } from "@/components/ContractorInvoicePortal";
import { WhopCheckoutModal } from "@/components/WhopCheckoutModal";
import { PixelTelemetryHUD } from "@/components/PixelTelemetryHUD";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WhopPlanConfig>(siteConfig.plans.deposit);
  const [calculatorEstimate, setCalculatorEstimate] = useState<number>(12000);
  const [checkoutMetadata, setCheckoutMetadata] = useState<Record<string, any>>({});

  const handleOpenDeposit = (plan?: WhopPlanConfig) => {
    setSelectedPlan(plan || siteConfig.plans.deposit);
    setIsCheckoutOpen(true);
  };

  const handleCalculatorDeposit = (totalEstimate: number, metadata: Record<string, any>) => {
    setSelectedPlan(siteConfig.plans.deposit);
    setCalculatorEstimate(totalEstimate);
    setCheckoutMetadata(metadata);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-summit-600 selection:text-white">
      {/* 1. Top Emergency Storm Alert Bar */}
      <EmergencyBar />

      {/* 2. Sticky Navbar */}
      <Navbar onOpenDeposit={() => handleOpenDeposit(siteConfig.plans.deposit)} />

      <main className="flex-grow">
        {/* 3. Hero Section */}
        <Hero onSelectDeposit={(plan) => handleOpenDeposit(plan)} />

        {/* 4. Services & 3 Official Whop Plans Section */}
        <ServicesSection onSelectPlan={(plan) => handleOpenDeposit(plan)} />

        {/* 5. Standout Feature: Interactive Roof Pitch & BNPL Financing Calculator */}
        <RoofCalculator onSelectDeposit={handleCalculatorDeposit} />

        {/* 6. Prominent Whop BNPL Financing Banner */}
        <FinancingBanner />

        {/* 7. Service Area & Live Hail/Wind ZIP Validator */}
        <ServiceAreaSection />

        {/* 8. Verified Reviews & Before/After Project Transformation */}
        <ReviewsSection />

        {/* 9. Standout Feature: Contractor Final Invoice Lifecycle Console */}
        <ContractorInvoicePortal />

        {/* 10. Request an Estimate Form (Whop Leads API) */}
        <EstimateForm />
      </main>

      {/* 11. Footer & Sticky Mobile Bottom CTA Bar */}
      <Footer onOpenDeposit={() => handleOpenDeposit(siteConfig.plans.deposit)} />

      {/* 12. Strict Whop Payment Elements Checkout Modal */}
      <WhopCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        plan={selectedPlan}
        customEstimatedTotal={calculatorEstimate}
        customMetadata={checkoutMetadata}
      />

      {/* 13. Standout Feature: Whop Pixel & API Telemetry HUD */}
      <PixelTelemetryHUD />
    </div>
  );
}
