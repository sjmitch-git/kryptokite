"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SortbyData from "@/data/category_sortby.json";
import type { CategoryCoin as Coin, CategoryMarket } from "@/lib/types";
import { useUser } from "@/lib/contexts/UserContext";
import { useCoins } from "@/lib/contexts/CoinsContext";
import CategoryCoinItem from "@/components/coins/CategoryCoinItem";
import { Loading, Alert, Pagination } from "@/lib/fluid";
import FilterGroup from "@/components/ui/FilterGroup";

type Props = {
  id: string;
};

const CategoryCoinsList = ({ id }: Props) => {
  const { preferredCurrency } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState("");
  const { categories } = useCoins();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [description, setDescription] = useState("");
  const [sortBy, setSortBy] = useState("rank-desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/coins/categories/${resolvedId}?vs_currency=${preferredCurrency}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coins for category id ${resolvedId}`);
        }

        const data: Coin[] = await response.json();

        if (Array.isArray(data)) {
          setCoins(data);
        } else {
          console.error("Unexpected API response:", data);
          setCoins([]);
        }
      } catch (err) {
        console.error("Error fetching coins:", err);
        setError("Failed to load coins. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (resolvedId) fetchData();
  }, [resolvedId, preferredCurrency]);

  useEffect(() => {
    if (categories.length > 0) {
      const foundCategory = categories.find((category: CategoryMarket) => category.name === id);
      if (foundCategory) {
        setDescription(foundCategory.content);
        setResolvedId(foundCategory.id);
      } else {
        setResolvedId(id);
      }
    }
  }, [categories, id]);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    }).toString();
    router.push(`${pathname}?${query}`);
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
      page: "1",
      sortBy: newSortBy,
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const sortCoins = (coins: Coin[]) => {
    switch (sortBy) {
      case "rank-asc":
        return [...coins].sort((a, b) => a.market_cap - b.market_cap);
      case "rank-desc":
        return [...coins].sort((a, b) => b.market_cap - a.market_cap);
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

  const filteredCoins = Array.isArray(coins)
    ? coins.filter((coin) => coin.name.toLowerCase().includes(filterText.toLowerCase()))
    : [];

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

  if (error) {
    return (
      <div>
        <Alert title="Error" message={error} />
      </div>
    );
  }

  return (
    <>
      {description && (
        <p className="text-xl max-w-prose mb-4 md:mb-8 lg:mb-12 px-2 md:px-4 lg:px-0">
          {description}
        </p>
      )}
      <div className="mb-8 px-2 lg:px-0 space-y-4">
        {coins.length > perPage && (
          <FilterGroup
            filterPlaceholder="Filter coins by name"
            filterText={filterText}
            handleFilterChange={handleFilterChange}
            sortBy={sortBy}
            sortbyData={SortbyData}
            handleSortChange={handleSortChange}
          />
        )}

        <ul className="space-y-2 md:space-y-4">
          {currentCoins.length > 0 ? (
            currentCoins.map((coin) => (
              <CategoryCoinItem key={coin.id} coin={coin} preferredCurrency={preferredCurrency} />
            ))
          ) : (
            <li className="p-4">
              <Alert status="error" message={"No coins found"} />
            </li>
          )}
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
    </>
  );
};

export default CategoryCoinsList;
