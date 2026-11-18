import { NextRequest, NextResponse } from "next/server";
import { createFinalInvoice } from "@/lib/whop";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      mode = "auto_charge",
      amount = 11500,
      customerEmail = "m.sterling@example.com",
      customerName = "Marcus Sterling",
      paymentMethodId = "pm_summit_vaulted_4242",
      setupIntentId = "seti_summit_deposit_500_vault",
      jobDescription = "Final Balance: Full Roof Replacement (Class-4 Impact Architectural, 3,100 sq ft) following passed Douglas County municipal inspection sign-off.",
      projectAddress = "8422 Highlands Ranch Pkwy, Highlands Ranch, CO 80126",
    } = body;

    const invoice = await createFinalInvoice({
      mode,
      amount: Number(amount),
      customerEmail,
      customerName,
      paymentMethodId,
      setupIntentId,
      jobDescription,
      projectAddress,
    });

    return NextResponse.json({
      success: true,
      invoice,
      mode,
      message:
        mode === "auto_charge"
          ? `Vaulted card (${paymentMethodId}) charged successfully for $${Number(amount).toLocaleString()} USD.`
          : `Itemized Whop Invoice sent to ${customerEmail} with 1-click BNPL financing options.`,
    });
  } catch (err: any) {
    console.error("[API Invoices Final Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error processing final invoice." },
      { status: 500 }
    );
  }
}
