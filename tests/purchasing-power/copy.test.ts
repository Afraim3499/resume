import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const PUBLIC_UI_FILES = [
  'src/app/globals.css',
  'src/components/purchasing-power/CalculatorShell.tsx',
  'src/components/purchasing-power/HeroResult.tsx',
  'src/components/purchasing-power/TimelineCard.tsx',
  'src/components/purchasing-power/MethodologyPreview.tsx',
  'src/content/purchasing-power/methodology.md'
];

describe('public UI copy guardrails', () => {
  it('does not expose internal planning phrases in public UI files', () => {
    const text = PUBLIC_UI_FILES.map((file) => readFileSync(join(ROOT, file), 'utf8')).join('\n');

    expect(text).not.toContain('Public UI should say');
    expect(text).not.toContain('selected price index series');
    expect(text).not.toContain('global CPI calculator');
    expect(text).not.toContain('CPI-adjusted value');
    expect(text).not.toContain('exact historical value');
  });

  it('does not repeat the UK pre-decimal caveat in every timeline node component', () => {
    const text = readFileSync(join(ROOT, 'src/components/purchasing-power/TimelineCard.tsx'), 'utf8');

    expect(text).not.toContain('shillings or pence');
    expect(text).not.toContain('Pre-decimal note');
  });

  it('marks the timeline with the roadmap test id for browser verification', () => {
    const text = readFileSync(join(ROOT, 'src/components/purchasing-power/Timeline.tsx'), 'utf8');

    expect(text).toContain('data-testid="roadmap-timeline"');
  });
});
