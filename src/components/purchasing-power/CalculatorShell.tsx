'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculatePurchasingPower } from '@/lib/purchasing-power/calculate';
import {
  formatCurrency,
  formatPlainAmount,
  getPublicSourceDetail,
  getPublicSourceLabel,
  parseAmountInput
} from '@/lib/purchasing-power/format';
import { buildCalculationAnalyticsEvent, trackCalculation } from '@/lib/purchasing-power/analytics';
import {
  buildPurchasingPowerHref,
  countries,
  getCountryData,
  getDefaultRouteForCountry
} from '@/lib/purchasing-power/routes';
import {
  getCommittedStateFromPath,
  getDraftAmountInputFromQuery
} from '@/lib/purchasing-power/state';
import type { CountrySlug } from '@/lib/purchasing-power/types';
import { CalculatorForm } from './CalculatorForm';
import { CaveatPanel } from './CaveatPanel';
import { HeroResult } from './HeroResult';
import { InsightStrip } from './InsightStrip';
import { MethodologyPreview } from './MethodologyPreview';
import { ShareButton } from './ShareButton';
import { StickyMiniResult } from './StickyMiniResult';
import { Timeline } from './Timeline';

type CalculatorShellProps = {
  initialCountry?: CountrySlug;
  initialYear?: number;
  initialAmount?: number;
  readAmountFromQuery?: boolean;
  children?: React.ReactNode;
};

export function CalculatorShell({
  initialCountry = 'united-states',
  initialYear = 1950,
  initialAmount = 100,
  readAmountFromQuery = false,
  children
}: CalculatorShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const controlsRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [showStickyResult, setShowStickyResult] = useState(false);

  const committed = useMemo(
    () =>
      getCommittedStateFromPath({
        pathname,
        amountParam: searchParams.get('amount'),
        initialCountry,
        initialYear,
        initialAmount,
        readAmountFromQuery
      }),
    [initialAmount, initialCountry, initialYear, pathname, readAmountFromQuery, searchParams]
  );
  const draftAmountFromQuery = useMemo(
    () =>
      getDraftAmountInputFromQuery({
        amount: committed.amount,
        amountParam: searchParams.get('amount'),
        readAmountFromQuery
      }),
    [committed.amount, readAmountFromQuery, searchParams]
  );

  const [draftCountry, setDraftCountry] = useState<CountrySlug>(committed.country);
  const [draftYear, setDraftYear] = useState<number>(committed.year);
  const [draftAmountInput, setDraftAmountInput] = useState<string>(draftAmountFromQuery);

  useEffect(() => {
    setDraftCountry(committed.country);
    setDraftYear(committed.year);
    setDraftAmountInput(draftAmountFromQuery);
    document.documentElement.dataset.countryTheme = committed.country;

    return () => {
      delete document.documentElement.dataset.countryTheme;
    };
  }, [committed.country, committed.year, draftAmountFromQuery]);

  useEffect(() => {
    function handleScroll() {
      setShowStickyResult(window.scrollY > 520);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem('purchasing-power-scroll-roadmap') !== '1') {
      return;
    }

    window.sessionStorage.removeItem('purchasing-power-scroll-roadmap');
    window.setTimeout(() => {
      roadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [committed.amount, committed.country, committed.year]);

  const committedCountryData = getCountryData(committed.country) ?? countries[0];
  const draftCountryData = getCountryData(draftCountry) ?? countries[0];
  const draftAmountResult = parseAmountInput(draftAmountInput);
  const draftAmountError = draftAmountResult.ok ? undefined : draftAmountResult.error;

  const timelineNodes = useMemo(
    () =>
      calculatePurchasingPower(committedCountryData, committed.year, committed.amount),
    [committed.amount, committed.year, committedCountryData]
  );
  const latestNode = timelineNodes.at(-1);
  const shareHref = buildPurchasingPowerHref({
    country: committed.country,
    year: committed.year,
    amount: committed.amount
  });
  const routeHref = buildPurchasingPowerHref({
    country: committed.country,
    year: committed.year
  });

  if (!latestNode) {
    return null;
  }

  const formattedStartAmount = formatPlainAmount(
    committedCountryData,
    committed.amount,
    committed.year
  );
  const formattedLatestAmount = formatCurrency(
    committedCountryData,
    latestNode.adjustedValue,
    latestNode.year
  );
  const shareTitle = `${formattedStartAmount} in ${committed.year}: ${committedCountryData.countryName}'s purchasing power journey`;
  const shareDescription = `Explore how ${formattedStartAmount} in ${committed.year} compares with ${formattedLatestAmount} in ${latestNode.year} using ${getPublicSourceLabel(committedCountryData)}.`;
  const estimateEndpointShown = timelineNodes.some((node) => node.indexStatus !== 'final');

  function handleCountryChange(nextCountry: CountrySlug) {
    const nextRoute = getDefaultRouteForCountry(nextCountry);
    setDraftCountry(nextCountry);
    setDraftYear(nextRoute.year);
  }

  function handleUpdate() {
    if (!draftAmountResult.ok) {
      return;
    }

    const href = buildPurchasingPowerHref({
      country: draftCountry,
      year: draftYear,
      amount: draftAmountResult.amount
    });

    trackCalculation(
      buildCalculationAnalyticsEvent({
        country: draftCountry,
        startYear: draftYear,
        amount: draftAmountResult.amount,
        estimateEndpointShown
      })
    );

    window.sessionStorage.setItem('purchasing-power-scroll-roadmap', '1');
    router.push(href);
  }

  function scrollToControls() {
    controlsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <main className="purchasing-power-page" data-country={committed.country}>
      <HeroResult
        countryData={committedCountryData}
        startYear={committed.year}
        amount={committed.amount}
        latestNode={latestNode}
        onCalculatorClick={scrollToControls}
      />

      <section className="body-surface">
        <div className="section-inner controls-anchor" ref={controlsRef}>
          <div className="calculator-panel">
            <CalculatorForm
              countries={countries}
              country={draftCountry}
              year={draftYear}
              amountInput={draftAmountInput}
              amountError={draftAmountError}
              onCountryChange={handleCountryChange}
              onYearChange={setDraftYear}
              onAmountChange={setDraftAmountInput}
              onSubmit={handleUpdate}
            />

            <div className="controls-actions">
              <ShareButton
                href={shareHref}
                title={shareTitle}
                description={shareDescription}
              />
              <Link className="button" href={routeHref}>
                Open route
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="current-result-copy" aria-live="polite">
              <strong>
                {formattedStartAmount} in {committed.year} has roughly the same purchasing power as{' '}
                {formattedLatestAmount} in {latestNode.year}.
              </strong>
              <span>
                Based on {getPublicSourceLabel(committedCountryData)} price index data.
              </span>
            </div>

            <CaveatPanel countryData={committedCountryData} startYear={committed.year} />
          </div>
        </div>

        <InsightStrip
          countryData={committedCountryData}
          startYear={committed.year}
          latestNode={latestNode}
        />

        <section className="section-inner timeline-section" id="roadmap" ref={roadmapRef}>
          <div className="timeline-header">
            <div>
              <p className="eyebrow">Roadmap</p>
              <h2>
                {committedCountryData.countryName}, {committed.year} to {latestNode.year}
              </h2>
            </div>
            <p className="small-note">
              Source series: {getPublicSourceLabel(committedCountryData)} (
              {getPublicSourceDetail(committedCountryData)}).
            </p>
          </div>
          <Timeline countryData={committedCountryData} nodes={timelineNodes} />
        </section>

        {children}
        <MethodologyPreview />
      </section>

      <StickyMiniResult
        visible={showStickyResult}
        countryData={committedCountryData}
        amount={committed.amount}
        startYear={committed.year}
        latestNode={latestNode}
      />
    </main>
  );
}
