"use client";

import { Alert } from "@/lib/fluid";
import { Coin } from "@/lib/types";
import CoinNav from "@/components/coins/CoinNav";
import CoinTabs from "@/components/coins/CoinTabs";
import GraphTabs from "@/components/coins/GraphTabs";
import CoinSummary from "@/components/coins/CoinSummary";

type CoinDetailProps = {
  coin: Coin;
};

const CoinDetail = ({ coin }: CoinDetailProps) => {
  return (
    <div>
      {coin.public_notice && (
        <Alert message={coin.public_notice} title="Public Notice" className="mb-8" />
      )}
      <CoinSummary coin={coin} />
      <CoinTabs coin={coin} />
      <GraphTabs coin={coin} />
      <hr className="my-8" />
      <CoinNav id={coin.id} />
    </div>
  );
};

export default CoinDetail;
