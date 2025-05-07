import Link from "next/link";
import { TrendingCoin as Coin } from "@/lib/types";
import { FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import CoinThumb from "@/components/ui/CoinThumb";
import WatchlistToggle from "@/components/ui/WatchlistToggle";
import { formatNumber } from "@/lib/utils";

interface TrendingItemProps {
  coin: Coin;
}

const TrendingCoin = ({ coin }: TrendingItemProps) => {
  const symbol = "$";

  return (
    <li className="flex justify-between items-center text-lg md:text-xl space-x-2 md:space-x-8 shadow p-2 md:p-4 border border-neutral-200 bg-white">
      <div className="flex justify-between items-center space-x-2 md:space-x-4">
        <div className="w-12 text-right max-sm:hidden">#{coin.item.market_cap_rank || "N/A"}</div>
        <CoinThumb src={coin.item.thumb} alt={coin.item.name} size={64} className="max-sm:hidden" />
        <div className="max-sm:!-ml-1">
          <p className="font-semibold">
            <Link
              href={{
                pathname: `/coins/${coin.item.id}`,
              }}
              title="See more details about this coin"
              className="text-primary hover:underline"
            >
              {coin.item.name}
            </Link>
          </p>
          <p className="text-base text-gray-500">{coin.item.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 md:space-x-8 font-semibold">
        <div className="flex flex-col md:flex-row md:gap-4 items-end md:items-center">
          <p className="font-semibold text-base md:text-lg whitespace-nowrap">
            {symbol} {formatNumber(coin.item.data.price)}
          </p>
          <p
            className={`flex space-x-2 text-base ${
              coin.item.data.price_change_percentage_24h.usd >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {coin.item.data.price_change_percentage_24h.usd >= 0 ? (
              <FaCaretUp
                size={"1.5rem"}
                title="24h price change %"
                className={`${coin.item.data.price_change_percentage_24h.usd === 0 && "rotate-90"}`}
              />
            ) : (
              <FaCaretDown size={"1.5rem"} title="24h price change %" />
            )}
            {coin.item.data.price_change_percentage_24h.usd?.toFixed(2)}%
          </p>
        </div>
        <WatchlistToggle id={coin.item.id} name={coin.item.name} symbol={coin.item.symbol} />
      </div>
    </li>
  );
};

export default TrendingCoin;
