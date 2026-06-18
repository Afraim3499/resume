import { Info } from 'lucide-react';
import { getCaveat } from '@/lib/purchasing-power/content';
import type { CountryPriceIndexData } from '@/lib/purchasing-power/types';

type CaveatPanelProps = {
  countryData: CountryPriceIndexData;
  startYear: number;
};

export function CaveatPanel({ countryData, startYear }: CaveatPanelProps) {
  const caveat = getCaveat(countryData.slug, startYear);

  if (!caveat) {
    return (
      <div className="source-caveat-row">
        <Info size={16} aria-hidden="true" />
        <span>
          Amounts stay in the historical local currency. This tool does not perform foreign
          exchange conversion.
        </span>
      </div>
    );
  }

  return (
    <div className="source-caveat-row source-caveat-row--gold">
      <Info size={16} aria-hidden="true" />
      <span>{caveat}</span>
    </div>
  );
}
