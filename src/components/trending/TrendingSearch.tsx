"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import { Loading, Alert } from "@/lib/fluid";
import { SimpleCoin, TrendingCoin } from "@/lib/types";
import TrendingItem from "./TrendingItem";

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
      const cachedTrendingCoins = sessionStorage.getItem("trendingCoins");
      if (cachedTrendingCoins) {
        setTrendingCoins(JSON.parse(cachedTrendingCoins));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/trending_search");
        if (!response.ok) {
          throw new Error("Failed to fetch trending coins");
        }
        const data = await response.json();
        sessionStorage.setItem("trendingCoins", JSON.stringify(data.coins));
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
      <div className="flex justify-center p-8">
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
          <TrendingItem
            key={coin.item.id}
            coin={coin}
            handleToggleCoin={handleToggleCoin}
            isCoinInCollection={isCoinInCollection}
          />
        ))}
      </ul>
    </div>
  );
};

export default TrendingSearch;
