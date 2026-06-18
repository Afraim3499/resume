import type { Metadata } from 'next';
import { calculatePurchasingPower } from './calculate';
import {
  formatCurrency,
  formatPercent,
  formatPlainAmount,
  getPublicSourceDetail,
  getPublicSourceLabel
} from './format';
import type { CitationSource, CountryPriceIndexData } from './types';

export const SITE_URL = 'https://www.rizwanulafraim.com';
export const SITE_NAME = 'Purchasing Power Roadmap';
export const DEFAULT_EXAMPLE_AMOUNT = 100;

export function buildPurchasingPowerPath(country: string, year: number): string {
  return `/tools/purchasing-power/${country}/${year}`;
}

export function buildCanonicalUrl(country: string, year: number): string {
  return `${SITE_URL}${buildPurchasingPowerPath(country, year)}`;
}

export function buildOgImageUrl(country: string, year: number): string {
  return `${buildCanonicalUrl(country, year)}/opengraph-image`;
}

export function getPrimarySource(
  countryData: CountryPriceIndexData,
  sources: Record<string, CitationSource>
): CitationSource | undefined {
  const sourceId = countryData.sourceIds[0];

  return sourceId ? sources[sourceId] : undefined;
}

export function buildSeoResult(
  countryData: CountryPriceIndexData,
  year: number,
  amount = DEFAULT_EXAMPLE_AMOUNT
) {
  const timeline = calculatePurchasingPower(countryData, year, amount);
  const latestNode = timeline.at(-1);

  if (!latestNode) {
    throw new Error(`No purchasing power result for ${countryData.countryName} ${year}.`);
  }

  const startAmount = formatPlainAmount(countryData, amount, year);
  const latestAmount = formatCurrency(countryData, latestNode.adjustedValue, latestNode.year);
  const sourceLabel = getPublicSourceLabel(countryData);
  const sourceDetail = getPublicSourceDetail(countryData);
  const currencyScaleText =
    countryData.currencyTransitions.length > 1
      ? ' The calculation also applies the official domestic currency conversion scale between the start-year and target-year units.'
      : '';
  const answerText = `Using ${sourceLabel}, ${startAmount} in ${year} has roughly the same purchasing power as ${latestAmount} in ${latestNode.year} in ${countryData.countryName}.`;
  const formulaText = `Adjusted value = historical amount x domestic currency scale x target-year index / start-year index. For this page, that uses ${startAmount}, ${latestNode.indexValue}, and ${countryData.priceIndex[String(year)].value}.${currencyScaleText}`;

  return {
    amount,
    startAmount,
    latestAmount,
    latestYear: latestNode.year,
    latestNode,
    sourceLabel,
    sourceDetail,
    answerText,
    formulaText,
    percentChange: formatPercent(latestNode.percentChange)
  };
}

export function buildPageTitle(countryData: CountryPriceIndexData, year: number): string {
  const result = buildSeoResult(countryData, year);

  return `${result.startAmount} in ${year} ${countryData.countryName}: How Purchasing Power Changed by ${result.latestYear}`;
}

export function buildPageDescription(
  year: number,
  countryData?: CountryPriceIndexData
): string {
  if (!countryData) {
    return `Estimate how purchasing power changed from ${year} using official historical price index data. Available years vary by country and data source.`;
  }

  const result = buildSeoResult(countryData, year);

  return `Explore ${countryData.countryName}'s purchasing power journey from ${year} to ${result.latestYear}: ${result.startAmount} then has roughly the same buying power as ${result.latestAmount}. Uses ${result.sourceLabel} official historical price index data.`;
}

export function buildPageKeywords(countryData: CountryPriceIndexData, year: number): string[] {
  const sourceLabel = getPublicSourceLabel(countryData);
  const countryName = countryData.countryName.toLowerCase();
  const currencyName = countryData.amountLabel;
  const indexKeyword = `${countryData.indexKind.toLowerCase().replaceAll('_', ' ')} purchasing power calculator`;

  return [
    `${countryData.countryName} purchasing power calculator`,
    `${countryData.countryName} inflation adjusted value`,
    `${formatPlainAmount(countryData, 100, year)} in ${year}`,
    `value of ${currencyName} in ${year}`,
    `${countryName} historical price index`,
    sourceLabel,
    indexKeyword
  ];
}

export function buildPurchasingPowerMetadata(
  countryData: CountryPriceIndexData,
  year: number
): Metadata {
  const canonicalUrl = buildCanonicalUrl(countryData.slug, year);
  const title = buildPageTitle(countryData, year);
  const description = buildPageDescription(year, countryData);
  const imageUrl = buildOgImageUrl(countryData.slug, year);

  return {
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: 'Rizwanul Afraim', url: SITE_URL }],
    creator: 'Rizwanul Afraim',
    publisher: 'Rizwanul Afraim',
    category: 'education',
    keywords: buildPageKeywords(countryData, year),
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${countryData.countryName} purchasing power estimate for ${year}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function buildPurchasingPowerJsonLd(input: {
  countryData: CountryPriceIndexData;
  year: number;
  source?: CitationSource;
}) {
  const { countryData, year, source } = input;
  const canonicalUrl = buildCanonicalUrl(countryData.slug, year);
  const path = buildPurchasingPowerPath(countryData.slug, year);
  const title = buildPageTitle(countryData, year);
  const description = buildPageDescription(year, countryData);
  const result = buildSeoResult(countryData, year);
  const sourceName = source?.title ?? getPublicSourceLabel(countryData);
  const publisherName = source?.publisher ?? 'Official price index source';
  const datasetId = `${canonicalUrl}#source-dataset`;
  const calculatorId = `${SITE_URL}/tools/purchasing-power#calculator`;
  const webpageId = `${canonicalUrl}#webpage`;
  const questionId = `${canonicalUrl}#question`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'en',
        publisher: {
          '@id': `${SITE_URL}/#person`
        }
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Rizwanul Afraim',
        url: SITE_URL
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: title,
        headline: title,
        description,
        inLanguage: 'en',
        isPartOf: {
          '@id': `${SITE_URL}/#website`
        },
        breadcrumb: {
          '@id': `${canonicalUrl}#breadcrumb`
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: buildOgImageUrl(countryData.slug, year),
          width: 1200,
          height: 630
        },
        about: [
          {
            '@id': calculatorId
          },
          {
            '@id': datasetId
          },
          {
            '@type': 'Thing',
            name: `${countryData.countryName} purchasing power in ${year}`
          }
        ],
        mainEntity: {
          '@id': questionId
        },
        dateModified: source?.lastPulled ?? undefined
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Tools',
            item: `${SITE_URL}/tools`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: SITE_NAME,
            item: `${SITE_URL}/tools/purchasing-power`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: countryData.countryName,
            item: `${SITE_URL}/tools/purchasing-power/${countryData.slug}/${countryData.availableStartYears[0]}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: String(year),
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'Question',
        '@id': questionId,
        name: `How much is ${result.startAmount} in ${year} worth in ${result.latestYear} in ${countryData.countryName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${result.answerText} The calculation uses a price index ratio: ${result.formulaText}`
        }
      },
      {
        '@type': 'WebApplication',
        '@id': calculatorId,
        name: SITE_NAME,
        url: `${SITE_URL}/tools/purchasing-power`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        description:
          'A purchasing power calculator using official historical price index data for supported countries and available years.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: [
          'Historical local-currency amount inputs',
          'Official price index source labels',
          'Country-specific source methodology',
          'Timeline nodes by selected year and decade'
        ]
      },
      {
        '@type': 'Dataset',
        '@id': datasetId,
        name: `${countryData.countryName} ${sourceName}`,
        description: `${publisherName} price index data used to estimate ${countryData.countryName} purchasing power from ${countryData.availableFrom} to ${countryData.latestFinalYear}.`,
        creator: {
          '@type': 'Organization',
          name: publisherName
        },
        publisher: {
          '@type': 'Organization',
          name: publisherName
        },
        temporalCoverage: `${countryData.availableFrom}/${countryData.latestFinalYear}`,
        spatialCoverage: {
          '@type': 'Country',
          name: countryData.countryName,
          identifier: countryData.countryCode
        },
        variableMeasured: source?.seriesLabel ?? countryData.indexKind,
        measurementTechnique: 'Price index ratio calculation',
        license: source?.licenseNote,
        url: source?.sourceUrl ?? canonicalUrl,
        isBasedOn: source?.sourceUrl,
        includedInDataCatalog: source?.dataset
          ? {
              '@type': 'DataCatalog',
              name: source.dataset
            }
          : undefined
      },
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#answer-summary`,
        mainEntityOfPage: {
          '@id': webpageId
        },
        headline: `${result.startAmount} in ${year} purchasing power in ${countryData.countryName}`,
        description: result.answerText,
        articleBody: `${result.answerText} ${result.formulaText} Amounts stay in historical local currency; no foreign exchange conversion is applied.`,
        author: {
          '@id': `${SITE_URL}/#person`
        },
        publisher: {
          '@id': `${SITE_URL}/#person`
        },
        dateModified: source?.lastPulled ?? undefined,
        inLanguage: 'en',
        isAccessibleForFree: true,
        url: canonicalUrl
      }
    ],
    url: `${SITE_URL}${path}`
  };
}

export function buildLandingJsonLd(countryData: CountryPriceIndexData[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/tools/purchasing-power#webpage`,
        url: `${SITE_URL}/tools/purchasing-power`,
        name: SITE_NAME,
        description:
          'Explore how purchasing power changed across supported countries and available historical years using official historical price index data.',
        inLanguage: 'en',
        isPartOf: {
          '@id': `${SITE_URL}/#website`
        },
        mainEntity: {
          '@id': `${SITE_URL}/tools/purchasing-power#calculator`
        }
      },
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/tools/purchasing-power#calculator`,
        name: SITE_NAME,
        url: `${SITE_URL}/tools/purchasing-power`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        description:
          'A purchasing power calculator using official historical price index data for supported countries and available years.'
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/tools/purchasing-power#supported-countries`,
        name: 'Supported purchasing power countries',
        itemListElement: countryData.map((country, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: country.countryName,
          url: `${SITE_URL}/tools/purchasing-power/${country.slug}/${country.availableStartYears.includes(1950) ? 1950 : country.availableStartYears[0]}`
        }))
      }
    ]
  };
}

export function stringifyJsonLd(jsonLd: unknown): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}
