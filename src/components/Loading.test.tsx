import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders the loading dots", () => {
    render(<Loading />);
    const dots = document.querySelectorAll(".animate-dot");
    expect(dots.length).toBe(4);
  });

  it("has the correct layout classes", () => {
    const { container } = render(<Loading />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toHaveClass(
      "fixed",
      "inset-0",
      "flex",
      "justify-center",
      "items-center",
    );
  });

  it("renders the brand name MODAZA", () => {
    const { getByText } = render(<Loading />);
    expect(getByText("MODAZA")).toBeInTheDocument();
  });

  it("renders the loading text", () => {
    const { getByText } = render(<Loading />);
    expect(getByText("Crafting Excellence")).toBeInTheDocument();
  });
});
