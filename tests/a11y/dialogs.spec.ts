import { test, expect, type Locator, type Page } from "@playwright/test";
import { checkA11y } from "./axe.ts";

/**
 * Focus `trigger`, press Enter, and wait for the dialog to open. `page.goto()` can resolve
 * before React has hydrated and attached the click listeners, so Enter may do nothing the
 * first time: retry until the dialog is visible, without pressing Enter again once it is.
 */
async function openWithKeyboard(page: Page, trigger: Locator) {
  const dialog = page.getByRole("dialog");
  await expect(async () => {
    if (!(await dialog.isVisible())) {
      await trigger.focus();
      await page.keyboard.press("Enter");
    }
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10_000 });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe('work dialog', () => {
  test.beforeEach(async ({page}) => {
    const workExp = page.getByRole("button", {
      name: "Expedia Group — Senior",
    });

    // open work experience with the keyboard
    await openWithKeyboard(page, workExp);
  })

  test("accessibility check", async ({ page }) => {
    await checkA11y(page, "dialog[open]");
  });

  test('close button is focused', async ({page}) => {
    await expect(page.getByRole("button", { name: "Close dialog" })).toBeFocused();
  });

  test("close dialog with Close button", async ({ page }) => {
    await page.getByRole("button", { name: "Close dialog" }).click();

    // focus is at original place
    await expect(
      page.getByRole("button", {
        name: "Expedia Group — Senior",
      }),
    ).toBeFocused();
  });

  test("close dialog with Escape button", async ({ page }) => {
    await page.keyboard.press("Escape");

    // focus is at original place
    await expect(
      page.getByRole("button", {
        name: "Expedia Group — Senior",
      }),
    ).toBeFocused();
  });
});

test.describe('gallery dialog', () => {
  test.beforeEach(async ({ page }) => {
    const thumb = page.getByRole("button", {
      name: "Plotter artwork of faceted,",
    });

    // open gallery thumbnail with the keyboard
    await openWithKeyboard(page, thumb);
  });

  test('accessibility check', async ({page}) => {
    await checkA11y(page, "dialog[open]");
  });

  test('close button is focused', async ({page}) => {
    await expect(page.getByRole("button", { name: "Close dialog" })).toBeFocused();
  });

  test("close dialog with Close button", async ({ page }) => {
    await page.getByRole("button", { name: "Close dialog" }).click();

    // focus is at original place
    await expect(
      page.getByRole("button", {
        name: "Plotter artwork of faceted,",
      }),
    ).toBeFocused();
  });

  test('close dialog with Escape button', async ({page}) => {
    await page.keyboard.press("Escape");

    // focus is at original place
    await expect(
      page.getByRole("button", {
        name: "Plotter artwork of faceted,",
      }),
    ).toBeFocused();
  });

  test("navigates to next image", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    await expect(
      page
        .getByRole("dialog")
        .getByRole("img", { name: "Black and white plotter artwork" }),
    ).toBeVisible();
  });

  test("navigates to prev image", async ({ page }) => {
    await page.keyboard.press("ArrowLeft");
    await expect(
      page
        .getByRole("dialog")
        .getByRole("img", { name: "A person seated in the" }),
    ).toBeVisible();
  });
});

test("arrow keys on the page don't load images into a closed gallery dialog", async ({ page }) => {
  // open and close a gallery, so its (closed) dialog stays mounted
  await openWithKeyboard(page, page.getByRole("button", { name: "Plotter artwork of faceted," }));
  await expect(page.getByRole("dialog").getByRole("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // full-size gallery images (not thumbnails) requested from now on
  const requested: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("/images/projects/") && !url.includes(".thumb.")) requested.push(url);
  });

  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(500);

  expect(requested).toEqual([]);
});
