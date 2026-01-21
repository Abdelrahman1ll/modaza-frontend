import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test("should display checkout form when items are in cart", async ({
    page,
  }) => {
    // 1. Add an item to cart first (dependency)
    await page.goto("/products");
    const productCard = page.getByText("Explore Details").first();
    await productCard.click();

    // Select size if available
    const sizeButton = page
      .locator("button.relative.h-12.w-12")
      .filter({ hasNot: page.locator("[disabled]") })
      .first();
    if (await sizeButton.isVisible()) {
      await sizeButton.click();
    }

    await page.getByRole("button", { name: /Add to Cart/i }).click();

    // 2. Go to checkout page
    await page.goto("/checkout");

    // 3. Verify Checkout page elements
    const heading = page.getByRole("heading", {
      name: "Checkout",
      exact: true,
    });
    await expect(heading).toBeVisible();

    // Verify Shipping Details section
    const shippingHeading = page.getByText("Shipping Details");
    await expect(shippingHeading).toBeVisible();

    // Verify form fields
    await expect(page.getByLabel(/First Name/i)).toBeVisible();
    await expect(page.getByLabel(/Last Name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Street name/i)).toBeVisible();

    // Verify Payment Method section
    const paymentHeading = page.getByText("Payment Method");
    await expect(paymentHeading).toBeVisible();

    // Verify specific payment options
    await expect(page.getByText("Cash on Delivery")).toBeVisible();
  });
});
