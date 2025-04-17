"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { Store, StoredCoin } from "@/lib/types";
import CoinThumb from "@/components/ui/CoinThumb";
import { Loading, Alert, Dialog, Button } from "@/lib/fluid";
import { NEXT_PUBLIC_API_URL } from "@/lib/constants";
import SellCoinForm from "./SellCoinForm";
import { STORES_CONFIG } from "@/lib/constants";
import { FaDollarSign } from "@/components/ui/CustomIcons";

interface StoreProps {
  store: Store;
}

const Store = ({ store }: StoreProps) => {
  const [fetchedCoins, setFetchedCoins] = useState<{ id: string; current_price: number }[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [coin, setCoin] = useState<StoredCoin | null>(null);
  const { currency } = STORES_CONFIG;

  const fetchCoins = useCallback(async () => {
    if (!store.coinIds.length) {
      setFetchedCoins(null);
      return;
    }

    if (fetchedCoins && fetchedCoins.length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}api/markets/${store.coinIds.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch coin data");
      }
      const data = await response.json();
      setFetchedCoins(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error fetching coins:", error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [store.coinIds]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const updatedCoins = store.coins.map((coin) => {
    const fetchedCoin = fetchedCoins?.find(
      (fetched: { id: string; current_price: number }) => fetched.id === coin.id
    );
    return {
      ...coin,
      current_price: fetchedCoin?.current_price || coin.current_price,
    };
  });

  const sellCoin = (coin: StoredCoin) => {
    setCoin(coin);
    setIsOpen(true);
  };

  if (loading) {
    return (
      <div className="section flex justify-center p-8">
        <Loading caption="Updating your coin collection" loadingColor="info" />
      </div>
    );
  }

  if (error) {
    return <Alert status="error" message={error} />;
  }

  return (
    <div className={`section ${!updatedCoins.length ? "!p-0" : ""}`}>
      {updatedCoins.length ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b-2 border-slate-200">
              <tr>
                <th className="p-0 md:p-4 text-left"></th>
                <th className="p-4"></th>
                <th className="p-4 text-right">Holding</th>
                <th className="p-4 text-right whitespace-nowrap">Bought @</th>
                <th className="p-4 text-right">Sell @</th>
                <th className="p-4 text-right">Change</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {updatedCoins.map((coin) => (
                <tr key={coin.createdAt} className="bg-white border-b-2 border-slate-200">
                  <td className="p-0 md:p-4">
                    <CoinThumb src={coin.image} alt={coin.name} size={64} className="w-16 h-auto" />
                  </td>
                  <td className="p-4 font-semibold text-lg">
                    <Link
                      href={{
                        pathname: `/coins/${coin.id}`,
                      }}
                      title="See more dtails about this coin"
                      className="text-primary hover:underline"
                    >
                      {coin.name}
                    </Link>
                  </td>
                  <td className="p-4 text-right">
                    {coin.amount.toFixed(8)}{" "}
                    <span className="block font-mono uppercase">{coin.symbol}</span>
                  </td>
                  <td className="p-4 text-right">
                    {(coin.priceAtPurchase * coin.amount).toFixed(2)}{" "}
                    <span className="block uppercase">{currency}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={
                        coin.current_price > coin.priceAtPurchase
                          ? "text-success"
                          : coin.current_price < coin.priceAtPurchase
                          ? "text-danger"
                          : ""
                      }
                    >
                      {(coin.current_price * coin.amount).toFixed(4)}
                      <span className="block uppercase">{currency}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={
                        coin.current_price > coin.priceAtPurchase
                          ? "text-success"
                          : coin.current_price < coin.priceAtPurchase
                          ? "text-danger"
                          : ""
                      }
                    >
                      {(
                        ((coin.current_price - coin.priceAtPurchase) / coin.priceAtPurchase) *
                        100
                      ).toFixed(4)}
                      %
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button className="ml-auto focus:bg-dark" onClick={() => sellCoin(coin)}>
                      <FaDollarSign /> Sell
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-semibold">
                <td className="p-4 text-right text-lg" colSpan={3}>
                  Collection Total
                </td>
                <td className="p-4 text-right">{store.balance.toFixed(2)}</td>
                <td className="p-4 text-right">
                  {updatedCoins
                    .reduce((total, coin) => total + coin.current_price * coin.amount, 0)
                    .toFixed(4)}
                </td>
                <td className="p-4 text-right">
                  {updatedCoins.length > 0
                    ? (() => {
                        const totalChange = updatedCoins.reduce((total, coin) => {
                          if (coin.priceAtPurchase > 0) {
                            return (
                              total +
                              ((coin.current_price - coin.priceAtPurchase) / coin.priceAtPurchase) *
                                100
                            );
                          }
                          return total;
                        }, 0);

                        const averageChange = totalChange / store.coins.length;

                        return isNaN(averageChange) ? "N/A" : `${averageChange.toFixed(4)}%`;
                      })()
                    : "N/A"}
                </td>
                <td className="p-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}
      <Dialog
        open={isOpen}
        modal={true}
        title={`${coin?.name}`}
        titleSize="lg"
        titleBold={true}
        onClose={() => setIsOpen(false)}
        className="min-w-[380px] max-w-[600px]"
      >
        <div>
          {coin && (
            <SellCoinForm
              storeId={store.id}
              coin={coin}
              coinPrice={coin.current_price}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Store;
