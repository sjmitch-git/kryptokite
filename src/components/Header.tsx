import Nav from "./Nav";
import { NavBar } from "@/lib/fluid";
import { Links, MetaData } from "@/lib/config";

export default function Header() {
  return (
    <header className={`px-1 py-2 md:py-0 md:px-4 lg:px-0`}>
      <div className="container flex justify-between items-center">
        <NavBar
          brand={MetaData.defaultSitename}
          brandSrc={`${process.env.NEXT_PUBLIC_API_URL}icon.png`}
          links={Links}
          navStyles="bg-[#f3f4f6] p-2"
          btnBackground="info"
          btnColor="dark"
          btnSize="lg"
        >
          <Nav />
        </NavBar>
      </div>
    </header>
  );
}
