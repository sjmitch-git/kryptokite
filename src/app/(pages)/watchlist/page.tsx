import type { Metadata } from "next";
import { Suspense } from "react";

import Hero from "@/components/Hero";
import WatchListCoins from "@/components/user/WatchListCoins";

const title = "Watchlist";
const description =
  "Keep track of your favourite cryptocurrencies in one place. View real-time data on prices, market caps, trading volumes, and price changes. Stay updated with the latest trends and make informed decisions about your investments.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

const Watchlist = () => {
  return (
    <>
      <Hero title={title} description={description} />
      <Suspense>
        <WatchListCoins />
      </Suspense>
    </>
  );
};

export default Watchlist;
