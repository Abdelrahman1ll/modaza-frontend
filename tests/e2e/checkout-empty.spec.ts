import { test, expect } from "@playwright/test";

test.describe("Checkout Redirect", () => {
  test("should redirect to /cart when accessing /checkout with an empty cart", async ({
    page,
  }) => {
    // 1. Ensure cart is empty (assuming fresh session or clearing cart)
    // We can navigate to checkout directly and expect redirect
    await page.goto("/checkout");

    // 2. Wait for redirect and verify URL
    await expect(page).toHaveURL(/\/cart/);

    // 3. Verify empty cart message is visible
    const emptyMessage = page.getByText(/Your cart is empty/i);
    await expect(emptyMessage).toBeVisible();
  });
});
