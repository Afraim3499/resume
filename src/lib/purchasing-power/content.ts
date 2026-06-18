import globalNarratives from '@/content/purchasing-power/narratives.global.json';
import australiaCaveats from '@/content/purchasing-power/caveats.australia.json';
import bangladeshCaveats from '@/content/purchasing-power/caveats.bangladesh.json';
import bangladeshNarratives from '@/content/purchasing-power/narratives.bangladesh.json';
import belgiumCaveats from '@/content/purchasing-power/caveats.belgium.json';
import bhutanCaveats from '@/content/purchasing-power/caveats.bhutan.json';
import bhutanNarratives from '@/content/purchasing-power/narratives.bhutan.json';
import canadaCaveats from '@/content/purchasing-power/caveats.canada.json';
import chinaCaveats from '@/content/purchasing-power/caveats.china.json';
import chinaNarratives from '@/content/purchasing-power/narratives.china.json';
import denmarkCaveats from '@/content/purchasing-power/caveats.denmark.json';
import finlandCaveats from '@/content/purchasing-power/caveats.finland.json';
import franceCaveats from '@/content/purchasing-power/caveats.france.json';
import indiaCaveats from '@/content/purchasing-power/caveats.india.json';
import indiaNarratives from '@/content/purchasing-power/narratives.india.json';
import iranCaveats from '@/content/purchasing-power/caveats.iran.json';
import iranNarratives from '@/content/purchasing-power/narratives.iran.json';
import iraqCaveats from '@/content/purchasing-power/caveats.iraq.json';
import iraqNarratives from '@/content/purchasing-power/narratives.iraq.json';
import nepalCaveats from '@/content/purchasing-power/caveats.nepal.json';
import nepalNarratives from '@/content/purchasing-power/narratives.nepal.json';
import irelandCaveats from '@/content/purchasing-power/caveats.ireland.json';
import netherlandsCaveats from '@/content/purchasing-power/caveats.netherlands.json';
import newZealandCaveats from '@/content/purchasing-power/caveats.new-zealand.json';
import norwayCaveats from '@/content/purchasing-power/caveats.norway.json';
import pakistanCaveats from '@/content/purchasing-power/caveats.pakistan.json';
import pakistanNarratives from '@/content/purchasing-power/narratives.pakistan.json';
import swedenCaveats from '@/content/purchasing-power/caveats.sweden.json';
import switzerlandCaveats from '@/content/purchasing-power/caveats.switzerland.json';
import unitedKingdomCaveats from '@/content/purchasing-power/caveats.united-kingdom.json';
import unitedKingdomNarratives from '@/content/purchasing-power/narratives.united-kingdom.json';
import unitedStatesCaveats from '@/content/purchasing-power/caveats.united-states.json';
import unitedStatesNarratives from '@/content/purchasing-power/narratives.united-states.json';
import type { CountrySlug } from './types';

type Narrative = {
  title: string;
  body: string;
  event?: string;
  stakeholders?: string[];
  driver?: string;
  outcome?: string;
  evidence?: string;
  sourceIds: string[];
};

type NarrativeFile = {
  narratives: Record<string, Narrative>;
};

type Caveat = {
  appliesBeforeYear?: number;
  appliesFromYear?: number;
  body: string;
};

type CaveatFile = {
  caveats: Record<string, Caveat>;
};

const countryNarratives: Partial<Record<CountrySlug, NarrativeFile>> = {
  'united-states': unitedStatesNarratives,
  'united-kingdom': unitedKingdomNarratives,
  india: indiaNarratives,
  bangladesh: bangladeshNarratives,
  nepal: nepalNarratives,
  pakistan: pakistanNarratives,
  bhutan: bhutanNarratives,
  china: chinaNarratives,
  iran: iranNarratives,
  iraq: iraqNarratives
};

const countryCaveats: Record<CountrySlug, CaveatFile> = {
  'united-states': unitedStatesCaveats,
  'united-kingdom': unitedKingdomCaveats,
  canada: canadaCaveats,
  netherlands: netherlandsCaveats,
  sweden: swedenCaveats,
  france: franceCaveats,
  australia: australiaCaveats,
  'new-zealand': newZealandCaveats,
  denmark: denmarkCaveats,
  belgium: belgiumCaveats,
  ireland: irelandCaveats,
  switzerland: switzerlandCaveats,
  norway: norwayCaveats,
  finland: finlandCaveats,
  india: indiaCaveats,
  bangladesh: bangladeshCaveats,
  nepal: nepalCaveats,
  pakistan: pakistanCaveats,
  bhutan: bhutanCaveats,
  china: chinaCaveats,
  iran: iranCaveats,
  iraq: iraqCaveats
};

export function getDecadeKey(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

export function getNarrative(country: CountrySlug, year: number): Narrative {
  const key = getDecadeKey(year);
  const countryOverride = countryNarratives[country]?.narratives[key];
  const globalFallback = (globalNarratives as NarrativeFile).narratives[key];

  return countryOverride ?? globalFallback;
}

export function getCaveat(country: CountrySlug, year: number): string | undefined {
  const caveats = countryCaveats[country].caveats;

  for (const caveat of Object.values(caveats)) {
    const afterMatch = caveat.appliesFromYear === undefined || year >= caveat.appliesFromYear;
    const beforeMatch = caveat.appliesBeforeYear === undefined || year < caveat.appliesBeforeYear;

    if (afterMatch && beforeMatch) {
      return caveat.body;
    }
  }

  return undefined;
}
