import { ComboboxData } from '@mantine/core';
import axios from 'axios';
import { Currency, CurrencyConversion, CurrencyConversionDto } from 'types';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const apiService = {
  getCurrencyList: async () => {
    const { data } = await api.get<Currency[]>('/currency-list');
    const formattedData: ComboboxData = data.map((currency) => ({
      value: currency.iso,
      label: [currency.currency_name, currency.iso].join(' - '),
    }));
    return formattedData;
  },

  getCurrencyConversion: async (conversionData: CurrencyConversionDto) => {
    const { data } = await api.post<CurrencyConversion>(
      '/convert',
      conversionData,
    );
    return data;
  },
};
