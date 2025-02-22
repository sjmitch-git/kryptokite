"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Loading, Pagination, Alert, Input } from "@/lib/fluid";
import { useCoins } from "@/lib/contexts/CoinsContext";
import { useUser } from "@/lib/contexts/UserContext";
import { FaStar } from "react-icons/fa";
import { Coin } from "@/lib/types";

const CoinsList = () => {
  const { coins, loading, error } = useCoins();
  const { addUserCoin, removeUserCoin, isCoinInCollection } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    if (!isNaN(queryPage) && queryPage > 0) {
      setPage(queryPage);
    }
  }, [searchParams]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPage(1);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: "1",
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const handleToggleCoin = (coin: Coin) => {
    if (isCoinInCollection(coin.id)) {
      removeUserCoin(coin.id);
    } else {
      addUserCoin(coin);
    }
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
              <li
                key={coin.id}
                className="p-2 border border-gray-300 flex justify-between items-center text-lg"
              >
                <Link
                  href={{
                    pathname: `/coins/${coin.id}`,
                    query: { vs_currency: "usd", name: coin.name },
                  }}
                >
                  {coin.name} <small>({coin.symbol.toUpperCase()})</small>
                </Link>
                <button
                  onClick={() => handleToggleCoin(coin)}
                  className={`${isCoinInCollection(coin.id) ? "text-yellow-500" : "text-gray-500"}`}
                >
                  <FaStar className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
          <div>
            {filteredCoins.length !== 0 && (
              <Pagination
                page={page.toString()}
                results={filteredCoins.length}
                range={perPage}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinsList;
