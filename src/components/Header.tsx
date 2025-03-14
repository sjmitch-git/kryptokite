import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className={`px-1 py-2 md:py-0 md:px-4 lg:px-0 shadow-sm bg-[#f27d0b]`}>
      <div className="container mx-auto max-w-4xl flex justify-between items-center">
        <Link href="/">
          <picture>
            <source
              srcSet="/icon.png"
              media="(max-width: 1024px)"
              type="image/png"
              width="90"
              height="90"
            />
            <source
              srcSet="/logo.png"
              media="(min-width: 1025px)"
              type="image/png"
              width="400"
              height="64"
            />
            <img src="/logo.png" alt="Brand logo image" width="400" height="64" />
          </picture>
          <span className="hidden">Home</span>
        </Link>

        <Nav />
      </div>
    </header>
  );
}
