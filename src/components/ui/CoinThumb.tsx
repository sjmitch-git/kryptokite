interface CoinThumbProps {
  size?: number;
  src: string;
  alt: string;
  className?: string;
}

const CoinThumb = ({ src, alt, size, className }: CoinThumbProps) => {
  return <img src={src} alt={alt} width={size} height={size} className={`${className}`} />;
};

export default CoinThumb;
