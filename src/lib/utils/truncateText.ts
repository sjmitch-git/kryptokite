function truncateText(text: string, maxLength: number = 280): string {
  if (text.length <= maxLength) return text;

  const truncated: string = text.slice(0, maxLength);

  const lastPeriod: number = truncated.lastIndexOf(". ");

  if (lastPeriod === -1) return truncated;

  return truncated.slice(0, lastPeriod + 1);
}

export { truncateText };
