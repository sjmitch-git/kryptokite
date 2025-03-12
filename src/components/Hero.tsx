import { Heading } from "@/lib/fluid";
import CoinThumb from "@/components/ui/CoinThumb";

interface HeroProps {
  title: string;
  description: string | number;
  imgSrc?: string;
}
const Hero = ({ title, description, imgSrc }: HeroProps) => {
  return (
    <div className="flex p-2 md:p-4 lg:p-0 gap-4 md:gap-8 flex-col md:flex-row items-center mb-4 md:mb-8">
      {imgSrc && <CoinThumb src={imgSrc} alt={title} size={200} />}
      <div className="flex flex-col gap-4">
        <Heading className="opacity-50 font-bold">{title}</Heading>
        <p className="text-xl max-w-prose">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
