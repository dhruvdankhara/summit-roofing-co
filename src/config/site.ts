export interface WhopPlanConfig {
  id: string;
  name: string;
  price: number;
  badge: string;
  description: string;
  features: string[];
  requiresSetupIntent: boolean;
  depositAmount?: number;
  finalBalanceNotice?: string;
  ctaText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  turnaround: string;
  warranty: string;
  associatedPlanId: string;
  iconName: string;
}

export interface MaterialTier {
  id: string;
  name: string;
  pricePerSqFt: number;
  lifespanYears: number;
  windRatingMph: number;
  impactRating: string;
  description: string;
  popular?: boolean;
}

export interface PitchMultiplier {
  id: string;
  label: string;
  slope: string;
  multiplier: number;
  description: string;
}

export interface ZipCodeRecord {
  zip: string;
  city: string;
  state: string;
  activeCrew: boolean;
  recentStormDate?: string;
  hailSizeInches?: number;
  stormRestorationQualified: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  projectType: string;
  totalCost: number;
  financedWithWhop: boolean;
  financingOption?: string;
  comment: string;
  verifiedHomeowner: boolean;
}

export const siteConfig = {
  company: {
    name: "Summit Roofing Co.",
    legalName: "Summit Roofing Company LLC",
    tagline: "Built for the Peaks. Backed by Ironclad Warranties.",
    licenseNumber: "SUMMIT-CO-88412",
    liabilityInsurance: "$2,000,000 Commercial General Liability & Full Workers' Comp",
    phone: "(303) 555-ROOF",
    emergencyPhone: "(303) 555-9111",
    email: "estimates@summit-roofing.com",
    headquarters: "1801 California St, Suite 2400, Denver, CO 80202",
    operatingHours: "Mon-Sat: 6:00 AM - 8:00 PM | 24/7 Emergency Storm Dispatch",
    liveSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://summit-roofing-co.whop.site",
    companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || "biz_fTh1Y0rz12hAZC",
  },

  branding: {
    colors: {
      slate900: "#0F172A",
      charcoal: "#1E293B",
      amberOrange: "#EA580C",
      alabaster: "#F8FAFC",
      emeraldTrust: "#10B981",
    },
    trustBadges: [
      { name: "GAF Master Elite® Certified", detail: "Top 2% of US Contractors" },
      { name: "Owens Corning Platinum Preferred", detail: "Lifetime Material Warranty" },
      { name: "A+ Better Business Bureau", detail: "Zero Unresolved Complaints" },
      { name: "Fully Bonded & Insured", detail: "$2M Liability Coverage" },
    ],
  },

  plans: {
    inspection: {
      id: process.env.NEXT_PUBLIC_WHOP_PLAN_INSPECTION || "plan_summit_inspection_149",
      name: "21-Point Drone & Thermal Roof Inspection",
      price: 149,
      badge: "100% Credited to Replacement",
      description: "High-resolution 4K aerial drone imagery paired with FLIR thermal moisture detection. Comprehensive municipal-grade report delivered in 24 hours.",
      features: [
        "4K Ultra-HD Drone Aerial Video & Orthomosaic Topo",
        "FLIR Thermal Infrared Decking Moisture Mapping",
        "Granule Loss & Hail Strike Impact Assessment",
        "Insurance Claim Photographic Evidence Dossier",
        "$149 Credited 100% toward any repair or replacement",
      ],
      requiresSetupIntent: false,
      ctaText: "Book $149 Drone Inspection",
    } as WhopPlanConfig,

    deposit: {
      id: process.env.NEXT_PUBLIC_WHOP_PLAN_DEPOSIT || "plan_summit_deposit_500",
      name: "Roof Replacement Project Deposit",
      price: 500,
      badge: "Lock Scheduling & Materials",
      description: "Lock in your crew installation date, current wholesale shingle pricing, and city permitting. Vaults payment method via Whop Setup Intent for milestone balance billing.",
      features: [
        "Guaranteed 7-Day Installation Crew Scheduling Slot",
        "Manufacturer Material Price Lock Guarantee",
        "City/County Permit Filing & HOA Architectural Approval",
        "Card Saved on File (Setup Intent) for Final Balance Billing",
        "Remaining Balance ($11,500+) Billed Only After Final Inspection",
      ],
      requiresSetupIntent: true,
      depositAmount: 500,
      finalBalanceNotice: "Remaining project balance billed via Whop Invoices API only after final municipal inspection sign-off.",
      ctaText: "Lock In $500 Project Deposit",
    } as WhopPlanConfig,

    flatRate: {
      id: process.env.NEXT_PUBLIC_WHOP_PLAN_FLAT_RATE || "plan_summit_tarp_399",
      name: "Emergency Storm Tarping & Leak Seal",
      price: 399,
      badge: "2-Hour Rapid Response Dispatch",
      description: "Immediate 24/7 emergency dispatch across the Front Range. Heavy-duty 10-mil waterproof poly tarping, perimeter sandbagging, and temporary puncture sealing.",
      features: [
        "Under 2-Hour Guaranteed Emergency Crew Arrival",
        "Commercial 10-Mil Heavyweight UV Poly Tarp Installation",
        "High-Tensile Furring Strip Perimeter Framing (No Roof Penetrations)",
        "Water Intrusion Mitigation Documentation for Adjuster",
        "24/7 Storm Response Dispatch Line Direct Access",
      ],
      requiresSetupIntent: false,
      ctaText: "Dispatch $399 Emergency Tarping",
    } as WhopPlanConfig,
  },

  services: [
    {
      id: "replacement",
      title: "Complete Roof Replacement",
      tagline: "Architectural & Impact-Resistant Roof Systems",
      description: "Engineered specifically to withstand Front Range 90+ mph downslope winds and baseball-sized hail. 50-year non-prorated system warranty backed by GAF and Owens Corning.",
      features: [
        "Tear-off to bare decking with rotten plywood replacement",
        "Synthetic ice & water shield in all valleys and eaves",
        "Class-4 impact-resistant architectural shingles",
        "Continuous ridge ventilation airflow optimization",
      ],
      turnaround: "1 - 2 Days Turnkey Build",
      warranty: "50-Year Non-Prorated Golden Pledge® Warranty",
      associatedPlanId: "plan_summit_deposit_500",
      iconName: "ShieldCheck",
    },
    {
      id: "repair",
      title: "Precision Roof Repair & Flashing",
      tagline: "Pipe Jacks, Chimney Saddles & Hail Patching",
      description: "Stop active water intrusion before structural rot destroys your rafters and ceiling drywall. Expert flashing replacements, storm puncture seals, and ridge vent restores.",
      features: [
        "Complete water-test diagnostic before sealing",
        "Heavy-gauge metal apron & step flashing fabrication",
        "Lead boot pipe flashing replacements",
        "Color-matched shingle weaving for seamless blend",
      ],
      turnaround: "Same-Day / Next-Day Service",
      warranty: "5-Year Workmanship Leak-Free Guarantee",
      associatedPlanId: "plan_summit_tarp_399",
      iconName: "Wrench",
    },
    {
      id: "inspection",
      title: "21-Point Drone & Thermal Inspection",
      tagline: "Insurance-Ready Forensic Structural Analysis",
      description: "Our certified drone pilots fly FAA-compliant automated grid patterns capturing sub-millimeter roof anomalies, followed by handheld FLIR thermal scans inside your attic.",
      features: [
        "4K high-res orthomosaic imagery for insurance adjuster proof",
        "Infrared thermal imaging to pinpoint sub-surface moisture",
        "Full attic ventilation and insulation assessment",
        "Itemized Xactimate® line-item replacement estimate",
      ],
      turnaround: "24-Hour Digital Report Delivery",
      warranty: "100% Fee Credited to Any Approved Work",
      associatedPlanId: "plan_summit_inspection_149",
      iconName: "Eye",
    },
  ] as ServiceItem[],

  calculator: {
    minSqFt: 1200,
    maxSqFt: 5500,
    defaultSqFt: 2400,
    depositAmount: 500,
    materials: [
      {
        id: "architectural",
        name: "Architectural Asphalt Shingles",
        pricePerSqFt: 4.85,
        lifespanYears: 30,
        windRatingMph: 110,
        impactRating: "Class 3",
        description: "Dimensional heavy-duty laminate shingles offering excellent weather protection and classic aesthetic.",
      },
      {
        id: "class4_impact",
        name: "Class-4 Impact-Resistant Shingles",
        pricePerSqFt: 6.40,
        lifespanYears: 40,
        windRatingMph: 130,
        impactRating: "Class 4 (Hail Shield)",
        description: "SBS-modified polymer asphalt that flexes on hail impact. Qualifies for up to 25% annual homeowner insurance discounts in Colorado.",
        popular: true,
      },
      {
        id: "standing_seam",
        name: "Standing Seam 24-Ga Metal",
        pricePerSqFt: 9.75,
        lifespanYears: 65,
        windRatingMph: 150,
        impactRating: "Class 4 Ultimate",
        description: "Concealed fastener architectural steel with Kynar 500 finish. Highest snow shedding, fire resistance, and lifetime durability.",
      },
      {
        id: "spanish_tile",
        name: "Spanish Concrete / Clay Tile",
        pricePerSqFt: 13.50,
        lifespanYears: 75,
        windRatingMph: 125,
        impactRating: "Class 4 Structural",
        description: "Timeless Southwestern luxury offering maximum thermal mass insulation and permanent rot/fire invulnerability.",
      },
    ] as MaterialTier[],

    pitches: [
      {
        id: "low",
        label: "Low Pitch",
        slope: "4/12 to 6/12",
        multiplier: 1.0,
        description: "Standard walkable ranch and contemporary roofs.",
      },
      {
        id: "medium",
        label: "Medium Pitch",
        slope: "7/12 to 9/12",
        multiplier: 1.15,
        description: "Classic two-story suburban and craftsman architecture.",
      },
      {
        id: "steep",
        label: "Steep Mountain Pitch",
        slope: "10/12+",
        multiplier: 1.35,
        description: "High-angle alpine chalets requiring specialized harness rigging.",
      },
    ] as PitchMultiplier[],

    financingPlans: [
      { months: 12, apr: 0, label: "0% APR Same-as-Cash (12 Mos)" },
      { months: 36, apr: 7.99, label: "36 Months Low Fixed Rate" },
      { months: 60, apr: 9.99, label: "60 Months Extended Flexibility" },
    ],
  },

  serviceAreaZipCodes: [
    { zip: "80202", city: "Denver", state: "CO", activeCrew: true, recentStormDate: "July 18, 2026", hailSizeInches: 1.75, stormRestorationQualified: true },
    { zip: "80203", city: "Denver", state: "CO", activeCrew: true, recentStormDate: "July 18, 2026", hailSizeInches: 1.5, stormRestorationQualified: true },
    { zip: "80206", city: "Cherry Creek", state: "CO", activeCrew: true, recentStormDate: "August 4, 2026", hailSizeInches: 2.0, stormRestorationQualified: true },
    { zip: "80209", city: "Washington Park", state: "CO", activeCrew: true, recentStormDate: "August 4, 2026", hailSizeInches: 1.75, stormRestorationQualified: true },
    { zip: "80220", city: "Denver East", state: "CO", activeCrew: true, recentStormDate: "June 22, 2026", hailSizeInches: 1.25, stormRestorationQualified: false },
    { zip: "80301", city: "Boulder", state: "CO", activeCrew: true, recentStormDate: "September 2, 2026", hailSizeInches: 2.25, stormRestorationQualified: true },
    { zip: "80302", city: "Boulder", state: "CO", activeCrew: true, recentStormDate: "September 2, 2026", hailSizeInches: 2.25, stormRestorationQualified: true },
    { zip: "80014", city: "Aurora", state: "CO", activeCrew: true, recentStormDate: "June 14, 2026", hailSizeInches: 1.5, stormRestorationQualified: true },
    { zip: "80111", city: "Greenwood Village", state: "CO", activeCrew: true, recentStormDate: "July 29, 2026", hailSizeInches: 1.75, stormRestorationQualified: true },
    { zip: "80120", city: "Littleton", state: "CO", activeCrew: true, recentStormDate: "August 12, 2026", hailSizeInches: 1.25, stormRestorationQualified: false },
    { zip: "80124", city: "Lone Tree", state: "CO", activeCrew: true, recentStormDate: "August 12, 2026", hailSizeInches: 1.5, stormRestorationQualified: true },
    { zip: "80126", city: "Highlands Ranch", state: "CO", activeCrew: true, recentStormDate: "July 5, 2026", hailSizeInches: 2.5, stormRestorationQualified: true },
    { zip: "80134", city: "Parker", state: "CO", activeCrew: true, recentStormDate: "July 5, 2026", hailSizeInches: 2.25, stormRestorationQualified: true },
    { zip: "80020", city: "Broomfield", state: "CO", activeCrew: true, recentStormDate: "September 8, 2026", hailSizeInches: 1.75, stormRestorationQualified: true },
    { zip: "80027", city: "Louisville", state: "CO", activeCrew: true, recentStormDate: "September 8, 2026", hailSizeInches: 1.5, stormRestorationQualified: true },
    { zip: "80401", city: "Golden", state: "CO", activeCrew: true, recentStormDate: "August 20, 2026", hailSizeInches: 1.75, stormRestorationQualified: true },
    { zip: "80501", city: "Longmont", state: "CO", activeCrew: true, recentStormDate: "June 30, 2026", hailSizeInches: 1.25, stormRestorationQualified: false },
    { zip: "80525", city: "Fort Collins", state: "CO", activeCrew: true, recentStormDate: "August 16, 2026", hailSizeInches: 2.0, stormRestorationQualified: true },
  ] as ZipCodeRecord[],

  reviews: [
    {
      id: "rev_1",
      name: "Marcus & Sarah Sterling",
      city: "Highlands Ranch, CO",
      rating: 5,
      date: "October 2026",
      projectType: "Full Class-4 Impact Replacement",
      totalCost: 14200,
      financedWithWhop: true,
      financingOption: "Whop Splitit (0% APR)",
      comment: "Following the July hailstorm, Summit had a drone over our roof within 4 hours. We paid the $500 deposit right on our phone with Apple Pay. Crew finished the entire 3,100 sq ft roof in a single day, and the final invoice was charged automatically only after the Douglas County building inspector signed off.",
      verifiedHomeowner: true,
    },
    {
      id: "rev_2",
      name: "David K. Vance",
      city: "Boulder, CO",
      rating: 5,
      date: "September 2026",
      projectType: "Standing Seam Metal Roof Installation",
      totalCost: 22800,
      financedWithWhop: false,
      comment: "We wanted a permanent metal roof for our foothills home. The interactive calculator was accurate to within $300 of the final contract. Outstanding craftsmanship and zero debris left in our yard.",
      verifiedHomeowner: true,
    },
    {
      id: "rev_3",
      name: "Elena Rostova",
      city: "Cherry Creek, CO",
      rating: 5,
      date: "August 2026",
      projectType: "Emergency Storm Tarping & Repair",
      totalCost: 1650,
      financedWithWhop: true,
      financingOption: "Whop Klarna Pay-in-4",
      comment: "A microburst tore 15 shingles off our roof at 8 PM. Dispatched the $399 emergency service through Whop, and two roofers were securing commercial tarps by 9:40 PM. Saved our master bedroom hardwood from catastrophic water damage.",
      verifiedHomeowner: true,
    },
  ] as CustomerReview[],
};
