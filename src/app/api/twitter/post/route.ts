import { NextRequest, NextResponse } from "next/server";
import { truncateText } from "@/lib/utils";
import { twitterClient } from "@/lib/services/twitter.service";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  try {
    const tweet = await twitterClient.v2.tweet(truncateText(text, 280));
    return NextResponse.json({ success: true, tweet });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error posting tweet:", error);
    return NextResponse.json(
      { error: "Failed to post tweet", details: errorMessage },
      { status: 500 }
    );
  }
}
