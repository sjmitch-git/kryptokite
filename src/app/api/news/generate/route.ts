import { NextResponse, NextRequest } from "next/server";
import { put, head, del } from "@vercel/blob";
import OpenAI from "openai";
import { postThread } from "@/lib/services/twitter.service";

interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "My API Key",
});

const fetchCoinGeckoData = async (): Promise<Coin[]> => {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COIN_GECKO_TOKEN || "",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch coins data: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Coin[];
  } catch (error) {
    console.error("Failed to fetch CoinGecko data:", error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const coins = await fetchCoinGeckoData();

  const prompt = `
    Generate a structured JSON object for a crypto news update for ${new Date().toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}. The JSON should have a "sections" array, where each section contains:
    - "headline": A short title summarizing the section.
    - "body": A detailed, well-written explanation of the section, approximately 100-150 words. When mentioning coins from the provided data, wrap their names in HTML <span> tags with a class matching their ID (e.g., <span class='bitcoin'>Bitcoin</span>).

    Use the following data:
    ${
      coins
        .map(
          (coin: Coin) =>
            `${coin.id}: ${coin.name}: $${coin.current_price}, ${coin.price_change_percentage_24h}% (24h change)`
        )
        .join("\n") || "No market data available"
    }

    Example JSON format:
    {
      "sections": [
        {
          "headline": "Overview",
          "body": "The market is buzzing as <span class='bitcoin'>Bitcoin</span> leads the charge..."
        },
        {
          "headline": "Price Movements",
          "body": "<span class='ethereum'>Ethereum</span> saw a sharp 5% increase today..."
        }
      ]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    if (
      !response.choices ||
      response.choices.length === 0 ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    ) {
      throw new Error("Invalid OpenAI response: No content found");
    }

    const newsText = response.choices[0].message.content.trim();

    let sections;
    try {
      sections = JSON.parse(newsText).sections;
    } catch (parseError) {
      throw new Error("Failed to parse OpenAI response as JSON");
    }

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      throw new Error("No sections found in OpenAI response");
    }

    try {
      const threadContent = sections.map((section: { headline: string; body: string }) => {
        const { headline, body } = section;
        const cleanBody = body.replace(/<[^>]+>/g, "");
        return `${headline}: ${cleanBody}`;
      });
      await postThread(threadContent);
    } catch (threadError) {
      console.error("Non-fatal thread error:", threadError);
    }

    const path = "kk/news/latest.json";
    const existingBlob = await head(path, { token: process.env.VERCEL_BLOB_TOKEN });

    if (existingBlob) {
      await del(path, { token: process.env.VERCEL_BLOB_TOKEN });
    }

    const blob = await put(
      path,
      JSON.stringify({ content: newsText, date: new Date().toISOString() }),
      {
        access: "public",
        contentType: "application/json",
        token: process.env.VERCEL_BLOB_TOKEN,
        addRandomSuffix: false,
      }
    );

    return NextResponse.json(
      { message: "News generated and stored", url: blob.url },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error generating news:", error);
    return NextResponse.json(
      { error: "Failed to generate news", details: errorMessage },
      { status: 500 }
    );
  }
}
