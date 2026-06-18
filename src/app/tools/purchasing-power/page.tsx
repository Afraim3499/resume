import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CalculatorShell } from '@/components/purchasing-power/CalculatorShell';
import { JsonLd } from '@/components/purchasing-power/JsonLd';
import { countries } from '@/lib/purchasing-power/routes';
import { buildLandingJsonLd, SITE_NAME, SITE_URL } from '@/lib/purchasing-power/seo';

export const metadata: Metadata = {
  title: 'Purchasing Power Calculator Using Official Historical Price Index Data',
  description:
    'Explore how purchasing power changed across supported countries and available historical years using official historical price index data.',
  applicationName: SITE_NAME,
  authors: [{ name: 'Rizwanul Afraim', url: SITE_URL }],
  creator: 'Rizwanul Afraim',
  publisher: 'Rizwanul Afraim',
  category: 'education',
  keywords: [
    'purchasing power calculator',
    'inflation adjusted value',
    'historical price index calculator',
    'official price index calculator',
    'historical local currency calculator',
    'value of money over time'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/purchasing-power`
  },
  openGraph: {
    title: 'Purchasing Power Calculator',
    description:
      'Explore how purchasing power changed across supported countries and available historical years using official historical price index data.',
    url: `${SITE_URL}/tools/purchasing-power`,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary',
    title: 'Purchasing Power Calculator',
    description:
      'Explore historical purchasing power with official price index data for supported countries.'
  }
};

export default function PurchasingPowerLandingPage() {
  const jsonLd = buildLandingJsonLd(countries);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Suspense fallback={null}>
        <CalculatorShell initialCountry="united-states" initialYear={1950} initialAmount={100} />
      </Suspense>
    </>
  );
}
