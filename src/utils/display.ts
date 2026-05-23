export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/[\s/_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function formatTagList(tags: string[]): string {
  return tags.map((tag) => toTitleCase(tag)).join(', ');
}
