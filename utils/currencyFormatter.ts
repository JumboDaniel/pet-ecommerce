export const CurrencyFormatter = (amount: number) => {
  if (isNaN(amount)) return 0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2, // Show at least 2 decimal places
    maximumFractionDigits: 2, // Limit to 2 decimal places
  });
  return formatter.format(amount);
};
