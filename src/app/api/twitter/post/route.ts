import { NextRequest, NextResponse } from "next/server";
import { truncateText } from "@/lib/utils";
import { twitterClient } from "@/lib/services/twitter.service";
import { ApiResponseError } from "twitter-api-v2";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  try {
    const tweet = await twitterClient.v2.tweet(truncateText(text, 280));
    return NextResponse.json({ success: true, tweet });
  } catch (error: unknown) {
    if (error instanceof ApiResponseError && error.rateLimitError && error.rateLimit) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          details: error.message,
          rateLimit: {
            limit: error.rateLimit.limit,
            reset: error.rateLimit.reset,
          },
        },
        {
          status: error.code,
          headers: {
            "x-rate-limit-limit": error.rateLimit.limit?.toString() || "",
            "x-rate-limit-reset": error.rateLimit.reset?.toString() || "",
          },
        }
      );
    }
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error posting tweet:", error);
    return NextResponse.json(
      { error: "Failed to post tweet", details: errorMessage },
      { status: 500 }
    );
  }
}
