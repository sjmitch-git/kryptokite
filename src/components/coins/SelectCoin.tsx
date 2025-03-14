"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCoins } from "@/lib/contexts/CoinsContext";
import { Autocomplete } from "@/lib/fluid";

type SelectCoinProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const SelectCoin = ({ setIsOpen }: SelectCoinProps) => {
  const { coins } = useCoins();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchCoins = setTimeout(() => {
      const selectedCoin = coins.find((coin) => coin.name === searchTerm);
      if (selectedCoin) {
        router.push(`/coins/${selectedCoin.id}`);
        setIsOpen(false);
      }
    }, 2000);

    return () => clearTimeout(searchCoins);
  }, [searchTerm, coins, router, setIsOpen]);

  return (
    <Autocomplete
      className="w-full"
      data={coins.map((coin) => coin.name)}
      list="coins"
      autocomplete="coin-name"
      placeholder="Search for a coin"
      label=""
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SelectCoin;
