import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders the loading dots", () => {
    render(<Loading />);

    // Check if the container div exists
    // In this case, since there's no specific role, we can check for the number of dots
    // or use a test ID if we added one.
    // But since it's simple, we can just check if any elements with the dot class exist.

    const dots = document.querySelectorAll(".animate-dot");
    expect(dots.length).toBe(4);
  });

  it("has the correct layout classes", () => {
    const { container } = render(<Loading />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "h-screen",
    );
  });
});
