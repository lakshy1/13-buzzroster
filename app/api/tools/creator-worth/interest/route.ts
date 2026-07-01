import { NextResponse } from "next/server";

type InterestPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  creatorCategory?: string;
  message?: string;
  report?: Record<string, unknown>;
};

type ReportData = {
  platform?: string;
  handle?: string;
  profileUrl?: string;
  fetchedAt?: string;
  dataSource?: string;
  confidence?: number;
  estimate?: {
    perCollabMin?: number;
    perCollabMax?: number;
    monthlyMin?: number;
    monthlyMax?: number;
    annualMin?: number;
    annualMax?: number;
  };
  scores?: {
    creatorScore?: number;
    audienceQuality?: number;
    engagementStrength?: number;
    brandFit?: number;
    inviteReadiness?: number;
    consistency?: number;
    growthMomentum?: number;
  };
  opportunities?: unknown[];
  brandMatches?: unknown[];
  limitations?: unknown[];
};

function requiredString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

async function saveToSupabase(payload: {
  fullName: string;
  email: string;
  phone: string;
  creatorCategory: string;
  message: string;
  report: Record<string, unknown>;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  const report = payload.report as ReportData;
  const insertBody = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    creator_category: payload.creatorCategory,
    message: payload.message,
    platform: report.platform ?? null,
    handle: report.handle ?? null,
    profile_url: report.profileUrl ?? null,
    fetched_at: report.fetchedAt ?? null,
    data_source: report.dataSource ?? null,
    confidence_score: report.confidence ?? null,
    estimated_min: report.estimate?.perCollabMin ?? null,
    estimated_max: report.estimate?.perCollabMax ?? null,
    monthly_min: report.estimate?.monthlyMin ?? null,
    monthly_max: report.estimate?.monthlyMax ?? null,
    annual_min: report.estimate?.annualMin ?? null,
    annual_max: report.estimate?.annualMax ?? null,
    creator_score: report.scores?.creatorScore ?? null,
    audience_quality_score: report.scores?.audienceQuality ?? null,
    engagement_strength_score: report.scores?.engagementStrength ?? null,
    brand_fit_score: report.scores?.brandFit ?? null,
    invite_readiness_score: report.scores?.inviteReadiness ?? null,
    consistency_score: report.scores?.consistency ?? null,
    growth_momentum_score: report.scores?.growthMomentum ?? null,
    opportunities_json: report.opportunities ?? [],
    brand_matches_json: report.brandMatches ?? [],
    limitations_json: report.limitations ?? [],
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/creator_interest_leads`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(insertBody),
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed with status ${response.status}`);
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InterestPayload;
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const creatorCategory = body.creatorCategory?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (
      !requiredString(fullName) ||
      !requiredString(email) ||
      !requiredString(phone) ||
      !requiredString(creatorCategory) ||
      !requiredString(message) ||
      !body.report ||
      typeof body.report !== "object"
    ) {
      return NextResponse.json(
        { code: "INVALID_PAYLOAD", message: "Missing lead fields." },
        { status: 400 },
      );
    }

    await saveToSupabase({
      fullName,
      email,
      phone,
      creatorCategory,
      message,
      report: body.report,
    });

    return NextResponse.json({
      code: "OK",
      message: "Interest submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        code: "SUBMISSION_FAILED",
        message: "We could not save your enquiry right now.",
      },
      { status: 500 },
    );
  }
}
