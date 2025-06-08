import type { Metadata } from "next";

import Hero from "@/components/Hero";

const title = "Portfolio";
const description =
  "Manage your cryptocurrency portfolio by creating virtual collections. Each collection starts with $100 USD, allowing you to build a collection of your favourite coins and track their performance.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function PortfolioPage() {
  return <Hero title={title} description={description} />;
}
