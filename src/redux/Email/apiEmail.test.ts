import { describe, it, expect } from "vitest";
import { ApiEmail } from "./apiEmail";

describe("ApiEmail", () => {
  it("should have the correct reducer path", () => {
    expect(ApiEmail.reducerPath).toBe("apiEmail");
  });

  it("should define required endpoints", () => {
    expect(ApiEmail.endpoints.sendEmail).toBeDefined();
  });

  it("sendEmail mutation should return the correct URL, method, and body", () => {
    const data = { to: "test@example.com", subject: "Hello", body: "World" };
    const { query } = ApiEmail.endpoints.sendEmail as any;
    const result = query(data);
    expect(result.url).toBe("/email");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });
});
