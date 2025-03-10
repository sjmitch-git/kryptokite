export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(price);
};

export const extractFirstSentence = (text: string): string => {
  const match = text.match(/(.*?\.)(\s[A-Z]|$)/);
  return match ? match[1].trim() : text;
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 12,
  }).format(value);
};
