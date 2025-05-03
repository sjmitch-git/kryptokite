import Hero from "@/components/Hero";
import HomeNav from "@/components/HomeNav";
import CryptoNews from "@/components/CryptoNews";
import { MetaData } from "@/lib/config";

export default function HomePage() {
  return (
    <article>
      <Hero title={MetaData.defaultTitle} description={MetaData.defaultDescription} />
      <CryptoNews />
      <hr className="hr" />
      <HomeNav />
    </article>
  );
}
