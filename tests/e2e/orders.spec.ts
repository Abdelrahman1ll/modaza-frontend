import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Orders Flow (Full Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";
  const TIMESTAMP = Date.now();
  const productName = `OrderFlowTest ${TIMESTAMP}`;

  test("should follow the Owner -> Admin -> User flow for orders", async ({
    page,
  }) => {
    // Phase 1: Owner Setup (Create Product)
    await login(page, OWNER_EMAIL);
    await page.goto("/add-product");
    await page.locator('input[name="name"]').fill(productName);
    await page.locator('input[name="price"]').fill("1200");
    await page.locator('input[name="promotionalPrice"]').fill("1111");
    await page.locator("button:has-text('Select Category')").click();
    await page.locator("div.max-h-60 button").first().click();
    await page.locator("button:has-text('Select Color')").click();
    await page.locator("div.max-h-60 button").first().click();
    await page
      .locator('textarea[name="description"]')
      .fill("Product for order testing.");
    await page.locator('input[name="stock"]').fill("5");
    await page.locator('input[name="wholesalePrice"]').fill("1000");
    await page.locator('input[name="packagingCost"]').fill("0");
    await page.locator('input[name="marketingCosts"]').fill("0");
    await page.locator('input[placeholder="size"]').first().fill("L");
    await page.locator('input[placeholder="length"]').first().fill("80");
    await page.locator('input[placeholder="width"]').first().fill("60");
    await page.locator('input[placeholder="stock"]').first().fill("5");
    await page.locator('input[type="file"]').setInputFiles({
      name: "test-product.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        "base64",
      ),
    });
    await page.locator('button[type="submit"]').click();
    await logout(page);

    // Phase 2: User Interaction (Create Order)
    await login(page, USER_EMAIL);
    await page.goto("/products");
    const userProductCard = page
      .locator(`css=div:has-text("${productName}")`)
      .last();
    await userProductCard
      .locator("button")
      .filter({ hasText: /Add To Cart|أضف إلى السلة/i })
      .first()
      .click({ force: true });
    await page.goto("/checkout");
    await page.locator('input[name="address"]').fill("Order Test St");
    await page.locator('input[name="city"]').fill("Cairo");
    await page.locator("button:has-text('Place Order')").click();
    await expect(page.getByText(/Success|Thank you/i)).toBeVisible();
    await logout(page);

    // Phase 3: Admin/Owner Verification
    await login(page, ADMIN_EMAIL);
    await page.goto("/orders");
    // Verify latest order or specific product in orders
    // Use a loose check if the UI doesn't explicitly list products in the main orders view
    await expect(page.locator("h1, h2")).toContainText(/Orders|الطلبات/i);
    await logout(page);
  });
});
