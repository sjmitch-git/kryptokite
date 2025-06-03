import Nav from "./Nav";
import { NavBar } from "@/lib/fluid";
import { Links, MetaData } from "@/lib/config";

export default function Header() {
  return (
    <header style={{ display: "unset" }}>
      <NavBar
        brand={MetaData.defaultSitename}
        brandSrc={`${process.env.NEXT_PUBLIC_API_URL}logo.png`}
        links={Links}
        navStyles="bg-[var(--light)] p-2 md:p-4 shadow-lg z-20"
        btnBackground="info"
        btnColor="light"
        btnSize="lg"
        placement="top"
      >
        <Nav />
      </NavBar>
    </header>
  );
}
