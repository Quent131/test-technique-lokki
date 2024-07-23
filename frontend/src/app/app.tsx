import { apiService } from '@/api';
import { Button, Loader, NumberInput, Select, Title } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CurrencyConversion } from 'types';

export function App() {
  const [baseAmount, setBaseAmount] = useState<string | number>('');
  const [baseCurrency, setBaseCurrency] = useState<string | null>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string | null>('EUR');
  const [conversionResult, setConversionResult] = useState<
    CurrencyConversion | undefined
  >();

  const { data: currenciesData, isFetching } = useQuery({
    queryKey: ['currency-list'],
    queryFn: apiService.getCurrencyList,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiService.getCurrencyConversion,
    onSuccess: (data) => setConversionResult(data),
  });

  const handleConvert = () => {
    if (baseCurrency && targetCurrency && baseAmount) {
      mutate({ baseCurrency, targetCurrency, baseAmount: Number(baseAmount) });
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
  };
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
              searchable
            />
            <p>en</p>
            <Select
              data={currenciesData}
              value={targetCurrency}
              onChange={(value) => setTargetCurrency(value)}
              searchable
            />
          </div>
          <Button
            color="gray"
            className="max-w-fit"
            disabled={!baseAmount || !baseCurrency || !targetCurrency}
            onClick={handleConvert}
          >
            Convertir
          </Button>
          {conversionResult ? (
            isPending ? (
              <Loader />
            ) : (
              <div className="mt-8 flex flex-col items-center">
                <Title order={1} className="mb-8">
                  {new Intl.NumberFormat(navigator.language || 'fr-FR', {
                    style: 'currency',
                    currency: conversionResult.targetCode,
                  }).format(conversionResult.conversionResult)}
                </Title>
                <p className="mb-2">
                  {new Intl.NumberFormat(navigator.language || 'fr-FR', {
                    style: 'currency',
                    currency: conversionResult.baseCode,
                  }).format(conversionResult.baseAmount) +
                    ' correspondent à ' +
                    new Intl.NumberFormat(navigator.language || 'fr-FR', {
                      style: 'currency',
                      currency: conversionResult.targetCode,
                    }).format(conversionResult.conversionResult)}
                </p>
                <p>
                  {new Intl.NumberFormat(navigator.language || 'fr-FR', {
                    style: 'currency',
                    currency: conversionResult.baseCode,
                  }).format(1) +
                    ' correspond à ' +
                    new Intl.NumberFormat(navigator.language || 'fr-FR', {
                      style: 'currency',
                      currency: conversionResult.targetCode,
                    }).format(conversionResult.conversionRate)}{' '}
                  avec le taux de change actuel de{' '}
                  {conversionResult.conversionRate}, mis à jour le{' '}
                  {format(
                    new Date(conversionResult.timeLastUpdate),
                    "dd/MM/yyyy 'à' HH:mm",
                  )}
                </p>
              </div>
            )
          ) : null}
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
