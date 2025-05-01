"use client";

import { Tabs } from "@/lib/fluid";
import { Coin } from "@/lib/types";
import Chart from "@/components/ui/Chart";
import PriceChangeChart from "@/components/ui/PriceChangeChart";

type CoinDetailProps = {
  coin: Coin;
};

const GraphTabs = ({ coin }: CoinDetailProps) => {
  const last24hPrices = coin.market_data.sparkline_7d.price.slice(-24);
  const last7dPrices = coin.market_data.sparkline_7d.price;

  const labels_24h = last24hPrices.map(() => ``);
  const labels_7d = last7dPrices.map(() => ``);

  return (
    <Tabs
      className="p-0"
      defaultActiveId="graph1"
      tabSize="lg"
      tabsPosition="full"
      contentBorder={false}
      minimalTabs={true}
    >
      <div id="graph1" title="24h Price" className="bg-white p-1 md:p-4">
        {last24hPrices.length ? (
          <Chart data={last24hPrices} labels={labels_24h} title="1-Day Price Trend (USD)" />
        ) : (
          <p>No information at this time.</p>
        )}
      </div>

      <div id="graph2" title="7d Price" className="bg-white p-1 md:p-4">
        {last7dPrices.length ? (
          <Chart
            data={coin.market_data.sparkline_7d.price}
            labels={labels_7d}
            title="7-Day Price Trend (USD)"
          />
        ) : (
          <p>No information at this time.</p>
        )}
      </div>

      <div id="graph3" title="1y Price" className="bg-white p-1 md:p-4">
        <PriceChangeChart
          priceChangeData={{
            price_1h: coin.market_data.price_change_percentage_1h_in_currency.usd,
            price_24h: coin.market_data.price_change_percentage_24h,
            price_7d: coin.market_data.price_change_percentage_7d,
            price_14d: coin.market_data.price_change_percentage_14d,
            price_30d: coin.market_data.price_change_percentage_30d,
            price_60d: coin.market_data.price_change_percentage_60d,
            price_200d: coin.market_data.price_change_percentage_200d,
            price_1y: coin.market_data.price_change_percentage_1y,
          }}
        />
      </div>
    </Tabs>
  );
};

export default GraphTabs;
