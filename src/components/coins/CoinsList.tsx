"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loading, Pagination, Alert, Input } from "@/lib/fluid";
import { Coin } from "@/lib/types";

const CoinsList = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("/api/coins");
        if (!response.ok) {
          throw new Error("Failed to fetch coins list");
        }
        const data = await response.json();
        setCoins(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [perPage]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPage(1);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filterText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filterText.toLowerCase())
  );

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCoins = filteredCoins.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : error ? (
        <Alert status="error" message={error} />
      ) : (
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Filter coins"
            value={filterText}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <ul className="space-y-2">
            {currentCoins.map((coin) => (
              <li key={coin.id} className="p-2 border border-gray-300">
                <Link
                  href={{
                    pathname: `/coins/${coin.id}`,
                    query: { vs_currency: "usd", name: coin.name },
                  }}
                >
                  {coin.name} <small>({coin.symbol.toUpperCase()})</small>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            {filteredCoins.length !== 0 && (
              <Pagination
                page={page.toString()}
                results={filteredCoins.length}
                range={perPage}
                onChange={(newpage) => setPage(newpage)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinsList;
