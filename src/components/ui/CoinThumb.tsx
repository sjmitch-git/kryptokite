interface CoinThumbProps {
  size?: number;
  src: string;
  alt: string;
}

const CoinThumb = ({ src, alt, size }: CoinThumbProps) => {
  return <img src={src} alt={alt} width={size} height={size} className="hidden md:inline-block" />;
};

export default CoinThumb;
