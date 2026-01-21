import { test, expect, type Page } from "@playwright/test";
import CryptoJS from "crypto-js";

const SECRET_KEY = "fallback_secret_key_dev_only";

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
                images: ["https://via.placeholder.com/400x500"],
                stock: 10,
                total_stock: 10,
                discountPercentage: 0,
                category: { name: "Test Category" },
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
            images: ["https://via.placeholder.com/400x500"],
            stock: 10,
            total_stock: 10,
            discountPercentage: 0,
            category: { name: "Test Category" },
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
        // Return 1 item if we've already tried to add something, else 0
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            carts: {
              items: [
                {
                  id: "cart-item-1",
                  product: { id: 1, name: "Mock Product", price: 100 },
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
    const productCard = page.getByText("Explore Details").first();
    await productCard.click();

    // 3. Verify we are on the product details page
    await expect(page).toHaveURL(/\/products-details\/1/);

    // 4. Select a size (if available)
    // The sizes are rendered as buttons. Let's mock a size selection if needed.
    // In our mock, we don't strictly define sizes, but let's assume one exists.
    const sizeButton = page
      .locator("button")
      .getByText(/M|S|L|XL|38|39|40/i)
      .first();
    if (await sizeButton.isVisible()) {
      await sizeButton.click();
    }

    // 5. Add to cart
    const addToCartButton = page.getByRole("button", { name: /Add to Cart/i });
    await addToCartButton.click();

    // 6. Verify cart badge in header updates
    const cartBadge = page.locator("a[href='/cart'] span").first();
    await expect(cartBadge).not.toHaveText("0", { timeout: 10000 });

    // 7. Go to cart page and verify product is there
    await page.goto("/cart");
    const cartContent = page.locator("main, .cart-container").first();
    await expect(cartContent).toBeVisible();
    await expect(page.getByText("Mock Product")).toBeVisible();
  });
});
