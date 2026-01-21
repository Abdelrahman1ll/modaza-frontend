import { describe, it, expect } from "vitest";
import { ApiEmailOrderDispatcher } from "./apiEmailOrderDispatcher";

describe("ApiEmailOrderDispatcher", () => {
  it("should have the correct reducer path", () => {
    expect(ApiEmailOrderDispatcher.reducerPath).toBe("apiEmailOrderDispatcher");
  });

  it("should define required endpoints", () => {
    expect(
      ApiEmailOrderDispatcher.endpoints.postEmailOrderDispatcher,
    ).toBeDefined();
    expect(
      ApiEmailOrderDispatcher.endpoints.getEmailOrderDispatcher,
    ).toBeDefined();
    expect(
      ApiEmailOrderDispatcher.endpoints.patchEmailOrderDispatcher,
    ).toBeDefined();
    expect(
      ApiEmailOrderDispatcher.endpoints.deleteEmailOrderDispatcher,
    ).toBeDefined();
  });

  it("getEmailOrderDispatcher query should return the correct URL and method", () => {
    const { query } = ApiEmailOrderDispatcher.endpoints
      .getEmailOrderDispatcher as any;
    const result = query();
    expect(result.url).toBe("/email-order-dispatcher");
    expect(result.method).toBe("GET");
  });

  it("patchEmailOrderDispatcher mutation should return the correct URL, method, and body", () => {
    const data = { active: false };
    const id = "789";
    const { query } = ApiEmailOrderDispatcher.endpoints
      .patchEmailOrderDispatcher as any;
    const result = query({ data, id });
    expect(result.url).toBe(`/email-order-dispatcher/${id}`);
    expect(result.method).toBe("PATCH");
    expect(result.body).toEqual(data);
  });
});
