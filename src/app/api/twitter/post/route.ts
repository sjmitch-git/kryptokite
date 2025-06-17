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

    console.log("Tweet response:", JSON.stringify(tweet, null, 2));

    return NextResponse.json({
      success: true,
      tweet: {
        id: tweet.data.id,
        text: tweet.data.text,
      },
    });
  } catch (error: unknown) {
    console.error("Raw error:", JSON.stringify(error, null, 2));

    if (error instanceof ApiResponseError) {
      const errorData = error.data as unknown;
      if (typeof errorData === "string" && errorData.includes("<!DOCTYPE")) {
        return NextResponse.json(
          {
            error: "Invalid API response",
            details: "Received HTML instead of JSON, likely rate limit exceeded",
          },
          { status: error.code || 429 }
        );
      }

      if (error.rateLimitError && error.rateLimit) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            details: error.message,
            rateLimit: {
              limit: error.rateLimit.limit,
              remaining: error.rateLimit.remaining,
              reset: error.rateLimit.reset,
              resetDate: error.rateLimit.reset
                ? new Date(error.rateLimit.reset * 1000).toISOString()
                : null,
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

      return NextResponse.json(
        { error: "Failed to post tweet", details: error.message },
        { status: error.code || 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to post tweet", details: errorMessage },
      { status: 500 }
    );
  }
}
