import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrendingSearch from "@/components/trending/TrendingSearch";

const title = "Trending Coins";
const description = "Top 15 coins searched for by users.";

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
