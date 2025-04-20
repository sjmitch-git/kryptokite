"use client";

import { Coin } from "@/lib/types";
import CoinItem from "./CoinItem";

type CoinSummaryProps = {
  coin: Coin;
};

const CoinSummary = ({ coin }: CoinSummaryProps) => {
  return (
    <div className="overflow-x-auto mb-8 px-2 lg:px-0">
      <ul>
        <CoinItem key={coin.id} coin={coin} />
      </ul>
    </div>
  );
};

export default CoinSummary;
