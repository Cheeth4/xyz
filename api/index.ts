import { Currency, CurrencyRaw } from '~/types';

const IMAGES_URL = 'https://s2.coinmarketcap.com/static/img/coins/64x64/'

const transformRawCurrency = ({ id, name, symbol, quote }: CurrencyRaw): Currency => {
  const image = IMAGES_URL + id + '.png';

  return {
    id, name, symbol, image,
    price: quote.USD.price,
    change: quote.USD.volume_change_24h
  }
}

export const fetchPrices = async (): Promise<Currency[]> => {
  const currenciesRaw = await $fetch<{ data: CurrencyRaw[] }>('cryptocurrency/listings/latest', {
    baseURL: 'https://sandbox-api.coinmarketcap.com/v1/',
    headers: {
      'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
    }
  });
  return currenciesRaw.data.map(transformRawCurrency);
};
