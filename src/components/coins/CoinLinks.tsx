import { Coin } from "@/lib/types";

type CoinLinkslProps = {
  coin: Coin;
};

const CoinLinks = ({ coin }: CoinLinkslProps) => {
  return (
    <table className="w-auto text-right md:text-lg mb-8">
      <tbody>
        {coin.links.homepage[0] && (
          <tr>
            <th className="text-left p-0 pr-4 font-semibold">Homepage:</th>
            <td className="text-left p-2">
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
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
                className="text-blue-500 hover:underline"
                download
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
                className="text-blue-500 hover:underline"
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
                className="text-blue-500 hover:underline"
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
                className="text-blue-500 hover:underline"
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
