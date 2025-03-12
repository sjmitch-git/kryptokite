"use client";

import { useRouter } from "next/navigation";
import { useCoins } from "@/lib/contexts/CoinsContext";
import { Autocomplete } from "@/lib/fluid";

type SelectCoinProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const SelectCoin = ({ setIsOpen }: SelectCoinProps) => {
  const { coins } = useCoins();
  const router = useRouter();

  const handleSelect = (value: string) => {
    const selectedCoin = coins.find((coin) => coin.name === value);
    if (selectedCoin) {
      router.push(`/coins/${selectedCoin.id}`);
      setIsOpen(false);
    }
  };

  return (
    <Autocomplete
      className="w-full"
      data={coins.map((coin) => coin.name)}
      list="coins"
      autocomplete="coin-name"
      placeholder="Search for a coin"
      label=""
      onChange={(e) => handleSelect(e.target.value)}
    />
  );
};

export default SelectCoin;
