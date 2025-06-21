"use client";

import { Suspense } from "react";
import { Tabs, TwitterEmbed, Heading } from "@/lib/fluid";
import { Coin } from "@/lib/types";
import { useUser } from "@/lib/contexts/UserContext";
import CoinMarketData from "@/components/coins/CoinMarketData";
import CoinLinks from "@/components/coins/CoinLinks";

type CoinDetailProps = {
  coin: Coin;
};

const CoinTabs = ({ coin }: CoinDetailProps) => {
  const { preferredCurrency } = useUser();

  return (
    <>
      <Tabs
        className="p-0 mb-8"
        defaultActiveId="tab1"
        tabSize="md"
        tabsPosition="full"
        contentBorder={false}
        minimalTabs={true}
      >
        <div id="tab1" title="Market" className="bg-white dark:bg-black p-2 md:p-4">
          <CoinMarketData coin={coin} preferredCurrency={preferredCurrency} />
        </div>

        <div id="tab2" title="Info" className="bg-white dark:bg-black p-2 md:p-4">
          <div>
            <Heading level={3}>{coin.name}</Heading>
            <CoinLinks coin={coin} />
            {coin.description.en && <p className="md:text-lg max-w-prose">{coin.description.en}</p>}
          </div>
        </div>

        {coin.links.twitter_screen_name && (
          <div
            id="tab3"
            title={`@${coin.links.twitter_screen_name}`}
            className="bg-white dark:bg-black p-2 lg:p-4 h-[560px] md:h-[650px] overflow-y-auto"
          >
            <Suspense>
              <TwitterEmbed handle={coin.links.twitter_screen_name} className="max-w-full" />
            </Suspense>
          </div>
        )}
      </Tabs>
    </>
  );
};

export default CoinTabs;
