import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrendingSearch from "@/components/trending/TrendingSearch";

const title = "Trending";
const description = "Top trending coins and categories (sorted by the most popular user searches)";

export const metadata: Metadata = {
  title: "Trending crypto coins and categories",
  description: description,
};

export default function TrendingPage() {
  return (
    <>
      <Hero title={title} description={`${description}. Price values are in USD`} />
      <TrendingSearch />
    </>
  );
}
