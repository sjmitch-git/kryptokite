import Link from "next/link";
import { TrendingCategory as Category } from "@/lib/types";
import { FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import { formatNumber } from "@/lib/utils";

interface TrendingItemProps {
  item: Category;
}

const TrendingCategory = ({ item }: TrendingItemProps) => {
  const symbol = "$";

  return (
    <li className="flex justify-between items-center text-lg md:text-xl space-x-2 md:space-x-8 shadow p-2 md:p-4 border border-neutral-200 dark:border-none bg-white dark:bg-dark">
      <div className="flex justify-between items-center space-x-2 md:space-x-4">
        <div>
          <p className="font-semibold">
            <Link
              href={{
                pathname: `/categories/${item.name}`,
              }}
              title="See more details about this category"
              className="text-primary hover:underline"
            >
              {item.name}
            </Link>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 md:space-x-8 font-semibold">
        <div className="flex flex-col md:flex-row md:gap-4 items-end md:items-center">
          <p className="font-semibold text-base md:text-lg whitespace-nowrap">
            {symbol} {formatNumber(item.data.market_cap)}
          </p>
          <p
            className={`flex space-x-2 text-base min-w-20 justify-between ${
              item.data.market_cap_change_percentage_24h.usd >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {item.data.market_cap_change_percentage_24h.usd >= 0 ? (
              <FaCaretUp
                size={"1.5rem"}
                title="24h price change %"
                className={`${item.data.market_cap_change_percentage_24h.usd === 0 && "rotate-90"}`}
              />
            ) : (
              <FaCaretDown size={"1.5rem"} title="24h market cap change %" />
            )}
            {item.data.market_cap_change_percentage_24h.usd?.toFixed(2)}%
          </p>
          {/* <img
            className="bg-white"
            src={item.data.sparkline}
            alt={`${item.name} sparkline`}
            title="Price change over the last 7d"
            width={135}
            height={50}
          /> */}
        </div>
      </div>
    </li>
  );
};

export default TrendingCategory;
