import { Suspense } from "react";

import Hero from "@/components/Hero";
import WatchListCoins from "@/components/user/WatchListCoins";

const Watchlist = () => {
  return (
    <article>
      <Hero title="Watchlist" description="Page description" />
      <Suspense>
        <WatchListCoins />
      </Suspense>
    </article>
  );
};

export default Watchlist;
