"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Coin } from "@/lib/types";

type CoinsContextType = {
  coins: Coin[];
  loading: boolean;
  error: string | null;
};

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coins`);
        if (!response.ok) {
          throw new Error("Failed to fetch coins list");
        }
        const data = await response.json();
        setCoins(data);
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

  return (
    <CoinsContext.Provider value={{ coins, loading, error }}>{children}</CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinsProvider");
  }
  return context;
};
