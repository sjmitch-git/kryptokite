"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { SimpleCoin as Coin } from "@/lib/types";
import SortbyData from "@/data/coins_sortby.json";
import { Loading, Pagination, Alert } from "@/lib/fluid";
import { useCoins } from "@/lib/contexts/CoinsContext";
import WatchlistToggle from "@/components/ui/WatchlistToggle";
import FilterGroup from "@/components/ui/FilterGroup";

const CoinsList = () => {
  const { coins, loading, error } = useCoins();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("name-desc");

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    const queryFilter = searchParams.get("filter") || "";
    const querySortBy = searchParams.get("sortBy") || "rank-desc";

    if (!isNaN(queryPage) && queryPage > 0) {
      setPage(queryPage);
    }

    setFilterText(queryFilter);
    setSortBy(querySortBy);
  }, [searchParams]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterText = event.target.value;
    setFilterText(newFilterText);
    setPage(1);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: "1",
      filter: newFilterText,
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: "1",
      sortBy: newSortBy,
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

  const sortCoins = (coins: Coin[]) => {
    switch (sortBy) {
      case "name-asc":
        return [...coins].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...coins].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return coins;
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filterText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedCoins = sortCoins(filteredCoins);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCoins = sortedCoins.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center">
          <Loading loadingColor="info" size="lg" />
        </div>
      ) : error ? (
        <Alert status="error" message={error} />
      ) : (
        <div className="space-y-4 px-2 md:px-4 lg:px-0">
          <FilterGroup
            filterPlaceholder="Filter coins by name"
            filterText={filterText}
            handleFilterChange={handleFilterChange}
            sortBy={sortBy}
            sortbyData={SortbyData}
            handleSortChange={handleSortChange}
          />
          <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentCoins.map((coin) => (
              <li
                key={coin.id}
                className="p-4 bg-white dark:bg-black shadow relative flex justify-between items-center text-xl"
              >
                <div>
                  <p className="font-semibold">
                    <Link
                      href={{
                        pathname: `/coins/${coin.id}`,
                      }}
                      title="See more details about this coin"
                      className="text-primary hover:underline"
                    >
                      {coin.name}
                    </Link>
                  </p>
                  <p className="text-base text-gray-500">{coin.symbol.toUpperCase()}</p>
                </div>
                <WatchlistToggle id={coin.id} name={coin.name} symbol={coin.symbol} />
              </li>
            ))}
          </ul>

          {filteredCoins.length > perPage && (
            <div className="pagination-wrapper">
              {filteredCoins.length !== 0 && (
                <Pagination
                  page={page.toString()}
                  results={filteredCoins.length}
                  range={perPage}
                  onChange={handlePageChange}
                  btnShape="circle"
                  gap="md"
                  size="lg"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinsList;
