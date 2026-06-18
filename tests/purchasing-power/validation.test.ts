import { describe, expect, it } from 'vitest';
import { generatePriceIndexData } from '../../scripts/purchasing-power/generate-price-index-data';
import { priceIndexMatrix, routeManifest } from '../../src/lib/purchasing-power/routes';

describe('data validation pipeline', () => {
  it('can regenerate the runtime matrix and route manifest from source CSV files', () => {
    const generated = generatePriceIndexData(false);

    expect(generated.matrix).toEqual(priceIndexMatrix);
    expect(generated.routeManifest).toEqual(routeManifest);
  });

  it('keeps selectable start years final-only', () => {
    for (const countryData of Object.values(priceIndexMatrix.countries)) {
      for (const year of countryData.availableStartYears) {
        expect(countryData.priceIndex[String(year)]?.status).toBe('final');
      }
    }
  });

  it('keeps source-specific index kinds separate', () => {
    expect(priceIndexMatrix.countries['united-states'].indexKind).toBe('CPI-U');
    expect(priceIndexMatrix.countries['united-kingdom'].indexKind).toBe('RPI');
    expect(priceIndexMatrix.countries.canada.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.netherlands.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.sweden.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.france.indexKind).toBe('PRICE_INDEX');
    expect(priceIndexMatrix.countries.australia.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries['new-zealand'].indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.denmark.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.belgium.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.ireland.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.switzerland.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.norway.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.finland.indexKind).toBe('PRICE_INDEX');
    expect(priceIndexMatrix.countries.india.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.bangladesh.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.nepal.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.pakistan.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.bhutan.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.china.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.iran.indexKind).toBe('CPI');
    expect(priceIndexMatrix.countries.iraq.indexKind).toBe('CPI');
  });
});
