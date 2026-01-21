import { describe, it, expect } from "vitest";
import { ApiOrders } from "./apiOrders";

describe("ApiOrders", () => {
  it("should have the correct reducer path", () => {
    expect(ApiOrders.reducerPath).toBe("apiOrders");
  });

  it("should define required endpoints", () => {
    expect(ApiOrders.endpoints.postOrders).toBeDefined();
    expect(ApiOrders.endpoints.getOwnerOrders).toBeDefined();
    expect(ApiOrders.endpoints.getDashboardOrders).toBeDefined();
    expect(ApiOrders.endpoints.getAdminOrders).toBeDefined();
    expect(ApiOrders.endpoints.getUserOrders).toBeDefined();
    expect(ApiOrders.endpoints.patchIsPaidOrders).toBeDefined();
    expect(ApiOrders.endpoints.patchIsConfirmedOrders).toBeDefined();
    expect(ApiOrders.endpoints.patchIsShippedOrders).toBeDefined();
    expect(ApiOrders.endpoints.patchIsCanceledOrders).toBeDefined();
    expect(ApiOrders.endpoints.patchIsDeliveredOrders).toBeDefined();
  });

  it("postOrders query should return the correct URL, method, and body", () => {
    const data = { items: [] };
    const { query } = ApiOrders.endpoints.postOrders as any;
    const result = query(data);
    expect(result.url).toBe("/orders");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });

  it("getOwnerOrders query should return the correct URL and method", () => {
    const { query } = ApiOrders.endpoints.getOwnerOrders as any;
    const result = query();
    expect(result.url).toBe("/orders/owner");
    expect(result.method).toBe("GET");
  });

  it("patchIsPaidOrders query should return the correct URL and method", () => {
    const id = "123";
    const { query } = ApiOrders.endpoints.patchIsPaidOrders as any;
    const result = query(id);
    expect(result.url).toBe(`/orders/isPaid/${id}`);
    expect(result.method).toBe("PATCH");
  });
});
