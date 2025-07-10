"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { CategoryMarket } from "@/lib/types";
import SortbyData from "@/data/categories_sortby.json";
import { Loading, Pagination, Alert } from "@/lib/fluid";
import FilterGroup from "@/components/ui/FilterGroup";
import { useCoins } from "@/lib/contexts/CoinsContext";
import CoinThumb from "@/components/ui/CoinThumb";
import { FaCaretDown, FaCaretUp } from "@/components/ui/CustomIcons";

const CategoriesList = () => {
  const { categories, loading, error } = useCoins();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("rank-desc");

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    const queryFilter = searchParams.get("filter") || "";
    const querySortBy = searchParams.get("sortby") || "rank-desc";

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortby: newSortBy,
    }).toString();
    router.push(`${pathname}?${query}`);
  };

  const sort = (items: CategoryMarket[]) => {
    switch (sortBy) {
      case "rank-asc":
        return [...items].sort((a, b) => a.market_cap - b.market_cap);
      case "rank-desc":
        return [...items].sort((a, b) => b.market_cap - a.market_cap);
      case "name-asc":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...items].sort((a, b) => b.name.localeCompare(a.name));
      case "change-asc":
        return [...items].sort((a, b) => a.market_cap_change_24h - b.market_cap_change_24h);
      case "change-desc":
        return [...items].sort((a, b) => b.market_cap_change_24h - a.market_cap_change_24h);
      default:
        return items;
    }
  };

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sorted = sort(filtered);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCategories = sorted.slice(startIndex, endIndex);

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
            filterPlaceholder="Filter categories by name"
            filterText={filterText}
            handleFilterChange={handleFilterChange}
            sortBy={sortBy}
            sortbyData={SortbyData}
            handleSortChange={handleSortChange}
          />

          <ul className="space-y-2 md:space-y-4">
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <li
                  key={category.id}
                  className="flex flex-col text-lg md:text-xl space-y-2 md:space-y-4 shadow p-2 md:p-4 border border-neutral-200 dark:border-none bg-white dark:bg-black"
                >
                  <div className="flex justify-between items-center space-x-2 md:space-x-4">
                    <Link
                      href={`/categories/${category.name}`}
                      title="See more details about this category"
                      className="text-primary hover:underline font-semibold text-lg md:text-xl"
                    >
                      {category.name}
                    </Link>
                    <div className="flex gap-4 items-center">
                      {category.top_3_coins_id.map((id, index) => (
                        <Link key={id} href={`/coins/${id}`} title={`See more details about ${id}`}>
                          <CoinThumb src={category.top_3_coins[index]} alt={id} size={32} />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <div className="flex flex-col items-start">
                      <p className="text-base text-gray-500">Market Cap</p>
                      <p className="text-lg font-semibold">
                        {category.market_cap &&
                          category.market_cap.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                      </p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-sm text-gray-500">Market Cap Change</p>
                      <p
                        className={`text-lg font-semibold flex gap-1 ${
                          category.market_cap_change_24h >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {category.market_cap_change_24h >= 0 ? (
                          <FaCaretUp
                            size={"1.5rem"}
                            title="24h change"
                            className={`${category.market_cap_change_24h === 0 && "rotate-90"}`}
                          />
                        ) : (
                          <FaCaretDown size={"1.5rem"} title="24h change" />
                        )}
                        {category.market_cap_change_24h?.toFixed(2)}%
                      </p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-sm text-gray-500">24h Volume</p>
                      <p className="text-lg font-semibold">
                        {category.volume_24h &&
                          category.volume_24h.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                      </p>
                    </div>
                  </div>
                  {category.content && category.content !== "coins" && (
                    <div>
                      <p className="text-base ">{category.content} coins</p>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="py-4">
                <Alert status="error" message={"No categories found"} />
              </li>
            )}
          </ul>
          {filtered.length > perPage && (
            <div className="pagination-wrapper">
              {filtered.length !== 0 && (
                <Pagination
                  page={page.toString()}
                  results={filtered.length}
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

export default CategoriesList;
