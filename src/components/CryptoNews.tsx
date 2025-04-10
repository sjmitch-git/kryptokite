"use client";

import { useState, useEffect } from "react";
import {Heading, Alert, Loading} from '@/lib/fluid';
import {formatDate} from '@/lib/utils';
import {NEXT_PUBLIC_API_URL} from '@/lib/constants';

interface NewsSection {
  headline: string;
  body: string;
}

const CryptoNews = () => {
  const [newsUrl, setNewsUrl] = useState<string | null>(null);
  const [sections, setSections] = useState<NewsSection[]>([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewsUrl = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}api/news`);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();

        setNewsUrl(data.url);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    setLoading(true);
    fetchNewsUrl();
  }, []);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const parsedContent = JSON.parse(data.content);
        setSections(parsedContent.sections);
        setDate(data.date);
        setLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (newsUrl) fetchData(newsUrl);
  }, [newsUrl]);

  if (loading) {
    return <div className="flex justify-center p-8">
          <Loading caption='Fetching latest crypto news' size='lg' loadingColor="info" />
        </div>;
  }

  if (error) {
    return <div className="flex justify-center p-8">
          <Alert message={error} title='Error' status="error" />
        </div>;
  }

  return (
    <div className="crypto-news mb-8 px-2 md:px-4 lg:px-0">
      <Heading level={2}>Crypto News</Heading>
      {date && !isNaN(new Date(date).getTime()) && (
        <p className='mb-4'><em>Published: {formatDate(date)}</em></p>
      )}
      <div className='space-y-8'>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className='section'>
            <Heading level={3}>{section.headline}</Heading>
            <p
                className='max-w-prose text-lg'
                dangerouslySetInnerHTML={{
                  __html: section.body.replace(
                    /<span class='([^']+)'>([^<]+)<\/span>/g,
                    `<a href="/coins/$1" class="coin-link"><span class='$1'>$2</span></a>`
                  ),
                }}
              />
          </div>
        ))
      ) : (
       ''
      )}
      </div>
    </div>
  );
};

export default CryptoNews;
