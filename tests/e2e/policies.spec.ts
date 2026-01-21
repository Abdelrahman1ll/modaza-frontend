import { test, expect } from "@playwright/test";

test.describe("Static Pages and Policies", () => {
  test("should display Privacy Policy", async ({ page }) => {
    await page.goto("/privacy-policy");
    await expect(
      page.getByRole("heading", { name: /Privacy Policy/i }),
    ).toBeVisible();
  });

  test("should display Terms and Conditions", async ({ page }) => {
    await page.goto("/terms-conditions");
    await expect(
      page.getByRole("heading", { name: /Terms/i }).first(),
    ).toBeVisible();
  });

  test("should display Sales and Payment Policy", async ({ page }) => {
    await page.goto("/sales-payment-policy");
    await expect(
      page.getByRole("heading", { name: /Sales/i }).first(),
    ).toBeVisible();
  });

  test("should display Return and Exchange Policy", async ({ page }) => {
    await page.goto("/return-exchange-policy");
    await expect(
      page.getByRole("heading", { name: /Return/i }).first(),
    ).toBeVisible();
  });

  test("should display Shipping and Delivery", async ({ page }) => {
    await page.goto("/shipping-delivery");
    await expect(
      page.getByRole("heading", { name: /Shipping/i }).first(),
    ).toBeVisible();
  });

  test("should display Secure Payment", async ({ page }) => {
    await page.goto("/secure-payment");
    await expect(
      page.getByRole("heading", { name: /Secure/i }).first(),
    ).toBeVisible();
  });

  test("should display Worldwide Shipping (Shipping in Egypt)", async ({
    page,
  }) => {
    await page.goto("/shipping-in-egypt");
    await expect(
      page.getByRole("heading", { name: /Shipping/i }).first(),
    ).toBeVisible();
  });

  test("should display About Us", async ({ page }) => {
    await page.goto("/about-us");
    await expect(
      page.getByRole("heading", { name: /About Us/i }),
    ).toBeVisible();
  });

  test("should display FAQs", async ({ page }) => {
    await page.goto("/faqs");
    await expect(page.getByRole("heading", { name: /FAQ/i })).toBeVisible();
  });

  test("should display Contact Us", async ({ page }) => {
    await page.goto("/contact-us");
    await expect(
      page.getByRole("heading", { name: /Contact/i }).first(),
    ).toBeVisible();
    await expect(page.getByPlaceholder(/Name/i)).toBeVisible();
  });
});
