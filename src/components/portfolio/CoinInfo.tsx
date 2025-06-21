"use client";

import { useState, useEffect } from "react";
import { Coin } from "@/lib/types";
import { Alert, Loading } from "@smitch/fluid";
import { NEXT_PUBLIC_API_URL } from "@/lib/constants";
import CoinInfoTable from "./CoinInfoTable";
import CoinInfoHero from "./CoinInfoHero";
import GraphTabs from "../coins/GraphTabs";
import CoinSentiment from "@/components/coins/CoinSentiment";

interface CoinInfoProps {
  coinId: string;
  setIsOpen: (isOpen: boolean) => void;
  coin: Coin | null;
  setCoin: (coin: Coin | null) => void;
  setCoinPrice: (coinPrice: number) => void;
  storeBalance: number | undefined;
}

const CoinInfo = ({
  coinId,
  setIsOpen,
  coin,
  setCoin,
  setCoinPrice,
  storeBalance,
}: CoinInfoProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${NEXT_PUBLIC_API_URL}api/coins/${coinId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for coin with id ${coinId}`);
        }

        const data: Coin = await response.json();
        setCoin(data);
        setCoinPrice(data.market_data.current_price.usd);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId, setCoin, setCoinPrice]);

  if (loading) {
    return (
      <div className="p-8">
        <Loading loadingColor="info" />
      </div>
    );
  }

  if (error) {
    return <Alert status="error" message={error} />;
  }

  if (!coin) {
    return <Alert status="error" message="Coin not found" />;
  }

  return (
    <div className="space-y-8 mb-8">
      <hr className="h-1 bg-slate-300 dark:bg-slate-700" />
      <CoinInfoHero coin={coin} />
      <CoinInfoTable coin={coin} setIsOpen={setIsOpen} storeBalance={storeBalance || 0} />
      <CoinSentiment
        up={coin.sentiment_votes_up_percentage}
        down={coin.sentiment_votes_down_percentage}
      />
      <GraphTabs coin={coin} />
    </div>
  );
};

export default CoinInfo;
