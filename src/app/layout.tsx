import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/index.css";
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
  return (
    <html lang="en">
      <body className="dark">
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        <CoinsProvider>
          <UserProvider>{children}</UserProvider>
        </CoinsProvider>
      </body>
    </html>
  );
}
