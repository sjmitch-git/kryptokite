"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaBookmark, FaEdit } from "react-icons/fa";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4">
      <Link
        href="/"
        title="Home"
        tabIndex={pathname === "/" ? -1 : 0}
        className={`rounded-md text-light p-2 flex gap-2 items-center ${
          pathname === "/" ? "bg-primary cursor-none" : "bg-dark  hover:underline"
        } focus-visible:outline-accent`}
      >
        <FaEdit /> <span className="hidden md:inline-block">Home</span>
      </Link>
      <Link
        href="/coins"
        title="coins"
        tabIndex={pathname === "/coins" ? -1 : 0}
        className={`rounded-md text-light p-2 flex gap-2 items-center ${
          pathname === "/coins" ? "bg-primary cursor-none" : "bg-dark hover:underline"
        } focus-visible:outline-accent`}
      >
        <FaBookmark /> <span className="hidden md:inline-block">Coins</span>
      </Link>
      <Link
        href="/watchlist"
        title="Watchlist"
        tabIndex={pathname === "/watchlist" ? -1 : 0}
        className={`rounded-md text-light p-2 flex gap-2 items-center ${
          pathname === "/watchlist" ? "bg-primary cursor-none" : "bg-dark hover:underline"
        } focus-visible:outline-accent`}
      >
        <FaBookmark /> <span className="hidden md:inline-block">Watchlist</span>
      </Link>
    </nav>
  );
}
