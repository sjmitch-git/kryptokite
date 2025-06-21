import { Coin, currencySymbols } from "@/lib/types";
import { Button } from "@smitch/fluid";
import { STORES_CONFIG } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { FaPlusCircle } from "@/components/ui/CustomIcons";

interface CoinInfoTableProps {
  coin: Coin;
  setIsOpen: (isOpen: boolean) => void;
  storeBalance: number;
}

const CoinInfoTable = ({ coin, setIsOpen, storeBalance }: CoinInfoTableProps) => {
  const { currency } = STORES_CONFIG;
  const symbol = currencySymbols[currency] || "$";

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="text-left font-semibold bg-slate-100 dark:bg-slate-800">
            {coin.market_cap_rank > 0 && <th>Rank</th>}
            <th className="text-center">Price</th>
            {coin.market_data.price_change_percentage_24h !== null &&
              coin.market_data.price_change_percentage_24h !== 0 && (
                <th
                  className={`text-center ${
                    coin.market_data.price_change_percentage_24h < 0 ? "text-error" : "text-success"
                  }`}
                >
                  24h %
                </th>
              )}
            {coin.market_data.price_change_percentage_7d !== null &&
              coin.market_data.price_change_percentage_7d !== 0 && (
                <th
                  className={`text-center max-sm:hidden ${
                    coin.market_data.price_change_percentage_7d < 0 ? "text-error" : "text-success"
                  }`}
                >
                  7d %
                </th>
              )}
            {coin.market_data.price_change_percentage_1y !== null &&
              coin.market_data.price_change_percentage_1y !== 0 && (
                <th
                  className={`text-center max-sm:hidden ${
                    coin.market_data.price_change_percentage_1y < 0 ? "text-error" : "text-success"
                  }`}
                >
                  1y %
                </th>
              )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-black shadow">
            {coin.market_cap_rank > 0 && <td className="text-left">#{coin.market_cap_rank}</td>}
            <td className="text-center p-2 md:p-4 font-semibold">
              {symbol}
              {formatNumber(coin.market_data.current_price[currency])}
            </td>
            {coin.market_data.price_change_percentage_24h !== null &&
              coin.market_data.price_change_percentage_24h !== 0 && (
                <td className="text-center">
                  {coin.market_data.price_change_percentage_24h.toFixed(4)}
                </td>
              )}
            {coin.market_data.price_change_percentage_7d !== null &&
              coin.market_data.price_change_percentage_7d !== 0 && (
                <td className="text-center max-sm:hidden">
                  {coin.market_data.price_change_percentage_7d.toFixed(4)}
                </td>
              )}
            {coin.market_data.price_change_percentage_1y !== null &&
              coin.market_data.price_change_percentage_1y !== 0 && (
                <td className="text-center max-sm:hidden">
                  {coin.market_data.price_change_percentage_1y.toFixed(4)}
                </td>
              )}
            <td className="text-right">
              <Button
                className="ml-auto focus:bg-dark"
                onClick={() => setIsOpen(true)}
                disabled={storeBalance === 0}
                btnBackground="info"
                layout="circle"
                title="Add coin to collection?"
                size="lg"
              >
                <FaPlusCircle size={"2rem"} />{" "}
                <span className="sr-only">Add coin to collection</span>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinInfoTable;
