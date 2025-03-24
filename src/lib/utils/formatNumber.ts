export const formatNumber = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 12,
  }).format(value);
};
