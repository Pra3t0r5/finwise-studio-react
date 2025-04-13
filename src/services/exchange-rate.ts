/**
 * Represents the exchange rate between two currencies.
 */
export interface ExchangeRate {
  /**
   * The base currency.
   */
  baseCurrency: string;
  /**
   * The target currency.
   */
  targetCurrency: string;
  /**
   * The exchange rate.
   */
  rate: number;
}

/**
 * Asynchronously retrieves the exchange rate between two currencies.
 *
 * @param baseCurrency The base currency.
 * @param targetCurrency The target currency.
 * @returns A promise that resolves to an ExchangeRate object.
 */
export async function getExchangeRate(
  baseCurrency: string,
  targetCurrency: string
): Promise<ExchangeRate> {
  // TODO: Implement this by calling an API.
  return {
    baseCurrency: baseCurrency,
    targetCurrency: targetCurrency,
    rate: 1.1,
  };
}
