"use client";

import Link from "next/link";
import { CategoryCoin as Coin, currencySymbols } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import CoinThumb from "@/components/ui/CoinThumb";
import WatchlistToggle from "@/components/ui/WatchlistToggle";

type CoinItemProps = {
  coin: Coin;
  preferredCurrency: string;
};

const CategoryCoinItem = ({ coin, preferredCurrency }: CoinItemProps) => {
  const symbol = currencySymbols[preferredCurrency] || "$";

  return (
    <li className="flex justify-between items-center text-lg md:text-xl space-x-2 md:space-x-8 shadow p-2 md:p-4 border border-neutral-200 bg-white">
      <div className="flex justify-between items-center space-x-2 md:space-x-4">
        <div className="text-left min-w-12 max-sm:hidden">#{coin.market_cap_rank || "N/A"}</div>
        <CoinThumb src={coin.image} alt={coin.name} size={64} className="max-sm:!-ml-1" />
        <div>
          <Link
            href={{
              pathname: `/coins/${coin.id}`,
            }}
            title="See more details about this coin"
            className="text-primary hover:underline font-semibold text-lg md:text-xl"
          >
            {coin.name}
          </Link>
          <p className="text-base font-mono text-gray-500">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 md:space-x-8 font-semibold">
        <div className="flex flex-col md:flex-row md:gap-4 items-end md:items-center">
          <p className="font-semibold text-base md:text-lg whitespace-nowrap">
            {symbol} {formatNumber(coin.current_price)}
          </p>
          {coin.price_change_percentage_24h ? (
            <p
              className={`flex justify-between space-x-2 text-base min-w-20 ${
                coin.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {coin.price_change_percentage_24h >= 0 ? (
                <FaCaretUp
                  size={"1.5rem"}
                  title="24h price change %"
                  className={`${coin.price_change_percentage_24h === 0 && "rotate-90"}`}
                />
              ) : (
                <FaCaretDown size={"1.5rem"} title="24h price change %" />
              )}
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
          ) : (
            <p className="text-base text-right min-w-20 text-gray-500">N/A</p>
          )}
        </div>
        <div className="text-right">
          <WatchlistToggle id={coin.id} name={coin.name} symbol={coin.symbol} />
        </div>
      </div>
    </li>
  );
};

export default CategoryCoinItem;
