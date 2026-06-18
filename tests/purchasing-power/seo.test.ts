import { describe, expect, it } from 'vitest';
import citationsJson from '../../src/content/purchasing-power/citations.json';
import { priceIndexMatrix } from '../../src/lib/purchasing-power/routes';
import {
  buildCanonicalUrl,
  buildPageDescription,
  buildPageTitle,
  buildPurchasingPowerJsonLd,
  getPrimarySource
} from '../../src/lib/purchasing-power/seo';
import type { Citations } from '../../src/lib/purchasing-power/types';

describe('SEO helpers', () => {
  it('builds canonicals without amount query parameters', () => {
    expect(buildCanonicalUrl('united-states', 1950)).toBe(
      'https://www.rizwanulafraim.com/tools/purchasing-power/united-states/1950'
    );
  });

  it('uses price index positioning rather than global CPI wording', () => {
    const description = buildPageDescription(1950);

    expect(description).toContain('official historical price index data');
    expect(description).not.toMatch(/global CPI|CPI-adjusted/i);
  });

  it('uses country-specific currency symbols in title examples', () => {
    expect(buildPageTitle(priceIndexMatrix.countries['united-states'], 1950)).toContain('$100');
    expect(buildPageTitle(priceIndexMatrix.countries['united-kingdom'], 1950)).toContain('\u00a3100');
    expect(buildPageTitle(priceIndexMatrix.countries.netherlands, 1900)).toContain('\u0192100');
    expect(buildPageTitle(priceIndexMatrix.countries.australia, 1949)).toContain('\u00a3A100');
    expect(buildPageTitle(priceIndexMatrix.countries['new-zealand'], 1926)).toContain('NZ\u00a3100');
    expect(buildPageTitle(priceIndexMatrix.countries.belgium, 1920)).toContain('BEF100');
    expect(buildPageTitle(priceIndexMatrix.countries.belgium, 2002)).toContain('\u20ac100');
    expect(buildPageTitle(priceIndexMatrix.countries.ireland, 1975)).toContain('IEP100');
    expect(buildPageTitle(priceIndexMatrix.countries.switzerland, 1914)).toContain('CHF 100');
    expect(buildPageTitle(priceIndexMatrix.countries.denmark, 1900)).toContain('kr100');
    expect(buildPageTitle(priceIndexMatrix.countries.norway, 1900)).toContain('kr100');
    expect(buildPageTitle(priceIndexMatrix.countries.finland, 1900)).toContain('mk100');
    expect(buildPageTitle(priceIndexMatrix.countries.india, 1960)).toContain('\u20b9100');
    expect(buildPageTitle(priceIndexMatrix.countries.bangladesh, 1986)).toContain('\u09f3100');
    expect(buildPageTitle(priceIndexMatrix.countries.nepal, 1964)).toContain('Rs100');
    expect(buildPageTitle(priceIndexMatrix.countries.pakistan, 1960)).toContain('Rs100');
    expect(buildPageTitle(priceIndexMatrix.countries.bhutan, 1980)).toContain('Nu.100');
    expect(buildPageTitle(priceIndexMatrix.countries.china, 1986)).toContain('\u00a5100');
    expect(buildPageTitle(priceIndexMatrix.countries.iran, 1960)).toContain('IRR 100');
    expect(buildPageTitle(priceIndexMatrix.countries.iraq, 1960)).toContain('IQD 100');
  });

  it('builds answer-focused metadata descriptions with source labels', () => {
    const description = buildPageDescription(1950, priceIndexMatrix.countries['united-states']);

    expect(description).toContain('BLS CPI-U');
    expect(description).toContain('official historical price index data');
    expect(description).not.toMatch(/global CPI/i);
  });

  it('labels World Bank / IMF IFS pages explicitly', () => {
    const description = buildPageDescription(1960, priceIndexMatrix.countries.india);

    expect(description).toContain('World Bank / IMF IFS CPI');
    expect(description).toContain('official historical price index data');
  });

  it('builds a structured data graph for answer engines and search crawlers', () => {
    const citations = citationsJson as Citations;
    const countryData = priceIndexMatrix.countries['united-kingdom'];
    const jsonLd = buildPurchasingPowerJsonLd({
      countryData,
      year: 1900,
      source: getPrimarySource(countryData, citations.sources)
    });

    const graph = jsonLd['@graph'];
    const types = graph.map((node) => node['@type']);

    expect(types).toContain('WebPage');
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('Question');
    expect(types).toContain('WebApplication');
    expect(types).toContain('Dataset');
    expect(types).toContain('Article');
    expect(types).not.toContain('FAQPage');
    expect(JSON.stringify(jsonLd)).toContain('ONS long-run RPI');
    expect(JSON.stringify(jsonLd)).not.toMatch(/modern CPI/i);
  });
});
