"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/lib/contexts/UserContext";
import { Loading, Alert } from "@smitch/fluid";

const StoresList = () => {
  const { stores, loadingStores } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(loadingStores);
  }, [loadingStores]);

  return (
    <>
      <div className="section">
        <h2 className="text-xl font-bold">Your Collections</h2>
        {loading ? (
          <Loading loadingColor="info" />
        ) : stores.length === 0 ? (
          <Alert message={"You don't have any collections yet. Create one now!"} />
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {stores.map((store) => (
              <li
                key={store.id}
                className="group flex flex-col justify-between space-y-4 rounded shadow-md bg-slate-100 dark:bg-slate-800 hover:opacity-90 transition-opacity duration-200"
              >
                <Link
                  href={`/portfolio/${store.name}`}
                  title="See more details about this collection"
                  className="p-4"
                >
                  <h3 className="font-semibold text-lg uppercase">{store.name}</h3>
                  {store.description && <p className="lineclamp-2">{store.description}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default StoresList;
