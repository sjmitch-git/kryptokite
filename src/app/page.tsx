import Hero from "@/components/Hero";
import HomeNav from "@/components/HomeNav";
import { MetaData } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      <Hero title={MetaData.defaultTitle} description={MetaData.defaultDescription} />
      <HomeNav />
    </>
  );
}
