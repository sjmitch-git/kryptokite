"use client";

import dynamic from "next/dynamic";

const CurrencyButton = dynamic(() => import("./user/CurrencyButton"), { ssr: false });
const SearchCoins = dynamic(() => import("./coins/SearchCoins"), { ssr: false });
const WatchlistNavigation = dynamic(() => import("./ui/WatchlistNavigation"), { ssr: false });

export default function Nav() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <WatchlistNavigation />
      <SearchCoins />
      <CurrencyButton />
    </div>
  );
}
