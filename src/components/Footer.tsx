import Link from "next/link";
import { MetaData } from "@/lib/config";
import { Suspense } from "react";
import Ticker from "@/components/ui/Ticker";

export default function Footer() {
  return (
    <footer className="p-4 pb-16 bg-gradient-to-t from-primary-dark from-30% to-primary to-90% sticky top-full text-light">
      <div className="container mx-auto text-center space-y-4">
        <ul className="flex gap-4 justify-center mb-8 mt-4">
          <li>
            <Link href="/privacy" className="underline underline-offset-4" title="Privacy Policy">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="underline underline-offset-4"
              title="Terms and Conditions"
            >
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className="underline underline-offset-4" title="Disclaimer">
              Disclaimer
            </Link>
          </li>
        </ul>
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
        <Link href="./" className="block" title="Go to homepage">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`}
            alt="Logo"
            width={250}
            height={56}
            className="mx-auto mt-12"
          />
        </Link>
      </div>
      <Suspense>
        <Ticker />
      </Suspense>
    </footer>
  );
}
