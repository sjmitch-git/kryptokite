import { FaStar } from "@/components/ui/CustomIcons";
import { Button } from "@/lib/fluid";
import { useRouter } from "next/navigation";

const WatchlistNavigation = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/watchlist");
  };

  return (
    <>
      <Button
        btnBackground="dark"
        layout="circle"
        size="xl"
        className="overflow-hidden p-0 w-[48px] h-[48px]"
        onClick={handleClick}
      >
        <FaStar title="Navigate to Watchlist" />
      </Button>
    </>
  );
};

export default WatchlistNavigation;
