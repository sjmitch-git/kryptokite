function truncateText(text: string, maxLength: number = 280): string {
  // If text is within limit, return as is (preserving newlines)
  if (text.length <= maxLength) return text;

  // Find the URL (if any)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(urlRegex);
  const url = match ? match[0] : null;
  const urlLength = url ? url.length : 0;

  if (!url) {
    // No URL, truncate at last period
    const truncated = text.slice(0, maxLength - 3);
    const lastPeriod = truncated.lastIndexOf(". ");
    if (lastPeriod === -1) return truncated + "...";
    return truncated.slice(0, lastPeriod + 1);
  }

  // Preserve URL and truncate non-URL text
  const nonUrlText = text.replace(url, "").trimEnd();
  const availableLength = maxLength - urlLength - 4; // Reserve space for URL and '... '
  const truncatedNonUrl = nonUrlText.slice(0, availableLength);
  const lastPeriod = truncatedNonUrl.lastIndexOf(". ");

  if (lastPeriod === -1) return truncatedNonUrl + "...\n" + url;
  return truncatedNonUrl.slice(0, lastPeriod + 1) + "\n" + url;
}

export { truncateText };
