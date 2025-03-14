import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CoinsProvider } from "@/lib/contexts/CoinsContext";
import { UserProvider } from "@/lib/contexts/UserContext";
import { MetaData } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CoinsProvider>
          <UserProvider>
            <Header />
            <main className="flex-grow container mx-auto max-w-4xl py-4 md:py-16 px-0">
              {children}
            </main>
            <Footer />
          </UserProvider>
        </CoinsProvider>
      </body>
    </html>
  );
}
