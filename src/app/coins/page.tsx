import type { Metadata } from "next";
import { Suspense } from "react";

import Hero from "@/components/Hero";
import CoinsList from "@/components/coins/CoinsList";

const title = "Browse Coins";
const description =
  "Explore a comprehensive list of cryptocurrencies. Click on any coin to get detailed information including current prices, market caps, trading volumes, and price changes. Stay informed with the latest data and trends in the crypto market.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function CoinsPage() {
  return (
    <article>
      <Hero title={title} description={description} />
      <Suspense>
        <CoinsList />
      </Suspense>
    </article>
  );
}
