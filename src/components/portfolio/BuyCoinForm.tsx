"use client";

import { useState, useRef } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import { Coin } from "@/lib/types";
import { STORES_CONFIG } from "@/lib/constants";
import { Button, Label, Input, Checkbox } from "@smitch/fluid";
import { formatNumber } from "@/lib/utils";

interface BuyCoinFormProps {
  storeId: string;
  storeBalance: number;
  coin: Coin;
  coinPrice: number;
  onClose: () => void;
}

const BuyCoinForm = ({ storeId, storeBalance, coin, coinPrice, onClose }: BuyCoinFormProps) => {
  const { addCoinToStore } = useUser();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [useAllBalance, setUseAllBalance] = useState<boolean>(false);
  const purchaseAmountRef = useRef<HTMLInputElement>(null);
  const { currency } = STORES_CONFIG;

  const handleBuyCoin = () => {
    const coinAmount = purchaseAmount / coinPrice;
    addCoinToStore(storeId, coin, coinPrice, coinAmount, purchaseAmount, coin.image.large);
    handleClose();
  };

  const handleUseAllBalanceChange = (checked: boolean) => {
    setUseAllBalance(checked);
    if (checked) {
      setPurchaseAmount(storeBalance);
      if (purchaseAmountRef.current) purchaseAmountRef.current.value = String(storeBalance);
    } else {
      setPurchaseAmount(0);
      if (purchaseAmountRef.current) purchaseAmountRef.current.value = "0";
    }
  };

  const handleClose = () => {
    setPurchaseAmount(0);
    setUseAllBalance(false);
    if (purchaseAmountRef.current) purchaseAmountRef.current.value = "0";
    onClose();
  };

  const coinAmount = purchaseAmount > 0 && coinPrice > 0 ? purchaseAmount / coinPrice : 0;
  const remainingBalance = storeBalance - purchaseAmount;

  return (
    <form
      className="p-4 flex flex-col justify-between gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleBuyCoin();
      }}
    >
      <div className="space-y-4">
        <Label size="lg" label={`Purchase Amount (${currency.toUpperCase()})`} layout="col">
          <Input
            type="number"
            name="purchaseAmount"
            ref={purchaseAmountRef}
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
            placeholder={`Enter amount in ${currency}`}
            max={storeBalance}
            min={0}
            step="any"
            className="w-full border-neutral"
          />
        </Label>
        <Checkbox
          label="Use all available balance"
          labelIsBold={false}
          checked={useAllBalance}
          name="allbalance"
          onChange={(e) => handleUseAllBalanceChange(e.target.checked)}
        />
      </div>
      <div className="flex flex-col gap-4 text-lg">
        <div className="flex justify-between">
          Price:{" "}
          <span>
            <strong>{formatNumber(coinPrice)}</strong> {currency.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between text-lg">
          Balance:{" "}
          <span>
            <strong>{formatNumber(remainingBalance)}</strong> {currency.toUpperCase()}
          </span>
        </div>

        <div className="section flex flex-col justify-center items-center gap-2">
          Coins Amount:{" "}
          <div className="flex flex-col items-center gap-4">
            <strong>{formatNumber(coinAmount)}</strong>
            <sup>{coin.symbol.toUpperCase()}</sup>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <Button btnBackground="dark" btnColor="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button btnBackground="primary" type="submit" disabled={purchaseAmount <= 0}>
          Buy
        </Button>
      </div>
    </form>
  );
};

export default BuyCoinForm;
