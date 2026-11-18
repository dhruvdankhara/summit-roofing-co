import { NextRequest, NextResponse } from "next/server";
import { submitWhopLead } from "@/lib/whop";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      address,
      zipCode,
      serviceNeeded,
      estimatedSqFt,
      preferredFinancing,
    } = body;

    if (!name || !email || !phone || !zipCode) {
      return NextResponse.json(
        { error: "Missing required contact details (name, email, phone, and ZIP are required)." },
        { status: 400 }
      );
    }

    const lead = await submitWhopLead({
      name,
      email,
      phone,
      address: address || "Not specified",
      zipCode,
      serviceNeeded: serviceNeeded || "Full Roof Replacement",
      estimatedSqFt: Number(estimatedSqFt) || 2400,
      preferredFinancing: preferredFinancing || "None / Cash",
    });

    return NextResponse.json({
      success: true,
      lead,
      message: "Lead successfully recorded in Whop CRM.",
    });
  } catch (err: any) {
    console.error("[API Leads Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error submitting lead." },
      { status: 500 }
    );
  }
}
