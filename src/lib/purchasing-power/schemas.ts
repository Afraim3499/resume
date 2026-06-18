import { z } from 'zod';
import { COUNTRY_SLUGS } from './types';

export const PriceIndexStatusSchema = z.enum(['final', 'partial', 'estimate']);

export const PriceIndexKindSchema = z.enum(['CPI-U', 'RPI', 'CPI', 'PRICE_INDEX']);

export const CountrySlugSchema = z.enum(COUNTRY_SLUGS);

export const PriceIndexCsvRowSchema = z.object({
  country_slug: CountrySlugSchema,
  year: z.coerce.number().int().min(1800).max(2100),
  index_value: z.coerce.number().positive(),
  index_status: PriceIndexStatusSchema,
  source_id: z.string().min(1),
  series_id: z.string().min(1),
  index_kind: PriceIndexKindSchema,
  base_period: z.string().min(1),
  notes: z.string().optional()
});

export const AmountSchema = z
  .number()
  .gt(0)
  .max(1_000_000_000)
  .refine((value) => Number.isFinite(value), {
    message: 'Amount must be a finite number'
  })
  .refine((value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-8, {
    message: 'Amount may have up to 2 decimal places'
  });

export const RouteParamsSchema = z.object({
  country: CountrySlugSchema,
  year: z.coerce.number().int()
});

export const CountryMetadataSchema = z.object({
  slug: CountrySlugSchema,
  countryName: z.string().min(1),
  countryCode: z.string().min(2),
  currencyCode: z.string().min(2),
  currencySymbol: z.string().min(1),
  amountLabel: z.string().min(1),
  currencyTransitions: z
    .array(
      z.object({
        fromYear: z.number().int().min(1800),
        currencyCode: z.string().min(2),
        currencySymbol: z.string().min(1),
        currencyName: z.string().min(1),
        scaleToLatest: z.number().positive()
      })
    )
    .min(1),
  indexKind: PriceIndexKindSchema,
  publicIndexLabel: z.string().min(1),
  publicSourceLabel: z.string().min(1),
  publicSourceDetail: z.string().min(1),
  sourcePolicy: z.string().min(1),
  availableFrom: z.number().int(),
  latestFinalYear: z.number().int(),
  latestDisplayYear: z.number().int(),
  sourceIds: z.array(z.string().min(1)).min(1)
});

export const CountriesSourceSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  countries: z.record(CountrySlugSchema, CountryMetadataSchema)
});

export const CitationSourceSchema = z.object({
  title: z.string().min(1),
  publisher: z.string().min(1),
  seriesId: z.string().optional(),
  seriesLabel: z.string().optional(),
  dataset: z.string().optional(),
  indexKind: PriceIndexKindSchema,
  basePeriod: z.string().min(1),
  sourceUrl: z.string().url(),
  metadataUrl: z.string().url().optional(),
  downloadUrl: z.string().url().optional(),
  licenseNote: z.string().min(1),
  lastPulled: z.string().min(1),
  normalizedFile: z.string().min(1)
});

export const CitationsSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  sources: z.record(z.string().min(1), CitationSourceSchema)
});

export type PriceIndexCsvRow = z.infer<typeof PriceIndexCsvRowSchema>;
