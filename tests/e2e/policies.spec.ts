import { test, expect } from "@playwright/test";

test.describe("Policies and Static Pages", () => {
  const pages = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Shipping & Delivery", path: "/shipping-delivery" },
    { name: "Return & Exchange", path: "/return-exchange-policy" },
    { name: "About Us", path: "/about-us" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  for (const p of pages) {
    test(`should load ${p.name} successfully`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page).toHaveURL(p.path);
      // Check if page has content
      const content = page.locator("h1, h2").first();
      await expect(content).toBeVisible();
    });
  }
});
