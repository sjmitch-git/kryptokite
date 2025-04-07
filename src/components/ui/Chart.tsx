import { LineChart } from "@/lib/fluid";

interface ChartProps {
  data: number[];
  labels: string[];
  title: string;
}

const Chart = ({ data, labels, title }: ChartProps) => {
  const trendUpwards = data[data.length - 1] > data[0];
  const trendUpwardsStyle = "rgba(75, 220, 192, 1)";
  const trendDownwardsStyle = "rgba(193, 63, 63, 1)";

  return (
    <LineChart
      aspect="landscape"
      data={{
        datasets: [
          {
            backgroundColor: trendUpwards ? trendUpwardsStyle : trendDownwardsStyle,
            borderColor: trendUpwards ? trendUpwardsStyle : trendDownwardsStyle,
            pointBorderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 0,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
            data: data,
            label: "USD",
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

export default Chart;
