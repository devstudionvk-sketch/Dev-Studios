export const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
  }).format(amount);
