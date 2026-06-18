import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, Info, Map } from 'lucide-react';
import {
  formatCurrency,
  formatPlainAmount,
  getPublicSourceLabel
} from '@/lib/purchasing-power/format';
import type { CountryPriceIndexData, TimelineNode } from '@/lib/purchasing-power/types';

type HeroResultProps = {
  countryData: CountryPriceIndexData;
  startYear: number;
  amount: number;
  latestNode: TimelineNode;
  onCalculatorClick: () => void;
};

export function HeroResult({
  countryData,
  startYear,
  amount,
  latestNode,
  onCalculatorClick
}: HeroResultProps) {
  const startAmount = formatPlainAmount(countryData, amount, startYear);
  const latestAmount = formatCurrency(countryData, latestNode.adjustedValue, latestNode.year);
  const sourceLabel = getPublicSourceLabel(countryData);

  return (
    <section className="hero">
      <div className="hero__texture" aria-hidden="true" />
      <div className="section-inner editorial-hero">
        <div className="hero-kicker">
          <span className="country-mark" aria-hidden="true" />
          <p className="eyebrow">Purchasing Power Roadmap</p>
          <span>{countryData.countryName}</span>
        </div>

        <div className="hero-statement">
          <p>Historical money, translated through official price index data</p>
          <h1 aria-label={`${startAmount} in ${startYear} means ${latestAmount} in ${latestNode.year}`}>
            {startAmount} in {startYear}{' '}
            <span>means {latestAmount} in {latestNode.year}</span>
          </h1>
        </div>

        <div className="museum-hero-grid">
          <div className="map-artifact" aria-hidden="true">
            <div className="map-artifact__label">
              <Map size={17} />
              purchasing power route
            </div>
            <div className="map-route">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="hero-result" aria-label="Main purchasing power result">
            <div className="hero-result__top">
              <div>
                <strong>{startAmount}</strong>
                <span>in {startYear}</span>
              </div>
              <ArrowRight className="hero-result__arrow" size={34} aria-hidden="true" />
              <div>
                <strong>{latestAmount}</strong>
                <span>by {latestNode.year}</span>
              </div>
            </div>

            <div className="hero-result__statement" key={`${countryData.slug}-${startYear}-${amount}`}>
              <p>
                {startAmount} in {startYear} has roughly the same purchasing power as
              </p>
              <strong>{latestAmount}</strong>
              <p>in {latestNode.year}.</p>
            </div>

            <div className="source-pill">
              <Info size={16} aria-hidden="true" />
              Source: {sourceLabel}
            </div>
          </div>
        </div>

        <div className="hero-actions">
          <button className="button button--primary" type="button" onClick={onCalculatorClick}>
            <Calculator size={18} aria-hidden="true" />
            Calculate another amount
          </button>
          <Link className="button button--ghost" href="/tools/purchasing-power/methodology">
            <BookOpen size={18} aria-hidden="true" />
            Read methodology
          </Link>
        </div>
      </div>
    </section>
  );
}
