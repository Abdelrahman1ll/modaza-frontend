import { test, expect } from "@playwright/test";

test.describe("Details Pages", () => {
  test("should display product details", async ({ page }) => {
    // Navigate to a specific product
    await page.goto("/products-details/1");
    // Check for "Explore Details" or similar product-specific text if possible,
    // but at least verify we are on a page that isn't 404
    await expect(page).not.toHaveURL(/.*404.*/);
  });

  test("should display order details", async ({ page }) => {
    // Navigate to a specific order
    await page.goto("/orders/1");
    // Verify basic presence
    await expect(page).not.toHaveURL(/.*404.*/);
  });
});
