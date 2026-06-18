import { describe, expect, it } from 'vitest';
import {
  getCommittedStateFromPath,
  getDraftAmountInputFromQuery
} from '../../src/lib/purchasing-power/state';

describe('committed route/query state', () => {
  it('uses route country/year and valid query amount as committed state', () => {
    expect(
      getCommittedStateFromPath({
        pathname: '/tools/purchasing-power/united-kingdom/1900',
        amountParam: '250.50',
        initialCountry: 'united-states',
        initialYear: 1950,
        initialAmount: 100,
        readAmountFromQuery: true
      })
    ).toEqual({
      country: 'united-kingdom',
      year: 1900,
      amount: 250.5
    });
  });

  it('falls back when route year or amount is unsupported', () => {
    expect(
      getCommittedStateFromPath({
        pathname: '/tools/purchasing-power/united-states/1900',
        amountParam: '100.001',
        initialCountry: 'united-states',
        initialYear: 1950,
        initialAmount: 100,
        readAmountFromQuery: true
      })
    ).toEqual({
      country: 'united-states',
      year: 1950,
      amount: 100
    });
  });

  it('preserves invalid query amount as draft input for visible validation', () => {
    expect(
      getDraftAmountInputFromQuery({
        amount: 100,
        amountParam: '-1',
        readAmountFromQuery: true
      })
    ).toBe('-1');
  });
});
