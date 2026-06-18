import Link from 'next/link';
import citationsJson from '@/content/purchasing-power/citations.json';
import { getCaveat, getNarrative } from '@/lib/purchasing-power/content';
import {
  buildPurchasingPowerHref,
  getNearestAvailableYears,
  priceIndexMatrix
} from '@/lib/purchasing-power/routes';
import { buildSeoResult, getPrimarySource } from '@/lib/purchasing-power/seo';
import type { Citations, CountryPriceIndexData } from '@/lib/purchasing-power/types';

type SeoAnswerSectionProps = {
  countryData: CountryPriceIndexData;
  startYear: number;
};

export function SeoAnswerSection({ countryData, startYear }: SeoAnswerSectionProps) {
  const citations = citationsJson as Citations;
  const source = getPrimarySource(countryData, citations.sources);
  const result = buildSeoResult(countryData, startYear);
  const startNarrative = getNarrative(countryData.slug, startYear);
  const latestNarrative = getNarrative(countryData.slug, result.latestYear);
  const caveat = getCaveat(countryData.slug, startYear);
  const relatedYears = getNearestAvailableYears(countryData, startYear, 5).filter(
    (year) => year !== startYear
  );
  const otherCountries = Object.values(priceIndexMatrix.countries).filter(
    (country) => country.slug !== countryData.slug
  );

  return (
    <section className="section-inner seo-answer-section" aria-labelledby="seo-answer-heading">
      <div className="seo-answer-section__intro">
        <p className="eyebrow">Answer-ready summary</p>
        <h2 id="seo-answer-heading">
          How much is {result.startAmount} in {startYear} worth in {result.latestYear}?
        </h2>
        <p>
          {result.answerText} This is an inflation-adjusted purchasing power estimate based on a
          historical price index, not a wage, asset, or foreign exchange conversion.
        </p>
      </div>

      <div className="seo-answer-grid">
        <article className="seo-answer-card seo-answer-card--featured">
          <p className="eyebrow">Direct answer</p>
          <h3>
            {result.startAmount} in {startYear} equals about {result.latestAmount} in{' '}
            {result.latestYear}
          </h3>
          <p>
            The result compares prices within {countryData.countryName} using{' '}
            {result.sourceLabel}. The total purchasing power change is {result.percentChange}.
          </p>
        </article>

        <article className="seo-answer-card">
          <p className="eyebrow">Formula</p>
          <h3>Price index ratio</h3>
          <p>{result.formulaText}</p>
          <p>
            The start year must exist as final source data. Missing years are not interpolated in
            this MVP.
          </p>
        </article>

        <article className="seo-answer-card">
          <p className="eyebrow">Source</p>
          <h3>{result.sourceLabel}</h3>
          <p>
            {source
              ? `${source.publisher}: ${source.seriesLabel ?? source.title}.`
              : `${result.sourceLabel}: ${result.sourceDetail}.`}
          </p>
          {source ? (
            <p>
              <a href={source.sourceUrl}>Open official source</a>
            </p>
          ) : null}
        </article>

        <article className="seo-answer-card">
          <p className="eyebrow">Historical context</p>
          <h3>{startNarrative.title}</h3>
          <p>{startNarrative.body}</p>
        </article>

        <article className="seo-answer-card">
          <p className="eyebrow">Latest context</p>
          <h3>{latestNarrative.title}</h3>
          <p>{latestNarrative.body}</p>
        </article>

        <article className="seo-answer-card">
          <p className="eyebrow">Important limits</p>
          <h3>What this result does not claim</h3>
          <p>
            Amounts remain in historical local currency. The calculation does not convert to U.S.
            dollars, model incomes, estimate investment returns, or compare living standards.
          </p>
          {caveat ? <p>{caveat}</p> : null}
        </article>
      </div>

      <div className="seo-link-cluster" aria-label="Related purchasing power pages">
        <div>
          <p className="eyebrow">Related years</p>
          <div className="seo-link-list">
            {relatedYears.map((year) => (
              <Link
                key={year}
                href={buildPurchasingPowerHref({
                  country: countryData.slug,
                  year
                })}
              >
                {countryData.countryName} {year}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Other supported countries</p>
          <div className="seo-link-list">
            {otherCountries.map((country) => {
              const year = country.availableStartYears.includes(startYear)
                ? startYear
                : country.availableStartYears.includes(1950)
                  ? 1950
                  : country.availableStartYears[0];

              return (
                <Link
                  key={country.slug}
                  href={buildPurchasingPowerHref({
                    country: country.slug,
                    year
                  })}
                >
                  {country.countryName} {year}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
