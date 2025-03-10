import Hero from "@/components/Hero";
import TrendingSearch from "@/components/trending/TrendingSearch";

export default function Home() {
  return (
    <article>
      <Hero title="Home" description="Page description" />
      <div className="">
        <TrendingSearch />
      </div>
    </article>
  );
}
