import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'csv-parse/sync';
import {
  CitationsSchema,
  CountriesSourceSchema,
  PriceIndexCsvRowSchema,
  type PriceIndexCsvRow
} from '../../src/lib/purchasing-power/schemas';
import type { CountryPriceIndexData, CountrySlug, PriceIndexMatrix, RouteManifest } from '../../src/lib/purchasing-power/types';

const ROOT = process.cwd();
const SOURCE_DIR = join(ROOT, 'src', 'data', 'purchasing-power', 'source');
const GENERATED_DIR = join(ROOT, 'src', 'data', 'purchasing-power', 'generated');
const CITATIONS_PATH = join(ROOT, 'src', 'content', 'purchasing-power', 'citations.json');

const EXPECTED_COLUMNS = [
  'country_slug',
  'year',
  'index_value',
  'index_status',
  'source_id',
  'series_id',
  'index_kind',
  'base_period',
  'notes'
];

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function readCsvRows(path: string): PriceIndexCsvRow[] {
  const raw = readFileSync(path, 'utf8');
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  }) as unknown[];

  const header = raw.split(/\r?\n/, 1)[0]?.split(',') ?? [];
  if (header.join('|') !== EXPECTED_COLUMNS.join('|')) {
    throw new Error(`Unexpected CSV header in ${path}: ${header.join(',')}`);
  }

  return records.map((record, index) => {
    const parsed = PriceIndexCsvRowSchema.safeParse(record);
    if (!parsed.success) {
      throw new Error(`Invalid row ${index + 2} in ${path}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
}

function buildData() {
  const countriesSource = CountriesSourceSchema.parse(readJson(join(SOURCE_DIR, 'countries.json')));
  const citations = CitationsSchema.parse(readJson(CITATIONS_PATH));
  const csvFiles = readdirSync(SOURCE_DIR)
    .filter((file) => /^price-index\.[a-z-]+\.csv$/.test(file))
    .sort()
    .map((file) => join(SOURCE_DIR, file));
  const rows = csvFiles.flatMap(readCsvRows);
  const seen = new Set<string>();
  const grouped = new Map<CountrySlug, PriceIndexCsvRow[]>();

  for (const row of rows) {
    const key = `${row.country_slug}:${row.year}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate price index row for ${key}`);
    }
    seen.add(key);

    const country = countriesSource.countries[row.country_slug];
    if (!country) {
      throw new Error(`Unknown country slug ${row.country_slug}`);
    }

    if (country.indexKind !== row.index_kind) {
      throw new Error(
        `Index kind mismatch for ${row.country_slug} ${row.year}: ${row.index_kind} should be ${country.indexKind}`
      );
    }

    if (!country.sourceIds.includes(row.source_id)) {
      throw new Error(`Source ${row.source_id} is not registered for ${row.country_slug}`);
    }

    if (!citations.sources[row.source_id]) {
      throw new Error(`Missing citation source ${row.source_id}`);
    }

    if (row.index_status !== 'final' && !row.notes?.trim()) {
      throw new Error(`Estimate/partial row ${key} needs notes.`);
    }

    grouped.set(row.country_slug, [...(grouped.get(row.country_slug) ?? []), row]);
  }

  const countries = {} as PriceIndexMatrix['countries'];
  const routes: RouteManifest['routes'] = [];

  for (const [slug, metadata] of Object.entries(countriesSource.countries) as Array<
    [CountrySlug, (typeof countriesSource.countries)[CountrySlug]]
  >) {
    if (!metadata) {
      throw new Error(`Missing metadata for ${slug}`);
    }

    const countryRows = (grouped.get(slug) ?? []).sort((a, b) => a.year - b.year);
    if (!countryRows.length) {
      throw new Error(`No rows found for ${slug}`);
    }

    const finalRows = countryRows.filter((row) => row.index_status === 'final');
    if (!finalRows.length) {
      throw new Error(`No final rows found for ${slug}`);
    }

    const availableStartYears = finalRows.map((row) => row.year);
    const latestFinalYear = availableStartYears.at(-1);
    if (!latestFinalYear) {
      throw new Error(`Unable to determine latest final year for ${slug}`);
    }

    if (latestFinalYear !== metadata.latestFinalYear) {
      throw new Error(
        `latestFinalYear mismatch for ${slug}: countries.json has ${metadata.latestFinalYear}, CSV has ${latestFinalYear}`
      );
    }

    if (metadata.latestDisplayYear > metadata.latestFinalYear) {
      const displayRow = countryRows.find((row) => row.year === metadata.latestDisplayYear);
      if (!displayRow || displayRow.index_status === 'final') {
        throw new Error(`Invalid latestDisplayYear for ${slug}`);
      }
    }

    const countryData: CountryPriceIndexData = {
      ...metadata,
      availableStartYears,
      priceIndex: Object.fromEntries(
        countryRows.map((row) => [
          String(row.year),
          {
            year: row.year,
            value: row.index_value,
            status: row.index_status,
            sourceId: row.source_id,
            notes: row.notes
          }
        ])
      )
    };

    countries[slug] = countryData;

    for (const year of availableStartYears) {
      routes.push({ country: slug, year });
    }
  }

  const generatedAt = countriesSource.generatedAt;
  const matrix: PriceIndexMatrix = {
    schemaVersion: 1,
    generatedAt,
    countries
  };
  const routeManifest: RouteManifest = {
    schemaVersion: 1,
    generatedAt,
    routes
  };

  return { matrix, routeManifest };
}

export function generatePriceIndexData(write = true) {
  const generated = buildData();

  if (write) {
    mkdirSync(GENERATED_DIR, { recursive: true });
    writeJson(join(GENERATED_DIR, 'price-index-matrix.json'), generated.matrix);
    writeJson(join(GENERATED_DIR, 'routes.json'), generated.routeManifest);
  }

  return generated;
}

function writeJson(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generatePriceIndexData(true);
  console.log('Generated price index matrix and route manifest.');
}
