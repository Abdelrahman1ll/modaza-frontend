import { test, expect } from "@playwright/test";

test.describe("Error Handling", () => {
  test("should show 404 page for non-existent routes", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");

    // Check for 404 content
    await expect(page.getByText(/404/)).toBeVisible();
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();

    // Check for "Go Back Home" button
    const homeButton = page.getByRole("link", { name: /Go Back Home/i });
    await expect(homeButton).toBeVisible();

    await homeButton.click();
    await expect(page).toHaveURL("/");
  });
});
