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
    links: [{ name: "Trending", href: "/coins/trending" }],
  },
  { name: "Trending", href: "/coins/trending" },
  { name: "Watchlist", href: "/watchlist" },
];
