'use client';

type YearSelectProps = {
  years: number[];
  value: number;
  onChange: (year: number) => void;
};

export function YearSelect({ years, value, onChange }: YearSelectProps) {
  return (
    <div className="field">
      <label htmlFor="start-year">Start year</label>
      <select
        id="start-year"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
