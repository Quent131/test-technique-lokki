export type Currency = {
  iso: string;
  currency_name: string;
};

export type CurrencyConversion = {
  baseCode: string;
  baseAmount: number;
  targetCode: string;
  timeLastUpdate: string;
  conversionRate: number;
  conversionResult: number;
};

export type CurrencyConversionDto = {
  baseCurrency: string;
  targetCurrency: string;
  baseAmount: number;
};
