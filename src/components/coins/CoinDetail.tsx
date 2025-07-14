"use client";

import { Alert, SocialShare } from "@/lib/fluid";
import { Coin } from "@/lib/types";
import CoinNav from "@/components/coins/CoinNav";
import CoinTabs from "@/components/coins/CoinTabs";
import GraphTabs from "@/components/coins/GraphTabs";
import CoinSummary from "@/components/coins/CoinSummary";
import CoinSentiment from "@/components/coins/CoinSentiment";

type CoinDetailProps = {
  coin: Coin;
};

const CoinDetail = ({ coin }: CoinDetailProps) => {
  return (
    <div>
      {coin.public_notice && (
        <Alert message={coin.public_notice} title="Public Notice" className="mb-8 mx-2" />
      )}
      <CoinSummary coin={coin} />
      <CoinSentiment
        up={coin.sentiment_votes_up_percentage}
        down={coin.sentiment_votes_down_percentage}
      />
      <CoinTabs coin={coin} />
      <GraphTabs coin={coin} />
      <div className="flex justify-between items-center my-8">
        <SocialShare
          text={coin.name}
          buttons={["X", "Facebook", "LinkedIn", "Slack", "WhatsApp", "Email"]}
          btnShape="circle"
          size="lg"
          gap="md"
          layout="horizontal"
          className="mx-auto"
        />
      </div>

      <hr className="my-8" />
      <CoinNav id={coin.id} />
    </div>
  );
};

export default CoinDetail;
