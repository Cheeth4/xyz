type FormatNumberOptions = {
  thousandSeparator: string,
  maxFractionDigits: number
}

export const formatNumber = (
  value: number,
  options: Partial<FormatNumberOptions>
) => {
  return value.toFixed(options?.maxFractionDigits ?? 2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, options?.thousandSeparator ?? ',');
};

export const formatCurrency = (value: number, thousandSeparator = ',') => {
  return '$' + formatNumber(value, { maxFractionDigits: 2, thousandSeparator })
};

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}