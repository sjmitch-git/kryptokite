"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/contexts/UserContext";
import { Loading, Alert } from "@/lib/fluid";
import { SimpleCoin, TrendingCoin } from "@/lib/types";
import { FaStar, FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import CoinThumb from "@/components/ui/CoinThumb";

const TrendingSearch = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addUserCoin, removeUserCoin, isCoinInCollection } = useUser();

  const handleToggleCoin = (coin: SimpleCoin) => {
    if (isCoinInCollection(coin.id)) {
      removeUserCoin(coin.id);
    } else {
      addUserCoin(coin);
    }
  };

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch("/api/trending_search");
        if (!response.ok) {
          throw new Error("Failed to fetch trending coins");
        }
        const data = await response.json();
        setTrendingCoins(data.coins);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loading loadingColor="info" size="lg" />
      </div>
    );
  }

  if (error) {
    return <Alert status="error" message={error} />;
  }

  return (
    <div className="px-2 md:px-4 lg:px-0">
      <ul className="space-y-2">
        {trendingCoins.map((coin) => (
          <li
            key={coin.item.id}
            className="flex justify-between items-center space-x-2 shadow p-2 md:p-4 md:text-xl bg-white border-b border-neutral"
          >
            <div className="flex items-center space-x-2">
              <div className="w-12 hidden md:block">#{coin.item.market_cap_rank}</div>
              <CoinThumb src={coin.item.thumb} alt={coin.item.name} size={64} />
              <div className="flex">
                <Link
                  href={{
                    pathname: `/coins/${coin.item.id}`,
                  }}
                  title="See more dtails about this coin"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  {coin.item.name}
                </Link>{" "}
                <sup className="text-sm hidden md:inline">({coin.item.symbol.toUpperCase()})</sup>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              {coin.item.data.price_change_percentage_24h.usd > 0 ? (
                <span className="text-green-500 flex flex-row-reverse items-center md:hidden">
                  <FaCaretUp size={"3rem"} title="24h price change %" />{" "}
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span>
              ) : (
                <span className="text-red-500 flex flex-row-reverse items-center md:hidden">
                  <FaCaretDown size={"3rem"} title="24h price change %" />{" "}
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span>
              )}
              <img
                className="bg-white hidden md:inline-block"
                src={coin.item.data.sparkline}
                alt={`${coin.item.name} sparkline`}
                title="Price change over the last 7d"
                width={135}
                height={50}
              />
              <button
                onClick={() =>
                  handleToggleCoin({
                    id: coin.item.id,
                    name: coin.item.name,
                    symbol: coin.item.symbol,
                  })
                }
                className={`${
                  isCoinInCollection(coin.item.id) ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                <FaStar className="h-8 w-8" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSearch;
