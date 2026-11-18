import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, totalProjectCost, customerEmail, customerName, metadata } = body;

    const selectedPlan =
      Object.values(siteConfig.plans).find((p) => p.id === planId) ||
      siteConfig.plans.deposit;

    const isDeposit = selectedPlan.id === siteConfig.plans.deposit.id || selectedPlan.requiresSetupIntent;
    const depositAmount = selectedPlan.price;
    const estimatedTotal = Number(totalProjectCost) || 12000;
    const remainingBalance = Math.max(0, estimatedTotal - depositAmount);

    const sessionId = `cs_summit_${Math.random().toString(36).substring(2, 10)}`;
    const setupIntentId = isDeposit
      ? `seti_summit_${Math.random().toString(36).substring(2, 10)}`
      : null;

    const sessionData = {
      sessionId,
      clientSecret: `wcs_${sessionId}_secret_${Math.random().toString(36).substring(2, 8)}`,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      amountDueToday: depositAmount,
      totalEstimatedProjectCost: estimatedTotal,
      remainingFinalBalance: remainingBalance,
      setupFutureUsage: isDeposit ? "off_session" : null,
      setupIntentId,
      customer: {
        email: customerEmail || "homeowner@example.com",
        name: customerName || "Front Range Homeowner",
      },
      metadata: {
        ...metadata,
        company: siteConfig.company.name,
        license: siteConfig.company.licenseNumber,
        contractorFlow: isDeposit ? "deposit_with_card_vault" : "flat_service",
      },
    };

    return NextResponse.json({
      success: true,
      session: sessionData,
    });
  } catch (err: any) {
    console.error("[API Checkout Session Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error creating checkout session." },
      { status: 500 }
    );
  }
}
