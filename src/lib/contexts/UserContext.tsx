"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SimpleCoin } from "@/lib/types";

type UserContextType = {
  userCoins: SimpleCoin[];
  preferredCurrency: string;
  setPreferredCurrency: (currency: string) => void;
  addUserCoin: (coin: SimpleCoin) => void;
  removeUserCoin: (coinId: string) => void;
  isCoinInCollection: (coinId: string) => boolean;
  loadingCoins: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userCoins, setUserCoins] = useState<SimpleCoin[]>([]);
  const [preferredCurrency, setPreferredCurrency] = useState<string>("usd");
  const [loadingCoins, setLoadingCoins] = useState<boolean>(true);

  useEffect(() => {
    setLoadingCoins(true);
    const storedCoins = localStorage.getItem("userCoins");
    if (storedCoins) {
      setUserCoins(JSON.parse(storedCoins));
    }
    const storedCurrency = localStorage.getItem("preferredCurrency");
    if (storedCurrency) {
      setPreferredCurrency(storedCurrency);
    }
    setLoadingCoins(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("userCoins", JSON.stringify(userCoins));
  }, [userCoins]);

  useEffect(() => {
    localStorage.setItem("preferredCurrency", preferredCurrency);
  }, [preferredCurrency]);

  const addUserCoin = (coin: SimpleCoin) => {
    setUserCoins((prevCoins) => [...prevCoins, coin]);
  };

  const removeUserCoin = (coinId: string) => {
    setUserCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== coinId));
  };

  const isCoinInCollection = (coinId: string) => {
    return userCoins.some((coin) => coin.id === coinId);
  };

  return (
    <UserContext.Provider
      value={{
        userCoins,
        preferredCurrency,
        setPreferredCurrency,
        addUserCoin,
        removeUserCoin,
        isCoinInCollection,
        loadingCoins,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
