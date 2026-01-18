import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ReturnExchangePolicy from "./returnExchangePolicy";
import "@testing-library/jest-dom";

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
    span: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <span {...props}>{children}</span>,
    h1: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <h1 {...props}>{children}</h1>,
    section: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <section {...props}>{children}</section>,
  },
}));

describe("ReturnExchangePolicy Component", () => {
  it("renders the main title", () => {
    render(<ReturnExchangePolicy />);
    expect(screen.getAllByText(/Return &/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Exchange/i)[0]).toBeInTheDocument();
  });

  it("renders all five sections", () => {
    render(<ReturnExchangePolicy />);
    expect(screen.getByText(/1. Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Return Conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Exchange Rules/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Refund Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Damaged Items/i)).toBeInTheDocument();
  });

  it("renders Arabic text", () => {
    render(<ReturnExchangePolicy />);
    expect(screen.getByText(/نظرة عامة/i)).toBeInTheDocument();
    expect(screen.getByText(/شروط الإرجاع/i)).toBeInTheDocument();
    expect(screen.getByText(/سياسة الاستبدال/i)).toBeInTheDocument();
    expect(screen.getByText(/استرداد الأموال/i)).toBeInTheDocument();
    expect(screen.getByText(/المنتجات التالفة/i)).toBeInTheDocument();
  });

  it("renders the footer message", () => {
    render(<ReturnExchangePolicy />);
    expect(
      screen.getByText(/Dedicated to your satisfaction/i),
    ).toBeInTheDocument();
  });
});
