"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { FaCoins, FaStar } from "react-icons/fa";

const CurrencySelector = dynamic(() => import("./user/CurrencySelector"), { ssr: false });
const SearchCoins = dynamic(() => import("./coins/SearchCoins"), { ssr: false });

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <nav className="flex gap-2 md:gap-4">
        <Link
          href="/coins"
          title="coins"
          tabIndex={pathname === "/coins" ? -1 : 0}
          className={`rounded-md text-light p-2 flex gap-2 items-center ${
            pathname === "/coins" ? "bg-primary cursor-none" : "bg-dark hover:underline"
          } focus-visible:outline-accent`}
        >
          <FaCoins /> <span className="hidden md:inline-block">Coins</span>
        </Link>
        <Link
          href="/watchlist"
          title="Watchlist"
          tabIndex={pathname === "/watchlist" ? -1 : 0}
          className={`rounded-md text-light p-2 flex gap-2 items-center ${
            pathname === "/watchlist" ? "bg-primary cursor-none" : "bg-dark hover:underline"
          } focus-visible:outline-accent`}
        >
          <FaStar /> <span className="hidden md:inline-block">Watchlist</span>
        </Link>
      </nav>
      <CurrencySelector />
      <SearchCoins />
    </div>
  );
}
