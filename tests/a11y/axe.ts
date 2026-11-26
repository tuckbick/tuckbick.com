import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const BLOCKING_IMPACTS = new Set(['serious', 'critical']);

/**
 * Run axe on the page (or only on `include`, a CSS selector such as 'dialog[open]').
 * Serious and critical violations fail the test. Minor and moderate ones are logged
 * and attached as annotations, so they show up in the report without failing.
 */
export async function checkA11y(page: Page, include?: string) {
  let builder = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  if (include) builder = builder.include(include);

  const { violations } = await builder.analyze();

  const summarize = (v: (typeof violations)[number]) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    targets: v.nodes.map((n) => n.target.join(' ')),
  });

  const blocking = violations.filter((v) => BLOCKING_IMPACTS.has(v.impact ?? ''));
  const warnings = violations.filter((v) => !BLOCKING_IMPACTS.has(v.impact ?? ''));

  for (const v of warnings) {
    const s = summarize(v);
    const message = `${s.impact}: ${s.id} (${s.help}) on ${s.targets.join(', ')}`;
    console.warn(`[a11y warning] ${message}`);
    test.info().annotations.push({ type: 'a11y warning', description: message });
  }

  expect(blocking.map(summarize), 'serious/critical accessibility violations').toEqual([]);
}
