"use client";

import { useState } from "react";
import { Button, Dialog } from "@/lib/fluid";
import CurrencySelector from "./CurrencySelector";
import { currencySymbols } from "@/lib/types";
import { useUser } from "@/lib/contexts/UserContext";

const CurrencyButton = () => {
  const { preferredCurrency } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const symbol = currencySymbols[preferredCurrency] || "$";

  return (
    <>
      <Button
        btnBackground="dark"
        layout="circle"
        onClick={() => setIsOpen(true)}
        size="xl"
        className="overflow-hidden p-0 w-[48px] h-[48px]"
      >
        {symbol}
      </Button>
      <Dialog
        open={isOpen}
        modal={true}
        title="Select Currency"
        titleSize="lg"
        titleBold={true}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-4 selectcoin-wrapper" suppressHydrationWarning={true}>
          <CurrencySelector setIsOpen={setIsOpen} />
        </div>
      </Dialog>
    </>
  );
};

export default CurrencyButton;
