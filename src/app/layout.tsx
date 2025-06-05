import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CoinsProvider } from "@/lib/contexts/CoinsContext";
import { UserProvider } from "@/lib/contexts/UserContext";
import { MetaData } from "@/lib/config";
import { URLs } from "@/lib/constants";
import { get } from "@vercel/edge-config";
import CryptoNews from "@/components/CryptoNews";

export const metadata: Metadata = {
  title: {
    template: `%s | ${MetaData.defaultSitename}`,
    default: MetaData.defaultSitename,
  },
  description: MetaData.defaultDescription,
  keywords: MetaData.defaultKeywords,
  authors: [
    {
      name: MetaData.defaultAuthor,
      url: MetaData.defaultAuthorUrl,
    },
  ],
  metadataBase: new URL(URLs.base),
  alternates: {
    canonical: new URL(URLs.base),
  },
  twitter: {
    card: "summary",
  },
  openGraph: {
    title: MetaData.defaultSitename,
    description: MetaData.defaultDescription,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}icon.png`,
        alt: `${MetaData.defaultSitename} logo`,
        width: 400,
        height: 400,
      },
    ],
    siteName: MetaData.defaultSitename,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isInMaintenanceMode = await get<boolean>("maintenance");

  if (isInMaintenanceMode) {
    return (
      <html lang="en">
        <body className="bg-primary">
          <main className="flex-grow container mx-auto max-w-4xl pt-12 pb-12 px-0">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        <CoinsProvider>
          <UserProvider>
            <Header />
            <main className="grid grid-cols-12 gap-4 lg:gap-8 flex-grow pt-8 lg:pt-12 md:pb-12 lg:px-4">
              <article className="col-span-12 lg:col-span-8">{children}</article>
              <aside className="col-span-12 lg:col-span-4 p-2">
                <CryptoNews />
              </aside>
            </main>
            <Footer />
          </UserProvider>
        </CoinsProvider>
      </body>
    </html>
  );
}
