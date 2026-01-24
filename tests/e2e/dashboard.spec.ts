import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Owner Dashboard", () => {
  const OWNER_EMAIL = "owner@gmail.com";

  test.beforeEach(async ({ page }) => {
    await login(page, OWNER_EMAIL);
    await page.goto("/dashboard");
  });

  test.afterEach(async ({ page }) => {
    await logout(page);
  });

  test("should load dashboard overview", async ({ page }) => {
    await expect(page).toHaveURL(/.*dashboard/);
    // Use .first() to avoid strict mode violation if multiple h1/h2 exist
    await expect(
      page
        .locator("h1, h2")
        .filter({ hasText: /Dashboard|Overview/i })
        .first(),
    ).toBeVisible();

    // Check for stats
    const stats = page.locator(".stat-card, [data-testid='stat-card']");
    if ((await stats.count()) > 0) {
      await expect(stats.first()).toBeVisible();
    }
  });

  test("should navigate to management sections from dashboard", async ({
    page,
  }) => {
    const productsLink = page
      .getByRole("link", { name: /Products|المنتجات/i })
      .first();
    await productsLink.click();
    await expect(page).toHaveURL(/.*products/);
  });
});
