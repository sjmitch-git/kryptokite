import { blueGray } from "tailwindcss/colors";

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
  { name: "Categories", href: "/categories" },
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
    body: "Top trending coins and categories",
    img: "/trending.svg",
  },
  {
    title: "Smart Contract Platform",
    href: "/categories/Smart Contract Platform",
    linkLabel: "Smart Contract Platform",
    body: "Smart contract platforms are usually blockchains that host smart contracts or decentralized applications.",
    img: "/smart_contract.svg",
  },
  {
    title: "Stablecoins",
    href: "/categories/Stablecoins",
    linkLabel: "Stablecoins",
    body: "A stablecoin is a type of cryptocurrency that is designed to maintain a stable value by being pegged to an external reference, such as a fiat currency.",
    img: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png",
    bg: "bg-[#2276cb]",
  },
  {
    title: "Defi",
    href: "/categories/Decentralized Finance (DeFi)",
    linkLabel: "DeFi",
    body: "Decentralized Finance, is a financial system that operates without central authorities or intermediaries, using blockchain technology and smart contracts to provide a range of financial services such as lending, borrowing, and trading.",
    img: "https://coin-images.coingecko.com/coins/images/13442/small/steth_logo.png",
    bg: "bg-white",
  },
  {
    title: "Meme Coins",
    href: "/categories/Meme",
    linkLabel: "Meme Coins",
    body: "Meme coins derive their relevance from memes, thriving on hype and picking up momentum as the community grows. coins.",
    img: "https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png",
    bg: "bg-[#bba030]",
  },
  {
    title: "Bitcoin",
    href: "/coins/bitcoin",
    linkLabel: "Bitcoin",
    body: "Bitcoin is the first successful internet money based on peer-to-peer technology",
    img: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png",
    bg: "bg-[#f7931a]",
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
  "fiat24-chf",
  "fiat24-eur",
  "anchored-coins-chf",
  "alpha-zchf-vault",
];
