"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const CurrencyButton = dynamic(() => import("./user/CurrencyButton"), { ssr: false });
const SearchCoins = dynamic(() => import("./coins/SearchCoins"), { ssr: false });

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <CurrencyButton />
      <SearchCoins />
    </div>
  );
}
