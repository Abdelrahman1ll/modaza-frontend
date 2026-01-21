import { describe, it, expect } from "vitest";
import { ApiCart } from "./apiCart";

describe("ApiCart", () => {
  it("should have the correct reducer path", () => {
    expect(ApiCart.reducerPath).toBe("apiCart");
  });

  it("should define the getCart endpoint", () => {
    expect(ApiCart.endpoints.getCart).toBeDefined();
  });

  it("should define the getOwnerCart endpoint", () => {
    expect(ApiCart.endpoints.getOwnerCart).toBeDefined();
  });

  it("should define the postCart endpoint", () => {
    expect(ApiCart.endpoints.postCart).toBeDefined();
  });

  it("should define the patchCart endpoint", () => {
    expect(ApiCart.endpoints.patchCart).toBeDefined();
  });

  it("should define the deleteCart endpoint", () => {
    expect(ApiCart.endpoints.deleteCart).toBeDefined();
  });

  it("getCart query should return the correct URL", () => {
    const { query } = ApiCart.endpoints.getCart as any;
    expect(query()).toBe("/carts");
  });

  it("getOwnerCart query should return the correct URL", () => {
    const { query } = ApiCart.endpoints.getOwnerCart as any;
    expect(query()).toBe("/carts/owner");
  });

  it("postCart query should return the correct method and body", () => {
    const data = { productId: "1", quantity: 2 };
    const { query } = ApiCart.endpoints.postCart as any;
    const result = query(data);
    expect(result.url).toBe("/carts");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });

  it("patchCart query should return the correct URL, method and body", () => {
    const data = { quantity: 3 };
    const id = "cart_item_1";
    const { query } = ApiCart.endpoints.patchCart as any;
    const result = query({ data, id });
    expect(result.url).toBe(`/carts/${id}`);
    expect(result.method).toBe("PATCH");
    expect(result.body).toEqual(data);
  });

  it("deleteCart query should return the correct URL and method", () => {
    const id = "cart_item_1";
    const { query } = ApiCart.endpoints.deleteCart as any;
    const result = query(id);
    expect(result.url).toBe(`/carts/${id}`);
    expect(result.method).toBe("DELETE");
  });
});
