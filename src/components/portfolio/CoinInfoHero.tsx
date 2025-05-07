import { Coin } from "@/lib/types";
import { extractFirstSentence } from "@/lib/utils";
import CoinThumb from "@/components/ui/CoinThumb";

interface CoinInfoHeroProps {
  coin: Coin;
}

const CoinInfoHero = ({ coin }: CoinInfoHeroProps) => {
  return (
    <div className="flex p-0 md:p-4 lg:p-0 gap-4 md:gap-8 flex-row items-start mb-4 md:mb-8">
      <CoinThumb src={coin.image.large} alt={coin.name} size={100} className="max-sm:hidden" />
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">
          {coin.name}{" "}
          <sup className="font-normal font-mono block mt-6 uppercase">{coin.symbol}</sup>
        </h3>
        <p className="text-xl max-w-prose line-clamp-4">
          {extractFirstSentence(coin.description.en)}
        </p>
      </div>
    </div>
  );
};

export default CoinInfoHero;
