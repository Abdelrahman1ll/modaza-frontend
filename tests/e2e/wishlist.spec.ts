import { test, expect } from "@playwright/test";

test.describe("Wishlist Flow", () => {
  test("should add a product to wishlist and view it", async ({ page }) => {
    await page.goto("/products");

    // Click the wishlist (heart) icon on the first product card
    // The heart icon is a button with aria-label containing "wishlist" or similar
    // Looking at the implementation, it might not have a clear label in all states
    // but the button exists.
    const wishlistButton = page
      .locator('button[aria-label*="wishlist"]')
      .first();
    await expect(wishlistButton).toBeVisible();
    await wishlistButton.click();

    // Navigate to wishlist page
    await page.goto("/wishlist");

    // Verify the product is in the wishlist
    // Check for "Explore Details" which is visible in the wishlist items
    const exploreButton = page.getByText("Explore Details").first();
    await expect(exploreButton).toBeVisible({ timeout: 15000 });

    // Verify "My Wishlist" heading
    await expect(
      page.getByRole("heading", { name: /My Wishlist/i }),
    ).toBeVisible();
  });

  test("should show empty wishlist message when no products are added", async ({
    page,
  }) => {
    await page.goto("/wishlist");

    // Check for the "No products found in wishlist" message
    const emptyMessage = page.getByText(/No products found in wishlist/i);
    await expect(emptyMessage).toBeVisible();
  });
});
