"use client";

import { Coin } from "@/lib/types";
import CoinThumb from "@/components/ui/CoinThumb";
import { useUser } from "@/lib/contexts/UserContext";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { formatNumber } from "@/lib/utils";

type Props = {
  coin: Coin;
};

const CoinSummary = ({ coin }: Props) => {
  const { addUserCoin, removeUserCoin, isCoinInCollection, preferredCurrency } = useUser();

  const handleToggleCoin = (coin: Coin) => {
    if (isCoinInCollection(coin.id)) {
      removeUserCoin(coin.id);
    } else {
      addUserCoin(coin);
    }
  };

  return (
    <div className="overflow-x-auto mb-8 px-2 lg:px-0">
      <table className="table w-full text-lg">
        <thead>
          <tr className="font-semibold">
            <th>Rank</th>
            <th className="hidden md:table-cell"></th>
            <th></th>
            <th className="text-center">Price</th>
            {coin.market_data.price_change_percentage_24h && (
              <th
                className={`text-center whitespace-nowrap ${
                  coin.market_data.price_change_percentage_24h < 0 ? "text-error" : "text-success"
                }`}
              >
                24h %
              </th>
            )}
            {coin.market_data.price_change_percentage_7d !== 0 && (
              <th
                className={`text-center whitespace-nowrap ${
                  coin.market_data.price_change_percentage_7d < 0 ? "text-error" : "text-success"
                }`}
              >
                7d %
              </th>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white shadow">
            <td className="text-center">#{coin.market_cap_rank || "N/A"}</td>
            <td className="hidden md:table-cell text-center">
              <CoinThumb src={coin.image.small} alt={coin.name} size={64} className="w-16 h-auto" />
            </td>
            <td className="text-left text-xl font-semibold whitespace-nowrap">
              <span>{coin.name}</span>{" "}
              <sup className="font-normal font-mono block mt-4">{coin.symbol.toUpperCase()}</sup>
            </td>
            <td className="text-center font-semibold">
              {formatNumber(coin.market_data.current_price[preferredCurrency])}
            </td>
            {coin.market_data.price_change_percentage_24h && (
              <td className="text-center">
                {coin.market_data.price_change_percentage_24h.toFixed(4)}
              </td>
            )}
            {coin.market_data.price_change_percentage_7d !== 0 && (
              <td className="text-center">
                {coin.market_data.price_change_percentage_7d.toFixed(4)}
              </td>
            )}
            <td className="text-right">
              <button
                onClick={() => handleToggleCoin(coin)}
                className={`${isCoinInCollection(coin.id) ? "text-info" : "text-neutral"}`}
              >
                {isCoinInCollection(coin.id) ? (
                  <FaCheckCircle size={"2rem"} title="Remove from Watchlist?" />
                ) : (
                  <FaPlusCircle size={"2rem"} title="Add to Watchlist?" />
                )}
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="text-left pl-0 text-sm pt-4">
              Note: Currency in {preferredCurrency.toUpperCase()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CoinSummary;
