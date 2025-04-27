import Nav from "./Nav";
import { NavBar } from "@/lib/fluid";
import { Links, MetaData } from "@/lib/config";

export default function Header() {
  return (
    <header style={{ display: "unset" }}>
      <NavBar
        brand={MetaData.defaultSitename}
        brandSrc={`${process.env.NEXT_PUBLIC_API_URL}icon.png`}
        links={Links}
        navStyles="bg-[var(--light)] p-2 shadow-lg z-20"
        btnBackground="info"
        btnColor="dark"
        btnSize="lg"
        placement="top"
      >
        <Nav />
      </NavBar>
    </header>
  );
}
