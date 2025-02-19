import { Heading } from "@/lib/fluid";

interface HeroProps {
  title: string;
  description: string;
}
const Hero = ({ title, description }: HeroProps) => {
  return (
    <div className="flex gap-8 flex-row items-center max-md:hidden">
      <Heading className="opacity-50 font-bold">{title}</Heading>
      <p className="mb-4 max-w-prose">{description}</p>
    </div>
  );
};

export default Hero;
