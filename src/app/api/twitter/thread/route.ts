import { NextRequest, NextResponse } from "next/server";
import { truncateText } from "@/lib/utils";
import { twitterClient } from "@/lib/services/twitter.service";
import { ApiResponseError } from "twitter-api-v2";

export async function POST(request: NextRequest) {
  const { texts } = await request.json();

  if (
    !texts ||
    !Array.isArray(texts) ||
    texts.length === 0 ||
    texts.some((text: string) => !text)
  ) {
    return NextResponse.json(
      { error: "Texts must be a non-empty array of non-empty strings" },
      { status: 400 }
    );
  }

  try {
    const thread = await twitterClient.v2.tweetThread(
      texts.map((text: string) => truncateText(text, 280))
    );

    console.log("Thread response:", JSON.stringify(thread, null, 2));

    return NextResponse.json({
      success: true,
      thread: thread.map((tweet) => ({
        id: tweet.data.id,
        text: tweet.data.text,
      })),
    });
  } catch (error: unknown) {
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
        { error: "Failed to post thread", details: error.message },
        { status: error.code || 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to post thread", details: errorMessage },
      { status: 500 }
    );
  }
}
