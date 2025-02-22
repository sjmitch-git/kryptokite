import { Suspense } from "react";

import Hero from "@/components/Hero";
import CoinsList from "@/components/coins/CoinsList";

export default function Coins() {
  return (
    <article>
      <Hero title="Coins" description="Page description" />
      <Suspense>
        <CoinsList />
      </Suspense>
    </article>
  );
}
