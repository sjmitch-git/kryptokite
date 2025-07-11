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
        navStyles="bg-gradient-to-b from-primary-dark from-30% to-primary to-90% text-light p-2 md:p-4 shadow-lg z-20 font-semibold"
        btnBackground="dark"
        btnColor="light"
        btnSize="lg"
        placement="top"
      >
        <Nav />
      </NavBar>
    </header>
  );
}
