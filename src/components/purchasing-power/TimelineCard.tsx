import { Gauge, Landmark, MapPin, TrendingUp, Users } from 'lucide-react';
import { getNarrative } from '@/lib/purchasing-power/content';
import { formatCurrency, formatPercent, getPublicSourceLabel } from '@/lib/purchasing-power/format';
import type { CountryPriceIndexData, TimelineNode } from '@/lib/purchasing-power/types';
import { EstimateBadge } from './EstimateBadge';

type TimelineCardProps = {
  countryData: CountryPriceIndexData;
  node: TimelineNode;
  isFinal?: boolean;
};

export function TimelineCard({ countryData, node, isFinal = false }: TimelineCardProps) {
  const narrative = getNarrative(countryData.slug, node.year);
  const stakeholders = narrative.stakeholders ?? [getPublicSourceLabel(countryData)];
  const driver = narrative.driver ?? 'Price index ratio and local-currency context';
  const outcome =
    narrative.outcome ??
    `${isFinal ? 'Latest endpoint' : 'Timeline node'} from ${getPublicSourceLabel(countryData)}.`;
  const evidence = narrative.evidence ?? countryData.publicSourceDetail;

  return (
    <article className={`timeline-card ${isFinal ? 'timeline-card--final' : ''}`}>
      <div className="timeline-dot" aria-hidden="true">
        <MapPin size={14} />
      </div>
      <div className="timeline-card__year">
        <span className="year-badge">{node.year}</span>
        <div className="timeline-card__metric">
          <strong>{formatCurrency(countryData, node.adjustedValue, node.year)}</strong>
          <span>{formatPercent(node.percentChange)} vs. start amount</span>
        </div>
      </div>
      <div className="timeline-card__story">
        <h3>{narrative.title}</h3>
        <p className="small-note">{narrative.body}</p>
      </div>
      <div className="timeline-card__evidence" aria-label={`Historical context for ${node.year}`}>
        <div className="timeline-card__event">
          <span>
            <Landmark size={15} aria-hidden="true" />
            Historical marker
          </span>
          <strong>{narrative.event ?? (isFinal ? 'Latest comparison year' : 'Price index context')}</strong>
        </div>

        <div className="timeline-card__fact">
          <Users size={15} aria-hidden="true" />
          <div>
            <span>Stakeholders</span>
            <strong>{stakeholders.slice(0, 3).join(', ')}</strong>
          </div>
        </div>

        <div className="timeline-card__fact">
          <Gauge size={15} aria-hidden="true" />
          <div>
            <span>Price pressure</span>
            <strong>{driver}</strong>
          </div>
        </div>

        <div className="timeline-card__context-line">
          <TrendingUp size={15} aria-hidden="true" />
          <span>{outcome}</span>
        </div>

        <small>{evidence}</small>
      </div>
      <EstimateBadge status={node.indexStatus} />
    </article>
  );
}
