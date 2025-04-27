import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = req.nextUrl.pathname.split("/").pop();
  const vs_currency = searchParams.get("vs_currency") || "usd";
  const fetchUrl = `${COINGECKO_API_URL}/coins//markets?vs_currency=${vs_currency}&category=${id}&per_page=250`;

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
    console.error("Failed to fetch category id data:", error);
    return NextResponse.json(
      { error: `Failed to fetch data for category with id ${id}` },
      { status: 500 }
    );
  }
}
