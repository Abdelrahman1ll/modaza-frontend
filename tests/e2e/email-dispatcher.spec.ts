import { test, expect } from "@playwright/test";
import { login } from "./utils/auth-helper";

test.describe("Email Order Dispatcher", () => {
  const OWNER_EMAIL = "owner_e2e_test@gmail.com";

  test.beforeEach(async ({ page }) => {
    await login(page, OWNER_EMAIL);
    await page.goto("/email-order-dispatcher");
  });

  test("should load dispatcher page", async ({ page }) => {
    await expect(page.locator("h1, h2")).toContainText(
      /Email|Dispatcher|Order/i,
    );
    await expect(page.locator("button:has-text('Send')")).toBeVisible();
  });
});
