"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SimpleCoin, CategoryMarket, MarketData, MarketDataCoin } from "@/lib/types";
import { coinIdsToRemove } from "@/lib/config";

interface NewsSection {
  headline: string;
  body: string;
}

type CoinsContextType = {
  coins: SimpleCoin[];
  categories: CategoryMarket[];
  marketData: {
    coins: MarketDataCoin[];
    date: string;
  };
  loading: boolean;
  error: string | null;
  sections: NewsSection[];
  date: string;
  setNewsData: (sections: NewsSection[], date: string) => void;
};

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<SimpleCoin[]>([]);
  const [categories, setCategories] = useState<CategoryMarket[]>([]);
  const [marketData, setMarketData] = useState<MarketData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<NewsSection[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // fetch market data
        const storedMarketData = sessionStorage.getItem("storedMarketData");

        if (storedMarketData?.length) {
          setMarketData(JSON.parse(storedMarketData));
        } else {
          const marketDataResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/news/market`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!marketDataResponse.ok) {
            throw new Error("Failed to fetch market data");
          }
          const marketData = await marketDataResponse.json();
          setMarketData(marketData);
          sessionStorage.setItem("storedMarketData", JSON.stringify(marketData));
        }

        // Fetch categories
        const storedCategories = localStorage.getItem("storedCategories");
        if (storedCategories?.length) {
          setCategories(JSON.parse(storedCategories));
        } else {
          const categoriesResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/coins/categories/market`
          );
          if (!categoriesResponse.ok) {
            throw new Error("Failed to fetch categories");
          }
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
          localStorage.setItem("storedCategories", JSON.stringify(categoriesData));
        }

        // Fetch coins
        const storedCoins = localStorage.getItem("storedCoins");
        if (storedCoins?.length) {
          setCoins(JSON.parse(storedCoins));
        } else {
          const coinsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/coins`);
          if (!coinsResponse.ok) {
            throw new Error("Failed to fetch coins");
          }
          const coinsData = await coinsResponse.json();
          const filteredCoins = coinsData.filter((coin: SimpleCoin) => {
            return !coinIdsToRemove.includes(coin.id);
          });
          setCoins(filteredCoins);
          localStorage.setItem("storedCoins", JSON.stringify(filteredCoins));
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const setNewsData = (newSections: NewsSection[], newDate: string) => {
    setSections(newSections);
    setDate(newDate);
  };

  return (
    <CoinsContext.Provider
      value={{
        coins,
        categories,
        marketData: marketData || { coins: [], date: "" },
        loading,
        error,
        sections,
        date,
        setNewsData,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinsProvider");
  }
  return context;
};
