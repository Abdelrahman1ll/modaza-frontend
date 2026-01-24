import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Checkout Flow (Full Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";
  const TIMESTAMP = Date.now();
  const productName = `CheckoutTest ${TIMESTAMP}`;

  test("should follow the Owner -> Owner -> User flow for checkout", async ({
    page,
  }) => {
    console.log(`[Test] Starting Checkout Flow - ${productName}`);

    // -------------------------------------------------------------------------
    // Phase 1: Owner Setup (Create Product)
    // إعداد المالك (إنشاء المنتج)
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/add-product");

    await expect(page.locator('input[name="name"]')).toBeVisible({
      timeout: 15000,
    });
    await page.locator('input[name="name"]').fill(productName);
    await page.locator('input[name="price"]').fill("1000");
    await page.locator('input[name="promotionalPrice"]').fill("900");

    await page.locator("button:has-text('Select Category')").click();
    await page.locator("div.max-h-60 button").first().click();

    await page.locator("button:has-text('Select Color')").click();
    await page.locator("div.max-h-60 button").first().click();

    await page
      .locator('textarea[name="description"]')
      .fill("Product for checkout verification.");
    await page.locator('input[name="stock"]').fill("10");
    await page.locator('input[name="wholesalePrice"]').fill("500");
    await page.locator('input[name="packagingCost"]').fill("20");
    await page.locator('input[name="marketingCosts"]').fill("50");

    await page.locator('input[placeholder="size"]').first().fill("XL");
    await page.locator('input[placeholder="length"]').first().fill("90");
    await page.locator('input[placeholder="width"]').first().fill("70");
    await page.locator('input[placeholder="stock"]').first().fill("2");

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
    console.log(`[Test] Product '${productName}' created by Owner`);
    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 2: Owner Interaction (Verify List using Search)
    // تفاعل المالك (التحقق عبر البحث)
    // -------------------------------------------------------------------------
    await login(page, OWNER_EMAIL);
    await page.goto("/products");

    // Use Search Bar for reliability
    const searchInput = page.getByPlaceholder(/Search.../i).first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await searchInput.fill(productName);

    // Wait for debounce and refetch
    await page.waitForTimeout(2000);

    const ownerProductCard = page
      .locator("div")
      .filter({ hasText: productName })
      .last();
    await expect(ownerProductCard).toBeVisible({ timeout: 15000 });

    console.log(`[Test] Product verification successful for Owner`);
    await logout(page);

    // -------------------------------------------------------------------------
    // Phase 3: User Interaction (Add to Cart & Checkout)
    // تفاعل المستخدم (الإضافة للسلة والدفع)
    // -------------------------------------------------------------------------
    await login(page, USER_EMAIL);
    await page.goto("/products");

    // Use Search Bar again for User
    const userSearchInput = page.getByPlaceholder(/Search.../i).first();
    await expect(userSearchInput).toBeVisible({ timeout: 15000 });
    await userSearchInput.fill(productName);
    await page.waitForTimeout(2000);

    const userProductCard = page
      .locator("div")
      .filter({ hasText: productName })
      .last();
    await expect(userProductCard).toBeVisible({ timeout: 15000 });

    const addToCartBtn = userProductCard
      .locator("button")
      .filter({ hasText: /Add To Cart|أضف إلى السلة|Explore Details|تفاصيل/i })
      .first();
    await addToCartBtn.click({ force: true });
    console.log(`[Test] Product added to cart by User`);

    await page.goto("/checkout");
    await expect(page).toHaveURL(/.*checkout/);

    // Fill Address details
    await page.getByPlaceholder(/e.g. John/i).fill("E2E");
    await page.getByPlaceholder(/e.g. Doe/i).fill("Tester");

    // State dropdown handling
    await page.locator("button:has-text('Select State')").click();
    await page.getByPlaceholder(/Search city.../i).fill("Cairo");
    await page.locator("button:has-text('Cairo')").first().click();

    await page
      .getByPlaceholder(/Street name, building number/i)
      .fill("123 E2E Test St, Cairo, Egypt");

    await page.getByPlaceholder(/01xxxxxxxxx/i).fill("01234567890");

    // Select Cash on Delivery
    console.log(`[Test] Selecting Cash on Delivery...`);
    const codBtn = page
      .locator("button")
      .filter({ hasText: /Cash on Delivery|الدفع عند الاستلام/i })
      .first();
    await codBtn.click();

    // Finalize Order
    console.log(`[Test] Completing the order...`);
    const completeOrderBtn = page
      .locator("button")
      .filter({ hasText: /Complete Order|إتمام الطلب/i })
      .first();
    await completeOrderBtn.click();

    // Verify success
    await expect(
      page.getByText(/Success|Thank you|تم بنجاح|شكراً لك/i),
    ).toBeVisible({ timeout: 30000 });

    console.log(`[Test] Checkout flow completed successfully!`);
    await logout(page);
  });
});
