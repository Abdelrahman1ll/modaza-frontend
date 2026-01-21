import { test, expect } from "@playwright/test";

test.describe("Products Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("should display products", async ({ page }) => {
    // Check if the products heading is visible
    const productsHeading = page.getByRole("heading", { name: "Products" });
    await expect(productsHeading).toBeVisible();

    // Verify at least one product card is visible (via "Explore Details" text found in ProductCard)
    const exploreButton = page.getByText("Explore Details").first();
    await expect(exploreButton).toBeVisible({ timeout: 15000 });
  });

  test("should allow searching for products", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i).first();
    await expect(searchInput).toBeVisible();

    await searchInput.fill("shirt");
    // Verify that the URL or UI reflects the search if applicable
    // (This depends on the implementation of useHeader/search)
  });
});
