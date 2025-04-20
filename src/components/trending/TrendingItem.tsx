import Link from "next/link";
import { SimpleCoin, TrendingCoin } from "@/lib/types";
import { FaCaretDown, FaCaretUp, FaPlusCircle, FaCheckCircle } from "@/components/ui/CustomIcons";
import CoinThumb from "@/components/ui/CoinThumb";
import { Button } from "@/lib/fluid";
import WatchlistToggle from "@/components/ui/WatchlistToggle";

interface TrendingItemProps {
  coin: TrendingCoin;
}

const TrendingItem = ({ coin }: TrendingItemProps) => {
  return (
    <li className="grid grid-cols-2 justify-between items-center max-sm:space-y-1 md:space-x-2 shadow p-2 md:p-4 text-lg md:text-xl border border-neutral-200 bg-white">
      <div className="flex flex-row items-center md:space-x-4">
        <div className="w-12 text-right max-sm:hidden">#{coin.item.market_cap_rank || "N/A"}</div>
        <CoinThumb src={coin.item.thumb} alt={coin.item.name} size={64} />
        <div className="flex flex-col gap-4 max-sm:ml-4">
          <Link
            href={{
              pathname: `/coins/${coin.item.id}`,
            }}
            title="See more dtails about this coin"
            className="text-primary hover:underline font-semibold"
          >
            {coin.item.name}
          </Link>{" "}
          <sup className="font-mono">{coin.item.symbol.toUpperCase()}</sup>
        </div>
      </div>
      <div className="flex items-center justify-between md:space-x-4">
        {coin.item.data.price_change_percentage_24h.usd > 0 ? (
          <span className="text-green-500 flex flex-row items-center">
            <FaCaretUp size={"3rem"} title="24h price change %" />{" "}
            {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
          </span>
        ) : (
          <span className="text-red-500 flex flex-row items-center">
            <FaCaretDown size={"3rem"} title="24h price change %" />{" "}
            {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
          </span>
        )}
        <img
          className="bg-white max-sm:hidden"
          src={coin.item.data.sparkline}
          alt={`${coin.item.name} sparkline`}
          title="Price change over the last 7d"
          width={135}
          height={50}
        />
        <WatchlistToggle id={coin.item.id} name={coin.item.name} symbol={coin.item.symbol} />
      </div>
    </li>
  );
};

export default TrendingItem;
