import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

// Enforce serial execution to avoid OTP conflicts and database race conditions
test.describe.configure({ mode: "serial" });

test.describe("Categories and Colors (Self-Contained Sequential Flows)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";

  test("should follow the Owner -> Owner -> User flow for Categories", async ({
    page,
  }) => {
    const TIMESTAMP = Date.now();
    const categoryName = `Cat-${TIMESTAMP}`;

    console.log(`[Test] Starting Categories Flow - ${categoryName}`);

    // -------------------------------------------------------------------------
    // Phase 1: Owner - Creation
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/category");

    // Explicit wait for input and ensure no skeletons
    await expect(page.locator(".Skeleton-root")).not.toBeVisible({
      timeout: 15000,
    });
    const catInput = page.getByPlaceholder("Ex: Luxury Collection");
    await expect(catInput).toBeVisible({ timeout: 15000 });
    await catInput.fill(categoryName);
    await page.getByRole("button", { name: /Create|إنشاء/i }).click();

    console.log(`[Test] Category '${categoryName}' created by Owner`);

    // Verify visibility for Owner
    await expect(page.getByText(categoryName).first()).toBeVisible({
      timeout: 15000,
    });
    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 2: Owner - Verification
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/category");

    // Wait for list items to load
    await expect(page.locator(".Skeleton-root")).not.toBeVisible({
      timeout: 15000,
    });

    // Owner should see the new category
    try {
      await expect(page.getByText(categoryName).first()).toBeVisible({
        timeout: 10000,
      });
    } catch (e) {
      console.log(`[Test] Owner: Category not found immediately, reloading...`);
      await page.reload();
      await expect(page.getByText(categoryName).first()).toBeVisible({
        timeout: 15000,
      });
    }

    console.log(`[Test] Category '${categoryName}' verified by Owner`);
    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 3: User - Product Filters
    // -------------------------------------------------------------------------
    await login(page, USER_EMAIL);
    await page.goto("/products");

    const filterBtn = page
      .locator("button")
      .filter({ hasText: /Filters|الفلاتر/i })
      .first();
    await expect(filterBtn).toBeVisible({ timeout: 10000 });
    await filterBtn.click();

    // Check if the new category exists in filters
    // Filters are in labels
    await expect(
      page.getByText(categoryName, { exact: true }).first(),
    ).toBeVisible({ timeout: 15000 });
    console.log(`[Test] Category '${categoryName}' visible to User in filters`);

    await logout(page);
  });

  test("should follow the Owner -> Owner -> User flow for Colors", async ({
    page,
  }) => {
    const TIMESTAMP = Date.now();
    const colorName = `Color-${TIMESTAMP}`;

    console.log(`[Test] Starting Colors Flow - ${colorName}`);

    // -------------------------------------------------------------------------
    // Phase 1: Owner - Creation
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/color");

    await expect(page.locator(".Skeleton-root")).not.toBeVisible({
      timeout: 15000,
    });
    const colorInput = page.getByPlaceholder("Ex: Midnight Black");
    await expect(colorInput).toBeVisible({ timeout: 15000 });
    await colorInput.fill(colorName);

    const colorPicker = page.locator('input[type="color"]');
    if (await colorPicker.isVisible()) {
      await colorPicker.fill("#386641");
    }

    await page.getByRole("button", { name: /Register|تسجيل/i }).click();

    // Verify visibility for Owner
    await expect(page.getByText(colorName).first()).toBeVisible({
      timeout: 15000,
    });
    console.log(`[Test] Color '${colorName}' created by Owner`);

    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 2: Owner - Verification
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/color");

    await expect(page.locator(".Skeleton-root")).not.toBeVisible({
      timeout: 15000,
    });

    try {
      await expect(page.getByText(colorName).first()).toBeVisible({
        timeout: 10000,
      });
    } catch (e) {
      console.log(`[Test] Owner: Color not found immediately, reloading...`);
      await page.reload();
      await expect(page.getByText(colorName).first()).toBeVisible({
        timeout: 15000,
      });
    }

    console.log(`[Test] Color '${colorName}' verified by Owner`);
    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 3: User - Product Filters
    // -------------------------------------------------------------------------
    await login(page, USER_EMAIL);
    await page.goto("/products");

    const filterBtn = page
      .locator("button")
      .filter({ hasText: /Filters|الفلاتر/i })
      .first();
    await expect(filterBtn).toBeVisible({ timeout: 10000 });
    await filterBtn.click();

    // Verify in filters
    await expect(
      page.getByText(colorName, { exact: true }).first(),
    ).toBeVisible({ timeout: 15000 });
    console.log(`[Test] Color '${colorName}' visible to User in filters`);

    await logout(page);
  });
});
