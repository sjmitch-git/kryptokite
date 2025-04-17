"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import { Select } from "@/lib/fluid";
import CurrencyData from "@/data/currencies.json";

type SelectCoinProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const CurrencySelector = ({ setIsOpen }: SelectCoinProps) => {
  const { preferredCurrency, setPreferredCurrency } = useUser();
  const [currencies, setCurrencies] = useState<string[]>([]);

  /*  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("/api/currencies");
        if (!response.ok) {
          throw new Error("Failed to fetch supported currencies");
        }
        const data = await response.json();
        setCurrencies(data);
        localStorage.setItem("currencies", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch supported currencies:", error);
      }
    };

    const storedCurrencies = localStorage.getItem("currencies");
    if (storedCurrencies) {
      setCurrencies(JSON.parse(storedCurrencies));
      console.log("Data", Data);
    } else {
      fetchCurrencies();
    }
  }, []); */

  useEffect(() => {
    setCurrencies(CurrencyData);
  }, [CurrencyData]);

  const handleSelect = (currency: string) => {
    setPreferredCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div suppressHydrationWarning={true}>
      <Select
        className="uppercase border-neutral w-full"
        name="currency"
        rounded="md"
        options={currencies}
        defaultValue={preferredCurrency}
        onChange={(e) => handleSelect(e.target.value)}
      />
    </div>
  );
};

export default CurrencySelector;
