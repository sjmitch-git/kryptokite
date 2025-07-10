import { Heading } from "@/lib/fluid";
import CoinThumb from "@/components/ui/CoinThumb";

interface HeroProps {
  title: string;
  description?: React.ReactNode;
  imgSrc?: string;
  className?: string;
}
const Hero = ({ title, description, imgSrc, className }: HeroProps) => {
  return (
    <div
      className={`flex p-2 md:p-4 lg:p-0 gap-4 md:gap-8 flex-row items-center mb-4 md:mb-8 lg:mb-12 ${className}`}
    >
      {imgSrc && <CoinThumb src={imgSrc} alt={title} size={200} className="max-sm:hidden" />}
      <div className="flex flex-col gap-4">
        <Heading>{title}</Heading>
        {description && (
          <p className="text-xl max-w-prose line-clamp-4 dark:opacity-85">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
