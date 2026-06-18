import type { CountryPriceIndexData } from './types';

export function buildTimelineYears(
  countryData: CountryPriceIndexData,
  startYear: number
): number[] {
  if (!countryData.availableStartYears.includes(startYear)) {
    throw new Error(`${startYear} is not an available final-data start year.`);
  }

  const years = new Set<number>([startYear]);
  const nextDecade = Math.ceil((startYear + 1) / 10) * 10;

  for (let year = nextDecade; year <= countryData.latestFinalYear; year += 10) {
    if (countryData.priceIndex[String(year)]) {
      years.add(year);
    }
  }

  const latestDisplayYear = countryData.latestDisplayYear;
  if (countryData.priceIndex[String(latestDisplayYear)]) {
    years.add(latestDisplayYear);
  }

  return Array.from(years).sort((a, b) => a - b);
}
