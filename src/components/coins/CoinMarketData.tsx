"use client";

import { useEffect, useState } from "react";
import { Coin, currencySymbols } from "@/lib/types";
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

  const symbol = currencySymbols[preferredCurrency] || "$";

  return (
    <table className="w-full md:w-auto text-right md:text-lg">
      <tbody>
        {coin.market_cap_rank !== null && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Rank:</th>
            <td className="text-right py-2 px-0">#{coin.market_cap_rank}</td>
          </tr>
        )}

        <tr>
          <th className="text-left p-0 pr-4 font-semibold">Current Price:</th>
          <td className="text-right py-2 px-0">
            {symbol} {formatNumber(coin.market_data.current_price[preferredCurrency])}
          </td>
        </tr>

        {coin.market_data.price_change_24h_in_currency[preferredCurrency] !== null && (
          <tr>
            <th
              className={`text-left p-0 pr-4 font-semibold ${
                coin.market_data.price_change_24h_in_currency[preferredCurrency] < 0
                  ? "text-danger"
                  : "text-success"
              }`}
            >
              24h Change:
            </th>
            <td className="text-right py-2 px-0">
              {symbol} {coin.market_data.price_change_24h_in_currency[preferredCurrency]}
            </td>
          </tr>
        )}

        {coin.market_data.price_change_percentage_24h !== null && (
          <tr>
            <th
              className={`text-left p-0 pr-4 font-semibold ${
                coin.market_data.price_change_percentage_24h < 0 ? "text-danger" : "text-success"
              }`}
            >
              24h % Change:
            </th>
            <td className="text-right py-2 px-0">{coin.market_data.price_change_percentage_24h}</td>
          </tr>
        )}

        <tr>
          <th className="text-left p-0 pr-4 font-semibold">All time highest:</th>
          <td className="text-right py-2 px-0">
            {symbol} {formatNumber(coin.market_data.ath[preferredCurrency])}
          </td>
        </tr>

        <tr>
          <th className="text-left p-0 pr-4 font-semibold">All time lowest:</th>
          <td className="text-right py-2 px-0">
            {symbol} {formatNumber(coin.market_data.atl[preferredCurrency])}
          </td>
        </tr>

        {coin.market_data.market_cap &&
          coin.market_data.market_cap[preferredCurrency] !== undefined && (
            <tr>
              <th className="text-left p-0 pr-4 font-semibold">Market Cap:</th>
              <td className="text-right py-2 px-0">
                {symbol} {coin.market_data.market_cap[preferredCurrency]?.toLocaleString() || "N/A"}
              </td>
            </tr>
          )}

        {coin.market_data.market_cap_change_percentage_24h !== null && (
          <tr>
            <th
              className={`text-left p-0 pr-4 font-semibold ${
                coin.market_data.market_cap_change_percentage_24h < 0
                  ? "text-danger"
                  : "text-success"
              }`}
            >
              Market Cap % 24h:
            </th>
            <td className="text-right py-2 px-0">
              {coin.market_data.market_cap_change_percentage_24h}
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
