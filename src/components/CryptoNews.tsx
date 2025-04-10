"use client";

import { useState, useEffect } from "react";
import {Heading, Alert, Loading} from '@/lib/fluid';
import {formatDate} from '@/lib/utils';

const CryptoNews = () => {
  const [newsUrl, setNewsUrl] = useState<string | null>(null);
  const [sections, setSections] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsUrl = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/news`);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();

        setNewsUrl(data.url);
        console.log('data', data.url)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchNewsUrl();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(newsUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const parsedContent = JSON.parse(data.content);
        setSections(parsedContent.sections);
        setDate(data.date);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (newsUrl) fetchData();
  }, [newsUrl]);

  if (loading) {
    return <div className="flex justify-center p-8">
          <Loading message='Fetching latest crypto news' size='lg' loadingColor="info" />
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
      <p className='mb-4'><em>Published: {formatDate(date)}</em></p>
      <div className='space-y-8'>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className='section'>
            <Heading level={3}>{section.headline}</Heading>
            <p className='max-w-prose text-lg'>{section.body}</p>
          </div>
        ))
      ) : (
        <Alert message='No news available' status="warning" />
      )}
      </div>
    </div>
  );
};

export default CryptoNews;
