"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination, Alert, Input, Loading, Dialog, Button } from "@/lib/fluid";
import { useUser } from "@/lib/contexts/UserContext";
import { FaTrash, FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";
import { CoinDetails as Coin } from "@/lib/types";
import CoinThumb from "@/components/ui/CoinThumb";
import { formatNumber } from "@/lib/utils";

const WatchListCoins = () => {
  const { userCoins, removeUserCoin, preferredCurrency, loadingCoins } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    const fetchCoinData = async () => {
      if (userCoins.length === 0 || coinData.length) return;

      const ids = userCoins.map((coin) => coin.id).join(",");
      try {
        const response = await fetch(
          `/api/markets/${ids}?vs_currency=${preferredCurrency}&order=market_cap_desc&sparkline=false`
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Failed to fetch coin market data", error);
      }
    };
    fetchCoinData();
  }, [userCoins]);

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    if (!isNaN(queryPage) && queryPage > 0) {
      setPage(queryPage);
    }
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

  const filteredCoins = coinData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filterText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filterText.toLowerCase())
  );

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCoins = filteredCoins.slice(startIndex, endIndex);

  if (loadingCoins) {
    return (
      <div>
        <Loading loadingColor="info" />
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
          <Input
            type="search"
            placeholder="Filter coins"
            value={filterText}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <table className="table w-full text-lg mb-8">
            <thead>
              <tr className="font-semibold hidden md:table-row border-b border-neutral">
                <th className="text-right p-4">Rank</th>
                <th></th>
                <th className="text-left p-4">Coin</th>
                <th className="text-right p-4">Price</th>
                <th className="text-right p-4">24h Change</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin) => (
                <tr key={coin.id} className="bg-white border-b border-neutral">
                  <td className="text-right hidden md:table-cell p-4">#{coin.market_cap_rank}</td>
                  <td className="hidden md:table-cell text-center p-4">
                    <CoinThumb src={coin.image} alt={coin.name} size={50} />
                  </td>
                  <td className="text-left p-2 md:p-4 text-xl font-semibold">
                    <Link
                      href={{
                        pathname: `/coins/${coin.id}`,
                      }}
                      title="See more dtails about this coin"
                      className="text-blue-500 hover:underline"
                    >
                      {coin.name}
                    </Link>{" "}
                    <sup className="font-normal hidden md:inline">
                      ({coin.symbol.toUpperCase()})
                    </sup>
                  </td>
                  <td className="text-right p-4 font-semibold hidden md:table-cell">
                    {formatNumber(coin.current_price)}
                  </td>
                  <td className={`text-right p-2 md:p-4`}>
                    {coin.price_change_percentage_24h > 0 ? (
                      <span className="text-green-500 flex flex-row-reverse items-center">
                        <FaCaretUp size={"3rem"} title="24h price change %" />{" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex flex-row-reverse items-center">
                        <FaCaretDown size={"3rem"} title="24h price change %" />{" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    )}
                  </td>
                  <td className="text-right p-2 md:p-4">
                    <button
                      suppressHydrationWarning={true}
                      onClick={() => openDialog(coin.id)}
                      className="text-warning"
                      title="Delete coin?"
                    >
                      <FaTrash className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7} className="text-left text-sm pl-2 md:pl-0 pt-4">
                  Note: Currency in {preferredCurrency.toUpperCase()}
                </td>
              </tr>
            </tfoot>
          </table>

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
            <Button btnBackground="light" btnColor="dark" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button btnBackground="danger" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default WatchListCoins;
