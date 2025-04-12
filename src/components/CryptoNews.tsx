"use client";

import Link from "next/link";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import React, { useState, useEffect } from "react";
import { Heading, Alert, Loading } from "@/lib/fluid";
import { formatDate } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/constants";
import { useCoins } from "@/lib/contexts/CoinsContext";

const CryptoNews = () => {
  const { sections, date, setNewsData } = useCoins();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${NEXT_PUBLIC_API_URL}api/news/get`);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();

        setNewsData(data.sections, data.date);
        setLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (sections.length === 0) {
      fetchData();
    }
  }, [sections, setNewsData]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loading caption="Fetching latest crypto news" size="lg" loadingColor="info" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <Alert message={error} title="Error" status="error" />
      </div>
    );
  }

  return (
    <div className="crypto-news mb-8 px-2 md:px-4 lg:px-0">
      <Heading level={2}>Crypto News</Heading>
      {date && !isNaN(new Date(date).getTime()) && (
        <p className="mb-4">
          <em>Published: {formatDate(date)}</em>
        </p>
      )}
      <div className="space-y-8">
        {sections.length > 0
          ? sections.map((section, index) => (
              <div key={index} className="section">
                <Heading level={3}>{section.headline}</Heading>
                <p className="news-section max-w-prose text-lg">
                  {parse(section.body, {
                    replace: (domNode) => {
                      if (
                        domNode instanceof Element &&
                        domNode.name === "span" &&
                        domNode.attribs.class
                      ) {
                        const coinId = domNode.attribs.class;
                        const coinName = domToReact(domNode.children as DOMNode[]);
                        return (
                          <Link href={`/coins/${coinId}`} className="coin-link">
                            <strong>{coinName}</strong>
                          </Link>
                        );
                      }
                    },
                  })}
                </p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default CryptoNews;
