import { NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET() {
  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }

  try {
    const response = await fetch(`${COINGECKO_API_URL}/simple/supported_vs_currencies`, {
      headers: {
        "x-cg-demo-api-key": COIN_GECKO_TOKEN,
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch supported currencies:", error);
    return NextResponse.json({ error: "Failed to fetch supported currencies" }, { status: 500 });
  }
}
