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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const coin = await fetchCoinData(id);

  return {
    title: `${coin.name} - cryptocurrency details`,
    description: extractFirstSentence(coin.description.en),
    openGraph: {
      title: `${coin.name} - cryptocurrency details`,
      description: extractFirstSentence(coin.description.en),
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
}

const CoinPage = async ({ params }: Props) => {
  const { id } = await params;

  let coin: Coin | null = null;
  let error: string | null = null;

  try {
    coin = await fetchCoinData(id);
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
    <article>
      <Hero
        title={coin.name}
        description={`${extractFirstSentence(coin.description.en)}`}
        imgSrc={coin.image.large}
      />

      <CoinDetail coin={coin} />
    </article>
  );
};

export default CoinPage;
