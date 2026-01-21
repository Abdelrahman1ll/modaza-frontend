import { describe, it, expect } from "vitest";
import { ApiDelivery } from "./apiDelivery";

describe("ApiDelivery", () => {
  it("should have the correct reducer path", () => {
    expect(ApiDelivery.reducerPath).toBe("apiDelivery");
  });

  it("should define required endpoints", () => {
    expect(ApiDelivery.endpoints.getDelivery).toBeDefined();
    expect(ApiDelivery.endpoints.postDelivery).toBeDefined();
    expect(ApiDelivery.endpoints.postFreeDelivery).toBeDefined();
  });

  it("getDelivery query should return the correct URL", () => {
    const { query } = ApiDelivery.endpoints.getDelivery as any;
    expect(query()).toBe("/delivery");
  });

  it("postDelivery mutation should return the correct URL, method, and body", () => {
    const data = { price: 50 };
    const { query } = ApiDelivery.endpoints.postDelivery as any;
    const result = query(data);
    expect(result.url).toBe("/delivery");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });
});
