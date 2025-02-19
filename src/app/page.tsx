import Hero from "@/components/Hero";

export default function Home() {
  return (
    <article>
      <Hero title="Home" description="Page description" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
    </article>
  );
}
