"use client";

import Link from "next/link";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import React, { useState, useEffect } from "react";
import { Heading, Alert, Loading, Accordion, AccordionItem } from "@/lib/fluid";
import { formatDate } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/constants";
import { useCoins } from "@/lib/contexts/CoinsContext";

interface NewsSection {
  headline: string;
  body: string;
}

const CryptoNews = () => {
  const { sections, date, setNewsData } = useCoins();
  const [newsSections, setNewsSections] = useState<NewsSection[]>([]);
  const [newsDate, setNewsDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${NEXT_PUBLIC_API_URL}api/news/get`);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();
        setNewsSections(data.sections);
        setNewsDate(data.date);
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
    } else {
      setNewsSections(sections);
      setNewsDate(date);
    }
  }, [sections, date, setNewsData]);

  if (error) {
    return (
      <div className="p-4">
        <Alert message={error} title="Error" status="error" />
      </div>
    );
  }

  return (
    <div className="crypto-news mb-8 px-2 md:px-4 lg:px-0">
      <Heading level={2}>Crypto News</Heading>
      {loading && (
        <div className="flex justify-center p-8">
          <Loading caption="Fetching latest crypto news" size="lg" loadingColor="info" />
        </div>
      )}
      {newsDate && !isNaN(new Date(newsDate).getTime()) && (
        <p className="mb-4">
          <em>Published: {formatDate(date)}</em>
        </p>
      )}
      <div className="flex flex-col gap-4">
        {sections.length > 0 && (
          <Accordion layout="spaced" size="md" opened={open}>
            {newsSections.map((section, index) => (
              <AccordionItem
                id={index.toString()}
                key={index}
                title={section.headline}
                open={open}
                setOpen={setOpen}
                layoutClasses=""
                icon="arrow"
              >
                <div className="news border border-slate-200 ">
                  <p className="news-section md:py-4 px-2 md:px-4 max-w-prose text-lg">
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
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default CryptoNews;
