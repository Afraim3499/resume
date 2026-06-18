export const COUNTRY_SLUGS = [
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
] as const;

export type CountrySlug = (typeof COUNTRY_SLUGS)[number];

export type PriceIndexStatus = 'final' | 'partial' | 'estimate';

export type PriceIndexKind = 'CPI-U' | 'RPI' | 'CPI' | 'PRICE_INDEX';

export type CurrencyTransition = {
  fromYear: number;
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  scaleToLatest: number;
};

export type PriceIndexPoint = {
  year: number;
  value: number;
  status: PriceIndexStatus;
  sourceId: string;
  notes?: string;
};

export type CountryPriceIndexData = {
  slug: CountrySlug;
  countryName: string;
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
  amountLabel: string;
  currencyTransitions: CurrencyTransition[];
  indexKind: PriceIndexKind;
  publicIndexLabel: string;
  publicSourceLabel: string;
  publicSourceDetail: string;
  sourcePolicy: string;
  availableFrom: number;
  latestFinalYear: number;
  latestDisplayYear: number;
  sourceIds: string[];
  availableStartYears: number[];
  priceIndex: Record<string, PriceIndexPoint>;
};

export type PriceIndexMatrix = {
  schemaVersion: number;
  generatedAt: string;
  countries: Record<CountrySlug, CountryPriceIndexData>;
};

export type RouteManifest = {
  schemaVersion: number;
  generatedAt: string;
  routes: Array<{
    country: CountrySlug;
    year: number;
  }>;
};

export type TimelineNode = {
  year: number;
  indexValue: number;
  indexStatus: PriceIndexStatus;
  adjustedValue: number;
  percentChange: number;
  narrativeId?: string;
  caveatId?: string;
};

export type CalculationInput = {
  country: CountrySlug;
  startYear: number;
  amount: number;
};

export type CitationSource = {
  title: string;
  publisher: string;
  seriesId?: string;
  seriesLabel?: string;
  dataset?: string;
  indexKind: PriceIndexKind;
  basePeriod: string;
  sourceUrl: string;
  metadataUrl?: string;
  downloadUrl?: string;
  licenseNote: string;
  lastPulled: string;
  normalizedFile: string;
};

export type Citations = {
  schemaVersion: number;
  generatedAt: string;
  sources: Record<string, CitationSource>;
};
