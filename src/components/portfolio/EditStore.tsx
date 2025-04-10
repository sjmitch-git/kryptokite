"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/contexts/UserContext";
import { STORES_CONFIG } from "@/lib/constants";
import { Dialog, Button } from "@smitch/fluid";
import AddCoin from "./AddCoin";
import Store from "./Store";

interface EditStoreProps {
  storeName: string;
}

const EditStore = ({ storeName }: EditStoreProps) => {
  const { stores, removeStore } = useUser();
  const store = stores.find((store) => store.name === storeName);
  const [isOpen, setIsOpen] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const router = useRouter();
  const { currency } = STORES_CONFIG;

  useEffect(() => {
    if (store?.createdAt) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(store.createdAt));
      setTimestamp(formattedDate);
    }
  }, [store?.createdAt]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const handleRemoveStore = () => {
    if (store) {
      removeStore(store.id);
      setIsOpen(false);
      router.push("/portfolio");
    }
  };

  return (
    <div>
      <div className="flex justify-between px-2 md:px-4 lg:px-0 mb-8 gap-4">
        <div className="">
          <p className="text-xl max-w-prose mb-4 md:mb-8">{store?.description}</p>
        </div>
        <div>
          <Button
            btnBackground="danger"
            suppressHydrationWarning={true}
            onClick={openDialog}
            className="focus:bg-dark"
          >
            Remove?
          </Button>
        </div>
      </div>

      <div className="flex text-lg gap-8 justify-between px-2 md:px-4 lg:px-0 mb-8">
        <p className="flex flex-col md:flex-row gap-2">
          Balance:{" "}
          <span>
            {store?.balance} {currency.toUpperCase()}
          </span>
        </p>
        <p className="flex flex-col md:flex-row gap-2">
          Created @ <span>{timestamp}</span>
        </p>
      </div>

      {store && <Store store={store} />}

      <AddCoin storeId={store?.id} storeBalance={store?.balance} />

      <Dialog
        open={isOpen}
        modal={true}
        title="Remove Store?"
        titleSize="lg"
        titleBold={true}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-4">
          <p>Are you sure you want to remove this Collection? This action cannot be undone.</p>
          <div className="grid grid-cols-2 mt-4">
            <Button btnBackground="dark" btnColor="light" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button btnBackground="danger" onClick={handleRemoveStore}>
              Remove
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditStore;
