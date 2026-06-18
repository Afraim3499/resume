import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { getPublicSourceLabel } from '@/lib/purchasing-power/format';
import { countries } from '@/lib/purchasing-power/routes';

export function MethodologyPreview() {
  return (
    <section className="section-inner methodology-preview" aria-label="Methodology preview">
      <article>
        <p className="eyebrow">About the methodology</p>
        <p>
          We use official historical price index data to estimate how purchasing power has changed
          over time. Different countries use different official source series.
        </p>
        <Link className="button" href="/tools/purchasing-power/methodology">
          Read full methodology
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </article>

      <article>
        <p className="eyebrow">Price index sources</p>
        <dl className="source-list">
          {countries.map((country) => (
            <div key={country.slug}>
              <dt>{country.countryName}</dt>
              <dd>{getPublicSourceLabel(country)}</dd>
            </div>
          ))}
        </dl>
        <p>Coverage varies by country and data source.</p>
      </article>

      <article className="methodology-preview__notes">
        <p className="eyebrow">Important notes</p>
        <ul>
          <li>
            <Info size={16} aria-hidden="true" /> Estimates reflect price index changes, not income
            or wages.
          </li>
          <li>
            <Info size={16} aria-hidden="true" /> Amounts stay in their historical local currency.
          </li>
          <li>
            <Info size={16} aria-hidden="true" /> This is educational context, not financial
            advice.
          </li>
        </ul>
      </article>
    </section>
  );
}
