import { Coin } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

type CoinDetailProps = {
  coin: Coin;
  preferredCurrency: string;
};

const CoinMarketData = ({ coin, preferredCurrency }: CoinDetailProps) => {
  return (
    <table className="w-auto text-right text-lg mb-8">
      <tbody>
        <tr>
          <th className="text-left pr-4 font-semibold">Current Price:</th>
          <td className="text-right">
            {formatNumber(coin.market_data.current_price[preferredCurrency])}{" "}
            {preferredCurrency.toUpperCase()}
          </td>
        </tr>
        {coin.market_cap_rank > 0 && (
          <tr>
            <th className="text-left pr-4 font-semibold">Market Cap Rank:</th>
            <td>{coin.market_cap_rank}</td>
          </tr>
        )}
        {coin.market_data.market_cap[preferredCurrency] > 0 && (
          <tr>
            <th className="text-left pr-4 font-semibold">Market Cap:</th>
            <td>
              {coin.market_data.market_cap[preferredCurrency].toLocaleString()}{" "}
              {preferredCurrency.toUpperCase()}
            </td>
          </tr>
        )}
        <tr>
          <th className="text-left pr-4 font-semibold">24h Change:</th>
          <td>{coin.market_data.price_change_percentage_24h} %</td>
        </tr>
        <tr>
          <th className="text-left pr-4 font-semibold">All time highest:</th>
          <td>
            {formatNumber(coin.market_data.ath[preferredCurrency])}{" "}
            {preferredCurrency.toUpperCase()}
          </td>
        </tr>
        <tr>
          <th className="text-left pr-4 font-semibold">All time lowest:</th>
          <td>
            {formatNumber(coin.market_data.atl[preferredCurrency])}{" "}
            {preferredCurrency.toUpperCase()}
          </td>
        </tr>
        {coin.sentiment_votes_up_percentage !== null && (
          <tr>
            <th className="text-left pr-4 font-semibold">Sentiment Up:</th>
            <td>{coin.sentiment_votes_up_percentage.toFixed(0)} %</td>
          </tr>
        )}
        {coin.sentiment_votes_down_percentage !== null && (
          <tr>
            <th className="text-left pr-4 font-semibold">Sentiment Down:</th>
            <td>{coin.sentiment_votes_down_percentage.toFixed(0)} %</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} className="text-left text-sm pt-4">
            Last Updated: {new Date(coin.last_updated).toLocaleString()}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CoinMarketData;
