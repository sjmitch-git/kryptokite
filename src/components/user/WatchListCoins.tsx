"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SortbyData from "@/data/watchlist_sortby.json";
import { Pagination, Alert, Input, Loading, Dialog, Button } from "@/lib/fluid";
import { useUser } from "@/lib/contexts/UserContext";
import { CoinDetails as Coin } from "@/lib/types";
import WatchListItem from "./WatchListItem";
import FilterGroup from "@/components/ui/FilterGroup";

const WatchListCoins = () => {
  const { userCoins, removeUserCoin, preferredCurrency } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currency, setCurrency] = useState("");
  const [sortBy, setSortBy] = useState("rank-desc");

  useEffect(() => {
    setCurrency(preferredCurrency);
  }, [preferredCurrency]);

  useEffect(() => {
    const fetchCoinData = async () => {
      const ids = userCoins.map((coin) => coin.id).join(",");

      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/markets/${ids}?vs_currency=${currency}&order=market_cap_desc&sparkline=false`
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Failed to fetch coin market data", error);
      } finally {
        setLoading(false);
      }
    };
    if (currency) fetchCoinData();
  }, [currency]);

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

  const openDialog = (id: string) => {
    setIsOpen(true);
    setSelectedCoin(id);
  };

  const handleDeleteCoin = () => {
    removeUserCoin(selectedCoin);
    setCoinData((prevData) => prevData.filter((coin) => coin.id !== selectedCoin));
    setIsOpen(false);

    const totalPages = Math.ceil((coinData.length - 1) / perPage);

    if (page > totalPages) {
      setPage(page - 1);
      const query = new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        page: (page - 1).toString(),
      }).toString();
      router.push(`${pathname}?${query}`);
    }
  };

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
      sortBy: newSortBy,
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const sortCoins = (coins: Coin[]) => {
    if (coins.length === 0) return coins;
    switch (sortBy) {
      case "rank-desc":
        return [...coins].sort((a, b) => a.market_cap_rank - b.market_cap_rank);
      case "rank-asc":
        return [...coins].sort((a, b) => b.market_cap_rank - a.market_cap_rank);
      case "name-asc":
        return [...coins].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...coins].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...coins].sort((a, b) => a.current_price - b.current_price);
      case "price-desc":
        return [...coins].sort((a, b) => b.current_price - a.current_price);
      case "change-asc":
        return [...coins].sort(
          (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
        );
      case "change-desc":
        return [...coins].sort(
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );
      default:
        return coins;
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const filteredCoins = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedCoins = sortCoins(filteredCoins);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCoins = sortedCoins.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loading loadingColor="info" size="lg" />
      </div>
    );
  }

  return (
    <div>
      {userCoins.length === 0 ? (
        <div>
          <Alert message="No coins in your collection." />
        </div>
      ) : (
        <div className="space-y-4 px-2 md:px-4 lg:px-0">
          {userCoins.length > perPage && (
            <FilterGroup
              filterPlaceholder="Filter coins by name"
              filterText={filterText}
              handleFilterChange={handleFilterChange}
              sortBy={sortBy}
              sortbyData={SortbyData}
              handleSortChange={handleSortChange}
            />
          )}

          <ul className="mb-8 space-y-2 md:space-y-4">
            {currentCoins.map((coin) => (
              <WatchListItem
                key={coin.id}
                coin={coin}
                openDialog={openDialog}
                preferredCurrency={preferredCurrency}
              />
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
                />
              )}
            </div>
          )}
        </div>
      )}
      <Dialog
        open={isOpen}
        modal={true}
        title="Delete Coin?"
        titleSize="lg"
        titleBold={true}
        onClose={() => setIsOpen(false)}
      >
        <div>
          <form
            className="p-4 flex justify-between gap-16"
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteCoin();
            }}
          >
            <div className="grid grid-cols-2 w-full">
              <Button btnBackground="dark" btnColor="light" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button btnBackground="danger" type="submit">
                Delete
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default WatchListCoins;
