import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PaymentSection from "./PaymentSection";
import "@testing-library/jest-dom";

/* ================= MOCKS ================= */

// Mock framer-motion
// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  CreditCard: () => <svg data-testid="credit-card-icon" />,
  Wallet: () => <svg data-testid="wallet-icon" />,
  Truck: () => <svg data-testid="truck-icon" />,
  Smartphone: () => <svg data-testid="smartphone-icon" />,
}));

/* ================= TESTS ================= */

describe("PaymentSection Component", () => {
  it("renders main heading and description", () => {
    render(<PaymentSection />);

    expect(
      screen.getByRole("heading", {
        name: /Flexible Payment Options/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Choose the method that suits you best/i),
    ).toBeInTheDocument();
  });

  it("renders all payment methods", () => {
    render(<PaymentSection />);

    expect(screen.getByText("Cash on Delivery")).toBeInTheDocument();
    expect(screen.getByText("Debit Card")).toBeInTheDocument();
    expect(screen.getByText("Vodafone Cash")).toBeInTheDocument();
    expect(screen.getByText("InstaPay")).toBeInTheDocument();
  });

  it("renders payment method descriptions", () => {
    render(<PaymentSection />);

    expect(
      screen.getByText("Pay when the product arrives at your door"),
    ).toBeInTheDocument();

    expect(screen.getByText("Visa, Mastercard")).toBeInTheDocument();
    expect(screen.getByText("Secure mobile payment")).toBeInTheDocument();
    expect(screen.getByText("Fast digital payment")).toBeInTheDocument();
  });

  it("renders all payment icons", () => {
    render(<PaymentSection />);

    expect(screen.getByTestId("truck-icon")).toBeInTheDocument();
    expect(screen.getByTestId("credit-card-icon")).toBeInTheDocument();
    expect(screen.getByTestId("wallet-icon")).toBeInTheDocument();
    expect(screen.getByTestId("smartphone-icon")).toBeInTheDocument();
  });

  it("renders correct number of payment cards", () => {
    render(<PaymentSection />);

    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles).toHaveLength(4);
  });
});
