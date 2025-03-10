import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();

  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }

  const fetchUrl = `${COINGECKO_API_URL}/coins/${id}?developer_data=false&tickers=false&market_data=true&community_data=false&localization=false&sparkline=true`;

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        "x-cg-demo-api-key": COIN_GECKO_TOKEN,
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch coin data:", error);
    return NextResponse.json(
      { error: `Failed to fetch price for coin with id ${id}` },
      { status: 500 }
    );
  }
}
