import { describe, expect, it } from 'vitest';
import {
  buildPurchasingPowerHref,
  getCountryData,
  getNearestAvailableYears,
  isSupportedRoute,
  routeManifest
} from '../../src/lib/purchasing-power/routes';

describe('route manifest', () => {
  it('generates human-readable country slugs only', () => {
    const countries = new Set(routeManifest.routes.map((route) => route.country));

    expect(countries).toEqual(
      new Set([
        'united-states',
        'united-kingdom',
        'canada',
        'netherlands',
        'sweden',
        'france',
        'australia',
        'new-zealand',
        'denmark',
        'belgium',
        'ireland',
        'switzerland',
        'norway',
        'finland',
        'india',
        'bangladesh',
        'nepal',
        'pakistan',
        'bhutan',
        'china',
        'iran',
        'iraq'
      ])
    );
  });

  it('does not generate 2026 routes before final annual data is available', () => {
    expect(routeManifest.routes.some((route) => route.year === 2026)).toBe(false);
  });

  it('supports final-data routes and rejects unsupported years', () => {
    expect(isSupportedRoute('united-states', 1950)).toBe(true);
    expect(isSupportedRoute('united-states', 1900)).toBe(false);
    expect(isSupportedRoute('united-kingdom', 1900)).toBe(true);
    expect(isSupportedRoute('canada', 1914)).toBe(true);
    expect(isSupportedRoute('netherlands', 1900)).toBe(true);
    expect(isSupportedRoute('sweden', 1900)).toBe(true);
    expect(isSupportedRoute('france', 1901)).toBe(true);
    expect(isSupportedRoute('australia', 1949)).toBe(true);
    expect(isSupportedRoute('new-zealand', 1926)).toBe(true);
    expect(isSupportedRoute('denmark', 1900)).toBe(true);
    expect(isSupportedRoute('belgium', 1920)).toBe(true);
    expect(isSupportedRoute('ireland', 1975)).toBe(true);
    expect(isSupportedRoute('switzerland', 1914)).toBe(true);
    expect(isSupportedRoute('norway', 1900)).toBe(true);
    expect(isSupportedRoute('finland', 1900)).toBe(true);
    expect(isSupportedRoute('india', 1960)).toBe(true);
    expect(isSupportedRoute('bangladesh', 1986)).toBe(true);
    expect(isSupportedRoute('nepal', 1964)).toBe(true);
    expect(isSupportedRoute('pakistan', 1960)).toBe(true);
    expect(isSupportedRoute('bhutan', 1980)).toBe(true);
    expect(isSupportedRoute('china', 1986)).toBe(true);
    expect(isSupportedRoute('iran', 1960)).toBe(true);
    expect(isSupportedRoute('iraq', 1960)).toBe(true);
    expect(isSupportedRoute('united-kingdom', 2026)).toBe(false);
    expect(isSupportedRoute('australia', 1948)).toBe(false);
    expect(isSupportedRoute('switzerland', 2025)).toBe(false);
    expect(isSupportedRoute('india', 2025)).toBe(false);
    expect(isSupportedRoute('bangladesh', 1985)).toBe(false);
    expect(isSupportedRoute('iraq', 1980)).toBe(false);
  });

  it('returns nearest final years for helpful not-found states', () => {
    const countryData = getCountryData('united-states');

    expect(countryData).toBeDefined();
    expect(getNearestAvailableYears(countryData!, 1900, 3)).toEqual([1913, 1914, 1915]);
  });

  it('builds share and open-route URLs from committed state', () => {
    expect(
      buildPurchasingPowerHref({
        country: 'united-kingdom',
        year: 1900,
        amount: 100
      })
    ).toBe('/tools/purchasing-power/united-kingdom/1900?amount=100');

    expect(
      buildPurchasingPowerHref({
        country: 'united-kingdom',
        year: 1900
      })
    ).toBe('/tools/purchasing-power/united-kingdom/1900');
  });
});
