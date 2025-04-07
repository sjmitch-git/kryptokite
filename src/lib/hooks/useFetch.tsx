"use client";

import { useState, useEffect } from "react";
import { NEXT_PUBLIC_API_URL } from "@/lib/constants";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T,>(url: string) => {
  const [result, setResult] = useState<FetchResult<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!url) {
      setResult({ data: null, loading: false, error: "No URL provided" });
      return;
    }

    const fetchData = async () => {
      setResult({ data: null, loading: true, error: null });
      console.log("fetch url", `${NEXT_PUBLIC_API_URL}${url}`);
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from URL: ${url}`);
        }
        const data = await response.json();
        setResult({ data, loading: false, error: null });
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setResult({ data: null, loading: false, error: error.message });
      }
    };

    fetchData();
  }, [url]);

  return result;
};
