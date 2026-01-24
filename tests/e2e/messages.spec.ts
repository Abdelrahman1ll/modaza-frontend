import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("User Messages Management", () => {
  const OWNER_EMAIL = "owner@gmail.com";

  test.beforeEach(async ({ page }) => {
    await login(page, OWNER_EMAIL);
    await page.goto("/all-users-messages");
  });

  test.afterEach(async ({ page }) => {
    await logout(page);
  });

  test("should list user messages", async ({ page }) => {
    // Use .first() to avoid strict mode violation if multiple h1/h2 exist
    await expect(
      page
        .locator("h1, h2")
        .filter({ hasText: /Messages|الرسائل/i })
        .first(),
    ).toBeVisible();
    const messages = page.locator(".message-card, .message-row");
    // Some apps use cards, let's look for images if not sure
  });
});
