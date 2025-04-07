"use client";

import { useUser } from "@/lib/contexts/UserContext";
import { StoredCoin } from "@/lib/types";
import { STORES_CONFIG } from "@/lib/constants";
import { Button } from "@smitch/fluid";
import { formatNumber } from "@/lib/utils";

interface SellCoinFormProps {
  storeId: string;
  coin: StoredCoin;
  coinPrice: number; // Current price of the coin
  onClose: () => void;
}

const SellCoinForm = ({ storeId, coin, coinPrice, onClose }: SellCoinFormProps) => {
  const { removeCoinFromStore } = useUser();
  const { currency } = STORES_CONFIG;

  const handleSellCoin = (totalValue: number) => {
    removeCoinFromStore(storeId, coin.id, totalValue);
    onClose();
  };

  const totalValue = coin.amount * coinPrice;

  return (
    <form
      className="p-4 flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSellCoin(totalValue);
      }}
    >
      <div className="flex flex-col gap-4 text-lg">
        <p>Are you sure you want to sell this coin? This action cannot be undone.</p>
        <div className="section flex flex-col justify-center items-center gap-2">
          <span>Sale Value:</span>
          <div className="flex flex-col items-center gap-4">
            <strong>{formatNumber(totalValue)}</strong>
            <sup>{currency.toUpperCase()}</sup>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <Button btnBackground="dark" btnColor="light" onClick={onClose}>
          Cancel
        </Button>
        <Button btnBackground="primary" type="submit">
          Sell
        </Button>
      </div>
    </form>
  );
};

export default SellCoinForm;
