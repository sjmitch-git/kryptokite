import { useUser } from "@/lib/contexts/UserContext";
import { Coin } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import CoinThumb from "@/components/ui/CoinThumb";
import WatchlistToggle from "@/components/ui/WatchlistToggle";

type CoinItemProps = {
  coin: Coin;
};

const CoinItem = ({ coin }: CoinItemProps) => {
  const { preferredCurrency } = useUser();

  return (
    <li className="grid grid-cols-4 md:grid-cols-2 justify-between items-center space-x-2 md:space-x-8 shadow p-2 md:p-4 text-xl border border-neutral-200 bg-white">
      <div className="flex justify-between items-center space-x-4 max-sm:col-span-3 ">
        <div className="flex flex-row items-center md:space-x-4">
          <CoinThumb src={coin.image.large} alt={coin.name} size={64} className="max-sm:hidden" />
          <div className="flex flex-col gap-4 font-semibold">
            {coin.name}

            <sup className="font-mono font-normal">{coin.symbol.toUpperCase()}</sup>
          </div>
        </div>
        <div className="font-semibold text-right">
          {formatNumber(coin.market_data.current_price[preferredCurrency])}{" "}
          <span className="uppercase font-normal">{preferredCurrency}</span>
        </div>
      </div>
      <div className="flex items-center justify-between md:space-x-4 font-semibold">
        {coin.market_data.price_change_percentage_24h > 0 ? (
          <span className="text-green-500 flex flex-row items-center">
            <FaCaretUp size={"3rem"} title="24h price change %" />
            <span className="max-sm:hidden">
              {coin.market_data.price_change_percentage_24h.toFixed(4)}
            </span>
            <span className="font-normal max-sm:hidden">%</span>
          </span>
        ) : (
          <span className="text-red-500 flex flex-row items-center">
            <FaCaretDown size={"3rem"} title="24h price change %" />
            {coin.market_data.price_change_percentage_24h.toFixed(4)}
          </span>
        )}
        <WatchlistToggle id={coin.id} name={coin.name} symbol={coin.symbol} />
      </div>
    </li>
  );
};

export default CoinItem;
