"use client";

import { Tabs } from "@/lib/fluid";
import { Coin } from "@/lib/types";
import Chart from "@/components/ui/Chart";

type CoinDetailProps = {
  coin: Coin;
};

const GraphTabs = ({ coin }: CoinDetailProps) => {
  const last24hPrices = coin.market_data.sparkline_7d.price.slice(-24);
  const last7dPrices = coin.market_data.sparkline_7d.price;
  const currentPrice = coin.market_data.current_price.usd;

  const labels_24h = last24hPrices.map(() => ``);
  const labels_7d = last7dPrices.map(() => ``);
  const historicalLabels = ["1y", "200d", "60d", "30d", "14d", "7d", "24h"];

  const calculateHistoricalPrices = (currentPrice: number, percentageChanges: number[]) => {
    return percentageChanges.map((change) => currentPrice / (1 + change / 100));
  };

  const percentageChanges = [
    coin.market_data.price_change_percentage_1y,
    coin.market_data.price_change_percentage_200d,
    coin.market_data.price_change_percentage_60d,
    coin.market_data.price_change_percentage_30d,
    coin.market_data.price_change_percentage_14d,
    coin.market_data.price_change_percentage_7d,
    coin.market_data.price_change_percentage_24h,
  ];

  const historicalPrices = calculateHistoricalPrices(currentPrice, percentageChanges);

  return (
    <Tabs
      className="p-0"
      defaultActiveId="graph1"
      tabSize="md"
      tabsPosition="full"
      contentBorder={false}
      minimalTabs={true}
    >
      <div id="graph1" title="24h Price" className="bg-white dark:bg-black p-1 md:p-4">
        {last24hPrices.length ? (
          <div className="mx-auto max-w-2xl">
            <Chart data={last24hPrices} labels={labels_24h} title="1-Day Price Trend (USD)" />
          </div>
        ) : (
          <p>No information at this time.</p>
        )}
      </div>

      <div id="graph2" title="7d Price" className="bg-white dark:bg-black p-1 md:p-4">
        {last7dPrices.length ? (
          <div className="max-w-2xl mx-auto">
            <Chart
              data={coin.market_data.sparkline_7d.price}
              labels={labels_7d}
              title="7-Day Price Trend (USD)"
            />
          </div>
        ) : (
          <p>No information at this time.</p>
        )}
      </div>

      <div id="graph3" title="1y Price" className="bg-white dark:bg-black p-1 md:p-4">
        {historicalPrices.length ? (
          <div className="max-w-2xl mx-auto">
            <Chart
              data={historicalPrices}
              labels={historicalLabels}
              title="1-Year Price Trend (USD)"
            />
          </div>
        ) : (
          <p>No information at this time.</p>
        )}
      </div>
    </Tabs>
  );
};

export default GraphTabs;
