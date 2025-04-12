"use client";

import { useEffect, useState } from "react";
import { Coin } from "@/lib/types";
import { formatNumber } from "@utils";

type CoinDetailProps = {
  coin: Coin;
  preferredCurrency: string;
};

const CoinMarketData = ({ coin, preferredCurrency }: CoinDetailProps) => {
  const [stamp, setStamp] = useState("");

  useEffect(() => {
    if (coin.last_updated !== null) setStamp(new Date(coin.last_updated).toLocaleString());
  }, [coin.last_updated]);

  return (
    <table className="w-full md:w-auto text-right md:text-lg">
      <tbody>
        <tr>
          <th className="text-left p-0 pr-4 font-semibold">Current Price:</th>
          <td className="text-right p-2">
            {formatNumber(coin.market_data.current_price[preferredCurrency])}{" "}
            {preferredCurrency.toUpperCase()}
          </td>
        </tr>
        {coin.market_data.price_change_percentage_24h !== null && (
          <tr>
            <th
              className={`text-left p-0 pr-4 font-semibold ${
                coin.market_data.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              24h Change:
            </th>
            <td className="text-right p-2">{coin.market_data.price_change_percentage_24h} %</td>
          </tr>
        )}
        <tr>
          <th className="text-left p-0 pr-4 font-semibold">All time highest:</th>
          <td className="text-right p-2">
            {formatNumber(coin.market_data.ath[preferredCurrency])}{" "}
            {preferredCurrency.toUpperCase()}
          </td>
        </tr>
        <tr>
          <th className="text-left p-0 pr-4 font-semibold">All time lowest:</th>
          <td className="text-right p-2">
            {formatNumber(coin.market_data.atl[preferredCurrency])}{" "}
            {preferredCurrency.toUpperCase()}
          </td>
        </tr>
        {coin.market_cap_rank !== null && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Market Cap Rank:</th>
            <td className="text-right p-2">{coin.market_cap_rank}</td>
          </tr>
        )}

        {coin.market_data.market_cap &&
          coin.market_data.market_cap[preferredCurrency] !== undefined && (
            <tr>
              <th className="text-left p-0 pr-4 font-semibold">Market Cap:</th>
              <td className="text-right p-2">
                {coin.market_data.market_cap[preferredCurrency]?.toLocaleString() || "N/A"}{" "}
                {preferredCurrency.toUpperCase()}
              </td>
            </tr>
          )}
        {coin.market_data.market_cap_change_percentage_24h !== null && (
          <tr>
            <th
              className={`text-left p-0 pr-4 font-semibold ${
                coin.market_data.market_cap_change_percentage_24h < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              Market Cap 24h Change:
            </th>
            <td className="text-right p-2">
              {coin.market_data.market_cap_change_percentage_24h} %
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} className="text-left text-sm p-0 pt-4">
            Last Updated: <time>{stamp}</time>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CoinMarketData;
