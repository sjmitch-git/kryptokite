import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://api.coingecko.com/api/v3/search/trending";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from CoinGecko: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch trending search data:", error);
    return NextResponse.json({ error: "Failed to fetch trending search data" }, { status: 500 });
  }
}
