import { test, expect, type Page } from '@playwright/test';
import { checkA11y } from './axe.ts';

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test('home page has no serious or critical axe violations', async ({ page }) => {
  await checkA11y(page);
});

test('elements have proper tab order', async ({ page }) => {
  const elements: { name: string; role: Parameters<Page['getByRole']>[0]; }[] = [
    { name: "projects", role: "link" },
    { name: "work", role: "link" },
    { name: "contact", role: "link" },

    { name: "Backdate Homepage", role: "link" },
    { name: "Backdate GitHub", role: "link" },

    { name: "Copy as Markdown Homepage", role: "link" },
    { name: "Copy as Markdown GitHub", role: "link" },

    { name: "Plotter artwork of faceted,", role: "button" },
    { name: "Black and white plotter artwork", role: "button" },
    { name: "The large-format pen plotter", role: "button" },
    { name: "The redesigned green plotter", role: "button" },
    { name: "A person seated in the", role: "button" },
    { name: "Studio Marlo Instagram", role: "link" },
    { name: "Studio Marlo GitHub", role: "link" },

    { name: "Six members of the Picardy team", role: "button" },
    { name: "Two Picardy team members seated", role: "button" },
    { name: "Picardy lesson screen asking", role: "button" },
    { name: "Picardy Learning Homepage", role: "link" },
    { name: "Picardy Learning GitHub", role: "link" },

    { name: "Expedia Group — Senior", role: "button" },
    { name: "Vrbo — Staff", role: "button" },
    { name: "HomeAway — Senior", role: "button" },
    { name: "OneId — UX", role: "button" },
    { name: "T3 — Developer", role: "button" },
    { name: "Optaros — Associate", role: "button" },

    { name: "hello@tuckbick.com", role: "link" },
    { name: "github.com/tuckbick", role: "link" },
    { name: "linkedin.com/in/tuckbick", role: "link" },
    { name: "twitter.com/tuckbick", role: "link" },
    { name: "facebook.com/tuckbick", role: "link" },
  ];

  for (const { name, role } of elements) {
    await page.keyboard.press("Tab");
    await expect(page.getByRole(role, { name })).toBeFocused();
  }

  // nothing on the page is focusable after the last listed element
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveCount(0);
});