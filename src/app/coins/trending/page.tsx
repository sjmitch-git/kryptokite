import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrendingSearch from "@/components/trending/TrendingSearch";

const title = "Trending Coins";
const description = "Top 15 trending coins (sorted by the most popular user searches)";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function TrendingPage() {
  return (
    <article>
      <Hero title={title} description={description} />
      <TrendingSearch />
    </article>
  );
}
