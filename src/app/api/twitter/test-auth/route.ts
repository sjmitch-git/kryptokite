import { NextResponse } from "next/server";
import { twitterClient } from "@/lib/services/twitter.service";
import { ApiResponseError } from "twitter-api-v2";

export async function GET() {
  try {
    const userResponse = await twitterClient.v2.me();

    console.log("User response:", JSON.stringify(userResponse.data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: userResponse.data.id,
        username: userResponse.data.username,
        name: userResponse.data.name,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Twitter API error:", JSON.stringify(error, null, 2));

    if (error instanceof ApiResponseError) {
      console.error("API error code:", error.code);
      console.error("API error data:", JSON.stringify(error.data, null, 2));

      const errorData = error.data as unknown;
      if (typeof errorData === "string" && errorData.includes("<!DOCTYPE")) {
        return NextResponse.json(
          {
            error: "Invalid API response",
            details: "Received HTML instead of JSON, likely invalid credentials",
          },
          { status: error.code || 500 }
        );
      }

      return NextResponse.json(
        { error: "Authentication failed", details: error.message },
        { status: error.code || 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to test authentication", details: errorMessage },
      { status: 500 }
    );
  }
}
