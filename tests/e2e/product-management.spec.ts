import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Product Management (Full Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";
  const TIMESTAMP = Date.now();
  const productName = `ManageFlowTest ${TIMESTAMP}`;

  test("should follow the Owner -> Admin -> User flow for product management", async ({
    page,
  }) => {
    // Phase 1: Owner Setup (Create Product)
    await login(page, OWNER_EMAIL);
    await page.goto("/add-product");
    await page.locator('input[name="name"]').fill(productName);
    await page.locator('input[name="price"]').fill("500");
    await page.locator('input[name="promotionalPrice"]').fill("450");
    await page.locator("button:has-text('Select Category')").click();
    await page.locator("div.max-h-60 button").first().click();
    await page.locator("button:has-text('Select Color')").click();
    await page.locator("div.max-h-60 button").first().click();
    await page
      .locator('textarea[name="description"]')
      .fill("Product management testing.");
    await page.locator('input[name="stock"]').fill("100");
    await page.locator('input[name="wholesalePrice"]').fill("200");
    await page.locator('input[name="packagingCost"]').fill("10");
    await page.locator('input[name="marketingCosts"]').fill("20");
    await page.locator('input[placeholder="size"]').first().fill("L");
    await page.locator('input[placeholder="length"]').first().fill("80");
    await page.locator('input[placeholder="width"]').first().fill("60");
    await page.locator('input[placeholder="stock"]').first().fill("50");
    await page.locator('input[type="file"]').setInputFiles({
      name: "test-product.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        "base64",
      ),
    });
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/.*dashboard|.*product/);
    await logout(page);

    // Phase 2: Admin Interaction (Verify & Edit)
    await login(page, ADMIN_EMAIL);
    await page.goto("/products");
    const adminProductCard = page
      .locator(`css=div:has-text("${productName}")`)
      .last();
    await expect(adminProductCard).toBeVisible();

    // Assuming edit capability for admin
    const editBtn = adminProductCard
      .locator("a[href*='edit-product'], button:has-text('Edit')")
      .first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await page.locator('input[name="price"]').fill("550");
      await page.locator('button[type="submit"]').click();
      await expect(page).toHaveURL(/.*dashboard|.*product/);
    }
    await logout(page);

    // Phase 3: User Interaction (View Final Product)
    await login(page, USER_EMAIL);
    await page.goto("/products");
    await expect(
      page.locator(`css=div:has-text("${productName}")`).last(),
    ).toBeVisible();
    await logout(page);
  });
});
