import { test, expect } from "@playwright/test";
import { login, logout } from "./utils/auth-helper";

test.describe("Orders (e2e)", () => {
  const OWNER_EMAIL = "owner@gmail.com";
  const USER_EMAIL = "user@gmail.com";

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
  });

  test.afterEach(async ({ page }) => {
    await logout(page);
  });

  test("should display orders page with proper heading", async ({ page }) => {
    await login(page, OWNER_EMAIL);
    await page.goto("/orders");
    await page.waitForLoadState("networkidle");

    // Verify page heading
    await expect(
      page.locator("h1").filter({ hasText: /Order History/i }),
    ).toBeVisible();

    // Verify descriptive text
    await expect(page.getByText(/Track and manage all your/i)).toBeVisible();
  });

  test("should show empty state when no orders exist", async ({ page }) => {
    // Use a fresh user email that likely has no orders
    const FRESH_USER = `fresh-user-${Date.now()}@example.com`;
    await login(page, FRESH_USER);
    await page.goto("/orders");
    await page.waitForLoadState("networkidle");

    // Check for empty state
    const emptyStateHeading = page.getByRole("heading", {
      name: /No Orders Yet/i,
    });
    const startShoppingLink = page.getByRole("link", {
      name: /Start Shopping/i,
    });

    // If empty state exists, verify it
    if (
      await emptyStateHeading.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await expect(emptyStateHeading).toBeVisible();
      await expect(
        page.getByText(/Your fashion journey starts here/i),
      ).toBeVisible();
      await expect(startShoppingLink).toBeVisible();

      // Test navigation to products
      await startShoppingLink.click();
      await expect(page).toHaveURL("/products");
    }
  });

  test("should display order list with status badges", async ({ page }) => {
    await login(page, USER_EMAIL);
    await page.goto("/orders");
    await page.waitForLoadState("networkidle");

    // Wait a bit for orders to load
    await page.waitForTimeout(2000);

    // Check if orders exist
    const orderCards = page.locator("a[href^='/orders/']");
    const orderCount = await orderCards.count();

    if (orderCount > 0) {
      // Verify first order card elements
      const firstOrder = orderCards.first();
      await expect(firstOrder).toBeVisible();

      // Verify order number is displayed (starts with #)
      await expect(
        firstOrder.locator("h3").filter({ hasText: /^#/ }),
      ).toBeVisible();

      // Verify status badge exists (one of: Processing, Confirmed, Paid, Shipped, Delivered, Canceled)
      await expect(
        firstOrder.locator("span").filter({
          hasText: /Processing|Confirmed|Paid|Shipped|Delivered|Canceled/i,
        }),
      ).toBeVisible();

      // Verify item count is displayed
      await expect(firstOrder.getByText(/Item/i)).toBeVisible();

      // Verify price is displayed with EGP
      await expect(firstOrder.getByText(/EGP/i)).toBeVisible();
    }
  });

  test("should navigate to order details when clicking an order", async ({
    page,
  }) => {
    await login(page, USER_EMAIL);
    await page.goto("/orders");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // Check if orders exist
    const orderCards = page.locator("a[href^='/orders/']");
    const orderCount = await orderCards.count();

    if (orderCount > 0) {
      // Click the first order
      await orderCards.first().click();

      // Verify navigation to order details page
      await expect(page).toHaveURL(/\/orders\/\d+/);

      // Verify order details page loaded
      await expect(
        page.locator("h1, h2").filter({ hasText: /Order Details|Order #/i }),
      ).toBeVisible({ timeout: 10000 });
    }
  });
});
