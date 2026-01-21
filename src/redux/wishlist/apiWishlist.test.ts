import { describe, it, expect } from "vitest";
import { ApiWishlist } from "./apiWishlist";

describe("ApiWishlist", () => {
  it("should have the correct reducer path", () => {
    expect(ApiWishlist.reducerPath).toBe("apiWishlist");
  });

  it("should define required endpoints", () => {
    expect(ApiWishlist.endpoints.getWishlist).toBeDefined();
    expect(ApiWishlist.endpoints.postWishlist).toBeDefined();
    expect(ApiWishlist.endpoints.deleteWishlist).toBeDefined();
    expect(ApiWishlist.endpoints.getOwnerWishlist).toBeDefined();
  });

  it("getWishlist query should return the correct URL and method", () => {
    const { query } = ApiWishlist.endpoints.getWishlist as any;
    const result = query();
    expect(result.url).toBe("/wishlist/user");
    expect(result.method).toBe("GET");
  });

  it("postWishlist mutation should return the correct URL, method, and body", () => {
    const data = { productId: "123" };
    const { query } = ApiWishlist.endpoints.postWishlist as any;
    const result = query(data);
    expect(result.url).toBe("/wishlist");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });
});
