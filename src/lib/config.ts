export const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
export const COIN_GECKO_TOKEN = process.env.COIN_GECKO_TOKEN;

export const MetaData = {
  defaultSitename: "Piqel",
  defaultTitle: "Cryptocurrency Tracker",
  defaultDescription: "Real-time crypto price monitoring and virtual portfolio management",
  defaultKeywords: "crypto, cryptocurrency, bitcoin, ethereum, crypto tracker, crypto prices",
  defaultAuthor: "OBLONG",
  defaultAuthorUrl: "https://oblong.digital/",
};

export const Links = [
  { name: "Trending", href: "/coins/trending" },
  {
    name: "Coins",
    href: "/coins",
  },
  { name: "Categories", href: "/categories" },
  { name: "Portfolio", href: "/portfolio" },
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
  "fiat24-chf",
  "fiat24-eur",
  "anchored-coins-chf",
  "alpha-zchf-vault",
];
