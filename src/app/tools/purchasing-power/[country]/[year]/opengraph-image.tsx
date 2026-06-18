import { ImageResponse } from 'next/og';
import { calculatePurchasingPower } from '@/lib/purchasing-power/calculate';
import {
  formatPercent,
  getCurrencyForYear,
  getPublicSourceLabel
} from '@/lib/purchasing-power/format';
import { getCountryData } from '@/lib/purchasing-power/routes';
import type { CountryPriceIndexData } from '@/lib/purchasing-power/types';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';
export const dynamic = 'force-static';

type OgTheme = {
  primary: string;
  secondary: string;
  accent: string;
  deep: string;
  paper: string;
};

const themes: Record<string, OgTheme> = {
  'united-states': { primary: '#13294b', secondary: '#b31942', accent: '#f2c14e', deep: '#061a33', paper: '#f7f0e4' },
  'united-kingdom': { primary: '#012169', secondary: '#c8102e', accent: '#d6a84f', deep: '#06142d', paper: '#f5efe5' },
  canada: { primary: '#d52b1e', secondary: '#ffffff', accent: '#b88a2b', deep: '#4b0c0c', paper: '#fbf2ee' },
  netherlands: { primary: '#21468b', secondary: '#ae1c28', accent: '#f28c28', deep: '#081d3f', paper: '#f5f1e8' },
  sweden: { primary: '#005293', secondary: '#006aa7', accent: '#fecb00', deep: '#06233f', paper: '#f4f1e4' },
  france: { primary: '#0055a4', secondary: '#ef4135', accent: '#d6a84f', deep: '#061f43', paper: '#f4f0e8' },
  australia: { primary: '#012169', secondary: '#e4002b', accent: '#ffcd00', deep: '#06142d', paper: '#f5efe2' },
  'new-zealand': { primary: '#00247d', secondary: '#cc142b', accent: '#f2c14e', deep: '#071737', paper: '#f5efe3' },
  denmark: { primary: '#c8102e', secondary: '#ffffff', accent: '#d6a84f', deep: '#3e0711', paper: '#fbf0ee' },
  belgium: { primary: '#101820', secondary: '#ef3340', accent: '#fdda24', deep: '#050607', paper: '#f7f0df' },
  ireland: { primary: '#169b62', secondary: '#ff883e', accent: '#d6a84f', deep: '#073523', paper: '#f2f5eb' },
  switzerland: { primary: '#d52b1e', secondary: '#ffffff', accent: '#d6a84f', deep: '#4b0c0c', paper: '#fbf0ee' },
  norway: { primary: '#00205b', secondary: '#ba0c2f', accent: '#d6a84f', deep: '#06142d', paper: '#f2efe8' },
  finland: { primary: '#002f6c', secondary: '#ffffff', accent: '#d6a84f', deep: '#061b38', paper: '#eff4f8' },
  india: { primary: '#ff9933', secondary: '#138808', accent: '#000080', deep: '#082f1c', paper: '#f7f1e4' },
  bangladesh: { primary: '#006a4e', secondary: '#f42a41', accent: '#d6a84f', deep: '#03291f', paper: '#eef5ee' },
  nepal: { primary: '#dc143c', secondary: '#003893', accent: '#d6a84f', deep: '#330815', paper: '#f7efee' },
  pakistan: { primary: '#01411c', secondary: '#ffffff', accent: '#d6a84f', deep: '#032112', paper: '#eef5ed' },
  bhutan: { primary: '#ffcc33', secondary: '#ff4e12', accent: '#101820', deep: '#4a1705', paper: '#f8f0df' },
  china: { primary: '#de2910', secondary: '#ffde00', accent: '#d6a84f', deep: '#3a0904', paper: '#fbf0e8' },
  iran: { primary: '#239f40', secondary: '#da0000', accent: '#d6a84f', deep: '#072813', paper: '#f0f4ea' },
  iraq: { primary: '#ce1126', secondary: '#007a3d', accent: '#d6a84f', deep: '#101010', paper: '#f6efe8' }
};

type ImageProps = {
  params: Promise<{
    country: string;
    year: string;
  }>;
};

export default async function Image({ params }: ImageProps) {
  const { country, year } = await params;
  const countryData = getCountryData(country);
  const numericYear = Number(year);
  const theme = themes[country] ?? themes['united-states'];

  if (!countryData || !Number.isInteger(numericYear)) {
    return new ImageResponse(<FallbackOg />, size);
  }

  const timeline = calculatePurchasingPower(countryData, numericYear, 100);
  const latestNode = timeline.at(-1);
  const startAmount = formatOgCurrency(countryData, 100, numericYear);
  const latestAmount = latestNode
    ? formatOgCurrency(countryData, latestNode.adjustedValue, latestNode.year)
    : startAmount;
  const latestYear = latestNode?.year ?? countryData.latestFinalYear;
  const percentChange = latestNode ? formatPercent(latestNode.percentChange) : '+0.0%';
  const sourceLabel = getPublicSourceLabel(countryData);
  const journeyLine = `Explore the purchasing power journey of ${countryData.countryName} from ${numericYear} to ${latestYear}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: theme.paper,
          color: theme.deep,
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(90deg, rgba(17,24,39,0.05) 1px, transparent 1px), linear-gradient(rgba(17,24,39,0.05) 1px, transparent 1px)',
            backgroundSize: '54px 54px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: 310,
            display: 'flex',
            background: theme.primary
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 0,
            bottom: 0,
            width: 72,
            display: 'flex',
            background: theme.secondary
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 168,
            top: 0,
            bottom: 0,
            width: 24,
            display: 'flex',
            background: theme.accent
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 76,
            top: 70,
            width: 164,
            height: 112,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid rgba(255,255,255,0.82)',
            borderRadius: 18,
            background: theme.primary,
            boxShadow: '0 22px 60px rgba(0,0,0,0.2)'
          }}
        >
          <div
            style={{
              width: 74,
              height: 74,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 999,
              background: theme.secondary === '#ffffff' ? theme.accent : theme.secondary,
              color: theme.secondary === '#ffffff' ? theme.deep : '#ffffff',
              fontSize: 30,
              fontWeight: 900
            }}
          >
            {countryData.countryCode}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: '58px 62px 54px 370px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ width: 650, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  color: theme.primary,
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: 3,
                  textTransform: 'uppercase'
                }}
              >
                Purchasing Power Roadmap
              </div>
              <div style={{ display: 'flex', color: '#536171', fontSize: 24 }}>{journeyLine}</div>
            </div>
            <div
              style={{
                width: 230,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                border: `2px solid ${theme.primary}`,
                borderRadius: 999,
                color: theme.primary,
                padding: '10px 14px',
                fontSize: 18,
                fontWeight: 800,
                lineHeight: 1.22,
                textAlign: 'center'
              }}
            >
              {sourceLabel}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                color: theme.deep,
                fontSize: 76,
                fontWeight: 900,
                lineHeight: 0.96,
                letterSpacing: -2
              }}
            >
              {startAmount} in {numericYear}
            </div>
            <div style={{ color: '#536171', fontSize: 36, fontWeight: 700 }}>
              has roughly the same purchasing power as
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 22
              }}
            >
              <div
                style={{
                  display: 'flex',
                  color: theme.primary,
                  fontSize: 82,
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: -2
                }}
              >
                {latestAmount}
              </div>
              <div style={{ display: 'flex', color: theme.deep, fontSize: 34, fontWeight: 800 }}>
                in {latestYear}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', color: '#536171', fontSize: 24 }}>
              Official historical price index data. Available years vary by source.
            </div>
            <div
              style={{
                display: 'flex',
                borderRadius: 999,
                background: theme.deep,
                color: '#ffffff',
                padding: '13px 20px',
                fontSize: 28,
                fontWeight: 900
              }}
            >
              {percentChange} total change
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

function formatOgCurrency(countryData: CountryPriceIndexData, value: number, year: number) {
  const currency = getCurrencyForYear(countryData, year);
  const maximumFractionDigits = Math.abs(value) >= 100_000 ? 0 : value % 1 === 0 ? 0 : 2;
  const formatted = new Intl.NumberFormat('en', {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits === 0 ? 0 : 2
  }).format(value);

  return `${currency.currencyCode} ${formatted}`;
}

function FallbackOg() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        background: '#f7f4ed',
        color: '#1d2320',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ color: '#115e59', fontSize: 28, fontWeight: 700 }}>
        Purchasing Power Roadmap
      </div>
      <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05 }}>
        Explore purchasing power journeys using official historical price index data.
      </div>
      <div style={{ color: '#5f6862', fontSize: 24 }}>
        Available years vary by country and data source.
      </div>
    </div>
  );
}
