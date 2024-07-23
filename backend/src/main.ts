import 'dotenv/config';
import axios from 'axios';
import express, { Request, Response } from 'express';
import * as path from 'path';
import { Currency } from 'types';
import cors from 'cors';

const currencyApi = axios.create({
  baseURL: 'https://v6.exchangerate-api.com/v6/ad652929a7932024d95f0ec9/', //'https://xecdapi.xe.com/v1/',
  // auth: {
  //   username: process.env.XE_API_USER,
  //   password: process.env.XE_API_API_KEY,
  // },
});

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
    const { data } = await currencyApi.get<{
      supported_codes: string[][];
      result: string;
      terms_of_use: string;
      documentation: string;
      privacy: string;
    }>('/codes');
    res.send(
      data.supported_codes.map(([iso, currency_name]) => ({
        iso,
        currency_name,
      })),
    );
  },
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
