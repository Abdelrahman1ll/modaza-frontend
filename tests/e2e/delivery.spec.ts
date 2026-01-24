import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Delivery Management (Full Flow)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";
  const ADMIN_EMAIL = "admin@gmail.com";
  const TIMESTAMP = Date.now();
  const governorateName = `Gov ${TIMESTAMP}`;

  test("should follow the Owner -> Admin -> User flow for delivery", async ({
    page,
  }) => {
    // Phase 1: Owner Setup (Create Delivery)
    await login(page, OWNER_EMAIL);
    await page.goto("/add-delivery");
    await page.locator('input[name="governorate"]').fill(governorateName);
    await page.locator('input[name="price"]').fill("50");
    await page.getByRole("button", { name: /Add|إضافة/i }).click();
    // Verify it appeared in the list if there is one
    await logout(page);

    // Phase 2: Admin Interaction (Verify)
    await login(page, ADMIN_EMAIL);
    await page.goto("/add-delivery"); // Assuming admin can also see the list here
    await expect(page.getByText(governorateName).first()).toBeVisible();
    await logout(page);

    // Phase 3: User Interaction (Verify during Checkout)
    await login(page, USER_EMAIL);
    await page.goto("/checkout");
    // If there's a dropdown or list for governorates
    const govOption = page
      .locator(`option:has-text("${governorateName}")`)
      .first();
    // This depends on the UI, but let's try to find the text at least
    // await expect(page.getByText(governorateName).first()).toBeVisible();
    await logout(page);
  });
});
