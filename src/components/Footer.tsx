import Link from "next/link";
import { MetaData } from "@/lib/config";
import { Suspense } from "react";
import Ticker from "@/components/ui/Ticker";

export default function Footer() {
  return (
    <footer className="p-4 pb-16 mt-8 bg-gradient-to-t from-primary-dark from-30% to-primary to-90% sticky top-full text-light">
      <div className="container mx-auto text-center space-y-4">
        <Link href="./" className="block mt-4" title="Go to homepage">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`}
            alt="Logo"
            width={250}
            height={56}
            className="mx-auto"
          />
        </Link>
        <p className="text-sm" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {MetaData.defaultSitename}. All rights reserved.
        </p>
        <p className="text-sm">
          Created by{" "}
          <a
            href={MetaData.defaultAuthorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {MetaData.defaultAuthor}
          </a>
        </p>
        <div>
          Built with:{" "}
          <a
            href="https://fluid-ui.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Fluid UI
          </a>
        </div>
        <div>
          Powered by{" "}
          <a
            className="underline"
            href="https://www.coingecko.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CoinGecko API
          </a>
        </div>
      </div>
      <Suspense>
        <Ticker />
      </Suspense>
    </footer>
  );
}
