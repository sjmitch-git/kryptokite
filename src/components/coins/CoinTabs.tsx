"use client";

import { Tabs, TwitterEmbed, Heading } from "@/lib/fluid";
import { Coin } from "@/lib/types";
import { useUser } from "@/lib/contexts/UserContext";
import Chart from "@/components/ui/Chart";
import CoinMarketData from "@/components/coins/CoinMarketData";
import CoinLinks from "@/components/coins/CoinLinks";
import PriceChangeChart from "@/components/ui/PriceChangeChart";

type CoinDetailProps = {
  coin: Coin;
};

const CoinTabs = ({ coin }: CoinDetailProps) => {
  const { preferredCurrency } = useUser();
  const labels = coin.market_data.sparkline_7d.price.map(() => ``);
  console.log("CoinTabs", coin);

  return (
    <Tabs
      className="p-0"
      defaultActiveId="tab1"
      tabSize="lg"
      tabsPosition="full"
      contentBorder={false}
      minimalTabs={true}
    >
      <div id="tab1" title="Market" className="bg-white p-4">
        <CoinMarketData coin={coin} preferredCurrency={preferredCurrency} />
        {coin.market_data.sparkline_7d.price.length !== 0 && (
          <Chart
            data={coin.market_data.sparkline_7d.price}
            labels={labels}
            title="7-Day Price Trend (USD)"
          />
        )}
        <PriceChangeChart
          priceChangeData={{
            price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
            price_change_percentage_7d: coin.market_data.price_change_percentage_7d,
            price_change_percentage_14d: coin.market_data.price_change_percentage_14d,
            price_change_percentage_30d: coin.market_data.price_change_percentage_30d,
            price_change_percentage_60d: coin.market_data.price_change_percentage_60d,
            price_change_percentage_200d: coin.market_data.price_change_percentage_200d,
            price_change_percentage_1y: coin.market_data.price_change_percentage_1y,
          }}
        />
      </div>

      <div id="tab2" title="Info" className="bg-white p-4">
        <div>
          <Heading level={3}>{coin.name}</Heading>
          <CoinLinks coin={coin} />
          {coin.description.en && <p className="text-lg max-w-prose">{coin.description.en}</p>}
        </div>
      </div>

      {coin.links.twitter_screen_name && (
        <div id="tab3" title={`@${coin.links.twitter_screen_name}`} className="bg-white p-4">
          <TwitterEmbed handle={coin.links.twitter_screen_name} className="max-w-[100%]" />
        </div>
      )}
    </Tabs>
  );
};

export default CoinTabs;
