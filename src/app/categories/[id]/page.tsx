import { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import CategoryCoinsList from "@/components/coins/CategoryCoinsList";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const { id } = await params;
  const cleanedId = decodeURIComponent(id).trim();

  return {
    title: cleanedId,
    description: `Explore the ${cleanedId} category to discover a wide range of cryptocurrencies that fall under this classification.`,
  };
}

const CategoryIdPage = async ({ params }: Props) => {
  const { id } = await params;

  const cleanedId = decodeURIComponent(id).trim();

  return (
    <article>
      <Hero title={cleanedId} className="!mb-0" />
      <Suspense>
        <CategoryCoinsList id={cleanedId} />
      </Suspense>
    </article>
  );
};

export default CategoryIdPage;
