import { describe, it, expect } from "vitest";
import { ApiUsers } from "./apiUsers";

describe("ApiUsers", () => {
  it("should have the correct reducer path", () => {
    expect(ApiUsers.reducerPath).toBe("apiUsers");
  });

  it("should define required endpoints", () => {
    expect(ApiUsers.endpoints.UsersCheckEmail).toBeDefined();
    expect(ApiUsers.endpoints.PostUsers).toBeDefined();
    expect(ApiUsers.endpoints.UsersSignupGoogle).toBeDefined();
    expect(ApiUsers.endpoints.GetUsers).toBeDefined();
    expect(ApiUsers.endpoints.PatchUsersById).toBeDefined();
    expect(ApiUsers.endpoints.PatchUsersOwnerById).toBeDefined();
  });

  it("UsersCheckEmail mutation should return the correct URL, method, and body", () => {
    const data = { email: "test@example.com" };
    const { query } = ApiUsers.endpoints.UsersCheckEmail as any;
    const result = query(data);
    expect(result.url).toBe("/users/check-email");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });

  it("GetUsers query should return the correct URL and method", () => {
    const { query } = ApiUsers.endpoints.GetUsers as any;
    const result = query();
    expect(result.url).toBe("/users");
    expect(result.method).toBe("GET");
  });
});
