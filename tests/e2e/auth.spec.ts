import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should complete the full OTP authentication flow", async ({ page }) => {
    // 1. Mock the API responses
    await page.route("**/users/check-email", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Code sent to email" }),
      });
    });

    await page.route("**/users", async (route) => {
      // Check if it's a POST to /users with code
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: 1,
            email: "test@example.com",
            role: "user",
            token: "fake-jwt-token",
          }),
        });
      } else {
        await route.continue();
      }
    });

    // 2. Open Signup Modal
    const loginButton = page.getByRole("button", { name: "Login" }).first();
    await loginButton.click();

    // 3. Enter Email
    const emailInput = page.getByPlaceholder("name@example.com");
    await emailInput.fill("test@example.com");
    await page.getByRole("button", { name: /Send Verification Code/i }).click();

    // 4. Verify Code Input is visible
    await expect(page.getByText(/Check Your Email/i)).toBeVisible();

    // 5. Enter 6-digit code
    // The code inputs have IDs like code-0, code-1...
    const digits = ["1", "2", "3", "4", "5", "6"];
    for (let i = 0; i < digits.length; i++) {
      await page.locator(`#code-${i}`).fill(digits[i]);
    }

    // 6. Submit Verification
    await page.getByRole("button", { name: /Verify & Sign Up/i }).click();

    // 7. Verify login success (User menu should appear)
    const userMenuButton = page.locator('div[title="حسابي"]').first();
    await expect(userMenuButton).toBeVisible();
  });

  test("should open signup modal and show initial state", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "Login" }).first();
    await loginButton.click();

    const modalHeading = page.getByRole("heading", { name: /Create Account/i });
    await expect(modalHeading).toBeVisible();

    const emailInput = page.getByPlaceholder("name@example.com");
    await expect(emailInput).toBeVisible();
  });
});
