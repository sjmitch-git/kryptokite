import { Metadata } from "next";
import { Coin } from "@/lib/types";
import { extractFirstSentence } from "@/lib/utils";
import CoinDetail from "@/components/coins/CoinDetail";
import { Alert } from "@/lib/fluid";
import Hero from "@/components/Hero";

type Props = {
  params: Promise<{ id: string }>;
};

const fetchCoinData = async (id: string): Promise<Coin> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coins/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch price for coin with id ${id}`);
  }
  const coin: Coin = await response.json();
  return coin;
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const { id } = await params;

  try {
    const coin = await fetchCoinData(id);

    const title = `${coin.name} - ${coin.categories[0] || "Cryptocurrency"}`;
    const description = coin.description.en
      ? extractFirstSentence(coin.description.en)
      : coin.categories.join(", ");
    return {
      title: title,
      description: description,
      keywords: [coin.categories.join(","), coin.name],
      openGraph: {
        title: title,
        description: description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_API_URL}coins/${coin.id}`,
        images: [
          {
            url: coin.image.large,
            alt: `${coin.name} logo`,
            width: 250,
            height: 250,
          },
        ],
      },
    };
  } catch (err: unknown) {
    console.log("Error fetching coin data for metadata:", err);
    return null;
  }
}

const CoinPage = async ({ params }: Props) => {
  const { id } = await params;

  let coin: Coin | null = null;
  let error: string | null = null;
  let jsonLd: Record<string, unknown> | null = null;

  try {
    coin = await fetchCoinData(id);

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: coin.name,
      description: extractFirstSentence(coin.description.en),
      url: `${process.env.NEXT_PUBLIC_API_URL}coins/${coin.id}`,
      image: coin.image.large,
      brand: {
        "@type": "Brand",
        name: coin.name,
        logo: coin.image.large,
      },
      offers: {
        "@type": "Offer",
        price: coin.market_data.current_price.usd,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${process.env.NEXT_PUBLIC_API_URL}coins/${coin.id}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.min(
          Math.max(
            ((coin.sentiment_votes_up_percentage - coin.sentiment_votes_down_percentage) / 100) * 5,
            0
          ),
          5
        ).toFixed(1),
        bestRating: 5,
        worstRating: 0,
        reviewCount: coin.watchlist_portfolio_users,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }
  }

  if (error) {
    return <Alert status="error" message={error} />;
  }

  if (!coin) {
    return <Alert status="error" message="Coin not found" />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        title={coin.name}
        description={`${extractFirstSentence(coin.description.en)}`}
        imgSrc={coin.image.large}
      />

      <CoinDetail coin={coin} />
    </>
  );
};

export default CoinPage;
