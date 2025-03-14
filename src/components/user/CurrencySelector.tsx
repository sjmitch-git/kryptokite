"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import { Select } from "@/lib/fluid";

const CurrencySelector = () => {
  const { preferredCurrency, setPreferredCurrency } = useUser();
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
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
    } else {
      fetchCurrencies();
    }
  }, []);

  return (
    <div suppressHydrationWarning={true}>
      <Select
        className="uppercase border-neutral"
        name="currency"
        rounded="md"
        options={currencies}
        defaultValue={preferredCurrency}
        onChange={(e) => setPreferredCurrency(e.target.value)}
      />
    </div>
  );
};

export default CurrencySelector;
