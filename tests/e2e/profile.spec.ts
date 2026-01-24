import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Profile Page (Full Flow)", () => {
  const USER_EMAIL = "user@gmail.com";

  test("should update user profile information", async ({ page }) => {
    // 1. Login
    await login(page, USER_EMAIL);

    // 2. Navigate to Profile
    await page.goto("/profile");

    // Use .first() to avoid strict mode violation
    await expect(
      page
        .locator("h1, h2")
        .filter({ hasText: /Profile|حسابي/i })
        .first(),
    ).toBeVisible();

    // Verify email is correctly loaded (using display value for inputs)
    await expect(page.locator('input[name="email"]')).toHaveValue(USER_EMAIL);

    // 3. Update Profile Data
    await page.locator('input[name="firstName"]').fill("E2EFirst");
    await page.locator('input[name="lastName"]').fill("E2ELast");
    await page.locator('input[name="phone"]').fill("01012345678");

    // Fill birthday
    await page.locator('input[name="birthday"]').fill("1990-01-01");

    // 4. Save Changes
    const saveBtn = page
      .locator('button[type="submit"]')
      .filter({ hasText: /Save Changes|حفظ التغييرات/i })
      .first();
    await saveBtn.click();

    // 5. Verify Success
    await expect(
      page.getByText(/Profile saved successfully|تم حفظ الملف بنجاح/i),
    ).toBeVisible();

    // 6. Verify data persists on reload
    await page.reload();
    await expect(page.locator('input[name="firstName"]')).toHaveValue(
      "E2EFirst",
    );
    await expect(page.locator('input[name="lastName"]')).toHaveValue("E2ELast");
    await expect(page.locator('input[name="phone"]')).toHaveValue(
      "01012345678",
    );
    await expect(page.locator('input[name="birthday"]')).toHaveValue(
      "1990-01-01",
    );

    // 7. Logout
    await logout(page);
  });
});
