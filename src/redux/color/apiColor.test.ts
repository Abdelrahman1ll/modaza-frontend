import { describe, it, expect } from "vitest";
import { ApiColor } from "./apiColor";

describe("ApiColor", () => {
  it("should have the correct reducer path", () => {
    expect(ApiColor.reducerPath).toBe("apiColor");
  });

  it("should define the getColors endpoint", () => {
    expect(ApiColor.endpoints.getColors).toBeDefined();
  });

  it("should define the postColor endpoint", () => {
    expect(ApiColor.endpoints.postColor).toBeDefined();
  });

  it("should define the patchColor endpoint", () => {
    expect(ApiColor.endpoints.patchColor).toBeDefined();
  });

  it("should define the deleteColor endpoint", () => {
    expect(ApiColor.endpoints.deleteColor).toBeDefined();
  });

  it("getColors query should return the correct URL", () => {
    const { query } = ApiColor.endpoints.getColors as any;
    expect(query()).toBe("/color");
  });

  it("postColor query should return the correct method and body", () => {
    const data = { name: "Red", hex: "#FF0000" };
    const { query } = ApiColor.endpoints.postColor as any;
    const result = query(data);
    expect(result.url).toBe("/color");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });

  it("patchColor query should return the correct URL, method and body", () => {
    const data = { name: "Blue" };
    const id = "123";
    const { query } = ApiColor.endpoints.patchColor as any;
    const result = query({ data, id });
    expect(result.url).toBe(`/color/${id}`);
    expect(result.method).toBe("PATCH");
    expect(result.body).toEqual(data);
  });

  it("deleteColor query should return the correct URL and method", () => {
    const id = "123";
    const { query } = ApiColor.endpoints.deleteColor as any;
    const result = query(id);
    expect(result.url).toBe(`/color/${id}`);
    expect(result.method).toBe("DELETE");
  });
});
