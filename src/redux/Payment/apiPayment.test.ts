import { describe, it, expect } from "vitest";
import { paymentApi } from "./apiPayment";

describe("paymentApi", () => {
  it("should have the correct reducer path", () => {
    expect(paymentApi.reducerPath).toBe("paymentApi");
  });

  it("should define the postPayment endpoint", () => {
    expect(paymentApi.endpoints.postPayment).toBeDefined();
  });

  it("postPayment mutation should return the correct URL, method, and body", () => {
    const data = { amount: 100, currency: "USD" };
    const { query } = paymentApi.endpoints.postPayment as any;
    const result = query(data);
    expect(result.url).toBe("/payment/init-payment");
    expect(result.method).toBe("POST");
    expect(result.body).toEqual(data);
  });
});
