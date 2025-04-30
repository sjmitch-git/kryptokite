export type SimpleCoin = {
  id: string;
  name: string;
  symbol: string;
  [key: string]: string | number;
};

export type CategoryMarket = {
  id: string;
  name: string;
  content: string;
  top_3_coins: string[];
  top_3_coins_id: string[];
};

export type Category = {
  category_id: string;
  name: string;
};

export type MarketDataCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  ath: number;
  atl: number;
  last_updated: string;
};

export type CategoryCoin = MarketDataCoin;

export type MarketData = {
  coins: MarketDataCoin[];
  date: string;
};

export type TrendingCoin = {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    data: {
      price: number;
      price_change_percentage_24h: {
        [key: string]: number;
      };
    };
  };
};

export type TrendingCategory = {
  coins_count: string;
  slug: string;
  name: string;
  market_cap_1h_change: number;
  data: {
    market_cap: number;
    market_cap_change_percentage_24h: {
      [key: string]: number;
    };
    sparkline: string;
    total_volume: number;
  };
};

export type Coin = SimpleCoin & {
  sentiment_votes_down_percentage: number;
  sentiment_votes_up_percentage: number;
  market_cap_rank: number;
  public_notice?: string;
  last_updated: string;
  description: {
    en: string;
  };
  categories: string[];
  market_data: {
    market_cap_change_percentage_24h: number;
    current_price: {
      [key: string]: number;
    };
    ath: {
      [key: string]: number;
    };
    atl: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    price_change_1h_in_currency: {
      [key: string]: number;
    };
    price_change_24h_in_currency: {
      [key: string]: number;
    };
    price_change_7d_in_currency: {
      [key: string]: number;
    };
    price_change_14d_in_currency: {
      [key: string]: number;
    };
    price_change_30d_in_currency: {
      [key: string]: number;
    };
    price_change_60d_in_currency: {
      [key: string]: number;
    };
    price_change_200d_in_currency: {
      [key: string]: number;
    };
    price_change_1y_in_currency: {
      [key: string]: number;
    };
    sparkline_7d: {
      price: number[];
    };
  };
  image: {
    [key: string]: string;
  };
  links: {
    twitter_screen_name: string;
    homepage: string[];
    whitepaper: string;
    official_forum_url: string[];
    repos_url: {
      github: string[];
    };
    subreddit_url: string;
  };
};

export type CoinDetails = SimpleCoin & {
  image: string;
  current_price: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  last_updated: string;
};

export type StoredCoin = {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  priceAtPurchase: number;
  current_price: number;
  image: string;
  createdAt: string;
};

export type Store = {
  id: string;
  name: string;
  coins: StoredCoin[];
  coinIds: string[];
  balance: number;
  createdAt: string;
  description?: string;
};

export type UserContextType = {
  userCoins: SimpleCoin[];
  addUserCoin: (coin: SimpleCoin) => void;
  removeUserCoin: (coinId: string) => void;
  isCoinInCollection: (coinId: string) => boolean;

  stores: Store[];
  addStore: (name: string, description?: string) => void;
  removeStore: (storeId: string) => void;
  addCoinToStore: (
    storeId: string,
    coin: SimpleCoin,
    purchaseAmount: number,
    coinPrice: number,
    cost: number,
    image: string
  ) => void;
  removeCoinFromStore: (storeId: string, coinId: string, totalValue: number) => void;
  getStoreById: (storeId: string) => Store | undefined;
  updateStoreDescription: (storeId: string, description: string) => void;

  preferredCurrency: string;
  setPreferredCurrency: (currency: string) => void;

  loadingCoins: boolean;
  loadingStores: boolean;
};

export { currencySymbols } from "./types/currencySymbols";
