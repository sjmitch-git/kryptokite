import { NextRequest, NextResponse } from "next/server";
import { truncateText } from "@/lib/utils";
import { twitterClient } from "@/lib/services/twitter.service";

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
    return NextResponse.json({ success: true, thread });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error posting thread:", error);
    return NextResponse.json(
      { error: "Failed to post thread", details: errorMessage },
      { status: 500 }
    );
  }
}
