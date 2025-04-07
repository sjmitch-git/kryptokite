import { useState, useEffect } from "react";
import { Coin } from "@/lib/types";
import { Button } from "@smitch/fluid";
import { STORES_CONFIG } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { FaThumbsDown, FaThumbsUp, FaDollarSign } from "@/components/ui/CustomIcons";

interface CoinInfoTableProps {
  coin: Coin;
  setIsOpen: (isOpen: boolean) => void;
  storeBalance: number;
}

const CoinInfoTable = ({ coin, setIsOpen, storeBalance }: CoinInfoTableProps) => {
  const [sentiment, setSentiment] = useState<number>(0);
  const { currency } = STORES_CONFIG;

  useEffect(() => {
    const calculateSentiment = (coin: Coin) => {
      if (!coin.sentiment_votes_up_percentage || !coin.sentiment_votes_down_percentage) {
        setSentiment(0);
      } else {
        const sentimentScore =
          coin.sentiment_votes_up_percentage - coin.sentiment_votes_down_percentage;
        setSentiment(sentimentScore);
      }
    };

    if (coin) calculateSentiment(coin);
  }, [coin]);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="text-left font-semibold bg-slate-100">
            {coin.market_cap_rank > 0 && <th>Rank</th>}
            <th className="text-center">
              Price <sup className="font-normal">{currency.toUpperCase()}</sup>
            </th>
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
                  className={`text-center ${
                    coin.market_data.price_change_percentage_7d < 0 ? "text-error" : "text-success"
                  }`}
                >
                  7d %
                </th>
              )}
            {sentiment !== 0 && <th className="text-center">Approval</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white shadow">
            {coin.market_cap_rank > 0 && <td className="text-center">#{coin.market_cap_rank}</td>}
            <td className="text-center p-2 md:p-4 font-semibold">
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
                <td className="text-center">
                  {coin.market_data.price_change_percentage_7d.toFixed(4)}
                </td>
              )}
            {sentiment !== 0 && (
              <td className="text-center">
                {sentiment > 0 ? (
                  <span className="text-success flex items-center justify-center">
                    <FaThumbsUp className="mr-2" /> {sentiment.toFixed(0)}%
                  </span>
                ) : (
                  <span className="text-error flex items-center justify-center">
                    <FaThumbsDown className="mr-2" /> {sentiment.toFixed(0)}%
                  </span>
                )}
              </td>
            )}
            <td className="text-right">
              <Button
                className="ml-auto focus:bg-dark"
                onClick={() => setIsOpen(true)}
                disabled={storeBalance === 0}
              >
                <FaDollarSign /> Buy
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinInfoTable;
