import { useState } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import { SimpleCoin } from "@/lib/types";
import { FaPlusCircle, FaCheckCircle } from "@/components/ui/CustomIcons";
import { Button, Toast } from "@/lib/fluid";

type WatchlistToggleProps = {
  id: string;
  name: string;
  symbol: string;
};

type BackgroundOption = "success" | "danger";

const WatchlistToggle = ({ id, name, symbol }: WatchlistToggleProps) => {
  const { addUserCoin, removeUserCoin, isCoinInCollection } = useUser();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [toastBackground, setToastBackground] = useState<BackgroundOption>("success");

  const handleToggleCoin = (coin: SimpleCoin) => {
    if (isCoinInCollection(coin.id)) {
      removeUserCoin(coin.id);
      setOpen(true);
      setMessage(`${coin.name} removed from watchlist`);
      setToastBackground("danger");
    } else {
      addUserCoin(coin);
      setOpen(true);
      setMessage(`${coin.name} added to watchlist`);
      setToastBackground("success");
    }
  };

  return (
    <>
      <Button
        size="lg"
        btnBackground="light"
        layout="circle"
        onClick={() =>
          handleToggleCoin({
            id: id,
            name: name,
            symbol: symbol,
          })
        }
        className={`p-0 ${
          isCoinInCollection(id) ? "text-info focus:text-info" : "text-neutral focus:text-neutral"
        }`}
      >
        {isCoinInCollection(id) ? (
          <FaCheckCircle size={"2rem"} title="Remove from Watchlist?" />
        ) : (
          <FaPlusCircle size={"2rem"} title="Add to Watchlist?" />
        )}
      </Button>
      <Toast
        open={open}
        body={message}
        onClose={() => setOpen(false)}
        toastBackground={toastBackground}
        autohide
        autohideDuration={3000}
        horizontal="center"
        vertical="bottom"
      />
    </>
  );
};

export default WatchlistToggle;
