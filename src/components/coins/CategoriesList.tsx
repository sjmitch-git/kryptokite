"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Loading, Pagination, Alert, Input } from "@/lib/fluid";
import { useCoins } from "@/lib/contexts/CoinsContext";
import CoinThumb from "@/components/ui/CoinThumb";

const CategoriesList = () => {
  const { categories, loading, error } = useCoins();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    const queryFilter = searchParams.get("filter") || "";

    if (!isNaN(queryPage) && queryPage > 0) {
      setPage(queryPage);
    }

    setFilterText(queryFilter);
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

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCategories = filtered.slice(startIndex, endIndex);

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
          <Input
            type="text"
            placeholder="Search categories..."
            value={filterText}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <ul className="space-y-2 md:space-y-4">
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <li
                  key={category.id}
                  className="flex flex-col text-lg md:text-xl space-y-2 md:space-y-4 shadow p-2 md:p-4 border border-neutral-200 bg-white"
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
                        <Link
                          key={id}
                          href={`/coins/${id}`}
                          title="See more details about this coin"
                          className="text-primary hover:underline font-semibold text-lg md:text-xl"
                        >
                          <CoinThumb src={category.top_3_coins[index]} alt={id} size={32} />
                        </Link>
                      ))}
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
              <li className="p-4">
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
