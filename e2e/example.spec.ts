import { test, expect } from "@playwright/test";

test("homepage has napa in title ", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/napa/);
});
