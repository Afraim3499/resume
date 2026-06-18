import { parseAmountInput } from './format';
import {
  formatAmountForQuery,
  getCountryData,
  getDefaultRouteForCountry,
  isCountrySlug,
  isSupportedRoute
} from './routes';
import type { CountrySlug } from './types';

export type CommittedState = {
  country: CountrySlug;
  year: number;
  amount: number;
};

export function getCommittedStateFromPath(input: {
  pathname: string;
  amountParam: string | null;
  initialCountry: CountrySlug;
  initialYear: number;
  initialAmount: number;
  readAmountFromQuery: boolean;
}): CommittedState {
  const parts = input.pathname.split('/').filter(Boolean);
  const countryPart = parts.at(-2);
  const yearPart = Number(parts.at(-1));
  const initialCountryData = getCountryData(input.initialCountry);
  const fallback = getDefaultRouteForCountry(input.initialCountry);
  const safeInitialYear = initialCountryData?.availableStartYears.includes(input.initialYear)
    ? input.initialYear
    : fallback.year;

  let country = input.initialCountry;
  let year = safeInitialYear;

  if (
    countryPart &&
    isCountrySlug(countryPart) &&
    Number.isInteger(yearPart) &&
    isSupportedRoute(countryPart, yearPart)
  ) {
    country = countryPart;
    year = yearPart;
  }

  let amount = input.initialAmount;
  if (input.readAmountFromQuery && input.amountParam) {
    const parsed = parseAmountInput(input.amountParam);
    if (parsed.ok) {
      amount = parsed.amount;
    }
  }

  return { country, year, amount };
}

export function getDraftAmountInputFromQuery(input: {
  amount: number;
  amountParam: string | null;
  readAmountFromQuery: boolean;
}): string {
  if (input.readAmountFromQuery && input.amountParam !== null) {
    const parsed = parseAmountInput(input.amountParam);

    if (!parsed.ok) {
      return input.amountParam;
    }
  }

  return formatAmountForQuery(input.amount);
}
