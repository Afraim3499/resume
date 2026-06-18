import type { PriceIndexStatus } from '@/lib/purchasing-power/types';

export function EstimateBadge({ status }: { status: PriceIndexStatus }) {
  if (status === 'final') {
    return null;
  }

  return <span className="badge">Estimate / partial data</span>;
}
