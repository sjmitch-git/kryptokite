import { LineChart } from "@/lib/fluid";

type PriceChangeChartProps = {
  priceChangeData: {
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
  };
};

const PriceChangeChart = ({ priceChangeData }: PriceChangeChartProps) => {
  const trendUpwardsStyle = "rgba(75, 220, 192, 1)";
  const trendDownwardsStyle = "rgba(193, 63, 63, 1)";
  const labels = ["1y", "200d", "60d", "30d", "14d", "7d", "24h"];
  const data = labels.map(
    (label) => priceChangeData[`price_change_percentage_${label}` as keyof typeof priceChangeData]
  );
  const trendUpwards = data[data.length - 1] > data[0];
  const title = "Price Change %";

  return (
    <LineChart
      aspect="landscape"
      data={{
        datasets: [
          {
            backgroundColor: trendUpwards ? trendUpwardsStyle : trendDownwardsStyle,
            borderColor: trendUpwards ? trendUpwardsStyle : trendDownwardsStyle,
            data: data,
            label: "%",
          },
        ],
        labels: labels,
      }}
      gridColor="#f7f7f7"
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      title={title}
    />
  );
};

export default PriceChangeChart;
