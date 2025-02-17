import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_API_URL, COIN_GECKO_TOKEN } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = req.nextUrl.pathname.split("/").pop();
  const vs_currency = searchParams.get("vs_currency") || "usd";
  const include_market_cap = searchParams.get("include_market_cap") || "false";
  const include_24hr_vol = searchParams.get("include_24hr_vol") || "false";
  const include_24hr_change = searchParams.get("include_24hr_change") || "false";
  const include_last_updated_at = searchParams.get("include_last_updated_at") || "false";

  if (!COIN_GECKO_TOKEN) {
    return NextResponse.json({ error: "CoinGecko API token is missing" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/simple/price?ids=${id}&vs_currencies=${vs_currency}&include_market_cap=${include_market_cap}&include_24hr_vol=${include_24hr_vol}&include_24hr_change=${include_24hr_change}&include_last_updated_at=${include_last_updated_at}`,
      {
        headers: {
          "x-cg-demo-api-key": COIN_GECKO_TOKEN,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch price for coin with id ${id}` },
      { status: 500 }
    );
  }
}
