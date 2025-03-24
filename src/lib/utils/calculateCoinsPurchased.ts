export const calculateCoinsPurchased = (currencyAmount: number, price: number): number => {
  if (typeof currencyAmount !== "number" || typeof price !== "number") {
    throw new Error("Dollar amount and price must be numbers");
  }

  if (isNaN(currencyAmount) || isNaN(price)) {
    throw new Error("Dollar amount and price must be valid numbers");
  }

  if (currencyAmount < 0) {
    throw new Error("Dollar amount cannot be negative");
  }

  if (price <= 0) {
    throw new Error("Price must be a positive number");
  }

  const amount = currencyAmount / price;

  return Number(amount.toFixed(6));
};
