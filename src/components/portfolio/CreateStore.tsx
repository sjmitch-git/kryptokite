"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/contexts/UserContext";
import { Button, Label, Input } from "@smitch/fluid";
import { STORES_CONFIG } from "@/lib/constants";

const CreateStore = () => {
  const { addStore, stores } = useUser();
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const name = `Collection ${stores.length + 1}`;
    setStoreName(name);
    isStoreNameTaken(name);
  }, [stores]);

  const router = useRouter();
  const { nameMaxLength } = STORES_CONFIG;

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    addStore(storeName, storeDescription);
    setStoreName("");
    setStoreDescription("");
    router.push(`/portfolio/${storeName}`);
  };

  const isStoreNameTaken = (name: string) => {
    const isTaken = stores.some((store) => store.name.toLowerCase() === name.toLowerCase());
    if (isTaken) {
      setError("Collection name is already taken. Please choose a different name.");
    } else {
      setError(null);
    }
  };

  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;

    if (inputName.length > nameMaxLength) {
      setError(`Store name cannot exceed ${nameMaxLength} characters.`);
    }

    setStoreName(inputName);
    isStoreNameTaken(inputName);
  };

  const handleStoreDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDescription = e.target.value;
    setStoreDescription(inputDescription);
  };

  const isFormInvalid = !storeName || Boolean(error);

  return (
    <form
      onSubmit={handleCreateStore}
      className="space-y-4 py-4 px-2 md:px-4 md:border md:rounded bg-slate-200"
    >
      <h2 className="text-xl font-bold">Create a New Collection</h2>
      <div className="grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4">
        <div className="col-span-2 md:col-span-1">
          <Label label="Name:" layout="row" size="lg" required>
            <Input
              type="text"
              id="storeName"
              title={`Max Length ${nameMaxLength}`}
              className={error ? "border-error text-error" : ""}
              hint
              value={storeName}
              onChange={handleStoreNameChange}
              placeholder="Enter a new name"
              maxLength={nameMaxLength}
              required
              suppressHydrationWarning
            />
          </Label>
        </div>
        <div className="col-span-2 md:col-span-1">
          <Label label="Description:" layout="row" size="lg">
            <Input
              type="text"
              id="storeDescription"
              title="Optional"
              hint
              value={storeDescription}
              onChange={handleStoreDescriptionChange}
              placeholder="Enter a description"
              maxLength={100}
              suppressHydrationWarning
            />
          </Label>
        </div>
        <div className="flex justify-center md:justify-end col-span-2">
          <Button type="submit" suppressHydrationWarning={true} disabled={isFormInvalid}>
            Create &quot;{storeName}&quot;
          </Button>
        </div>
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </form>
  );
};

export default CreateStore;
