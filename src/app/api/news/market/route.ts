import { NextResponse } from "next/server";
import { BLOB_MARKET_URL } from "@/lib/constants";

export async function GET() {
  if (!BLOB_MARKET_URL) {
    return NextResponse.json({ error: "BLOB_MARKET_URL is not defined" }, { status: 500 });
  }

  try {
    const response = await fetch(BLOB_MARKET_URL);
    if (!response.ok) {
      console.log("Failed to fetch data from BLOB_MARKET_URL");
      throw new Error("Failed to fetch data from BLOB_MARKET_URL");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching data:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
