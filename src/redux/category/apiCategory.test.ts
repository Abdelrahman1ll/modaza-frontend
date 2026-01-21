import { describe, it, expect } from "vitest";
import { ApiCategory } from "./apiCategory";

describe("ApiCategory", () => {
  it("should have the correct reducer path", () => {
    expect(ApiCategory.reducerPath).toBe("apiCategory");
  });

  it("should define the getCategory endpoint", () => {
    expect(ApiCategory.endpoints.getCategory).toBeDefined();
  });

  it("should define the postCategory endpoint", () => {
    expect(ApiCategory.endpoints.postCategory).toBeDefined();
  });

  it("should define the patchCategory endpoint", () => {
    expect(ApiCategory.endpoints.patchCategory).toBeDefined();
  });

  it("should define the deleteCategory endpoint", () => {
    expect(ApiCategory.endpoints.deleteCategory).toBeDefined();
  });

  it("getCategory query should return the correct URL", () => {
    const { query } = ApiCategory.endpoints.getCategory as any;
    expect(query()).toBe("/category");
  });

  it("postCategory query should return the correct method and body", () => {
    const data = { name: "Fashion" };
    const { query } = ApiCategory.endpoints.postCategory as any;
    const result = query(data);
    expect(result.url).toBe("/category");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });

  it("patchCategory query should return the correct URL, method and body", () => {
    const data = { name: "Updated Fashion" };
    const id = "456";
    const { query } = ApiCategory.endpoints.patchCategory as any;
    const result = query({ data, id });
    expect(result.url).toBe(`/category/${id}`);
    expect(result.method).toBe("PATCH");
    expect(result.body).toEqual(data);
  });

  it("deleteCategory query should return the correct URL and method", () => {
    const id = "456";
    const { query } = ApiCategory.endpoints.deleteCategory as any;
    const result = query(id);
    expect(result.url).toBe(`/category/${id}`);
    expect(result.method).toBe("DELETE");
  });
});
