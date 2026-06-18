import { describe, expect, it } from 'vitest';
import { calculatePurchasingPower, validateAmount } from '../../src/lib/purchasing-power/calculate';
import { parseAmountInput } from '../../src/lib/purchasing-power/format';
import { priceIndexMatrix } from '../../src/lib/purchasing-power/routes';

describe('calculatePurchasingPower', () => {
  it('uses amount * targetIndex / startIndex for United States values', () => {
    const countryData = priceIndexMatrix.countries['united-states'];
    const nodes = calculatePurchasingPower(countryData, 1950, 100);
    const finalNode = nodes.at(-1);

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo((100 * 321.943) / 24.1, 8);
  });

  it('uses the UK RPI source values for United Kingdom calculations', () => {
    const countryData = priceIndexMatrix.countries['united-kingdom'];
    const nodes = calculatePurchasingPower(countryData, 1950, 100);
    const finalNode = nodes.at(-1);

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo((100 * 1588.6) / 33.0, 8);
  });

  it('applies domestic currency scaling for pre-decimal Australian pounds', () => {
    const countryData = priceIndexMatrix.countries.australia;
    const nodes = calculatePurchasingPower(countryData, 1949, 100);
    const finalNode = nodes.at(-1);
    const startIndex = countryData.priceIndex['1949'].value;
    const targetIndex = countryData.priceIndex['2025'].value;

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * 2 * (targetIndex / startIndex), 8);
  });

  it('applies old-franc scaling for French historical local currency', () => {
    const countryData = priceIndexMatrix.countries.france;
    const nodes = calculatePurchasingPower(countryData, 1901, 100);
    const finalNode = nodes.at(-1);

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * (1 / 655.957) * (100 / 0.03), 8);
  });

  it('applies Belgian franc scaling before the euro period', () => {
    const countryData = priceIndexMatrix.countries.belgium;
    const nodes = calculatePurchasingPower(countryData, 1920, 100);
    const finalNode = nodes.at(-1);
    const startIndex = countryData.priceIndex['1920'].value;
    const targetIndex = countryData.priceIndex['2025'].value;

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * (1 / 40.3399) * (targetIndex / startIndex), 8);
  });

  it('applies Irish pound scaling before the euro period', () => {
    const countryData = priceIndexMatrix.countries.ireland;
    const nodes = calculatePurchasingPower(countryData, 1975, 100);
    const finalNode = nodes.at(-1);
    const startIndex = countryData.priceIndex['1975'].value;
    const targetIndex = countryData.priceIndex['2025'].value;

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * (1 / 0.787564) * (targetIndex / startIndex), 8);
  });

  it('applies Finnish markka scaling before the euro period', () => {
    const countryData = priceIndexMatrix.countries.finland;
    const nodes = calculatePurchasingPower(countryData, 1900, 100);
    const finalNode = nodes.at(-1);
    const startIndex = countryData.priceIndex['1900'].value;
    const targetIndex = countryData.priceIndex['2025'].value;

    expect(finalNode?.year).toBe(2025);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * (1 / 5.94573) * (targetIndex / startIndex), 8);
  });

  it('uses 2024 as Switzerland latest final comparison year', () => {
    const countryData = priceIndexMatrix.countries.switzerland;
    const nodes = calculatePurchasingPower(countryData, 1914, 100);
    const finalNode = nodes.at(-1);

    expect(finalNode?.year).toBe(2024);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * (1104.1723 / 100), 8);
  });

  it('uses World Bank / IMF IFS annual CPI values for India', () => {
    const countryData = priceIndexMatrix.countries.india;
    const nodes = calculatePurchasingPower(countryData, 1960, 100);
    const finalNode = nodes.at(-1);
    const startIndex = countryData.priceIndex['1960'].value;
    const targetIndex = countryData.priceIndex['2024'].value;

    expect(finalNode?.year).toBe(2024);
    expect(finalNode?.adjustedValue).toBeCloseTo(100 * (targetIndex / startIndex), 8);
  });

  it('uses 2024 as the latest World Bank / IMF IFS comparison year', () => {
    const countries = ['bangladesh', 'nepal', 'pakistan', 'bhutan', 'china', 'iran', 'iraq'] as const;

    for (const country of countries) {
      const countryData = priceIndexMatrix.countries[country];
      const startYear = countryData.availableStartYears[0];
      const nodes = calculatePurchasingPower(countryData, startYear, 100);

      expect(nodes.at(-1)?.year).toBe(2024);
    }
  });

  it('rejects invalid numeric amounts', () => {
    expect(() => validateAmount(0)).toThrow();
    expect(() => validateAmount(-1)).toThrow();
    expect(() => validateAmount(1_000_000_000.01)).toThrow();
    expect(() => validateAmount(100.001)).toThrow();
  });

  it('allows valid numeric amounts through the approved range', () => {
    expect(validateAmount(0.01)).toBe(0.01);
    expect(validateAmount(100)).toBe(100);
    expect(validateAmount(100.25)).toBe(100.25);
    expect(validateAmount(1_000_000_000)).toBe(1_000_000_000);
  });

  it('parses user amount input without tracking exact values', () => {
    expect(parseAmountInput('1,000.25')).toEqual({
      ok: true,
      amount: 1000.25,
      normalized: '1000.25'
    });
    expect(parseAmountInput('100.001').ok).toBe(false);
  });
});
