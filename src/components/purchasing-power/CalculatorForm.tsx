'use client';

import { Calculator } from 'lucide-react';
import { getCurrencyForYear } from '@/lib/purchasing-power/format';
import type { CountryPriceIndexData, CountrySlug } from '@/lib/purchasing-power/types';
import { AmountInput } from './AmountInput';
import { CountrySelect } from './CountrySelect';
import { YearSelect } from './YearSelect';

type CalculatorFormProps = {
  countries: CountryPriceIndexData[];
  country: CountrySlug;
  year: number;
  amountInput: string;
  amountError?: string;
  onCountryChange: (country: CountrySlug) => void;
  onYearChange: (year: number) => void;
  onAmountChange: (value: string) => void;
  onSubmit: () => void;
};

export function CalculatorForm({
  countries,
  country,
  year,
  amountInput,
  amountError,
  onCountryChange,
  onYearChange,
  onAmountChange,
  onSubmit
}: CalculatorFormProps) {
  const countryData = countries.find((item) => item.slug === country) ?? countries[0];
  const currency = getCurrencyForYear(countryData, year);

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <CountrySelect countries={countries} value={country} onChange={onCountryChange} />
      <YearSelect years={countryData.availableStartYears} value={year} onChange={onYearChange} />
      <AmountInput
        value={amountInput}
        error={amountError}
        currencySymbol={currency.currencySymbol}
        onChange={onAmountChange}
      />
      <button className="button button--primary update-button" type="submit" disabled={Boolean(amountError)}>
        <Calculator size={18} aria-hidden="true" />
        Update roadmap
      </button>
    </form>
  );
}
