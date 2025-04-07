export const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
export const COIN_GECKO_TOKEN = process.env.COIN_GECKO_TOKEN;

export const MetaData = {
  defaultSitename: "KryptoKite",
  defaultTitle: "Cryptocurrency Tracker",
  defaultDescription:
    "KryptoKite is a cryptocurrency tracker that allows you to track the latest prices of your favourite crypto currencies.",
  defaultKeywords: "crypto, cryptocurrency, bitcoin, ethereum, crypto tracker, crypto prices",
  defaultAuthor: "Stephen Mitchell",
  defaultAuthorUrl: "https://www.linkedin.com/in/stephen-m-52a3a4192/",
};

export const Links = [
  {
    name: "Coins",
    href: "/coins",
  },
  { name: "Trending", href: "/coins/trending" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Portfolio", href: "/portfolio" },
];

export const HomeLinks = [
  {
    title: "Coins",
    href: "/coins",
    linkLabel: "Browse",
    body: "Browse 17,000+ crypto coins",
    img: "/coins.svg",
  },
  {
    title: "Trending",
    href: "/coins/trending",
    linkLabel: "Go",
    body: "Top 15 trending coins",
    img: "/trending.svg",
  },
  {
    title: "Watchlist",
    href: "/watchlist",
    linkLabel: "View",
    body: "View your favourite coins",
    img: "/watchlist.svg",
  },
  {
    title: "Bitcoin",
    href: "/coins/bitcoin",
    linkLabel: "Bitcoin",
    body: "Bitcoin is the first successful internet money based on peer-to-peer technology",
    img: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    title: "Ethereum",
    href: "/coins/ethereum",
    linkLabel: "Ethereum",
    body: "Ethereum is a global platform for decentralized applications",
    img: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    title: "Tether",
    href: "/coins/tether",
    linkLabel: "Tether",
    body: "Tether has a value meant to mirror the value of the U.S. dollar",
    img: "https://coin-images.coingecko.com/coins/images/325/small/Tether.png",
  },
];

export const coinIdsToRemove = [
  "test-token-please-ignore",
  "testbug",
  "0vix-protocol",
  "movex-token",
  "aesirx",
  "sendcrypto",
  "all-in-one-wallet",
  "solayer-usd",
  "0xlsd",
];
