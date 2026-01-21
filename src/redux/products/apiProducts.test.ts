import { describe, it, expect } from "vitest";
import { ApiProducts } from "./apiProducts";

describe("ApiProducts", () => {
  it("should have the correct reducer path", () => {
    expect(ApiProducts.reducerPath).toBe("apiProducts");
  });

  it("should define required endpoints", () => {
    expect(ApiProducts.endpoints.GetProducts).toBeDefined();
    expect(ApiProducts.endpoints.GetProductId).toBeDefined();
    expect(ApiProducts.endpoints.PostProduct).toBeDefined();
    expect(ApiProducts.endpoints.PatchProduct).toBeDefined();
  });

  it("GetProductId query should return the correct URL and method", () => {
    const id = "prod123";
    const { query } = ApiProducts.endpoints.GetProductId as any;
    const result = query(id);
    expect(result.url).toBe(`/products/${id}`);
    expect(result.method).toBe("GET");
  });
});
