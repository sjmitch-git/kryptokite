"use client";

import React, { useEffect, useState } from "react";
import { Alert, Heading, Loading } from "@/lib/fluid";
import { TrendingCoin as Coin, TrendingCategory as Category } from "@/lib/types";
import TrendingCoin from "./TrendingCoin";
import TrendingCategory from "./TrendingCategory";

const TrendingSearch = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);
  const [trendingCategories, setTrendingCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const cachedTrendingCoins = sessionStorage.getItem("trendingCoins");
      const cachedTrendingCategories = sessionStorage.getItem("trendingCategories");

      if (cachedTrendingCoins && cachedTrendingCategories) {
        setTrendingCoins(JSON.parse(cachedTrendingCoins));
        setTrendingCategories(JSON.parse(cachedTrendingCategories));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("/api/trending_search");
        if (!response.ok) {
          throw new Error("Failed to fetch trending data");
        }
        const data = await response.json();
        setTrendingCategories(data.categories);
        setTrendingCoins(data.coins);
        sessionStorage.setItem("trendingCoins", JSON.stringify(data.coins));
        sessionStorage.setItem("trendingCategories", JSON.stringify(data.categories));
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

    fetchTrending();
  }, []);

  if (error) {
    return <Alert status="error" message={error} />;
  }

  return (
    <div className="px-2 md:px-4 lg:px-0">
      <Heading level={2} className="mb-4">
        Coins
      </Heading>
      <ul className="space-y-2">
        {loading ? (
          <li className="flex justify-center items-center p-8">
            <Loading size="lg" loadingColor="info" />
          </li>
        ) : (
          trendingCoins.map((coin) => <TrendingCoin key={coin.item.id} coin={coin} />)
        )}
      </ul>
      <hr className="my-8" />
      <Heading level={2} className="mb-4">
        Categories
      </Heading>
      <ul className="space-y-2">
        {loading ? (
          <li className="flex justify-center items-center p-8">
            <Loading size="lg" loadingColor="info" />
          </li>
        ) : (
          trendingCategories.map((cat) => <TrendingCategory key={cat.slug} item={cat} />)
        )}
      </ul>
    </div>
  );
};

export default TrendingSearch;
