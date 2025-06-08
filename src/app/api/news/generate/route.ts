import { NextResponse, NextRequest } from "next/server";
import { put } from "@vercel/blob";
import OpenAI from "openai";
import { postThread } from "@/lib/services/twitter.service";

const isDebugMode = process.env.NODE_ENV === "development";

interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  ath: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "My API Key",
});

const fetchCoinGeckoData = async (): Promise<Coin[]> => {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100";
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
  if (!isDebugMode) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const coins = await fetchCoinGeckoData();

  if (
    !Array.isArray(coins) ||
    coins.some((coin) => !coin.id || !coin.name || !coin.current_price || !coin.ath)
  ) {
    return NextResponse.json({ error: "Invalid coin data" }, { status: 400 });
  }

  const prompt = `
  Generate a structured JSON object for a crypto news update for ${new Date().toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )}. The JSON should have a "sections" array, where each section contains:
  - "headline": A short, engaging title summarizing the section.
  - "body": A detailed, well-written explanation of the section, 120-150 words, in a professional yet engaging tone aimed at crypto investors and enthusiasts. Reference at least 2-3 coins from the provided data per section, prioritizing those with significant 24h price changes (>5% or <-5%). Wrap coin names in HTML <span> tags with a class matching their ID (e.g., <span class='bitcoin'>Bitcoin</span>).

  Include 3-5 sections covering diverse topics like market trends, major coin movements, and emerging crypto news.

  Use the following data:
  ${
    coins
      .map(
        (coin: Coin) =>
          `${coin.id}: ${coin.name}: $${coin.current_price}, ${coin.price_change_percentage_24h}% (24h change), ${coin.ath}% (all time highest price)`
      )
      .join("\n") ||
    "If no market data is available, generate sections based on general crypto market trends or recent news."
  }

  Example JSON format:
  {
    "sections": [
     {
        "headline": "Crypto Rally Ignites!",
        "body": "<span class='bitcoin'>Bitcoin</span> surges 3.4% to $103,043, <span class='ethereum'>Ethereum</span> jumps 24.64% to $2,415.32. Meme coins <span class='shiba-inu'>Shiba Inu</span> +10.87%, <span class='dogecoin'>Dogecoin</span> +13.03%. DeFi tokens <span class='aave'>Aave</span> (+15.14%) & <span class='uniswap'>Uniswap</span> (+24.53%) soar, while <span class='solana'>Solana</span (+8.95%) hits $166.68 & <span class='ripple'>XRP</span> rebounds 7.13% to $2.36."
      },
      {
        "headline": "Solana Keeps Climbing",
        "body": "<span class='solana'>Solana</span> gained 8.95% today, hitting $166.68! Despite being 35.9% below its ATH of $259.96 (Nov 2021), its speed and scalability—powering 50,000+ TPS—make it a top contender in blockchain tech. Investors are optimistic about its future, especially with the upcoming Solana Breakpoint conference in Lisbon."
      }
    ]
  }
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.9,
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
    } catch (parseError: unknown) {
      console.log("Error", parseError);
      throw new Error("Failed to parse OpenAI response as JSON");
    }

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      throw new Error("No sections found in OpenAI response");
    }

    try {
      const threadContent = sections.map((section: { headline: string; body: string }) => {
        const { headline, body } = section;
        const cleanHeadline = headline.replace(/<[^>]+>/g, "");
        const cleanBody = body.replace(/<[^>]+>/g, "");
        return `${cleanHeadline}: ${cleanBody}`;
      });
      await postThread(threadContent);
    } catch (threadError) {
      console.error("Non-fatal thread error:", threadError);
    }

    const [newsBlob, marketBlob] = await Promise.all([
      put(
        "kk/news/latest.json",
        JSON.stringify({ content: newsText, date: new Date().toISOString() }),
        {
          access: "public",
          contentType: "application/json",
          token: process.env.VERCEL_BLOB_TOKEN,
          addRandomSuffix: false,
        }
      ),
      put("kk/market/latest.json", JSON.stringify({ coins, date: new Date().toISOString() }), {
        access: "public",
        contentType: "application/json",
        token: process.env.VERCEL_BLOB_TOKEN,
        addRandomSuffix: false,
      }),
    ]);

    return NextResponse.json(
      {
        message: "News and market data generated and stored",
        newsUrl: newsBlob.url,
        marketUrl: marketBlob.url,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error generating news or market data:", error);
    return NextResponse.json(
      { error: "Failed to generate news or market data", details: errorMessage },
      { status: 500 }
    );
  }
}
