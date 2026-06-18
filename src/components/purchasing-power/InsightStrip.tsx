import { Banknote, CalendarDays, Landmark, TrendingUp } from 'lucide-react';
import {
  formatPercent,
  getPublicSourceDetail,
  getPublicSourceLabel
} from '@/lib/purchasing-power/format';
import type { CountryPriceIndexData, TimelineNode } from '@/lib/purchasing-power/types';

type InsightStripProps = {
  countryData: CountryPriceIndexData;
  startYear: number;
  latestNode: TimelineNode;
};

export function InsightStrip({ countryData, startYear, latestNode }: InsightStripProps) {
  const stats = [
    {
      icon: CalendarDays,
      label: 'Start year',
      value: String(startYear),
      detail: 'Selected start year'
    },
    {
      icon: CalendarDays,
      label: 'Latest comparison',
      value: String(latestNode.year),
      detail: 'Latest available year'
    },
    {
      icon: TrendingUp,
      label: 'Total change',
      value: formatPercent(latestNode.percentChange),
      detail: 'Change in purchasing power'
    },
    {
      icon: Landmark,
      label: 'Source series',
      value: getPublicSourceLabel(countryData),
      detail: getPublicSourceDetail(countryData)
    }
  ];

  return (
    <section className="section-inner insight-strip museum-label-strip" aria-label="Purchasing power summary">
      {stats.map((stat) => {
        const Icon = stat.icon === CalendarDays && stat.label === 'Latest comparison' ? Banknote : stat.icon;
        return (
          <div className="insight-item" key={stat.label}>
            <Icon size={30} aria-hidden="true" />
            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
