import { Coin } from "@/lib/types";
import CoinThumb from "@/components/ui/CoinThumb";
import { useUser } from "@/lib/contexts/UserContext";
import { FaStar } from "react-icons/fa";
import { formatNumber } from "@/lib/utils";

type Props = {
  coin: Coin;
};

const CoinSummary = ({ coin }: Props) => {
  const { addUserCoin, removeUserCoin, isCoinInCollection, preferredCurrency } = useUser();

  const handleToggleCoin = (coin: Coin) => {
    if (isCoinInCollection(coin.id)) {
      removeUserCoin(coin.id);
    } else {
      addUserCoin(coin);
    }
  };

  return (
    <table className="table w-full text-lg mb-8">
      <thead>
        <tr className="font-semibold hidden md:table-row">
          {coin.market_cap_rank > 0 && <th>Rank</th>}
          <th></th>
          <th></th>
          <th className="text-right p-4">Price</th>
          {coin.market_data.market_cap[preferredCurrency] > 0 && (
            <th className="text-right p-4">Market Cap</th>
          )}
          <th className="text-right p-4">Total Volume</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white">
          {coin.market_cap_rank > 0 && <td className="text-center p-4">#{coin.market_cap_rank}</td>}
          <td className="hidden md:table-cell text-center p-4">
            <CoinThumb src={coin.image.small} alt={coin.name} size={50} />
          </td>
          <td className="text-left p-4 text-xl font-semibold">
            {coin.links.homepage.length > 0 ? (
              <a
                href={coin.links.homepage[0]}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noreferrer"
                title="Visit the official website. Opens in new tab."
              >
                {coin.name}
              </a>
            ) : (
              <span>{coin.name}</span>
            )}{" "}
            <sup className="font-normal">{coin.symbol.toUpperCase()}</sup>
          </td>
          <td className="text-right p-4 font-semibold">
            {formatNumber(coin.market_data.current_price[preferredCurrency])}
          </td>
          {coin.market_data.market_cap[preferredCurrency] > 0 && (
            <td className="hidden md:table-cell text-right p-4">
              {coin.market_data.market_cap[preferredCurrency].toLocaleString()}
            </td>
          )}
          {coin.market_data.total_volume[preferredCurrency] > 0 && (
            <td className="hidden md:table-cell text-right p-4">
              {coin.market_data.total_volume[preferredCurrency].toLocaleString()}
            </td>
          )}
          <td className="text-right p-4">
            <button
              onClick={() => handleToggleCoin(coin)}
              className={`${isCoinInCollection(coin.id) ? "text-yellow-500" : "text-gray-500"}`}
            >
              <FaStar className="h-6 w-6" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7} className="text-left text-sm pt-4">
            Note: Currency in {preferredCurrency.toUpperCase()}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CoinSummary;
