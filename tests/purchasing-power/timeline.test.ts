import { describe, expect, it } from 'vitest';
import { buildTimelineYears } from '../../src/lib/purchasing-power/timeline';
import { priceIndexMatrix } from '../../src/lib/purchasing-power/routes';

describe('buildTimelineYears', () => {
  it('starts with the selected year, then moves to decade multiples, then appends latest final year', () => {
    const countryData = priceIndexMatrix.countries['united-states'];

    expect(buildTimelineYears(countryData, 1950)).toEqual([
      1950,
      1960,
      1970,
      1980,
      1990,
      2000,
      2010,
      2020,
      2025
    ]);
  });

  it('moves a non-decade start year to the next decade multiple', () => {
    const countryData = priceIndexMatrix.countries['united-states'];
    const years = buildTimelineYears(countryData, 1953);

    expect(years.slice(0, 3)).toEqual([1953, 1960, 1970]);
    expect(years.at(-1)).toBe(2025);
  });

  it('rejects non-selectable start years', () => {
    const countryData = priceIndexMatrix.countries['united-states'];

    expect(() => buildTimelineYears(countryData, 1900)).toThrow();
  });

  it('uses Switzerland 2024 as the latest final endpoint', () => {
    const countryData = priceIndexMatrix.countries.switzerland;

    expect(buildTimelineYears(countryData, 1914).at(-1)).toBe(2024);
  });

  it('skips missing Iraq years without interpolation', () => {
    const countryData = priceIndexMatrix.countries.iraq;
    const years = buildTimelineYears(countryData, 1978);

    expect(years).toEqual([1978, 1990, 2000, 2010, 2020, 2024]);
    expect(countryData.priceIndex['1980']).toBeUndefined();
  });
});
