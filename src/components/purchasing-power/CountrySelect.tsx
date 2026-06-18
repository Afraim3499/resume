'use client';

import type { CountryPriceIndexData, CountrySlug } from '@/lib/purchasing-power/types';

type CountrySelectProps = {
  countries: CountryPriceIndexData[];
  value: CountrySlug;
  onChange: (country: CountrySlug) => void;
};

export function CountrySelect({ countries, value, onChange }: CountrySelectProps) {
  return (
    <div className="field">
      <label htmlFor="country">Country</label>
      <select
        id="country"
        value={value}
        onChange={(event) => onChange(event.target.value as CountrySlug)}
      >
        {countries.map((country) => (
          <option key={country.slug} value={country.slug}>
            {country.countryName}
          </option>
        ))}
      </select>
    </div>
  );
}
