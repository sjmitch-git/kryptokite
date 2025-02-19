import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vs_currency = searchParams.get("vs_currency") || "usd";
  const order = searchParams.get("order") || "volume_desc";
  const per_page = searchParams.get("per_page") || "100";
  const page = searchParams.get("page") || "1";
  const sparkline = searchParams.get("sparkline") || "false";

  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=${sparkline}`,
      {
        headers: {
          "x-cg-demo-api-key": COIN_GECKO_TOKEN,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch coins market data", error);
    return NextResponse.json({ error: "Failed to fetch coins market data" }, { status: 500 });
  }
}
