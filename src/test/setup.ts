import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Automatically cleanup after each test to avoid memory leaks or state contamination
// تنظيف التلقائي بعد كل اختبار لتجنب تلوث البيانات أو تسرب الذاكرة
afterEach(() => {
  cleanup();
});
