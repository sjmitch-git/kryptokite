"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SimpleCoin } from "@/lib/types";
import { coinIdsToRemove } from "@/lib/config";

interface NewsSection {
  headline: string;
  body: string;
}

type CoinsContextType = {
  coins: SimpleCoin[];
  loading: boolean;
  error: string | null;
  sections: NewsSection[];
  date: string;
  setNewsData: (sections: NewsSection[], date: string) => void;
};

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<SimpleCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<NewsSection[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/coins`);
        if (!response.ok) {
          throw new Error("Failed to fetch coins list");
        }
        const data = await response.json();
        const filteredData = data.filter((coin: SimpleCoin) => {
          return !coinIdsToRemove.includes(coin.id);
        });

        setCoins(filteredData);
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

    fetchCoins();
  }, []);

  const setNewsData = (newSections: NewsSection[], newDate: string) => {
    setSections(newSections);
    setDate(newDate);
  };

  return (
    <CoinsContext.Provider value={{ coins, loading, error, sections, date, setNewsData }}>
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
