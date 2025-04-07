interface CoinThumbProps {
  size?: number;
  src: string;
  alt: string;
  className?: string;
}

const CoinThumb = ({ src, alt, size, className }: CoinThumbProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`${className} hidden md:inline-block`}
    />
  );
};

export default CoinThumb;
