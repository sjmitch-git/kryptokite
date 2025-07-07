import HomeNav from "@/components/HomeNav";
import { MetaData } from "@/lib/config";

export default function HomePage() {
  return (
    <article className="flex flex-col items-center justify-center bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary from-20% to-primary-dark to-90% text-light space-y-8 px-4 min-h-[75vh]">
      <h1 className="text-xl">{MetaData.defaultTitle}</h1>
      <img src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`} alt="Logo" width="500" height="110" />
      <p className="text-lg text-center">{MetaData.defaultDescription} </p>
      <HomeNav />
    </article>
  );
}
