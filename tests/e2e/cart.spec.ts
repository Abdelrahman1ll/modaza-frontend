import { test, expect, type Page } from "@playwright/test";
import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.VITE_SECRET_KEY =
  "fallback_secret_key_dev_only";

async function mockLogin(page: Page) {
  const authData = {
    user: {
      id: 1,
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "1234567890",
      birthday: "2000-01-01",
      role: "user",
      createdAt: new Date().toISOString(),
    },
    accessToken: "mock_access_token_hour",
    refreshToken: "mock_refresh_token_3_months",
  };

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(authData),
    SECRET_KEY,
  ).toString();

  await page.context().addCookies([
    {
      name: "user",
      value: encrypted,
      domain: "localhost",
      path: "/",
    },
  ]);
}

test.describe("Shopping Cart", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Mock Login
    await mockLogin(page);

    // 2. Mock API Responses
    await page.route("**/products", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            products: [
              {
                id: 1,
                name: "Mock Product",
                price: 100,
                promotionalPrice: 120,
                discountPercentage: 10,
                images: [
                  "https://via.placeholder.com/400x500",
                  "https://via.placeholder.com/400x500/ff0000",
                ],
                stock: 10,
                total_stock: 10,
                category: { name: "Test Category" },
                sizes: [
                  { id: 101, size: "M", stock: 5, length: 70, width: 50 },
                  { id: 102, size: "L", stock: 5, length: 72, width: 52 },
                ],
              },
            ],
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.route("**/products/1", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          product: {
            id: 1,
            name: "Mock Product",
            price: 100,
            promotionalPrice: 120,
            discountPercentage: 10,
            description: "A great mock product for testing.",
            images: [
              "https://via.placeholder.com/400x500",
              "https://via.placeholder.com/400x500/ff0000",
            ],
            stock: 10,
            total_stock: 10,
            category: { name: "Test Category" },
            sizes: [
              { id: 101, size: "M", stock: 5, length: 70, width: 50 },
              { id: 102, size: "L", stock: 5, length: 72, width: 52 },
            ],
          },
        }),
      });
    });

    await page.route("**/carts", async (route) => {
      const method = route.request().method();
      if (method === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Added to cart" }),
        });
      } else if (method === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            carts: {
              items: [
                {
                  id: "cart-item-1",
                  product: {
                    id: 1,
                    name: "Mock Product",
                    price: 100,
                    images: ["https://via.placeholder.com/400x500"],
                  },
                  quantity: 1,
                  sizes: "M",
                },
              ],
            },
          }),
        });
      }
    });
  });

  test("should allow adding a product to the cart", async ({ page }) => {
    // 1. Go to products page
    await page.goto("/products");

    // 2. Click on the first product card to see details
    // We need to hover first because "Explore Details" is only visible on hover
    const firstProduct = page.locator(".group\\/card").first();
    await firstProduct.hover();
    const exploreDetails = page.getByText("Explore Details").first();
    await exploreDetails.click();

    // 3. Verify we are on the product details page
    await expect(page).toHaveURL(/\/products-details\/1/);

    // 4. Select a size
    const sizeM = page.getByRole("button", { name: /^M$/ }).first();
    await sizeM.click();

    // 5. Add to cart
    const addToCartButton = page.getByRole("button", { name: /Add to Cart/i });
    await addToCartButton.click();

    // 6. Verify cart badge in header updates
    // The selector might vary, let's look for a span inside the cart link
    const cartBadge = page.locator("a[href='/cart'] span").first();
    // Wait for the badge to show something other than "0" or being hidden
    await expect(cartBadge).toBeVisible();

    // 7. Go to cart page and verify product is there
    await page.goto("/cart");
    // Check for the product name in the cart list
    await expect(page.getByText("Mock Product")).toBeVisible();
  });
});
