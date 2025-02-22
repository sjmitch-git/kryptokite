import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = req.nextUrl.pathname.split("/").pop();
  const vs_currency = searchParams.get("vs_currency") || "usd";
  const days = searchParams.get("days") || "1";

  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`,
      {
        headers: {
          "x-cg-demo-api-key": COIN_GECKO_TOKEN,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch historical data:", error);
    return NextResponse.json(
      { error: `Failed to fetch historical data for coin with id ${id}` },
      { status: 500 }
    );
  }
}
