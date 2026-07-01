import { NextResponse } from "next/server";
import {
  buildCreatorWorthResult,
  extractProfileContext,
} from "@/app/tools/creator-worth-calculator/analysis";

const requestDelayMs = 1200;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };
    const url = body.url?.trim() ?? "";

    if (!url) {
      return NextResponse.json(
        { code: "INVALID_URL", message: "Please provide a profile URL." },
        { status: 400 },
      );
    }

    const context = extractProfileContext(url);
    if (!context?.platform) {
      return NextResponse.json(
        {
          code: "UNSUPPORTED_PLATFORM",
          message: "Only Instagram and YouTube profile URLs are supported.",
        },
        { status: 422 },
      );
    }

    if (!context.handle) {
      return NextResponse.json(
        {
          code: "INSUFFICIENT_DATA",
          message:
            "We could not detect a creator profile handle from the provided URL.",
        },
        { status: 422 },
      );
    }

    await delay(requestDelayMs);

    const result = buildCreatorWorthResult({
      platform: context.platform,
      handle: context.handle,
      profileUrl: context.profileUrl,
    });

    return NextResponse.json({
      code: "OK",
      result,
    });
  } catch {
    return NextResponse.json(
      {
        code: "ANALYSIS_FAILED",
        message: "We could not process that profile right now.",
      },
      { status: 500 },
    );
  }
}
