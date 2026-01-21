import { test, expect, type Page } from "@playwright/test";
import CryptoJS from "crypto-js";

const SECRET_KEY = "fallback_secret_key_dev_only";

/**
 * Mocks the authentication state for various roles.
 */
async function mockLogin(page: Page, role: "user" | "admin" | "owner") {
  const userData = {
    user: {
      id: 1,
      firstName: "Test",
      lastName: role.charAt(0).toUpperCase() + role.slice(1),
      email: `${role}@example.com`,
      role: role,
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

test.describe("Role-Based Access Control (RBAC) Logic", () => {
  test.describe("Guest Restrictions", () => {
    const protectedRoutes = ["/profile", "/orders", "/dashboard", "/all-users"];

    for (const route of protectedRoutes) {
      test(`Guest should be redirected from: ${route}`, async ({ page }) => {
        await page.goto(route);
        await expect(page).toHaveURL("/");
      });
    }

    test("Guest should access public routes", async ({ page }) => {
      await page.goto("/products");
      await expect(page).toHaveURL("/products");
      await expect(page.locator("h2")).toContainText("Products");
    });
  });

  test.describe("User Role Permissions", () => {
    test.beforeEach(async ({ page }) => {
      await mockLogin(page, "user");
    });

    test("User can access own data", async ({ page }) => {
      await page.goto("/profile");
      await expect(page.locator("h2")).toContainText(
        /Profile Details|Test User/,
      );
    });

    test("User is restricted from management", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page).toHaveURL("/");
    });
  });

  test.describe("Admin Role Permissions", () => {
    test.beforeEach(async ({ page }) => {
      await mockLogin(page, "admin");
    });

    test("Admin can access product editing", async ({ page }) => {
      await page.goto("/edit-product/1");
      await expect(page).not.toHaveURL("/");
      await expect(page.locator("h1")).toContainText("Edit Product");
    });

    test("Admin is restricted from Owner-only settings", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page).toHaveURL("/");
    });
  });

  test.describe("Owner Role Permissions", () => {
    test.beforeEach(async ({ page }) => {
      await mockLogin(page, "owner");
    });

    test("Owner has full access to management", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page.locator("h1")).toContainText("Dashboard Overview");
    });
  });
});
