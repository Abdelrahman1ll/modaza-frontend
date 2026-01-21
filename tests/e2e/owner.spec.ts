import { test, expect, type Page } from "@playwright/test";
import CryptoJS from "crypto-js";

const SECRET_KEY = "fallback_secret_key_dev_only";

/**
 * Mocks the authentication state for the Owner role.
 */
async function mockOwnerLogin(page: Page) {
  const userData = {
    user: {
      id: 1,
      firstName: "System",
      lastName: "Owner",
      email: "owner@modeza.com",
      phone: "1234567890",
      role: "owner",
      createdAt: new Date().toISOString(),
    },
  };

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
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

test.describe("Owner Full System Access (31 Routes)", () => {
  test.beforeEach(async ({ page }) => {
    await mockOwnerLogin(page);
  });

  const allRoutes = [
    // Public Routes
    { path: "/", heading: "New Collection" },
    { path: "/products", heading: "Products" },
    { path: "/cart", heading: "Shopping Cart" },
    { path: "/wishlist", heading: "Explore Details" },
    { path: "/checkout", heading: "Checkout" },
    { path: "/contact-us", heading: "Contact Us" },
    { path: "/about-us", heading: "About Us" },
    { path: "/faqs", heading: "FAQs" },

    // Policy Routes
    { path: "/privacy-policy", heading: "Privacy Policy" },
    { path: "/terms-conditions", heading: "Terms & Conditions" },
    { path: "/sales-payment-policy", heading: "Sales & Payment" },
    { path: "/return-exchange-policy", heading: "Return & Exchange" },
    { path: "/shipping-delivery", heading: "Shipping & Delivery" },
    { path: "/secure-payment", heading: "Secure Payment" },
    { path: "/shipping-in-egypt", heading: "Worldwide Shipping" },

    // Authenticated User Routes
    { path: "/profile", heading: "Profile Details" },
    { path: "/orders", heading: "Order History" },
    { path: "/orders/1", heading: "Order Details" },
    { path: "/products-details/1", heading: "Select Size" }, // Text in details component

    // Admin & Owner Routes
    { path: "/edit-product/1", heading: "Edit Product" },

    // Owner-Only Routes
    { path: "/dashboard", heading: "Dashboard Overview" },
    { path: "/all-users", heading: "User Management" },
    { path: "/add-product", heading: "Create Product" },
    { path: "/add-delivery", heading: "Delivery Pricing" },
    { path: "/discount-codes", heading: "Discount Codes" },
    { path: "/all-users-messages", heading: "Broadcast Message" },
    { path: "/email-order-dispatcher", heading: "Order Routing" },
    { path: "/category", heading: "Categories" },
    { path: "/color", heading: "Color Palette" },
    { path: "/edit-user-owner/1", heading: "Edit Profile" }, // From EditUserOwner component
  ];

  for (const route of allRoutes) {
    test(`Owner should access and verify content for: ${route.path}`, async ({
      page,
    }) => {
      await page.goto(route.path);

      // Verify no redirection occurred (unless intended, but here we expect to stay)
      if (route.path !== "/") {
        await expect(page).not.toHaveURL("/");
      }

      // Assert specific heading or unique text
      const content = page.locator("h1, h2, h3, span, p");
      await expect(content).toContainText(route.heading);
    });
  }

  test("Owner should see 404 page for non-existent routes", async ({
    page,
  }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page.locator("h1")).toContainText("404");
  });
});
