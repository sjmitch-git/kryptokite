import Header from "@/components/Header";
import Footer from "@/components/Footer";

import CryptoNews from "@/components/CryptoNews";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="grid grid-cols-12 gap-4 lg:gap-8 pt-8 lg:pt-24 md:pb-12 lg:px-4">
        <article className="col-span-12 lg:col-span-8">{children}</article>
        <aside className="col-span-12 lg:col-span-4 p-0">
          <CryptoNews />
        </aside>
      </main>
      <Footer />
    </>
  );
}
