export type SimpleCoin = {
  id: string;
  name: string;
  symbol: string;
  [key: string]: string | number;
};

export type TrendingCoin = {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    data: {
      sparkline: string;
    };
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
  market_data: {
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
