import { test, expect } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test("should show 404 page for non-existent route", async ({ page }) => {
    await page.goto("/some-random-route-that-does-not-exist");
    await expect(page.getByText(/404|Not Found|غير موجود/i)).toBeVisible();

    const goHomeBtn = page
      .getByRole("link", { name: /Home|الرئيسية/i })
      .first();
    await goHomeBtn.click();
    await expect(page).toHaveURL("/");
  });
});
