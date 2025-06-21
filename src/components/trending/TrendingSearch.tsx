"use client";

import React, { useEffect, useState } from "react";
import { Alert, Heading, Loading, Tabs } from "@/lib/fluid";
import { TrendingCoin as Coin, TrendingCategory as Category } from "@/lib/types";
import TrendingCoin from "./TrendingCoin";
import TrendingCategory from "./TrendingCategory";
import ButtonLink from "@/components/ui/ButtonLink";

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
    <>
      <Tabs
        className="p-0 mb-8"
        defaultActiveId="trending1"
        tabSize="lg"
        tabsPosition="full"
        contentBorder={false}
        minimalTabs={true}
      >
        <div id="trending1" title="Coins" className="bg-white dark:bg-black p-2 md:p-4">
          <Heading level={2} className="mb-4">
            Coins
          </Heading>
          <ul className="space-y-2 mb-8">
            {loading ? (
              <li className="flex justify-center items-center p-8">
                <Loading size="lg" loadingColor="info" />
              </li>
            ) : (
              trendingCoins.map((coin) => <TrendingCoin key={coin.item.id} coin={coin} />)
            )}
          </ul>
          <p className="text-center pb-4">
            <ButtonLink href="/coins" label="Browse all coins" />
          </p>
        </div>

        <div id="trending2" title="Categories" className="bg-white dark:bg-black p-2 md:p-4">
          <Heading level={2} className="mb-4">
            Categories
          </Heading>
          <ul className="space-y-2 mb-8">
            {loading ? (
              <li className="flex justify-center items-center p-8">
                <Loading size="lg" loadingColor="info" />
              </li>
            ) : (
              trendingCategories.map((cat) => <TrendingCategory key={cat.slug} item={cat} />)
            )}
          </ul>
          <p className="text-center pb-4">
            <ButtonLink href="/categories" label="Browse all categories" />
          </p>
        </div>
      </Tabs>
    </>
  );
};

export default TrendingSearch;
