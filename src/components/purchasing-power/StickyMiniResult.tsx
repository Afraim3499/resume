'use client';

import { formatCurrency, formatPlainAmount } from '@/lib/purchasing-power/format';
import type { CountryPriceIndexData, TimelineNode } from '@/lib/purchasing-power/types';

type StickyMiniResultProps = {
  visible: boolean;
  countryData: CountryPriceIndexData;
  amount: number;
  startYear: number;
  latestNode: TimelineNode;
};

export function StickyMiniResult({
  visible,
  countryData,
  amount,
  startYear,
  latestNode
}: StickyMiniResultProps) {
  return (
    <div
      className={`sticky-mini-result ${visible ? 'sticky-mini-result--visible' : ''}`}
      aria-label={`${formatPlainAmount(countryData, amount, startYear)} in ${startYear} equals ${formatCurrency(
        countryData,
        latestNode.adjustedValue,
        latestNode.year
      )} in ${latestNode.year}`}
    >
      <span>
        {formatPlainAmount(countryData, amount, startYear)} in {startYear}
      </span>
      <strong>{formatCurrency(countryData, latestNode.adjustedValue, latestNode.year)}</strong>
      <span>in {latestNode.year}</span>
    </div>
  );
}
