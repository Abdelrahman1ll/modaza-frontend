import { test, expect } from "@playwright/test";

test.describe("Product Details Page", () => {
  test("should load details for a specific product", async ({ page }) => {
    // Navigate to products first
    await page.goto("/products");

    // Click on the first product card/link
    const firstProduct = page.locator("a[href*='products-details']").first();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/products-details\/\d+/);

    // Check for essential elements
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("button:has-text('Add to Cart')")).toBeVisible();
  });
});
