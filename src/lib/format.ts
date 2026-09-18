export const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
