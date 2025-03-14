import Link from "next/link";
import { useCoins } from "@/lib/contexts/CoinsContext";
import { FaArrowLeft, FaArrowRight } from "@/components/ui/CustomIcons";

interface CoinNavProps {
  id: string;
}

const CoinNav = ({ id }: CoinNavProps) => {
  const { coins } = useCoins();
  const currentIndex = coins.findIndex((c) => c.id === id);
  const previousCoin = currentIndex > 0 ? coins[currentIndex - 1] : null;
  const nextCoin = currentIndex < coins.length - 1 ? coins[currentIndex + 1] : null;

  return (
    <nav className="flex justify-between text-base md:text-xl px-2 md:px-4">
      <div>
        {previousCoin && (
          <Link href={`/coins/${previousCoin.id}`}>
            <span className="text-blue-500 hover:underline flex items-center gap-x-2 md:gap-x-4">
              <FaArrowLeft /> {previousCoin.name}
            </span>
          </Link>
        )}
      </div>
      <div>
        {nextCoin && (
          <Link href={`/coins/${nextCoin.id}`}>
            <span className="text-blue-500 hover:underline flex items-center gap-x-2 md:gap-x-4">
              {nextCoin.name} <FaArrowRight />
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default CoinNav;
