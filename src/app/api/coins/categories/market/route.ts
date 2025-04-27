import { NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET() {
  const fetchUrl = `${COINGECKO_API_URL}/coins/categories`;

  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        "x-cg-demo-api-key": COIN_GECKO_TOKEN,
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch categories data:", error);
    return NextResponse.json({ error: `Failed to fetch data for categories` }, { status: 500 });
  }
}
