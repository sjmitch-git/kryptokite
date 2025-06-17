import HomeNav from "@/components/HomeNav";
import { MetaData } from "@/lib/config";

export default function HomePage() {
  return (
    <article className="flex flex-col items-center justify-center size-full bg-gradient-to-b from-primary-dark from-20% to-primary-light to-90% text-light space-y-8 px-4">
      <h1 className="font-mono text-xl">{MetaData.defaultTitle}</h1>
      <img src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`} alt="Logo" width="500" height="110" />
      <p className="text-lg text-center font-mono">{MetaData.defaultDescription} </p>
      <HomeNav />
    </article>
  );
}
