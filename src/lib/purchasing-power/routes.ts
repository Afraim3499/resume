import matrixJson from '@/data/purchasing-power/generated/price-index-matrix.json';
import routesJson from '@/data/purchasing-power/generated/routes.json';
import { COUNTRY_SLUGS } from './types';
import type { CountryPriceIndexData, CountrySlug, PriceIndexMatrix, RouteManifest } from './types';

export const priceIndexMatrix = matrixJson as PriceIndexMatrix;
export const routeManifest = routesJson as RouteManifest;

export const countries = Object.values(priceIndexMatrix.countries);

export function isCountrySlug(value: string): value is CountrySlug {
  return (COUNTRY_SLUGS as readonly string[]).includes(value);
}

export function getCountryData(country: string): CountryPriceIndexData | undefined {
  if (!isCountrySlug(country)) {
    return undefined;
  }

  return priceIndexMatrix.countries[country];
}

export function isSupportedRoute(country: string, year: number): boolean {
  const countryData = getCountryData(country);

  if (!countryData) {
    return false;
  }

  return countryData.availableStartYears.includes(year);
}

export function getNearestAvailableYears(
  countryData: CountryPriceIndexData,
  year: number,
  limit = 6
): number[] {
  return [...countryData.availableStartYears]
    .sort((a, b) => Math.abs(a - year) - Math.abs(b - year) || a - b)
    .slice(0, limit)
    .sort((a, b) => a - b);
}

export function getDefaultRouteForCountry(country: CountrySlug): { country: CountrySlug; year: number } {
  const countryData = priceIndexMatrix.countries[country];
  const fallbackYear = countryData.availableStartYears.includes(1950)
    ? 1950
    : countryData.availableStartYears[0];

  return { country, year: fallbackYear };
}

export function buildPurchasingPowerHref(input: {
  country: CountrySlug;
  year: number;
  amount?: number;
}): string {
  const path = `/tools/purchasing-power/${input.country}/${input.year}`;

  if (input.amount === undefined) {
    return path;
  }

  return `${path}?amount=${encodeURIComponent(formatAmountForQuery(input.amount))}`;
}

export function formatAmountForQuery(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}
