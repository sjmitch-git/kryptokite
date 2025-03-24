import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("should format a number", () => {
    const value = 1234.56789;
    const result = formatNumber(value);
    expect(result).toBe("1,234.56789");
  });

  it("should format a whole number with two decimal places", () => {
    const value = 1000;
    const result = formatNumber(value);
    expect(result).toBe("1,000.00");
  });

  it("should format a small number with up to 12 decimal places", () => {
    const value = 0.000123456789;
    const result = formatNumber(value);
    expect(result).toBe("0.000123456789");
  });

  it("should format a large number with commas", () => {
    const value = 1000000;
    const result = formatNumber(value);
    expect(result).toBe("1,000,000.00");
  });

  it("should handle negative numbers correctly", () => {
    const value = -1234.56789;
    const result = formatNumber(value);
    expect(result).toBe("-1,234.56789");
  });
});
