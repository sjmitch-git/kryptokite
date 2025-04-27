import type { Metadata } from "next";
import { Suspense } from "react";

import Hero from "@/components/Hero";
import CategoriesList from "@/components/coins/CategoriesList";

const title = "Coin Categories";
const description =
  "Explore coin categories. Click on any category to get detailed information including current prices, market caps, trading volumes, and price changes. Stay informed with the latest data and trends in the crypto market.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function CategoriesPage() {
  return (
    <article>
      <Hero title={title} description={description} />
      <Suspense>
        <CategoriesList />
      </Suspense>
    </article>
  );
}
