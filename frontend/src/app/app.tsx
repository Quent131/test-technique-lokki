import { apiService } from '@/api';
import { Button, Loader, NumberInput, Select, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function App() {
  const [baseAmount, setBaseAmount] = useState<string | number>('');
  const [baseCurrency, setBaseCurrency] = useState<string | null>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string | null>('EUR');

  const { data: currenciesData, isFetching } = useQuery({
    queryKey: ['currency-list'],
    queryFn: apiService.getCurrencyList,
  });
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Title order={1} className="mb-10 text-center">
        Convertisseur de devises
      </Title>
      <p className="pb-3">Convertir</p>
      {isFetching ? (
        <Loader />
      ) : currenciesData && currenciesData.length > 0 ? (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <NumberInput value={baseAmount} onChange={setBaseAmount} />
            <Select
              data={currenciesData}
              value={baseCurrency}
              onChange={(value) => setBaseCurrency(value)}
            />
            <p>en</p>
            <Select
              data={currenciesData}
              value={targetCurrency}
              onChange={(value) => setTargetCurrency(value)}
            />
          </div>
          <Button color="gray" className="max-w-fit">
            Convertir
          </Button>
        </div>
      ) : (
        <div>
          Il semblerait qu'il y ai un souci lors de la récupération des devises
          disponibles, merci de contacter le support.
        </div>
      )}
    </div>
  );
}

export default App;
