"use client";

import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SimpleCoin, Store, UserContextType, StoredCoin, Theme } from "@/lib/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Theme management
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme as Theme;
      }
    }
    return "dark";
  });

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [userCoins, setUserCoins] = useState<SimpleCoin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState<boolean>(true);

  const [stores, setStores] = useState<Store[]>([]);
  const [loadingStores, setLoadingStores] = useState<boolean>(true);

  const [preferredCurrency, setPreferredCurrency] = useState<string>("");

  useEffect(() => {
    setLoadingCoins(true);
    setLoadingStores(true);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as Theme);
    }

    const storedCoins = localStorage.getItem("userCoins");
    if (storedCoins) {
      setUserCoins(JSON.parse(storedCoins));
    }

    const storedStores = localStorage.getItem("stores");

    if (storedStores) {
      setStores(JSON.parse(storedStores));
    }

    const storedCurrency = localStorage.getItem("preferredCurrency");
    if (storedCurrency) {
      setPreferredCurrency(storedCurrency);
    } else setPreferredCurrency("usd");

    setLoadingCoins(false);
    setLoadingStores(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("userCoins", JSON.stringify(userCoins));
  }, [userCoins]);

  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

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

  const addStore = (name: string, description?: string) => {
    const newStore: Store = {
      id: uuidv4(),
      name: name || `store${stores.length + 1}`,
      description: description,
      coins: [],
      coinIds: [],
      balance: 100,
      createdAt: new Date().toISOString(),
    };
    setStores((prevStores) => [...prevStores, newStore]);
  };

  const removeStore = (storeId: string) => {
    setStores((prevStores) => prevStores.filter((store) => store.id !== storeId));
  };

  const addCoinToStore = (
    storeId: string,
    coin: SimpleCoin,
    coinPrice: number,
    purchaseAmount: number,
    cost: number,
    image: string
  ) => {
    setStores((prevStores) =>
      prevStores.map((store) => {
        if (store.id === storeId) {
          const updatedCoins: StoredCoin[] = [
            ...store.coins,
            {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              amount: purchaseAmount,
              priceAtPurchase: coinPrice,
              current_price: coinPrice,
              image: image,
              createdAt: new Date().toISOString(),
            },
          ];

          const updatedCoinIds = store.coinIds.includes(coin.id)
            ? store.coinIds
            : [...store.coinIds, coin.id];

          const updatedBalance = store.balance - cost;

          return {
            ...store,
            coins: updatedCoins,
            coinIds: updatedCoinIds,
            balance: updatedBalance,
          };
        }
        return store;
      })
    );
  };

  const removeCoinFromStore = (storeId: string, coinId: string, saleAmount: number) => {
    setStores((prevStores) =>
      prevStores.map((store) => {
        if (store.id === storeId) {
          const coinToRemove = store.coins.find((coin) => coin.id === coinId);

          if (!coinToRemove) {
            return store;
          }

          const updatedCoins = store.coins.filter((coin) => coin.id !== coinId);

          const updatedBalance = store.balance + saleAmount;

          return {
            ...store,
            coins: updatedCoins,
            balance: updatedBalance,
          };
        }
        return store;
      })
    );
  };

  const getStoreById = (storeId: string): Store | undefined => {
    return stores.find((store) => store.id === storeId);
  };

  const updateStoreDescription = (storeId: string, description: string) => {
    setStores((prevStores) =>
      prevStores.map((store) => (store.id === storeId ? { ...store, description } : store))
    );
  };

  return (
    <UserContext.Provider
      value={{
        theme,
        toggleTheme,
        userCoins,
        addUserCoin,
        removeUserCoin,
        isCoinInCollection,
        stores,
        addStore,
        removeStore,
        addCoinToStore,
        removeCoinFromStore,
        getStoreById,
        updateStoreDescription,
        preferredCurrency,
        setPreferredCurrency,
        loadingCoins,
        loadingStores,
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
