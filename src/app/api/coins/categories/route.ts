import { NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET() {
  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }
  try {
    const response = await fetch(`${COINGECKO_API_URL}/coins/categories/list`, {
      headers: {
        "x-cg-demo-api-key": COIN_GECKO_TOKEN,
      },
    });
    const data = await response.json();
    const res = NextResponse.json(data, { status: 200 });
    res.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=59");

    return res;
  } catch (error) {
    console.error("Failed to fetch categories list:", error);
    return NextResponse.json({ error: "Failed to fetch categories list" }, { status: 500 });
  }
}
