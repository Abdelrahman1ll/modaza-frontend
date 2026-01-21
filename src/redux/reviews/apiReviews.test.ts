import { describe, it, expect } from "vitest";
import { ApiReviews } from "./apiReviews";

describe("ApiReviews", () => {
  it("should have the correct reducer path", () => {
    expect(ApiReviews.reducerPath).toBe("apiReviews");
  });

  it("should define required endpoints", () => {
    expect(ApiReviews.endpoints.postReviews).toBeDefined();
    expect(ApiReviews.endpoints.getReviews).toBeDefined();
    expect(ApiReviews.endpoints.patchReviews).toBeDefined();
    expect(ApiReviews.endpoints.deleteReviews).toBeDefined();
  });

  it("getReviews query should return the correct URL and method", () => {
    const id = "prod123";
    const { query } = ApiReviews.endpoints.getReviews as any;
    const result = query(id);
    expect(result.url).toBe(`/reviews/${id}`);
    expect(result.method).toBe("GET");
  });

  it("postReviews mutation should return the correct URL, method, and body", () => {
    const data = { comment: "Great!", rating: 5 };
    const { query } = ApiReviews.endpoints.postReviews as any;
    const result = query(data);
    expect(result.url).toBe("/reviews");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });
});
