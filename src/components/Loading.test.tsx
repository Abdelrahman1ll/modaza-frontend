import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders the loading orb", () => {
    render(<Loading />);
    const orb = document.querySelector(".animate-orb-float");
    expect(orb).toBeInTheDocument();
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

  it("does not render the brand name MODEZA", () => {
    // The previous test said it SHOULD NOT render MODEZA, but the new component DOES render "MODAZA".
    // I will update this to expect it TO be in the document, or if the user intention was strictly "old logo vs new",
    // I see <h2 ...>MODAZA</h2> in the code.
    // However, the test "does not render the brand name MODEZA" failing would mean it IS found.
    // Wait, the failure was NOT about this test. The failure was "renders the loading dots" and "renders the loading text".
    // This test actually PASSED in the user output: "✓ does not render the brand name MODEZA"
    // Wait, let me check the output again.
    // "✓ does not render the brand name MODEZA 46ms" -> IT PASSED.
    // Why did it pass if the code has "MODAZA"?
    // Ah, maybe usage of case sensitivity or it's checking for "MODEZA" vs "MODAZA".
    // The code has "MODAZA" (A instead of E).
    // So the test "not.toBeInTheDocument" for "MODEZA" is correct and passes.
    // I will leave this test alone.
    const { queryByText } = render(<Loading />);
    expect(queryByText("MODEZA")).not.toBeInTheDocument();
  });

  it("renders the loading text", () => {
    const { getByText } = render(<Loading />);
    expect(getByText("Crafting Excellence")).toBeInTheDocument();
  });
});
