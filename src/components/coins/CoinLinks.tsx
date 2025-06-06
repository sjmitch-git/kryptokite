import Link from "next/link";
import { Coin } from "@/lib/types";
import { useCoins } from "@/lib/contexts/CoinsContext";

type CoinLinkslProps = {
  coin: Coin;
};

const CoinLinks = ({ coin }: CoinLinkslProps) => {
  const { categories } = useCoins();
  return (
    <table className="w-full md:text-lg mb-8">
      <tbody>
        <tr>
          <th className="text-left pl-0 py-2 pr-4 font-semibold align-top">Categories:</th>
          <td className="text-left align-top p-2">
            <div className="flex flex-wrap gap-2">
              {coin.categories
                .filter((category) =>
                  categories.some((userCategory) => userCategory.name === category)
                )
                .map((category, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/categories/${category}`}
                      title={`View all coins in the ${category} category`}
                      className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded"
                    >
                      {category}
                    </Link>
                  );
                })}
            </div>
          </td>
        </tr>
        {coin.links.homepage[0] && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Homepage:</th>
            <td className="text-left p-2">
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline truncate inline-block max-sm:max-w-[230px]"
                title="Visit the official website. Opens in new tab."
              >
                {coin.links.homepage[0]}
              </a>
            </td>
          </tr>
        )}
        {coin.links.whitepaper && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Whitepaper:</th>
            <td className="text-left p-2">
              <a
                href={coin.links.whitepaper}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline truncate inline-block max-sm:max-w-[230px]"
                download
                title={coin.links.whitepaper}
              >
                Download PDF
              </a>
            </td>
          </tr>
        )}
        {coin.links.official_forum_url[0] && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Official Forum:</th>
            <td className="text-left p-2">
              <a
                href={coin.links.official_forum_url[0]}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline truncate inline-block max-sm:max-w-[230px]"
                title="Opens in new tab"
              >
                {coin.links.official_forum_url[0]}
              </a>
            </td>
          </tr>
        )}
        {coin.links.subreddit_url && coin.links.subreddit_url !== "https://www.reddit.com" && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Subreddit:</th>
            <td className="text-left p-2">
              <a
                href={coin.links.subreddit_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline truncate inline-block max-sm:max-w-[230px]"
                title="Opens in new tab"
              >
                {coin.links.subreddit_url}
              </a>
            </td>
          </tr>
        )}
        {coin.links.repos_url.github.map((link, index) => (
          <tr key={index}>
            <th className="text-left p-0 pr-4 font-semibold">GitHub:</th>
            <td className="text-left p-2">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline truncate inline-block max-sm:max-w-[230px]"
                title="Opens in new tab"
              >
                {link}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinLinks;
