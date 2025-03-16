"use client";

import { useState } from "react";
import { Button, Dialog } from "@/lib/fluid";
import { FaDollarSign } from "@/components/ui/CustomIcons";
import CurrencySelector from "./CurrencySelector";

const CurrencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button btnBackground="dark" layout="circle" onClick={() => setIsOpen(true)} size="lg">
        <FaDollarSign />
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
