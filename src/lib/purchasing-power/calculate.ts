import { AmountSchema } from './schemas';
import { getCurrencyScaleToLatest } from './format';
import { buildTimelineYears } from './timeline';
import type { CountryPriceIndexData, TimelineNode } from './types';

export function validateAmount(amount: number): number {
  return AmountSchema.parse(amount);
}

export function calculatePurchasingPower(
  countryData: CountryPriceIndexData,
  startYear: number,
  amount: number
): TimelineNode[] {
  const validAmount = validateAmount(amount);
  const startPoint = countryData.priceIndex[String(startYear)];

  if (!startPoint || startPoint.status !== 'final') {
    throw new Error(`${startYear} is not an available final-data start year.`);
  }

  if (!countryData.availableStartYears.includes(startYear)) {
    throw new Error(`${startYear} is not selectable for ${countryData.countryName}.`);
  }

  const timelineYears = buildTimelineYears(countryData, startYear);
  const startIndex = startPoint.value;
  const startCurrencyScale = getCurrencyScaleToLatest(countryData, startYear);

  return timelineYears.map((year) => {
    const target = countryData.priceIndex[String(year)];

    if (!target) {
      throw new Error(`Missing price index value for ${countryData.countryName} in ${year}.`);
    }

    const targetCurrencyScale = getCurrencyScaleToLatest(countryData, year);
    const adjustedValue =
      validAmount * (startCurrencyScale / targetCurrencyScale) * (target.value / startIndex);

    return {
      year,
      indexValue: target.value,
      indexStatus: target.status,
      adjustedValue,
      percentChange: (adjustedValue / validAmount - 1) * 100
    };
  });
}
