import { extractFirstSentence } from "./extractFirstSentence";

describe("extractFirstSentence", () => {
  it("should extract the first sentence from a paragraph", () => {
    const text = "This is the first sentence. This is the second sentence.";
    const result = extractFirstSentence(text);
    expect(result).toBe("This is the first sentence.");
  });

  it("should return the entire text if there is no period", () => {
    const text = "This is a single sentence without a period";
    const result = extractFirstSentence(text);
    expect(result).toBe(text);
  });

  it("should handle text with no spaces after a period", () => {
    const text = "New York is a city in the U.S.A.";
    const result = extractFirstSentence(text);
    expect(result).toBe("New York is a city in the U.S.A.");
  });

  it("should handle empty strings", () => {
    const text = "";
    const result = extractFirstSentence(text);
    expect(result).toBe("");
  });

  it("should handle text with only a period", () => {
    const text = ".";
    const result = extractFirstSentence(text);
    expect(result).toBe(".");
  });
});
