import Link from "next/link";
import { Links } from "@/lib/config";

const HomeNav = () => {
  return (
    <nav className="grid grid-cols-2 gap-4 justify-center">
      {Links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-lg text-center bg-dark rounded-full text-light aspect-auto transition hover:scale-110 p-4 shadow-lg"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default HomeNav;
