import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("User Management (Full Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";

  test("should follow the Owner -> Admin -> User flow for user management", async ({
    page,
  }) => {
    // Phase 1: Owner Interaction (Setup/View Users)
    await login(page, OWNER_EMAIL);
    await page.goto("/all-users");
    await expect(page).toHaveURL(/.*all-users/);
    const userRows = page.locator("table tr, .user-row");
    await expect(userRows.count()).toBeGreaterThan(0);
    await logout(page);

    // Phase 2: Admin Interaction (Verify Management)
    await login(page, ADMIN_EMAIL);
    await page.goto("/profile"); // Admin checking their own profile
    await expect(page.locator('div[title="حسابي"]').first()).toBeVisible();
    await logout(page);

    // Phase 3: User Interaction (Final Verification)
    await login(page, USER_EMAIL);
    await page.goto("/profile");
    await expect(page).toHaveURL(/.*profile/);
    await logout(page);
  });
});
