import Link from "next/link";

import { CoinDetails as Coin, currencySymbols } from "@/lib/types";
import CoinThumb from "@/components/ui/CoinThumb";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/lib/fluid";
import { FaTrash, FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";

type WatchListItemProps = {
  coin: Coin;
  openDialog: (id: string) => void;
  preferredCurrency: string;
};

const WatchListItem = ({ coin, openDialog, preferredCurrency = "usd" }: WatchListItemProps) => {
  const symbol = currencySymbols[preferredCurrency] || "$";

  return (
    <li className="flex justify-between items-center text-lg md:text-xl space-x-2 md:space-x-8 shadow p-2 md:p-4 border border-neutral-200 bg-white">
      <div className="flex justify-between items-center space-x-2 md:space-x-4">
        <div className="text-left min-w-12 max-sm:hidden">#{coin.market_cap_rank || "N/A"}</div>
        <CoinThumb src={coin.image} alt={coin.name} size={64} className="max-sm:!-ml-1" />
        <div>
          <p className="font-semibold">
            <Link
              href={{
                pathname: `/coins/${coin.id}`,
              }}
              title="See more details about this coin"
              className="text-primary hover:underline"
            >
              {coin.name}
            </Link>
          </p>
          <p className="text-base text-gray-500">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 md:space-x-8 font-semibold">
        <div className="flex flex-col md:flex-row md:gap-4 items-end md:items-center">
          <p className="font-semibold text-base md:text-lg whitespace-nowrap">
            {symbol} {formatNumber(coin.current_price)}
          </p>
          <p
            className={`flex space-x-2 text-base ${
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
        </div>
        <div className="text-right">
          <Button
            suppressHydrationWarning={true}
            onClick={() => openDialog(coin.id)}
            className="p-0"
            title="Delete coin?"
            btnBackground="transparent"
            btnColor="warning"
          >
            <FaTrash size="28" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default WatchListItem;
