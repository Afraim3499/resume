import { bucketAmount } from './format';
import type { CountrySlug } from './types';

export type CalculationAnalyticsEvent = {
  country: CountrySlug;
  startYear: number;
  estimateEndpointShown: boolean;
  amountBucket: string;
};

export function buildCalculationAnalyticsEvent(input: {
  country: CountrySlug;
  startYear: number;
  amount: number;
  estimateEndpointShown: boolean;
}): CalculationAnalyticsEvent {
  return {
    country: input.country,
    startYear: input.startYear,
    estimateEndpointShown: input.estimateEndpointShown,
    amountBucket: bucketAmount(input.amount)
  };
}

export function trackCalculation(_event: CalculationAnalyticsEvent): void {
  // Provider wiring is intentionally deferred until analytics is selected.
}
