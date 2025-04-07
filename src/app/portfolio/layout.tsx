import { ReactNode } from "react";
import CreateStore from "@/components/portfolio/CreateStore";
import StoresList from "@/components/portfolio/StoresList";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <article className="space-y-8">
      {children}
      <aside className="space-y-8">
        <CreateStore />
        <StoresList />
      </aside>
    </article>
  );
}
