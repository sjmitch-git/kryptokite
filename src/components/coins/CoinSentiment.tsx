import { StatBar } from "@smitch/fluid";

interface CoinSentimentProps {
  up: number;
  down: number;
}

const CoinSentiment = ({ up, down }: CoinSentimentProps) => {
  if (!up && !down) return "";

  return (
    <div className="mb-12 -mt-4">
      <StatBar
        colors={["#38bdf8", "#ff0000"]}
        data={[up, down]}
        labels={["Up", "Down"]}
        showLabels
        title="User Sentiment %"
        titleAlign="center"
        titleSize={5}
        titleWeight="semibold"
      />
    </div>
  );
};

export default CoinSentiment;
