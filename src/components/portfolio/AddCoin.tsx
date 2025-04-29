"use client";

import { useState, useEffect } from "react";
import { Coin, SimpleCoin } from "@/lib/types";
import { useCoins } from "@/lib/contexts/CoinsContext";
import { useUser } from "@/lib/contexts/UserContext";
import CoinInfo from "./CoinInfo";
import BuyCoinForm from "./BuyCoinForm";
import { Dialog, Label, Input } from "@smitch/fluid";

interface Props {
  storeId: string | undefined;
  storeBalance: number | undefined;
}

const AddCoin = ({ storeId, storeBalance }: Props) => {
  const { coins } = useCoins();
  const { userCoins } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [coinId, setCoinId] = useState<string | null>(null);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [coinPrice, setCoinPrice] = useState<number>(0);

  useEffect(() => {
    const searchCoins = setTimeout(() => {
      const selectedCoin = coins.find((coin) => coin.name === searchTerm);
      if (selectedCoin) {
        setCoinId(selectedCoin.id);
      }
    }, 2000);

    return () => clearTimeout(searchCoins);
  }, [searchTerm, coins]);

  return (
    <div className="space-y-4 py-4 px-2 md:px-4 md:border md:rounded bg-slate-200">
      <h2 className="text-2xl font-bold">Add Coin</h2>
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
        <Label label="All Coins:" size="lg" layout="row">
          <Input
            list="coins"
            className="hide-arrow"
            placeholder="Search coins"
            onChange={(e) => setSearchTerm(e.target.value)}
            suppressHydrationWarning
          />
        </Label>
        {userCoins && (
          <>
            <Label label="Watchlist:" size="lg" layout="row">
              <Input
                list="watchlist"
                className="hide-arrow"
                placeholder="Search watchlist"
                onChange={(e) => setSearchTerm(e.target.value)}
                suppressHydrationWarning
              />
            </Label>
            <datalist id="watchlist">
              {userCoins.map((coin: SimpleCoin) => (
                <option key={coin.id} value={coin.name} />
              ))}
            </datalist>
          </>
        )}
      </div>
      {coinId && (
        <CoinInfo
          coinId={coinId}
          setIsOpen={setIsOpen}
          coin={coin}
          setCoin={setCoin}
          setCoinPrice={setCoinPrice}
          storeBalance={storeBalance}
        />
      )}

      <hr className="my-8" />

      <Dialog
        open={isOpen}
        modal={true}
        title={`${coin?.name}`}
        titleSize="lg"
        titleBold={true}
        onClose={() => setIsOpen(false)}
      >
        <div>
          {coin && storeId && storeBalance !== undefined && (
            <BuyCoinForm
              storeId={storeId}
              storeBalance={storeBalance}
              coin={coin}
              coinPrice={coinPrice}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AddCoin;
