import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Cart Page (Sequential Multi-Role Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";
  const TIMESTAMP = Date.now();
  const productName = `CartFlow-${TIMESTAMP}`;

  test("should follow the Owner -> Admin -> User flow for cart operations", async ({
    page,
  }) => {
    // -------------------------------------------------------------------------
    // Phase 1: Owner - Product Creation
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/add-product");

    await page.locator('input[name="name"]').fill(productName);
    await page.locator('input[name="price"]').fill("400");
    await page.locator('input[name="promotionalPrice"]').fill("500");

    // Select Category
    await page.locator("button:has-text('Select Category')").click();
    const firstCat = page.locator("div.max-h-60 button").first();
    await firstCat.waitFor({ state: "visible" });
    await firstCat.click();

    // Select Color
    await page.locator("button:has-text('Select Color')").click();
    const firstColor = page.locator("div.max-h-60 button").first();
    await firstColor.waitFor({ state: "visible" });
    await firstColor.click();

    await page
      .locator('textarea[name="description"]')
      .fill("E2E Sequential Cart Test Product");

    // Inventory
    await page.locator('input[name="stock"]').fill("100");
    await page.locator('input[name="wholesalePrice"]').fill("200");
    await page.locator('input[name="packagingCost"]').fill("10");
    await page.locator('input[name="marketingCosts"]').fill("20");

    // Size Specification
    await page.locator('input[placeholder="size"]').first().fill("L");
    await page.locator('input[placeholder="length"]').first().fill("80");
    await page.locator('input[placeholder="width"]').first().fill("60");
    await page.locator('input[placeholder="stock"]').first().fill("50");

    // Image Upload
    await page.locator('input[type="file"]').setInputFiles({
      name: "test-product.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        "base64",
      ),
    });

    // Submit
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/Product added successfully/i)).toBeVisible({
      timeout: 15000,
    });

    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 2: Admin - Verification
    // -------------------------------------------------------------------------
    await login(page, ADMIN_EMAIL);
    await page.goto("/products");

    const searchInput = page.getByPlaceholder(/Search|بحث/i);
    await searchInput.waitFor({ state: "visible" });
    await searchInput.fill(productName);
    await page.waitForTimeout(1000); // Debounce wait

    // Corrected locator: name is in h3 inside the card footer
    const adminCard = page
      .locator(".group\\/card")
      .filter({ hasText: productName })
      .first();
    await expect(adminCard).toBeVisible({ timeout: 15000 });

    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 3: User - Add to Cart
    // -------------------------------------------------------------------------
    await login(page, USER_EMAIL);
    await page.goto("/products");

    const userSearch = page.getByPlaceholder(/Search|بحث/i);
    await userSearch.waitFor({ state: "visible" });
    await userSearch.fill(productName);
    await page.waitForTimeout(1000);

    const userCard = page
      .locator(".group\\/card")
      .filter({ hasText: productName })
      .first();
    await expect(userCard).toBeVisible({ timeout: 15000 });

    // Click on the detail link (it's the top part of the card)
    await userCard.locator('a[href*="products-details"]').click();

    // On Details Page
    await expect(page).toHaveURL(/.*products-details/);

    // Select Size
    await page.getByRole("button", { name: "L", exact: true }).click();

    // Add to Cart
    await page
      .getByRole("button", { name: /Add to Cart/i })
      .first()
      .click();

    // Navigate to Cart
    await page.goto("/cart");

    // Verify product presence
    await expect(page.getByText(productName).first()).toBeVisible({
      timeout: 20000,
    });

    await logout(page);
  });

  test("should show cart page empty state", async ({ page }) => {
    await login(page, USER_EMAIL);
    await page.goto("/cart");
    await expect(
      page
        .locator("h1, h2, h3")
        .filter({ hasText: /Cart|السلة/i })
        .first(),
    ).toBeVisible();
    await logout(page);
  });
});
