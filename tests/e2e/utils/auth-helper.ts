import { Page, expect } from "@playwright/test";

export async function login(page: Page, email: string) {
  console.log(`[AuthHelper] Attempting login for: ${email}`);

  // Check if already logged in
  await page.goto("/");
  const userMenu = page.locator('div[title="حسابي"]').first();
  if (await userMenu.isVisible()) {
    await logout(page);
  }

  const loginButton = page
    .getByRole("button", { name: /Login|تسجيل\s*الدخول/i })
    .first();
  await loginButton.waitFor({ state: "visible", timeout: 10000 });
  await loginButton.click({ force: true });

  const emailInput = page.getByPlaceholder(
    /name@example.com|البريد\s*الإلكتروني/i,
  );
  await emailInput.waitFor({ state: "visible", timeout: 10000 });
  await emailInput.fill(email);

  // Listen for console log with code
  let consoleCode = "";
  const consoleHandler = (msg: { text: () => any }) => {
    const text = msg.text();
    // Look for 6-digit OTP
    const match = text.match(/\b\d{6}\b/);
    if (match) {
      consoleCode = match[0];
      console.log(`[AuthHelper] Found OTP in console: ${consoleCode}`);
    }
  };
  page.on("console", consoleHandler);

  // Prepare response waiter BEFORE clicking
  const responsePromise = page.waitForResponse(
    (r) =>
      r.url().includes("/users/check-email") &&
      (r.status() === 200 || r.status() === 201),
    { timeout: 25000 },
  );

  const sendBtn = page.getByRole("button", {
    name: /Send Verification Code|إرسال\s*كود\s*التحقق/i,
  });
  await sendBtn.waitFor({ state: "visible" });
  await sendBtn.click();

  // Try to get from response
  let code = "";
  try {
    const response = await responsePromise;
    const body = await response.json();
    code = body.code || "";
    if (code) console.log(`[AuthHelper] Found OTP in response: ${code}`);
  } catch (e) {
    console.log("[AuthHelper] Response waiter timed out, checking console...");
  }

  // Final code selection
  code = code || consoleCode || "123456";
  console.log(`[AuthHelper] Using OTP code: ${code}`);

  // Wait for the inputs to appear before filling
  await expect(page.locator("#code-0")).toBeVisible({ timeout: 15000 });

  const digits = String(code).split("");
  for (let i = 0; i < digits.length; i++) {
    await page.locator(`#code-${i}`).fill(digits[i]);
    // Small delay to ensure input registration
    await page.waitForTimeout(150);
  }

  // Submit
  const verifyBtn = page
    .locator('button:has-text("Verify"), button:has-text("تحقق")')
    .first();
  await verifyBtn.click();

  // Wait for login success (menu becomes visible)
  await expect(page.locator('div[title="حسابي"]').first()).toBeVisible({
    timeout: 30000,
  });

  // Ensure page is stable
  await page.waitForLoadState("networkidle");
  console.log(`[AuthHelper] Login successful for: ${email}`);

  // Clean up listener
  page.off("console", consoleHandler);
}

export async function logout(page: Page) {
  console.log("[AuthHelper] Attempting logout...");

  // Navigate to home to ensure a clean state and visible header
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const userMenu = page.locator('div[title="حسابي"]').first();

  // Ensure menu is interactive
  await userMenu.waitFor({ state: "visible", timeout: 10000 });

  // Click menu and wait for logout button
  let logoutBtn = page
    .getByRole("button", { name: /Log\s*Out|Sign\s*out|تسجيل\s*خروج/i })
    .first();

  let attempts = 0;
  while (!(await logoutBtn.isVisible()) && attempts < 3) {
    await userMenu.click({ force: true });
    await page.waitForTimeout(1000); // Wait for menu animation
    attempts++;
  }

  await logoutBtn.waitFor({ state: "visible", timeout: 10000 });
  await logoutBtn.click({ force: true });

  // Wait for login button to reappear
  await expect(
    page.getByRole("button", { name: /Login|تسجيل\s*الدخول/i }).first(),
  ).toBeVisible({ timeout: 15000 });

  console.log("[AuthHelper] Logout successful.");
}
