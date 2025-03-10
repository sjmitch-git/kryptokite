import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Nav from "./Nav";
import CurrencySelector from "./user/CurrencySelector";
// import SelectCoin from "./coins/SelectCoin";
// const SelectCoin = dynamic(() => import("./coins/SelectCoin"), { ssr: false });

export default function Header() {
  return (
    <header className="px-2 py-4 md:px-4 lg:px-0 shadow-sm">
      <div className="container mx-auto max-w-4xl flex justify-between items-center">
        {/* <picture>
          <source
            srcSet="/logo-mobile.png"
            media="(max-width: 480px)"
            type="image/png"
            width="200"
            height="32"
          />
          <source
            srcSet="/logo-tablet.png"
            media="(min-width: 481px) and (max-width: 1024px)"
            type="image/png"
            width="300"
            height="48"
          />
          <source
            srcSet="/logo-desktop.png"
            media="(min-width: 1025px)"
            type="image/png"
            width="400"
            height="64"
          />
          <img
            src="/logo-desktop.png"
            alt="Sticky Blob Logo - Create Custom Sticky Notes"
            width="400"
            height="64"
          />
        </picture> */}

        <Nav />
        <div className="flex items-center">
          <CurrencySelector />
          {/* <Suspense>
            <SelectCoin />
            <CurrencySelector />
          </Suspense> */}
        </div>
      </div>
    </header>
  );
}
