export type CurrencyRaw = {
  id: number,
  name: string,
  symbol: string,
  quote: {
    USD: {
      price: number,
      volume_change_24h: number,
    }
  }
}

export type Currency = {
  id: number,
  name: string,
  symbol: string,
  image: string
  price: number,
  change: number,

}

export type TabProps = {
  name: string,
  label: string
}