import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CoinsProvider } from "@/lib/contexts/CoinsContext";
import { UserProvider } from "@/lib/contexts/UserContext";
import { MetaData } from "@/lib/config";
import { URLs } from "@/lib/constants";

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

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: new URL(URLs.base),
  name: MetaData.defaultSitename,
  description: MetaData.defaultDescription,
  author: {
    "@type": "Person",
    name: MetaData.defaultAuthor,
    url: MetaData.defaultAuthorUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col min-h-screen`}>
        <Analytics />
        <CoinsProvider>
          <UserProvider>
            <Header />
            <main className="flex-grow container mx-auto max-w-4xl pt-12 pb-12 lg:py-20 px-0 relative top-12">
              {children}
            </main>
            <Footer />
          </UserProvider>
        </CoinsProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
