import { MetaData } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="p-4 mt-8 bg-gray-300" dir="ltr">
      <div className="container mx-auto text-center space-y-4">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`}
          alt="Logo"
          width={267}
          height={80}
          className="mx-auto"
        />
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
    </footer>
  );
}
