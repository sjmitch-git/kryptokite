import Hero from "@/components/Hero";
import TrendingSearch from "@/components/trending/TrendingSearch";
import { MetaData } from "@/lib/config";

export default function Home() {
  return (
    <article>
      <Hero title={MetaData.defaultTitle} description={MetaData.defaultDescription} />
      <div className="">
        <TrendingSearch />
      </div>
    </article>
  );
}
