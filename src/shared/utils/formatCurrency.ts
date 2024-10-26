export const formatCurrency = (amount: number) => {
  let str = amount.toString();
  let [integerPart, decimalPart] = str.split(".");
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
};
