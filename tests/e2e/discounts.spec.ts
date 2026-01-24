import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Discount Codes (Full Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";
  const TIMESTAMP = Date.now();
  const discoCode = `SAVE${TIMESTAMP}`;

  test("should follow the Owner -> Admin -> User flow for discounts", async ({
    page,
  }) => {
    // Phase 1: Owner Setup (Create Discount)
    await login(page, OWNER_EMAIL);
    await page.goto("/discount-codes");
    const codeInput = page.getByPlaceholder(/Enter Code|الكود/i);
    await codeInput.fill(discoCode);
    const percentInput = page.getByPlaceholder(/Percentage|النسبة/i);
    await percentInput.fill("15");
    await page.getByRole("button", { name: /Add|إضافة/i }).click();
    await expect(page.getByText(discoCode).first()).toBeVisible();
    await logout(page);

    // Phase 2: Admin Interaction (Verify)
    await login(page, ADMIN_EMAIL);
    await page.goto("/discount-codes");
    await expect(page.getByText(discoCode).first()).toBeVisible();
    await logout(page);

    // Phase 3: User Interaction (Apply in Checkout)
    await login(page, USER_EMAIL);
    // User needs an item in cart to see checkout/discount
    await page.goto("/products");
    const addToCartBtn = page
      .locator("button")
      .filter({ hasText: /Add To Cart|أضف إلى السلة/i })
      .first();
    await addToCartBtn.click({ force: true });

    await page.goto("/checkout");
    const discoInput = page.getByPlaceholder(/Discount Code|كود الخصم/i);
    if (await discoInput.isVisible()) {
      await discoInput.fill(discoCode);
      await page.getByRole("button", { name: /Apply|تطبيق/i }).click();
      await expect(page.getByText(/Applied|تم التطبيق/i)).toBeVisible();
    }
    await logout(page);
  });
});
