"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCoins } from "@/lib/contexts/CoinsContext";
import { MarketDataCoin } from "@/lib/types";

const filter_amount = 5;

const Ticker = () => {
  const { marketData, loading, error } = useCoins();
  const [tickerData, setTickerData] = useState<MarketDataCoin[]>([]);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  useEffect(() => {
    if (marketData) {
      const filteredData = marketData.coins
        .filter(
          (coin: { price_change_percentage_24h: number }) =>
            coin.price_change_percentage_24h > filter_amount ||
            coin.price_change_percentage_24h < Number(`-${filter_amount}`)
        )
        .slice(0, 50);
      setTickerData(filteredData);
      setTimestamp(new Date(marketData.date).toLocaleString());
    }
  }, [marketData]);

  if (error || loading || !tickerData) return "";

  return (
    <div className="ticker">
      <div className="ticker-wrapper">
        <ul className="ticker-items">
          <li className="ticker-item">Big movers today:</li>
          {tickerData.length > 0 &&
            tickerData.map((coin) => (
              <li key={coin.id} className="ticker-item">
                <Link href={`/coins/${coin.id}`} className="ticker-link flex gap-2 items-center">
                  <span className="ticker-symbol">{coin.symbol.toUpperCase()}</span>
                  <span
                    className={`ticker-change ${
                      coin.price_change_percentage_24h > 0 ? "text-success" : "text-warning-light"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </Link>
              </li>
            ))}
          <li className="ticker-item">
            Updated at: {timestamp ? timestamp : <span className="opacity-50">...</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ticker;
