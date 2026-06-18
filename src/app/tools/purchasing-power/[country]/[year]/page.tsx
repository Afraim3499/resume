import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import citationsJson from '@/content/purchasing-power/citations.json';
import { CalculatorShell } from '@/components/purchasing-power/CalculatorShell';
import { JsonLd } from '@/components/purchasing-power/JsonLd';
import { SeoAnswerSection } from '@/components/purchasing-power/SeoAnswerSection';
import { getCountryData, isSupportedRoute, routeManifest } from '@/lib/purchasing-power/routes';
import {
  buildPurchasingPowerJsonLd,
  buildPurchasingPowerMetadata,
  getPrimarySource
} from '@/lib/purchasing-power/seo';
import type { Citations, CountrySlug } from '@/lib/purchasing-power/types';

type PageProps = {
  params: Promise<{
    country: string;
    year: string;
  }>;
};

export function generateStaticParams() {
  return routeManifest.routes.map((route) => ({
    country: route.country,
    year: String(route.year)
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, year } = await params;
  const numericYear = Number(year);
  const countryData = getCountryData(country);

  if (!countryData || !Number.isInteger(numericYear) || !isSupportedRoute(country, numericYear)) {
    return {
      title: 'Purchasing power year unavailable',
      robots: {
        index: false,
        follow: true
      }
    };
  }

  return buildPurchasingPowerMetadata(countryData, numericYear);
}

export default async function PurchasingPowerCountryYearPage({ params }: PageProps) {
  const { country, year } = await params;
  const numericYear = Number(year);
  const countryData = getCountryData(country);
  const citations = citationsJson as Citations;

  if (!countryData || !Number.isInteger(numericYear) || !isSupportedRoute(country, numericYear)) {
    notFound();
  }

  const source = getPrimarySource(countryData, citations.sources);
  const jsonLd = buildPurchasingPowerJsonLd({
    countryData,
    year: numericYear,
    source
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Suspense fallback={null}>
        <CalculatorShell
          initialCountry={countryData.slug as CountrySlug}
          initialYear={numericYear}
          initialAmount={100}
          readAmountFromQuery
        >
          <SeoAnswerSection countryData={countryData} startYear={numericYear} />
        </CalculatorShell>
      </Suspense>
    </>
  );
}
