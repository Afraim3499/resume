'use client';

type AmountInputProps = {
  value: string;
  error?: string;
  currencySymbol: string;
  onChange: (value: string) => void;
};

export function AmountInput({ value, error, currencySymbol, onChange }: AmountInputProps) {
  return (
    <div className="field field--full">
      <label htmlFor="amount">Historical amount</label>
      <div className="amount-control">
        <span aria-hidden="true">{currencySymbol}</span>
        <input
          id="amount"
          inputMode="decimal"
          value={value}
          placeholder="100.00"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'amount-error' : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error ? (
        <span className="error-text" id="amount-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
