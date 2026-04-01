import { test, expect, Page } from "@playwright/test";
import path from "path";

// ─── Helper ──────────────────────────────────────────────────────────────────

/**
 * Navigate to the home page with a `mockCount` query param so the server
 * returns exactly `count` news items (bypassing the real API).
 */
async function goHomeWith(page: Page, count: number) {
  await page.goto(`/?mockCount=${count}`);
  await page.waitForLoadState("networkidle");
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe("NewsCarousel", () => {
  // ── 0 items ─────────────────────────────────────────────────────────────────
  test("0 items – #newsContainer should NOT exist", async ({ page }, testInfo) => {
    await goHomeWith(page, 0);

    await expect(page.locator("#newsContainer")).not.toBeAttached();

    await page.screenshot({
      path: path.join(testInfo.outputDir, "news-0-items.png"),
      fullPage: true,
    });
  });

  // ── 1 item ──────────────────────────────────────────────────────────────────
  test("1 item – #newsContainer exists, 1 .news-item, no #btnViewAllNews", async ({
    page,
  }, testInfo) => {
    await goHomeWith(page, 1);

    await expect(page.locator("#newsContainer")).toBeVisible();

    const newsItems = page.locator(".news-item");
    await expect(newsItems).toHaveCount(1);

    await expect(page.locator("#btnViewAllNews")).not.toBeAttached();

    await page.screenshot({
      path: path.join(testInfo.outputDir, "news-1-item.png"),
      fullPage: true,
    });
  });

  // ── 3 items ──────────────────────────────────────────────────────────────────
  test("3 items – #newsContainer exists, 3 .news-items, no #btnViewAllNews", async ({
    page,
  }, testInfo) => {
    await goHomeWith(page, 3);

    await expect(page.locator("#newsContainer")).toBeVisible();

    const newsItems = page.locator(".news-item");
    await expect(newsItems).toHaveCount(3);

    await expect(page.locator("#btnViewAllNews")).not.toBeAttached();

    await page.screenshot({
      path: path.join(testInfo.outputDir, "news-3-items.png"),
      fullPage: true,
    });
  });

  // ── 4 items ──────────────────────────────────────────────────────────────────
  test("4 items – #newsContainer exists, 4 .news-items, no #btnViewAllNews", async ({
    page,
  }, testInfo) => {
    await goHomeWith(page, 4);

    await expect(page.locator("#newsContainer")).toBeVisible();

    const newsItems = page.locator(".news-item");
    await expect(newsItems).toHaveCount(4);

    await expect(page.locator("#btnViewAllNews")).not.toBeAttached();

    await page.screenshot({
      path: path.join(testInfo.outputDir, "news-4-items.png"),
      fullPage: true,
    });
  });

  // ── 5 items (> 4) ────────────────────────────────────────────────────────────
  test("5 items – #newsContainer exists, 4 .news-items shown (capped), #btnViewAllNews visible", async ({
    page,
  }, testInfo) => {
    await goHomeWith(page, 5);

    await expect(page.locator("#newsContainer")).toBeVisible();

    // Carousel always shows at most 4 cards (items.slice(0, 4))
    const newsItems = page.locator(".news-item");
    await expect(newsItems).toHaveCount(4);

    await expect(page.locator("#btnViewAllNews")).toBeVisible();

    await page.screenshot({
      path: path.join(testInfo.outputDir, "news-5-items.png"),
      fullPage: true,
    });
  });

  // ── 10 items (> 4) ───────────────────────────────────────────────────────────
  test("10 items – #newsContainer exists, 4 .news-items shown (capped), #btnViewAllNews visible", async ({
    page,
  }, testInfo) => {
    await goHomeWith(page, 10);

    await expect(page.locator("#newsContainer")).toBeVisible();

    const newsItems = page.locator(".news-item");
    await expect(newsItems).toHaveCount(4);

    await expect(page.locator("#btnViewAllNews")).toBeVisible();

    await page.screenshot({
      path: path.join(testInfo.outputDir, "news-10-items.png"),
      fullPage: true,
    });
  });
});
