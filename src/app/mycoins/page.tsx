import { Suspense } from "react";

import Hero from "@/components/Hero";
import MyCoinsList from "@/components/coins/MyCoinsList";

const MyCoins = () => {
  return (
    <article>
      <Hero title="My Coins" description="Page description" />
      <Suspense>
        <MyCoinsList />
      </Suspense>
    </article>
  );
};

export default MyCoins;
