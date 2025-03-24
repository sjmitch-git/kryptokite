export const extractFirstSentence = (text: string): string => {
  const match = text.match(/(.*?\.)(\s[A-Z]|$)/);
  return match ? match[1].trim() : text;
};
