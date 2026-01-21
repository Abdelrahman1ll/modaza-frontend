import { describe, it, expect } from "vitest";
import { ApiDiscountCodes } from "./apiDiscountCodes";

describe("ApiDiscountCodes", () => {
  it("should have the correct reducer path", () => {
    expect(ApiDiscountCodes.reducerPath).toBe("apiDiscountCodes");
  });

  it("should define required endpoints", () => {
    expect(ApiDiscountCodes.endpoints.GetDiscountCodes).toBeDefined();
    expect(ApiDiscountCodes.endpoints.PostValidateDiscountCode).toBeDefined();
    expect(ApiDiscountCodes.endpoints.PostDiscountCodes).toBeDefined();
    expect(ApiDiscountCodes.endpoints.PatchDiscountCodes).toBeDefined();
    expect(ApiDiscountCodes.endpoints.DeleteDiscountCodes).toBeDefined();
  });

  it("GetDiscountCodes query should return the correct URL and method", () => {
    const { query } = ApiDiscountCodes.endpoints.GetDiscountCodes as any;
    const result = query();
    expect(result.url).toBe("/discount-codes");
    expect(result.method).toBe("GET");
  });

  it("PostValidateDiscountCode query should return the correct URL, method, and body", () => {
    const data = { code: "SAVE10" };
    const { query } = ApiDiscountCodes.endpoints
      .PostValidateDiscountCode as any;
    const result = query(data);
    expect(result.url).toBe("/discount-codes/user");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });

  it("PatchDiscountCodes query should return the correct URL, method, and body", () => {
    const data = { discount: 20 };
    const id = "456";
    const { query } = ApiDiscountCodes.endpoints.PatchDiscountCodes as any;
    const result = query({ data, id });
    expect(result.url).toBe(`/discount-codes/${id}`);
    expect(result.method).toBe("PATCH");
    expect(result.body).toEqual(data);
  });
});
