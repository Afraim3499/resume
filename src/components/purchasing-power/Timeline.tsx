import type { CountryPriceIndexData, TimelineNode } from '@/lib/purchasing-power/types';
import { TimelineCard } from './TimelineCard';

type TimelineProps = {
  countryData: CountryPriceIndexData;
  nodes: TimelineNode[];
};

export function Timeline({ countryData, nodes }: TimelineProps) {
  return (
    <div
      className="timeline journey-timeline"
      data-testid="roadmap-timeline"
      aria-label="Purchasing power roadmap timeline"
    >
      {nodes.map((node, index) => (
        <TimelineCard
          key={node.year}
          countryData={countryData}
          node={node}
          isFinal={index === nodes.length - 1}
        />
      ))}
    </div>
  );
}
