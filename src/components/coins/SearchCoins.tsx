"use client";

import { useState } from "react";
import { Button, Dialog } from "@/lib/fluid";
import { FaSearch } from "@/components/ui/CustomIcons";
import SelectCoin from "./SelectCoin";

const SearchCoins = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button btnBackground="dark" layout="circle" onClick={() => setIsOpen(true)} size="lg">
        <FaSearch />
      </Button>
      <Dialog
        open={isOpen}
        modal={true}
        title="Search Coins"
        titleSize="lg"
        titleBold={true}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-4 selectcoin-wrapper" suppressHydrationWarning={true}>
          <SelectCoin setIsOpen={setIsOpen} />
        </div>
      </Dialog>
    </>
  );
};
export default SearchCoins;
