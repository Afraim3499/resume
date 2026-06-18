import type { CountryPriceIndexData, CurrencyTransition } from './types';

export type AmountParseResult =
  | { ok: true; amount: number; normalized: string }
  | { ok: false; error: string };

export function parseAmountInput(value: string): AmountParseResult {
  const normalized = value.trim().replaceAll(',', '');

  if (!normalized) {
    return { ok: false, error: 'Enter an amount.' };
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return { ok: false, error: 'Use a positive amount with up to 2 decimal places.' };
  }

  const amount = Number(normalized);

  if (!Number.isFinite(amount)) {
    return { ok: false, error: 'Enter a valid number.' };
  }

  if (amount <= 0) {
    return { ok: false, error: 'Amount must be greater than 0.' };
  }

  if (amount > 1_000_000_000) {
    return { ok: false, error: 'Amount must be 1,000,000,000 or less.' };
  }

  return { ok: true, amount, normalized };
}

export function getCurrencyForYear(
  countryData: CountryPriceIndexData,
  year = countryData.latestFinalYear
): CurrencyTransition {
  return [...countryData.currencyTransitions]
    .sort((a, b) => b.fromYear - a.fromYear)
    .find((currency) => year >= currency.fromYear) ?? {
    fromYear: countryData.availableFrom,
    currencyCode: countryData.currencyCode,
    currencySymbol: countryData.currencySymbol,
    currencyName: countryData.amountLabel,
    scaleToLatest: 1
  };
}

export function getCurrencyScaleToLatest(countryData: CountryPriceIndexData, year: number): number {
  return getCurrencyForYear(countryData, year).scaleToLatest;
}

function formatNumberForCurrency(value: number): string {
  const maximumFractionDigits = Math.abs(value) >= 100_000 ? 0 : 2;

  return new Intl.NumberFormat('en', {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits === 0 ? 0 : 2
  }).format(value);
}

export function formatCurrency(
  countryData: CountryPriceIndexData,
  value: number,
  year = countryData.latestFinalYear
): string {
  const currency = getCurrencyForYear(countryData, year);
  return `${currency.currencySymbol}${formatNumberForCurrency(value)}`;
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';

  return `${sign}${new Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1
  }).format(value)}%`;
}

export function bucketAmount(amount: number): string {
  if (amount < 100) return '1-99';
  if (amount < 1_000) return '100-999';
  if (amount < 10_000) return '1,000-9,999';
  if (amount < 100_000) return '10,000-99,999';
  return '100,000+';
}

export function getPublicSourceLabel(countryData: CountryPriceIndexData): string {
  return countryData.publicSourceLabel;
}

export function getPublicSourceDetail(countryData: CountryPriceIndexData): string {
  return countryData.publicSourceDetail;
}

export function formatPlainAmount(
  countryData: CountryPriceIndexData,
  value: number,
  year = countryData.latestFinalYear
): string {
  const currency = getCurrencyForYear(countryData, year);

  return `${currency.currencySymbol}${new Intl.NumberFormat('en', {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value)}`;
}
