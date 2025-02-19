import { Coin } from "@/lib/types";
import { Alert } from "@/lib/fluid";
import Hero from "@/components/Hero";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

const CoinDetailPage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { vs_currency, name } = await searchParams;

  let coin: Coin | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/coins/${id}?vs_currency=${vs_currency}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch price for coin with id ${id}`);
    }

    const data = await response.json();
    coin = data[id];
    console.log(data);
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
      <Hero title={name} description="Page description" />
      <p>
        Current Price: {coin[vs_currency]} {vs_currency.toUpperCase()}
      </p>
      <p>Market Cap: {coin[`${vs_currency}_market_cap`]}</p>
      <p>24h Volume: {coin[`${vs_currency}_24h_vol`]}</p>
      <p>24h Change: {coin[`${vs_currency}_24h_change`]}%</p>
      <p>
        Last Updated:{" "}
        {typeof coin.last_updated_at === "number"
          ? new Date(coin.last_updated_at * 1000).toLocaleString()
          : "N/A"}
      </p>
    </article>
  );
};

export default CoinDetailPage;
