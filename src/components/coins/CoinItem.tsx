import { useUser } from "@/lib/contexts/UserContext";
import { Coin, currencySymbols } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import CoinThumb from "@/components/ui/CoinThumb";
import WatchlistToggle from "@/components/ui/WatchlistToggle";

type CoinItemProps = {
  coin: Coin;
};

const CoinItem = ({ coin }: CoinItemProps) => {
  const { preferredCurrency } = useUser();
  const symbol = currencySymbols[preferredCurrency] || "$";

  return (
    <li className="flex justify-between items-center text-lg md:text-xl space-x-2 md:space-x-8 shadow p-2 md:p-4 border border-neutral-200 bg-white">
      <div className="flex justify-between items-center space-x-2 md:space-x-4">
        <div className="text-left min-w-12 max-sm:hidden">#{coin.market_cap_rank || "N/A"}</div>
        <CoinThumb src={coin.image.large} alt={coin.name} size={64} className="max-sm:hidden" />
        <div className="max-sm:!-ml-1">
          <p className="font-semibold">{coin.name}</p>
          <p className="text-base text-gray-500">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 md:space-x-8 font-semibold">
        <div className="flex flex-col md:flex-row md:gap-4 items-end md:items-center">
          <p className="font-semibold text-base md:text-lg whitespace-nowrap">
            {symbol} {formatNumber(coin.market_data.current_price[preferredCurrency])}
          </p>
          <p
            className={`flex space-x-2 text-base ${
              coin.market_data.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {coin.market_data.price_change_percentage_24h >= 0 ? (
              <FaCaretUp
                size={"1.5rem"}
                title="24h price change %"
                className={`${coin.market_data.price_change_percentage_24h === 0 && "rotate-90"}`}
              />
            ) : (
              <FaCaretDown size={"1.5rem"} title="24h price change %" />
            )}
            {coin.market_data.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
        <div className="text-right">
          <WatchlistToggle id={coin.id} name={coin.name} symbol={coin.symbol} />
        </div>
      </div>
    </li>
  );
};

export default CoinItem;
