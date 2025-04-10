import { calculateCoinsPurchased } from "./calculateCoinsPurchased";

describe("calculateCoinsPurchased", () => {
  it("should calculate the correct number of coins purchased", () => {
    const currencyAmount = 1000;
    const price = 50;
    const result = calculateCoinsPurchased(currencyAmount, price);
    expect(result).toBe(20); // 1000 / 50 = 20
  });

  it("should return a number rounded to 6 decimal places", () => {
    const currencyAmount = 1;
    const price = 3;
    const result = calculateCoinsPurchased(currencyAmount, price);
    expect(result).toBe(0.333333); // 1 / 3 = 0.333333
  });

  it("should throw an error if currencyAmount is not a number", () => {
    expect(() => calculateCoinsPurchased("1000", 50)).toThrow(
      "Dollar amount and price must be numbers"
    );
  });

  it("should throw an error if price is not a number", () => {
    expect(() => calculateCoinsPurchased(1000, "50").toThrow(
      "Dollar amount and price must be numbers"
    );
  });

  it("should throw an error if currencyAmount is NaN", () => {
    expect(() => calculateCoinsPurchased(NaN, 50)).toThrow(
      "Dollar amount and price must be valid numbers"
    );
  });

  it("should throw an error if price is NaN", () => {
    expect(() => calculateCoinsPurchased(1000, NaN)).toThrow(
      "Dollar amount and price must be valid numbers"
    );
  });

  it("should throw an error if currencyAmount is negative", () => {
    expect(() => calculateCoinsPurchased(-1000, 50)).toThrow("Dollar amount cannot be negative");
  });

  it("should throw an error if price is zero", () => {
    expect(() => calculateCoinsPurchased(1000, 0)).toThrow("Price must be a positive number");
  });

  it("should throw an error if price is negative", () => {
    expect(() => calculateCoinsPurchased(1000, -50)).toThrow("Price must be a positive number");
  });
});
