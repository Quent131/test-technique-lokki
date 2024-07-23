import 'dotenv/config';
import axios from 'axios';
import express, { Request, Response } from 'express';
import * as path from 'path';
import { Currency, CurrencyConversion, CurrencyConversionDto } from 'types';
import cors from 'cors';

const currencyApi = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/`,
});

type BaseApiData = {
  result: string;
  terms_of_use: string;
  documentation: string;
};

const app = express();

app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get(
  '/api/currency-list',
  async (req: Request, res: Response<Currency[]>) => {
    const { data } = await currencyApi.get<
      BaseApiData & {
        supported_codes: string[][];
        privacy: string;
      }
    >('/codes');
    res.send(
      data.supported_codes.map(([iso, currency_name]) => ({
        iso,
        currency_name,
      })),
    );
  },
);

app.post(
  '/api/convert',
  async (req: Request, res: Response<CurrencyConversion>) => {
    const { baseCurrency, targetCurrency, baseAmount } =
      req.body as CurrencyConversionDto;
    const {
      data: {
        base_code,
        target_code,
        time_last_update_utc,
        conversion_rate,
        conversion_result,
      },
    } = await currencyApi.get<
      BaseApiData & {
        time_last_update_unix: number;
        time_last_update_utc: string;
        time_next_update_unix: number;
        time_next_update_utc: string;
        base_code: string;
        target_code: string;
        conversion_rate: number;
        conversion_result: number;
      }
    >(`pair/${baseCurrency}/${targetCurrency}/${baseAmount}`);

    res.send({
      baseCode: base_code,
      targetCode: target_code,
      timeLastUpdate: time_last_update_utc,
      conversionRate: conversion_rate,
      conversionResult: conversion_result,
      baseAmount,
    });
  },
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
