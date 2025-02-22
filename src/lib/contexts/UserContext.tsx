"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Coin } from "@/lib/types";

type UserContextType = {
  userCoins: Coin[];
  addUserCoin: (coin: Coin) => void;
  removeUserCoin: (coinId: string) => void;
  isCoinInCollection: (coinId: string) => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userCoins, setUserCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const storedCoins = localStorage.getItem("userCoins");
    if (storedCoins) {
      setUserCoins(JSON.parse(storedCoins));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userCoins", JSON.stringify(userCoins));
  }, [userCoins]);

  const addUserCoin = (coin: Coin) => {
    setUserCoins((prevCoins) => [...prevCoins, coin]);
  };

  const removeUserCoin = (coinId: string) => {
    setUserCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== coinId));
  };

  const isCoinInCollection = (coinId: string) => {
    return userCoins.some((coin) => coin.id === coinId);
  };

  return (
    <UserContext.Provider value={{ userCoins, addUserCoin, removeUserCoin, isCoinInCollection }}>
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
