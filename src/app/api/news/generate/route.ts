import { NextResponse, NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fetchCoinGeckoData = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': process.env.COIN_GECKO_TOKEN || '',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch coins data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch CoinGecko data:', error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const coins = await fetchCoinGeckoData();

  const prompt = `
    Generate a structured JSON object for a crypto news update for ${new Date().toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    )}. The JSON should have a "sections" array, where each section contains:
    - "headline": A short title summarizing the section.
    - "body": A detailed explanation of the section.

    Use the following data:
    ${coins
      .map(
        (coin) =>
          `${coin.name}: $${coin.current_price}, ${coin.price_change_percentage_24h}%`
      )
      .join('\n') || 'No market data available'}

    Include the following sections:
    1. Market trends
    2. Price movements
    3. Notable events
    4. Predictions for the next 24 hours

    Example JSON format:
    {
      "sections": [
        {
          "headline": "Market Trends Overview",
          "body": "Detailed explanation of market trends..."
        },
        {
          "headline": "Price Movements",
          "body": "Detailed explanation of price movements..."
        }
      ]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const newsText = response.choices[0].message.content.trim();

    const blob = await put(
      'kk/news/latest.json',
      JSON.stringify({ content: newsText, date: new Date().toISOString() }),
      {
        access: 'public',
        contentType: 'application/json',
        token: process.env.VERCEL_BLOB_TOKEN,
      }
    );

    return NextResponse.json(
      { message: 'News generated and stored', url: blob.url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate news', details: error.message },
      { status: 500 }
    );
  }
}