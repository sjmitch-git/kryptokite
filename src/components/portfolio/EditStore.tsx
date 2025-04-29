"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/contexts/UserContext";
import { Dialog, Button } from "@smitch/fluid";
import AddCoin from "./AddCoin";
import Store from "./Store";

interface EditStoreProps {
  storeName: string;
}

const EditStore = ({ storeName }: EditStoreProps) => {
  const { stores, removeStore } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const router = useRouter();
  const store = stores.find((store) => store.name === storeName);

  useEffect(() => {
    if (store?.createdAt) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
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
      {store && (
        <div className="flex justify-between px-2 md:px-4 lg:px-0 mb-4 gap-4">
          <div className="space-y-4">
            <p className="text-xl max-w-prose">{store?.description}</p>
            <p>
              Created @ <span>{timestamp}</span>
            </p>
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
      )}

      {store && <Store store={store} />}

      {store && store.balance > 0 && <AddCoin storeId={store?.id} storeBalance={store?.balance} />}

      <hr className="my-16 h-1 bg-info" />

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
